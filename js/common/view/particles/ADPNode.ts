// Copyright 2025, University of Colorado Boulder

import Shape from '../../../../../kite/js/Shape.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import RadialGradient from '../../../../../scenery/js/util/RadialGradient.js';
import MembraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';


/**
 * ATP molecule. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class ADPNode extends Node {

  public constructor() {

    // Shape from an AI file SVG path declaration
    const shape = new Shape( 'M 41.98 4.9 c -2.509 11.695 -3.11 1.03 -3.71 2.49 c -0.6 -1.46 -2.03 -2.49 -3.71 -2.49 c -1.58 0 -2.94 0.91 -3.59 2.24 c -0.65 -1.33 -2.02 -2.24 -3.59 -2.24 c -2.21 0 -4.01 1.8 -4.01 4.01 c 0 0.29 0.03 0.56 0.09 0.83 l -2.2 -1.84 c -0.64 -0.54 -1.56 -0.6 -2.28 -0.16 l -1.98 1.24 l 1.23 -1.7 c 0.45 -0.62 0.45 -1.46 0 -2.08 l -2.3 -3.19 c -0.45 -0.63 -1.26 -0.89 -1.99 -0.65 l -3.72 1.21 s -0.06 0.03 -0.1 0.04 c -0.06 -0.04 -0.12 -0.08 -0.18 -0.11 l -3.36 -1.79 c -0.61 -0.33 -1.35 -0.3 -1.94 0.07 L 1.41 2.81 c -0.59 0.37 -0.93 1.02 -0.91 1.71 l 0.13 3.8 c 0.02 0.69 0.42 1.32 1.03 1.65 l 3.36 1.79 c 0.61 0.33 1.35 0.3 1.94 -0.07 l 3.02 -1.89 c 0.07 0.04 0.15 0.07 0.23 0.1 l 3.72 1.21 c 0.18 0.06 0.37 0.09 0.56 0.09 c -0.07 0.3 -0.07 0.61 0 0.92 l 1.04 4.16 c 0.2 0.82 0.91 1.41 1.75 1.47 l 4.28 0.3 c 0.84 0.06 1.62 -0.43 1.93 -1.21 l 1.61 -3.98 c 0.08 -0.19 0.12 -0.38 0.13 -0.58 c 0.62 0.4 1.36 0.63 2.15 0.63 c 1.58 0 2.94 -0.91 3.59 -2.24 c 0.65 1.33 2.02 2.24 3.59 2.24 c 1.67 0 3.689 -1.48 3.71 -2.49 Z' );

    const gradient = new RadialGradient(
      20, 15, 2,
      20, 15, 24 )
      .addColorStop( 0, MembraneChannelsColors.atpColorProperty.value.colorUtilsDarker( 0 ).toCSS() )
      .addColorStop( 0.7, MembraneChannelsColors.atpColorProperty.value.colorUtilsBrighter( 0.9 ).toCSS() );
    super( {
      children: [
        new Path( shape, {
          stroke: 'black',
          lineWidth: 1,
          fill: gradient
        } )
      ]
    } );
  }
}

membraneChannels.register( 'ADPNode', ADPNode );