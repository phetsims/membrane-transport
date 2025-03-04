// Copyright 2025, University of Colorado Boulder

import membraneChannels from '../../membraneChannels.js';
import ChannelType from './ChannelType.js';

/**
 * Channel keeps track of stateful model information for a channel (protein) that is actively in a slot.
 * NOTE: this does not extend PhetioObject only the critical part (the type) is needed for serialization.
 * This allows us to avoid dynamic elements in the PhET-iO tree and in the state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default class Channel {
  public constructor( public readonly type: ChannelType ) {
  }
}

membraneChannels.register( 'Channel', Channel );