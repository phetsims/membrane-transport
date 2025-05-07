// Copyright 2025, University of Colorado Boulder

/**
 * The LeakageChannel, which is always open.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';
import TransportProteinType from './TransportProteinType.js';

type LeakageChannelState = 'open'; // leakage channel is always open

export default class LeakageChannel extends TransportProtein<LeakageChannelState> {

  // the leakage channel is always considered 'open'
  public readonly openOrClosedProperty = new Property<'open' | 'closed'>( 'open' );

  public constructor(
    model: TransportProteinModelContext,
    type: TransportProteinType,
    position: number
  ) {
    super( model, type, position, 'open' );
  }

  public override isAvailableForPassiveTransport(): boolean {
    return !this.hasSolutesMovingTowardOrThroughTransportProtein();
  }
}

membraneTransport.register( 'LeakageChannel', LeakageChannel );