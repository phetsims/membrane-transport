// Copyright 2025, University of Colorado Boulder

/**
 * The model for a particle in membrane channels.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import Channel from './channels/Channel.js';
import ChannelType from './channels/ChannelType.js';
import LigandGatedChannel from './channels/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from './channels/SodiumGlucoseCotransporter.js';
import MembraneChannelsModel from './MembraneChannelsModel.js';
import Slot from './Slot.js';
import SoluteType, { getParticleModelWidth, LigandType, ParticleType } from './SoluteType.js';

// Typical speed for movement
const typicalSpeed = 30;

// The radius of the circle around the center of a channel where a particle will be captured so
// we can decide how it should interact with the channel.
export const CAPTURE_RADIUS_PROPERTY = new NumberProperty( MembraneChannelsConstants.MEMBRANE_BOUNDS.height / 2 * 1.8 );

type RandomWalkMode = {
  type: 'randomWalk';
  currentDirection: Vector2;
  targetDirection: Vector2;
  turnDuration: number;
  turnElapsed: number;
  timeUntilNextDirection: number;
  slot: null;
};

type BoundMode = {
  type: 'ligandBound';
  slot: null;
};

type MoveToCenterOfChannelMode = {
  type: 'moveToCenterOfChannel';
  slot: Slot;
};

type MoveToSodiumGlucoseTransporterMode = {
  type: 'moveToSodiumGlucoseTransporter';
  slot: Slot;
  site: 'left' | 'right';
};

type WaitingInSodiumGlucoseTransporterMode = {
  type: 'waitingInSodiumGlucoseTransporter';
  slot: Slot;
  site: 'left' | 'right';
};

type MoveToLigandBindingLocationMode = {
  type: 'moveToLigandBindingLocation';
  slot: Slot;
};

type EnteringChannelMode = {
  type: 'enteringChannel';
  slot: Slot;
  direction: 'inward' | 'outward';
};

type SheddingCagedWaterMoleculesMode = {
  type: 'sheddingCagedWaterMolecules';
  slot: Slot;
  sheddingElapsed?: number;
};

type PassiveDiffusionMode = {
  type: 'passiveDiffusion';
  direction: 'inward' | 'outward';
  slot: null;
};

type MovingThroughChannelMode = {
  type: 'movingThroughChannel';
  slot: Slot;
  channelType: ChannelType;
  direction: 'inward' | 'outward';
};

type UserControlledMode = {
  type: 'userControlled';
  slot: null;
};

type UserOverMode = {
  type: 'userOver';
  slot: null;
};

type ParticleMode =
  | RandomWalkMode
  | BoundMode
  | MoveToCenterOfChannelMode
  | EnteringChannelMode
  | SheddingCagedWaterMoleculesMode
  | MoveToLigandBindingLocationMode
  | PassiveDiffusionMode
  | MovingThroughChannelMode
  | UserControlledMode
  | UserOverMode
  | MoveToSodiumGlucoseTransporterMode
  | WaitingInSodiumGlucoseTransporterMode;

/**
 * Gets the current interpolated direction from a random walk mode, based on how far the particle has turned.
 */
function getInterpolatedDirection( mode: RandomWalkMode ): Vector2 {
  const alpha = clamp( mode.turnElapsed / mode.turnDuration, 0, 1 );
  return mode.currentDirection.blend( mode.targetDirection, alpha ).normalized();
}

