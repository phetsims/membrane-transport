// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import phosphate_svg from '../../../../images/phosphate_svg.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * A Phosphate group that detached from ATP. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class PhosphateNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( phosphate_svg, {
        scale: 0.75
      } ) ]
    } );
  }
}

membraneChannels.register( 'PhosphateNode', PhosphateNode );