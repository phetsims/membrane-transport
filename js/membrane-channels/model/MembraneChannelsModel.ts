// Copyright 2024-2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import TModel from '../../../../joist/js/TModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import membraneChannels from '../../membraneChannels.js';
import SoluteType, { SoluteTypes } from './SoluteType.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MembraneChannelsModel implements TModel {

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // The full width in model coordinates for the area that you can see in the observation window.
  public static readonly MODEL_WIDTH = 200;

  // TODO: group these together?
  // TODO: naming?
  // Mock proxies for testing the bar charts. Ultimately these values will be derived from the particle locations
  public readonly outsideConcentrationProperties!: Record<SoluteType, NumberProperty>;
  public readonly insideConcentrationProperties!: Record<SoluteType, NumberProperty>;
  public readonly selectedSoluteProperty: StringUnionProperty<SoluteType>;

  public constructor( providedOptions: MembraneChannelsModelOptions ) {

    this.selectedSoluteProperty = new StringUnionProperty<SoluteType>( 'oxygen', {
      validValues: SoluteTypes,
      tandem: providedOptions.tandem.createTandem( 'selectedSoluteProperty' ),
      phetioFeatured: true
    } );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: providedOptions.tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );
    this.isPlayingProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.outsideConcentrationProperties = {};

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.insideConcentrationProperties = {};
    SoluteTypes.forEach( soluteType => {
      this.outsideConcentrationProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideConcentrationProperties[ soluteType ] = new NumberProperty( 0 );
    } );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.timeSpeedProperty.reset();
    this.isPlayingProperty.reset();
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isPlayingProperty.value ) {
      const speed = dt * 3;
      SoluteTypes.forEach( soluteType => {
        this.outsideConcentrationProperties[ soluteType ].value = Utils.clamp( this.outsideConcentrationProperties[ soluteType ].value + ( dotRandom.nextDouble() - 0.5 ) * speed, 0, 1 );
        this.insideConcentrationProperties[ soluteType ].value = Utils.clamp( this.insideConcentrationProperties[ soluteType ].value + ( dotRandom.nextDouble() - 0.5 ) * speed, 0, 1 );
      } );
    }
  }

  // TODO: Do we like this pattern?
  public getOutsideConcentrationProperty( soluteType: SoluteType ): TReadOnlyProperty<number> {
    return this.outsideConcentrationProperties[ soluteType ];
  }

  public getInsideConcentrationProperty( soluteType: SoluteType ): TReadOnlyProperty<number> {
    return this.insideConcentrationProperties[ soluteType ];
  }
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );