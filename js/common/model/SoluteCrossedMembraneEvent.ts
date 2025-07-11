// Copyright 2025, University of Colorado Boulder

/**
 * Information about when a single solute crossed the membrane through a transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import membraneTransport from '../../membraneTransport.js';
import TransportProteinType from './proteins/TransportProteinType.js';
import Slot from './Slot.js';
import Solute from './Solute.js';

export default class SoluteCrossedMembraneEvent {
  public readonly transportProteinType: TransportProteinType | null;

  public constructor(
    public readonly slot: Slot | null,
    public readonly solute: Solute,
    public readonly direction: 'inward' | 'outward'
  ) {
    this.transportProteinType = slot ? slot.transportProteinType : null;
  }
}

membraneTransport.register( 'SoluteCrossedMembraneEvent', SoluteCrossedMembraneEvent );