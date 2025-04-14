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
import IOType from '../../../../tandem/js/types/IOType.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import MembraneTransportModel from './MembraneTransportModel.js';
import LigandGatedChannel from './proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from './proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from './proteins/SodiumPotassiumPump.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinType from './proteins/TransportProteinType.js';
import Slot from './Slot.js';
import SoluteType, { LigandType, ParticleType } from './SoluteType.js';

// TODO (design) can this be deleted? Brett will meet with content experts before we decide.
const ABSORB_GLUCOSE = false;

// Typical speed for movement
const typicalSpeed = 30;

// The amount of time that must pass before a particle can cross the membrane again.
const CROSSING_COOLDOWN = 0.5;

// The radius of the circle around the center of a transport protein where a particle will be captured so
// we can decide how it should interact with the transport protein.
// The extra capture radius was added so that all particles can be captured. If the capture radius is less than
// half the height of a particle, it will never be captured.
export const CAPTURE_RADIUS_PROPERTY = new NumberProperty( MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 * 2.5 );

// Epsilon value for nudging particle into bounds after teleporting, so that it doesn't instantly teleport back to the other side
const NUDGE_EPSILON = 1E-6;

type RandomWalkMode = {
  type: 'randomWalk';
  currentDirection: Vector2;
  timeUntilNextDirection: number;
  slot: null;

  // The time that has elapsed since the particle crossed the membrane for this random walk.
  timeElapsedSinceMembraneCrossing: number;
};

type BoundMode = {
  type: 'ligandBound';
  ligandGatedChannel: LigandGatedChannel;
  slot: null;
};

type MoveToCenterOfTransportProteinMode = {
  type: 'moveToCenterOfChannel';
  slot: Slot;
};

