// Copyright 2025, University of Colorado Boulder

/**
 * Particle is moving (active or passive) through the interior of a transport protein channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import { boxMullerTransform } from '../../../../../dot/js/util/boxMullerTransform.js';
import { clamp } from '../../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import TransportProteinType from '../proteins/TransportProteinType.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class MovingThroughTransportProteinMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly transportProteinType: TransportProteinType,
                      public readonly direction: 'inward' | 'outward',
                      public readonly offset?: number ) {
    super( 'movingThroughTransportProtein' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      transportProteinType: this.transportProteinType,
      direction: this.direction,
      offset: this.offset || null
    };
  }

  public step( dt: number, particle: Particle<IntentionalAny>, model: MembraneTransportModel ): void {
    const sign = this.direction === 'inward' ? -1 : 1;
    const signBefore = particle.position.y > 0;
    const TYPICAL_SPEED = 30;

    particle.position.y += sign * ( TYPICAL_SPEED / 5 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
    particle.position.x += dotRandom.nextDoubleBetween( -2, 2 ) * ( TYPICAL_SPEED / 2 ) * dt;

    const signAfter = particle.position.y > 0;

    if ( signBefore !== signAfter ) {
      model.soluteCrossedMembraneEmitter.emit( particle, particle.position.y > 0 ? 'outward' : 'inward' );
    }

    const center = this.slot.position + ( this.offset || 0 );
    const maxDistanceFromCenter = 0.8;
    if ( Math.abs( particle.position.x - center ) > maxDistanceFromCenter ) {
      particle.position.x = center + maxDistanceFromCenter * Math.sign( particle.position.x - center );
    }

    const crossedOver = this.direction === 'inward' && particle.position.y < 0 ||
                        this.direction === 'outward' && particle.position.y > 0;

    if ( crossedOver && Math.abs( particle.position.y ) > MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 ) {
      const transportProtein = this.slot.transportProteinProperty.value;

      if ( transportProtein instanceof SodiumGlucoseCotransporter ) {
        transportProtein.stateProperty.value = 'openToInside';
      }
    }

    const sampleValueHowLongToGoStraight = () => {
      const result = boxMullerTransform( 0.3, 0.4, dotRandom );
      return clamp( result, 0.01, 2 );
    };

    if ( this.direction === 'inward' && ( particle.position.y + particle.dimension.height / 2 ) < MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
      const downwardDirection = new Vector2(
        dotRandom.nextDoubleBetween( -1, 1 ),
        dotRandom.nextDoubleBetween( -1, 0 )
      ).normalize();
      particle.moveInDirection( downwardDirection, sampleValueHowLongToGoStraight() );
    }
    if ( this.direction === 'outward' && ( particle.position.y - particle.dimension.height / 2 ) > MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ) {
      const upwardDirection = new Vector2(
        dotRandom.nextDoubleBetween( -1, 1 ),
        dotRandom.nextDoubleBetween( 0, 1 )
      ).normalize();
      particle.moveInDirection( upwardDirection, sampleValueHowLongToGoStraight() );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MovingThroughTransportProteinMode {
    return new MovingThroughTransportProteinMode(
      slot,
      stateObject.transportProteinType,
      stateObject.direction,
      stateObject.offset
    );
  }
}

membraneTransport.register( 'MovingThroughTransportProteinMode', MovingThroughTransportProteinMode );