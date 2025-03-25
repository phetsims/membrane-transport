// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import adp_svg from '../../../../images/adp_svg.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * ATP molecule. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ADPNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( adp_svg, {
        scale: 4
      } ) ]
    } );
  }
}

membraneChannels.register( 'ADPNode', ADPNode );