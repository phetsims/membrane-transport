// Copyright 2025, University of Colorado Boulder

/**
 * The model for a particle in membrane channels.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from './MembraneChannelsModel.js';
import SoluteType, { getSoluteModelWidth, ParticleType } from './SoluteType.js';
import stepSoluteRandomWalk from './stepSoluteRandomWalk.js';

/**
 * Solute class for Membrane Channels sim, supporting multiple modes of motion,
 * including a smooth "curved" random walk.
 */
export default class Particle<T extends ParticleType> {

  // Possible modes of motion:
  //   - 'randomWalk'  -> same as 'delayedWalk' but direction changes are gradual
  //   - 'bound'              -> solute is bound (for example, to a channel)
  // TODO: Do we need a subclass for Particles that can be userControlled (like ligands)?
  public mode: 'randomWalk' | 'bound' | 'passThroughToInside' | 'passThroughToOutside' | 'userControlled' | 'userOver' = 'randomWalk';

  // =============================================================
  // FIELDS FOR SMOOTH, DELAYED RANDOM WALK
  // =============================================================

  // Current direction of travel. This vector is usually normalized (length 1).
  public currentDirection: Vector2;

  // The new direction we will gradually turn toward.
  public targetDirection: Vector2;

  // How long (in seconds) it takes to fully rotate from currentDirection to targetDirection.
  public turnDuration: number;

  // How much time (in seconds) has elapsed in the current "turn" from currentDirection to targetDirection.
  public turnElapsed: number;

  // How long (in seconds) we continue traveling before choosing a new targetDirection.
  public timeUntilNextDirection: number;

  // Size of the solute in model coordinates.
  public readonly dimension: Dimension2;

  public constructor(
    public readonly position: Vector2,
    public readonly type: T
  ) {
    this.dimension = new Dimension2(
      getSoluteModelWidth( type ),
      getSoluteModelWidth( type ) / MembraneChannelsConstants.SOLUTE_ASPECT_RATIO_MAP[ type ]
    );

    // For smooth turning, initialize both directions to something random.
    this.currentDirection = Particle.createRandomUnitVector();
    this.targetDirection = Particle.createRandomUnitVector();

    // Initialize how long it takes to turn (e.g., 0.5 to 1.5 seconds).
    this.turnDuration = dotRandom.nextDoubleBetween( 0.5, 1.5 );
    this.turnElapsed = 0;

    // After 1–4 seconds, we’ll pick a new direction and smoothly turn to it.
    this.timeUntilNextDirection = dotRandom.nextDoubleBetween( 1, 4 );
  }

  /**
   * Make the solute move toward a target location right away. It will continue to move in that direction for the
   * specified duration.
   *
   * While moving toward the destination, the solute will be in 'randomWalk' mode.
   */
  public moveToward( target: Vector2, duration: number ): void {
    this.mode = 'randomWalk';

    this.currentDirection = target;
    this.targetDirection = target;
    this.timeUntilNextDirection = duration;
  }

  public step( dt: number, model: MembraneChannelsModel ): void {
    if ( this.mode === 'randomWalk' ) {
      stepSoluteRandomWalk( this, dt, model );
    }
    else if ( this.mode === 'bound' ) {
      // Mode where solute doesn’t move, or does something special
    }
    else if ( this.mode === 'passThroughToInside' ) {
      // Mode where solute passes through the membrane to the inside
      this.position.y -= 5 * dt;

      // TODO: Solutes are supposed to do a constrained random walk through the membrane.
      if ( ( this.position.y + this.dimension.height / 2 ) < MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ) {

        // The next direction should mostly point down so that the solute doesn't go right back out
        const downwardDirection = new Vector2( dotRandom.nextDoubleBetween( -1, 1 ), dotRandom.nextDoubleBetween( -1, 0 ) ).normalize();
        this.moveToward( downwardDirection, dotRandom.nextDoubleBetween( 1, 2 ) );
      }
    }
    else if ( this.mode === 'passThroughToOutside' ) {
      // Mode where solute passes through the membrane to the outside
      this.position.y += 5 * dt;
      if ( ( this.position.y - this.dimension.height / 2 ) > MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY ) {

        const upwardDirection = new Vector2( dotRandom.nextDoubleBetween( -1, 1 ), dotRandom.nextDoubleBetween( 0, 1 ) ).normalize();
        this.moveToward( upwardDirection, dotRandom.nextDoubleBetween( 1, 2 ) );
      }
    }
  }

  public static createRandomUnitVector(): Vector2 {
    // Create a random direction by picking a random angle between 0 and 2π.
    const angle = dotRandom.nextDouble() * 2 * Math.PI;
    return new Vector2( Math.cos( angle ), Math.sin( angle ) );
  }

  /**
   * Individual Solute instances are not PhET-iO Instrumented. Instead, the container that contains the Solutes
   * calls ParticleIO.toStateObject to serialize the Solute instances. MembraneChannelsModel uses reference type serialization
   * as a composite of the Solutes, which use data type serialization.
   *
   * Please see https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   * for more information on the different serialization types.
   */
  public static readonly ParticleIO = new IOType<Particle<ParticleType>, SoluteStateObject>( 'ParticleIO', {
    valueType: Particle,
    stateSchema: {
      position: Vector2.Vector2IO,
      type: StringIO
    },
    fromStateObject: ( stateObject: SoluteStateObject ) => {
      return new Particle(
        new Vector2( stateObject.position.x, stateObject.position.y ),
        stateObject.type
      );
    }
  } );
}

export type SoluteStateObject = {
  position: Vector2;
  type: SoluteType;
};

membraneChannels.register( 'Particle', Particle );