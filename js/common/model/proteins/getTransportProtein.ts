// Copyright 2025, University of Colorado Boulder

import MembraneTransportModel from '../MembraneTransportModel.js';
import LeakageChannel from './LeakageChannel.js';
import LigandGatedChannel from './LigandGatedChannel.js';
import SodiumGlucoseCotransporter from './SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from './SodiumPotassiumPump.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';
import VoltageGatedChannel from './VoltageGatedChannel.js';

/**
 * Creates a new TransportProtein corresponding to the given TransportProteinType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default function( model: MembraneTransportModel, type: TransportProteinType, position: number ): TransportProtein {
  return type === 'sodiumIonLeakageChannel' ? new LeakageChannel( model, type, position ) :
         type === 'potassiumIonLeakageChannel' ? new LeakageChannel( model, type, position ) :

         type === 'sodiumIonVoltageGatedChannel' ? new VoltageGatedChannel( model, type, position ) :
         type === 'potassiumIonVoltageGatedChannel' ? new VoltageGatedChannel( model, type, position ) :

         type === 'sodiumIonLigandGatedChannel' ? new LigandGatedChannel( model, type, position ) :
         type === 'potassiumIonLigandGatedChannel' ? new LigandGatedChannel( model, type, position ) :

         type === 'sodiumPotassiumPump' ? new SodiumPotassiumPump( model, type, position ) :
         type === 'sodiumGlucoseCotransporter' ? new SodiumGlucoseCotransporter( model, type, position ) :

         ( () => { throw new Error( `Unrecognized transport protein type: ${type}` ); } )();
}