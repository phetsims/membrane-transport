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
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
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
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import ReferenceArrayIO from '../../../../tandem/js/types/ReferenceArrayIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsFeatureSet, { getFeatureSetHasVoltages, getFeatureSetSoluteTypes } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsQueryParameters from '../MembraneChannelsQueryParameters.js';
import Solute from './Solute.js';
import SoluteType from './SoluteType.js';
import stepSoluteRandomWalk from './stepSoluteRandomWalk.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

type FluxEntry = {
  soluteType: SoluteType;
  time: number;
  direction: 'inward' | 'outward';
};

/**
 * The IOType that lets us track the flux of solutes in PhET-IO state.
 */
const FluxEntryIO = new IOType<FluxEntry, FluxEntry>( 'SoluteIO', {
  isValidValue: value => {
    return value.hasOwnProperty( 'soluteType' ) && value.hasOwnProperty( 'time' ) && value.hasOwnProperty( 'direction' );
  },
  stateSchema: {
    soluteType: StringIO,
    time: NumberIO,
    direction: StringIO
  },
  fromStateObject: ( stateObject: FluxEntry ) => {
    return stateObject;
  }
} );

const fluxSmoothingTimeConstant = 0.25;

export default class MembraneChannelsModel extends PhetioObject {

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // One NumberProperty for the count of each type of solute, populated in the constructor
  // Note that not all screens have all solute types. Use getFeatureSetSoluteTypes to get the list of solute types
  public readonly outsideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;
  public readonly insideSoluteCountProperties = {} as Record<SoluteType, NumberProperty>;

  public readonly selectedSoluteProperty: StringUnionProperty<SoluteType>;

  public readonly isShowingMembranePotentialLabelsProperty: PhetioProperty<boolean>;
  public readonly membraneVoltagePotentialProperty: PhetioProperty<'-70' | '-50' | '30'>;

  public readonly solutes: Solute[] = [];

  private readonly resetEmitter = new Emitter();

  // The flux entries are used to track the recent flux of solutes through the membrane.
  private readonly fluxEntries: FluxEntry[] = []; // TODO (phet-io): This DOES need to be stateful.
  private time = 0; // TODO (phet-io): This DOES need to be instrumented to support the above TODO.

  private soluteTypeToSmoothedFlux = {} as Record<SoluteType, number>;

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

