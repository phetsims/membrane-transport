// Copyright 2025, University of Colorado Boulder

/**
 * Abstract base class for particle modes that involve directional movement across the membrane.
 * Factors out common movement logic shared between PassiveDiffusionMode and MovingThroughTransportProteinMode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import { boxMullerTransform } from '../../../../../dot/js/util/boxMullerTransform.js';
import { clamp } from '../../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import BaseParticleMode, { ParticleModeType } from './BaseParticleMode.js';

export default abstract class DirectionalMovementMode extends BaseParticleMode {

  protected constructor( type: ParticleModeType, public readonly direction: 'inward' | 'outward' ) {
    super( type );
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    this.performDirectionalMovement( dt, particle, model );
    this.handleSpecificBehavior( dt, particle, model );
    this.handleBoundaryBehavior( dt, particle );
  }

  protected performDirectionalMovement( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const sign = this.direction === 'inward' ? -1 : 1;
    const signBefore = particle.position.y > 0;
    const TYPICAL_SPEED = 100;

    particle.position.y += sign * ( TYPICAL_SPEED / 5 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
    particle.position.x += dotRandom.nextDoubleBetween( -2, 2 ) * ( TYPICAL_SPEED / 2 ) * dt;

    const signAfter = particle.position.y > 0;

    if ( signBefore !== signAfter ) {
      model.soluteCrossedMembraneEmitter.emit( particle, particle.position.y > 0 ? 'outward' : 'inward' );
    }
  }

  protected sampleValueHowLongToGoStraight(): number {
    const result = boxMullerTransform( 0.3, 0.4, dotRandom );
    return clamp( result, 0.01, 2 );
  }

  protected handleBoundaryBehavior( dt: number, particle: Particle ): void {
    if ( this.direction === 'inward' && ( particle.position.y + particle.dimension.height / 2 ) < MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
      const downwardDirection = new Vector2(
        dotRandom.nextDoubleBetween( -1, 1 ),
        dotRandom.nextDoubleBetween( -1, 0 )
      ).normalize();
      particle.moveInDirection( downwardDirection, this.sampleValueHowLongToGoStraight() );
    }
    if ( this.direction === 'outward' && ( particle.position.y - particle.dimension.height / 2 ) > MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ) {
      const upwardDirection = new Vector2(
        dotRandom.nextDoubleBetween( -1, 1 ),
        dotRandom.nextDoubleBetween( 0, 1 )
      ).normalize();
      particle.moveInDirection( upwardDirection, this.sampleValueHowLongToGoStraight() );
    }
  }

  protected abstract handleSpecificBehavior( dt: number, particle: Particle, model: MembraneTransportModel ): void;
}

membraneTransport.register( 'DirectionalMovementMode', DirectionalMovementMode );