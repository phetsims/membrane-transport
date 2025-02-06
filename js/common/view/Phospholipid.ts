// Copyright 2025, University of Colorado Boulder

/**
 * Contains model computation and view rendering for the phospholipids, which are transient and not part of PhET-iO state.
 *
 * NOTE: It is rendered in canvas, so it does not extend Node.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsColors from '../MembraneChannelsColors.js';
import MembraneChannelsConstants from '../MembraneChannelsConstants.js';

// Constants controlling the tail control point movement
const controlPointStepSize = 0.1; // the random component for the change in velocity
const friction = 0.9999;          // a friction coefficient for momentum (0 to 1)

// Introduce a positive-valued "angle" (really a horizontal offset) to separate the two tails
// from each lipid head. Adjust as needed for appearance.
const TAIL_OFFSET = 0.3;

// Define an interface for a control point.
// We add a velocity component "vx" for horizontal momentum.
type ControlPoint = {
  x: number;
  y: number;
  vx: number;
};

// For each tail, we want to store its anchor (head center) and a list of control points.
type TailState = {
  anchorX: number;
  anchorY: number;
  controlPoints: ControlPoint[];
};

const headRadius = 1.3;

// So that the edge of the head is at the edge of the bounds.
const headY = MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - headRadius;

export default class Phospholipid {

  private readonly tailStates: TailState[] = [];
  public static readonly headRadius = headRadius;

  public constructor(
    public readonly side: 'outer' | 'inner',
    public readonly anchorX: number,
    private readonly modelViewTransform: ModelViewTransform2
  ) {

    // For each head, its center is anchorX on the horizontal axis

    // We'll create two separate anchorX positions, each offset by ± TAIL_ANGLE/2
    // so that we have two tails at slightly different angles.
    const anchorXLeft = anchorX - TAIL_OFFSET / 2;
    const anchorXRight = anchorX + TAIL_OFFSET / 2;

    const anchorY = this.side === 'inner' ? -headY : +headY;

    // Tail A (left offset) for the inner side
    this.tailStates.push( {
      anchorX: anchorXLeft,
      anchorY: anchorY,
      controlPoints: [
        { x: anchorXLeft, y: anchorY - anchorY / 2, vx: 0 },
        { x: anchorXLeft, y: anchorY - anchorY, vx: 0 }
      ]
    } );

    // Tail B (right offset) for the inner side
    this.tailStates.push( {
      anchorX: anchorXRight,
      anchorY: anchorY,
      controlPoints: [
        { x: anchorXRight, y: anchorY - anchorY / 2, vx: 0 },
        { x: anchorXRight, y: anchorY - anchorY, vx: 0 }
      ]
    } );
  }

  public static initHeads( context: CanvasRenderingContext2D ): void {
    context.fillStyle = MembraneChannelsColors.lipidHeadColorProperty.value.toCSS();
    context.strokeStyle = 'black';
    context.lineWidth = 2;
  }

  public drawHead( context: CanvasRenderingContext2D ): void {

    // Draw outer heads
    context.beginPath();
    context.arc(
      this.modelViewTransform.modelToViewX( this.anchorX ),
      this.modelViewTransform.modelToViewY( this.side === 'outer' ? headY : -headY ),  // outer heads
      this.modelViewTransform.modelToViewDeltaX( headRadius ),
      0, 2 * Math.PI
    );
    context.fill();
    context.stroke();
  }

  public static initTails( context: CanvasRenderingContext2D ): void {
    context.strokeStyle = MembraneChannelsColors.lipidTailColorProperty.value.toCSS();
    context.lineWidth = 2;
  }

  public drawTails( context: CanvasRenderingContext2D ): void {

    // For each tail state, draw a cubic Bézier curve using the anchor, the two control points,
    // and then a tail endpoint defined relative to the last control point.
    // (Adjust the endpoint offset if needed.)
    const OFFSET = 0.8;
    const endpointOffset = this.side === 'inner' ? -OFFSET : OFFSET;

    for ( const state of this.tailStates ) {
      context.beginPath();

      // The last control point helps define our endpoint
      const lastCP = state.controlPoints[ state.controlPoints.length - 1 ];
      const tailEndX = lastCP.x;
      const tailEndY = lastCP.y + endpointOffset;

      this.moveTo( context, state.anchorX, state.anchorY );
      context.bezierCurveTo(
        this.modelViewTransform.modelToViewX( state.controlPoints[ 0 ].x ), this.modelViewTransform.modelToViewY( state.controlPoints[ 0 ].y ),
        this.modelViewTransform.modelToViewX( state.controlPoints[ 1 ].x ), this.modelViewTransform.modelToViewY( state.controlPoints[ 1 ].y ),
        this.modelViewTransform.modelToViewX( tailEndX ), this.modelViewTransform.modelToViewY( tailEndY )
      );
      context.stroke();
    }
  }

  // Convenience functions to move and line in model coordinates
  private moveTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.moveTo( this.modelViewTransform.modelToViewX( x ), this.modelViewTransform.modelToViewY( y ) );
  }

  // Update control point positions via a random walk with momentum, for a given set of tail states.
  public step( dt: number ): void {
    for ( const state of this.tailStates ) {

      // Define horizontal bounds relative to the tail's anchor.
      const tailWindowSize = 1;
      const minX = state.anchorX - tailWindowSize;
      const maxX = state.anchorX + tailWindowSize;

      // For each control point, update its x using momentum, leaving y unchanged.
      for ( const cp of state.controlPoints ) {
        cp.vx = cp.vx * friction + ( dotRandom.nextDouble() * 2 - 1 ) * controlPointStepSize * dt;
        cp.x += cp.vx;

        // Clamp the x position to within [anchorX - tailWindowSize, anchorX + tailWindowSize]
        if ( cp.x < minX ) {
          cp.x = minX;
          cp.vx = 0;
        }
        else if ( cp.x > maxX ) {
          cp.x = maxX;
          cp.vx = 0;
        }
      }
    }
  }
}

membraneChannels.register( 'Phospholipid', Phospholipid );