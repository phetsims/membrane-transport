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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import type { PhetioState } from '../../../../tandem/js/phet-io-types.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GetSetButtonsIO from '../../../../tandem/js/types/GetSetButtonsIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import ReferenceArrayIO from '../../../../tandem/js/types/ReferenceArrayIO.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFeatureSet, { getFeatureSetHasVoltages, getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportQueryParameters from '../MembraneTransportQueryParameters.js';
import Particle from './Particle.js';
import getTransportProtein from './proteins/getTransportProtein.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinType from './proteins/TransportProteinType.js';
import Slot from './Slot.js';
import SoluteType, { LigandType, ParticleType } from './SoluteType.js';

type SelfOptions = EmptySelfOptions;

type MembraneTransportModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

type FluxEntry = {
  soluteType: SoluteType;
  time: number;
  direction: 'inward' | 'outward';
};

const fluxSmoothingTimeConstant = 0.25;

export const SLOT_COUNT = 7;
const SLOT_MAX_X = 84;
const SLOT_SPACING = ( SLOT_MAX_X * 2 ) / ( SLOT_COUNT - 1 );
const SLOT_POSITIONS: number[] = [];
for ( let i = 0; i < SLOT_COUNT; i++ ) {
  SLOT_POSITIONS.push( i * SLOT_SPACING - SLOT_MAX_X );
}

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

  public readonly selectedSoluteProperty: StringUnionProperty<SoluteType>;

  public readonly isShowingMembranePotentialLabelsProperty: Property<boolean>;
  public readonly membraneVoltagePotentialProperty: Property<'-70' | '-50' | '30'>;

  public readonly solutes: Particle<SoluteType>[] = [];
  public readonly ligands: Particle<LigandType>[] = [];

  private readonly resetEmitter = new Emitter();

  // The flux entries are used to track the recent flux of solutes through the membrane.
  private readonly fluxEntries: FluxEntry[] = [];
  private time = 0;

  private soluteTypeFlux = {} as Record<SoluteType, number>;
  public readonly areLigandsAddedProperty: BooleanProperty;

  public readonly slots: Slot[];

  public constructor(
    public readonly featureSet: MembraneTransportFeatureSet,
    providedOptions: MembraneTransportModelOptions ) {

    const options = optionize<MembraneTransportModelOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioType: MembraneTransportModel.MembraneTransportModelIO,
      phetioState: true,
      phetioFeatured: true
    }, providedOptions );

    super( options );

    const parentTandem = options.tandem.createTandem( 'slots' );
    const slotsTandem = parentTandem.createGroupTandem( 'slot' );
    this.slots = SLOT_POSITIONS.map( position => new Slot( this, position, slotsTandem.createNextTandem() ) );

    this.selectedSoluteProperty = new StringUnionProperty<SoluteType>( 'oxygen', {
      validValues: getFeatureSetSoluteTypes( this.featureSet ),
      tandem: providedOptions.tandem.createTandem( 'selectedSoluteProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.selectedSoluteProperty.reset() );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: providedOptions.tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.timeSpeedProperty.reset() );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.isPlayingProperty.reset() );

    this.isShowingMembranePotentialLabelsProperty = new BooleanProperty( false, {
      tandem: getFeatureSetHasVoltages( this.featureSet ) ? providedOptions.tandem.createTandem( 'isShowingMembranePotentialLabelsProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.isShowingMembranePotentialLabelsProperty.reset() );

    this.membraneVoltagePotentialProperty = new StringUnionProperty( '-70', {
      tandem: getFeatureSetHasVoltages( this.featureSet ) ? providedOptions.tandem.createTandem( 'membraneVoltagePotentialProperty' ) : Tandem.OPT_OUT,
      validValues: [ '-70', '-50', '30' ],
      units: 'mV',
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.membraneVoltagePotentialProperty.reset() );

    this.areLigandsAddedProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'areLigandsAddedProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.areLigandsAddedProperty.reset() );

    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.soluteTypeFlux[ soluteType ] = 0;
    } );

    // Ligands are added and removed in response to the areLigandsAddedProperty so that clients can add/remove them
    // by controlling the Property.
    this.areLigandsAddedProperty.link( areLigandsAdded => {
      if ( areLigandsAdded ) {
        this.addLigands();
      }
      else {
        this.removeLigands();
      }
    } );

    if ( MembraneTransportQueryParameters.defaultSolutes ) {

      const populateInitialSolutes = () => {
        // A random sample of solutes in the solutes array
        for ( let i = 0; i < 30; i++ ) {
          this.solutes.push( new Particle( new Vector2( dotRandom.nextDoubleBetween( -50, 50 ), dotRandom.nextDoubleBetween( -50, 50 ) ), dotRandom.sample( getFeatureSetSoluteTypes( this.featureSet ) ) ) );
        }
      };

      this.resetEmitter.addListener( () => {
        this.solutes.length = 0;
        populateInitialSolutes();
      } );

      populateInitialSolutes();
    }

    this.resetEmitter.addListener( () => {
      this.solutes.length = 0;
      this.ligands.length = 0;

      this.slots.forEach( slot => {
        slot.reset();
      } );
    } );

    this.slots.forEach( slot => slot.transportProteinProperty.link( () => this.updateTransportProteinCounts() ) );
  }

  /**
   * Add a solute that will enter from a random location along the edge of the observation window.
   */
  public addSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    this.addParticles( soluteType, location, count, this.solutes );
  }

  public addLigands(): void {
    this.addParticles( 'ligandA', 'outside', MembraneTransportConstants.LIGAND_COUNT, this.ligands );
    this.addParticles( 'ligandB', 'outside', MembraneTransportConstants.LIGAND_COUNT, this.ligands );
  }

  public addParticles( soluteType: ParticleType, location: 'inside' | 'outside', count: number, soluteArray: Particle<SoluteType | LigandType>[] ): void {
    for ( let i = 0; i < count; i++ ) {
      const x = dotRandom.nextDoubleBetween( MembraneTransportConstants.INSIDE_CELL_BOUNDS.minX, MembraneTransportConstants.INSIDE_CELL_BOUNDS.maxX );
      const y = location === 'inside' ? MembraneTransportConstants.INSIDE_CELL_BOUNDS.minY : MembraneTransportConstants.OUTSIDE_CELL_BOUNDS.maxY;
      soluteArray.push( new Particle( new Vector2( x, y ), soluteType ) );
    }
  }

  public addSolute( particle: Particle<IntentionalAny> ): void {
    this.solutes.push( particle );
    this.updateSoluteCounts();
  }

  public removeSolute( particle: Particle<IntentionalAny> ): void {
    this.solutes.splice( this.solutes.indexOf( particle ), 1 );
    this.updateSoluteCounts();
  }

  /**
   * Removes all ligands (both types) from the model.
   */
  public removeLigands(): void {
    this.ligands.length = 0;
  }

  public removeSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    const cellBounds = location === 'inside' ? MembraneTransportConstants.INSIDE_CELL_BOUNDS : MembraneTransportConstants.OUTSIDE_CELL_BOUNDS;

    const removableSolutes = this.solutes.filter( solute => solute.type === soluteType && cellBounds.containsPoint( solute.position ) );

    // So that solutes are randomly removed instead of removing the oldest ones.
    const shuffledRemovables = dotRandom.shuffle( removableSolutes );

    for ( let i = 0; i < count && i < shuffledRemovables.length; i++ ) {
      const index = this.solutes.indexOf( shuffledRemovables[ i ] );
      this.solutes.splice( index, 1 );
    }
  }

  public clear(): void {
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
      this.ligands.forEach( ligand => ligand.step( dt, this ) );
      this.slots.forEach( slot => {
        if ( slot.transportProteinProperty.value ) {
          slot.transportProteinProperty.value.step( dt );
        }
      } );

      this.stepFlux( dt, soluteInitialYValues );
    }

    this.updateSoluteCounts();
  }

  private stepFlux( dt: number, soluteInitialYValues: Map<Particle<SoluteType>, number> ): void {

    // Prune any recentSoluteFlux that is more than 1000ms old.
    this.fluxEntries.slice().forEach( fluxEntry => {
      if ( this.time - fluxEntry.time > 0.1 ) {
        this.fluxEntries.splice( this.fluxEntries.indexOf( fluxEntry ), 1 );
      }
    } );

    // track which solutes changed sign of y value. Do this after pruning, to speed up the pruning slightly
    this.solutes.forEach( solute => {
      if ( soluteInitialYValues.has( solute ) &&
           soluteInitialYValues.get( solute )! * solute.position.y < 0 ) {
        this.fluxEntries.push( {
          soluteType: solute.type,
          time: this.time,
          direction: solute.position.y < 0 ? 'inward' : 'outward'
        } );
      }
    } );

    const fluxSmoothingAlpha = dt / ( fluxSmoothingTimeConstant + dt );

    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {

      const recentFlux = this.fluxEntries.filter( fluxEntry => fluxEntry.soluteType === soluteType ).reduce( ( sum, fluxEntry ) => {
        return sum + ( fluxEntry.direction === 'inward' ? 1 : -1 );
      }, 0 );

      this.soluteTypeFlux[ soluteType ] = fluxSmoothingAlpha * recentFlux + ( 1 - fluxSmoothingAlpha ) * this.soluteTypeFlux[ soluteType ];
    } );
  }

  /**
   * Sum up all of the flux history for a given solute type. Positive values indicate that the solute has passed
   * through the membrane from the outside to the inside, and negative values indicate the opposite.
   */
  public getRecentSoluteFluxWithSmoothing( soluteType: SoluteType ): number {
    return this.soluteTypeFlux[ soluteType ];
  }

  private updateSoluteCounts(): void {

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
  }

  /**
   * Update the transport count based on the number of filled slots.
   */
  private updateTransportProteinCounts(): void {
    this.transportProteinCountProperty.value = this.slots.filter( slot => slot.isFilled() ).length;
  }

  /**
   * Returns an array of transport proteins that exist in the membrane.
   */
  public getTransportProteins(): TransportProtein[] {
    const filledSlotList = this.slots.filter( slot => slot.isFilled() );
    return filledSlotList.map( slot => slot.transportProteinProperty.value! );
  }

  /**
   * Count the number of solutes inside or outside the cell membrane.
   */
  public countSolutes( soluteType: SoluteType, location: 'inside' | 'outside' ): number {
    return this.solutes.filter( solute => {

      // Compare against the y value because a solute is still considered 'inside' until it full passes through
      // the middle of the membrane.
      return solute.type === soluteType && ( location === 'inside' ? solute.position.y < 0 : solute.position.y > 0 );
    } ).length;
  }

  public removeParticle( particle: Particle<IntentionalAny> ): void {
    this.solutes.splice( this.solutes.indexOf( particle ), 1 );
  }

  public getLeftmostEmptySlot(): Slot | null {
    return this.slots.find( slot => !slot.isFilled() ) || null;
  }

  public getSlotIndex( slot: Slot ): number {
    return this.slots.indexOf( slot );
  }

  public getSlotForIndex( index: number ): Slot {
    return this.slots[ index ];
  }

  public getMiddleSlot(): Slot {
    return this.slots[ Math.floor( this.slots.length / 2 ) ];
  }

  /**
   * If a slot already has a solute traversing it, or moving to it, then it is "reserved" and cannot accommodate a second solute.
   * TODO: Document how this doesn't classify a ligand as a solute for the interaction.
   * TODO: This is preventing the sodium potassium pump from working properly.
   */
  public isTransportProteinSoluteFree( slot: Slot ): boolean {

    // Check if any Particle mode has this slot
    const isReserved = this.solutes.some( solute => solute.mode.slot === slot );
    return !isReserved;
  }

  public getTimeSpeedFactor(): number {
    return this.timeSpeedProperty.value === TimeSpeed.NORMAL ? 1 : 0.5;
  }

  public getSlotForTransportProtein( transportProtein: TransportProtein ): Slot | undefined {
    return this.slots.find( slot => slot.transportProteinProperty.value === transportProtein );
  }

  /**
   * For serialization, the MembraneTransportModel uses reference type serialization, following the pattern in Field.FieldIO.
   * Please see that documentation for more information.
   */
  public static readonly MembraneTransportModelIO = new IOType<MembraneTransportModel, IntentionalAny>( 'MembraneTransportModelIO', {
    supertype: GetSetButtonsIO,
    valueType: MembraneTransportModel,
    stateSchema: {
      solutes: ReferenceArrayIO( Particle.ParticleIO ),
      ligands: ReferenceArrayIO( Particle.ParticleIO ),
      fluxEntries: ReferenceArrayIO( ObjectLiteralIO ),
      time: NumberIO,
      soluteTypeFlux: ObjectLiteralIO
    },
    applyState: ( model: MembraneTransportModel, state: IntentionalAny ) => {
      ReferenceArrayIO( Particle.ParticleIO ).applyState( model.solutes, state.solutes );
      ReferenceArrayIO( Particle.ParticleIO ).applyState( model.ligands, state.ligands );
      ReferenceArrayIO( ObjectLiteralIO ).applyState( model.fluxEntries, state.fluxEntries );
      model.time = state.time;
      model.soluteTypeFlux = state.soluteTypeFlux;

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

type TransportProteinStateObject = {
  type: TransportProteinType;
  position: number;
  model: ReferenceIOState;
};

/**
 * Ideally this would be declared in TransportProtein.ts. However, since this creates subtypes like LigandGatedChannel, that
 * would create a circular dependency. So we declare it here.
 *
 */
export const TransportProteinIO = new IOType<TransportProtein, TransportProteinStateObject>( 'TransportProteinIO', {
  valueType: TransportProtein,
  stateSchema: {
    type: StringIO,
    position: NumberIO,

    // Necessary in order to get information from the model to the TransportProtein, such as the membrane potential
    model: ReferenceIO( MembraneTransportModel.MembraneTransportModelIO )
  },
  toStateObject: ( transportProtein: TransportProtein ): TransportProteinStateObject => {
    return {
      type: transportProtein.type,
      position: transportProtein.position,
      model: ReferenceIO( MembraneTransportModel.MembraneTransportModelIO ).toStateObject( transportProtein.model )
    };
  },
  fromStateObject: ( stateObject: TransportProteinStateObject ) => {
    return getTransportProtein(
      ReferenceIO( MembraneTransportModel.MembraneTransportModelIO ).fromStateObject( stateObject.model ) as MembraneTransportModel,
      stateObject.type,
      stateObject.position
    );
  }
} );

membraneTransport.register( 'MembraneTransportModel', MembraneTransportModel );