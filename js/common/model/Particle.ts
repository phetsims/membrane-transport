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
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';
import MembraneTransportQueryParameters from '../MembraneTransportQueryParameters.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';

// the model bounds are inferred from the view dimensions
import getParticleViewDimensions from '../view/particles/getParticleViewDimensions.js'; // eslint-disable-line phet/no-view-imported-from-model
import MembraneTransportModel from './MembraneTransportModel.js';
import BaseParticleMode from './particleModes/BaseParticleMode.js';
import EnteringTransportProteinMode from './particleModes/EnteringTransportProteinMode.js';
import LigandBoundMode from './particleModes/LigandBoundMode.js';
import MoveToCenterOfChannelMode from './particleModes/MoveToCenterOfChannelMode.js';
import MoveToLigandBindingLocationMode from './particleModes/MoveToLigandBindingLocationMode.js';
import MoveToSodiumGlucoseTransporterMode from './particleModes/MoveToSodiumGlucoseTransporterMode.js';
import MoveToSodiumPotassiumPumpMode from './particleModes/MoveToSodiumPotassiumPumpMode.js';
import MovingThroughTransportProteinMode from './particleModes/MovingThroughTransportProteinMode.js';
import PassiveDiffusionMode from './particleModes/PassiveDiffusionMode.js';
import RandomWalkMode from './particleModes/RandomWalkMode.js';
import SheddingCagedWaterMoleculesMode from './particleModes/SheddingCagedWaterMoleculesMode.js';
import UserControlledMode from './particleModes/UserControlledMode.js';
import UserOverMode from './particleModes/UserOverMode.js';
import WaitingInSodiumGlucoseCotransporterMode from './particleModes/WaitingInSodiumGlucoseCotransporterMode.js';
import WaitingInSodiumPotassiumPumpMode from './particleModes/WaitingInSodiumPotassiumPumpMode.js';
import LigandGatedChannel from './proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from './proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from './proteins/SodiumPotassiumPump.js';
import TransportProtein from './proteins/TransportProtein.js';
import Slot from './Slot.js';
import SoluteType, { ParticleType } from './SoluteType.js';

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

const GLUCOSE_FADE_TIME = 7; // in seconds, how long it takes for glucose to fade out if glucose absorption is enabled
const ADP_FADE_TIME = 16; // in seconds
const PHOSPHATE_FADE_TIME = 2; // in seconds

// When a ligand is bound to a protein, it does not have a slot.
export type ParticleModeWithSlot = BaseParticleMode & { slot: Slot };

/**
 * For the random walk, the brownian motion is straight lines then random angles. This function determines how long to
 * go straight before a sudden direction change.
 */
const sampleValueHowLongToGoStraight = () => {
  const result = boxMullerTransform( 0.3, 0.4, dotRandom );
  return clamp( result, 0.01, 2 );
};

export default class Particle<T extends ParticleType> {

  public mode: BaseParticleMode;

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
    return new RandomWalkMode(
      Particle.createRandomUnitVector(),
      sampleValueHowLongToGoStraight(),
      timeElapsedSinceMembraneCrossing
    );
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
    this.mode = new RandomWalkMode( direction, duration, 0 );
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
      this.mode.step( dt, this, model );
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
    const fadeRateGlucose = dt / GLUCOSE_FADE_TIME;
    const fadeRatePhosphate = dt / PHOSPHATE_FADE_TIME;
    const fadeRateAdp = dt / ADP_FADE_TIME;

    if ( this.type === 'glucose' ) {

      // If absorb feature is enabled, glucose inside the cell will fade out over time.
      if ( this.position.y < MembraneTransportConstants.MEMBRANE_BOUNDS.minY && MembraneTransportPreferences.instance.absorbGlucoseProperty.value ) {
        this.opacity -= fadeRateGlucose;
        if ( this.opacity <= 0 ) {
          removeParticle( this );
          return true; // Particle removed
        }
      }
      else {

        // It is important to reset the opacity if the preferences Property changes.
        this.opacity = 1;
      }
    }

    // Free phosphate molecules move normally for a while, then are absorbed
    if ( this.type === 'phosphate' && this.mode instanceof RandomWalkMode && this.mode.timeElapsedSinceMembraneCrossing > 3 ) {
      this.opacity -= fadeRatePhosphate;
      if ( this.opacity <= 0 ) {
        removeParticle( this );
        return true; // Particle removed
      }
    }

    // Free ADP molecules move normally for a while, then are absorbed
    if ( this.type === 'adp' && this.mode instanceof RandomWalkMode ) {
      this.opacity -= fadeRateAdp;
      if ( this.opacity <= 0 ) {
        removeParticle( this );
        return true; // Particle removed
      }
    }

