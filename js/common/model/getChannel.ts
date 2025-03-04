// Copyright 2025, University of Colorado Boulder

import Channel from './Channel.js';
import ChannelType from './ChannelType.js';
import LigandGatedChannel from './LigandGatedChannel.js';

/**
 * Creates a new Channel corresponding to the given ChannelType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default function( type: ChannelType ): Channel {
  return type === 'sodiumIonVoltageGatedChannel' ? new Channel( type ) :
         type === 'potassiumIonLeakageChannel' ? new Channel( type ) :
         type === 'sodiumIonLeakageChannel' ? new Channel( type ) :
         type === 'sodiumIonLigandGatedChannel' ? new LigandGatedChannel( type ) :
         type === 'potassiumIonLigandGatedChannel' ? new LigandGatedChannel( type ) :
         type === 'sodiumPotassiumPump' ? new Channel( type ) :
         type === 'sodiumGlucoseCotransporter' ? new Channel( type ) :
           // final fallback -> throw
         ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
}