// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneChannels from '../../membraneChannels.js';
import Channel from '../model/channels/Channel.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import Slot from '../model/Slot.js';
import getChannelNode from './channels/getChannelNode.js';
import VoltageGatedChannelNode from './channels/VoltageGatedChannelNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';

/**
 * This layer shows the channels in the observation window. They can be dragged out like a toolbox pattern, which
 * creates ChannelDragNode instances. They also animate based on the model characteristics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export type SlottedNode = {
  slot: Slot;
  node: Node;
};

export default class ObservationWindowChannelLayer extends Node {

  private readonly record = new Map<Channel, SlottedNode>();

  public constructor(
    public readonly model: MembraneChannelsModel,
    view: MembraneChannelsScreenView,
    modelViewTransform: ModelViewTransform2
  ) {
    super();

    model.slots.forEach( slot => {
      slot.channelProperty.link( ( channel, oldChannel ) => {

        if ( oldChannel ) {
          const node = this.record.get( oldChannel );
          if ( node ) {
            this.removeChild( node.node );
            this.record.delete( oldChannel );
          }
        }

        const type = slot.channelType;
        if ( type !== null ) {

          // NOTE: There is similar code in ChannelToolNode (which drags out of the panel).
          const channelNode = getChannelNode( type, slot.channelProperty.value );
          channelNode.addInputListener( DragListener.createForwardingListener( event => {
            slot.clear();
            view.createFromMouseDrag( event, type, slot );
          } ) );

          channelNode.mutate( {
            center: modelViewTransform.modelToViewXY( slot.position, 0 ).plus( channelNode.viewOffset ),
            scale: 1.2,
            cursor: 'pointer'
          } );

          this.addChild( channelNode );
          this.record.set( slot.channelProperty.value!, { slot: slot, node: channelNode } );
        }
      } );
    } );
  }

  // Return in the order of the slots, so that the MembraneGroupSelectView will select them in the correct order
  public getChannelNodes(): SlottedNode[] {
    return Array.from( this.record.values() ).sort( ( a, b ) => {
      return this.model.slots.indexOf( a.slot ) - this.model.slots.indexOf( b.slot );
    } );
  }

  public step( dt: number ): void {
    this.children.forEach( child => {
      if ( child instanceof VoltageGatedChannelNode ) {
        child.step( dt );
      }
    } );
  }
}

membraneChannels.register( 'ObservationWindowChannelLayer', ObservationWindowChannelLayer );