    // TODO (design): I set this true for development, but should it also be true for production?
    // TODO (design): if the sim is paused, and the user adds solute, it is barely visible! that is a confusing UX
    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.isPlayingProperty.reset() );

    this.isShowingMembranePotentialLabelsProperty = new BooleanProperty( false, {
      tandem: getFeatureSetHasVoltages( this.featureSet ) ? providedOptions.tandem.createTandem( 'isShowingMembranePotentialLabelsProperty' ) : Tandem.OPT_OUT,
      phetioFeatured: true
    } );

    this.membraneVoltagePotentialProperty = new StringUnionProperty( '-70', {
      tandem: getFeatureSetHasVoltages( this.featureSet ) ? providedOptions.tandem.createTandem( 'membraneVoltagePotentialProperty' ) : Tandem.OPT_OUT,
      validValues: [ '-70', '-50', '30' ],
      phetioFeatured: true
    } );

    getFeatureSetSoluteTypes( this.featureSet ).forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.soluteTypeToSmoothedFlux[ soluteType ] = 0;
    } );

    if ( MembraneChannelsQueryParameters.defaultSolutes ) {

      const populateInitialSolutes = () => {
        // A random sample of solutes in the solutes array
        for ( let i = 0; i < 30; i++ ) {
          this.solutes.push( new Solute( new Vector2( dotRandom.nextDoubleBetween( -50, 50 ), dotRandom.nextDoubleBetween( -50, 50 ) ), dotRandom.sample( getFeatureSetSoluteTypes( this.featureSet ) ) ) );
        }
      };

      this.resetEmitter.addListener( () => {
        this.solutes.length = 0;
        populateInitialSolutes();
      } );

      populateInitialSolutes();
    }
  }

  /**
   * Add a solute that will enter from a random location along the edge of the observation window.
   */
  public addSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    for ( let i = 0; i < count; i++ ) {
      const x = dotRandom.nextDoubleBetween( MembraneChannelsConstants.INSIDE_CELL_BOUNDS.minX, MembraneChannelsConstants.INSIDE_CELL_BOUNDS.maxX );
      const y = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS.minY : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS.maxY;
      this.solutes.push( new Solute( new Vector2( x, y ), soluteType ) );
    }
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
      const soluteInitialYValues = new Map<Solute, number>();
      this.solutes.forEach( solute => soluteInitialYValues.set( solute, solute.position.y ) );


      this.solutes.forEach( solute => {
        if ( solute.mode === 'randomWalk' ) {
          stepSoluteRandomWalk( solute, dt );
        }
        else if ( solute.mode === 'bound' ) {
          // Mode where solute doesn’t move, or does something special
        }
        else if ( solute.mode === 'passThroughToInside' ) {
          // Mode where solute passes through the membrane to the inside
          solute.position.y -= 5 * dt;

          // TODO: Solutes are supposed to do a constrained random walk through the membrane.
          if ( ( solute.position.y + solute.dimension.height / 2 ) < MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ) {

            // The next direction should mostly point down so that the solute doesn't go right back out
            const downwardDirection = new Vector2( dotRandom.nextDoubleBetween( -1, 1 ), dotRandom.nextDoubleBetween( -1, 0 ) ).normalize();
            solute.moveToward( downwardDirection, dotRandom.nextDoubleBetween( 1, 2 ) );
          }
        }
        else if ( solute.mode === 'passThroughToOutside' ) {
          // Mode where solute passes through the membrane to the outside
          solute.position.y += 5 * dt;
          if ( ( solute.position.y - solute.dimension.height / 2 ) > MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY ) {

            const upwardDirection = new Vector2( dotRandom.nextDoubleBetween( -1, 1 ), dotRandom.nextDoubleBetween( 0, 1 ) ).normalize();
            solute.moveToward( upwardDirection, dotRandom.nextDoubleBetween( 1, 2 ) );
          }
        }
      } );

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

        this.soluteTypeToSmoothedFlux[ soluteType ] = fluxSmoothingAlpha * recentFlux + ( 1 - fluxSmoothingAlpha ) * this.soluteTypeToSmoothedFlux[ soluteType ];
      } );
    }

    this.updateSoluteCounts();
  }

  /**
   * Sum up all of the flux history for a given solute type. Positive values indicate that the solute has passed
   * through the membrane from the outside to the inside, and negative values indicate the opposite.
   */
  public getRecentSoluteFluxWithSmoothing( soluteType: SoluteType ): number {
    return this.soluteTypeToSmoothedFlux[ soluteType ];
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

      // Compare against the y value becase a solute is still considered 'inside' until it full passes through
      // the middle of the membrane.
      return solute.type === soluteType && ( location === 'inside' ? solute.position.y < 0 : solute.position.y > 0 );
    } ).length;
  }

  /**
   * For serialization, the MembraneChannelsModel uses reference type serialization, following the pattern in Field.FieldIO.
   * Please see that documentation for more information.
   */
  public static readonly MembraneChannelsModelIO = new IOType<MembraneChannelsModel>( 'MembraneChannelsModelIO', {
    valueType: MembraneChannelsModel,
    stateSchema: {
      solutes: ReferenceArrayIO( Solute.SoluteIO ),
      fluxEntries: ReferenceArrayIO( FluxEntryIO ),
      time: NumberIO,
      soluteTypeToSmoothedFlux: ObjectLiteralIO // TODO: Schema for this?
    },
    applyState: ( model: MembraneChannelsModel, state: IntentionalAny ) => {
      ReferenceArrayIO( Solute.SoluteIO ).applyState( model.solutes, state.solutes );
      ReferenceArrayIO( FluxEntryIO ).applyState( model.fluxEntries, state.fluxEntries );
      model.time = state.time;
      model.soluteTypeToSmoothedFlux = state.soluteTypeToSmoothedFlux;
      model.updateSoluteCounts();
    }
  } );
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );