// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../membraneChannels.js';

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ThumbnailNode extends Node {
  public constructor( centerX: number, centerY: number, observationWindowBounds: Bounds2 ) {
    super();

    // TODO: Same aspect ratio as observation window, use to determine the height
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

      // TODO: Fade the line at all?
      // stroke: new LinearGradient( rectangle.left, rectangle.top, observationWindowBounds.left, observationWindowBounds.top ).addColorStop( 0, 'black' ).addColorStop( 1, new Color( 0, 0, 0, 0.2 ) )

      // TODO: Dash at all? It looks like a strikethrough on the Add solute outer button
      // lineDash: [ 10,10 ]
    };
    this.addChild( new Line( rectangle.left, rectangle.top, observationWindowBounds.left, observationWindowBounds.top, lineOptions ) );
    this.addChild( new Line( rectangle.right, rectangle.top, observationWindowBounds.right, observationWindowBounds.top, lineOptions ) );
    this.addChild( new Line( rectangle.left, rectangle.bottom, observationWindowBounds.left, observationWindowBounds.bottom, lineOptions ) );
    this.addChild( new Line( rectangle.right, rectangle.bottom, observationWindowBounds.right, observationWindowBounds.bottom, lineOptions ) );
  }
}

membraneChannels.register( 'ThumbnailNode', ThumbnailNode );