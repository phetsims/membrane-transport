// Copyright 2025, University of Colorado Boulder

import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../../scenery-phet/js/ShadedSphereNode.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Color from '../../../../../scenery/js/util/Color.js';
import MembraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * A Phosphate group that detached from ATP. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class PhosphateNode extends Node {

  public constructor() {

    const radius = 7;
    const options: ShadedSphereNodeOptions = {
      mainColor: MembraneChannelsColors.phosphateColorProperty,
      highlightColor: new Color( 255, 255, 255 ),
      lineWidth: 1,
      stroke: 'black'
    };
    const phosphate = new ShadedSphereNode( radius, options );

    super( { children: [ phosphate ] } );
  }
}

membraneChannels.register( 'PhosphateNode', PhosphateNode );