// Copyright 2025, University of Colorado Boulder

/**
 * The LeakageChannel, which is always open.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

export default class LeakageChannel extends TransportProtein<'open'> {
  public constructor(
    model: MembraneTransportModel,
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