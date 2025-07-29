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

  // Track which checkpoint the particle is currently targeting (0-2 for checkpoints, 3 for final target)
  private currentCheckpointIndex = 0;

  // Getters to expose checkpoint status for debugging
  public get currentCheckpointIndexPublic(): number {
    return this.currentCheckpointIndex;
  }

  // Get the checkpoint we're currently targeting (or target if all checkpoints reached)
  public get currentTargetPublic(): Vector2 {
    return this.currentCheckpointIndex < this.checkpoints.length ?
           this.checkpoints[ this.currentCheckpointIndex ] :
           this.targetPosition;
  }

  protected constructor( type: ParticleModeType,
                         public readonly startPosition: Vector2,
                         public readonly checkpoints: Vector2[],
                         public readonly targetPosition: Vector2,
                         currentCheckpointIndex = 0 ) {
    super( type );
    this.currentCheckpointIndex = currentCheckpointIndex;
  }

  /**
   * Get the target position for this movement mode.
   */
  protected abstract getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2;

  /**
   * Called when the particle has reached the target position.
   */
  protected abstract onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void;

  /**
   * Calculate three intermediate checkpoints between start and target.
   * The first two simulate Brownian motion, the third is positioned just outside the protein mouth.
   *
   * @param start - The starting position
   * @param target - The final target position
   * @param isProteinTarget - Whether the target is a protein binding site
   * @param particleType - The type of particle (used for special handling like ATP)
   * @returns Array of three checkpoint positions
   */
  public static calculateCheckpoints( start: Vector2, target: Vector2, isProteinTarget: boolean, particleType?: string ): Vector2[] {
    const checkpoints: Vector2[] = [];

    // Determine which side of the membrane we're on (positive y is outside cell)
    const isOutsideCell = start.y > 0;

    // ATP particles need to stay further from the membrane to avoid permeation
    const isATP = particleType === 'atp';
    const membraneAvoidanceMultiplier = isATP ? 10 : 1.0;

    // First checkpoint at ~25% of the way
    const firstPoint = start.blend( target, 0.25 );
    const deviationDistance1 = 4;
    const deviationVector1 = new Vector2(
      dotRandom.nextDoubleBetween( -2, 2 ),
      ( isOutsideCell ? 1.5 : -1.5 ) * membraneAvoidanceMultiplier
    ).normalized().timesScalar( deviationDistance1 );
    checkpoints.push( firstPoint.plus( deviationVector1 ) );

    // Second checkpoint at ~50% of the way
    const secondPoint = start.blend( target, 0.5 );
    const deviationDistance2 = 5;
    const deviationVector2 = new Vector2(
      dotRandom.nextDoubleBetween( -2, 2 ),
      ( isOutsideCell ? 2 : -2 ) * membraneAvoidanceMultiplier
    ).normalized().timesScalar( deviationDistance2 );
    checkpoints.push( secondPoint.plus( deviationVector2 ) );

    // Third checkpoint - just outside the protein mouth if targeting a protein
    if ( isProteinTarget ) {
      // Position it just outside the membrane at the target's x coordinate with some randomness
      // ATP particles need extra distance from the membrane to avoid permeation
      const baseDistance = 8;
      const atpExtraDistance = isATP ? 20 : 0;
      const membraneEdgeY = isOutsideCell ?
                            MembraneTransportConstants.MEMBRANE_BOUNDS.maxY + baseDistance + atpExtraDistance :
                            MembraneTransportConstants.MEMBRANE_BOUNDS.minY - baseDistance - atpExtraDistance;
      const randomXOffset = dotRandom.nextDoubleBetween( -10, 10 );
      checkpoints.push( new Vector2( target.x + randomXOffset, membraneEdgeY ) );
    }
    else {
      // For non-protein targets, use a point at ~75% of the way
      const thirdPoint = start.blend( target, 0.75 );
      const deviationDistance3 = 3;
      const deviationVector3 = new Vector2(
        dotRandom.nextDoubleBetween( -1.5, 1.5 ),
        isOutsideCell ? 1 : -1
      ).normalized().timesScalar( deviationDistance3 );
      checkpoints.push( thirdPoint.plus( deviationVector3 ) );
    }

    return checkpoints;
  }

  /**
   * Move the particle towards a target position, which can be a checkpoint (if there are multiple) or the final target.
   * @param dt - in seconds
   * @param particle
   * @param model
   */
  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const currentPosition = particle.position.copy();

    // Determine which target we're moving toward
    const currentTarget = this.currentCheckpointIndex < this.checkpoints.length ?
                          this.checkpoints[ this.currentCheckpointIndex ] :
                          this.targetPosition;

    const vector = currentTarget.minus( currentPosition );
    const distance = vector.magnitude;
    const maxStepSize = MembraneTransportConstants.TYPICAL_SPEED * dt;

    if ( distance <= maxStepSize ) {
      // We can reach the current target in this step
      if ( this.currentCheckpointIndex < this.checkpoints.length ) {
        // Reached a checkpoint, move to the next one
        this.currentCheckpointIndex++;
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

  /**
   * Helper method for subclasses to create their state objects by combining base state with additional properties.
   * @param additionalProperties - Additional properties specific to the subclass
   * @returns Combined state object
   */
  protected createStateObject( additionalProperties: IntentionalAny ): IntentionalAny {
    const baseState = {
      type: this.type,
      startPosition: { x: this.startPosition.x, y: this.startPosition.y },
      checkpoints: this.checkpoints.map( checkpoint => ( { x: checkpoint.x, y: checkpoint.y } ) ),
      targetPosition: { x: this.targetPosition.x, y: this.targetPosition.y },
      currentCheckpointIndex: this.currentCheckpointIndex
    };
    // eslint-disable-next-line phet/no-object-spread-on-non-literals
    return { ...baseState, ...additionalProperties };
  }

  /**
   * Static helper method to create Vector2 objects from serialized state.
   * @param vectorState - Serialized vector with x and y properties
   * @returns New Vector2 instance
   */
  protected static createVector2FromState( vectorState: { x: number; y: number } ): Vector2 {
    return new Vector2( vectorState.x, vectorState.y );
  }

  /**
   * Helper method to create intermediate movement positions for a particle. Uses calculateCheckpoints to create
   * points that make it look like the particle is moving toward a target position, with some randomness.
   *
   * @param particle
   * @param targetPosition - The final target position
   * @param isProteinTarget - Whether the target is a protein binding site
   * @returns Object containing startPosition, checkpoints array, and targetPosition
   */
  public static createMovementPositions( particle: Particle, targetPosition: Vector2, isProteinTarget = false ): {
    startPosition: Vector2;
    checkpoints: Vector2[];
    targetPosition: Vector2;
  } {
    const startPosition = particle.position.copy();
    const checkpoints = MoveToTargetMode.calculateCheckpoints( startPosition, targetPosition, isProteinTarget, particle.type );
    return {
      startPosition: startPosition,
      checkpoints: checkpoints,
      targetPosition: targetPosition
    };
  }

  /**
   * Static helper method to create Vector2 array from serialized state.
   * @param checkpointsState - Serialized checkpoints array
   * @returns Array of Vector2 instances
   */
  protected static createCheckpointsFromState( checkpointsState: Array<{ x: number; y: number }> ): Vector2[] {
    return checkpointsState.map( checkpoint => new Vector2( checkpoint.x, checkpoint.y ) );
  }
}

membraneTransport.register( 'MoveToTargetMode', MoveToTargetMode );