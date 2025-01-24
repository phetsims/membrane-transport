// Copyright 2025, University of Colorado Boulder

import { Shape } from '../../../../../kite/js/imports.js';
import { Node, Path, RadialGradient } from '../../../../../scenery/js/imports.js';
import membraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';


/**
 * The Glucose molecule. Does not rotate. A hexagon drawn with a spherical gradient radiating out from the center.
 * The radius is defined as the distance from the center to the left or right edge of the hexagon.
 * The hexagon is non-regular, the length of the top and bottom horizontal segments is given by horizontalSegmentLength
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

    // TODO: Should we squash the path vertically then add an unsquashed stroke to get the ellipse gradient?
    const gradient = new RadialGradient( 0, 0, 2, 0, 0, radiusX )
      .addColorStop( 0, membraneChannelsColors.glucoseBarChartColorProperty.value.colorUtilsDarker( 0.3 ).toCSS() )
      .addColorStop( 0.7, membraneChannelsColors.glucoseBarChartColorProperty.value.colorUtilsBrighter( 0.8 ).toCSS() );
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