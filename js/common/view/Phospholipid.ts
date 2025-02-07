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
const controlPointStepSize = 0.2; // random component for the change in velocity
const friction = 0.99;          // friction coefficient for momentum (0 to 1)

// Horizontal offset between the two lipid tails on each phospholipid
const TAIL_OFFSET = 0.3;

// Define how far the head can wander left/right from its original anchor
const HEAD_WINDOW_SIZE = 0.2;

// Define horizontal bounds for each tail around its anchor
const tailWindowSize = 0.65;

// Define an interface for a control point (for the tail).
type ControlPoint = {
  x: number;
  y: number;
  vx: number; // horizontal momentum
};

// Each tail stores an anchor (in “base” coordinates) and an array of control points.
type TailState = {
  anchorX: number;
  anchorY: number;
  controlPoints: ControlPoint[];
};

const headRadius = 1.3;

// So that the edge of the head is at the edge of the membrane bounds
const headY = MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - headRadius;

export default class Phospholipid {

  // Random-walk offset for the phospholipid head
  private headOffsetX = 0;
  private headVx = 0;

  private readonly tailStates: TailState[] = [];
  public static readonly headRadius = headRadius;

  public constructor(
    public readonly side: 'outer' | 'inner',
    public readonly anchorX: number,
    private readonly modelViewTransform: ModelViewTransform2
  ) {
    // The vertical position of this phospholipid's head
    const anchorY = ( this.side === 'inner' ) ? -headY : +headY;

    // Slight offsets for two tails
    const anchorXLeft = anchorX - TAIL_OFFSET / 2;
    const anchorXRight = anchorX + TAIL_OFFSET / 2;

    // Random vertical staggering
    const minStaggerY = 0.9;
    const maxStaggerY = 1.1;
    const spacing = anchorY / 6.3;

    // Create two tails, each with several control points
    this.tailStates.push( {
      anchorX: anchorXLeft,
      anchorY: anchorY,
      controlPoints: [
        { x: anchorXLeft, y: anchorY - spacing * 1 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 2 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 3 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 4 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 5 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 6 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 }
      ]
    } );

    this.tailStates.push( {
      anchorX: anchorXRight,
      anchorY: anchorY,
      controlPoints: [
        { x: anchorXRight, y: anchorY - spacing * 1 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXRight, y: anchorY - spacing * 2 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXRight, y: anchorY - spacing * 3 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXRight, y: anchorY - spacing * 4 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXRight, y: anchorY - spacing * 5 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXRight, y: anchorY - spacing * 6 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 }
      ]
    } );

    // Initialize at correct positions, takes around 2.5% startup time on macbook air m1 + chrome
    // TODO: randomize on init to make this unnecessary
    for ( let i = 0; i < 60; i++ ) {
      this.step( 1 / 60 );
    }
  }

  /**
   * Prepare to draw heads.
   */
  public static initHeads( context: CanvasRenderingContext2D ): void {
    context.fillStyle = MembraneChannelsColors.lipidHeadColorProperty.value.toCSS();
    context.strokeStyle = 'black';
    context.lineWidth = 2;
  }

  /**
   * Draw just the head of this phospholipid.
   */
  public drawHead( context: CanvasRenderingContext2D ): void {
    context.beginPath();
    context.arc(
      this.modelViewTransform.modelToViewX( this.anchorX + this.headOffsetX ),
      this.modelViewTransform.modelToViewY( ( this.side === 'outer' ) ? headY : -headY ),
      this.modelViewTransform.modelToViewDeltaX( headRadius ),
      0, 2 * Math.PI
    );
    context.fill();
    context.stroke();
  }

  /**
   * Prepare to draw tails.
   */
  public static initTails( context: CanvasRenderingContext2D ): void {
    context.strokeStyle = MembraneChannelsColors.lipidTailColorProperty.value.toCSS();
    context.lineWidth = 1.3;
  }

  /**
   * Draw the two tails. We apply the same headOffsetX to all tail coordinates
   * (anchors and control points) so they follow the head horizontally.
   */
  public drawTails( context: CanvasRenderingContext2D ): void {

    for ( const state of this.tailStates ) {

      const { controlPoints } = state;

      // Begin path for this tail
      context.beginPath();

      // Move to anchor (with head offset applied for drawing)
      this.moveTo(
        context,
        state.anchorX + this.headOffsetX,
        state.anchorY
      );

      // We'll use two Bezier curves that cover 6 control points total
      // First segment: anchor -> cp0, cp1 -> cp2
      context.bezierCurveTo(
        this.modelViewTransform.modelToViewX( controlPoints[ 0 ].x + this.headOffsetX ),
        this.modelViewTransform.modelToViewY( controlPoints[ 0 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 1 ].x + this.headOffsetX ),
        this.modelViewTransform.modelToViewY( controlPoints[ 1 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 2 ].x + this.headOffsetX ),
        this.modelViewTransform.modelToViewY( controlPoints[ 2 ].y )
      );

      // Second segment: cp2 -> cp3, cp4 -> cp5
      context.bezierCurveTo(
        this.modelViewTransform.modelToViewX( controlPoints[ 3 ].x + this.headOffsetX ),
        this.modelViewTransform.modelToViewY( controlPoints[ 3 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 4 ].x + this.headOffsetX ),
        this.modelViewTransform.modelToViewY( controlPoints[ 4 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 5 ].x + this.headOffsetX ),
        this.modelViewTransform.modelToViewY( controlPoints[ 5 ].y )
      );

      context.stroke();
    }
  }

  /**
   * Small helper to move in model coordinates.
   */
  private moveTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.moveTo(
      this.modelViewTransform.modelToViewX( x ),
      this.modelViewTransform.modelToViewY( y )
    );
  }

  /**
   * Evolve the phospholipid state by dt, including:
   * - A small random walk for the head offset (headOffsetX).
   * - A small random walk for each tail control point, around its fixed anchor.
   */
  public step( dt: number ): void {

    // 1. Random-walk the head
    const headStepSize = 0.5 * controlPointStepSize; // can be scaled down for smoother motion
    this.headVx = this.headVx * friction + ( dotRandom.nextDouble() * 2 - 1 ) * headStepSize * dt;
    this.headOffsetX += this.headVx;

    // Clamp the head offset to ±HEAD_WINDOW_SIZE
    if ( this.headOffsetX < -HEAD_WINDOW_SIZE ) {
      this.headOffsetX = -HEAD_WINDOW_SIZE;
      this.headVx = 0;
    }
    else if ( this.headOffsetX > HEAD_WINDOW_SIZE ) {
      this.headOffsetX = HEAD_WINDOW_SIZE;
      this.headVx = 0;
    }

    // 2. Random-walk for each tail control point around its anchor (NOT shifting by headOffsetX).
    for ( const state of this.tailStates ) {

      // The "base" anchor for each tail
      const { anchorX } = state;
      const minX = anchorX - tailWindowSize;
      const maxX = anchorX + tailWindowSize;

      for ( const controlPoint of state.controlPoints ) {

        // Update velocity
        controlPoint.vx = controlPoint.vx * friction + ( dotRandom.nextDouble() * 2 - 1 ) * controlPointStepSize * dt;
        controlPoint.x += controlPoint.vx;

        // Clamp to [anchorX - tailWindowSize, anchorX + tailWindowSize]
        if ( controlPoint.x < minX ) {
          controlPoint.x = minX;
          controlPoint.vx = 0;
        }
        else if ( controlPoint.x > maxX ) {
          controlPoint.x = maxX;
          controlPoint.vx = 0;
        }
      }
    }
  }
}

membraneChannels.register( 'Phospholipid', Phospholipid );