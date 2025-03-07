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
export default function( type: ChannelType, position: number ): Channel {
  return type === 'sodiumIonVoltageGatedChannel' ? new Channel( type, position ) :
         type === 'potassiumIonLeakageChannel' ? new Channel( type, position ) :
         type === 'sodiumIonLeakageChannel' ? new Channel( type, position ) :
         type === 'sodiumIonLigandGatedChannel' ? new LigandGatedChannel( type, position ) :
         type === 'potassiumIonLigandGatedChannel' ? new LigandGatedChannel( type, position ) :
         type === 'sodiumPotassiumPump' ? new Channel( type, position ) :
         type === 'sodiumGlucoseCotransporter' ? new Channel( type, position ) :
           // final fallback -> throw
         ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
}