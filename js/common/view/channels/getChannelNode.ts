// Copyright 2025, University of Colorado Boulder

import Node from '../../../../../scenery/js/nodes/Node.js';
import { ChannelType } from '../../model/MembraneChannelsModel.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import SodiumVoltageGatedChannelNode from './SodiumVoltageGatedChannelNode.js';

/**
 * Returns the Node for the given ChannelType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function( type: ChannelType ): Node {
  return type === 'sodiumIonVoltageGatedChannel' ? new SodiumVoltageGatedChannelNode() : new LeakageChannelNode( type );
}