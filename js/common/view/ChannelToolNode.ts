// Copyright 2025, University of Colorado Boulder

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
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
// However, do not move the focus to the newly created item. Keyboard focus should remain in the toolbox so the
// user can add several channels. BF 2025/02/12
    const clickToAdd = ( channelType: ChannelType ) => {
      return {
        click: ( a: SceneryEvent ) => {

          view.createFromKeyboard( channelType, [ channelNode, this ] );
        }
      };
    };

    const channelNode = getChannelNode( type );
    channelNode.addInputListener( DragListener.createForwardingListener( event => view.createMembraneChannelNode( event, type, [ channelNode, this ] ) ) );

    super( combineOptions<VBoxOptions>( {}, vboxOptions, {
      children: [ channelNode, new RichText( label, richTextOptions ) ]
    } ) );
    this.addInputListener( clickToAdd( 'sodiumIonLeakageChannel' ) );
  }
}

membraneChannels.register( 'ChannelToolNode', ChannelToolNode );