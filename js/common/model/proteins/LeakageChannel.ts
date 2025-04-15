// Copyright 2025, University of Colorado Boulder

/**
 * The LeakageChannel, which is always open.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../../membraneTransport.js';
import ModelContext from './ModelContext.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

type LeakageChannelState = 'open'; // leakage channel is always open

export default class LeakageChannel extends TransportProtein<LeakageChannelState> {
  public constructor(
    model: ModelContext,
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