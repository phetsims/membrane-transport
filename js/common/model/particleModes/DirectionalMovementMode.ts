// Copyright 2025, University of Colorado Boulder

/**
 * Abstract base class for particle modes that involve directional movement across the membrane.
 * Factors out common movement logic shared between PassiveDiffusionMode and MovingThroughTransportProteinMode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dotRandom from '../../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import RandomWalkUtils from '../RandomWalkUtils.js';
import Slot from '../Slot.js';
import type Solute from '../Solute.js';
import SoluteCrossedMembraneEvent from '../SoluteCrossedMembraneEvent.js';
import BaseParticleMode from './BaseParticleMode.js';

export default abstract class DirectionalMovementMode extends BaseParticleMode {

  /**
   * @param type
   * @param direction - The direction of movement, either 'inward' (into the cell) or 'outward' (out of the cell).
   * @param slot - The slot that the particle is moving through, or null for passive diffusion.
   */
  protected constructor( type: 'movingThroughTransportProtein' | 'passiveDiffusion', public readonly direction: 'inward' | 'outward', public readonly slot: Slot | null ) {
    super( type );
  }

  /**
   * Updates the particle's position.
   *
   * @param dt - in seconds
   * @param particle
   * @param model
   */
  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    this.performDirectionalMovement( dt, particle, model );
    this.handleSpecificBehavior( dt, particle, model );
    this.handleBoundaryBehavior( particle );
  }

  /**
   * Moves a particle through the membrane, with some randomness to "jiggle" through. But it moves faster vertically to cross the membrane.
   *
   * @param dt - in seconds
   * @param particle
   * @param model
   */
  protected performDirectionalMovement( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const sign = this.direction === 'inward' ? -1 : 1;
    const signBefore = particle.position.y > 0;

    particle.position.y += sign * ( MembraneTransportConstants.TYPICAL_SPEED * 2 / 3 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
    particle.position.x += dotRandom.nextDoubleBetween( -2, 2 ) * ( MembraneTransportConstants.TYPICAL_SPEED * 5 / 3 ) * dt;

    const signAfter = particle.position.y > 0;

    if ( signBefore !== signAfter ) {

      // Ideally we would check instanceof Solute, but that triggers a cyclic import failure
      affirm( particle.hasOwnProperty( 'soluteType' ), 'Only solutes can cross the membrane' );

      model.soluteCrossedMembraneEmitter.emit( new SoluteCrossedMembraneEvent( this.slot, particle as Solute, particle.position.y > 0 ? 'outward' : 'inward' ) );
    }
  }

  /**
   * Handles the behavior of a particle when it reaches the membrane boundary.
   * If moving inward and the particle crosses the minimum Y boundary, it moves downward.
   * If moving outward and the particle crosses the maximum Y boundary, it moves upward.
   *
   * @param particle - The particle being moved.
   */
  protected handleBoundaryBehavior( particle: Particle ): void {
    if ( this.direction === 'inward' && ( particle.position.y + particle.dimension.height / 2 ) < MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
      const downwardDirection = new Vector2(
        dotRandom.nextDoubleBetween( -1, 1 ),
        dotRandom.nextDoubleBetween( -1, 0 )
      ).normalize();
      particle.moveInDirection( downwardDirection, RandomWalkUtils.sampleValueHowLongToGoStraight() );
    }
    if ( this.direction === 'outward' && ( particle.position.y - particle.dimension.height / 2 ) > MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ) {
      const upwardDirection = new Vector2(
        dotRandom.nextDoubleBetween( -1, 1 ),
        dotRandom.nextDoubleBetween( 0, 1 )
      ).normalize();
      particle.moveInDirection( upwardDirection, RandomWalkUtils.sampleValueHowLongToGoStraight() );
    }
  }

  protected abstract handleSpecificBehavior( dt: number, particle: Particle, model: MembraneTransportModel ): void;
}

membraneTransport.register( 'DirectionalMovementMode', DirectionalMovementMode );