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
    const shape = new Shape( 'M 6 378 L 194 378 Q 218.5 378.5 243 379 Q 400.5 374.5 558 370 C 800 408 1094 320 1080 502 Q 1051 793 948 891 Q 829 943 619 1020 Q -96 871 -95 706 Q -74 381 -6 378 Z' )
      .transformed( Matrix3.translation( 0, -147 ) );

    const shapeProperty = new Property( shape );

    // Solid blue shape at the bottom
    this.addChild( new Path( shapeProperty, {
      fill: MembraneTransportColors.insideCellColorProperty,
      stroke: null
    } ) );

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