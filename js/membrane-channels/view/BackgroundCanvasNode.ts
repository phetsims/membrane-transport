// Copyright 2025, University of Colorado Boulder

/**
 * The canvas renderer for background content in the observation window. This is for rendering
 * many particles that are not interactive.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
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

// Head parameters
const headRadius = 2;
const headY = 22;

// Constants controlling the tail control point movement
const controlPointStepSize = 0.1; // the random component for the change in velocity
const friction = 0.9999;          // a friction coefficient for momentum (0 to 1)

// Define an interface for a control point.
// We add a velocity component "vx" for horizontal momentum.
type ControlPoint = {
  x: number;
  y: number;
  vx: number;
};

// For each tail, we want to store its anchor (head center) and a list of control points.
// (Later, you could also include additional parameters like target endpoint offsets.)
type TailState = {
  anchorX: number;
  anchorY: number;
  controlPoints: ControlPoint[];
};

export default class BackgroundCanvasNode extends CanvasNode {

  private readonly modelViewTransform2 = ModelViewTransform2.createRectangleInvertedYMapping( modelBounds, viewBounds );
  private time = 0;

  // We use separate tail states for inner and outer layers.
  private tailStatesInner: TailState[] = [];
  private tailStatesOuter: TailState[] = [];
  // Number of phospholipids in our demo.
  private readonly numTails: number = 61; // for i from -30 to 30

  public constructor() {
    super( {
      canvasBounds: viewBounds
    } );

    this.initializeTailStates();
  }

  // Convenience functions to move and line in model coordinates
  private moveTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.moveTo( this.modelViewTransform2.modelToViewX( x ), this.modelViewTransform2.modelToViewY( y ) );
  }

  private lineTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.lineTo( this.modelViewTransform2.modelToViewX( x ), this.modelViewTransform2.modelToViewY( y ) );
  }

  public step( dt: number ): void {
    this.time = this.time + dt;
  }

  // Initialize two sets of tail states: one for the inner side and one for the outer side.
  private initializeTailStates(): void {
    // For this demo, let i run from -30 to 30.
    for ( let i = -30; i <= 30; i++ ) {
      const anchorX = i * headRadius * 2;

      // Inner side initialization:
      const innerAnchorY = -headY; // inner layer uses negative headY
      const cp1Inner: ControlPoint = { x: anchorX, y: innerAnchorY + headY / 2, vx: 0 };
      const cp2Inner: ControlPoint = { x: anchorX, y: innerAnchorY + headY, vx: 0 };
      this.tailStatesInner.push( { anchorX: anchorX, anchorY: innerAnchorY, controlPoints: [ cp1Inner, cp2Inner ] } );

      // Outer side initialization:
      const outerAnchorY = headY; // outer layer uses positive headY
      const cp1Outer: ControlPoint = { x: anchorX, y: outerAnchorY - headY / 2, vx: 0 };
      const cp2Outer: ControlPoint = { x: anchorX, y: outerAnchorY - headY, vx: 0 };
      this.tailStatesOuter.push( { anchorX: anchorX, anchorY: outerAnchorY, controlPoints: [ cp1Outer, cp2Outer ] } );
    }
  }

  // Update control point positions via a random walk with momentum, for a given set of tail states.
  private updateTailStatesFor( tailStates: TailState[] ): void {
    for ( const state of tailStates ) {
      // Define horizontal bounds relative to the tail's anchor.
      const tailWindowSize = 1;
      const minX = state.anchorX - tailWindowSize;
      const maxX = state.anchorX + tailWindowSize;
      // For each control point, update its x using momentum, leaving y unchanged.
      for ( const cp of state.controlPoints ) {
        cp.vx = cp.vx * friction + ( dotRandom.nextDouble() * 2 - 1 ) * controlPointStepSize;
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

  /**
   * Draw tails for the given side ("inner" or "outer").
   */
  public drawTails( context: CanvasRenderingContext2D, side: 'inner' | 'outer' ): void {
    // Depending on the side, pick the correct tail state array and update it.
    let tailStates: TailState[];
    if ( side === 'inner' ) {
      tailStates = this.tailStatesInner;
    }
    else {
      tailStates = this.tailStatesOuter;
    }
    this.updateTailStatesFor( tailStates );

    context.strokeStyle = TAIL_COLOR;
    context.lineWidth = 2;

    // For each tail state, draw a cubic Bézier curve using the anchor, the two control points,
    // and then a tail endpoint defined relative to the last control point.
    // (Adjust the endpoint offset if needed.)
    const endpointOffset = 0;
    for ( const state of tailStates ) {
      const lastCP = state.controlPoints[ state.controlPoints.length - 1 ];
      const tailEndX = lastCP.x;
      const tailEndY = lastCP.y + endpointOffset;

      context.beginPath();
      this.moveTo( context, state.anchorX, state.anchorY );
      context.bezierCurveTo(
        this.modelViewTransform2.modelToViewX( state.controlPoints[ 0 ].x ), this.modelViewTransform2.modelToViewY( state.controlPoints[ 0 ].y ),
        this.modelViewTransform2.modelToViewX( state.controlPoints[ 1 ].x ), this.modelViewTransform2.modelToViewY( state.controlPoints[ 1 ].y ),
        this.modelViewTransform2.modelToViewX( tailEndX ), this.modelViewTransform2.modelToViewY( tailEndY )
      );
      context.stroke();
    }
  }

  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    // Draw the background: upper half for outside cell, lower half for inside cell.
    context.fillStyle = OUTSIDE_CELL_COLOR;
    context.fillRect( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2 );
    context.fillStyle = INSIDE_CELL_COLOR;
    context.fillRect( 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2 );

    // Draw tails independently for inner and outer layers.
    this.drawTails( context, 'inner' );
    this.drawTails( context, 'outer' );

    // --- Draw the heads ---
    context.fillStyle = LIPID_HEAD_COLOR;
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    // Draw inner heads
    for ( let i = -100; i < 100; i++ ) {
      context.beginPath();
      context.arc(
        this.modelViewTransform2.modelToViewX( i * headRadius * 2 ),
        this.modelViewTransform2.modelToViewY( -headY ), // inner heads
        this.modelViewTransform2.modelToViewDeltaX( headRadius ),
        0, 2 * Math.PI
      );
      context.fill();
      context.stroke();
    }

    // Draw outer heads
    for ( let i = -100; i < 100; i++ ) {
      context.beginPath();
      context.arc(
        this.modelViewTransform2.modelToViewX( i * headRadius * 2 ),
        this.modelViewTransform2.modelToViewY( headY ),  // outer heads
        this.modelViewTransform2.modelToViewDeltaX( headRadius ),
        0, 2 * Math.PI
      );
      context.fill();
      context.stroke();
    }

    // --- Draw crosshairs at the origin ---
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