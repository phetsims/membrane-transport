// Copyright 2025, University of Colorado Boulder

/**
 * The canvas renderer for background content in the observation window. This is for rendering
 * many particles that are not interactive.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';

// TODO: Move to color file
const TAIL_COLOR = 'rgb(229,68,143)';
const LIPID_HEAD_COLOR = 'rgb(248,161,46)';
const INSIDE_CELL_COLOR = 'rgb(101,185,234)';
const OUTSIDE_CELL_COLOR = 'rgb(152,205,255)';

// Choose standard units for working on model coordinates. The origin is in the center.
const modelBounds = new Bounds2( -100, -100, 100, 100 );
const viewBounds = new Bounds2( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH );

export default class BackgroundCanvasNode extends CanvasNode {

  private readonly modelViewTransform2 = ModelViewTransform2.createRectangleInvertedYMapping( modelBounds, viewBounds );
  
  public constructor() {
    super( {
      canvasBounds: viewBounds
    } );
  }

  // Convenience functions to move and line in model coordinates
  private moveTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.moveTo( this.modelViewTransform2.modelToViewX( x ), this.modelViewTransform2.modelToViewY( y ) );
  }

  private lineTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.lineTo( this.modelViewTransform2.modelToViewX( x ), this.modelViewTransform2.modelToViewY( y ) );
  }

  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    // draw the top half rectangle
    context.fillStyle = OUTSIDE_CELL_COLOR;
    context.fillRect( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2 );

    // draw the bottom half rectangle
    context.fillStyle = INSIDE_CELL_COLOR;
    context.fillRect( 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2 );

    const headRadius = 2;
    const headY = 22;

    // draw the tails first so they appear to be coming out of the heads
    context.strokeStyle = TAIL_COLOR;
    context.lineWidth = 2;
    const tailLength = headY;

    for ( let layer = 0; layer <= 1; layer++ ) {
      for ( let i = -100; i < 100; i++ ) {
        context.beginPath();
        const startY = layer === 0 ? -headY : +headY;
        const tailDirection = layer === 0 ? 1 : -1;

        this.moveTo( context, i * headRadius * 2, startY );
        this.lineTo( context, i * headRadius * 2, startY + tailLength * tailDirection );
        context.stroke();
      }
    }

    context.fillStyle = LIPID_HEAD_COLOR;
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    for ( let layer = 0; layer <= 1; layer++ ) {
      for ( let i = -100; i < 100; i++ ) {
        // For the phospholipid bilayer, each phospholipid is represented by a circle with a tail for the hydrophobic tail
        context.beginPath();
        context.arc( this.modelViewTransform2.modelToViewX( i * headRadius * 2 ), this.modelViewTransform2.modelToViewY( layer === 0 ? -headY : +headY ), this.modelViewTransform2.modelToViewDeltaX( headRadius ), 0, 2 * Math.PI );
        context.fill();
        context.stroke();
      }
    }

    // draw a cross hairs at the origin, so we can see where it is
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.beginPath();
    this.moveTo( context, 0, -5 );
    this.lineTo( context, 0, 5 );
    this.moveTo( context, -5, 0 );
    this.lineTo( context, 5, 0 );

    context.stroke();
  }
}
membraneChannels.register( 'BackgroundCanvasNode', BackgroundCanvasNode );