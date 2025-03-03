// Copyright 2024-2025, University of Colorado Boulder

/**
 * The main model for Membrane Channels. This manages the solutes, membrane channels, and methods for moving them
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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import MapIO from '../../../../tandem/js/types/MapIO.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import ReferenceArrayIO from '../../../../tandem/js/types/ReferenceArrayIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import MembraneChannelsConstants, { LIGAND_COUNT } from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsFeatureSet, { getFeatureSetHasVoltages, getFeatureSetSoluteTypes } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsQueryParameters from '../MembraneChannelsQueryParameters.js';
import ChannelType from './ChannelType.js';
import Particle from './Particle.js';
import SoluteType, { LigandType, ParticleType } from './SoluteType.js';

type SelfOptions = EmptySelfOptions;

const CHANNEL_WIDTH = 10;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

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

const slots = [ '0', '1', '2', '3', '4', '5', '6' ] as const;
export type Slot = ( typeof slots )[number];

export default class MembraneChannelsModel extends PhetioObject {
  public getSlotPosition( slot: Slot ): number {
    return SLOT_POSITIONS[ slots.indexOf( slot ) ];
  }

  public readonly slots = slots;

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // For Description, keep track of important quantities.

  // One NumberProperty for the count of each type of solute, populated in the constructor
  // Note that not all screens have all solute types. Use getFeatureSetSoluteTypes to get the list of solute types
  public readonly outsideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;
  public readonly insideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;
  public readonly insideSoluteTypesCountProperty = new NumberProperty( 0 );
  public readonly outsideSoluteTypesCountProperty = new NumberProperty( 0 );
  public readonly channelCountProperty = new NumberProperty( 0 );

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

  // TODO: Convert to class Slot{} probably, as long as it is straightforward for phet-io state
  private readonly slotContents = new Map<Slot, ChannelType | null>( slots.map( slot => [ slot, null ] ) );
  public readonly slotContentsChangedEmitter = new Emitter();

  public constructor(
    public readonly featureSet: MembraneChannelsFeatureSet,
    providedOptions: MembraneChannelsModelOptions ) {

    const options = optionize<MembraneChannelsModelOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioType: MembraneChannelsModel.MembraneChannelsModelIO,
      phetioState: true
    }, providedOptions );

    super( options );

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

    if ( MembraneChannelsQueryParameters.defaultSolutes ) {

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
      this.slotContents.forEach( ( value, key ) => this.slotContents.set( key, null ) );
      this.slotContentsChangedEmitter.emit();
    } );

    // TODO: For testing
    this.setSlotContents( '3', 'sodiumIonVoltageGatedChannel' );
    this.setSlotContents( '5', 'sodiumIonLeakageChannel' );
  }

  /**
   * Add a solute that will enter from a random location along the edge of the observation window.
   */
  public addSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    this.addParticles( soluteType, location, count, this.solutes );
  }

  public addLigands(): void {
    this.addParticles( 'ligandA', 'outside', LIGAND_COUNT, this.ligands );
    this.addParticles( 'ligandB', 'outside', LIGAND_COUNT, this.ligands );
  }

  public addParticles( soluteType: ParticleType, location: 'inside' | 'outside', count: number, soluteArray: Particle<SoluteType | LigandType>[] ): void {
    for ( let i = 0; i < count; i++ ) {
      const x = dotRandom.nextDoubleBetween( MembraneChannelsConstants.INSIDE_CELL_BOUNDS.minX, MembraneChannelsConstants.INSIDE_CELL_BOUNDS.maxX );
      const y = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS.minY : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS.maxY;
      soluteArray.push( new Particle( new Vector2( x, y ), soluteType ) );
    }
  }

  /**
   * Removes all ligands (both types) from the model.
   */
  public removeLigands(): void {
    this.ligands.length = 0;
  }

  public removeSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    const cellBounds = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS;

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
    this.updateCounts();
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.resetEmitter.emit();
    this.updateCounts();
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

      this.stepFlux( dt, soluteInitialYValues );
    }

    this.updateCounts();
  }

  private stepFlux( dt: number, soluteInitialYValues: Map<Particle<SoluteType>, number> ): void {

    // Prune any recentSoluteFlux that is more than 1000ms old.
    this.fluxEntries.slice().forEach( fluxEntry => {
      if ( this.time - fluxEntry.time > 1 ) {
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

  private updateCounts(): void {


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

    // Count the number of channels
    this.channelCountProperty.value = slots.filter( slot => this.slotContents.get( slot ) ).length;
  }

  /**
   * Count the number of solutes inside or outside of the cell membrane.
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

  public getNearbySlotForChannelType( solute: Particle<IntentionalAny>, type: ChannelType ): Slot | null {

    // check if within the channel width of any filled slot. TODO: grab radius?
    const x = solute.position.x;
    return slots.find( slot => Math.abs( x - this.getSlotPosition( slot ) ) < CHANNEL_WIDTH && this.slotContents.get( slot ) === type ) || null;
  }

  public getLeftmostEmptySlot(): Slot | null {
    return slots.find( slot => !this.slotContents.get( slot ) ) || null;
  }

  public isSlotFilled( slot: Slot ): boolean {
    return this.slotContents.get( slot ) !== null;
  }

  public setSlotContents( slot: Slot, type: ChannelType | null ): void {
    affirm( slot !== null, 'slot is null' );
    this.slotContents.set( slot, type );
    this.slotContentsChangedEmitter.emit();
  }

  // TODO: Consider a better name? Maybe something with "channel" in it?
  //   Maybe something with "protein" in it?
  public getSlotContents( slot: Slot ): ChannelType | null {
    return this.slotContents.get( slot ) || null;
  }

  public getLeftmostFilledSlot(): Slot | null {
    return slots.find( slot => this.slotContents.get( slot ) ) || null;
  }

  public swapSlotContents( slotA: Slot, slotB: Slot ): void {
    const temp = this.slotContents.get( slotA )!;
    this.slotContents.set( slotA, this.slotContents.get( slotB )! );
    this.slotContents.set( slotB, temp );
    this.slotContentsChangedEmitter.emit();
  }

  public getNextFilledSlot( delta: number, index: number ): Slot | null {

    // Find the next filled target, wrapping around
    for ( let i = 0; i < slots.length; i++ ) {
      index = ( index + delta + slots.length ) % slots.length;
      if ( this.slotContents.get( slots[ index ] ) ) {
        return slots[ index ];
      }
    }

    return null;
  }

  public getSlotIndex( slot: Slot ): number {
    return slots.indexOf( slot );
  }

  public getSlotForIndex( index: number ): Slot {
    return slots[ index ];
  }

  public getMiddleSlot(): Slot {
    return slots[ Math.floor( slots.length / 2 ) ];
  }

  /**
   * If a slot already has a solute traversing it, or moving to it, then it is "reserved" and cannot accommodate a second solute.
   */
  public isChannelFree( slot: Slot ): boolean {
    const isChannelReserved = this.solutes.some( solute => {

      // Check if any mode has this slot
      if ( solute.mode.type === 'moveToCenterOfChannel' && solute.mode.slot === slot ) {
        return true;
      }
      else if ( solute.mode.type === 'movingThroughChannel' && solute.mode.slot === slot ) {
        return true;
      }
      return false;
    } );
    return !isChannelReserved;
  }

  public getTimeSpeedFactor(): number {
    return this.timeSpeedProperty.value === TimeSpeed.NORMAL ? 1 : 0.5;
  }

  /**
   * For serialization, the MembraneChannelsModel uses reference type serialization, following the pattern in Field.FieldIO.
   * Please see that documentation for more information.
   */
  public static readonly MembraneChannelsModelIO = new IOType<MembraneChannelsModel>( 'MembraneChannelsModelIO', {
    valueType: MembraneChannelsModel,
    stateSchema: {
      solutes: ReferenceArrayIO( Particle.ParticleIO ),
      ligands: ReferenceArrayIO( Particle.ParticleIO ),
      fluxEntries: ReferenceArrayIO( ObjectLiteralIO ),
      time: NumberIO,
      soluteTypeFlux: ObjectLiteralIO,
      slotContents: MapIO( StringIO, NullableIO( StringIO ) )
    },
    applyState: ( model: MembraneChannelsModel, state: IntentionalAny ) => {
      ReferenceArrayIO( Particle.ParticleIO ).applyState( model.solutes, state.solutes );
      ReferenceArrayIO( Particle.ParticleIO ).applyState( model.ligands, state.ligands );
      ReferenceArrayIO( ObjectLiteralIO ).applyState( model.fluxEntries, state.fluxEntries );
      model.time = state.time;
      model.soluteTypeFlux = state.soluteTypeFlux;

      // MapIO is data type serialization, so we need to manually update the model's targets Map
      model.slotContents.clear();
      for ( const [ key, value ] of state.slotContents ) {
        model.slotContents.set( key, value );
      }
      model.slotContentsChangedEmitter.emit();

      model.updateCounts();
    }
  } );
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );