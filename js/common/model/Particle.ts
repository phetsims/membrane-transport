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
import { boxMullerTransform } from '../../../../dot/js/util/boxMullerTransform.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportQueryParameters from '../MembraneTransportQueryParameters.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';

// the model bounds are inferred from the view dimensions
import getParticleViewDimensions from '../view/particles/getParticleViewDimensions.js'; // eslint-disable-line phet/no-view-imported-from-model
import MembraneTransportModel from './MembraneTransportModel.js';
import LigandGatedChannel from './proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from './proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from './proteins/SodiumPotassiumPump.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinType from './proteins/TransportProteinType.js';
import Slot from './Slot.js';
import SoluteType, { LigandType, ParticleType } from './SoluteType.js';

// TODO (BF) can this be deleted? Brett will meet with content experts before we decide. See https://github.com/phetsims/membrane-transport/issues/92
const ABSORB_GLUCOSE = false;

// Typical speed for movement
const TYPICAL_SPEED = 30;

// The amount of time that must pass before a particle can cross the membrane again.
const CROSSING_COOLDOWN = 0.5;

// The radius of the circle around the center of a transport protein where a particle will be captured so
// we can decide how it should interact with the transport protein.
// The extra capture radius was added so that all particles can be captured. If the capture radius is less than
// half the height of a particle, it will never be captured.
export const CAPTURE_RADIUS_PROPERTY = new NumberProperty( MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 * 2.5 );

// Epsilon value for nudging the particle into bounds after teleporting so that it doesn't instantly teleport back to the other side
const NUDGE_EPSILON = 1E-6;

/**
 * Particle is moving randomly in Brownian motion within the cell or extracellular space.
 */
type RandomWalkMode = {
  type: 'randomWalk';
  currentDirection: Vector2;
  timeUntilNextDirection: number;
  slot: null;

  // The time that has elapsed since the particle crossed the membrane for this random walk.
  timeElapsedSinceMembraneCrossing: number;
};

/**
 * Particle (a ligand) is currently attached to the binding site of a LigandGatedChannel.
 */
type LigandBoundMode = {
  type: 'ligandBound';
  ligandGatedChannel: LigandGatedChannel;
};

/**
 * Particle is moving towards the central opening of a transport protein channel (e.g., leakage or gated ion channel).
 */
type MoveToCenterOfTransportProteinMode = {
  type: 'moveToCenterOfChannel';
  slot: Slot;
};

/**
 * Particle (Sodium or Glucose) is moving towards a specific binding site on the Sodium-Glucose Cotransporter.
 */
type MoveToSodiumGlucoseTransporterMode = {
  type: 'moveToSodiumGlucoseCotransporter';
  slot: Slot;
  sodiumGlucoseCotransporter: SodiumGlucoseCotransporter;
  site: 'left' | 'center' | 'right';
};

/**
 * Particle (Sodium, Potassium, or ATP) is moving towards a specific binding site on the Sodium-Potassium Pump.
 */
type MoveToSodiumPotassiumPumpMode = {
  type: 'moveToSodiumPotassiumPump';
  slot: Slot;
  sodiumPotassiumPump: SodiumPotassiumPump;
  site: 'sodium1' | 'sodium2' | 'sodium3' | 'phosphate' | 'potassium1' | 'potassium2';
};

/**
 * Particle is occupying a binding site within the Sodium-Glucose Cotransporter, waiting for the transport cycle to proceed.
 */
type WaitingInSodiumGlucoseCotransporterMode = {
  type: 'waitingInSodiumGlucoseCotransporter';
  slot: Slot;
  sodiumGlucoseCotransporter: SodiumGlucoseCotransporter;
  site: 'left' | 'center' | 'right';
};

/**
 * Particle is occupying a binding site within the Sodium-Potassium Pump, waiting for the transport cycle to proceed.
 */
type WaitingInSodiumPotassiumPumpMode = {
  type: 'waitingInSodiumPotassiumPump';
  slot: Slot;
  sodiumPotassiumPump: SodiumPotassiumPump;
  site: 'sodium1' | 'sodium2' | 'sodium3' | 'phosphate' | 'potassium1' | 'potassium2';
};

/**
 * Particle (a ligand) is moving towards the designated binding location on a LigandGatedChannel.
 */
type MoveToLigandBindingLocationMode = {
  type: 'moveToLigandBindingLocation';
  slot: Slot;
};

/**
 * Particle is in the initial phase of entering a transport protein channel from either the inside or outside.
 */
type EnteringTransportProteinMode = {
  type: 'enteringTransportProtein';
  slot: Slot;
  direction: 'inward' | 'outward';
};

/**
 * Particle is paused briefly upon entering a channel, simulating the shedding of associated water molecules.
 */
type SheddingCagedWaterMoleculesMode = {
  type: 'sheddingCagedWaterMolecules';
  slot: Slot;
  sheddingElapsed?: number;
};

/**
 * Particle (e.g., O2, CO2) is moving directly across the lipid bilayer without a channel or transporter.
 */
type PassiveDiffusionMode = {
  type: 'passiveDiffusion';
  direction: 'inward' | 'outward';
  slot: null;
};

