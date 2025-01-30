// Copyright 2024-2025, University of Colorado Boulder

/**
 * TODO: What to do for the directory structure for this sim?
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceArrayIO from '../../../../tandem/js/types/ReferenceArrayIO.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import Solute from './Solute.js';
import SoluteType, { SoluteTypes } from './SoluteType.js';
import stepSoluteRandomWalk from './stepSoluteRandomWalk.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MembraneChannelsModel extends PhetioObject {

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // TODO: group these together?
  // TODO: naming?
  // Mock proxies for testing the bar charts. Ultimately these values will be derived from the particle locations
  public readonly outsideSoluteCountProperties!: Record<SoluteType, NumberProperty>;
  public readonly insideSoluteCountProperties!: Record<SoluteType, NumberProperty>;
  public readonly selectedSoluteProperty: StringUnionProperty<SoluteType>;

  public readonly solutes: Solute[] = [];

  private readonly resetEmitter = new Emitter();

  public constructor( providedOptions: MembraneChannelsModelOptions ) {

    const options = optionize<MembraneChannelsModelOptions, SelfOptions, PhetioObjectOptions>()( {
      phetioType: MembraneChannelsModel.MembraneChannelsModelIO,
      phetioState: true
    }, providedOptions );

    super( options );

    this.selectedSoluteProperty = new StringUnionProperty<SoluteType>( 'oxygen', {
      validValues: SoluteTypes,
      tandem: providedOptions.tandem.createTandem( 'selectedSoluteProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.selectedSoluteProperty.reset() );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: providedOptions.tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.timeSpeedProperty.reset() );
    this.isPlayingProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.isPlayingProperty.reset() );

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.outsideSoluteCountProperties = {};

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.insideSoluteCountProperties = {};
    SoluteTypes.forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
    } );

    // A random sample of solutes in the solutes array
    for ( let i = 0; i < 30; i++ ) {
      this.solutes.push( new Solute( new Vector2( dotRandom.nextDoubleBetween( -100, 100 ), dotRandom.nextDoubleBetween( -100, 100 ) ), dotRandom.sample( SoluteTypes ) ) );
    }
  }

  public addSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    const cellBounds = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS;
    for ( let i = 0; i < count; i++ ) {
      this.solutes.push( new Solute( dotRandom.nextPointInBounds( cellBounds ), soluteType ) );
    }
  }

  public removeSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    const cellBounds = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS;

    // TODO: The design calls for removing the randomly (not the most recent ones)
    for ( let i = 0; i < count; i++ ) {
      const index = this.solutes.findIndex( solute => {
        return solute.type === soluteType && cellBounds.containsPoint( solute.position );
      } );
      if ( index !== -1 ) {
        this.solutes.splice( index, 1 );
      }
    }
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.resetEmitter.emit();
  }

  /**
   * Steps the simulation forward by dt seconds.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {

    if ( this.isPlayingProperty.value ) {

      this.solutes.forEach( solute => {
        if ( solute.mode === 'randomWalk' ) {

          stepSoluteRandomWalk( solute, dt );

        }
        else if ( solute.mode === 'bound' ) {
          // Mode where solute doesn’t move, or does something special
        }
      } );
    }

    // Update the solute counts after the solutes have moved
    SoluteTypes.forEach( soluteType => {
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
      solutes: ReferenceArrayIO( Solute.SoluteIO )
    }
  } );
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );