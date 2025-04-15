// Copyright 2025, University of Colorado Boulder

import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import TransportProtein from '../../model/proteins/TransportProtein.js';
import TransportProteinType from '../../model/proteins/TransportProteinType.js';
import LigandGatedChannel from '../../model/proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import VoltageGatedChannel from '../../model/proteins/VoltageGatedChannel.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import LigandGatedChannelNode from './LigandGatedChannelNode.js';
import ProteinNode from './ProteinNode.js';
import SodiumGlucoseCotransporterNode from './SodiumGlucoseCotransporterNode.js';
import SodiumPotassiumPumpNode from './SodiumPotassiumPumpNode.js';
import VoltageGatedChannelNode from './VoltageGatedChannelNode.js';

/**
 * Returns the Node for the given TransportProteinType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function createTransportProteinNode( type: TransportProteinType, transportProtein: TransportProtein | null ): ProteinNode {
  if ( type === 'sodiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type );
  }
  else if ( type === 'potassiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type );
  }
  else if ( type === 'sodiumIonVoltageGatedChannel' ) {
    affirm( transportProtein === null || transportProtein instanceof VoltageGatedChannel, 'model for sodiumIonVoltageGatedChannel must be VoltageGatedChannel' );
    return new VoltageGatedChannelNode( type, transportProtein );
  }
  else if ( type === 'potassiumIonVoltageGatedChannel' ) {
    affirm( transportProtein === null || transportProtein instanceof VoltageGatedChannel, 'model for sodiumIonVoltageGatedChannel must be VoltageGatedChannel' );
    return new VoltageGatedChannelNode( type, transportProtein );
  }
  else if ( type === 'sodiumIonLigandGatedChannel' ) {
    affirm( transportProtein === null || transportProtein instanceof LigandGatedChannel, 'model for sodiumIonLigandGatedChannel must be LigandGatedChannel' );
    return new LigandGatedChannelNode( type, transportProtein );
  }
  else if ( type === 'potassiumIonLigandGatedChannel' ) {
    affirm( transportProtein === null || transportProtein instanceof LigandGatedChannel, 'model for potassiumIonLigandGatedChannel must be LigandGatedChannel' );
    return new LigandGatedChannelNode( type, transportProtein );
  }
  else if ( type === 'sodiumPotassiumPump' ) {
    affirm( transportProtein === null || transportProtein instanceof SodiumPotassiumPump, 'model must be a SodiumPotassiumPump' );
    return new SodiumPotassiumPumpNode( transportProtein );
  }
  else if ( type === 'sodiumGlucoseCotransporter' ) {
    affirm( transportProtein === null || transportProtein instanceof SodiumGlucoseCotransporter, 'model for sodiumGlucoseCotransporter must be SodiumGlucoseCotransporter' );
    return new SodiumGlucoseCotransporterNode( transportProtein );
  }
  else {
    // final fallback -> throw
    throw new Error( `Unrecognized transport protein type: ${type}` );
  }
}