/**
 * Particle is moving (active or passive) through the interior of a transport protein channel.
 */
type MovingThroughTransportProteinMode = {
  type: 'movingThroughTransportProtein';
  slot: Slot;
  transportProteinType: TransportProteinType;
  direction: 'inward' | 'outward';
  offset?: number;
};

/**
 * Ligand's position is being directly controlled by user input (e.g., dragging).
 */
type UserControlledMode = {
  type: 'userControlled';
  slot: null;
};

/**
 * User's pointer is currently hovering over the ligand, which pauses its motion.
 */
type UserOverMode = {
  type: 'userOver';
  slot: null;
};

type ParticleMode =
  | RandomWalkMode
  | LigandBoundMode
  | MoveToCenterOfTransportProteinMode
  | EnteringTransportProteinMode
  | SheddingCagedWaterMoleculesMode
  | MoveToLigandBindingLocationMode
  | PassiveDiffusionMode
  | MovingThroughTransportProteinMode
  | UserControlledMode
  | UserOverMode
  | MoveToSodiumGlucoseTransporterMode
  | WaitingInSodiumGlucoseCotransporterMode
  | MoveToSodiumPotassiumPumpMode
  | WaitingInSodiumPotassiumPumpMode;

// When a ligand is bound to a protein, it does not have a slot.
export type ParticleModeWithSlot = Exclude<ParticleMode, LigandBoundMode>;

/**
 * For the random walk, the brownian motion is straight lines then random angles. This function determines how long to
 * go straight before a sudden direction change.
 */
const sampleValueHowLongToGoStraight = () => {
  const result = boxMullerTransform( 0.3, 0.4, dotRandom );
  return clamp( result, 0.01, 2 );
};

export default class Particle<T extends ParticleType> {

  public mode: ParticleMode;

  // Size of the solute in model coordinates.
  public readonly dimension: Dimension2;

  public opacity = 1;

  // Keep track of how long ago the particle crossed the membrane, to show a highlight when it crosses.
  public timeSinceCrossedMembrane = Number.POSITIVE_INFINITY;

  // Indicates whether the ligand has keyboard focus -- this causes a different random walk behavior.
  public focused = false;

  public constructor(
    public readonly position: Vector2,
    public readonly type: T,
    public readonly model: PhetioObject // For serialization
  ) {
    const lookup = getParticleViewDimensions()[ type ];

    const width = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaX( lookup.width * MembraneTransportConstants.OVERALL_ARTWORK_SCALE );
    const height = Math.abs( MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaY( lookup.height * MembraneTransportConstants.OVERALL_ARTWORK_SCALE ) );

    this.dimension = new Dimension2( width, height );

    assert && assert( !isNaN( this.dimension.width ), 'dimension.width should not be NaN' );
    assert && assert( !isNaN( this.dimension.height ), 'dimension.height should not be NaN' );
    assert && assert( this.dimension.width > 0, 'dimension.width should be greater than 0' );
    assert && assert( this.dimension.height > 0, 'dimension.height should be greater than 0' );
    assert && assert( this.dimension.height / 2 < CAPTURE_RADIUS_PROPERTY.value, 'The capture radius is too small for interaction with membrane.' );

    // Start in random walk mode with random directions.
    this.mode = Particle.createRandomWalkMode( true );
  }

  /**
   * @param allowImmediateInteraction - Some particles should be allowed to interact immediately, while others should not.
   */
  public static createRandomWalkMode( allowImmediateInteraction: boolean ): RandomWalkMode {

    const timeElapsedSinceMembraneCrossing = allowImmediateInteraction ? CROSSING_COOLDOWN : 0;
    return {
      type: 'randomWalk',
      currentDirection: Particle.createRandomUnitVector(),
      timeUntilNextDirection: sampleValueHowLongToGoStraight(),
      slot: null,
      timeElapsedSinceMembraneCrossing: timeElapsedSinceMembraneCrossing
    };
  }

  public releaseFromInteraction( y: number ): void {
    this.position.y = y;
    this.mode = Particle.createRandomWalkMode( true );
  }

  /**
   * Make the solute move in a direction immediately.
   * The particle remains in random walk mode while moving toward the target.
   */
  public moveInDirection( direction: Vector2, duration: number ): void {
    this.mode = {
      type: 'randomWalk',
      currentDirection: direction,
      timeUntilNextDirection: duration,
      slot: null,
      timeElapsedSinceMembraneCrossing: 0
    };
  }

  /**
   * This is a finite-state-machine-like implementation of the particle's behavior. We use a lightweight approach,
   * without classes or abstractions, to centralize the logic for the particle's behavior. This approach also worked well
   * in Projectile Data Lab's SamplingModel.launchButtonPressed
   */
  public step( dt: number, model: MembraneTransportModel ): void {

    this.timeSinceCrossedMembrane += dt;

    const isOutsideCell = this.position.y > 0;

    // Handle opacity changes and check if the particle was removed (absorbed)
    const absorbed = this.updateAbsorption( dt, model.removeParticle.bind( model ) );

    // If the particle has not been absorbed, then proceed with movement calculations
    if ( !absorbed ) {
      this.updateMovement( dt, model );
    }

    const nowIsOutsideCell = this.position.y > 0;
    if ( isOutsideCell !== nowIsOutsideCell ) {
      this.timeSinceCrossedMembrane = 0;
    }
  }

