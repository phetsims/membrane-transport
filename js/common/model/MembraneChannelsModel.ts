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

export type ChannelType =
  'sodiumIonLeakageChannel' |
  'potassiumIonLeakageChannel' |
  'sodiumIonVoltageGatedChannel';

// TODO: Naming?
const TARGET_COUNT = 7;
const TARGET_MAX_X = 84;
const TARGET_SPACING = ( TARGET_MAX_X * 2 ) / ( TARGET_COUNT - 1 );
const TARGET_VALUES: number[] = [];
for ( let i = 0; i < TARGET_COUNT; i++ ) {
  TARGET_VALUES.push( i * TARGET_SPACING - TARGET_MAX_X );
}

export type TargetKey = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default class MembraneChannelsModel extends PhetioObject {
  public static getPositionForTargetKey( targetKey: TargetKey ): number {
    return TARGET_VALUES[ targetKey ];
  }

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // One NumberProperty for the count of each type of solute, populated in the constructor
  // Note that not all screens have all solute types. Use getFeatureSetSoluteTypes to get the list of solute types
  public readonly outsideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;
  public readonly insideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;

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

  // TODO: Better name for these targets?
  private readonly targets = new Map<TargetKey, ChannelType | null>( TARGET_VALUES.map( ( targetZone, index ) => [ index as TargetKey, null ] ) );
  public readonly targetChangedEmitter = new Emitter();

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

    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.soluteTypeFlux[ soluteType ] = 0;
    } );

    // Ligands are added and removed in response to the areLigandsAddedProperty so that clients can add/remove them
    // by controlling the Property.
    this.areLigandsAddedProperty.lazyLink( areLigandsAdded => {
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
      this.targets.forEach( ( value, key ) => this.targets.set( key, null ) );
      this.targetChangedEmitter.emit();
    } );
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

  public addParticles( soluteType: ParticleType, location: 'inside' | 'outside', count: number, targetArray: Particle<SoluteType | LigandType>[] ): void {
    for ( let i = 0; i < count; i++ ) {
      const x = dotRandom.nextDoubleBetween( MembraneChannelsConstants.INSIDE_CELL_BOUNDS.minX, MembraneChannelsConstants.INSIDE_CELL_BOUNDS.maxX );
      const y = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS.minY : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS.maxY;
      targetArray.push( new Particle( new Vector2( x, y ), soluteType ) );
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

      // capture the initial y value of each solute. This is the preferable alternative to having to remember to check
      // in each place a solute's y value is changed.
      const soluteInitialYValues = new Map<Particle<SoluteType>, number>();
      this.solutes.forEach( solute => soluteInitialYValues.set( solute, solute.position.y ) );

      this.solutes.forEach( solute => solute.step( dt, this ) );
      this.ligands.forEach( ligand => ligand.step( dt, this ) );

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

    this.updateSoluteCounts();
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

  /**
   * Do not passively diffuse if in the presence of a filled target protein.
   */
  public canDiffuseThroughMembrane( solute: Particle<IntentionalAny> ): boolean {
    const x = solute.position.x;

    // it can cross if it isn't within the channel width of any filled target
    return ![ ...this.targets.keys() ].some( target => Math.abs( x - MembraneChannelsModel.getPositionForTargetKey( target ) ) < CHANNEL_WIDTH && this.targets.get( target ) );
  }

  public isCloseToChannelType( solute: Particle<IntentionalAny>, type: ChannelType ): boolean {

    // check if within the channel width of any filled target. TODO: grab radius?
    const x = solute.position.x;
    return [ ...this.targets.keys() ].some( targetKey => Math.abs( x - MembraneChannelsModel.getPositionForTargetKey( targetKey ) ) < CHANNEL_WIDTH && this.targets.get( targetKey ) === type );
  }

  public getNearestChannelPosition( x: number ): TargetKey | null {
    return [ ...this.targets.keys() ].filter( target => this.targets.get( target ) ).sort( ( a, b ) => Math.abs( MembraneChannelsModel.getPositionForTargetKey( a ) - x ) - Math.abs( MembraneChannelsModel.getPositionForTargetKey( b ) - x ) )[ 0 ];
  }

  public getLeftmostEmptyTarget(): TargetKey | null {
    return [ ...this.targets.keys() ].find( target => !this.targets.get( target ) ) || null;
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
      targets: MapIO( NumberIO, NullableIO( StringIO ) )
    },
    applyState: ( model: MembraneChannelsModel, state: IntentionalAny ) => {
      ReferenceArrayIO( Particle.ParticleIO ).applyState( model.solutes, state.solutes );
      ReferenceArrayIO( Particle.ParticleIO ).applyState( model.ligands, state.ligands );
      ReferenceArrayIO( ObjectLiteralIO ).applyState( model.fluxEntries, state.fluxEntries );
      model.time = state.time;
      model.soluteTypeFlux = state.soluteTypeFlux;

      // MapIO is data type serialization, so we need to manually update the model's targets Map
      model.targets.clear();
      for ( const [ key, value ] of state.targets ) {
        model.targets.set( key, value );
      }
      model.targetChangedEmitter.emit();

      model.updateSoluteCounts();
    }
  } );

  public isTargetFilled( targetKey: TargetKey ): boolean {
    return this.targets.get( targetKey ) !== null;
  }

  public setTarget( targetKey: TargetKey, type: ChannelType | null ): void {
    this.targets.set( targetKey, type );
    this.targetChangedEmitter.emit();
  }

  public getTarget( targetKey: TargetKey ): ChannelType | null {
    return this.targets.get( targetKey ) || null;
  }

  public getTargetKeys(): Iterable<TargetKey> {
    return this.targets.keys();
  }
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );