// Copyright 2025, University of Colorado Boulder

import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import ChannelType from '../../model/ChannelType.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import SodiumVoltageGatedChannelNode from './SodiumVoltageGatedChannelNode.js';

/**
 * Returns the Node for the given ChannelType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function( type: ChannelType ): Node {
  return type === 'sodiumIonVoltageGatedChannel' ? new SodiumVoltageGatedChannelNode() :
         type === 'potassiumIonLeakageChannel' ? new LeakageChannelNode( type ) :
         type === 'sodiumIonLeakageChannel' ? new LeakageChannelNode( type ) :
         type === 'sodiumIonLigandGatedChannel' ? new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,0,255,0.2)', stroke: 'black', lineWidth: 1 } ) :
         type === 'potassiumIonLigandGatedChannel' ? new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,255,0,0.2)', stroke: 'black', lineWidth: 1 } ) :
         type === 'sodiumPotassiumPump' ? new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,0,255,0.2)', stroke: 'black', lineWidth: 1 } ) :
         type === 'potassiumIonActiveGatedChannel' ? new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,255,0,0.2)', stroke: 'black', lineWidth: 1 } ) :
           // final fallback -> throw
         ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
}