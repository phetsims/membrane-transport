// Copyright 2025, University of Colorado Boulder

import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../../dot/js/Bounds2.js';
import membraneChannels from '../../../membraneChannels.js';
import MembraneChannelsConstants from '../../MembraneChannelsConstants.js';
import MembraneChannelsModel from '../MembraneChannelsModel.js';
import ChannelType from './ChannelType.js';

/**
 * Channel keeps track of stateful model information for a channel (protein) that is actively in a slot.
 * NOTE: this does not extend PhetioObject only the critical part (the type) is needed for serialization.
 * This allows us to avoid dynamic elements in the PhET-iO tree and in the state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default abstract class Channel {

  // Bounds of the channel in model coordinates.
  public readonly bounds: Bounds2;

  public abstract readonly isOpenProperty: TReadOnlyProperty<boolean>;

  /**
   * @param model - reference to the containing model, so we can access information like the membrane voltage
   * @param type - the type of channel
   * @param position - the horizontal position of the channel in the membrane
   */
  public constructor(
    public readonly model: MembraneChannelsModel,
    public readonly type: ChannelType,
    public readonly position: number ) {
    this.bounds = new Bounds2(
      position - MembraneChannelsConstants.CHANNEL_WIDTH / 2,
      MembraneChannelsConstants.MEMBRANE_BOUNDS.minY,
      position + MembraneChannelsConstants.CHANNEL_WIDTH / 2,
      MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY
    );
  }

  /**
   * Implement in subclasses.
   * @param dt - time step in seconds
   */
  public step( dt: number ): void {

    // implement in a subclass, if necessary
  }
}

membraneChannels.register( 'Channel', Channel );