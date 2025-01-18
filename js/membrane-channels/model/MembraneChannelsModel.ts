// Copyright 2024-2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import membraneChannels from '../../membraneChannels.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MembraneChannelsModel implements TModel {

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  public constructor( providedOptions: MembraneChannelsModelOptions ) {

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: providedOptions.tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );
    this.isPlayingProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
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
    // implement
  }
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );