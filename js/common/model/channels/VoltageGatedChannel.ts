// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import membraneChannels from '../../../membraneChannels.js';
import Channel from './Channel.js';
import MembraneChannelsModel from '../MembraneChannelsModel.js';

export default class VoltageGatedChannel extends Channel {

  public readonly isOpenProperty: TReadOnlyProperty<boolean>;

  public constructor( model: MembraneChannelsModel, type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', position: number ) {
    super( model, type, position );

    // * 3 point control that controls the open/close states of the Na and K channels separately and possibly instantaneously.
    // * -70: resting, both closed
    // * -50: Na open, K closed
    // * +30: Na closed, K open

    this.isOpenProperty = new DerivedProperty( [ model.membraneVoltagePotentialProperty ], voltage => {
      return voltage === '-70' ? false :
             voltage === '-50' ? ( type === 'sodiumIonVoltageGatedChannel' ) :
             voltage === '30' ? ( type === 'potassiumIonVoltageGatedChannel' ) :

               // final fallback -> throw
             ( () => { throw new Error( `Unrecognized voltage: ${voltage}` ); } )();
    } );

  }

  public override step( dt: number ): void {
    // TODO: anything here?
  }
}

membraneChannels.register( 'VoltageGatedChannel', VoltageGatedChannel );