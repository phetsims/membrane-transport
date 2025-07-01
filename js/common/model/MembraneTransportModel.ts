// Copyright 2024-2025, University of Colorado Boulder

/**
 * The main model for Membrane Transport. This manages the solutes, membrane channels, and methods for moving them
 * and counting them.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import arrayRemove from '../../../../phet-core/js/arrayRemove.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import type { PhetioState } from '../../../../tandem/js/phet-io-types.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import GetSetButtonsIO from '../../../../tandem/js/types/GetSetButtonsIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ObjectLiteralIO, { ObjectIOState } from '../../../../tandem/js/types/ObjectLiteralIO.js';
import ReferenceArrayIO from '../../../../tandem/js/types/ReferenceArrayIO.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFeatureSet, { getFeatureSetHasLigands, getFeatureSetHasVoltages, getFeatureSetSelectableSoluteTypes, getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import Particle, { ParticleModeWithSlot } from './Particle.js';
import UserControlledMode from './particleModes/UserControlledMode.js';
import createTransportProtein from './proteins/createTransportProtein.js';
import TransportProtein from './proteins/TransportProtein.js';
import { TransportProteinTypeValues } from './proteins/TransportProteinType.js';
import Slot from './Slot.js';
import SoluteType, { LigandType, ParticleType, SoluteControlSolutes } from './SoluteType.js';

type SelfOptions = EmptySelfOptions;

type MembraneTransportModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

// For the solute bar charts, keep track of how much solute has crossed at which time, so that we can keep a rolling
// average over a given time window
export type FluxEntry = {
  soluteType: SoluteType;
  time: number;
  direction: 'inward' | 'outward';
};

export const SLOT_COUNT = 7;
const SLOT_MAX_X = 84;
const SLOT_SPACING = ( SLOT_MAX_X * 2 ) / ( SLOT_COUNT - 1 );
const SLOT_POSITIONS: number[] = [];
for ( let i = 0; i < SLOT_COUNT; i++ ) {
  SLOT_POSITIONS.push( i * SLOT_SPACING - SLOT_MAX_X );
}

// “Hollywood” bias parameters for passive membrane transport.
//
//  With only a small number of particles on-screen, pure Brownian motion produces large, counter-intuitive fluctuations.
//  The two knobs below let us probabilistically veto hops that go *against* the concentration gradient so
//  the macroscopic behavior students see is “downhill overall, uphill leaks still possible”.
//
//  BIAS_THRESHOLD (0–1) Minimum fractional difference between concentrations before *any* bias is considered.
//      0 - always consider bias.
//      0.10 - need ≥10 % difference to start biasing.
//      1 - bias is never applied (pure diffusion).
//
//  GRADIENT_BIAS_STRENGTH (0–1) Probability of vetoing moves against the gradient, once we reach the BIAS_THRESHOLD.
//      0 - No bias even past the threshold.
//      0.5 - half of moves against the gradient are blocked.
//      1 - All moves against the gradient are blocked.
const BIAS_THRESHOLD = 0.05;
const GRADIENT_BIAS_STRENGTH = 0.4;

export default class MembraneTransportModel extends PhetioObject {

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // For Description, keep track of important quantities.

  // One NumberProperty for the count of each type of solute, populated in the constructor
  // Note that not all screens have all solute types. Use getFeatureSetSoluteTypes to get the list of solute types
  public readonly outsideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;
  public readonly insideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;
  public readonly insideSoluteTypesCountProperty = new NumberProperty( 0 );
  public readonly outsideSoluteTypesCountProperty = new NumberProperty( 0 );

  public readonly transportProteinCountProperty = new NumberProperty( 0 );
  public readonly transportProteinTypesCountProperty = new NumberProperty( 0 );

  // True when the model has any solutes inside or outside the membrane.
  public readonly hasAnySolutesProperty = new BooleanProperty( false );

  public readonly soluteProperty: StringUnionProperty<SoluteControlSolutes>;

  public readonly chargesVisibleProperty: Property<boolean>;
  public readonly membranePotentialProperty: Property<( -70 ) | -50 | 30>;

  public readonly ligandUnboundDueToNaturalCausesEmitter = new Emitter<[ Particle<LigandType> ]>( {
    parameters: [ { valueType: Particle } ]
  } );

  public readonly solutes: Particle<SoluteType>[] = [];

  // On screens that support ligands, the ligands are eagerly created and shown/hidden based on a Property. They are not cleared on reset
  public readonly ligands: Particle<LigandType>[] = [];

  private readonly resetEmitter = new Emitter();

  // The flux entries are used to track the recent flux of solutes through the membrane.
  public readonly fluxEntries: FluxEntry[] = [];

  // Total elapsed time in seconds since the simulation started.
  public time = 0;

  public readonly areLigandsAddedProperty: BooleanProperty;

  public readonly membraneSlots: Slot[];
  public readonly soluteCrossedMembraneEmitter = new Emitter<[ Particle<IntentionalAny>, 'outward' | 'inward' ]>( {
    parameters: [
      { valueType: Particle },
      { validValues: [ 'outward', 'inward' ] }
    ]
  } );

  // Updated lazily in step(), by checking the state of each ligand
  public readonly isUserDraggingLigandProperty = new BooleanProperty( false );

  public readonly crossingHighlightsEnabledProperty: Property<boolean>;
  public readonly crossingSoundsEnabledProperty: Property<boolean>;

  public constructor(
    public readonly featureSet: MembraneTransportFeatureSet,
    providedOptions: MembraneTransportModelOptions ) {

    const options = optionize<MembraneTransportModelOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioType: MembraneTransportModel.MembraneTransportModelIO,
      phetioState: true,
      phetioFeatured: true
    }, providedOptions );

    super( options );

    const parentTandem = featureSet === 'simpleDiffusion' ? Tandem.OPT_OUT : options.tandem.createTandem( 'membraneSlots' );
    const slotsTandem = parentTandem.createGroupTandem( 'slot' );
    this.membraneSlots = SLOT_POSITIONS.map( position => new Slot( this, position, slotsTandem.createNextTandem() ) );

    this.soluteProperty = new StringUnionProperty<SoluteControlSolutes>( 'oxygen', {
      validValues: getFeatureSetSelectableSoluteTypes( this.featureSet ),
      tandem: providedOptions.tandem.createTandem( 'soluteProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Currently selected solute'
    } );
    this.resetEmitter.addListener( () => this.soluteProperty.reset() );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      validValues: [ TimeSpeed.NORMAL, TimeSpeed.SLOW ],
      tandem: providedOptions.tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.timeSpeedProperty.reset() );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.isPlayingProperty.reset() );

    this.chargesVisibleProperty = new BooleanProperty( false, {
      tandem: getFeatureSetHasVoltages( this.featureSet ) ? providedOptions.tandem.createTandem( 'chargesVisibleProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.chargesVisibleProperty.reset() );

    this.membranePotentialProperty = new Property<( -70 ) | -50 | 30>( -70, {
      tandem: getFeatureSetHasVoltages( this.featureSet ) ? providedOptions.tandem.createTandem( 'membranePotentialProperty' ) : Tandem.OPT_OUT,
      validValues: [ -70, -50, 30 ],
      units: 'mV',
      phetioFeatured: true,
      phetioValueType: NumberIO
    } );
    this.resetEmitter.addListener( () => this.membranePotentialProperty.reset() );

    this.areLigandsAddedProperty = new BooleanProperty( false, {
      tandem: getFeatureSetHasLigands( featureSet ) ? providedOptions.tandem.createTandem( 'areLigandsAddedProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.areLigandsAddedProperty.reset() );

    this.crossingHighlightsEnabledProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'crossingHighlightsEnabledProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Whether to visually highlight the solute that just crossed the membrane'
    } );
    this.resetEmitter.addListener( () => this.crossingHighlightsEnabledProperty.reset() );

    this.crossingSoundsEnabledProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'crossingSoundsEnabledProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Whether to play sound effects when particles cross the membrane'
    } );
    this.resetEmitter.addListener( () => this.crossingSoundsEnabledProperty.reset() );

    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
    } );

    // statically preallocate the ligands, so LigandNodes can be created for them and phet-io instrumented on startup
    // areLigandsAddedProperty controls whether they interact and are displayed
    if ( getFeatureSetHasLigands( featureSet ) ) {
      this.addParticles( 'triangleLigand', 'outside', MembraneTransportConstants.LIGAND_COUNT, this.ligands );
      this.addParticles( 'starLigand', 'outside', MembraneTransportConstants.LIGAND_COUNT, this.ligands );
    }

    this.resetEmitter.addListener( () => {
      this.solutes.length = 0;

      this.membraneSlots.forEach( slot => {
        slot.reset();
      } );
    } );

    this.membraneSlots.forEach( slot => slot.transportProteinProperty.link( () => this.updateTransportProteinCounts() ) );
  }

  /**
   * Add a solute that will enter from a random location along the edge of the observation window.
   */
  public addSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    this.addParticles( soluteType, location, count, this.solutes );
  }

  public addParticles( soluteType: ParticleType, location: 'inside' | 'outside', count: number, soluteArray: Particle<SoluteType | LigandType>[] ): void {
    for ( let i = 0; i < count; i++ ) {
      const x = dotRandom.nextDoubleBetween( MembraneTransportConstants.INSIDE_CELL_BOUNDS.minX, MembraneTransportConstants.INSIDE_CELL_BOUNDS.maxX );
      const y = location === 'inside' ? MembraneTransportConstants.INSIDE_CELL_BOUNDS.minY : MembraneTransportConstants.OUTSIDE_CELL_BOUNDS.maxY;
      soluteArray.push( new Particle( new Vector2( x, y ), soluteType, this ) );
    }
    this.updateSoluteCounts();
  }

  public addSolute( particle: Particle<IntentionalAny> ): void {
    this.solutes.push( particle );
    this.updateSoluteCounts();
  }

  public removeSolute( particle: Particle<IntentionalAny> ): void {
    this.solutes.splice( this.solutes.indexOf( particle ), 1 );
    this.updateSoluteCounts();
  }

  public removeSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {

    const removableSolutes = this.solutes.filter( solute =>
      solute.type === soluteType &&
      ( location === 'inside' ? solute.position.y < 0 : solute.position.y >= 0 )
    );

    // So that solutes are randomly removed instead of removing the oldest ones.
    const shuffledRemovables = dotRandom.shuffle( removableSolutes );

    for ( let i = 0; i < count; i++ ) {
      const index = this.solutes.indexOf( shuffledRemovables[ i ] );

      affirm( index >= 0, 'Solute not found in solutes array' );
      this.solutes.splice( index, 1 );
    }

    this.updateSoluteCounts();
  }

  public clear(): void {

    // Clear all solutes from active proteins
    this.getFilledSlots().forEach( slot => {
      const transportProtein = slot.transportProteinProperty.value;
      affirm( transportProtein, 'Transport protein should be defined for a filled slot.' );
      transportProtein.clear( slot );
    } );

    this.solutes.length = 0;
    this.updateSoluteCounts();
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.resetEmitter.emit();
    this.updateSoluteCounts();
  }

  /**
   * Steps the simulation forward by dt seconds.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {

    if ( this.isPlayingProperty.value ) {

      this.time += dt;

      dt *= this.getTimeSpeedFactor();

      // capture the initial y value of each solute (instead of tracking each time a solute's y value is changed.)
      const soluteInitialYValues = new Map( this.solutes.map( solute => [ solute, solute.position.y ] ) );

      this.solutes.forEach( solute => solute.step( dt, this ) );
      if ( this.areLigandsAddedProperty.value ) {
        this.ligands.forEach( ligand => ligand.step( dt, this ) );
      }
      this.membraneSlots.forEach( slot => {
        if ( slot.transportProteinProperty.value ) {
          slot.transportProteinProperty.value.step( dt );
        }
      } );

      this.stepFlux( dt, soluteInitialYValues );
    }

    this.updateSoluteCounts();

    this.isUserDraggingLigandProperty.value = this.ligands.filter( ligand => ligand.mode instanceof UserControlledMode ).length > 0;

  }

  private stepFlux( dt: number, soluteInitialYValues: Map<Particle<SoluteType>, number> ): void {

    // Prune any recentSoluteFlux that is more than 1000ms old.
    const staleEntries = this.fluxEntries.filter( fluxEntry => this.time - fluxEntry.time > 1 );
    staleEntries.forEach( fluxEntry => arrayRemove( this.fluxEntries, fluxEntry ) );

    // track which solutes changed sign of y value. Do this after pruning, to speed up the pruning slightly
    this.solutes.forEach( solute => {
      if ( soluteInitialYValues.has( solute ) &&

           // check for a change in sign
           soluteInitialYValues.get( solute )! * solute.position.y < 0 ) {
        this.fluxEntries.push( {
          soluteType: solute.type,
          time: this.time,
          direction: solute.position.y < 0 ? 'inward' : 'outward'
        } );
      }
    } );
  }

  public updateSoluteCounts(): void {

    // Update the solute counts after the solutes have moved
    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ].value = this.countSolutes( soluteType, 'outside' );
      this.insideSoluteCountProperties[ soluteType ].value = this.countSolutes( soluteType, 'inside' );
    } );

    // Count the number of different types of solute outside:
    let outsideNumberOfTypes = 0;
    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      if ( this.outsideSoluteCountProperties[ soluteType ].value > 0 ) {
        outsideNumberOfTypes++;
      }
    } );

    this.outsideSoluteTypesCountProperty.value = outsideNumberOfTypes;

    // Count the number of different types of solute inside:
    let insideNumberOfTypes = 0;
    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      if ( this.insideSoluteCountProperties[ soluteType ].value > 0 ) {
        insideNumberOfTypes++;
      }
    } );

    this.insideSoluteTypesCountProperty.value = insideNumberOfTypes;

    this.hasAnySolutesProperty.value = this.outsideSoluteTypesCountProperty.value > 0 || this.insideSoluteTypesCountProperty.value > 0;
  }

  /**
   * Returns a signed gradient value for the specified solute type. Value is normalized to be between -1 and 1.
   * If the value is positive, there is a higher concentration inside the cell.
   * If the value is negative, there is a higher concentration outside the cell.
   */
  public getSignedGradient( soluteType: SoluteType ): number {
    const insideCount = this.countSolutes( soluteType, 'inside' );
    const outsideCount = this.countSolutes( soluteType, 'outside' );
    const totalCount = insideCount + outsideCount;
    return totalCount === 0 ? 0 : ( insideCount - outsideCount ) / totalCount;
  }

  /**
   * See documentation for BIAS_THRESHOLD and GRADIENT_BIAS_STRENGTH.
   *
   * Stochastic check to see if a solute can cross the membrane, based on the gradient of the specified solute type.
   * This creates a "hollywood" bias so that crossings are more likely to occur in the direction of lower concentration.
   *
   * This is used for passive diffusion and passive transport proteins.
   */
  public checkGradientForCrossing( soluteType: SoluteType, location: 'outside' | 'inside' ): boolean {
    const gradient = this.getSignedGradient( soluteType );
    const movingAgainstGradient = ( location === 'outside' && gradient > 0 ) || // higher inside
                                  ( location === 'inside' && gradient < 0 ); // higher outside

    // If the gradiant is small, allow crossing without any bias.
    let allowCrossing = true;

    // If the gradient is large enough, stochastic veto crossing against the gradient.
    const absoluteGradient = Math.abs( gradient );
    if ( movingAgainstGradient && absoluteGradient > BIAS_THRESHOLD ) {
      allowCrossing = dotRandom.nextDouble() > GRADIENT_BIAS_STRENGTH;
    }

    return allowCrossing;
  }

  /**
   * Update the transport count based on the number of filled slots.
   */
  private updateTransportProteinCounts(): void {

    const filledSlots = this.getFilledSlots();
    this.transportProteinCountProperty.value = filledSlots.length;

    let proteinTypesCount = 0;
    TransportProteinTypeValues.forEach( type => {
      if ( filledSlots.some( slot => slot.transportProteinType === type ) ) {
        proteinTypesCount++;
      }
    } );
    this.transportProteinTypesCountProperty.value = proteinTypesCount;
  }

  public getFilledSlots(): Slot[] {
    return this.membraneSlots.filter( slot => slot.isFilled() );
  }


  /**
   * Count the number of solutes inside or outside the cell membrane.
   */
  public countSolutes( soluteType: SoluteType, location: 'inside' | 'outside' ): number {
    return this.solutes.filter( solute => {

      // Compare against the y value because a solute is still considered 'inside' until it full passes through
      // the middle of the membrane.
      return solute.type === soluteType && ( location === 'inside' ? solute.position.y < 0 : solute.position.y >= 0 );
    } ).length;
  }

  public removeParticle( particle: Particle<IntentionalAny> ): void {
    this.solutes.splice( this.solutes.indexOf( particle ), 1 );
  }

  public getLeftmostEmptySlot(): Slot | null {
    return this.membraneSlots.find( slot => !slot.isFilled() ) || null;
  }

  public getMiddleSlot(): Slot {
    return this.membraneSlots[ Math.floor( this.membraneSlots.length / 2 ) ];
  }

  /**
   * If a slot already has a solute traversing it, or moving to it, then it is "reserved" and cannot accommodate a second solute.
   * This does not check for ligands.
   *
   * @param slot - The slot to check
   * @param predicate - A predicate function to filter the solutes. By default, it returns true for all solutes.
   */
  public isTransportProteinSoluteFree(
    slot: Slot,
    predicate: ( solute: Particle<SoluteType> ) => boolean = ( () => true )
  ): boolean {

    // Check if any Particle mode has this slot and matches the predicate
    return !this.solutes.some( solute => ( solute.mode as ParticleModeWithSlot ).slot === slot && predicate( solute ) );
  }

  public getTimeSpeedFactor(): number {
    return this.timeSpeedProperty.value === TimeSpeed.NORMAL ? 1 : 0.5;
  }

  public getSlotForTransportProtein( transportProtein: TransportProtein ): Slot | null {
    return this.membraneSlots.find( slot => slot.transportProteinProperty.value === transportProtein ) || null;
  }

  /**
   * Only these particle types can move through passive transport proteins.
   */
  public static canSoluteTypeMoveThroughPassiveTransport( particleType: ParticleType ): boolean {
    return particleType === 'oxygen' ||
           particleType === 'carbonDioxide' ||
           particleType === 'sodiumIon' ||
           particleType === 'potassiumIon';
  }

  /**
   * Individual Solute instances are not PhET-iO Instrumented. Instead, the container that contains the Solutes
   * calls ParticleIO.toStateObject to serialize the Solute instances. MembraneTransportModel uses reference type serialization
   * as a composite of the Solutes, which use data type serialization.
   *
   * Please see https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   * for more information on the different serialization types.
   */
  public static readonly ParticleIO = new IOType<Particle<ParticleType>, ParticleStateObject>( 'ParticleIO', {
    valueType: Particle,
    stateSchema: {
      position: Vector2.Vector2IO,
      type: StringIO,
      mode: ObjectLiteralIO,

      // Necessary in order to get information from the model about the slots
      model: ReferenceIO( IOType.ObjectIO ), // Cannot reference MembraneTransportModel.MembraneTransportModelIO because it creates a circular dependency
      opacity: NumberIO
    },
    toStateObject: ( particle: Particle<IntentionalAny> ) => {
      return {
        position: particle.position,
        type: particle.type,
        mode: particle.mode.toStateObject(),
        model: ReferenceIO( IOType.ObjectIO ).toStateObject( particle.model ),
        opacity: particle.opacity
      };
    },
    fromStateObject: ( stateObject: ParticleStateObject ) => {

      const model = ReferenceIO( IOType.ObjectIO ).fromStateObject( stateObject.model ) as MembraneTransportModel;

      const particle = new Particle(
        new Vector2( stateObject.position.x, stateObject.position.y ),
        stateObject.type,
        model
      );
      particle.opacity = stateObject.opacity;
      particle.mode = Particle.stateToMode( model, stateObject.mode );
      return particle;
    }
  } );

  /**
   * For serialization, the MembraneTransportModel uses reference type serialization, following the pattern in Field.FieldIO.
   * Please see that documentation for more information.
   */
  public static readonly MembraneTransportModelIO = new IOType<MembraneTransportModel, MembraneTransportModelStateObject>( 'MembraneTransportModelIO', {
    documentation: 'IOType for MembraneTransportModel. Note that ligands are preallocated and stored in the state, if supported.',
    supertype: GetSetButtonsIO,
    valueType: MembraneTransportModel,
    stateSchema: {
      solutes: ReferenceArrayIO( MembraneTransportModel.ParticleIO ),
      ligands: ReferenceArrayIO( MembraneTransportModel.ParticleIO ),

      // In consultation with Michael K, we determined that ObjectLiteralIO is appropriate here, despite not being trackable
      // by migration compatibility checkers.
      slots: ArrayIO( NullableIO( ObjectLiteralIO ) ),
      fluxEntries: ReferenceArrayIO( ObjectLiteralIO ),
      time: NumberIO
    },
    toStateObject: ( model: MembraneTransportModel ): MembraneTransportModelStateObject => {
      const slotObjects = model.membraneSlots.map( slot => {
        if ( slot.isFilled() ) {
          const transportProtein = slot.transportProteinProperty.value!;
          return {
            type: slot.transportProteinType,
            position: transportProtein.position,
            state: transportProtein.stateProperty.value,
            timeSinceStateTransition: transportProtein.timeSinceStateTransition
          };
        }
        else {
          return null; // If the slot is not filled, we return null
        }
      } );

      return {
        time: model.time,
        fluxEntries: ReferenceArrayIO( ObjectLiteralIO ).toStateObject( model.fluxEntries ),
        solutes: ReferenceArrayIO( MembraneTransportModel.ParticleIO ).toStateObject( model.solutes ),
        ligands: ReferenceArrayIO( MembraneTransportModel.ParticleIO ).toStateObject( model.ligands ),
        slots: slotObjects
      };
    },
    applyState: ( model: MembraneTransportModel, state: MembraneTransportModelStateObject ) => {

      // Must set protein state first since the particles will refer to them.
      state.slots.forEach( ( slotObject, index ) => {
        if ( slotObject ) {
          const transportProtein = createTransportProtein(
            model,
            slotObject.type,
            slotObject.position
          );
          transportProtein.stateProperty.value = slotObject.state;
          transportProtein.timeSinceStateTransition = slotObject.timeSinceStateTransition;

          model.membraneSlots[ index ].transportProteinProperty.value = transportProtein;
        }
        else {

          // If the slot is not filled, we set the transport protein to null
          model.membraneSlots[ index ].transportProteinProperty.value = null;
        }
      } );

      ReferenceArrayIO( MembraneTransportModel.ParticleIO ).applyState( model.solutes, state.solutes );

      ReferenceArrayIO( ObjectLiteralIO ).applyState( model.fluxEntries, state.fluxEntries );
      model.time = state.time;

      // The ligands are statically preallocated, so we must mutate the pre-allocated ones
      state.ligands.forEach( ( ligandState: IntentionalAny, index: IntentionalAny ) => {
        const ligand = MembraneTransportModel.ParticleIO.fromStateObject( ligandState );
        model.ligands[ index ].position.x = ligand.position.x;
        model.ligands[ index ].position.y = ligand.position.y;
        model.ligands[ index ].mode = ligand.mode;
      } );

      model.updateSoluteCounts();
    },
    methods: {
      getValue: {
        returnType: ObjectLiteralIO,
        parameterTypes: [],
        implementation: function( this: MembraneTransportModel ) {
          return phet.phetio.phetioEngine.phetioStateEngine.getState( this );
        },
        documentation: 'Gets the current value of the MembraneTransportModel on this screen.'
      },
      getValidationError: {
        returnType: NullableIO( StringIO ),
        parameterTypes: [ ObjectLiteralIO ],
        implementation: function( this: MembraneTransportModel, value ) {

          // check if the specified data corresponds to this.tandemID. To avoid pasting from one screen to another
          const keys = Array.from( Object.keys( value ) );

          for ( let i = 0; i < keys.length; i++ ) {
            const key = keys[ i ];
            if ( !key.startsWith( this.phetioID ) ) {
              return 'key had incorrect prefix. Expected: ' + this.phetioID + ' but got: ' + key;
            }
          }
          return null;
        },
        documentation: 'Checks to see if a proposed value is valid. Returns the first validation error, or null if the value is valid.'
      },
      setValue: {
        returnType: VoidIO,
        parameterTypes: [ ObjectLiteralIO ],
        documentation: 'Sets the model state that was created on this screen. Trying to set state from another screen results in an error.',
        implementation: function( this: MembraneTransportModel, state: PhetioState ) {
          phet.phetio.phetioEngine.phetioStateEngine.setState( state, this.tandem );
        }
      }
    }
  } );
}

type MembraneTransportModelStateObject = {
  time: number;

  fluxEntries: ObjectIOState[];
  solutes: ParticleStateObject[];
  ligands: ParticleStateObject[];
  slots: ( ObjectIOState | null )[];
};

export type ParticleStateObject = {
  position: Vector2;
  type: SoluteType;
  mode: Record<string, unknown>;
  model: ReferenceIOState;
  opacity: number;
};


membraneTransport.register( 'MembraneTransportModel', MembraneTransportModel );