  /**
   * Updates the particle's opacity based on its type and position/state.
   * Handles absorption logic (fading out and removal).
   * Returns true if the particle was removed during this update, false otherwise.
   *
   * @param dt - Time step in seconds (currently unused here, but kept for potential future use)
   * @param removeParticle - Handles removal of the particle from the model.
   * @returns true if the particle was removed, false otherwise
   */
  private updateAbsorption( dt: number, removeParticle: ( particle: Particle<T> ) => void ): boolean {

    // Incorporate dt into opacity deltas for consistent behavior on varying frame rates
    const FRAME_RATE = 60;
    const frameFactor = dt * FRAME_RATE;
    const fadeRateGlucose = 0.01 * frameFactor;
    const fadeRatePhosphate = 0.01 * frameFactor;
    const fadeRateAdp = 0.001 * frameFactor;

    if ( this.type === 'glucose' ) {
      if ( this.position.y < MembraneTransportConstants.MEMBRANE_BOUNDS.minY && ABSORB_GLUCOSE ) {
        this.opacity -= fadeRateGlucose;
        if ( this.opacity <= 0 ) {
          removeParticle( this );
          return true; // Particle removed
        }
      }
      else {

        if ( this.position.y > MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
          this.opacity = 1; // Full opacity outside the cell
        }
        else {

          // Gradual fade over time after moving inside the cell.
          this.opacity = clamp( this.opacity - fadeRateGlucose, 0.5, 1 );
        }
      }
    }

    // Free phosphate molecules move normally for a while, then are absorbed
    if ( this.type === 'phosphate' && this.mode.type === 'randomWalk' && this.mode.timeElapsedSinceMembraneCrossing > 3 ) {
      this.opacity -= fadeRatePhosphate;
      if ( this.opacity <= 0 ) {
        removeParticle( this );
        return true; // Particle removed
      }
    }

    // Free ADP molecules move normally for a while, then are absorbed
    if ( this.type === 'adp' && this.mode.type === 'randomWalk' ) {
      this.opacity -= fadeRateAdp;
      if ( this.opacity <= 0 ) {
        removeParticle( this );
        return true; // Particle removed
      }
    }

    return false; // particle not absorbed
  }