    return false; // particle not absorbed
  }


  /**
   * Step the particle along a random walk path, including bouncing off the membrane
   * (central horizontal band) and the top/bottom walls, and wrapping around left/right walls.
   */
  public stepRandomWalk( dt: number, model: MembraneTransportModel ): void {
    this.updateRandomWalkTimingAndDirection( dt );

    const randomWalk = this.mode as RandomWalkMode;
    const direction = randomWalk.currentDirection.copy();
    const thisBounds = this.getBounds();
    const isOutsideCell = this.position.y > 0;

    if ( this.attemptProteinInteraction( model, isOutsideCell ) ) {
      return;
    }

    if ( this.attemptMembraneInteraction( model, thisBounds, isOutsideCell, direction ) ) {
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
    const direction = randomWalk.currentDirection.copy();

    let bounced = false;

    // Adjust x-axis collision
    const xAdjustment = Particle.adjustAxis( this.position.x, updatedBounds.minX, updatedBounds.maxX, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.minX, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.maxX, direction.x );
    this.position.x = xAdjustment.newPos;
    direction.x = xAdjustment.newDir;
    if ( xAdjustment.bounce ) {
      bounced = true;
    }

    // Adjust y-axis collision
    const yAdjustment = Particle.adjustAxis( this.position.y, updatedBounds.minY, updatedBounds.maxY, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.minY, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.maxY, direction.y );
    this.position.y = yAdjustment.newPos;
    direction.y = yAdjustment.newDir;
    if ( yAdjustment.bounce ) {
      bounced = true;
    }

    // Update the mode with new direction if it changed
    if ( !direction.equals( randomWalk.currentDirection ) ) {
      this.mode = new RandomWalkMode(
        direction,
        randomWalk.timeUntilNextDirection,
        randomWalk.timeElapsedSinceMembraneCrossing
      );
    }

    if ( bounced ) {
      MembraneTransportSounds.particleBounced( this );
    }
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

    const newTimeUntilNextDirection = randomWalk.timeUntilNextDirection - dt;
    const newTimeElapsedSinceMembraneCrossing = randomWalk.timeElapsedSinceMembraneCrossing + dt;
    console.log( 'here' );

    // Time for a new direction
    if ( newTimeUntilNextDirection <= 0 ) {
      this.mode = new RandomWalkMode(
        Particle.createRandomUnitVector(),
        sampleValueHowLongToGoStraight(),
        newTimeElapsedSinceMembraneCrossing
      );
    }
    else {
      // Update with new timing
      this.mode = new RandomWalkMode(
        randomWalk.currentDirection,
        newTimeUntilNextDirection,
        newTimeElapsedSinceMembraneCrossing
      );
    }
  }

  /**
   * Checks for a protein interaction and handles it.
   * Returns true if an interaction occurs.
   */
  private attemptProteinInteraction( model: Pick<MembraneTransportModel, 'membraneSlots' | 'ligands' | 'outsideSoluteCountProperties' | 'insideSoluteCountProperties'>, outsideOfCell: boolean ): boolean {
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
  private attemptMembraneInteraction( membraneTransportModel: Pick<MembraneTransportModel, 'checkGradientForCrossing'>, thisBounds: Bounds2, outsideOfCell: boolean, direction: Vector2 ): boolean {
    if ( MembraneTransportConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      // Check for passive diffusion first, might change mode
      const location = outsideOfCell ? 'outside' : 'inside';
      if ( ( this.type === 'oxygen' || this.type === 'carbonDioxide' ) && dotRandom.nextDouble() < 0.90 && membraneTransportModel.checkGradientForCrossing( this.type, location ) ) {
        const newMode = new PassiveDiffusionMode( outsideOfCell ? 'inward' : 'outward' );
        this.mode = newMode;

        MembraneTransportSounds.gasMoleculeEnteredMembrane( this, newMode.direction );
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

      const currentMode = this.mode as RandomWalkMode;

      this.mode = new RandomWalkMode(
        new Vector2( currentMode.currentDirection.x, direction.y ),
        currentMode.timeUntilNextDirection,
        currentMode.timeElapsedSinceMembraneCrossing
      );
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

      const currentMode = this.mode as RandomWalkMode;

      this.mode = new RandomWalkMode(
        new Vector2( currentMode.currentDirection.x, newDirectionY ),
        currentMode.timeUntilNextDirection,
        currentMode.timeElapsedSinceMembraneCrossing
      );

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
    model: Pick<MembraneTransportModel, 'ligands' | 'outsideSoluteCountProperties' | 'insideSoluteCountProperties'>,
    outsideOfCell: boolean
  ): boolean {

    // Chain of responsibility pattern to check for interactions. Once we have completed one interaction, we can stop.
    const handlers = [
      () => this.handleLigandGatedChannelInteraction( slot, transportProtein, model, outsideOfCell ),
      () => this.handleLeakageChannelInteraction( slot, transportProtein, outsideOfCell ),
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
    model: Pick<MembraneTransportModel, 'ligands'>,
    outsideOfCell: boolean
  ): boolean {
    if ( ( this.type === 'triangleLigand' || this.type === 'starLigand' ) && outsideOfCell ) {

      const transportProteinType = this.type === 'triangleLigand'
                                   ? 'sodiumIonLigandGatedChannel'
                                   : 'potassiumIonLigandGatedChannel';

      if ( slot.transportProteinType === transportProteinType ) {
        if ( transportProtein instanceof LigandGatedChannel && transportProtein.isAvailableForBinding() ) {

          // see if any ligand is already bound or inbound.
          const boundLigands = model.ligands.filter( ligand => ligand.mode instanceof LigandBoundMode && ligand.mode.ligandGatedChannel === transportProtein );
          const inboundLigands = model.ligands.filter( ligand => ligand.mode instanceof MoveToLigandBindingLocationMode && ligand.mode.slot === slot );

          const isLigandFree = boundLigands.length === 0 && inboundLigands.length === 0;

          if ( isLigandFree ) {
            this.mode = new MoveToLigandBindingLocationMode( slot );
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
  private handleLeakageChannelInteraction( slot: Slot, transportProtein: TransportProtein, outsideOfCell: boolean ): boolean {

    const sodiumGates = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    const location = outsideOfCell ? 'outside' : 'inside';

    if ( MembraneTransportModel.canSoluteTypeMoveThroughPassiveTransport( this.type ) && transportProtein.isAvailableForPassiveTransport( this.type as SoluteType, location ) ) {
      affirm( slot.transportProteinType, 'transportProteinType should be defined' );
      if ( ( this.type === 'sodiumIon' && sodiumGates.includes( slot.transportProteinType ) ) ||
           ( this.type === 'potassiumIon' && potassiumGates.includes( slot.transportProteinType ) ) ) {
        this.mode = new MoveToCenterOfChannelMode( slot );
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
    model: Pick<MembraneTransportModel, 'outsideSoluteCountProperties' | 'insideSoluteCountProperties'>
  ): boolean {

    if (
      ( this.type === 'sodiumIon' || this.type === 'glucose' ) &&
      slot.transportProteinType === 'sodiumGlucoseCotransporter' &&
      transportProtein instanceof SodiumGlucoseCotransporter &&
      // Requires a greater number of sodium outside than inside for interaction
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
          this.mode = new MoveToSodiumGlucoseTransporterMode( slot, transportProtein, site );
          return true;
        }
      }
      else if ( this.type === 'glucose' && transportProtein.isGlucoseSiteOpen() ) {

        // Glucose can only use center site
        this.mode = new MoveToSodiumGlucoseTransporterMode( slot, transportProtein, 'center' );
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
        this.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, site );
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
      transportProtein.stateProperty.value === 'openToInsideSodiumBound' &&
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'atp' ) ) // make sure no sodium still leaving
    ) {

      this.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, 'phosphate' );
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
        this.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, site );
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

  public static stateToMode( model: Pick<MembraneTransportModel, 'membraneSlots'>, state: Record<string, IntentionalAny> ): BaseParticleMode {
    const slot = state.slot !== null && state.slot !== undefined ? model.membraneSlots[ state.slot ] : null;

    switch( state.type ) {
      case 'randomWalk':
        return RandomWalkMode.fromStateObject( state );
      case 'ligandBound':
        return LigandBoundMode.fromStateObject( state, slot! );
      case 'moveToCenterOfChannel':
        return MoveToCenterOfChannelMode.fromStateObject( state, slot! );
      case 'moveToSodiumGlucoseCotransporter':
        return MoveToSodiumGlucoseTransporterMode.fromStateObject( state, slot! );
      case 'moveToSodiumPotassiumPump':
        return MoveToSodiumPotassiumPumpMode.fromStateObject( state, slot! );
      case 'waitingInSodiumGlucoseCotransporter':
        return WaitingInSodiumGlucoseCotransporterMode.fromStateObject( state, slot! );
      case 'waitingInSodiumPotassiumPump':
        return WaitingInSodiumPotassiumPumpMode.fromStateObject( state, slot! );
      case 'moveToLigandBindingLocation':
        return MoveToLigandBindingLocationMode.fromStateObject( state, slot! );
      case 'enteringTransportProtein':
        return EnteringTransportProteinMode.fromStateObject( state, slot! );
      case 'sheddingCagedWaterMolecules':
        return SheddingCagedWaterMoleculesMode.fromStateObject( state, slot! );
      case 'passiveDiffusion':
        return PassiveDiffusionMode.fromStateObject( state );
      case 'movingThroughTransportProtein':
        return MovingThroughTransportProteinMode.fromStateObject( state, slot! );
      case 'userControlled':
        return UserControlledMode.fromStateObject( state );
      case 'userOver':
        return UserOverMode.fromStateObject( state );
      default:
        throw new Error( `Unknown particle mode type: ${state.type}` );
    }
  }
}

membraneTransport.register( 'Particle', Particle );