// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium glucose cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import membraneChannels from '../../../membraneChannels.js';
import Channel from './Channel.js';


export default class SodiumGlucoseCotransporter extends Channel {

  private readonly _isOpenProperty = new BooleanProperty( false );
  public readonly isOpenProperty: TReadOnlyProperty<boolean> = this._isOpenProperty;

  public override step( dt: number ): void {

    // TODO: What if paused, then the user adds Na+ outside?
    const sodiumOutside = this.model.outsideSoluteCountProperties.sodiumIon.value;
    const sodiumInside = this.model.insideSoluteCountProperties.sodiumIon.value;

    this._isOpenProperty.value = sodiumOutside > sodiumInside;
  }

}

membraneChannels.register( 'SodiumGlucoseCotransporter', SodiumGlucoseCotransporter );