// Copyright 2025, University of Colorado Boulder

import Channel from './Channel.js';
import ChannelType from './ChannelType.js';
import LeakageChannel from './LeakageChannel.js';
import LigandGatedChannel from './LigandGatedChannel.js';
import MembraneChannelsModel from './MembraneChannelsModel.js';
import VoltageGatedChannel from './VoltageGatedChannel.js';

/**
 * Creates a new Channel corresponding to the given ChannelType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default function( model: MembraneChannelsModel, type: ChannelType, position: number ): Channel {
  return type === 'sodiumIonLeakageChannel' ? new LeakageChannel( model, type, position ) :
         type === 'potassiumIonLeakageChannel' ? new LeakageChannel( model, type, position ) :

           // TODO: Should it get a reference to Slot instead of position?
         type === 'sodiumIonVoltageGatedChannel' ? new VoltageGatedChannel( model, type, position ) :
         type === 'potassiumIonVoltageGatedChannel' ? new VoltageGatedChannel( model, type, position ) :

         type === 'sodiumIonLigandGatedChannel' ? new LigandGatedChannel( model, type, position ) :
         type === 'potassiumIonLigandGatedChannel' ? new LigandGatedChannel( model, type, position ) :

         // TODO: Specific model types here
         type === 'sodiumPotassiumPump' ? new LeakageChannel( model, type, position ) :
         type === 'sodiumGlucoseCotransporter' ? new LeakageChannel( model, type, position ) :
           // final fallback -> throw
         ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
}