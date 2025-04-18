// Copyright 2025, University of Colorado Boulder

/**
 * LigandParticleNode shows the potassium and sodium ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import potassiumLigand_svg from '../../../../images/potassiumLigand_svg.js';
import sodiumLigand_svg from '../../../../images/sodiumLigand_svg.js';
import membraneTransport from '../../../membraneTransport.js';

export default class LigandParticleNode extends Node {

  public constructor( public readonly type: 'ligandA' | 'ligandB' ) {

    super( {
      children: [ new Image( type === 'ligandA' ? sodiumLigand_svg : potassiumLigand_svg, {
        opacity: phet.chipper.queryParameters.dev ? 0.5 : 1
      } ) ]
    } );
  }
}

membraneTransport.register( 'LigandParticleNode', LigandParticleNode );