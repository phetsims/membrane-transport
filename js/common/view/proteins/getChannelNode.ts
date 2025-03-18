// Copyright 2025, University of Colorado Boulder

import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import Channel from '../../model/proteins/Channel.js';
import ChannelType from '../../model/proteins/ChannelType.js';
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
 * Returns the Node for the given ChannelType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function( type: ChannelType, channel: Channel | null ): ProteinNode {
  if ( type === 'sodiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type );
  }
  else if ( type === 'potassiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type );
  }
  else if ( type === 'sodiumIonVoltageGatedChannel' ) {
    affirm( channel === null || channel instanceof VoltageGatedChannel, 'model for sodiumIonVoltageGatedChannel must be VoltageGatedChannel' );
    return new VoltageGatedChannelNode( type, channel );
  }
  else if ( type === 'potassiumIonVoltageGatedChannel' ) {
    affirm( channel === null || channel instanceof VoltageGatedChannel, 'model for sodiumIonVoltageGatedChannel must be VoltageGatedChannel' );
    return new VoltageGatedChannelNode( type, channel );
  }
  else if ( type === 'sodiumIonLigandGatedChannel' ) {
    affirm( channel === null || channel instanceof LigandGatedChannel, 'model for sodiumIonLigandGatedChannel must be LigandGatedChannel' );
    return new LigandGatedChannelNode( type, channel );
  }
  else if ( type === 'potassiumIonLigandGatedChannel' ) {
    affirm( channel === null || channel instanceof LigandGatedChannel, 'model for potassiumIonLigandGatedChannel must be LigandGatedChannel' );
    return new LigandGatedChannelNode( type, channel );
  }
  else if ( type === 'sodiumPotassiumPump' ) {
    affirm( channel === null || channel instanceof SodiumPotassiumPump, 'model must be a SodiumPotassiumPump' );
    return new SodiumPotassiumPumpNode( channel );
  }
  else if ( type === 'sodiumGlucoseCotransporter' ) {
    affirm( channel === null || channel instanceof SodiumGlucoseCotransporter, 'model for sodiumGlucoseCotransporter must be SodiumGlucoseCotransporter' );
    return new SodiumGlucoseCotransporterNode( channel );
  }
  else {
    // final fallback -> throw
    throw new Error( `Unrecognized channel type: ${type}` );
  }
}