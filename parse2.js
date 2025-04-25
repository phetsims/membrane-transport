/* eslint-disable */
import { parse } from '@typescript-eslint/parser';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'; // For node type checks
import fs from 'fs';
import path from 'path';

// --- Configuration ---
const args = process.argv.slice( 2 );
const inputFileArg = args[ 0 ];
const outputFileArg = args[ 1 ];

if ( !inputFileArg ) {
  console.error( 'Error: Input TypeScript file path is required.' );
  console.log( 'Usage: node build-strings-json.js <input-ts-file> [output-json-file]' );
  process.exit( 1 );
}

const inputFilePath = path.resolve( inputFileArg );
const defaultOutputName = path.basename( inputFilePath, '.ts' ) + '.json';
const outputFilePath = path.resolve( outputFileArg || defaultOutputName );
// --- End Configuration ---


console.log( `Parsing TypeScript file: ${inputFilePath}` );

try {
  const code = fs.readFileSync( inputFilePath, 'utf8' );

  // Parse the code into an AST
  const ast = parse( code, {
    loc: true,
    range: true, // Ensure range is included for source extraction
    comment: false, // Keep comments off unless needed later
    sourceType: 'module',
    ecmaVersion: 'latest'
  } );

  // --- Find the main exported object literal ---
  let objectName = null;
  let objectNode = null;

  for ( const statement of ast.body ) {
    if ( statement.type === AST_NODE_TYPES.VariableDeclaration && statement.declarations.length === 1 ) {
      const declarator = statement.declarations[ 0 ];
      if ( declarator.id.type === AST_NODE_TYPES.Identifier &&
           declarator.init && declarator.init.type === AST_NODE_TYPES.ObjectExpression ) {
        objectName = declarator.id.name;
        objectNode = declarator.init;
        break;
      }
    }
    // Add checks for export variations if necessary
  }

  if ( !objectNode || !objectName ) {
    throw new Error( `Could not find a top-level variable declaration assigned to an object literal in ${inputFilePath}` );
  }

  console.log( `Found object literal variable: ${objectName}` );

  // --- Process the object node recursively ---
  const outputJson = {
    metadata: {
      originalFile: path.basename( inputFilePath ),
      objectName: objectName,
      parsedDate: new Date().toISOString()
    },
    strings: {}
  };

  processObjectNode( objectNode, outputJson.strings, code );

  // --- Write the output JSON file ---
  fs.writeFileSync( outputFilePath, JSON.stringify( outputJson, null, 2 ) ); // Pretty print JSON
  console.log( `Successfully generated JSON: ${outputFilePath}` );

}
catch( error ) {
  console.error( 'Error processing file:', error );
  process.exit( 1 );
}


// --- Helper Functions ---

/**
 * Recursively processes an ObjectExpression AST node.
 * @param {import('@typescript-eslint/typescript-estree').TSESTree.ObjectExpression} node
 * @param {object} targetObject The object to populate in the output JSON
 * @param {string} sourceCode The full source code string
 */
function processObjectNode( node, targetObject, sourceCode ) {
  if ( node.type !== AST_NODE_TYPES.ObjectExpression ) {
    return;
  }

  for ( const property of node.properties ) {
    // Handle standard Property nodes (key: value) and MethodDefinition nodes (method() {})
    if ( property.type !== AST_NODE_TYPES.Property && property.type !== AST_NODE_TYPES.MethodDefinition ) {
      continue;
    }

    let keyName;
    let valueNode; // The node representing the value (Literal, Object, Function, etc.)

    if ( property.type === AST_NODE_TYPES.Property ) {
      valueNode = property.value; // Value is directly available
      // Determine key name for Property
      if ( property.key.type === AST_NODE_TYPES.Identifier ) {
        keyName = property.key.name;
      }
      else if ( property.key.type === AST_NODE_TYPES.Literal && typeof property.key.value === 'string' ) {
        keyName = property.key.value;
      }
      else {
        continue; // Skip complex keys
      }
    }
    else { // property.type === AST_NODE_TYPES.MethodDefinition
      valueNode = property.value; // The function expression is in property.value
      // Determine key name for MethodDefinition
      if ( property.key.type === AST_NODE_TYPES.Identifier ) {
        keyName = property.key.name;
      }
      else {
        continue; // Skip complex keys for methods too
      }
    }


    // Handle different value types
    if ( valueNode.type === AST_NODE_TYPES.Literal && typeof valueNode.value === 'string' ) {
      targetObject[ keyName ] = {
        _type: 'string',
        value: valueNode.value
      };
    }
    else if ( valueNode.type === AST_NODE_TYPES.ObjectExpression ) {
      targetObject[ keyName ] = {
        _type: 'object',
        children: {}
      };
      processObjectNode( valueNode, targetObject[ keyName ].children, sourceCode ); // Recurse
    }
    else if ( valueNode.type === AST_NODE_TYPES.FunctionExpression || valueNode.type === AST_NODE_TYPES.ArrowFunctionExpression ) {
      // Pass the ENTIRE property node (Property or MethodDefinition) to capture correct source range
      targetObject[ keyName ] = processFunctionNode( property, sourceCode );
    }
    else if ( valueNode.type === AST_NODE_TYPES.TemplateLiteral ) {
      targetObject[ keyName ] = {
        _type: 'string',
        value: getTemplateLiteralValue( valueNode, sourceCode )
      };
    }
    // Add handling for other node types if necessary
  }
}

