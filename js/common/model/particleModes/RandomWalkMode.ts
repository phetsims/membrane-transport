// Copyright 2025, University of Colorado Boulder

/**
 * Mode for a particle exhibiting Brownian motion in the cell or extracellular space.
 * Handles collisions with boundaries, interactions with membrane proteins, passive diffusion,
 * and transitions to other movement modes as appropriate.
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
import Ligand from '../Ligand.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle, { CAPTURE_RADIUS_PROPERTY } from '../Particle.js';
import LigandGatedChannel from '../proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from '../proteins/SodiumPotassiumPump.js';
import TransportProtein from '../proteins/TransportProtein.js';
import RandomWalkUtils from '../RandomWalkUtils.js';
import Slot from '../Slot.js';
import SoluteType from '../SoluteType.js';
import BaseParticleMode from './BaseParticleMode.js';
import LigandBoundMode from './LigandBoundMode.js';
import MoveToCenterOfChannelMode from './MoveToCenterOfChannelMode.js';
import MoveToLigandBindingLocationMode from './MoveToLigandBindingLocationMode.js';
import MoveToSodiumGlucoseTransporterMode from './MoveToSodiumGlucoseTransporterMode.js';
import MoveToSodiumPotassiumPumpMode from './MoveToSodiumPotassiumPumpMode.js';
import MoveToTargetMode from './MoveToTargetMode.js';
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
    return {
      type: this.type,
      currentDirection: Vector2.Vector2IO.toStateObject( this.currentDirection ),
      timeUntilNextDirection: this.timeUntilNextDirection,
      timeElapsedSinceMembraneCrossing: this.timeElapsedSinceMembraneCrossing
    };
  }

  /**
   * @param dt - in seconds
   * @param particle
   * @param model
   */
  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    this.stepRandomWalk( dt, particle, model );
  }

  /**
   * Step the particle along a random walk path, including bouncing off the membrane and the top/bottom walls
   * and wrapping around left/right walls.
   */
  private stepRandomWalk( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    this.updateRandomWalkTimingAndDirection( dt, particle );

    const direction = this.currentDirection.copy();
    const isOutsideCell = particle.position.y > 0;

    // For debugging, make the ligands move slower so they are easy to grab and drag.
    this.moveParticle( dt, particle, direction );

    // Check for overlap and interactions after updating particle position. This prevents particles from crossing the membrane
    // when dt is large (on slower devices).
    if ( this.attemptProteinInteraction( particle, model, isOutsideCell ) ) {
      return;
    }

    if ( this.attemptMembraneInteraction( particle, model, isOutsideCell, direction ) ) {
      return;
    }

    const boundingRegion = isOutsideCell ? MembraneTransportConstants.OUTSIDE_CELL_BOUNDS : MembraneTransportConstants.INSIDE_CELL_BOUNDS;

    // Focused ligands have a different random walk behavior, so they do not get too close to the edge or teleport.
    if ( particle instanceof Ligand && particle.focused ) {
      this.handleBounceLigand( particle );
    }
    else {
      this.handleHorizontalWrap( particle, boundingRegion );
      this.handleVerticalBounce( particle, boundingRegion, direction );
    }
  }

  /**
   * Updates the random walk timing and assigns a new direction if the timer has elapsed.
   *
   * @param dt - in seconds
   * @param particle
   */
  private updateRandomWalkTimingAndDirection( dt: number, particle: Particle ): void {
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

  /**
   * Handles rebound of a ligand particle against movement bounds, adjusting position and direction.
   * Updates the particle's mode if its direction changes due to collision.
   */
  private handleBounceLigand( particle: Particle ): void {

    // Recompute thisBounds after the move
    const updatedBounds = particle.getBounds();

    const direction = this.currentDirection.copy();

    // Adjust x-axis collision
    const xAdjustment = RandomWalkMode.adjustAxis( particle.position.x, updatedBounds.minX, updatedBounds.maxX, MembraneTransportConstants.LIGAND_COLLISION_BOUNDS.minX, MembraneTransportConstants.LIGAND_COLLISION_BOUNDS.maxX, direction.x );
    particle.position.x = xAdjustment.newPos;
    direction.x = xAdjustment.newDir;

    // Adjust y-axis collision
    const yAdjustment = RandomWalkMode.adjustAxis( particle.position.y, updatedBounds.minY, updatedBounds.maxY, MembraneTransportConstants.LIGAND_COLLISION_BOUNDS.minY, MembraneTransportConstants.LIGAND_COLLISION_BOUNDS.maxY, direction.y );
    particle.position.y = yAdjustment.newPos;
    direction.y = yAdjustment.newDir;

    // Update the mode with new direction if it changed
    if ( !direction.equals( this.currentDirection ) ) {
      particle.mode = new RandomWalkMode(
        direction,
        this.timeUntilNextDirection,
        this.timeElapsedSinceMembraneCrossing
      );
    }
  }

  private static adjustAxis( position: number, particleMin: number, particleMax: number, regionMin: number, regionMax: number, currentDir: number ): { bounce: boolean; newPos: number; newDir: number } {
    return particleMin < regionMin ? ( { bounce: true, newPos: position + ( regionMin - particleMin ), newDir: Math.abs( currentDir ) } ) :
           particleMax > regionMax ? ( { bounce: true, newPos: position - ( particleMax - regionMax ), newDir: -Math.abs( currentDir ) } ) :
           ( { bounce: false, newPos: position, newDir: currentDir } );
  }

  /**
   * Attempts a interaction between a particle and any nearby membrane transport protein.
   * Checks all membrane slots for proximity and cooldown before allowing interaction.
   *
   * @param particle
   * @param model
   * @param outsideOfCell - Is the particle outside of the cell?
   * @returns true if the particle interacted with a protein.
   */
  private attemptProteinInteraction( particle: Particle, model: MembraneTransportModel, outsideOfCell: boolean ): boolean {

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
   * Handles membrane interaction for a particle, allowing passive diffusion for gases when possible,
   * or bouncing the particle off the membrane if diffusion does not occur.
   *
   * @param particle
   * @param membraneTransportModel
   * @param outsideOfCell - true if the particle is outside the cell
   * @param direction - direction of the particle's movement
   * @returns true if passive diffusion occurs, false for all other cases.
   */
  private attemptMembraneInteraction( particle: Particle, membraneTransportModel: MembraneTransportModel, outsideOfCell: boolean, direction: Vector2 ): boolean {
    const particleBounds = particle.getBounds();
    if ( MembraneTransportConstants.MEMBRANE_BOUNDS.intersectsBounds( particleBounds ) ) {

      // Check for passive diffusion first, might change mode
      const location = outsideOfCell ? 'outside' : 'inside';
      const isGasParticle = particle.type === 'oxygen' || particle.type === 'carbonDioxide';
      if ( isGasParticle &&
           dotRandom.nextDouble() < 0.90 &&
           membraneTransportModel.checkGradientForCrossing( particle.type, location ) &&
           this.timeElapsedSinceMembraneCrossing > CROSSING_COOLDOWN
      ) {
        const newMode = new PassiveDiffusionMode( outsideOfCell ? 'inward' : 'outward' );
        particle.mode = newMode;

        return true;
      }

      // If not diffusing, bounce off membrane
      const overlap = outsideOfCell ?
                      MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - particleBounds.minY :
                      particleBounds.maxY - MembraneTransportConstants.MEMBRANE_BOUNDS.minY;
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
   * @param dt - in seconds
   * @param particle
   * @param direction
   */
  private moveParticle( dt: number, particle: Particle, direction: Vector2 ): void {
    particle.position.x += direction.x * dt * TYPICAL_SPEED;
    particle.position.y += direction.y * dt * TYPICAL_SPEED;
  }

  /**
   * Handles horizontal wrapping of the particle around left/right walls of the bounding region.
   */
  private handleHorizontalWrap( particle: Particle, boundingRegion: Bounds2 ): void {
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
   * Handles vertical bouncing of the particle off the top/bottom walls of the bounding region.
   */
  private handleVerticalBounce( particle: Particle, boundingRegion: Bounds2, direction: Vector2 ): void {
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
    }
  }

  /**
   * During randomWalk, check for interactions with transport proteins.
   */
  private handleProteinInteractionDuringRandomWalk(
    particle: Particle,
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
    particle: Particle,
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
            const targetPosition = slot.transportProteinProperty.value instanceof LigandGatedChannel ?
                                   ( slot.transportProteinProperty.value ).getBindingPosition() : particle.position.copy();
            const { startPosition, checkpoints, targetPosition: finalTarget } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
            particle.mode = new MoveToLigandBindingLocationMode( slot, startPosition, checkpoints, finalTarget );
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Checks if a sodium or potassium ion can interact with a leakage channel at the given slot.
   * Updates particle mode to move into the channel if interaction occurs.
   *
   * @returns true if an interaction occurred.
   */
  private handleLeakageChannelInteraction( particle: Particle, slot: Slot, transportProtein: TransportProtein, outsideOfCell: boolean ): boolean {

    const sodiumGates = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    const location = outsideOfCell ? 'outside' : 'inside';

    if ( MembraneTransportModel.canSoluteTypeMoveThroughPassiveTransport( particle.type ) && transportProtein.isAvailableForPassiveTransport( particle.type as SoluteType, location ) ) {
      affirm( slot.transportProteinType, 'transportProteinType should be defined' );
      if ( ( particle.type === 'sodiumIon' && sodiumGates.includes( slot.transportProteinType ) ) ||
           ( particle.type === 'potassiumIon' && potassiumGates.includes( slot.transportProteinType ) ) ) {
        const isOutsideCell = particle.position.y > 0;
        const mouthY = isOutsideCell ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY
                                     : MembraneTransportConstants.MEMBRANE_BOUNDS.minY;
        const targetPosition = new Vector2( slot.position, mouthY );
        const { startPosition, checkpoints } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
        particle.mode = new MoveToCenterOfChannelMode( slot, startPosition, checkpoints, targetPosition );
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a sodium ion or glucose can interact with the sodium-glucose cotransporter.
   * Updates particle mode to move towards the transporter if interaction is possible.
   *
   * @returns true if an interaction occurred.
   */
  private handleSodiumGlucoseCotransporterInteraction(
    particle: Particle,
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
          const targetPosition = transportProtein.getSitePosition( site );
          const { startPosition, checkpoints } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
          particle.mode = new MoveToSodiumGlucoseTransporterMode( slot, transportProtein, site, startPosition, checkpoints, targetPosition );
          return true;
        }
      }
      else if ( particle.type === 'glucose' && transportProtein.isGlucoseSiteOpen() ) {

        // Glucose can only use center site
        const targetPosition = transportProtein.getSitePosition( 'center' );
        const { startPosition, checkpoints } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
        particle.mode = new MoveToSodiumGlucoseTransporterMode( slot, transportProtein, 'center', startPosition, checkpoints, targetPosition );
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if a sodium ion can interact with the sodium-potassium pump from the intracellular side.
   * Updates particle mode to move towards the pump if an interaction is possible.
   *
   * @returns true if an interaction occurred.
   */
  private handleSodiumPotassiumPumpSodiumIntracellularInteraction(
    particle: Particle,
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
        const targetPosition = transportProtein.getSitePosition( site );
        const { startPosition, checkpoints } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
        particle.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, site, startPosition, checkpoints, targetPosition );
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if ATP can interact with the sodium-potassium pump from the intracellular side.
   * Updates particle mode to move towards the pump if an interaction is possible.
   *
   * @returns true if an interaction occurred.
   */
  private handleSodiumPotassiumPumpATPIntracellularInteraction(
    particle: Particle,
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

      const targetPosition = transportProtein.getSitePosition( 'atp' );
      const { startPosition, checkpoints } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
      particle.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, 'atp', startPosition, checkpoints, targetPosition );
      return true;
    }

    return false;
  }

  /**
   * Checks if a potassium ion can interact with the sodium-potassium pump from the extracellular side.
   * Updates particle mode to move towards the pump if an interaction is possible.
   *
   * @returns true if an interaction occurred.
   */
  private handleSodiumPotassiumPumpPotassiumExtracellularInteraction(
    particle: Particle,
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
        const targetPosition = transportProtein.getSitePosition( site );
        const { startPosition, checkpoints } = MoveToTargetMode.createMovementPositions( particle, targetPosition, true );
        particle.mode = new MoveToSodiumPotassiumPumpMode( slot, transportProtein, site, startPosition, checkpoints, targetPosition );
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