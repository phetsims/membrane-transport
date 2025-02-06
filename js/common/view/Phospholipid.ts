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

// Define horizontal bounds for each tail
const tailWindowSize = 0.65;

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

    // randomness to stagger the control points vertically
    const minStaggerY = 0.9;
    const maxStaggerY = 1.1;

    const spacing = anchorY / 6.3;

    // ----------
    // TAIL A (left)
    // ----------
    this.tailStates.push( {
      anchorX: anchorXLeft,
      anchorY: anchorY,

      // More control points along the tail.
      // For illustration, these are spaced evenly in 'y',
      // and initially all lined up in 'x' = anchorXLeft.
      controlPoints: [
        { x: anchorXLeft, y: anchorY - spacing * 1 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 2 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 3 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 4 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 5 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 },
        { x: anchorXLeft, y: anchorY - spacing * 6 * dotRandom.nextDoubleBetween( minStaggerY, maxStaggerY ), vx: 0 }
      ]
    } );

    // ----------
    // TAIL B (right)
    // ----------
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

  public static initHeads( context: CanvasRenderingContext2D ): void {
    context.fillStyle = MembraneChannelsColors.lipidHeadColorProperty.value.toCSS();
    context.strokeStyle = 'black';
    context.lineWidth = 2;
  }

  public drawHead( context: CanvasRenderingContext2D ): void {

    context.beginPath();
    context.arc(
      this.modelViewTransform.modelToViewX( this.anchorX ),
      this.modelViewTransform.modelToViewY( this.side === 'outer' ? headY : -headY ),
      this.modelViewTransform.modelToViewDeltaX( headRadius ),
      0, 2 * Math.PI
    );
    context.fill();
    context.stroke();
  }

  public static initTails( context: CanvasRenderingContext2D ): void {
    context.strokeStyle = MembraneChannelsColors.lipidTailColorProperty.value.toCSS();
    context.lineWidth = 1.3;
  }

  public drawTails( context: CanvasRenderingContext2D ): void {

    for ( const state of this.tailStates ) {
      context.beginPath();

      const controlPoints = state.controlPoints;

      // Move to the anchor
      this.moveTo( context, state.anchorX, state.anchorY );

      // First segment: anchor -> cp0, cp1 -> cp2
      context.bezierCurveTo(
        this.modelViewTransform.modelToViewX( controlPoints[ 0 ].x ), this.modelViewTransform.modelToViewY( controlPoints[ 0 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 1 ].x ), this.modelViewTransform.modelToViewY( controlPoints[ 1 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 2 ].x ), this.modelViewTransform.modelToViewY( controlPoints[ 2 ].y )
      );

      // Second segment: cp2 -> cp3, cp4 -> tail end
      // (You can also consider hooking cp2 to cp3 more smoothly with the "current point" approach.)
      context.bezierCurveTo(
        this.modelViewTransform.modelToViewX( controlPoints[ 3 ].x ), this.modelViewTransform.modelToViewY( controlPoints[ 3 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 4 ].x ), this.modelViewTransform.modelToViewY( controlPoints[ 4 ].y ),
        this.modelViewTransform.modelToViewX( controlPoints[ 5 ].x ), this.modelViewTransform.modelToViewY( controlPoints[ 5 ].y )
      );

      context.stroke();
    }
  }

  // Convenience functions to move and line in model coordinates
  private moveTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.moveTo( this.modelViewTransform.modelToViewX( x ), this.modelViewTransform.modelToViewY( y ) );
  }

  // Keep the random walk the same, but now it applies to more points per tail
  public step( dt: number ): void {
    for ( const state of this.tailStates ) {

      const minX = state.anchorX - tailWindowSize;
      const maxX = state.anchorX + tailWindowSize;

      // For each control point, update x by random-walk logic
      for ( const controlPoint of state.controlPoints ) {
        controlPoint.vx = controlPoint.vx * friction + ( dotRandom.nextDouble() * 2 - 1 ) * controlPointStepSize * dt;
        controlPoint.x += controlPoint.vx;

        // Clamp
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