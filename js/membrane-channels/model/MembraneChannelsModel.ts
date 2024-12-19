// Copyright 2024, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import TModel from '../../../../joist/js/TModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import membraneChannels from '../../membraneChannels.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MembraneChannelsModel implements TModel {

  public constructor( providedOptions: MembraneChannelsModelOptions ) {
    console.log( 'TODO' );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    console.log( 'TODO' );
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    console.log( 'TODO' );
  }
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );