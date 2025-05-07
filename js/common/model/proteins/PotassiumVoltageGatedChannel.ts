// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a potassium voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';
import VoltageGatedChannel from './VoltageGatedChannel.js';

type VoltageGatedChannelState = 'closedNegative70mV' | 'closedNegative50mV' | 'open30mV'; // opens based on the voltage of the membrane

export default class PotassiumVoltageGatedChannel extends VoltageGatedChannel<VoltageGatedChannelState> {

  // The PotassiumVoltageGatedChannel is open at 30mV.
  public readonly openOrClosedProperty = new DerivedProperty( [ this.stateProperty ], ( state: VoltageGatedChannelState ) => {
    return state === 'open30mV' ? 'open' : 'closed';
  } );

  public constructor( model: TransportProteinModelContext, position: number ) {
    super( model, 'potassiumIonVoltageGatedChannel', position, 'closedNegative70mV' );
  }

  public getStateForVoltage( voltage: number ): VoltageGatedChannelState {
    return voltage === -70 ? 'closedNegative70mV' :
           voltage === -50 ? 'closedNegative50mV' :
           voltage === 30 ? 'open30mV' :
           ( () => { throw new Error( `Unrecognized voltage: ${voltage}` ); } )();
  }

  public override isStateOpen( state: VoltageGatedChannelState ): boolean {
    return state === 'open30mV';
  }
}

membraneTransport.register( 'PotassiumVoltageGatedChannel', PotassiumVoltageGatedChannel );