// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { CanvasNodeOptions } from '../../../../scenery/js/nodes/CanvasNode.js';
import Path, { PathOptions } from '../../../../scenery/js/nodes/Path.js';
import membraneChannels from '../../membraneChannels.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// TODO: Get paths from https://yqnn.github.io/svg-path-editor/
// Left side of sodium voltage gated
// TODO: command to close the shape?
const leftSideClosed = 'M 6.193 12.838 C 6.969 13.513 7.611 12.77 8.117 12.298 Q 8.303 11.994 8.151 11.488 Q 7.51 9.834 8.623 8.551 C 9.467 7.268 10.041 7.099 9.4 6.255 Q 8.421 5.243 8.995 3.116 L 8.826 2.576 Q 6.969 -0.293 5.18 3.352 Q 4.201 7.133 6.092 12.568';
const leftSideOpened = 'M 6.193 12.838 C 6.969 13.513 7.611 12.77 8.117 12.298 Q 8.303 11.994 8.151 11.488 Q 7.746 9.901 8.387 8.517 C 8.421 7.302 8.286 7.504 8.792 6.323 Q 8.927 5.31 8.995 3.116 L 8.826 2.576 Q 6.969 -0.293 5.18 3.352 Q 4.201 7.133 6.092 12.568';

// TODO: How to add multiple shapes here and in canvas? Just have them relatively positioned?
// TODO: How to make sure canvas and scenery use the same colors/strokes?

// https://github.com/pbeshai/d3-interpolate-path
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const interpolate = window.interpolatePath( leftSideClosed, leftSideOpened );

export default class SodiumVoltageGatedChannelNode extends Path {
  public constructor( providedOptions?: CanvasNodeOptions ) {

    super( interpolate( 0.5 ), combineOptions<PathOptions>( {
      cursor: 'pointer', // TODO: This should be elsewhere
      stroke: 'black',
      lineWidth: 0.4,
      fill: 'gray',
      scale: 5
    }, providedOptions ) );
  }
}

const shape = new Shape( interpolate( 0.5 ) ); // To get the bounds

export const getInterpolatedPathSodiumVoltageGatedChannelBounds = (): Bounds2 => shape.getBounds();

export const getInterpolatedPathSodiumVoltageGatedChannelNode = ( amount: number ): string => interpolate( amount );

membraneChannels.register( 'SodiumVoltageGatedChannelNode', SodiumVoltageGatedChannelNode );