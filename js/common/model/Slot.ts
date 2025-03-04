// Copyright 2025, University of Colorado Boulder

/**
 * Model representation for a Slot, which can hold a channel (protein).
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import membraneChannels from '../../membraneChannels.js';
import ChannelType from './ChannelType.js';

export default class Slot {

  // The type of channel that is currently in this slot.
  public channelTypeProperty: Property<null | ChannelType>;

  public constructor( public readonly position: number, tandem: Tandem ) {
    this.channelTypeProperty = new Property<null | ChannelType>( null, {
      tandem: tandem.createTandem( 'channelTypeProperty' ),

      // TODO: If Channel becomes a dedicated class this will be challenging.
      phetioValueType: NullableIO( StringIO )
    } );
  }

  public reset(): void {
    this.channelTypeProperty.reset();
  }

  public isFilled(): boolean {
    return this.channelTypeProperty.value !== null;
  }
}

membraneChannels.register( 'Slot', Slot );