// Copyright 2025, University of Colorado Boulder

/**
 * The model for a particle in membrane channels.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import MembraneChannelsConstants, { PARTICLE_ASPECT_RATIO_MAP } from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import ChannelType from './ChannelType.js';
import MembraneChannelsModel from './MembraneChannelsModel.js';
import Slot from './Slot.js';
import SoluteType, { getParticleModelWidth, ParticleType } from './SoluteType.js';

// Typical speed for movement
const typicalSpeed = 30;

type RandomWalkMode = {
  type: 'randomWalk';
  currentDirection: Vector2;
  targetDirection: Vector2;
  turnDuration: number;
  turnElapsed: number;
  timeUntilNextDirection: number;
};

type BoundMode = {
  type: 'bound';
};

type MoveToCenterOfChannelMode = {
  type: 'moveToCenterOfChannel';
  slot: Slot;
};

type PassiveDiffusionMode = {
  type: 'passiveDiffusion';
  direction: 'inward' | 'outward';
};

type MovingThroughChannelMode = {
  type: 'movingThroughChannel';
  slot: Slot;
  channelType: ChannelType;
  direction: 'inward' | 'outward';
};

type UserControlledMode = {
  type: 'userControlled';
};

type UserOverMode = {
  type: 'userOver';
};

type ParticleMode =
  | RandomWalkMode
  | BoundMode
  | MoveToCenterOfChannelMode
  | PassiveDiffusionMode
  | MovingThroughChannelMode
  | UserControlledMode
  | UserOverMode;

/**
 * Gets the current interpolated direction from a random walk mode, based on how far the particle has turned.
 */
function getInterpolatedDirection( mode: RandomWalkMode ): Vector2 {
  const alpha = Utils.clamp( mode.turnElapsed / mode.turnDuration, 0, 1 );
  return mode.currentDirection.blend( mode.targetDirection, alpha ).normalized();
}

export default class Particle<T extends ParticleType> {

  public mode: ParticleMode;

  // Size of the solute in model coordinates.
  public readonly dimension: Dimension2;

  public opacity = 1;

  public constructor(
    public readonly position: Vector2,
    public readonly type: T
  ) {
    this.dimension = new Dimension2(
      getParticleModelWidth( type ),
      getParticleModelWidth( type ) / PARTICLE_ASPECT_RATIO_MAP[ type ]
    );

    // Start in random walk mode with random directions.
    this.mode = this.createRandomWalkMode();
  }

  public createRandomWalkMode(): RandomWalkMode {
    return {
      type: 'randomWalk',
      currentDirection: Particle.createRandomUnitVector(),
      targetDirection: Particle.createRandomUnitVector(),
      turnDuration: dotRandom.nextDoubleBetween( 0.1, 0.2 ),
      turnElapsed: 0,
      timeUntilNextDirection: dotRandom.nextDoubleBetween( 0.1, 0.3 )
    };
  }

  /**
   * Make the solute move toward a target location immediately.
   * The particle remains in random walk mode while moving toward the target.
   */
  public moveToward( target: Vector2, duration: number ): void {
    this.mode = {
      type: 'randomWalk',
      currentDirection: target,
      targetDirection: target,
      turnDuration: dotRandom.nextDoubleBetween( 0.1, 0.2 ),
      turnElapsed: 0,
      timeUntilNextDirection: duration
    };
  }

