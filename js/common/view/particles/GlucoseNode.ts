// Copyright 2025, University of Colorado Boulder

import Shape from '../../../../../kite/js/Shape.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import RadialGradient from '../../../../../scenery/js/util/RadialGradient.js';
import MembraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * The Glucose molecule. Does not rotate. A hexagon drawn with a spherical gradient radiating out from the center.
 * The radius is defined as the distance from the center to the left or right edge of the hexagon.
 * The hexagon is non-regular, the length of the top and bottom horizontal segments is given by horizontalSegmentLength
 *
 * TODO (design): Glucose looks too much like an eyeball
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class GlucoseNode extends Node {

  public constructor() {

    // Horizontal length for the top & bottom edges of the hexagon
    const horizontalSegmentLength = 13;

    // Horizontal and vertical "radius" controls
    const radiusX = 18; // distance from center to left/right midpoints
    const radiusY = 10; // distance from center to top/bottom corners

    // Construct the hexagon shape
    const shape = new Shape()

      // left midpoint
      .moveTo( -radiusX, 0 )

      // top-left corner
      .lineTo( -horizontalSegmentLength / 2, -radiusY )

      // top-right corner
      .lineTo( horizontalSegmentLength / 2, -radiusY )

      // right midpoint
      .lineTo( radiusX, 0 )

      // bottom-right corner
      .lineTo( horizontalSegmentLength / 2, radiusY )

      // bottom-left corner
      .lineTo( -horizontalSegmentLength / 2, radiusY )

      .close();

    const gradient = new RadialGradient( 0, 0, 2, 0, 0, radiusX )
      .addColorStop( 0, MembraneChannelsColors.glucoseColorProperty.value.colorUtilsDarker( 0.3 ).toCSS() )
      .addColorStop( 0.7, MembraneChannelsColors.glucoseColorProperty.value.colorUtilsBrighter( 0.8 ).toCSS() );
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

membraneChannels.register( 'GlucoseNode', GlucoseNode );