/**
 * Processes function nodes (contained within Property or MethodDefinition).
 * @param {import('@typescript-eslint/typescript-estree').TSESTree.Property | import('@typescript-eslint/typescript-estree').TSESTree.MethodDefinition} propertyNode The node containing the function (Property or MethodDefinition)
 * @param {string} sourceCode
 * @returns {object} JSON representation for the function
 */
function processFunctionNode( propertyNode, sourceCode ) { // Accept the container node
  // Get the actual function node (the value part)
  const funcNode = propertyNode.value;
  if ( funcNode.type !== AST_NODE_TYPES.FunctionExpression && funcNode.type !== AST_NODE_TYPES.ArrowFunctionExpression ) {
    console.warn( 'processFunctionNode called with non-function value node type:', funcNode.type );
    return { _type: 'error', value: 'Invalid function node type' };
  }

  const params = funcNode.params.map( p => { // Use funcNode for params
    if ( p.type === AST_NODE_TYPES.Identifier ) {
      return p.name;
    }
    else if ( p.type === AST_NODE_TYPES.AssignmentPattern && p.left.type === AST_NODE_TYPES.Identifier ) {
      return p.left.name;
    }
    else if ( p.type === AST_NODE_TYPES.RestElement && p.argument.type === AST_NODE_TYPES.Identifier ) {
      return `...${p.argument.name}`;
    }
    return '?';
  } );

  // Use the range of the ENTIRE container node (Property or MethodDefinition) for originalSource
  const functionSource = sourceCode.substring( propertyNode.range[ 0 ], propertyNode.range[ 1 ] );

  // Pass the function's body node for finding strings
  const translatableParts = findTranslatableStringsInFunction( funcNode.body, sourceCode );

  return {
    _type: 'function',
    parameters: params,
    originalSource: functionSource, // Includes key/method name and full signature/body
    translatableParts: translatableParts
  };
}

/**
 * Finds string literals and template literals within a function body, adding heuristic flags.
 * @param {import('@typescript-eslint/typescript-estree').TSESTree.Node} node The starting node (usually function body BlockStatement)
 * @param {string} sourceCode
 * @returns {Array<{id: number, value: string, isLikelyLogical?: boolean}>}
 */
function findTranslatableStringsInFunction( node, sourceCode ) {
  const strings = [];
  let idCounter = 0;

  // Enhanced recursive visitor function including parent node
  function visit( currentNode, parentNode = null ) {
    if ( !currentNode ) {
      return;
    }

    let isLikelyLogical = false;

    // Handle string Literal nodes
    if ( currentNode.type === AST_NODE_TYPES.Literal && typeof currentNode.value === 'string' ) {
      // *** HEURISTIC CHECK ***
      if ( parentNode ) {
        // Check if used in a comparison
        if ( parentNode.type === AST_NODE_TYPES.BinaryExpression &&
             [ '===', '!==', '==', '!=' ].includes( parentNode.operator ) &&
             ( parentNode.left === currentNode || parentNode.right === currentNode ) ) {
          isLikelyLogical = true;
        }
        // Check if used as a SwitchCase test
        else if ( parentNode.type === AST_NODE_TYPES.SwitchCase && parentNode.test === currentNode ) {
          isLikelyLogical = true;
        }
        // Add more checks? e.g., RHS of variable assignment named 'TYPE' or 'KEY'? (More complex)
      }

      // Add string if not empty
      if ( currentNode.value.trim().length > 0 ) {
        const stringData = { id: idCounter++, value: currentNode.value };
        if ( isLikelyLogical ) {
          stringData.isLikelyLogical = true; // Add the flag
        }
        strings.push( stringData );
      }
    }
    // Handle TemplateLiteral nodes
    else if ( currentNode.type === AST_NODE_TYPES.TemplateLiteral ) {
      const combinedValue = getTemplateLiteralValue( currentNode, sourceCode );
      if ( combinedValue.trim().length > 0 ) {
        // Template literals less likely purely logical, don't flag for now
        strings.push( { id: idCounter++, value: combinedValue } );
      }
      // Do not recurse into expressions within template literals for this purpose
      return;
    }

    // Recurse through children, passing the current node as the parent for the next level
    // Iterate over all properties that might contain AST nodes or arrays of nodes
    for ( const key in currentNode ) {
      // Avoid recursing down prototype chain, and skip metadata like 'loc', 'range', 'parent'
      if ( currentNode.hasOwnProperty( key ) && ![ 'loc', 'range', 'parent', 'type' ].includes( key ) ) {
        const child = currentNode[ key ];
        if ( typeof child === 'object' && child !== null ) {
          if ( Array.isArray( child ) ) {
            // Pass currentNode as parent for array elements
            child.forEach( item => visit( item, currentNode ) );
          }
          else if ( child.type ) { // Check if it looks like an AST node
            // Pass currentNode as parent
            visit( child, currentNode );
          }
        }
      }
    }
  }

  visit( node ); // Start traversal from the function body
  return strings;
}


/**
 * Gets the 'cooked' string representation of a TemplateLiteral.
 * @param {import('@typescript-eslint/typescript-estree').TSESTree.TemplateLiteral} node
 * @param {string} sourceCode
 * @returns {string}
 */
function getTemplateLiteralValue( node, sourceCode ) {
  // Grab the source code between the backticks, including ${...} expressions literally.
  return sourceCode.substring( node.range[ 0 ] + 1, node.range[ 1 ] - 1 );
}