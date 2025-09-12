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
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';

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
import UserControlledMode from './particleModes/UserControlledMode.js';
import UserOverMode from './particleModes/UserOverMode.js';
import WaitingInSodiumGlucoseCotransporterMode from './particleModes/WaitingInSodiumGlucoseCotransporterMode.js';
import WaitingInSodiumPotassiumPumpMode from './particleModes/WaitingInSodiumPotassiumPumpMode.js';
import RandomWalkUtils from './RandomWalkUtils.js';
import Slot from './Slot.js';
import type Solute from './Solute.js';
import { ParticleType } from './SoluteType.js';

// The amount of time that must pass before a particle can cross the membrane again.
// Does not apply to passive diffusion of gasses (oxygen and carbon dioxide).
// TODO: Move this to constants! It is duplicated, see https://github.com/phetsims/membrane-transport/issues/467
const CROSSING_COOLDOWN = 10;

// The radius of the circle around the center of a transport protein where a particle will be captured so
// we can decide how it should interact with the transport protein.
// The extra capture radius was added so that all particles can be captured. If the capture radius is less than
// half the height of a particle, it will never be captured.
// It is an observable Property because it was useful to change at runtime for debugging.
export const CAPTURE_RADIUS_PROPERTY = new NumberProperty( MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 * 4 );

const GLUCOSE_FADE_TIME = 10; // in seconds, how long it takes for glucose to fade out if glucose absorption is enabled
const ADP_FADE_TIME = 10; // in seconds
const PHOSPHATE_FADE_TIME = 5; // in seconds

// How long a free phosphate particle can exist before it begins to absorb.
const PHOSPHATE_TIME_BEFORE_ABSORPTION = 3;

// When a ligand is bound to a protein, it does not have a slot.
export type ParticleModeWithSlot = BaseParticleMode & { slot: Slot };

export default abstract class Particle {

  public mode: BaseParticleMode;

  // Size of the solute in model coordinates.
  public readonly dimension: Dimension2;

  // Some particles will fade out over time before removal to indicate absorption and metabolism.
  // See updateAbsorption().
  public opacity = 1;

  // Keep track of how long ago the particle crossed the membrane, to show a highlight when it crosses.
  public timeSinceCrossedMembrane = Number.POSITIVE_INFINITY;

  protected constructor(
    public readonly position: Vector2,
    public readonly type: ParticleType,
    public readonly model: PhetioObject // For serialization
  ) {
    const lookup = getParticleViewDimensions()[ type ];

    const width = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaX( lookup.width * MembraneTransportConstants.OVERALL_ARTWORK_SCALE );
    const height = Math.abs( MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaY( lookup.height * MembraneTransportConstants.OVERALL_ARTWORK_SCALE ) );

    this.dimension = new Dimension2( width, height );

    affirm( !isNaN( this.dimension.width ), 'dimension.width should not be NaN' );
    affirm( !isNaN( this.dimension.height ), 'dimension.height should not be NaN' );
    affirm( this.dimension.width > 0, 'dimension.width should be greater than 0' );
    affirm( this.dimension.height > 0, 'dimension.height should be greater than 0' );
    affirm( this.dimension.height / 2 < CAPTURE_RADIUS_PROPERTY.value, 'The capture radius is too small for interaction with membrane.' );

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
      RandomWalkUtils.sampleValueHowLongToGoStraight(),
      timeElapsedSinceMembraneCrossing
    );
  }

  /**
   * Release this particle from a protein. Usually from user interruption or model clear.
   * The particle is shifted vertically to a y position to move away from the membrane, and then it starts a random walk.
   */
  public releaseFromInteraction( y: number ): void {
    this.position.y = y;
    this.startRandomWalk();
  }

  /**
   * Begin a random walk.
   */
  public startRandomWalk(): void {

    // Start in random walk mode with random directions.
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
   * Update the particle. Most particle behavior is implemented by the particle's current mode.
   */
  public step( dt: number, model: MembraneTransportModel ): void {

    this.timeSinceCrossedMembrane += dt;

    const isOutsideCell = this.position.y > 0;

    // Handle opacity changes and check if the particle was removed (absorbed)
    const absorbed = this.updateAbsorption( dt, model.removeSolute.bind( model ) );

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
   * @param removeSolute - Handles removal of the particle from the model.
   * @returns true if the particle was removed, false otherwise
   */
  private updateAbsorption( dt: number, removeSolute: ( solute: Solute ) => void ): boolean {

    // Incorporate dt into opacity deltas for consistent behavior on varying frame rates
    const fadeRateGlucose = dt / GLUCOSE_FADE_TIME;
    const fadeRatePhosphate = dt / PHOSPHATE_FADE_TIME;
    const fadeRateAdp = dt / ADP_FADE_TIME;

    if ( this.type === 'glucose' ) {

      // If glucose metabolism is enabled, glucose inside the cell will fade out over time.
      if ( this.position.y < MembraneTransportConstants.MEMBRANE_BOUNDS.minY && MembraneTransportPreferences.instance.glucoseMetabolismProperty.value ) {
        this.opacity -= fadeRateGlucose;
        if ( this.opacity <= 0 ) {
          removeSolute( this as unknown as Solute );
          return true; // Particle removed
        }
      }
      else {

        // It is important to reset the opacity if the preferences Property changes.
        this.opacity = 1;
      }
    }

    // Free phosphate molecules move normally for a while, then are absorbed
    if ( this.type === 'phosphate' && this.mode instanceof RandomWalkMode && this.mode.timeElapsedSinceMembraneCrossing > PHOSPHATE_TIME_BEFORE_ABSORPTION ) {
      this.opacity -= fadeRatePhosphate;
      if ( this.opacity <= 0 ) {
        removeSolute( this as unknown as Solute );
        return true; // Particle removed
      }
    }

    // Free ADP molecules move normally for a while, then are absorbed
    if ( this.type === 'adp' && this.mode instanceof RandomWalkMode ) {
      this.opacity -= fadeRateAdp;
      if ( this.opacity <= 0 ) {
        removeSolute( this as unknown as Solute );
        return true; // Particle removed
      }
    }

    return false; // particle not absorbed
  }

  /**
   * Returns the bounds of this particle in model coordinates, offset by the current position.
   */
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

  public static stateToMode( model: MembraneTransportModel, state: Record<string, IntentionalAny> ): BaseParticleMode {
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