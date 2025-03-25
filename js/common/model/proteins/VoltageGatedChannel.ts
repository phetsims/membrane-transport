// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Channel from './Channel.js';

export default class VoltageGatedChannel extends Channel {

  public readonly isOpenProperty: TReadOnlyProperty<boolean>;

  public constructor( model: MembraneTransportModel, type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', position: number ) {
    super( model, type, position );

    // * 3 point control that controls the open/close states of the Na and K channels separately and possibly instantaneously.
    // * -70: resting, both closed
    // * -50: Na open, K closed
    // * +30: Na closed, K open
    this.isOpenProperty = new DerivedProperty( [ model.membraneVoltagePotentialProperty ], voltage => {
      return voltage === '-70' ? false :
             voltage === '-50' ? ( type === 'sodiumIonVoltageGatedChannel' ) :
             voltage === '30' ? ( type === 'potassiumIonVoltageGatedChannel' ) :

             ( () => { throw new Error( `Unrecognized voltage: ${voltage}` ); } )();
    } );
  }
}

membraneTransport.register( 'VoltageGatedChannel', VoltageGatedChannel );