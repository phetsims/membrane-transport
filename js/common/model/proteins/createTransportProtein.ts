// Copyright 2025, University of Colorado Boulder

/**
 * Creates a new TransportProtein corresponding to the given TransportProteinType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import LeakageChannel from './LeakageChannel.js';
import LigandGatedChannel from './LigandGatedChannel.js';
import PotassiumVoltageGatedChannel from './PotassiumVoltageGatedChannel.js';
import SodiumGlucoseCotransporter from './SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from './SodiumPotassiumPump.js';
import SodiumVoltageGatedChannel from './SodiumVoltageGatedChannel.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

/**
 * @param model
 * @param type
 * @param position - The horizontal position of the transport protein in the membrane.
 */
export default function createTransportProtein( model: MembraneTransportModel, type: TransportProteinType, position: number ): TransportProtein<IntentionalAny> {
  return type === 'sodiumIonLeakageChannel' ? new LeakageChannel( model, type, position ) :
         type === 'potassiumIonLeakageChannel' ? new LeakageChannel( model, type, position ) :

         type === 'sodiumIonVoltageGatedChannel' ? new SodiumVoltageGatedChannel( model, position ) :
         type === 'potassiumIonVoltageGatedChannel' ? new PotassiumVoltageGatedChannel( model, position ) :

         type === 'sodiumIonLigandGatedChannel' ? new LigandGatedChannel( model, type, position ) :
         type === 'potassiumIonLigandGatedChannel' ? new LigandGatedChannel( model, type, position ) :

         type === 'sodiumPotassiumPump' ? new SodiumPotassiumPump( model, type, position ) :
         type === 'sodiumGlucoseCotransporter' ? new SodiumGlucoseCotransporter( model, type, position ) :

         ( () => { throw new Error( `Unrecognized transport protein type: ${type}` ); } )();
}