// Copyright 2025, University of Colorado Boulder

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel, { ChannelType } from '../model/MembraneChannelsModel.js';
import getChannelNode from './channels/getChannelNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';

const richTextOptions: RichTextOptions = { align: 'center', font: new PhetFont( 12 ) };
const vboxOptions: VBoxOptions = {
  spacing: 3,
  tagName: 'button',
  descriptionTagName: 'p',
  descriptionContent: 'Press enter to add the protein to the membrane' // TODO: i18n
};

/**
 * In the "Membrane Channels" accordion box, show a tool icon that can be dragged to create a new channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ChannelToolNode extends VBox {
  public constructor( type: ChannelType, label: TReadOnlyProperty<string>, model: MembraneChannelsModel, view: MembraneChannelsScreenView ) {

    // Space/Enter activates and adds to Membrane (LEFTMOST, first available spot).
    const clickToAdd = () => {
      return {
        click: () => {

          // TODO: If the membrane is full, this incorrectly pulls one off the membrane
          view.forwardFromKeyboard( type, this );
        }
      };
    };

    const channelNode = getChannelNode( type );
    channelNode.addInputListener( DragListener.createForwardingListener( event => view.createFromMouseDrag( event, type, [ channelNode, this ] ) ) );

    super( combineOptions<VBoxOptions>( {}, vboxOptions, {
      children: [ channelNode, new RichText( label, richTextOptions ) ],
      cursor: 'pointer'
    } ) );
    this.addInputListener( clickToAdd() );
  }
}

membraneChannels.register( 'ChannelToolNode', ChannelToolNode );