type MoveToSodiumGlucoseTransporterMode = {
  type: 'moveToSodiumGlucoseCotransporter';
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
  type: 'movingThroughTransportProtein';
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

  public constructor(
    public readonly position: Vector2,
    public readonly type: T
  ) {
    const lookup = MembraneTransportConstants.getParticleViewDimensions()[ type ];

    const width = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaX( lookup.width * MembraneTransportConstants.PARTICLE_ARTWORK_SCALE );
    const height = Math.abs( MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaY( lookup.height * MembraneTransportConstants.PARTICLE_ARTWORK_SCALE ) );

    this.dimension = new Dimension2( width, height );

    assert && assert( !isNaN( this.dimension.width ), 'dimension.width should not be NaN' );
    assert && assert( !isNaN( this.dimension.height ), 'dimension.height should not be NaN' );
    assert && assert( this.dimension.width > 0, 'dimension.width should be greater than 0' );
    assert && assert( this.dimension.height > 0, 'dimension.height should be greater than 0' );
    assert && assert( this.dimension.height / 2 < CAPTURE_RADIUS_PROPERTY.value, 'The capture radius is too small for interaction with membrane.' );

    // Start in random walk mode with random directions.
    this.mode = this.createRandomWalkMode( true );
  }

  /**
   * @param allowImmediateInteraction - Some particles should be allowed to interact immediately, while others should not.
   */
  public createRandomWalkMode( allowImmediateInteraction: boolean ): RandomWalkMode {

    const timeElapsedSinceMembraneCrossing = allowImmediateInteraction ? CROSSING_COOLDOWN : 0;
    return {
      type: 'randomWalk',
      currentDirection: Particle.createRandomUnitVector(),
      timeUntilNextDirection: sampleValueHowLongToGoStraight(),
      slot: null,
      timeElapsedSinceMembraneCrossing: timeElapsedSinceMembraneCrossing
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
   * This is a finite-state-machine-like implementation of the particle's behavior. We use a lightweight approach,
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

        // Gradual fade over time after moving inside the cell.
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

    // Free phosphate molecules move normally for a while, then are absorbed
    if ( this.type === 'adp' && this.mode.type === 'randomWalk' ) {
      this.opacity -= 0.001;
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
      // Update the position because the binding site changes when the channel opens.
      const bindingPositionOffset = this.mode.ligandGatedChannel.getBindingPositionOffset();
      const bindingPosition = new Vector2( this.mode.ligandGatedChannel.slot.position, 0 ).plus( bindingPositionOffset );
      this.position.set( bindingPosition );
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
    else if ( this.mode.type === 'moveToSodiumGlucoseCotransporter' ) {

      const currentPosition = this.position.copy();

      const offset = SodiumGlucoseCotransporter.getSitePositionOffset( this.mode.site );

      const targetPosition = new Vector2( this.mode.slot.position + offset.x, offset.y );

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

      const offset = SodiumPotassiumPump.getSitePositionOffset( this.mode.site );

      const targetPosition = new Vector2( this.mode.slot.position, 0 ).plus( offset );

      const vector = targetPosition.minus( currentPosition );
      const direction = vector.normalized();

      // Move toward the target position at the typicalSpeed
      const maxStepSize = typicalSpeed * dt;
      this.position.x += direction.x * maxStepSize;
      this.position.y += direction.y * maxStepSize;

      const sodiumPotassiumPump = this.mode.slot.transportProteinProperty.value as SodiumPotassiumPump;

      if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {

        if ( this.type === 'sodiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToInsideEmpty' ) {

          this.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site
          };

          // Set to the exact target position now that it is inside the pump.
          this.position.set( targetPosition );

          MembraneTransportSounds.sodiumLockedInToSodiumPotassiumPump( this.mode.site, sodiumPotassiumPump.getNumberOfFilledSodiumSites() );
        }
        else if ( this.type === 'atp' && sodiumPotassiumPump.stateProperty.value === 'openToInsideSodiumBound' ) {

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
        else if ( this.type === 'potassiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToOutside' ) {
          this.mode = {
            type: 'waitingInSodiumPotassiumPump',
            slot: this.mode.slot,
            site: this.mode.site
          };

          // Set to the exact target position now that it is inside the pump.
          this.position.set( targetPosition );

          MembraneTransportSounds.potassiumLockedInToSodiumPotassiumPump( this.mode.site, sodiumPotassiumPump.getNumberOfFilledPotassiumSites() );

          if ( sodiumPotassiumPump.getNumberOfFilledPotassiumSites() === 2 ) {
            sodiumPotassiumPump.openDownward();
          }
        }
      }
    }
    else if ( this.mode.type === 'waitingInSodiumPotassiumPump' && phet.chipper.queryParameters.dev ) {

      // For debugging only, so that the site positions can be adjusted
      const offset = SodiumPotassiumPump.getSitePositionOffset( this.mode.site );
      const targetPosition = new Vector2( this.mode.slot.position, 0 ).plus( offset );
      this.position.set( targetPosition );
    }
    else if ( this.mode.type === 'waitingInSodiumGlucoseTransporter' && phet.chipper.queryParameters.dev ) {

      // For debugging only, so that the site positions can be adjusted
      const offset = SodiumGlucoseCotransporter.getSitePositionOffset( this.mode.site );

      // TODO: Can getSitePosition include the slot position for us?
      const targetPosition = new Vector2( this.mode.slot.position, 0 ).plus( offset );
      this.position.set( targetPosition );
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
        const targetPositionOffset = ligandGatedChannel.getBindingPositionOffset();
        const targetPosition = new Vector2( this.mode.slot.position, 0 ).plus( targetPositionOffset );
        const maxStepSize = typicalSpeed * dt;

        // Move toward the binding position
        this.position.x += Math.sign( targetPosition.x - currentPosition.x ) * maxStepSize;
        this.position.y += Math.sign( targetPosition.y - currentPosition.y ) * maxStepSize;

        // When close enough, transition to a bound mode.
        if ( targetPosition.distance( currentPosition ) <= maxStepSize && ligandGatedChannel.isAvailableForBinding() ) {
          affirm( this.type === 'ligandA' || this.type === 'ligandB', 'ligand should be ligandA or ligandB' );
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

      this.position.y += sign * ( typicalSpeed / 5 ) * dt * dotRandom.nextDoubleBetween( 0.1, 2 );
      this.position.x += dotRandom.nextDoubleBetween( -2, 2 ) * ( typicalSpeed / 2 ) * dt;

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

        // If the particle has moved through, close
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
    const randomWalk = this.mode as RandomWalkMode;

    randomWalk.timeUntilNextDirection -= dt;
    randomWalk.timeElapsedSinceMembraneCrossing += dt;

    // Time for a new direction
    if ( randomWalk.timeUntilNextDirection <= 0 ) {
      randomWalk.currentDirection = Particle.createRandomUnitVector();
      randomWalk.timeUntilNextDirection = sampleValueHowLongToGoStraight();
    }

    // Store direction locally for modification if needed during bounce/wrap
    const direction = randomWalk.currentDirection.copy();

    const thisBounds = this.getBounds();
    const outsideOfCell = this.position.y > 0;

    for ( let i = 0; i < model.slots.length; i++ ) {
      const slot = model.slots[ i ];
      const transportProtein = slot.transportProteinProperty.value;

      // If the particle is within a certain radial distance from the center of the transport protein, it can interact
      const distance = this.position.distance( new Vector2( slot.position, 0 ) );

      // if ( transportProtein && distance < CAPTURE_RADIUS_PROPERTY.value ) {
      //   debugger;
      // }

      if ( transportProtein && distance < CAPTURE_RADIUS_PROPERTY.value && randomWalk.timeElapsedSinceMembraneCrossing > CROSSING_COOLDOWN ) {
        const interactedWithProtein = this.handleProteinInteractionDuringRandomWalk( slot, transportProtein, model, outsideOfCell );
        if ( interactedWithProtein ) {
          return;
        }
      }
    }

    if ( MembraneTransportConstants.MEMBRANE_BOUNDS.intersectsBounds( thisBounds ) ) {

      // Check for passive diffusion first, might change mode
      if ( ( this.type === 'oxygen' || this.type === 'carbonDioxide' ) && dotRandom.nextDouble() < 0.90 ) {
        this.mode = {
          type: 'passiveDiffusion',
          direction: outsideOfCell ? 'inward' : 'outward',
          slot: null
        };

        MembraneTransportSounds.gasMoleculeEnteredMembrane( this, this.mode.direction );
        return;
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
      randomWalk.currentDirection.y = direction.y;
    }

    // Move according to the potentially modified direction and speed
    this.position.x += direction.x * dt * typicalSpeed;
    this.position.y += direction.y * dt * typicalSpeed;

    // --- BEGIN HORIZONTAL WRAP ---
    const updatedBoundsAfterMove = this.getBounds(); // Bounds AFTER movement
    const boundingRegion = outsideOfCell ? MembraneTransportConstants.OUTSIDE_CELL_BOUNDS : MembraneTransportConstants.INSIDE_CELL_BOUNDS;
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
    // --- END HORIZONTAL WRAP ---

    // --- BEGIN VERTICAL BOUNCE ---
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
      randomWalk.currentDirection.y = newDirectionY;

      // Teleport to give the sense that one particle left at once coordinate and another entered at the same time
      this.position.x = dotRandom.nextDoubleBetween( boundingRegion.minX, boundingRegion.maxX );

      MembraneTransportSounds.particleBounced( this );
    }
    // --- END VERTICAL BOUNCE ---
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
          const isLigandFree = model.isTransportProteinLigandFree( slot );

          if ( isLigandFree ) {
            this.mode = { type: 'moveToLigandBindingLocation', slot: slot };
            return true;
          }
        }
      }
    }

    // Check for sodium and potassium ions interacting with leakage channels.
    const sodiumGates: TransportProteinType[] = [ 'sodiumIonLeakageChannel', 'sodiumIonLigandGatedChannel', 'sodiumIonVoltageGatedChannel' ];
    const potassiumGates: TransportProteinType[] = [ 'potassiumIonLeakageChannel', 'potassiumIonLigandGatedChannel', 'potassiumIonVoltageGatedChannel' ];

    // If the transport protein is available for transport, and the particle is the right type, move to the center of the channel.
    if ( transportProtein.isAvailableForPassiveTransport() ) {
      if ( ( this.type === 'sodiumIon' && sodiumGates.includes( slot.transportProteinType! ) ) ||
           ( this.type === 'potassiumIon' && potassiumGates.includes( slot.transportProteinType! ) ) ) {
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

      transportProtein.stateProperty.value === 'openToOutside'
    ) {

      if ( this.type === 'sodiumIon' ) {

        // Sodium ions can use left or right site
        const availableSites = transportProtein.getOpenSodiumSites();

        if ( availableSites.length > 0 ) {
          const site = dotRandom.sample( availableSites );
          this.mode = { type: 'moveToSodiumGlucoseCotransporter', slot: slot, site: site };
          return true;
        }
      }
      else if ( this.type === 'glucose' && transportProtein.isGlucoseSiteOpen() ) {

        // Glucose can only use center site
        this.mode = { type: 'moveToSodiumGlucoseCotransporter', slot: slot, site: 'center' };
        return true;
      }
    }

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
        this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: site };
        return true;
      }
    }

    if (
      this.type === 'atp' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      this.position.y < 0 && // Only approach from intracellular side
      transportProtein.stateProperty.value === 'openToInsideSodiumBound' &&
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'atp' ) ) // make sure no sodium still leaving
    ) {

      this.mode = { type: 'moveToSodiumPotassiumPump', slot: slot, site: 'phosphate' };
      return true;
    }

    if (
      this.type === 'potassiumIon' &&
      slot.transportProteinType === 'sodiumPotassiumPump' &&
      transportProtein instanceof SodiumPotassiumPump &&
      transportProtein.stateProperty.value === 'openToOutside' &&
      this.position.y > 0 && // Only approach from extracellular side
      !transportProtein.hasSolutesMovingTowardOrThroughTransportProtein( ( solute => solute.type === 'sodiumIon' ) ) // make sure no sodium still leaving
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