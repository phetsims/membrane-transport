// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';
import VoltageGatedChannel from './VoltageGatedChannel.js';

type VoltageGatedChannelState = 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV'; // opens based on the voltage of the membrane

export default class SodiumVoltageGatedChannel extends VoltageGatedChannel<VoltageGatedChannelState> {

  // The SodiumVoltageGatedChannel is considered 'open' when it is in the 'openNegative50mV' state.
  public readonly openOrClosedProperty = new DerivedProperty( [ this.stateProperty ], state => {
    return state === 'openNegative50mV' ? 'open' : 'closed';
  } );

  public constructor( model: TransportProteinModelContext, position: number ) {
    super( model, 'sodiumIonVoltageGatedChannel', position, 'closedNegative70mV' );
  }

  public getStateForVoltage( voltage: number ): VoltageGatedChannelState {
    return voltage === -70 ? 'closedNegative70mV' :
           voltage === -50 ? 'openNegative50mV' :
           voltage === 30 ? 'closed30mV' :
           ( () => { throw new Error( `Unrecognized voltage: ${voltage}` ); } )();
  }

  public override isStateOpen( state: VoltageGatedChannelState ): boolean {
    return state === 'openNegative50mV';
  }
}

membraneTransport.register( 'SodiumVoltageGatedChannel', SodiumVoltageGatedChannel );