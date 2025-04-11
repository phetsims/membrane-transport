// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import TransportProtein from './TransportProtein.js';

export default class VoltageGatedChannel extends TransportProtein<'open' | 'closed'> {

  public constructor( model: MembraneTransportModel, type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', position: number ) {
    super( model, type, position, 'closed' );

    // * 3 point control that controls the open/close states of the Na and K channels separately and possibly instantaneously.
    // * -70: resting, both closed
    // * -50: Na open, K closed
    // * +30: Na closed, K open
    model.membraneVoltagePotentialProperty.link( voltage => {
      this.stateProperty.value = voltage === '-70' ? 'closed' :
                                 voltage === '-50' ? ( type === 'sodiumIonVoltageGatedChannel' ? 'open' : 'closed' ) :
                                 voltage === '30' ? ( type === 'potassiumIonVoltageGatedChannel' ? 'open' : 'closed' ) :
                                 ( () => { throw new Error( `Unrecognized voltage: ${voltage}` ); } )();
    } );
  }
}

membraneTransport.register( 'VoltageGatedChannel', VoltageGatedChannel );