// Copyright 2025, University of Colorado Boulder

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import ChannelType from '../model/proteins/ChannelType.js';
import getChannelNode from './proteins/getChannelNode.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';

const richTextOptions: RichTextOptions = {
  align: 'center',
  font: new PhetFont( 12 ),

  // Found by inspection. maxHeight required to constrain multi-line text.
  maxWidth: 100,
  maxHeight: 40
};

/**
 * In the "Membrane Transport" accordion box, show a tool icon that can be dragged to create a new channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ChannelToolNode extends VBox {

  // So we can return ChannelDragNodes to its exact location
  public readonly channelNode: Node;

  public constructor( type: ChannelType, label: TReadOnlyProperty<string>, accessibleName: TReadOnlyProperty<string>, view: MembraneTransportScreenView ) {

    // NOTE: There is similar code in ObservationWindowChanelLayer (which drags out of the membrane).
    const channelNode = getChannelNode( type, null );
    channelNode.setScaleMagnitude( 0.7 );
    channelNode.addInputListener( DragListener.createForwardingListener( event => view.createFromMouseDrag( event, type, this ) ) );

    super( combineOptions<VBoxOptions>( {}, {
      spacing: 3,
      tagName: 'button',
      children: [ channelNode, new RichText( label, richTextOptions ) ],
      cursor: 'pointer',
      accessibleName: accessibleName,
      accessibleHelpText: MembraneTransportStrings.a11y.accordionBoxGroup.toolAccessibleHelpTextStringProperty
    } ) );

    this.addInputListener( {
      click: () => view.forwardFromKeyboard( type, this )
    } );

    this.channelNode = channelNode;
  }
}

membraneTransport.register( 'ChannelToolNode', ChannelToolNode );