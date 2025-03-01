// Copyright 2025, University of Colorado Boulder

import Shape from '../../../../../kite/js/Shape.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import { sodiumVoltageGatedShapeClosedNegative70, sodiumVoltageGatedShapeClosedPositive30, sodiumVoltageGatedShapeOpenNegative50 } from './SodiumVoltageGatedChannelShapes.js';

// So the import does not get stripped on reformat
console.log( sodiumVoltageGatedShapeClosedPositive30.length );

const closedNegative70Segments = sodiumVoltageGatedShapeClosedNegative70.split( ' M ' ).map( segment => {
  return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
} );
const openSegments = sodiumVoltageGatedShapeOpenNegative50.split( ' M ' ).map( segment => {
  return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
} );
// const closed30Segments = closedPositive30.split( ' M ' ).map( segment => {
//   return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
// } );

// TODO: How to add multiple shapes here and in canvas? Just have them relatively positioned?
// TODO: How to make sure canvas and scenery use the same colors/strokes?

const interpolates: IntentionalAny[] = [];
for ( let i = 0; i < closedNegative70Segments.length; i++ ) {

  // https://github.com/pbeshai/d3-interpolate-path
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
  interpolates[ i ] = window.interpolatePath( closedNegative70Segments[ i ], openSegments[ i ] );
  // interpolates[ i ] = window.interpolatePath( openSegments[ i ], closed30Segments[i] );
}

export default class SodiumVoltageGatedChannelNode extends Node {
  public constructor() {

    super();

    closedNegative70Segments.forEach( ( segment, index ) => {
      this.addChild( new Path( new Shape( segment ), {
        stroke: 'black',
        lineWidth: 0.4,
        fill: index === 4 ? null : 'white',
        scale: 4
      } ) );
    } );

    this.touchArea = this.localBounds.dilatedXY( 10, 10 );
    this.mouseArea = this.localBounds.dilatedXY( 10, 10 );
  }

  public setInterpolation( amount: number ): void {
    this.children.forEach( ( child, index ) => {
      ( child as Path ).shape = new Shape( interpolates[ index ]( amount ) );
    } );
  }
}

membraneChannels.register( 'SodiumVoltageGatedChannelNode', SodiumVoltageGatedChannelNode );