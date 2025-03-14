// Copyright 2025, University of Colorado Boulder

import Matrix3 from '../../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Shape from '../../../../../kite/js/Shape.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../../membraneChannels.js';
import VoltageGatedChannel from '../../model/channels/VoltageGatedChannel.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * Use https://github.com/pbeshai/d3-interpolate-path for path interpolation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import { sodiumVoltageGatedShapeClosedNegative70, sodiumVoltageGatedShapeClosedPositive30, sodiumVoltageGatedShapeOpenNegative50 } from './SodiumVoltageGatedChannelShapes.js';

const parse = ( segment: string ) => segment.startsWith( 'M ' ) ? segment.trim() : ( 'M ' + segment ).trim();
const sodiumClosedNegative70Segments = sodiumVoltageGatedShapeClosedNegative70.split( ' M ' ).map( parse );
const sodiumOpenSegments = sodiumVoltageGatedShapeOpenNegative50.split( ' M ' ).map( parse );
const sodiumClosedPositive30Segments = sodiumVoltageGatedShapeClosedPositive30.split( ' M ' ).map( parse );

const potassiumClosedNegative70Segments = sodiumClosedNegative70Segments;
const potassiumOpenSegments = sodiumOpenSegments;
const potassiumClosedPositive30Segments = sodiumClosedPositive30Segments;

// Create interpolation functions between different voltage states
const sodiumInterpolateNegative70ToNegative50: IntentionalAny[] = [];
const sodiumInterpolateNegative50ToPositive30: IntentionalAny[] = [];
const potassiumInterpolateNegative70ToNegative50: IntentionalAny[] = [];
const potassiumInterpolateNegative50ToPositive30: IntentionalAny[] = [];

for ( let i = 0; i < sodiumClosedNegative70Segments.length; i++ ) {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  sodiumInterpolateNegative70ToNegative50[ i ] = window.interpolatePath( sodiumClosedNegative70Segments[ i ], sodiumOpenSegments[ i ] );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  sodiumInterpolateNegative50ToPositive30[ i ] = window.interpolatePath( sodiumOpenSegments[ i ], sodiumClosedPositive30Segments[ i ] );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  potassiumInterpolateNegative70ToNegative50[ i ] = window.interpolatePath( potassiumClosedNegative70Segments[ i ], potassiumClosedPositive30Segments[ i ] );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  potassiumInterpolateNegative50ToPositive30[ i ] = window.interpolatePath( potassiumClosedPositive30Segments[ i ], potassiumOpenSegments[ i ] );
}

// Map string voltage values to numerical values for interpolation
const voltageValues: Record<string, number> = {
  '-70': -70,
  '-50': -50,
  30: 30
};

// Voltage range constants for interpolation
const RANGE_NEGATIVE_70_TO_NEGATIVE_50 = voltageValues[ '-50' ] - voltageValues[ '-70' ];
const RANGE_NEGATIVE_50_TO_POSITIVE_30 = voltageValues[ '30' ] - voltageValues[ '-50' ];

export default class VoltageGatedChannelNode extends Node {

  // TODO: Factor out types. Do we like strings? Do we want -70mV string?
  // TODO: Or a type like 'name: string; value: number'? But we want it to work well for PhET-iO
  private targetVoltage: '-70' | '-50' | '30' = '-70';
  private currentVoltageValue = -70;

  private readonly segments: Path[] = [];

  public constructor( public readonly type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', channel: VoltageGatedChannel | null ) {
    super();

    // TODO: This is a workaround to center the channel in the view, because the entire Node is centered
    this.addChild( new Rectangle( 115, 385, 50, 85, { fill: 'white', opacity: 0 } ) );

    // TODO: Explain this part
    sodiumClosedNegative70Segments.forEach( ( segment, index ) => {
      const segmentPath = new Path( new Shape( segment ).transformed( Matrix3.translation( 0, 100 ) ), {
        stroke: 'black',
        lineWidth: 0.4,
        fill: index === 4 ? null : 'white',
        scale: 4,
        translation: new Vector2( 100, 0 )
      } );
      this.addChild( segmentPath );
      this.segments.push( segmentPath );
    } );

    this.touchArea = this.localBounds.dilatedXY( 10, 10 );
    this.mouseArea = this.localBounds.dilatedXY( 10, 10 );

    if ( channel ) {
      channel.model.membraneVoltagePotentialProperty.link( voltage => {
        this.targetVoltage = voltage;
      } );
    }
  }

  public step( dt: number ): void {
    const targetValue = voltageValues[ this.targetVoltage ];

    if ( this.currentVoltageValue === targetValue ) {
      return;
    }

    const delta = dt * 60;

    // If already at target, don't regenerate the shape
    if ( Math.abs( this.currentVoltageValue - targetValue ) < delta ) {
      this.currentVoltageValue = targetValue;
    }
    else {

      // step toward the targetValue by 1
      if ( this.currentVoltageValue < targetValue ) {
        this.currentVoltageValue += delta;
      }
      else {
        this.currentVoltageValue -= delta;
      }
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
      interpolationFunction = this.type === 'sodiumIonVoltageGatedChannel' ? sodiumInterpolateNegative70ToNegative50 : potassiumInterpolateNegative70ToNegative50;
    }
    else {

      // Interpolate between -50 and 30
      interpolationValue = ( this.currentVoltageValue - ( -50 ) ) / RANGE_NEGATIVE_50_TO_POSITIVE_30;
      interpolationFunction = this.type === 'sodiumIonVoltageGatedChannel' ? sodiumInterpolateNegative50ToPositive30 : potassiumInterpolateNegative50ToPositive30;
    }

    // Clamp interpolation value between 0 and 1
    interpolationValue = Math.max( 0, Math.min( 1, interpolationValue ) );

    // Update all path shapes
    this.segments.forEach( ( child, index ) => {
      if ( interpolationFunction[ index ] ) {
        child.shape = new Shape( interpolationFunction[ index ]( interpolationValue ) ).transformed( Matrix3.translation( 0, 100 ) );
      }
    } );
  }
}

membraneChannels.register( 'VoltageGatedChannelNode', VoltageGatedChannelNode );