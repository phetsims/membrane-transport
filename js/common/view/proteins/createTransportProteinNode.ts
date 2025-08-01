// Copyright 2025, University of Colorado Boulder

/**
 * Returns a new Node for the given TransportProteinType.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import LigandGatedChannel from '../../model/proteins/LigandGatedChannel.js';
import PotassiumVoltageGatedChannel from '../../model/proteins/PotassiumVoltageGatedChannel.js';
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import SodiumVoltageGatedChannel from '../../model/proteins/SodiumVoltageGatedChannel.js';
import TransportProtein from '../../model/proteins/TransportProtein.js';
import TransportProteinType from '../../model/proteins/TransportProteinType.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import LigandGatedChannelNode from './LigandGatedChannelNode.js';
import PotassiumVoltageGatedChannelNode from './PotassiumVoltageGatedChannelNode.js';
import SodiumGlucoseCotransporterNode from './SodiumGlucoseCotransporterNode.js';
import SodiumPotassiumPumpNode from './SodiumPotassiumPumpNode.js';
import SodiumVoltageGatedChannelNode from './SodiumVoltageGatedChannelNode.js';
import TransportProteinNode from './TransportProteinNode.js';

/**
 * @param type
 * @param transportProtein - If null, a Node will be created without a model. This is useful for icons.
 *                           If a transport protein is provided, the Node will be linked to it. Should mostly be used for
 *                           proteins that are in the membrane, ready to interact with solutes.
 */
export default function createTransportProteinNode( type: TransportProteinType, transportProtein: TransportProtein | null ): TransportProteinNode {
  if ( type === 'sodiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type, transportProtein );
  }
  else if ( type === 'potassiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type, transportProtein );
  }
  else if ( type === 'sodiumIonVoltageGatedChannel' ) {
    affirm( transportProtein === null || transportProtein instanceof SodiumVoltageGatedChannel, 'model for sodiumIonVoltageGatedChannel must be VoltageGatedChannel' );
    return new SodiumVoltageGatedChannelNode( transportProtein );
  }
  else if ( type === 'potassiumIonVoltageGatedChannel' ) {
    affirm( transportProtein === null || transportProtein instanceof PotassiumVoltageGatedChannel, 'model for sodiumIonVoltageGatedChannel must be VoltageGatedChannel' );
    return new PotassiumVoltageGatedChannelNode( transportProtein );
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