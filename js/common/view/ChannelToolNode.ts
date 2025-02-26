// Copyright 2025, University of Colorado Boulder

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsModel, { ChannelType } from '../model/MembraneChannelsModel.js';
import getChannelNode from './channels/getChannelNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';

const richTextOptions: RichTextOptions = { align: 'center', font: new PhetFont( 12 ) };

/**
 * In the "Membrane Channels" accordion box, show a tool icon that can be dragged to create a new channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ChannelToolNode extends VBox {
  public constructor( type: ChannelType, label: TReadOnlyProperty<string>, model: MembraneChannelsModel, view: MembraneChannelsScreenView ) {

    const channelNode = getChannelNode( type );
    channelNode.addInputListener( DragListener.createForwardingListener( event => view.createFromMouseDrag( event, type, this ) ) );

    super( combineOptions<VBoxOptions>( {}, {
      spacing: 3,
      tagName: 'button', // TODO: Make sure we see the accessibleHelpText on the ChannelToolNode
      children: [ channelNode, new RichText( label, richTextOptions ) ],
      cursor: 'pointer',
      accessibleName: type === 'sodiumIonLeakageChannel' ? MembraneChannelsStrings.sodiumIonNaPlusLeakageStringProperty :
                      type === 'potassiumIonLeakageChannel' ? MembraneChannelsStrings.potassiumIonKPlusLeakageStringProperty :
                      MembraneChannelsStrings.sodiumIonNaPlusVoltageGatedStringProperty,

      accessibleHelpText: MembraneChannelsStrings.grabToPullProteinToTheMembraneStringProperty
    } ) );

    this.addInputListener( {
      click: () => {
        view.forwardFromKeyboard( type, this );
      }
    } );
  }
}

membraneChannels.register( 'ChannelToolNode', ChannelToolNode );