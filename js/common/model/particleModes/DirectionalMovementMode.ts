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
import type Solute from '../Solute.js';
import BaseParticleMode from './BaseParticleMode.js';

export default abstract class DirectionalMovementMode extends BaseParticleMode {

  protected constructor( type: 'movingThroughTransportProtein' | 'passiveDiffusion', public readonly direction: 'inward' | 'outward' ) {
    super( type );
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    this.performDirectionalMovement( dt, particle, model );
    this.handleSpecificBehavior( dt, particle, model );
    this.handleBoundaryBehavior( dt, particle );
  }

  /**
   * Moves a particle through the membrane, with some randomness to "jiggle" through. But it moves faster vertically to cross the membrane.
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
      model.soluteCrossedMembraneEmitter.emit( particle as Solute, particle.position.y > 0 ? 'outward' : 'inward' );
    }
  }

  protected handleBoundaryBehavior( dt: number, particle: Particle ): void {
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