// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../../membraneTransport.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';

type VoltageGatedChannelState = 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV'; // opens based on the voltage of the membrane

export default class SodiumVoltageGatedChannel extends TransportProtein<VoltageGatedChannelState> {

  public constructor( model: TransportProteinModelContext, position: number ) {
    super( model, 'sodiumIonVoltageGatedChannel', position, 'closedNegative70mV' );

    // * 3 point control that controls the open/close states of the Na and K channels separately and possibly instantaneously.
    // * -70: resting, both closed
    // * -50: Na open, K closed
    // * +30: Na closed, K open
    model.membraneVoltagePotentialProperty.link( voltage => {
      this.stateProperty.value = voltage === -70 ? 'closedNegative70mV' :
                                 voltage === -50 ? 'openNegative50mV' :
                                 voltage === 30 ? 'closed30mV' :
                                 ( () => { throw new Error( `Unrecognized voltage: ${voltage}` ); } )();
    }, { disposer: this } );
  }

  /**
   * A voltage gated channel is only available for transport if in the correct state.
   */
  public override isAvailableForPassiveTransport(): boolean {
    return this.stateProperty.value === 'openNegative50mV' && !this.hasSolutesMovingTowardOrThroughTransportProtein();
  }
}

membraneTransport.register( 'SodiumVoltageGatedChannel', SodiumVoltageGatedChannel );