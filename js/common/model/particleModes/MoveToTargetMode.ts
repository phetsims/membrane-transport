// Copyright 2025, University of Colorado Boulder

/**
 * Abstract base class for particle modes that involve moving toward a target position.
 * Subclasses define the target position and what happens when the target is reached.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import BaseParticleMode, { ParticleModeType } from './BaseParticleMode.js';

export default abstract class MoveToTargetMode extends BaseParticleMode {

  protected constructor( type: ParticleModeType ) {
    super( type );
  }

  /**
   * Get the target position for this movement mode.
   * @param particle - The particle being moved
   * @param model - The model containing the particle
   * @returns The target position
   */
  protected abstract getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2;

  /**
   * Called when the particle has reached the target position.
   * @param particle - The particle that reached the target
   * @param model - The model containing the particle
   * @param targetPosition - The target position that was reached
   */
  protected abstract onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void;

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const currentPosition = particle.position.copy();
    const targetPosition = this.getTargetPosition( particle, model );

    const vector = targetPosition.minus( currentPosition );
    const distance = vector.magnitude;
    const maxStepSize = MembraneTransportConstants.TYPICAL_SPEED * dt;

    if ( distance <= maxStepSize ) {
      // We can reach the target in this step
      this.onTargetReached( particle, model, targetPosition );
    }
    else {
      // Move toward the target
      const direction = vector.normalized();
      particle.position.x += direction.x * maxStepSize;
      particle.position.y += direction.y * maxStepSize;
    }
  }
}

membraneTransport.register( 'MoveToTargetMode', MoveToTargetMode );