  public step( dt: number, model: MembraneChannelsModel ): void {

    // When glucose is inside the cell, it is absorbed.
    if ( this.type === 'glucose' && this.position.y < MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ) {
      this.opacity -= 0.01;
      if ( this.opacity <= 0 ) {
        model.removeParticle( this );
        return;
      }
    }

    if ( this.mode.type === 'randomWalk' ) {
      this.stepRandomWalk( dt, model );
    }
    else if ( this.mode.type === 'bound' ) {
      // Bound mode: particle does not move or has special behavior.
    }
    else if ( this.mode.type === 'moveToCenterOfChannel' ) {

      const currentPositionX = this.position.x;
      const targetPositionX = this.mode.slot.position;

      // Move in the x direction toward the target.
      const maxStepSize = typicalSpeed * dt;
      this.position.x += Math.sign( targetPositionX - currentPositionX ) * maxStepSize;

      // When close enough, transition to a membrane-crossing mode.
      if ( Math.abs( targetPositionX - currentPositionX ) <= maxStepSize ) {

        // Determine whether the particle is above or below the membrane.
        const outsideOfCell = this.position.y > 0;

        this.mode = {
          type: 'movingThroughChannel',
          slot: this.mode.slot,
          channelType: this.mode.slot.channelType!,
          direction: outsideOfCell ? 'inward' : 'outward'
        };
      }
    }
    else if ( this.mode.type === 'passiveDiffusion' || this.mode.type === 'movingThroughChannel' ) {

      // For both passive diffusion and moving through channel, use similar movement logic.
      const sign = this.mode.direction === 'inward' ? -1 : 1;

      this.position.y += sign * ( typicalSpeed / 4 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
      this.position.x += dotRandom.nextDoubleBetween( -1, 1 ) * ( typicalSpeed / 2 ) * dt;

      // Once the particle has moved sufficiently far from the membrane, resume random walk.
      if ( this.mode.direction === 'inward' && ( this.position.y + this.dimension.height / 2 ) < MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ) {
        const downwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( -1, 0 )
        ).normalize();
        this.moveToward( downwardDirection, dotRandom.nextDoubleBetween( 1, 2 ) );
      }
      if ( this.mode.direction === 'outward' && ( this.position.y - this.dimension.height / 2 ) > MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY ) {
        const upwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( 0, 1 )
        ).normalize();
        this.moveToward( upwardDirection, dotRandom.nextDoubleBetween( 1, 2 ) );
      }
    }
  }

  /**
   * Step the particle along a random walk path, including bouncing off the membrane
   * (central horizontal band) and the bounding walls.
   */
  private stepRandomWalk( dt: number, model: MembraneChannelsModel ): void {
    const randomWalk = this.mode as RandomWalkMode;

    // 1) Possibly update direction choices.
    randomWalk.timeUntilNextDirection -= dt;
    if ( randomWalk.timeUntilNextDirection <= 0 ) {

      // Finalize currentDirection using interpolation.
      randomWalk.currentDirection = getInterpolatedDirection( randomWalk );

      // Choose a new random target direction.
      randomWalk.targetDirection = Particle.createRandomUnitVector();

      // Decide on a new turn duration.
      randomWalk.turnDuration = dotRandom.nextDoubleBetween( 0.05, 0.1 );
      randomWalk.turnElapsed = 0;

      // Reset the time until the next direction change.
      randomWalk.timeUntilNextDirection = dotRandom.nextDoubleBetween( 0.5, 1 );
    }

    // 2) Accumulate turn time and compute the interpolated direction.
    randomWalk.turnElapsed += dt;
    const alpha = Utils.clamp( randomWalk.turnElapsed / randomWalk.turnDuration, 0, 1 );
    const direction = randomWalk.currentDirection.blend( randomWalk.targetDirection, alpha );

    // 3) Check for collisions with the membrane.
    const thisBounds = this.getBounds();

    // Are we above (y>0) or below (y<0) the membrane region?
    const outsideOfCell = this.position.y > 0;

    if ( MembraneChannelsConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      if ( this.type === 'oxygen' || this.type === 'carbonDioxide' ) {
        if ( dotRandom.nextDouble() < 0.90 ) {
          this.mode = {
            type: 'passiveDiffusion',
            direction: outsideOfCell ? 'inward' : 'outward'
          };
          return;
        }
      }

      const nearbySodiumLeakageChannelSlot = model.getNearbySlotForChannelType( this, 'sodiumIonLeakageChannel' );
      const nearbyPotassiumLeakageChannelSlot = model.getNearbySlotForChannelType( this, 'potassiumIonLeakageChannel' );

      if ( this.type === 'sodiumIon' && nearbySodiumLeakageChannelSlot && model.isChannelFree( nearbySodiumLeakageChannelSlot ) ) {
        this.mode = {
          type: 'moveToCenterOfChannel',
          slot: nearbySodiumLeakageChannelSlot
        };
        return;
      }
      if ( this.type === 'potassiumIon' && nearbyPotassiumLeakageChannelSlot && model.isChannelFree( nearbyPotassiumLeakageChannelSlot ) ) {
        this.mode = {
          type: 'moveToCenterOfChannel',
          slot: nearbyPotassiumLeakageChannelSlot
        };
        return;
      }

      // Handle membrane collision by reflecting vertical motion.
      if ( outsideOfCell ) {

        // Overlap with the membrane from above
        const overlap = MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - thisBounds.minY;

        // push the this back out of the membrane
        this.position.y += overlap;

        // Reflect the motion upward
        direction.y = Math.abs( direction.y );
        randomWalk.currentDirection.y = Math.abs( randomWalk.currentDirection.y );
        randomWalk.targetDirection.y = Math.abs( randomWalk.targetDirection.y );
      }
      else {

        // Overlap with the membrane from below
        const overlap = thisBounds.maxY - MembraneChannelsConstants.MEMBRANE_BOUNDS.minY;

        // push the this back out of the membrane
        this.position.y -= overlap;

        // Reflect the motion downward
        direction.y = -Math.abs( direction.y );
        randomWalk.currentDirection.y = -Math.abs( randomWalk.currentDirection.y );
        randomWalk.targetDirection.y = -Math.abs( randomWalk.targetDirection.y );
      }
    }

    // 4) Move the this according to the direction and speed
    //    (do this AFTER membrane collisions are handled).
    this.position.x += direction.x * dt * typicalSpeed;
    this.position.y += direction.y * dt * typicalSpeed;

    // 5) Now bounce off the 3 other walls in whichever bounding region we are in
    //    (INSIDE_CELL_BOUNDS if y<0, or OUTSIDE_CELL_BOUNDS if y>0).
    const boundingRegion = outsideOfCell ?
                           MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS :
                           MembraneChannelsConstants.INSIDE_CELL_BOUNDS;

    // Recompute thisBounds after the move
    const updatedBounds = this.getBounds();

    // Collide with left wall
    if ( updatedBounds.minX < boundingRegion.minX ) {
      this.position.x += boundingRegion.minX - updatedBounds.minX;
      direction.x = Math.abs( direction.x );
      randomWalk.currentDirection.x = Math.abs( randomWalk.currentDirection.x );
      randomWalk.targetDirection.x = Math.abs( randomWalk.targetDirection.x );
    }

    // Collide with right wall
    if ( updatedBounds.maxX > boundingRegion.maxX ) {
      this.position.x -= updatedBounds.maxX - boundingRegion.maxX;
      direction.x = -Math.abs( direction.x );
      randomWalk.currentDirection.x = -Math.abs( randomWalk.currentDirection.x );
      randomWalk.targetDirection.x = -Math.abs( randomWalk.targetDirection.x );
    }

    // Collide with bottom wall
    if ( updatedBounds.minY < boundingRegion.minY ) {
      this.position.y += boundingRegion.minY - updatedBounds.minY;
      direction.y = Math.abs( direction.y );
      randomWalk.currentDirection.y = Math.abs( randomWalk.currentDirection.y );
      randomWalk.targetDirection.y = Math.abs( randomWalk.targetDirection.y );
    }

    // Collide with top wall
    if ( updatedBounds.maxY > boundingRegion.maxY ) {
      this.position.y -= updatedBounds.maxY - boundingRegion.maxY;
      direction.y = -Math.abs( direction.y );
      randomWalk.currentDirection.y = -Math.abs( randomWalk.currentDirection.y );
      randomWalk.targetDirection.y = -Math.abs( randomWalk.targetDirection.y );
    }
  }

  public getBounds(): Bounds2 {
    return this.dimension.toBounds(
      this.position.x - this.dimension.width / 2,
      this.position.y - this.dimension.height / 2
    );
  }

  public static createRandomUnitVector(): Vector2 {
    // Create a random unit vector by picking an angle between 0 and 2π.
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