  /**
   * Updates the particle's position and potentially its mode based on its current mode.
   * This method assumes the particle has not been removed in the current step.
   *
   * @param dt - Time step in seconds
   * @param model - The overall membrane transport model
   */
  private updateMovement( dt: number, model: MembraneTransportModel ): void {

    // --- Movement Logic (based on mode) ---
    if ( this.mode.type === 'randomWalk' ) {
      this.stepRandomWalk( dt, model );
    }
    else if ( this.mode.type === 'ligandBound' ) {

      // The LigandGatedChannel is responsible for tracking the time bound, so it can detach after a certain amount of time.
      // Update the position because the binding site changes when the channel opens.
      this.position.set( this.mode.ligandGatedChannel.getBindingPosition() );
    }
    else if ( this.mode.type === 'moveToCenterOfChannel' ) {

      const currentPositionX = this.position.x;
      const targetPositionX = this.mode.slot.position;

      // Move in the x direction toward the target.
      const maxStepSize = TYPICAL_SPEED * dt;
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
    else if ( this.mode.type === 'moveToSodiumGlucoseCotransporter' ) {

      affirm( this.type === 'sodiumIon' || this.type === 'glucose', 'Only sodium and glucose can move to the sodium glucose cotransporter' );

      const currentPosition = this.position.copy();
      const targetPosition = this.mode.sodiumGlucoseCotransporter.getSitePosition( this.mode.site );

      const vector = targetPosition.minus( currentPosition );
      const direction = vector.normalized();

      // Move toward the target position at the typicalSpeed
      const maxStepSize = TYPICAL_SPEED * dt;
      this.position.x += direction.x * maxStepSize;
      this.position.y += direction.y * maxStepSize;

      // When close enough, transition to waitingInSodiumGlucoseCotransporter mode.
      if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {
        this.mode = {
          type: 'waitingInSodiumGlucoseCotransporter',
          slot: this.mode.slot,
          site: this.mode.site,
          sodiumGlucoseCotransporter: this.mode.sodiumGlucoseCotransporter
        };

        this.position.set( targetPosition );

        MembraneTransportSounds.particleBoundToSodiumGlucoseTransporter( this.type, this.mode.sodiumGlucoseCotransporter.getFilledSodiumSiteCount() );
      }
    }
    else if ( this.mode.type === 'moveToSodiumPotassiumPump' ) {

      const currentPosition = this.position.copy();
      const targetPosition = this.mode.sodiumPotassiumPump.getSitePosition( this.mode.site );

      // Compensate for the centroid of the ATP molecule, but only when moving to the sodium potassium pump. After locked in,
      // the values in getSitePosition are correct for the sole phosphate
      if ( this.mode.site === 'phosphate' ) {
        targetPosition.y -= 17;
        targetPosition.x += 3;
      }

      const vector = targetPosition.minus( currentPosition );
      const direction = vector.normalized();

      // Move toward the target position at the typicalSpeed
      const maxStepSize = TYPICAL_SPEED * dt;
      this.position.x += direction.x * maxStepSize;
      this.position.y += direction.y * maxStepSize;

      const sodiumPotassiumPump = this.mode.slot.transportProteinProperty.value as SodiumPotassiumPump;

      if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {

        if ( this.type === 'sodiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToInsideEmpty' ) {

          this.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site,
            sodiumPotassiumPump: sodiumPotassiumPump
          };

          // Set to the exact target position now that it is inside the pump.
          this.position.set( targetPosition );

          MembraneTransportSounds.sodiumLockedInToSodiumPotassiumPump( this.mode.site, sodiumPotassiumPump.getNumberOfFilledSodiumSites() );
        }
        else if ( this.type === 'atp' && sodiumPotassiumPump.stateProperty.value === 'openToInsideSodiumBoundPhosphateSiteOpen' ) {

          // Bind, split into adp and phosphate, and move through the pump
          model.addSolute( new Particle( currentPosition.copy(), 'adp', this.model ) );
          const phosphate = new Particle( currentPosition.copy(), 'phosphate', this.model );
          phosphate.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site,
            sodiumPotassiumPump: sodiumPotassiumPump
          };

          model.addSolute( phosphate );
          model.removeSolute( this );

          sodiumPotassiumPump.stateProperty.value = 'openToInsideSodiumAndPhosphateBound';
          MembraneTransportSounds.phosphateLockedInToSodiumPotassiumPump();
        }
        else if ( this.type === 'potassiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToOutsideAwaitingPotassium' ) {
          this.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site,
            sodiumPotassiumPump: sodiumPotassiumPump
          };

          // Set to the exact target position now that it is inside the pump.
          this.position.set( targetPosition );

          MembraneTransportSounds.potassiumLockedInToSodiumPotassiumPump( this.mode.site, sodiumPotassiumPump.getNumberOfFilledPotassiumSites() );

          if ( sodiumPotassiumPump.getNumberOfFilledPotassiumSites() === 2 ) {
            sodiumPotassiumPump.stateProperty.value = 'openToOutsidePotassiumBound';
          }
        }
      }
    }
    else if ( this.mode.type === 'waitingInSodiumPotassiumPump' ) {

      // The phosphate binding site moves, so we must update this every frame
      const targetPosition = this.mode.sodiumPotassiumPump.getSitePosition( this.mode.site );
      this.position.set( targetPosition );
    }
    else if ( this.mode.type === 'waitingInSodiumGlucoseCotransporter' && phet.chipper.queryParameters.dev ) {

      // For debugging only, so that the site positions can be adjusted
      const targetPosition = this.mode.sodiumGlucoseCotransporter.getSitePosition( this.mode.site );
      this.position.set( targetPosition );
    }
    else if ( this.mode.type === 'enteringTransportProtein' ) {
      const direction = this.position.y > 0 ? -1 : 1;
      const thresholdY = direction === -1
                         ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - this.dimension.height / 2
                         : MembraneTransportConstants.MEMBRANE_BOUNDS.minY + this.dimension.height / 2;

      this.position.y += direction * TYPICAL_SPEED * dt;

      if ( ( direction === -1 && this.position.y <= thresholdY ) ||
           ( direction === 1 && this.position.y >= thresholdY ) ) {
        this.mode = {
          type: 'sheddingCagedWaterMolecules',
          slot: this.mode.slot
        };
      }
    }
    else if ( this.mode.type === 'sheddingCagedWaterMolecules' ) {
      const sheddingDuration = 0.1; // adjust as needed
      this.mode.sheddingElapsed = ( this.mode.sheddingElapsed || 0 ) + dt;

      if ( this.mode.sheddingElapsed >= sheddingDuration ) {
        const outsideOfCell = this.position.y > 0;
        this.mode = {
          type: 'movingThroughTransportProtein',
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
        const maxStepSize = TYPICAL_SPEED * dt;

        // Move toward the binding position
        this.position.x += Math.sign( targetPosition.x - currentPosition.x ) * maxStepSize;
        this.position.y += Math.sign( targetPosition.y - currentPosition.y ) * maxStepSize;

        // When close enough, transition to a bound mode.
        if ( targetPosition.distance( currentPosition ) <= maxStepSize && ligandGatedChannel.isAvailableForBinding() ) {
          affirm( this.type === 'triangleLigand' || this.type === 'starLigand', 'ligand should be triangleLigand or starLigand' );
          ligandGatedChannel.bindLigand( this as Particle<LigandType> );

          // Set the particle positions exactly to the binding position
          this.position.set( targetPosition );
        }
      }
    }
    else if ( this.mode.type === 'passiveDiffusion' || this.mode.type === 'movingThroughTransportProtein' ) {

      // For both passive diffusion and moving through, use similar movement logic.
      const sign = this.mode.direction === 'inward' ? -1 : 1;

      const signBefore = this.position.y > 0;

      this.position.y += sign * ( TYPICAL_SPEED / 5 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
      this.position.x += dotRandom.nextDoubleBetween( -2, 2 ) * ( TYPICAL_SPEED / 2 ) * dt;

      const signAfter = this.position.y > 0;

      if ( signBefore !== signAfter ) {
        model.soluteCrossedMembraneEmitter.emit( this, this.position.y > 0 ? 'outward' : 'inward' );
      }

      // If moving through, don't let the position get very far from the center. Allow a little movement
      // so that it looks like it "struggles" to get through.
      if ( this.mode.type === 'movingThroughTransportProtein' ) {
        const center = this.mode.slot.position + ( this.mode.offset || 0 );
        const maxDistanceFromCenter = 0.8;
        if ( Math.abs( this.position.x - center ) > maxDistanceFromCenter ) {
          this.position.x = center + maxDistanceFromCenter * Math.sign( this.position.x - center );
        }

        const crossedOver = this.mode.direction === 'inward' && this.position.y < 0 ||
                            this.mode.direction === 'outward' && this.position.y > 0;

        // If the particle has moved through, potentially update transport protein state
        if ( crossedOver && Math.abs( this.position.y ) > MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 ) {
          const transportProtein = this.mode.slot.transportProteinProperty.value;

          // If fully moved through a SodiumGlucoseCotransporter, close
          if ( transportProtein instanceof SodiumGlucoseCotransporter ) {
            transportProtein.stateProperty.value = 'openToInside';
          }
        }
      }

      // Once the particle has moved sufficiently far from the membrane, resume random walk.
      if ( this.mode.direction === 'inward' && ( this.position.y + this.dimension.height / 2 ) < MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) {
        const downwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( -1, 0 )
        ).normalize();
        this.moveInDirection( downwardDirection, sampleValueHowLongToGoStraight() );
      }
      if ( this.mode.direction === 'outward' && ( this.position.y - this.dimension.height / 2 ) > MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ) {
        const upwardDirection = new Vector2(
          dotRandom.nextDoubleBetween( -1, 1 ),
          dotRandom.nextDoubleBetween( 0, 1 )
        ).normalize();
        this.moveInDirection( upwardDirection, sampleValueHowLongToGoStraight() );
      }
    }
  }

  /**
   * Step the particle along a random walk path, including bouncing off the membrane
   * (central horizontal band) and the top/bottom walls, and wrapping around left/right walls.
   */
  private stepRandomWalk( dt: number, model: MembraneTransportModel ): void {
    this.updateRandomWalkTimingAndDirection( dt );

    const randomWalk = this.mode as RandomWalkMode;
    const direction = randomWalk.currentDirection.copy();
    const thisBounds = this.getBounds();
    const isOutsideCell = this.position.y > 0;

    if ( this.attemptProteinInteraction( model, isOutsideCell ) ) {
      return;
    }

    if ( this.attemptMembraneInteraction( thisBounds, isOutsideCell, direction ) ) {
      return;
    }

    // For debugging, make the ligands move slower so they are easy to grab and drag.
    const moveDeltaTime = ( MembraneTransportQueryParameters.slowLigands && ( this.type === 'triangleLigand' || this.type === 'starLigand' ) ) ? 0.1 * dt : dt;
    this.moveParticle( moveDeltaTime, direction );

    const boundingRegion = isOutsideCell ? MembraneTransportConstants.OUTSIDE_CELL_BOUNDS : MembraneTransportConstants.INSIDE_CELL_BOUNDS;

    // Focused ligands have a different random walk behavior, so they do not get too close to the edge or teleport.
    if ( this.focused ) {
      this.handleBounceLigand();
    }
    else {
      this.handleHorizontalWrap( boundingRegion );
      this.handleVerticalBounce( boundingRegion, direction );
    }
  }

  private handleBounceLigand(): void {

    // Recompute thisBounds after the move
    const updatedBounds = this.getBounds();

    const randomWalk = this.mode as RandomWalkMode;
    const direction = randomWalk.currentDirection;

    // Helper function to apply the adjustment to the specified axis
    const applyAxisAdjustment = ( axis: 'x' | 'y', adjustment: { bounce: boolean; newPos: number; newDir: number } ) => {
      this.position[ axis ] = adjustment.newPos;
      direction[ axis ] = adjustment.newDir;
      randomWalk.currentDirection[ axis ] = adjustment.newDir;

      if ( adjustment.bounce ) {
        MembraneTransportSounds.particleBounced( this );
      }
    };

    // Adjust x-axis collision
    const xAdjustment = Particle.adjustAxis( this.position.x, updatedBounds.minX, updatedBounds.maxX, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.minX, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.maxX, direction.x );
    applyAxisAdjustment( 'x', xAdjustment );

    // Adjust y-axis collision
    const yAdjustment = Particle.adjustAxis( this.position.y, updatedBounds.minY, updatedBounds.maxY, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.minY, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.maxY, direction.y );
    applyAxisAdjustment( 'y', yAdjustment );
  }

  private static adjustAxis( position: number, particleMin: number, particleMax: number, regionMin: number, regionMax: number, currentDir: number ): { bounce: boolean; newPos: number; newDir: number } {
    return particleMin < regionMin ? ( { bounce: true, newPos: position + ( regionMin - particleMin ), newDir: Math.abs( currentDir ) } ) :
           particleMax > regionMax ? ( { bounce: true, newPos: position - ( particleMax - regionMax ), newDir: -Math.abs( currentDir ) } ) :
           ( { bounce: false, newPos: position, newDir: currentDir } );
  }

  /**
   * Updates the random walk timing and assigns a new direction if the timer has elapsed.
   */
  private updateRandomWalkTimingAndDirection( dt: number ): void {
    const randomWalk = this.mode as RandomWalkMode;

    randomWalk.timeUntilNextDirection -= dt;
    randomWalk.timeElapsedSinceMembraneCrossing += dt;

    // Time for a new direction
    if ( randomWalk.timeUntilNextDirection <= 0 ) {
      randomWalk.currentDirection = Particle.createRandomUnitVector();
      randomWalk.timeUntilNextDirection = sampleValueHowLongToGoStraight();
    }
  }

  /**
   * Checks for a protein interaction and handles it.
   * Returns true if an interaction occurs.
   */
  private attemptProteinInteraction( model: MembraneTransportModel, outsideOfCell: boolean ): boolean {
    const randomWalk = this.mode as RandomWalkMode;

    for ( let i = 0; i < model.membraneSlots.length; i++ ) {
      const slot = model.membraneSlots[ i ];
      const transportProtein = slot.transportProteinProperty.value;

      // If the particle is within a certain radial distance from the center of the transport protein, it can interact
      const distance = this.position.distance( new Vector2( slot.position, 0 ) );

      let captureRadius = CAPTURE_RADIUS_PROPERTY.value;

      // ATP's is a tall molecule and will bounce off the membrane before interacting with the protein, so we must
      // increase the capture radius
      if ( this.type === 'atp' ) {
        captureRadius = captureRadius * 2;
      }

      if ( transportProtein && distance < captureRadius && randomWalk.timeElapsedSinceMembraneCrossing > CROSSING_COOLDOWN ) {
        const interactedWithProtein = this.handleProteinInteractionDuringRandomWalk( slot, transportProtein, model, outsideOfCell );
        if ( interactedWithProtein ) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks for membrane interactions, handling passive diffusion or bounce if necessary.
   * Returns true if passive diffusion occurs.
   */
  private attemptMembraneInteraction( thisBounds: Bounds2, outsideOfCell: boolean, direction: Vector2 ): boolean {
    if ( MembraneTransportConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      // Check for passive diffusion first, might change mode
      if ( ( this.type === 'oxygen' || this.type === 'carbonDioxide' ) && dotRandom.nextDouble() < 0.90 ) {
        this.mode = {
          type: 'passiveDiffusion',
          direction: outsideOfCell ? 'inward' : 'outward',
          slot: null
        };

        MembraneTransportSounds.gasMoleculeEnteredMembrane( this, this.mode.direction );
        return true;
      }

      // If not diffusing, bounce off membrane
      const overlap = outsideOfCell ?
                      MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - thisBounds.minY :
                      thisBounds.maxY - MembraneTransportConstants.MEMBRANE_BOUNDS.minY;
      const sign = outsideOfCell ? 1 : -1;

      // Push the entity back out of the membrane.
      this.position.y += sign * overlap;

      // Reflect the vertical motion
      direction.y = sign * Math.abs( direction.y );
      ( this.mode as RandomWalkMode ).currentDirection.y = direction.y;
    }
    return false;
  }

  /**
   * Move the particle according to the potentially modified direction and speed.
   */
  private moveParticle( dt: number, direction: Vector2 ): void {
    this.position.x += direction.x * dt * TYPICAL_SPEED;
    this.position.y += direction.y * dt * TYPICAL_SPEED;
  }

  /**
   * Handles horizontal wrapping of the particle around left/right walls.
   */
  private handleHorizontalWrap( boundingRegion: Bounds2 ): void {
    const updatedBoundsAfterMove = this.getBounds(); // Bounds AFTER movement
    const totalBounds = boundingRegion;
    const particleWidth = this.dimension.width;
    const epsilon = NUDGE_EPSILON;

    // Check for exit left: particle bounds are fully to the left of the view
    if ( updatedBoundsAfterMove.maxX < totalBounds.minX ) {

      // Teleport to the right side, fully out of view, then nudge slightly inside
      this.position.x = totalBounds.maxX + particleWidth / 2 - epsilon;
    }
    // Check for exit right: particle bounds are fully to the right of the view
    else if ( updatedBoundsAfterMove.minX > totalBounds.maxX ) {

      // Teleport to the left side, fully out of view, then nudge slightly inside
      this.position.x = totalBounds.minX - particleWidth / 2 + epsilon;
    }
  }

  /**
   * Handles vertical bouncing of the particle off the top/bottom walls.
   */
  private handleVerticalBounce( boundingRegion: Bounds2, direction: Vector2 ): void {
    const newBounds = this.getBounds();

    let bounce = false;
    let newPositionY = this.position.y;
    let newDirectionY = direction.y;

    // Dilate the bounding region by the height of the particle, so it can go just barely out of bounds.
    const dilatedBoundingRegion = boundingRegion.dilated( newBounds.height - NUDGE_EPSILON );

    // Detect fully out of bounds
    if ( newBounds.minY < dilatedBoundingRegion.minY ) {
      bounce = true;
      newPositionY += ( dilatedBoundingRegion.minY - newBounds.minY );
      newDirectionY = Math.abs( newDirectionY );
    }
    else if ( newBounds.maxY > dilatedBoundingRegion.maxY ) {
      bounce = true;
      newPositionY -= ( newBounds.maxY - dilatedBoundingRegion.maxY );
      newDirectionY = -Math.abs( newDirectionY );
    }

    if ( bounce ) {
      this.position.y = newPositionY;
      ( this.mode as RandomWalkMode ).currentDirection.y = newDirectionY;

      // Teleport to give the sense that one particle left at once coordinate and another entered at the same time
      this.position.x = dotRandom.nextDoubleBetween( boundingRegion.minX, boundingRegion.maxX );

      MembraneTransportSounds.particleBounced( this );
    }
  }

  /**
   * During randomWalk, check for interactions with transport proteins.
   */
  private handleProteinInteractionDuringRandomWalk(
    slot: Slot,
    transportProtein: TransportProtein,
    model: MembraneTransportModel,
    outsideOfCell: boolean
  ): boolean {

    // Chain of responsibility pattern to check for interactions. Once we have completed one interaction, we can stop.
    const handlers = [
      () => this.handleLigandGatedChannelInteraction( slot, transportProtein, model, outsideOfCell ),
      () => this.handleLeakageChannelInteraction( slot, transportProtein ),
      () => this.handleSodiumGlucoseCotransporterInteraction( slot, transportProtein, model ),
      () => this.handleSodiumPotassiumPumpSodiumIntracellularInteraction( slot, transportProtein ),
      () => this.handleSodiumPotassiumPumpATPIntracellularInteraction( slot, transportProtein ),
      () => this.handleSodiumPotassiumPumpPotassiumExtracellularInteraction( slot, transportProtein )
    ];

    for ( const handler of handlers ) {
      if ( handler() ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check for ligand interaction with ligand-gated channels.
   * @returns true if an interaction occurred
   */
  private handleLigandGatedChannelInteraction(
    slot: Slot,
    transportProtein: TransportProtein,
    model: MembraneTransportModel,
    outsideOfCell: boolean
  ): boolean {
    if ( ( this.type === 'triangleLigand' || this.type === 'starLigand' ) && outsideOfCell ) {

      const transportProteinType = this.type === 'triangleLigand'
                                   ? 'sodiumIonLigandGatedChannel'
                                   : 'potassiumIonLigandGatedChannel';

      if ( slot.transportProteinType === transportProteinType ) {
        if ( transportProtein instanceof LigandGatedChannel && transportProtein.isAvailableForBinding() ) {

          // see if any ligand is already bound or inbound.
          const boundLigands = model.ligands.filter( ligand => ligand.mode.type === 'ligandBound' && ligand.mode.ligandGatedChannel === transportProtein );
          const inboundLigands = model.ligands.filter( ligand => ligand.mode.type === 'moveToLigandBindingLocation' && ligand.mode.slot === slot );

          const isLigandFree = boundLigands.length === 0 && inboundLigands.length === 0;

          if ( isLigandFree ) {
            this.mode = { type: 'moveToLigandBindingLocation', slot: slot };
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Check for sodium and potassium ions interacting with leakage channels.
   * @returns true if an interaction occurred
   */
  private handleLeakageChannelInteraction( slot: Slot, transportProtein: TransportProtein ): boolean {

    const sodiumGates = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    if ( transportProtein.isAvailableForPassiveTransport() ) {
      affirm( slot.transportProteinType, 'transportProteinType should be defined' );
      if ( ( this.type === 'sodiumIon' && sodiumGates.includes( slot.transportProteinType ) ) ||
           ( this.type === 'potassiumIon' && potassiumGates.includes( slot.transportProteinType ) ) ) {
        this.mode = { type: 'moveToCenterOfChannel', slot: slot };
        return true;
      }
    }
    return false;
  }

  /**
   * Check for interaction with sodium-glucose cotransporter.
   * @returns true if an interaction occurred
   */
  private handleSodiumGlucoseCotransporterInteraction(
    slot: Slot,
    transportProtein: TransportProtein,
    model: MembraneTransportModel
  ): boolean {

    if (
      ( this.type === 'sodiumIon' || this.type === 'glucose' ) &&
      slot.transportProteinType === 'sodiumGlucoseCotransporter' &&
      transportProtein instanceof SodiumGlucoseCotransporter &&
      model.outsideSoluteCountProperties.sodiumIon.value > model.insideSoluteCountProperties.sodiumIon.value &&
      // Only approach from extracellular side
      this.position.y > 0 &&
      transportProtein.stateProperty.value === 'openToOutsideAwaitingParticles'
    ) {

      if ( this.type === 'sodiumIon' ) {

        // Sodium ions can use left or right site
        const availableSites = transportProtein.getAvailableSodiumSites();

        if ( availableSites.length > 0 ) {
          const site = dotRandom.sample( availableSites );
          this.mode = { type: 'moveToSodiumGlucoseCotransporter', slot: slot, site: site, sodiumGlucoseCotransporter: transportProtein };
          return true;
        }
      }
      else if ( this.type === 'glucose' && transportProtein.isGlucoseSiteOpen() ) {

        // Glucose can only use center site
        this.mode = { type: 'moveToSodiumGlucoseCotransporter', slot: slot, site: 'center', sodiumGlucoseCotransporter: transportProtein };
        return true;
      }
    }

    return false;
  }

  /**
   * Sodium ions interact with sodium-potassium pump from intracellular side.
   * @returns true if an interaction occurred
   */
  private handleSodiumPotassiumPumpSodiumIntracellularInteraction(
    slot: Slot,
    transportProtein: TransportProtein
  ): boolean {

    if (
      this.type === 'sodiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.stateProperty.value === 'openToInsideEmpty' &&
      this.position.y < 0 && // Only approach from intracellular side
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'potassiumIon' ) ) // make sure no potassium still leaving
    ) {

      const openSodiumSites = transportProtein.getOpenSodiumSites();

      if ( openSodiumSites.length > 0 ) {
        const site = dotRandom.sample( openSodiumSites );
        this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: site, sodiumPotassiumPump: transportProtein };
        return true;
      }
    }

    return false;
  }

  /**
   * ATP interaction with sodium-potassium pump from intracellular side.
   * @returns true if an interaction occurred
   */
  private handleSodiumPotassiumPumpATPIntracellularInteraction(
    slot: Slot,
    transportProtein: TransportProtein
  ): boolean {

    if (
      this.type === 'atp' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      this.position.y < 0 && // Only approach from intracellular side
      transportProtein.stateProperty.value === 'openToInsideSodiumBoundPhosphateSiteOpen' &&
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'atp' ) ) // make sure no sodium still leaving
    ) {

      this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: 'phosphate', sodiumPotassiumPump: transportProtein };
      return true;
    }

    return false;
  }

  /**
   * Potassium ions interact with sodium-potassium pump from extracellular side.
   * @returns true if an interaction occurred
   */
  private handleSodiumPotassiumPumpPotassiumExtracellularInteraction(
    slot: Slot,
    transportProtein: TransportProtein
  ): boolean {

    if (
      this.type === 'potassiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.stateProperty.value === 'openToOutsideAwaitingPotassium' &&
      this.position.y > 0 && // Only approach from extracellular side
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'sodiumIon' ) ) // make sure no sodium still leaving
    ) {

      const openPotassiumSites = transportProtein.getOpenPotassiumSites();

      if ( openPotassiumSites.length > 0 ) {
        const site = dotRandom.sample( openPotassiumSites );
        this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: site, sodiumPotassiumPump: transportProtein };
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

  public static modeToState( mode: IntentionalAny ): Record<string, IntentionalAny> {

    // Here are all the things that need help serializing

    // Will be nullified:
    // offset?: number;
    // sheddingElapsed?: number;
    //
    // currentDirection: Vector2; => toStateObject
    // slot: Slot; => index

    // Will be looked up from the slot.
    // sodiumGlucoseCotransporter: SodiumGlucoseCotransporter;
    // sodiumPotassiumPump: SodiumPotassiumPump;
    // ligandGatedChannel: LigandGatedChannel;

    // eslint-disable-next-line phet/no-object-spread-on-non-literals
    const output: IntentionalAny = { ...mode };

    if ( typeof output.offset !== 'number' ) {
      output.offset = null;
    }

    if ( typeof output.sheddingElapsed !== 'number' ) {
      output.sheddingElapsed = null;
    }
    if ( output.currentDirection ) {
      output.currentDirection = Vector2.Vector2IO.toStateObject( output.currentDirection );
    }
    if ( output.slot ) {
      output.slot = output.slot.getIndex();
    }
    if ( output.sodiumGlucoseCotransporter ) {
      output.sodiumGlucoseCotransporter = true;
    }
    if ( output.sodiumPotassiumPump ) {
      output.sodiumPotassiumPump = true;
    }
    if ( output.ligandGatedChannel ) {
      output.ligandGatedChannel = true;
    }

    return output;
  }

  public static stateToMode( model: MembraneTransportModel, state: Record<string, IntentionalAny> ): IntentionalAny {
    // eslint-disable-next-line phet/no-object-spread-on-non-literals
    const mode = { ...state };
    if ( mode.currentDirection ) {
      mode.currentDirection = Vector2.Vector2IO.fromStateObject( mode.currentDirection );
    }
    if ( mode.slot ) {
      mode.slot = model.membraneSlots[ mode.slot ];
    }
    if ( mode.sodiumGlucoseCotransporter ) {
      mode.sodiumGlucoseCotransporter = mode.slot.transportProteinProperty.value;
    }
    if ( mode.sodiumPotassiumPump ) {
      mode.sodiumPotassiumPump = mode.slot.transportProteinProperty.value;
    }
    if ( mode.ligandGatedChannel ) {
      mode.ligandGatedChannel = mode.slot.transportProteinProperty.value;
    }
  }
}

export type SoluteStateObject = {
  position: Vector2;
  type: SoluteType;
  mode: Record<string, unknown>;
  model: ReferenceIOState;
};

membraneTransport.register( 'Particle', Particle );