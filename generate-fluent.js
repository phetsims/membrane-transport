// Copyright 2025, University of Colorado Boulder

/*
 * Auto-generate MembraneTransportFluent.ts from a YAML string table.
 * Only dependency: js-yaml
 *
 * Usage: node generate-fluent.js [source.yml] [dest.ts]
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

// -----------------------------------------------------------------------------
// CLI

// eslint-disable-next-line no-undef
const [ , , yamlPath = 'membrane-transport-strings_en.yaml', tsPath = 'js/MembraneTransportFluent.ts' ] = process.argv;

// -----------------------------------------------------------------------------
// Helpers

/** true if key is a valid JS identifier (no quoting needed). */
const IDENT = /^[A-Za-z_$][\w$]*$/;

/** JS property accessor for MembraneTransportStrings key (dot or bracket). */
const propAccess = key => ( IDENT.test( key ) ? `.${key}` : `[${JSON.stringify( key )}]` );

/** Indent helper. */
const indent = ( lvl, spaces = 2 ) => ' '.repeat( lvl * spaces );

/** Recursively walk object, returning leaf records. */
function collectLeaves( obj, pathArr = [] ) {
  const leaves = [];
  for ( const [ key, val ] of Object.entries( obj ) ) {
    if ( val !== null && typeof val === 'object' && !Array.isArray( val ) ) {
      leaves.push( ...collectLeaves( val, [ ...pathArr, key ] ) );
    }
    else {
      leaves.push( { pathArr: [ ...pathArr, key ] } ); // scalar leaf
    }
  }
  return leaves;
}

/** Build nested TS literal from YAML, inserting both helpers at leaves. */
function buildFluentObject( obj, pathArr = [], lvl = 1 ) {
  const lines = [ '{' ];
  const entries = Object.entries( obj );
  entries.forEach( ( [ key, val ], idx ) => {
    const safeKey = IDENT.test( key ) ? key : JSON.stringify( key );
    const comma = idx < entries.length - 1 ? ',' : '';
    if ( val !== null && typeof val === 'object' && !Array.isArray( val ) ) {
      // recurse
      const sub = buildFluentObject( val, [ ...pathArr, key ], lvl + 1 );
      lines.push( `${indent( lvl )}${safeKey}: ${sub}${comma}` );
    }
    else {
      // leaf
      const id = [ ...pathArr, key ].join( '_' );
      lines.push(
        `${indent( lvl )}${safeKey}: {`,
        `${indent( lvl + 1 )}format: ( args: IntentionalAny ): string => formatPattern( '${id}', args ),`,
        `${indent( lvl + 1 )}createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( '${id}', args )`,
        `${indent( lvl )}}${comma}`
      );
    }
  } );
  lines.push( `${indent( lvl - 1 )}}` );
  return lines.join( '\n' );
}

// -----------------------------------------------------------------------------
// Main

try {

  // 1 load YAML
  const yamlText = fs.readFileSync( yamlPath, 'utf8' );
  const yamlObj = yaml.load( yamlText );

  // 2 collect all leaves
  const leaves = collectLeaves( yamlObj );

  // 3 FTL snippet
  const ftlLines = leaves.map( ( { pathArr } ) => {
    const id = pathArr.join( '_' );

    // ----------  FIX: smarter accessor  ----------
    const accessor = pathArr.reduce( ( acc, key ) => {
      // keys like "screen.simpleDiffusion" expand to .screen.simpleDiffusion
      key.split( '.' ).forEach( part => { acc += propAccess( part ); } );
      return acc;
    }, 'MembraneTransportStrings' ) + 'StringProperty.value';
    // ---------------------------------------------

    return `${id} = \${${accessor}}`;
  } ).join( '\n\n' );

  // 4 Fluent object literal
  const fluentObjectLiteral = buildFluentObject( yamlObj );

  // 5 Template TypeScript file
  const fileContents = `/* eslint-disable */
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated ${new Date().toISOString()} from ${path.basename( yamlPath )}

import StringProperty from '../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import FluentUtils from '../../chipper/js/browser/FluentUtils.js';
import { FluentBundle, FluentResource } from '../../chipper/js/browser-and-node/FluentLibrary.js';
import IntentionalAny from '../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from './membraneTransport.js';
import MembraneTransportStrings from './MembraneTransportStrings.js';
import { isTReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';

const getFTL = () => {
  const ftl = \`
${ftlLines}
\`;
  return ftl;
};

const formatPattern = ( key: string, args: IntentionalAny ): string => {
  const bundle   = new FluentBundle( 'en' );
  const resource = new FluentResource( getFTL() );
  const errors   = bundle.addResource( resource );
  assert && assert( errors.length === 0, 'Errors when adding resource for locale en' );

  const newArgs = FluentUtils.handleFluentArgs( args );

  const message = bundle.getMessage( key );
  const result  = bundle.formatPattern( message!.value!, newArgs, errors );
  assert && assert( errors.length === 0, \`Fluent errors found when formatting message: \${errors}\` );
  return result;
};

const formatToProperty = ( key: string, args: IntentionalAny ): TReadOnlyProperty<string> => {
  const initialValue = formatPattern( key, args );
  const stringProperty = new StringProperty( initialValue );

  const update = () => {
    stringProperty.value = formatPattern( key, args );
  };

  // Whenever any arg changes update the string property
  Object.values( args ).forEach( arg => {
    if ( isTReadOnlyProperty( arg ) ) {
      arg.lazyLink( update )
    }
  } );

  // TODO: When the locale changes or when a string forming the FTL changes, also update the string property, see https://github.com/phetsims/chipper/issues/1588

  return stringProperty;
};

const MembraneTransportFluent = ${fluentObjectLiteral};

export default MembraneTransportFluent;

membraneTransport.register( 'MembraneTransportFluent', MembraneTransportFluent );
`;

  // 6 write out
  fs.writeFileSync( tsPath, fileContents );
  console.log( `✅  Wrote ${tsPath} with ${leaves.length} messages.` );

}
catch( err ) {
  console.error( '❌  Generation failed:', err );

  // eslint-disable-next-line no-undef
  process.exitCode = 1;
}