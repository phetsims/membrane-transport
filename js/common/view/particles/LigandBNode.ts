// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import potassiumLigand_svg from '../../../../images/potassiumLigand_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * LigandBNode is a 4-pointed star-shaped ligand representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LigandBNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( potassiumLigand_svg, {
        scale: 0.75
      } ) ]
    } );
  }
}

membraneTransport.register( 'LigandBNode', LigandBNode );