// Copyright 2025-2026, University of Colorado Boulder

/**
 * A model component for a sodium voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import MembraneTransportModel from '../MembraneTransportModel.js';
import VoltageGatedChannel from './VoltageGatedChannel.js';

type VoltageGatedChannelState = 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV'; // opens based on the voltage of the membrane

export default class SodiumVoltageGatedChannel extends VoltageGatedChannel<VoltageGatedChannelState> {

  public constructor( model: MembraneTransportModel, position: number ) {
    super( model, 'sodiumIonVoltageGatedChannel', position, 'closedNegative70mV', [ 'openNegative50mV' ] );
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
