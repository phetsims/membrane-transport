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
import membraneTransport from '../../membraneTransport.js';
import Channel from './proteins/Channel.js';
import ChannelType from './proteins/ChannelType.js';
import getChannel from './proteins/getChannel.js';
import MembraneTransportModel, { ChannelIO } from './MembraneTransportModel.js';

export default class Slot {

  // The type of channel that is currently in this slot.
  public readonly channelProperty: Property<null | Channel>;

  public constructor( private readonly model: MembraneTransportModel, public readonly position: number, tandem: Tandem ) {
    this.channelProperty = new Property<null | Channel>( null, {
      tandem: tandem.createTandem( 'channelProperty' ),
      phetioValueType: NullableIO( ChannelIO ),
      phetioFeatured: true
    } );
  }

  public reset(): void {
    this.channelProperty.reset();
  }

  public get channelType(): ChannelType | null {
    return this.channelProperty.value ? this.channelProperty.value.type : null;
  }

  public set channelType( channelType: ChannelType | null ) {
    this.channelProperty.value = channelType ? getChannel( this.model, channelType, this.position ) : null;
  }

  public isFilled(): boolean {
    return this.channelProperty.value !== null;
  }

  public clear(): void {
    this.channelProperty.value = null;
  }
}

membraneTransport.register( 'Slot', Slot );