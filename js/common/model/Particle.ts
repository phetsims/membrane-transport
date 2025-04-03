// Copyright 2025, University of Colorado Boulder

/**
 * The model for a particle in membrane transport.
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
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import MembraneTransportModel from './MembraneTransportModel.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinType from './proteins/TransportProteinType.js';
import LigandGatedChannel from './proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from './proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from './proteins/SodiumPotassiumPump.js';
import Slot from './Slot.js';
import SoluteType, { getParticleModelWidth, LigandType, ParticleType } from './SoluteType.js';

const ABSORB_GLUCOSE = false;

// Typical speed for movement
const typicalSpeed = 30;

// The amount of time that must pass before a particle can cross the membrane again.
const CROSSING_COOLDOWN = 0.5;

// The radius of the circle around the center of a transport protein where a particle will be captured so
// we can decide how it should interact with the transport protein.
export const CAPTURE_RADIUS_PROPERTY = new NumberProperty( MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 * 1.8 );

type RandomWalkMode = {
  type: 'randomWalk';
  currentDirection: Vector2;
  targetDirection: Vector2;
  turnDuration: number;
  turnElapsed: number;
  timeUntilNextDirection: number;
  slot: null;

  // The time that has elapsed since the particle crossed the membrane for this random walk.
  timeElapsedSinceMembraneCrossing: number;
};

type BoundMode = {
  type: 'ligandBound';
  slot: null;
};

type MoveToCenterOfTransportProteinMode = {
  type: 'moveToCenterOfChannel';
  slot: Slot;
};

type MoveToSodiumGlucoseTransporterMode = {
  type: 'moveToSodiumGlucoseTransporter';
  slot: Slot;
  site: 'left' | 'center' | 'right';
};

type MoveToSodiumPotassiumPumpMode = {
  type: 'moveToSodiumPotassiumPump';
  slot: Slot;
  site: 'sodium1' | 'sodium2' | 'sodium3' | 'phosphate' | 'potassium1' | 'potassium2';
};

type WaitingInSodiumGlucoseTransporterMode = {
  type: 'waitingInSodiumGlucoseTransporter';
  slot: Slot;
  site: 'left' | 'center' | 'right';
};

type WaitingInSodiumPotassiumPumpMode = {
  type: 'waitingInSodiumPotassiumPump';
  slot: Slot;
  site: 'sodium1' | 'sodium2' | 'sodium3' | 'phosphate' | 'potassium1' | 'potassium2';
};

type MoveToLigandBindingLocationMode = {
  type: 'moveToLigandBindingLocation';
  slot: Slot;
};

type EnteringTransportProteinMode = {
  type: 'enteringTransportProtein';
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

type MovingThroughTransportProteinMode = {
  type: 'movingThroughChannel';
  slot: Slot;
  transportProteinType: TransportProteinType;
  direction: 'inward' | 'outward';
  offset?: number;
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
  | MoveToCenterOfTransportProteinMode
  | EnteringTransportProteinMode
  | SheddingCagedWaterMoleculesMode
  | MoveToLigandBindingLocationMode
  | PassiveDiffusionMode
  | MovingThroughTransportProteinMode
  | UserControlledMode
  | UserOverMode
  | MoveToSodiumGlucoseTransporterMode
  | WaitingInSodiumGlucoseTransporterMode
  | MoveToSodiumPotassiumPumpMode
  | WaitingInSodiumPotassiumPumpMode;

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
      getParticleModelWidth( type ) / MembraneTransportConstants.getParticleAspectRatioMap()[ type ]
    );

    assert && assert( !isNaN( this.dimension.width ), 'dimension.width should not be NaN' );
    assert && assert( !isNaN( this.dimension.height ), 'dimension.height should not be NaN' );
    assert && assert( this.dimension.width > 0, 'dimension.width should be greater than 0' );
    assert && assert( this.dimension.height > 0, 'dimension.height should be greater than 0' );

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
      slot: null,
      timeElapsedSinceMembraneCrossing: 0
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
      slot: null,
      timeElapsedSinceMembraneCrossing: 0
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
  public step( dt: number, model: MembraneTransportModel ): void {

    // When glucose is inside the cell, it is absorbed.
    if ( this.type === 'glucose' && this.position.y < MembraneTransportConstants.MEMBRANE_BOUNDS.minY && ABSORB_GLUCOSE ) {
      this.opacity -= 0.01;
      if ( this.opacity <= 0 ) {
        model.removeParticle( this );
        return;
      }
    }

    if ( this.type === 'glucose' ) {
      if ( this.position.y > MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
        this.opacity = 1; // Full opacity outside the cell
      }
      else {

        // Gradual fade based on distance from membrane
        this.opacity = clamp( this.opacity - 0.01, 0.5, 1 );
      }
    }

    // Free phosphate molecules move normally for a while, then are absorbed
    if ( this.type === 'phosphate' && this.mode.type === 'randomWalk' && this.mode.timeElapsedSinceMembraneCrossing > 3 ) {
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

      // When close enough, transition to enteringTransportProtein mode.
      if ( Math.abs( targetPositionX - currentPositionX ) <= maxStepSize ) {
        this.mode = {
          type: 'enteringTransportProtein',
          slot: this.mode.slot,
          direction: this.position.y > 0 ? 'inward' : 'outward'
        };
      }
    }
    else if ( this.mode.type === 'moveToSodiumGlucoseTransporter' ) {

      const currentPosition = this.position.copy();
      const targetPosition = new Vector2( this.mode.slot.position + 4 * ( this.mode.site === 'left' ? -1 :
                                                                          this.mode.site === 'right' ? 1 : 0 ), 0 );

      const vector = targetPosition.minus( currentPosition );
      const direction = vector.normalized();

      // Move toward the target position at the typicalSpeed
      const maxStepSize = typicalSpeed * dt;
      this.position.x += direction.x * maxStepSize;
      this.position.y += direction.y * maxStepSize;

      // When close enough, transition to enteringTransportProtein mode.
      if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {
        this.mode = {
          type: 'waitingInSodiumGlucoseTransporter',
          slot: this.mode.slot,
          site: this.mode.site
        };
      }
    }
    else if ( this.mode.type === 'moveToSodiumPotassiumPump' ) {

      const currentPosition = this.position.copy();

      const offset = this.mode.site === 'sodium1' ? new Vector2( -5, -10 ) :
                     this.mode.site === 'sodium2' ? new Vector2( -5, -5 ) :
                     this.mode.site === 'sodium3' ? new Vector2( -5, 0 ) :
                     this.mode.site === 'phosphate' ? new Vector2( 0, -12 ) :
                     this.mode.site === 'potassium1' ? new Vector2( 5, 5 ) :
                     this.mode.site === 'potassium2' ? new Vector2( 5, 10 ) :
                     ( () => { throw new Error( `Unhandled site: ${this.mode.site}` ); } )(); // IIFE to throw error

      const targetPosition = new Vector2( this.mode.slot.position, 0 ).plus( offset );

      const vector = targetPosition.minus( currentPosition );
      const direction = vector.normalized();

      // Move toward the target position at the typicalSpeed
      const maxStepSize = typicalSpeed * dt;
      this.position.x += direction.x * maxStepSize;
      this.position.y += direction.y * maxStepSize;

      const sodiumPotassiumPump = this.mode.slot.transportProteinProperty.value as SodiumPotassiumPump;

      if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {

        if ( this.type === 'sodiumIon' && sodiumPotassiumPump.conformation === 'awaiting-sodium' ) {

          this.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site
          };

          MembraneTransportSounds.sodiumLockedInToSodiumPotassiumPump( this.mode.site, sodiumPotassiumPump.getNumberOfFilledSodiumSites() );
        }
        else if ( this.type === 'atp' && sodiumPotassiumPump.conformation === 'awaiting-phosphate' ) {

          // Bind, split into adp and phosphate, and move through the pump
          model.addSolute( new Particle( currentPosition.copy(), 'adp' ) );
          const phosphate = new Particle( currentPosition.copy(), 'phosphate' );
          phosphate.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site
          };
          model.addSolute( phosphate );
          model.removeSolute( this );

          sodiumPotassiumPump.openUpward();
          MembraneTransportSounds.phosphateLockedInToSodiumPotassiumPump();
        }
        else if ( this.type === 'potassiumIon' && sodiumPotassiumPump.conformation === 'awaiting-potassium' ) {
          this.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site
          };
          MembraneTransportSounds.potassiumLockedInToSodiumPotassiumPump( this.mode.site, sodiumPotassiumPump.getNumberOfFilledPotassiumSites() );

          if ( sodiumPotassiumPump.getNumberOfFilledPotassiumSites() === 2 ) {
            sodiumPotassiumPump.openDownward();
          }
        }
      }
    }
    else if ( this.mode.type === 'enteringTransportProtein' ) {
      const direction = this.position.y > 0 ? -1 : 1;
      const thresholdY = direction === -1
                         ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - this.dimension.height / 2
                         : MembraneTransportConstants.MEMBRANE_BOUNDS.minY + this.dimension.height / 2;

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
          transportProteinType: this.mode.slot.transportProteinType!,
          direction: outsideOfCell ? 'inward' : 'outward'
        };
      }
    }
    else if ( this.mode.type === 'moveToLigandBindingLocation' ) {

      const ligandGatedChannel = this.mode.slot.transportProteinProperty.value as LigandGatedChannel;
      if ( ligandGatedChannel ) {
        const currentPosition = this.position;
        const targetPosition = ligandGatedChannel.getBindingPosition();
        const maxStepSize = typicalSpeed * dt;

        // Move toward the binding position
        this.position.x += Math.sign( targetPosition.x - currentPosition.x ) * maxStepSize;
        this.position.y += Math.sign( targetPosition.y - currentPosition.y ) * maxStepSize;

        // When close enough, transition to a bound mode.
        if ( targetPosition.distance( currentPosition ) <= maxStepSize && ligandGatedChannel.isAvailableForBinding() ) {
          affirm( this.type === 'ligandA' || this.type === 'ligandB', 'ligand should be ligandA or ligandB' );
          ligandGatedChannel.bindLigand( this as Particle<LigandType> );
        }
      }
    }
    else if ( this.mode.type === 'passiveDiffusion' || this.mode.type === 'movingThroughChannel' ) {

      // For both passive diffusion and moving through, use similar movement logic.
      const sign = this.mode.direction === 'inward' ? -1 : 1;

      this.position.y += sign * ( typicalSpeed / 4 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
      this.position.x += dotRandom.nextDoubleBetween( -1, 1 ) * ( typicalSpeed / 2 ) * dt;

      // If moving through, don't let the position get very far from the center. Allow a little movement
      // so that it looks like it "struggles" to get through.
      if ( this.mode.type === 'movingThroughChannel' ) {
        const center = this.mode.slot.position + ( this.mode.offset || 0 );
        const maxDistanceFromCenter = 0.5;
        if ( Math.abs( this.position.x - center ) > maxDistanceFromCenter ) {
          this.position.x = center + maxDistanceFromCenter * Math.sign( this.position.x - center );
        }

        const crossedOver = this.mode.direction === 'inward' && this.position.y < 0 ||
                            this.mode.direction === 'outward' && this.position.y > 0;

        // If the particle has moved through, close
        if ( crossedOver && Math.abs( this.position.y ) > MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 ) {
          const transportProtein = this.mode.slot.transportProteinProperty.value;

          // If fully moved through a SodiumGluoseCotransporter, close
          if ( transportProtein instanceof SodiumGlucoseCotransporter ) {
            transportProtein.isOpenProperty.set( false );
          }
        }
      }

      // Once the particle has moved sufficiently far from the membrane, resume random walk.
      if ( this.mode.direction === 'inward' && ( this.position.y + this.dimension.height / 2 ) < MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
        const downwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( -1, 0 )
        ).normalize();
        this.moveInDirection( downwardDirection, dotRandom.nextDoubleBetween( MIN_RANDOM_WALK_TIME, MAX_RANDOM_WALK_TIME ) );
      }
      if ( this.mode.direction === 'outward' && ( this.position.y - this.dimension.height / 2 ) > MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ) {
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
   */
  private stepRandomWalk( dt: number, model: MembraneTransportModel ): void {
    const randomWalk = this.mode as RandomWalkMode;

    randomWalk.timeUntilNextDirection -= dt;
    randomWalk.timeElapsedSinceMembraneCrossing += dt;

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

    // Check each transport protein to for interaction
    for ( let i = 0; i < model.slots.length; i++ ) {
      const slot = model.slots[ i ];
      const transportProtein = slot.transportProteinProperty.value;

      // If the particle is within a certain radial distance from the center of the transport protein, it can interact
      const distance = this.position.distance( new Vector2( slot.position, 0 ) );

      if ( transportProtein && distance < CAPTURE_RADIUS_PROPERTY.value && randomWalk.timeElapsedSinceMembraneCrossing > CROSSING_COOLDOWN ) {
        const interactedWithProtein = this.handleProteinInteractionDuringRandomWalk( slot, transportProtein, model, outsideOfCell );
        if ( interactedWithProtein ) {
          return;
        }
      }
    }

    if ( MembraneTransportConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      // Check for passive diffusion for oxygen or carbon dioxide.
      if ( ( this.type === 'oxygen' || this.type === 'carbonDioxide' ) && dotRandom.nextDouble() < 0.90 ) {
        this.mode = {
          type: 'passiveDiffusion',
          direction: outsideOfCell ? 'inward' : 'outward',
          slot: null
        };

        MembraneTransportSounds.gasMoleculeEnteredMembrane( this, this.mode.direction );
        return;
      }

      // Determine the overlap and sign based on whether the entity is outside the cell.
      const overlap = outsideOfCell ?
                      MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - thisBounds.minY :
                      thisBounds.maxY - MembraneTransportConstants.MEMBRANE_BOUNDS.minY;
      const sign = outsideOfCell ? 1 : -1;

      // Push the entity back out of the membrane.
      this.position.y += sign * overlap;

      // Reflect the vertical motion
      direction.y = sign * Math.abs( direction.y );
      randomWalk.currentDirection.y = sign * Math.abs( randomWalk.currentDirection.y );
      randomWalk.targetDirection.y = sign * Math.abs( randomWalk.targetDirection.y );
    }

    // Move according to the direction and speed
    this.position.x += direction.x * dt * typicalSpeed;
    this.position.y += direction.y * dt * typicalSpeed;

    // Now bounce off the 3 other walls in whichever bounding region we are in
    const boundingRegion = outsideOfCell ? MembraneTransportConstants.OUTSIDE_CELL_BOUNDS : MembraneTransportConstants.INSIDE_CELL_BOUNDS;

    // Recompute thisBounds after the move
    const updatedBounds = this.getBounds();

    // Helper function to apply the adjustment to the specified axis
    const applyAxisAdjustment = ( axis: 'x' | 'y', adjustment: { bounce: boolean; newPos: number; newDir: number } ) => {
      this.position[ axis ] = adjustment.newPos;
      direction[ axis ] = adjustment.newDir;
      randomWalk.currentDirection[ axis ] = adjustment.newDir;
      randomWalk.targetDirection[ axis ] = adjustment.newDir;

      if ( adjustment.bounce ) {
        MembraneTransportSounds.particleBounced( this );
      }
    };

    // Adjust x-axis collision
    const xAdjustment = Particle.adjustAxis( this.position.x, updatedBounds.minX, updatedBounds.maxX, boundingRegion.minX, boundingRegion.maxX, direction.x );
    applyAxisAdjustment( 'x', xAdjustment );

    // Adjust y-axis collision
    const yAdjustment = Particle.adjustAxis( this.position.y, updatedBounds.minY, updatedBounds.maxY, boundingRegion.minY, boundingRegion.maxY, direction.y );
    applyAxisAdjustment( 'y', yAdjustment );
  }

  private static adjustAxis( position: number, particleMin: number, particleMax: number, regionMin: number, regionMax: number, currentDir: number ): { bounce: boolean; newPos: number; newDir: number } {
    return particleMin < regionMin ? ( { bounce: true, newPos: position + ( regionMin - particleMin ), newDir: Math.abs( currentDir ) } ) :
           particleMax > regionMax ? ( { bounce: true, newPos: position - ( particleMax - regionMax ), newDir: -Math.abs( currentDir ) } ) :
           ( { bounce: false, newPos: position, newDir: currentDir } );
  }

  /**
   * During randomWalk, check for interactions with transport proteins.
   */
  private handleProteinInteractionDuringRandomWalk( slot: Slot, transportProtein: TransportProtein, model: MembraneTransportModel, outsideOfCell: boolean ): boolean {

    // Check for ligand interaction with ligand-gated channels
    if ( ( this.type === 'ligandA' || this.type === 'ligandB' ) && outsideOfCell ) {

      // Match ligandA with sodium channels and ligandB with potassium channels
      const transportProteinType = this.type === 'ligandA' ?
                                   'sodiumIonLigandGatedChannel' :
                                   'potassiumIonLigandGatedChannel';

      // Check if this slot has the correct type of ligand-gated channel
      if ( slot.transportProteinType === transportProteinType ) {

        // Check that it's actually a LigandGatedChannel and is available for binding, and no other ligand is headed that way
        if ( transportProtein instanceof LigandGatedChannel && transportProtein.isAvailableForBinding() ) {

          // check that no other ligand is already moving to that slot.
          // TODO (JG/SR): This isn't working for unknown reasons.
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
    const sodiumGates: TransportProteinType[] = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates: TransportProteinType[] = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    if ( transportProtein.isOpenProperty.value && model.isTransportProteinSoluteFree( slot ) ) {
      if ( this.type === 'sodiumIon' && sodiumGates.includes( slot.transportProteinType! ) ) {
        this.mode = { type: 'moveToCenterOfChannel', slot: slot };
        return true;
      }

      if ( this.type === 'potassiumIon' && potassiumGates.includes( slot.transportProteinType! ) ) {
        this.mode = { type: 'moveToCenterOfChannel', slot: slot };
        return true;
      }
    }

    if (
      ( this.type === 'sodiumIon' || this.type === 'glucose' ) &&
      slot.transportProteinType === 'sodiumGlucoseCotransporter' &&
      transportProtein instanceof SodiumGlucoseCotransporter &&
      model.outsideSoluteCountProperties.sodiumIon.value > model.insideSoluteCountProperties.sodiumIon.value &&

      // Only approach from extracellular side
      this.position.y > 0 &&

      // Don't approach if other solutes are already passing through
      !transportProtein.isOpenProperty.value
    ) {

      if ( this.type === 'sodiumIon' ) {

        // Sodium ions can use left or right site
        const availableSites = transportProtein.getOpenSodiumSites();

        if ( availableSites.length > 0 ) {
          const site = dotRandom.sample( availableSites );
          this.mode = { type: 'moveToSodiumGlucoseTransporter', slot: slot, site: site };
          return true;
        }
      }
      else if ( this.type === 'glucose' && transportProtein.isGlucoseSiteOpen() ) {

        // Glucose can only use center site
        this.mode = { type: 'moveToSodiumGlucoseTransporter', slot: slot, site: 'center' };
        return true;
      }
    }

    if (
      this.type === 'sodiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.conformation === 'awaiting-sodium' &&
      this.position.y < 0 && // Only approach from intracellular side
      !transportProtein.hasSolutesMovingThroughTransportProtein() // make sure no potassiums still leaving
    ) {

      const openSodiumSites = transportProtein.getOpenSodiumSites();

      if ( openSodiumSites.length > 0 ) {
        const site = dotRandom.sample( openSodiumSites );
        this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: site };
        return true;
      }
    }

    if (
      this.type === 'atp' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      this.position.y < 0 && // Only approach from intracellular side
      transportProtein.conformation === 'awaiting-phosphate' &&
      !transportProtein.isATPEnRoute()
    ) {

      this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: 'phosphate' };
      return true;
    }

    if (
      this.type === 'potassiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.conformation === 'awaiting-potassium' &&
      this.position.y > 0 && // Only approach from extracellular side
      !transportProtein.hasSolutesMovingThroughTransportProtein() // make sure no sodiums still leaving
    ) {

      const openPotassiumSites = transportProtein.getOpenPotassiumSites();

      if ( openPotassiumSites.length > 0 ) {
        const site = dotRandom.sample( openPotassiumSites );
        this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: site };
        return true;
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
   * calls ParticleIO.toStateObject to serialize the Solute instances. MembraneTransportModel uses reference type serialization
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

membraneTransport.register( 'Particle', Particle );