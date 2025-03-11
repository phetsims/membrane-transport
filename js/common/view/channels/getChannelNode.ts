// Copyright 2025, University of Colorado Boulder

import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Channel from '../../model/Channel.js';
import ChannelType from '../../model/ChannelType.js';
import LigandGatedChannel from '../../model/LigandGatedChannel.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import LigandGatedChannelNode from './LigandGatedChannelNode.js';
import VoltageGatedChannelNode from './VoltageGatedChannelNode.js';

/**
 * Returns the Node for the given ChannelType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function( type: ChannelType, channel: Channel | null ): Node {
  if ( type === 'sodiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type );
  }
  else if ( type === 'potassiumIonLeakageChannel' ) {
    return new LeakageChannelNode( type );
  }
  else if ( type === 'sodiumIonVoltageGatedChannel' ) {
    return new VoltageGatedChannelNode( type, channel );
  }
  else if ( type === 'potassiumIonVoltageGatedChannel' ) {
    return new VoltageGatedChannelNode( type, channel );
  }
  else if ( type === 'sodiumIonLigandGatedChannel' ) {
    if ( channel !== null ) {

      // TODO: These affirms likely belong in the model
      affirm( channel instanceof LigandGatedChannel, 'model for sodiumIonLigandGatedChannel must be LigandGatedChannel' );
    }
    return new LigandGatedChannelNode( type, channel );
  }
  else if ( type === 'potassiumIonLigandGatedChannel' ) {
    if ( channel !== null ) {
      affirm( channel instanceof LigandGatedChannel, 'model for potassiumIonLigandGatedChannel must be LigandGatedChannel' );
    }
    return new LigandGatedChannelNode( type, channel );
  }
  else if ( type === 'sodiumPotassiumPump' ) {
    return new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,0,255,0.2)', stroke: 'black', lineWidth: 1 } );
  }
  else if ( type === 'sodiumGlucoseCotransporter' ) {
    return new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,255,0,0.2)', stroke: 'black', lineWidth: 1 } );
  }
  else {
    // final fallback -> throw
    throw new Error( `Unrecognized channel type: ${type}` );
  }
}