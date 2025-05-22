// Copyright 2025, University of Colorado Boulder

/**
 * MacroCellNode shows the "zoomed out" view of the cell, with the cell membrane and inside coloring.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';

export default class MacroCellNode extends Node {

  // Make public so clients can access the points that define the ThumbnailNode
  public readonly thumbnailCenterX;
  public readonly thumbnailCenterY;

  public constructor() {
    super( {
      opacity: phet.chipper.queryParameters.dev ? 0.5 : 1
    } );

    const point1Property = new Vector2Property( new Vector2( 25.5, MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.centerY + MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN ) );
    const point2Property = new Vector2Property( new Vector2( 213.5, 406 ) );

    this.thumbnailCenterY = point1Property.value.y;
    this.thumbnailCenterX = ( point1Property.value.x + point2Property.value.x ) / 2;

    // Adjust the path using https://yqnn.github.io/svg-path-editor/
    const shape = new Shape( 'M14.41,275.33c-3.09-77.21-6.19-154.42-9.28-231.63-.19-4.81-.37-9.71.93-14.34C11.02,11.7,33.38,6.68,51.71,6.02c27.06-.99,170.04-1.54,197.09-.31,212.28,9.66,309.02.8,521.51,2.5,14.35.11,29.89.69,41.08,9.68,12.41,9.97,15.79,27.76,13.8,43.55s-8.36,30.67-12.03,46.15c-12.94,54.59,8.32,111.21,7.88,167.31-.22,27.92-5.83,55.7-4.37,83.58.72,13.76,3.15,27.58,1.41,41.25-1.75,13.67-8.77,27.74-21.44,33.18-12.51,5.36-19.99,1.95-38.76,8.49-15.63,5.45-42.88,1.07-59.43,1.11-25.42.06-33.63-6.87-64.96-6.15-35.55.82-70.81,5.25-106.3,3-153.5-9.73-307.31-25.22-460.79-15.26-16.83,1.09-37.01.95-46.32-13.11-4.34-6.55-5.14-14.74-5.82-22.56-3.32-38.17.15-74.7.15-113.1Z' )
      .transformed( Matrix3.translation( -20, 228 ) );

    const shapeProperty = new Property( shape );

    // Solid blue shape at the bottom
    this.addChild( new Path( shapeProperty, {
      fill: MembraneTransportColors.insideCellColorProperty,
      stroke: null
    } ) );

    // NOTE: Duplicated with SoluteBarChartNode
    // Orange outer heads
    this.addChild( new Path( shapeProperty, {
      lineWidth: 13,
      stroke: MembraneTransportColors.phospholipidHeadColorProperty
    } ) );

    // Pink inner tails
    this.addChild( new Path( shapeProperty, {
      lineWidth: 4,
      stroke: MembraneTransportColors.phospholipidTailColorProperty
    } ) );
  }
}

membraneTransport.register( 'MacroCellNode', MacroCellNode );