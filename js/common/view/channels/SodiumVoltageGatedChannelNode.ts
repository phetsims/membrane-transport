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
 * Use https://github.com/pbeshai/d3-interpolate-path for path interpolation.
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
const closedPositive30Segments = sodiumVoltageGatedShapeClosedPositive30.split( ' M ' ).map( segment => {
  return segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
} );

// Create interpolation functions between different voltage states
const interpolateNegative70ToNegative50: IntentionalAny[] = [];
const interpolateNegative50ToPositive30: IntentionalAny[] = [];

for ( let i = 0; i < closedNegative70Segments.length; i++ ) {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  interpolateNegative70ToNegative50[ i ] = window.interpolatePath( closedNegative70Segments[ i ], openSegments[ i ] );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  interpolateNegative50ToPositive30[ i ] = window.interpolatePath( openSegments[ i ], closedPositive30Segments[ i ] );
}

// Map string voltage values to numerical values for interpolation
const voltageValues: Record<string, number> = {
  '-70': -70,
  '-50': -50,
  30: 30
};

// Voltage range constants for interpolation
// TODO: Compute from the values above.
const RANGE_NEGATIVE_70_TO_NEGATIVE_50 = 20; // -50 - (-70) = 20
const RANGE_NEGATIVE_50_TO_POSITIVE_30 = 80; // 30 - (-50) = 80

export default class SodiumVoltageGatedChannelNode extends Node {

  // TODO: Factor out types. Do we like strings? Do we want -70mV string?
  // TODO: Or a type like 'name: string; value: number'? But we want it to work well for PhET-iO
  private targetVoltage: '-70' | '-50' | '30' = '-70';
  private currentVoltageValue = -70;

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

  public setVoltage( voltage: '-70' | '-50' | '30' ): void {
    this.targetVoltage = voltage;
  }

  public step( dt: number ): void {
    const targetValue = voltageValues[ this.targetVoltage ];

    // If already at target, don't regenerate the shape
    if ( this.currentVoltageValue === targetValue ) {
      return;
    }

    // step toward the targetValue by 1
    if ( this.currentVoltageValue < targetValue ) {
      this.currentVoltageValue += dt * 60;
    }
    else {
      this.currentVoltageValue -= dt * 60;
    }

    // Update the shapes based on the current voltage
    this.updateShapes();
  }

  private updateShapes(): void {

    // Calculate interpolation values based on current voltage
    let interpolationValue: number;
    let interpolationFunction: IntentionalAny[];

    if ( this.currentVoltageValue <= -50 ) {

      // Interpolate between -70 and -50
      interpolationValue = ( this.currentVoltageValue - ( -70 ) ) / RANGE_NEGATIVE_70_TO_NEGATIVE_50;
      interpolationFunction = interpolateNegative70ToNegative50;
    }
    else {

      // Interpolate between -50 and 30
      interpolationValue = ( this.currentVoltageValue - ( -50 ) ) / RANGE_NEGATIVE_50_TO_POSITIVE_30;
      interpolationFunction = interpolateNegative50ToPositive30;
    }

    // Clamp interpolation value between 0 and 1
    interpolationValue = Math.max( 0, Math.min( 1, interpolationValue ) );

    // Update all path shapes
    this.children.forEach( ( child, index ) => {
      if ( interpolationFunction[ index ] ) {
        ( child as Path ).shape = new Shape( interpolationFunction[ index ]( interpolationValue ) );
      }
    } );
  }
}

membraneChannels.register( 'SodiumVoltageGatedChannelNode', SodiumVoltageGatedChannelNode );