// TODO (design): refine these values
const MIN_RANDOM_WALK_TIME = 0.01;
const MAX_RANDOM_WALK_TIME = 0.05;

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
      getParticleModelWidth( type ) / MembraneChannelsConstants.PARTICLE_ASPECT_RATIO_MAP[ type ]
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
      timeUntilNextDirection: dotRandom.nextDoubleBetween( MIN_RANDOM_WALK_TIME, MAX_RANDOM_WALK_TIME ),
      slot: null
    };
  }

  /**
   * Make the solute move in a direction immediately.
   * The particle remains in random walk mode while moving toward the target.
   */
  public moveInDirection( direction: Vector2, duration: number ): void {
    this.mode = {
      type: 'randomWalk',
      currentDirection: direction,
      targetDirection: direction,
      turnDuration: dotRandom.nextDoubleBetween( 0.1, 0.2 ),
      turnElapsed: 0,
      timeUntilNextDirection: duration,
      slot: null
    };
  }

  /**
   * Move directly to a position without any brownian motion.
   */
  public moveToPosition( targetPosition: Vector2 ): void {
    const direction = targetPosition.minus( this.position ).normalized();
    this.moveInDirection( direction, Number.POSITIVE_INFINITY );
  }

  /**
   * This is a finite-state-machinelike implementation of the particle's behavior. We use a lightweight approach,
   * without classes or abstractions, to centralize the logic for the particle's behavior. This approach also worked well
   * in Projectile Data Lab's SamplingModel.launchButtonPressed
   */
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
    else if ( this.mode.type === 'ligandBound' ) {

      // The LigandGatedChannel is responsible for tracking the time bound, so it can detach after a certain amount of time.
      // Therefore, nothing to do here (particle remains stationary while bound).
    }
    else if ( this.mode.type === 'moveToCenterOfChannel' ) {

      const currentPositionX = this.position.x;
      const targetPositionX = this.mode.slot.position;

      // Move in the x direction toward the target.
      const maxStepSize = typicalSpeed * dt;
      this.position.x += Math.sign( targetPositionX - currentPositionX ) * maxStepSize;

      // When close enough, transition to enteringChannel mode.
      if ( Math.abs( targetPositionX - currentPositionX ) <= maxStepSize ) {
        this.mode = {
          type: 'enteringChannel',
          slot: this.mode.slot,
          direction: this.position.y > 0 ? 'inward' : 'outward'
        };
      }
    }
    else if ( this.mode.type === 'moveToSodiumGlucoseTransporter' ) {

      const currentPosition = this.position.copy();
      const targetPosition = new Vector2( this.mode.slot.position + 4 * ( this.mode.site === 'left' ? -1 : 1 ), 0 );

      const vector = targetPosition.minus( currentPosition );
      const direction = vector.normalized();

      // Move toward the target position at the typicalSpeed
      const maxStepSize = typicalSpeed * dt;
      this.position.x += direction.x * maxStepSize;
      this.position.y += direction.y * maxStepSize;

      // When close enough, transition to enteringChannel mode.
      if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {
        this.mode = {
          type: 'waitingInSodiumGlucoseTransporter',
          slot: this.mode.slot,
          site: this.mode.site
        };
      }
    }
    else if ( this.mode.type === 'enteringChannel' ) {
      const direction = this.position.y > 0 ? -1 : 1;
      const thresholdY = direction === -1
                         ? MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - this.dimension.height / 2
                         : MembraneChannelsConstants.MEMBRANE_BOUNDS.minY + this.dimension.height / 2;

      this.position.y += direction * typicalSpeed * dt;

      if ( ( direction === -1 && this.position.y <= thresholdY ) ||
           ( direction === 1 && this.position.y >= thresholdY ) ) {
        this.mode = {
          type: 'sheddingCagedWaterMolecules',
          slot: this.mode.slot
        };
      }
    }
    else if ( this.mode.type === 'sheddingCagedWaterMolecules' ) {
      const sheddingDuration = 0.5; // adjust as needed
      this.mode.sheddingElapsed = ( this.mode.sheddingElapsed || 0 ) + dt;

      if ( this.mode.sheddingElapsed >= sheddingDuration ) {
        const outsideOfCell = this.position.y > 0;
        this.mode = {
          type: 'movingThroughChannel',
          slot: this.mode.slot,
          channelType: this.mode.slot.channelType!,
          direction: outsideOfCell ? 'inward' : 'outward'
        };
      }
    }
    else if ( this.mode.type === 'moveToLigandBindingLocation' ) {

      const channel = this.mode.slot.channelProperty.value as LigandGatedChannel;
      if ( channel ) {
        const currentPosition = this.position;
        const targetPosition = channel.getBindingPosition();
        const maxStepSize = typicalSpeed * dt;

        // Move toward the binding position
        this.position.x += Math.sign( targetPosition.x - currentPosition.x ) * maxStepSize;
        this.position.y += Math.sign( targetPosition.y - currentPosition.y ) * maxStepSize;

        // When close enough, transition to a bound mode.
        if ( targetPosition.distance( currentPosition ) <= maxStepSize && channel.isAvailableForBinding() ) {
          affirm( this.type === 'ligandA' || this.type === 'ligandB', 'ligand should be ligandA or ligandB' );
          channel.bindLigand( this as Particle<LigandType> );
        }
      }
    }
    else if ( this.mode.type === 'passiveDiffusion' || this.mode.type === 'movingThroughChannel' ) {

      // For both passive diffusion and moving through channel, use similar movement logic.
      const sign = this.mode.direction === 'inward' ? -1 : 1;

      this.position.y += sign * ( typicalSpeed / 4 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
      this.position.x += dotRandom.nextDoubleBetween( -1, 1 ) * ( typicalSpeed / 2 ) * dt;

      // If moving through a channel, don't let the position get very far from the center. Allow a little movement
      // so that it looks like it "struggles" to get through.
      if ( this.mode.type === 'movingThroughChannel' ) {
        const center = this.mode.slot.position;
        const maxDistanceFromCenter = 0.5;
        if ( Math.abs( this.position.x - center ) > maxDistanceFromCenter ) {
          this.position.x = center + maxDistanceFromCenter * Math.sign( this.position.x - center );
        }

        const crossedOver = this.mode.direction === 'inward' && this.position.y < 0 ||
                            this.mode.direction === 'outward' && this.position.y > 0;

        // If the particle has moved through the channel, unbind from the ligand
        if ( crossedOver && Math.abs( this.position.y ) > MembraneChannelsConstants.MEMBRANE_BOUNDS.height / 2 ) {
          const channel = this.mode.slot.channelProperty.value;
          if ( channel instanceof LigandGatedChannel ) {
            channel.unbindLigand();
          }
        }
      }

      // Once the particle has moved sufficiently far from the membrane, resume random walk.
      if ( this.mode.direction === 'inward' && ( this.position.y + this.dimension.height / 2 ) < MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ) {
        const downwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( -1, 0 )
        ).normalize();
        this.moveInDirection( downwardDirection, dotRandom.nextDoubleBetween( MIN_RANDOM_WALK_TIME, MAX_RANDOM_WALK_TIME ) );
      }
      if ( this.mode.direction === 'outward' && ( this.position.y - this.dimension.height / 2 ) > MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY ) {
        const upwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( 0, 1 )
        ).normalize();
        this.moveInDirection( upwardDirection, dotRandom.nextDoubleBetween( MIN_RANDOM_WALK_TIME, MAX_RANDOM_WALK_TIME ) );
      }
    }
  }

  /**
   * Step the particle along a random walk path, including bouncing off the membrane
   * (central horizontal band) and the bounding walls.
   *
   * TODO: Can this method be modularized/broken into smaller methods?
   */
  private stepRandomWalk( dt: number, model: MembraneChannelsModel ): void {
    const randomWalk = this.mode as RandomWalkMode;

    randomWalk.timeUntilNextDirection -= dt;

    // Time for a new direction
    if ( randomWalk.timeUntilNextDirection <= 0 ) {
      randomWalk.currentDirection = getInterpolatedDirection( randomWalk );
      randomWalk.targetDirection = Particle.createRandomUnitVector();
      randomWalk.turnDuration = dotRandom.nextDoubleBetween( 0.05, 0.1 );
      randomWalk.turnElapsed = 0;
      randomWalk.timeUntilNextDirection = dotRandom.nextDoubleBetween( MIN_RANDOM_WALK_TIME, MAX_RANDOM_WALK_TIME );
    }

    // Accumulate turn time and compute the interpolated direction.
    randomWalk.turnElapsed += dt;
    const alpha = clamp( randomWalk.turnElapsed / randomWalk.turnDuration, 0, 1 );
    const direction = randomWalk.currentDirection.blend( randomWalk.targetDirection, alpha );

    const thisBounds = this.getBounds();
    const outsideOfCell = this.position.y > 0;

    // Check each channel to for interaction
    for ( let i = 0; i < model.slots.length; i++ ) {
      const slot = model.slots[ i ];
      const channel = slot.channelProperty.value;

      // If the particle is within a certain radial distance from the center of the channel, it can interact with the channel
      const distance = this.position.distance( new Vector2( slot.position, 0 ) );

      if ( channel && distance < CAPTURE_RADIUS_PROPERTY.value ) {
        const interactedWithChannel = this.handleChannelInteractionDuringRandomWalk( slot, channel, model, outsideOfCell );
        if ( interactedWithChannel ) {
          return;
        }
      }
    }

    if ( MembraneChannelsConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      // Check for passive diffusion for oxygen or carbon dioxide.
      if ( ( this.type === 'oxygen' || this.type === 'carbonDioxide' ) && dotRandom.nextDouble() < 0.90 ) {
        this.mode = {
          type: 'passiveDiffusion',
          direction: outsideOfCell ? 'inward' : 'outward',
          slot: null
        };
        return;
      }

      // Determine the overlap and sign based on whether the entity is outside the cell.
      const overlap = outsideOfCell ?
                      MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - thisBounds.minY :
                      thisBounds.maxY - MembraneChannelsConstants.MEMBRANE_BOUNDS.minY;
      const sign = outsideOfCell ? 1 : -1;

      // Push the entity back out of the membrane.
      this.position.y += sign * overlap;

      // Reflect the vertical motion
      direction.y = sign * Math.abs( direction.y );
      randomWalk.currentDirection.y = sign * Math.abs( randomWalk.currentDirection.y );
      randomWalk.targetDirection.y = sign * Math.abs( randomWalk.targetDirection.y );
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

  /**
   * During randomWalk, check for interactions with channels.
   */
  private handleChannelInteractionDuringRandomWalk( slot: Slot, channel: Channel, model: MembraneChannelsModel, outsideOfCell: boolean ): boolean {

    // Check for ligand interaction with ligand-gated channels
    if ( ( this.type === 'ligandA' || this.type === 'ligandB' ) && outsideOfCell ) {

      // Match ligandA with sodium channels and ligandB with potassium channels
      const channelType = this.type === 'ligandA' ?
                          'sodiumIonLigandGatedChannel' :
                          'potassiumIonLigandGatedChannel';

      // Check if this slot has the correct type of ligand-gated channel
      if ( slot.channelType === channelType ) {

        // Check that it's actually a LigandGatedChannel and is available for binding, and no other ligand is headed that way
        if ( channel instanceof LigandGatedChannel && channel.isAvailableForBinding() ) {

          // check that no other ligand is already moving to that slot.
          // TODO (collaboration): This isn't working for unknown reasons.
          const otherLigand = model.solutes.find( solute => ( solute.mode.type === 'moveToLigandBindingLocation' ) && solute.mode.slot === slot );
          // console.log( 'other ligand headed that way?', otherLigand );

          if ( !otherLigand ) {
            this.mode = { type: 'moveToLigandBindingLocation', slot: slot };
            return true;
          }
        }
      }
    }

    // Check for sodium and potassium ions interacting with leakage channels.
    const sodiumGates: ChannelType[] = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates: ChannelType[] = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    if ( channel.isOpenProperty.value && model.isChannelSoluteFree( slot ) ) {
      if ( this.type === 'sodiumIon' && sodiumGates.includes( slot.channelType! ) ) {
        this.mode = { type: 'moveToCenterOfChannel', slot: slot };
        return true;
      }

      if ( this.type === 'potassiumIon' && potassiumGates.includes( slot.channelType! ) ) {
        this.mode = { type: 'moveToCenterOfChannel', slot: slot };
        return true;
      }
    }

    if ( this.type === 'sodiumIon' && slot.channelType === 'sodiumGlucoseCotransporter' ) {

      // pick an open site on the channel.
      const isLeftOpen = model.solutes.find( solute => ( solute.mode.type === 'moveToSodiumGlucoseTransporter' || solute.mode.type === 'waitingInSodiumGlucoseTransporter' ) && solute.mode.slot === slot && solute.mode.site === 'left' ) === undefined;
      const isRightOpen = model.solutes.find( solute => ( solute.mode.type === 'moveToSodiumGlucoseTransporter' || solute.mode.type === 'waitingInSodiumGlucoseTransporter' ) && solute.mode.slot === slot && solute.mode.site === 'right' ) === undefined;

      const availableSites: Array<'left' | 'right'> = [];
      if ( isLeftOpen ) {
        availableSites.push( 'left' );
      }
      if ( isRightOpen ) {
        availableSites.push( 'right' );
      }

      if ( availableSites.length > 0 ) {
        const site = dotRandom.sample( availableSites );

        if ( this.type === 'sodiumIon' && channel instanceof SodiumGlucoseCotransporter ) {
          this.mode = { type: 'moveToSodiumGlucoseTransporter', slot: slot, site: site };
          return true;
        }
      }

    }

    return false;
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