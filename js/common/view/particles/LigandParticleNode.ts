// Copyright 2025-2026, University of Colorado Boulder

/**
 * LigandParticleNode shows the potassium and sodium ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import potassiumLigand_svg from '../../../../images/potassiumLigand_svg.js';
import sodiumLigand_svg from '../../../../images/sodiumLigand_svg.js';

export default class LigandParticleNode extends Node {

  public constructor( public readonly type: 'triangleLigand' | 'starLigand' ) {

    super( {
      children: [ new Image( type === 'triangleLigand' ? sodiumLigand_svg : potassiumLigand_svg, {
        opacity: phet.chipper.queryParameters.dev ? 0.5 : 1
      } ) ]
    } );
  }
}
