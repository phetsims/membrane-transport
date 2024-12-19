// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Sam Reid (PhET Interactive Simulations, and Jesse Greenberg (PhET Interactive Simulations)
 */

import TModel from '../../../../joist/js/TModel.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import membraneChannels from '../../membraneChannels.js';

type SelfOptions = {
  //TODO add options that are specific to MembraneChannelsModel here
};

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MembraneChannelsModel implements TModel {

  public constructor( providedOptions: MembraneChannelsModelOptions ) {
    //TODO
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );