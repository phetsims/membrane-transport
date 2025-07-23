// Copyright 2025, University of Colorado Boulder

/**
 * Abstract base class for particle modes that involve moving toward a target position.
 * Subclasses define the target position and what happens when the target is reached.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import BaseParticleMode, { ParticleModeType } from './BaseParticleMode.js';

export default abstract class MoveToTargetMode extends BaseParticleMode {

  // Track whether the particle has reached its intermediate checkpoint
  private hasReachedCheckpoint = false;

  // Getter to expose checkpoint status for debugging
  public get hasReachedCheckpointPublic(): boolean {
    return this.hasReachedCheckpoint;
  }

  protected constructor( type: ParticleModeType,
                         public readonly startPosition: Vector2,
                         public readonly checkpoint: Vector2,
                         public readonly targetPosition: Vector2,
                         hasReachedCheckpoint = false ) {
    super( type );
    this.hasReachedCheckpoint = hasReachedCheckpoint;
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

  /**
   * Calculate an intermediate checkpoint that deviates from the direct path by up to +/- 30 degrees.
   * This simulates the Brownian motion seen in RandomWalkMode.
   * The checkpoint is always chosen to move away from the membrane.
   * @param start - The starting position
   * @param target - The final target position
   * @returns The intermediate checkpoint position
   */
  public static calculateIntermediateCheckpoint( start: Vector2, target: Vector2 ): Vector2 {

    const midpoint = start.average( target );

    // Determine which side of the membrane we're on (positive y is outside cell)
    const isOutsideCell = start.y > 0;

    // Calculate the deviation distance (proportional to the direct path length)
    const deviationDistance = 5;

    // Create a deviation vector that always points away from the membrane
    const deviationVector = new Vector2(
      dotRandom.nextDoubleBetween( -2, 2 ), // Random x component
      isOutsideCell ? 2 : -2  // y component always away from membrane
    ).normalized().timesScalar( deviationDistance );

    // Apply the deviation to the midpoint
    return midpoint.plus( deviationVector );
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const currentPosition = particle.position.copy();

    // Determine which target we're moving toward (checkpoint or final target)
    const currentTarget = this.hasReachedCheckpoint ? this.targetPosition : this.checkpoint;

    const vector = currentTarget.minus( currentPosition );
    const distance = vector.magnitude;
    const maxStepSize = MembraneTransportConstants.TYPICAL_SPEED * dt;

    if ( distance <= maxStepSize ) {
      // We can reach the current target in this step
      if ( !this.hasReachedCheckpoint ) {
        // Reached the checkpoint, now move toward the final target
        this.hasReachedCheckpoint = true;
        particle.position.set( currentTarget );
      }
      else {
        // Reached the final target
        this.onTargetReached( particle, model, this.targetPosition );
      }
    }
    else {
      // Move toward the current target
      const direction = vector.normalized();
      particle.position.x += direction.x * maxStepSize;
      particle.position.y += direction.y * maxStepSize;
    }
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      startPosition: { x: this.startPosition.x, y: this.startPosition.y },
      checkpoint: { x: this.checkpoint.x, y: this.checkpoint.y },
      targetPosition: { x: this.targetPosition.x, y: this.targetPosition.y },
      hasReachedCheckpoint: this.hasReachedCheckpoint
    };
  }
}

membraneTransport.register( 'MoveToTargetMode', MoveToTargetMode );