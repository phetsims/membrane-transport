// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import sodiumLigand_svg from '../../../../images/sodiumLigand_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * LigandANode is a triangular-shaped ligand representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LigandANode extends Node {

  public constructor() {

    super( {
      children: [ new Image( sodiumLigand_svg, {
        scale: 0.1
      } ) ]
    } );
  }
}

membraneTransport.register( 'LigandANode', LigandANode );