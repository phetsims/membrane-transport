// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import glucose_svg from '../../../../images/glucose_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * The Glucose molecule. Does not rotate. A hexagon drawn with a spherical gradient radiating out from the center.
 * The radius is defined as the distance from the center to the left or right edge of the hexagon.
 * The hexagon is non-regular, the length of the top and bottom horizontal segments is given by horizontalSegmentLength
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class GlucoseNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( glucose_svg ) ]
    } );
  }
}

membraneTransport.register( 'GlucoseNode', GlucoseNode );