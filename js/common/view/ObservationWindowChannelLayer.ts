// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import getChannelNode from './channels/getChannelNode.js';
import SodiumVoltageGatedChannelNode from './channels/SodiumVoltageGatedChannelNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';

/**
 * This layer shows the channels in the observation window. They can be dragged out like a toolbox pattern, which
 * creates ChannelDragNode instances. They also animate based on the model characteristics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ObservationWindowChannelLayer extends Node {
  public constructor( model: MembraneChannelsModel, view: MembraneChannelsScreenView, modelViewTransform: ModelViewTransform2 ) {
    super();

    model.slotContentsChangedEmitter.addListener( () => {
      this.removeAllChildren();

      Array.from( model.getSlotContentsKeys() ).forEach( slot => {
        const type = model.getSlotContents( slot );
        if ( type !== null ) {

          // TODO: Borrowed from ChannelToolNode
          const channelNode = getChannelNode( type );
          channelNode.addInputListener( DragListener.createForwardingListener( event => {

            model.setSlotContents( slot, null );
            view.createFromMouseDrag( event, type, [ channelNode, this ] );
          } ) );

          channelNode.mutate( {
            center: modelViewTransform.modelToViewXY( model.getSlotPosition( slot ), 0 ),
            scale: 1.2
          } );

          this.addChild( channelNode );
        }
      } );
    } );
  }

  public step( dt: number ): void {
    this.children.forEach( child => {
      if ( child instanceof SodiumVoltageGatedChannelNode ) {
        child.setInterpolation( Math.sin( Date.now() / 1000 ) / 2 + 0.5 );
      }
    } );
  }
}

membraneChannels.register( 'ObservationWindowChannelLayer', ObservationWindowChannelLayer );