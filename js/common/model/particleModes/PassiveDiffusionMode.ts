// Copyright 2025, University of Colorado Boulder

/**
 * Particle (e.g., O2, CO2) is moving directly across the lipid bilayer without a channel or transporter.
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
import BaseParticleMode from './BaseParticleMode.js';

export default class PassiveDiffusionMode extends BaseParticleMode {

  public readonly slot = null;

  public constructor( public readonly direction: 'inward' | 'outward' ) {
    super( 'passiveDiffusion' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      direction: this.direction
    };
  }

  // TODO: Shares some code with MovingThroughTransportProteinMode, consider refactoring, see https://github.com/phetsims/membrane-transport/issues/236
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

  public static override fromStateObject( stateObject: IntentionalAny ): PassiveDiffusionMode {
    return new PassiveDiffusionMode( stateObject.direction );
  }
}

membraneTransport.register( 'PassiveDiffusionMode', PassiveDiffusionMode );