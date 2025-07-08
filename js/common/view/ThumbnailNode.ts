// Copyright 2025, University of Colorado Boulder

/**
 * ThumbnailNode shows a small rectangular view on macroscopic cell shape, showing that the ObservationWindow is a zoomed-in
 * view of the cell.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../membraneTransport.js';
import ObservationWindow from './ObservationWindow.js';

export default class ThumbnailNode extends Node {
  public constructor( centerX: number, centerY: number, observationWindowBounds: Bounds2 ) {
    super();

    // Same aspect ratio as observation window, use to determine the height
    const width = 50;
    const height = width * observationWindowBounds.height / observationWindowBounds.width;
    const rectangle = new Rectangle( 0, 0, width, height, {
      stroke: 'black',
      lineWidth: 1.5,
      centerX: centerX,
      centerY: centerY
    } );
    this.addChild( rectangle );

    // draw lines from each corner to the observation window.
    const lineOptions = {
      stroke: 'black',
      lineWidth: 1
    };
    this.addChild( new Line( rectangle.left, rectangle.top, observationWindowBounds.left + ObservationWindow.CORNER_RADIUS / 2, observationWindowBounds.top + ObservationWindow.CORNER_RADIUS / 2, lineOptions ) );
    this.addChild( new Line( rectangle.left, rectangle.bottom, observationWindowBounds.left + ObservationWindow.CORNER_RADIUS / 2, observationWindowBounds.bottom - ObservationWindow.CORNER_RADIUS / 2, lineOptions ) );
  }
}

membraneTransport.register( 'ThumbnailNode', ThumbnailNode );