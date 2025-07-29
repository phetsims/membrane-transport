// Copyright 2025, University of Colorado Boulder

/**
 * The LeakageChannel, which is always open.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import SoluteType from '../SoluteType.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

type LeakageChannelState = 'open'; // leakage channel is always open

export default class LeakageChannel extends TransportProtein<LeakageChannelState> {

  public constructor(
    model: MembraneTransportModel,
    type: TransportProteinType,
    position: number
  ) {
    super( model, type, position, 'open', [ 'open' ] );
  }

  /**
   * Determines if passive transport is possible for the given solute type and location.
   * Returns true if no solutes are currently moving through the protein and the gradient allows crossing.
   *
   * @param soluteType
   * @param location - 'outside' or 'inside'
   */
  public override isAvailableForPassiveTransport( soluteType: SoluteType, location: 'outside' | 'inside' ): boolean {
    return !this.hasSolutesMovingTowardOrThroughTransportProtein() && this.model.checkGradientForCrossing( soluteType, location );
  }
}

membraneTransport.register( 'LeakageChannel', LeakageChannel );