// Copyright 2025, University of Colorado Boulder

/**
 * Particle is moving randomly in Brownian motion within the cell or extracellular space.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportQueryParameters from '../../MembraneTransportQueryParameters.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import { CAPTURE_RADIUS_PROPERTY } from '../Particle.js';
import LigandGatedChannel from '../proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from '../proteins/SodiumPotassiumPump.js';
import TransportProtein from '../proteins/TransportProtein.js';
import RandomWalkUtils from '../RandomWalkUtils.js';
import Slot from '../Slot.js';
import SoluteType from '../SoluteType.js';
import BaseParticleMode from './BaseParticleMode.js';
import LigandBoundMode from './LigandBoundMode.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import MoveToCenterOfChannelMode from './MoveToCenterOfChannelMode.js';
import MoveToLigandBindingLocationMode from './MoveToLigandBindingLocationMode.js';
import MoveToSodiumGlucoseTransporterMode from './MoveToSodiumGlucoseTransporterMode.js';
import MoveToSodiumPotassiumPumpMode from './MoveToSodiumPotassiumPumpMode.js';
import Particle from '../Particle.js';
import PassiveDiffusionMode from './PassiveDiffusionMode.js';

// Typical speed for movement
const TYPICAL_SPEED = 30;

// The amount of time that must pass before a particle can cross the membrane again.
const CROSSING_COOLDOWN = 10;

// Epsilon value for nudging the particle into bounds after teleporting so that it doesn't instantly teleport back to the other side
const NUDGE_EPSILON = 1E-6;

export default class RandomWalkMode extends BaseParticleMode {

  public readonly slot = null;

  public constructor( public readonly currentDirection: Vector2,
                      public readonly timeUntilNextDirection: number,
                      public readonly timeElapsedSinceMembraneCrossing: number
  ) {
    super( 'randomWalk' );
  }

  public override toStateObject(): IntentionalAny {
    const baseState = this.baseToStateObject();
    return {
      type: baseState.type,
      currentDirection: Vector2.Vector2IO.toStateObject( this.currentDirection ),
      timeUntilNextDirection: this.timeUntilNextDirection,
      timeElapsedSinceMembraneCrossing: this.timeElapsedSinceMembraneCrossing
    };
  }

  public step( dt: number, particle: Particle<IntentionalAny>, model: MembraneTransportModel ): void {
    this.stepRandomWalk( dt, particle, model );
  }

  /**
   * Step the particle along a random walk path, including bouncing off the membrane
   * (central horizontal band) and the top/bottom walls, and wrapping around left/right walls.
   */
  private stepRandomWalk( dt: number, particle: Particle<IntentionalAny>, model: MembraneTransportModel ): void {
    this.updateRandomWalkTimingAndDirection( dt, particle );

    const direction = this.currentDirection.copy();
    const thisBounds = particle.getBounds();
    const isOutsideCell = particle.position.y > 0;

    if ( this.attemptProteinInteraction( particle, model, isOutsideCell ) ) {
      return;
    }

    if ( this.attemptMembraneInteraction( particle, model, thisBounds, isOutsideCell, direction ) ) {
      return;
    }

    // For debugging, make the ligands move slower so they are easy to grab and drag.
    const moveDeltaTime = ( MembraneTransportQueryParameters.slowLigands && ( particle.type === 'triangleLigand' || particle.type === 'starLigand' ) ) ? 0.1 * dt : dt;
    this.moveParticle( moveDeltaTime, particle, direction );

    const boundingRegion = isOutsideCell ? MembraneTransportConstants.OUTSIDE_CELL_BOUNDS : MembraneTransportConstants.INSIDE_CELL_BOUNDS;

    // Focused ligands have a different random walk behavior, so they do not get too close to the edge or teleport.
    if ( particle.focused ) {
      this.handleBounceLigand( particle );
    }
    else {
      this.handleHorizontalWrap( particle, boundingRegion );
      this.handleVerticalBounce( particle, boundingRegion, direction );
    }
  }

  /**
   * Updates the random walk timing and assigns a new direction if the timer has elapsed.
   */
  private updateRandomWalkTimingAndDirection( dt: number, particle: Particle<IntentionalAny> ): void {
    const newTimeUntilNextDirection = this.timeUntilNextDirection - dt;
    const newTimeElapsedSinceMembraneCrossing = this.timeElapsedSinceMembraneCrossing + dt;

    // Time for a new direction
    if ( newTimeUntilNextDirection <= 0 ) {
      particle.mode = new RandomWalkMode(
        RandomWalkUtils.createRandomUnitVector(),
        RandomWalkUtils.sampleValueHowLongToGoStraight(),
        newTimeElapsedSinceMembraneCrossing
      );
    }
    else {
      // Update with new timing
      particle.mode = new RandomWalkMode(
        this.currentDirection,
        newTimeUntilNextDirection,
        newTimeElapsedSinceMembraneCrossing
      );
    }
  }

  private handleBounceLigand( particle: Particle<IntentionalAny> ): void {

    // Recompute thisBounds after the move
    const updatedBounds = particle.getBounds();

    const direction = this.currentDirection.copy();

    let bounced = false;

    // Adjust x-axis collision
    const xAdjustment = RandomWalkMode.adjustAxis( particle.position.x, updatedBounds.minX, updatedBounds.maxX, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.minX, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.maxX, direction.x );
    particle.position.x = xAdjustment.newPos;
    direction.x = xAdjustment.newDir;
    if ( xAdjustment.bounce ) {
      bounced = true;
    }

    // Adjust y-axis collision
    const yAdjustment = RandomWalkMode.adjustAxis( particle.position.y, updatedBounds.minY, updatedBounds.maxY, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.minY, MembraneTransportConstants.FOCUSED_LIGAND_BOUNDS.maxY, direction.y );
    particle.position.y = yAdjustment.newPos;
    direction.y = yAdjustment.newDir;
    if ( yAdjustment.bounce ) {
      bounced = true;
    }

    // Update the mode with new direction if it changed
    if ( !direction.equals( this.currentDirection ) ) {
      particle.mode = new RandomWalkMode(
        direction,
        this.timeUntilNextDirection,
        this.timeElapsedSinceMembraneCrossing
      );
    }

    if ( bounced ) {
      MembraneTransportSounds.particleBounced( particle );
    }
  }

  private static adjustAxis( position: number, particleMin: number, particleMax: number, regionMin: number, regionMax: number, currentDir: number ): { bounce: boolean; newPos: number; newDir: number } {
    return particleMin < regionMin ? ( { bounce: true, newPos: position + ( regionMin - particleMin ), newDir: Math.abs( currentDir ) } ) :
           particleMax > regionMax ? ( { bounce: true, newPos: position - ( particleMax - regionMax ), newDir: -Math.abs( currentDir ) } ) :
           ( { bounce: false, newPos: position, newDir: currentDir } );
  }

  /**
   * Checks for a protein interaction and handles it.
   * Returns true if an interaction occurs.
   */
  private attemptProteinInteraction( particle: Particle<IntentionalAny>, model: MembraneTransportModel, outsideOfCell: boolean ): boolean {

    for ( let i = 0; i < model.membraneSlots.length; i++ ) {
      const slot = model.membraneSlots[ i ];
      const transportProtein = slot.transportProteinProperty.value;

      // If the particle is within a certain radial distance from the center of the transport protein, it can interact
      const distance = particle.position.distance( new Vector2( slot.position, 0 ) );

      let captureRadius = CAPTURE_RADIUS_PROPERTY.value;

      // ATP's is a tall molecule and will bounce off the membrane before interacting with the protein, so we must
      // increase the capture radius
      if ( particle.type === 'atp' ) {
        captureRadius = captureRadius * 2;
      }

      if ( transportProtein && distance < captureRadius && this.timeElapsedSinceMembraneCrossing > CROSSING_COOLDOWN ) {
        const interactedWithProtein = this.handleProteinInteractionDuringRandomWalk( particle, slot, transportProtein, model, outsideOfCell );
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
  private attemptMembraneInteraction( particle: Particle<IntentionalAny>, membraneTransportModel: MembraneTransportModel, thisBounds: Bounds2, outsideOfCell: boolean, direction: Vector2 ): boolean {
    if ( MembraneTransportConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      // Check for passive diffusion first, might change mode
      const location = outsideOfCell ? 'outside' : 'inside';
      if ( ( particle.type === 'oxygen' || particle.type === 'carbonDioxide' ) && dotRandom.nextDouble() < 0.90 && membraneTransportModel.checkGradientForCrossing( particle.type, location ) ) {
        const newMode = new PassiveDiffusionMode( outsideOfCell ? 'inward' : 'outward' );
        particle.mode = newMode;

        MembraneTransportSounds.gasMoleculeEnteredMembrane( particle, newMode.direction );
        return true;
      }

      // If not diffusing, bounce off membrane
      const overlap = outsideOfCell ?
                      MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - thisBounds.minY :
                      thisBounds.maxY - MembraneTransportConstants.MEMBRANE_BOUNDS.minY;
      const sign = outsideOfCell ? 1 : -1;

      // Push the entity back out of the membrane.
      particle.position.y += sign * overlap;

      // Reflect the vertical motion
      direction.y = sign * Math.abs( direction.y );

      particle.mode = new RandomWalkMode(
        new Vector2( this.currentDirection.x, direction.y ),
        this.timeUntilNextDirection,
        this.timeElapsedSinceMembraneCrossing
      );
    }
    return false;
  }

  /**
   * Move the particle according to the potentially modified direction and speed.
   */
  private moveParticle( dt: number, particle: Particle<IntentionalAny>, direction: Vector2 ): void {
    particle.position.x += direction.x * dt * TYPICAL_SPEED;
    particle.position.y += direction.y * dt * TYPICAL_SPEED;
  }

  /**
   * Handles horizontal wrapping of the particle around left/right walls.
   */
  private handleHorizontalWrap( particle: Particle<IntentionalAny>, boundingRegion: Bounds2 ): void {
    const updatedBoundsAfterMove = particle.getBounds(); // Bounds AFTER movement
    const totalBounds = boundingRegion;
    const particleWidth = particle.dimension.width;
    const epsilon = NUDGE_EPSILON;

    // Check for exit left: particle bounds are fully to the left of the view
    if ( updatedBoundsAfterMove.maxX < totalBounds.minX ) {

      // Teleport to the right side, fully out of view, then nudge slightly inside
      particle.position.x = totalBounds.maxX + particleWidth / 2 - epsilon;
    }
    // Check for exit right: particle bounds are fully to the right of the view
    else if ( updatedBoundsAfterMove.minX > totalBounds.maxX ) {

      // Teleport to the left side, fully out of view, then nudge slightly inside
      particle.position.x = totalBounds.minX - particleWidth / 2 + epsilon;
    }
  }

  /**
   * Handles vertical bouncing of the particle off the top/bottom walls.
   */
  private handleVerticalBounce( particle: Particle<IntentionalAny>, boundingRegion: Bounds2, direction: Vector2 ): void {
    const newBounds = particle.getBounds();

    let bounce = false;
    let newPositionY = particle.position.y;
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
      particle.position.y = newPositionY;

      particle.mode = new RandomWalkMode(
        new Vector2( this.currentDirection.x, newDirectionY ),
        this.timeUntilNextDirection,
        this.timeElapsedSinceMembraneCrossing
      );

      // Teleport to give the sense that one particle left at once coordinate and another entered at the same time
      particle.position.x = dotRandom.nextDoubleBetween( boundingRegion.minX, boundingRegion.maxX );

      MembraneTransportSounds.particleBounced( particle );
    }
  }

  /**
   * During randomWalk, check for interactions with transport proteins.
   */
  private handleProteinInteractionDuringRandomWalk(
    particle: Particle<IntentionalAny>,
    slot: Slot,
    transportProtein: TransportProtein,
    model: MembraneTransportModel,
    outsideOfCell: boolean
  ): boolean {

    // Chain of responsibility pattern to check for interactions. Once we have completed one interaction, we can stop.
    const handlers = [
      () => this.handleLigandGatedChannelInteraction( particle, slot, transportProtein, model, outsideOfCell ),
      () => this.handleLeakageChannelInteraction( particle, slot, transportProtein, outsideOfCell ),
      () => this.handleSodiumGlucoseCotransporterInteraction( particle, slot, transportProtein, model ),
      () => this.handleSodiumPotassiumPumpSodiumIntracellularInteraction( particle, slot, transportProtein ),
      () => this.handleSodiumPotassiumPumpATPIntracellularInteraction( particle, slot, transportProtein ),
      () => this.handleSodiumPotassiumPumpPotassiumExtracellularInteraction( particle, slot, transportProtein )
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
    particle: Particle<IntentionalAny>,
    slot: Slot,
    transportProtein: TransportProtein,
    model: MembraneTransportModel,
    outsideOfCell: boolean
  ): boolean {
    if ( ( particle.type === 'triangleLigand' || particle.type === 'starLigand' ) && outsideOfCell ) {

      const transportProteinType = particle.type === 'triangleLigand'
                                   ? 'sodiumIonLigandGatedChannel'
                                   : 'potassiumIonLigandGatedChannel';

      if ( slot.transportProteinType === transportProteinType ) {
        if ( transportProtein instanceof LigandGatedChannel && transportProtein.isAvailableForBinding() ) {

          // see if any ligand is already bound or inbound.
          const boundLigands = model.ligands.filter( ligand => ligand.mode instanceof LigandBoundMode && ligand.mode.ligandGatedChannel === transportProtein );
          const inboundLigands = model.ligands.filter( ligand => ligand.mode instanceof MoveToLigandBindingLocationMode && ligand.mode.slot === slot );

          const isLigandFree = boundLigands.length === 0 && inboundLigands.length === 0;

          if ( isLigandFree ) {
            particle.mode = new MoveToLigandBindingLocationMode( slot );
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
  private handleLeakageChannelInteraction( particle: Particle<IntentionalAny>, slot: Slot, transportProtein: TransportProtein, outsideOfCell: boolean ): boolean {

    const sodiumGates = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    const location = outsideOfCell ? 'outside' : 'inside';

    if ( MembraneTransportModel.canSoluteTypeMoveThroughPassiveTransport( particle.type ) && transportProtein.isAvailableForPassiveTransport( particle.type as SoluteType, location ) ) {
      affirm( slot.transportProteinType, 'transportProteinType should be defined' );
      if ( ( particle.type === 'sodiumIon' && sodiumGates.includes( slot.transportProteinType ) ) ||
           ( particle.type === 'potassiumIon' && potassiumGates.includes( slot.transportProteinType ) ) ) {
        particle.mode = new MoveToCenterOfChannelMode( slot );
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
    particle: Particle<IntentionalAny>,
    slot: Slot,
    transportProtein: TransportProtein,
    model: MembraneTransportModel
  ): boolean {

    if (
      ( particle.type === 'sodiumIon' || particle.type === 'glucose' ) &&
      slot.transportProteinType === 'sodiumGlucoseCotransporter' &&
      transportProtein instanceof SodiumGlucoseCotransporter &&
      // Requires a greater number of sodium outside than inside for interaction
      model.outsideSoluteCountProperties.sodiumIon.value > model.insideSoluteCountProperties.sodiumIon.value &&
      // Only approach from extracellular side
      particle.position.y > 0 &&
      transportProtein.stateProperty.value === 'openToOutsideAwaitingParticles'
    ) {

      if ( particle.type === 'sodiumIon' ) {

        // Sodium ions can use left or right site
        const availableSites = transportProtein.getAvailableSodiumSites();

        if ( availableSites.length > 0 ) {
          const site = dotRandom.sample( availableSites );
          particle.mode = new MoveToSodiumGlucoseTransporterMode( slot, transportProtein, site );
          return true;
        }
      }
      else if ( particle.type === 'glucose' && transportProtein.isGlucoseSiteOpen() ) {

        // Glucose can only use center site
        particle.mode = new MoveToSodiumGlucoseTransporterMode( slot, transportProtein, 'center' );
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
    particle: Particle<IntentionalAny>,
    slot: Slot,
    transportProtein: TransportProtein
  ): boolean {

    if (
      particle.type === 'sodiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.stateProperty.value === 'openToInsideEmpty' &&
      particle.position.y < 0 && // Only approach from intracellular side
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'potassiumIon' ) ) // make sure no potassium still leaving
    ) {

      const openSodiumSites = transportProtein.getOpenSodiumSites();

      if ( openSodiumSites.length > 0 ) {
        const site = dotRandom.sample( openSodiumSites );
        particle.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, site );
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
    particle: Particle<IntentionalAny>,
    slot: Slot,
    transportProtein: TransportProtein
  ): boolean {

    if (
      particle.type === 'atp' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      particle.position.y < 0 && // Only approach from intracellular side
      transportProtein.stateProperty.value === 'openToInsideSodiumBound' &&
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'atp' ) ) // make sure no sodium still leaving
    ) {

      particle.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, 'phosphate' );
      return true;
    }

    return false;
  }

  /**
   * Potassium ions interact with sodium-potassium pump from extracellular side.
   * @returns true if an interaction occurred
   */
  private handleSodiumPotassiumPumpPotassiumExtracellularInteraction(
    particle: Particle<IntentionalAny>,
    slot: Slot,
    transportProtein: TransportProtein
  ): boolean {

    if (
      particle.type === 'potassiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.stateProperty.value === 'openToOutsideAwaitingPotassium' &&
      particle.position.y > 0 && // Only approach from extracellular side
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'sodiumIon' ) ) // make sure no sodium still leaving
    ) {

      const openPotassiumSites = transportProtein.getOpenPotassiumSites();

      if ( openPotassiumSites.length > 0 ) {
        const site = dotRandom.sample( openPotassiumSites );
        particle.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, site );
        return true;
      }
    }

    return false;
  }

  public static override fromStateObject( stateObject: IntentionalAny ): RandomWalkMode {
    return new RandomWalkMode(
      Vector2.Vector2IO.fromStateObject( stateObject.currentDirection ),
      stateObject.timeUntilNextDirection,
      stateObject.timeElapsedSinceMembraneCrossing
    );
  }
}

membraneTransport.register( 'RandomWalkMode', RandomWalkMode );