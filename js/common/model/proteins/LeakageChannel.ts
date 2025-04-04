// Copyright 2025, University of Colorado Boulder

import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

/**
 * The LeakageChannel, which is always open.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LeakageChannel extends TransportProtein<'open'> {
  public constructor(
    model: MembraneTransportModel,
    type: TransportProteinType,
    position: number
  ) {
    super( model, type, position, 'open' );
  }
}

membraneTransport.register( 'LeakageChannel', LeakageChannel );