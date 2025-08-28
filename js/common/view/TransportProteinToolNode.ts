// Copyright 2025, University of Colorado Boulder

/**
 * In the TransportProteinPanel toolbox, show a tool icon that can be dragged to create a new transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Voicing, { VoicingOptions } from '../../../../scenery/js/accessibility/voicing/Voicing.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import createTransportProteinNode from './proteins/createTransportProteinNode.js';

const richTextOptions: RichTextOptions = {
  align: 'center',
  font: MembraneTransportConstants.FONT,

  // Found by inspection. maxHeight required to constrain multi-line text.
  maxWidth: 85,
  maxHeight: 40
};

export default class TransportProteinToolNode extends Voicing( VBox ) {

  // So we can return ChannelDragNodes to its exact location
  public readonly transportProteinNode: Node;

  public constructor(
    type: TransportProteinType,
    label: TReadOnlyProperty<string>,
    accessibleName: TReadOnlyProperty<string>,
    createFromMouseDrag: ( event: PressListenerEvent, type: TransportProteinType, view: TransportProteinToolNode ) => void,
    forwardFromKeyboard: ( type: TransportProteinType, view: TransportProteinToolNode ) => void
  ) {

    // NOTE: There is similar code in ObservationWindowChanelLayer (which drags out of the membrane).
    const transportProteinNode = createTransportProteinNode( type, null );

    // Scale down the icon further so there is enough space in the toolbox to fit all controls.
    transportProteinNode.scale( 0.5 );
    transportProteinNode.addInputListener( DragListener.createForwardingListener( event => {
      createFromMouseDrag( event, type, this );
      this.voicingSpeakNameResponse();
    } ) );

    super( combineOptions<VBoxOptions & VoicingOptions>( {}, {
      spacing: -3,
      tagName: 'button',
      children: [ transportProteinNode, new RichText( label, richTextOptions ) ],
      cursor: 'pointer',
      accessibleName: accessibleName,
      voicingNameResponse: accessibleName,
      voicingHintResponse: MembraneTransportFluent.a11y.transportProtein.voicingHintResponseStringProperty
    } ) );

    this.addInputListener( {
      click: () => forwardFromKeyboard( type, this )
    } );

    this.transportProteinNode = transportProteinNode;
  }
}

membraneTransport.register( 'TransportProteinToolNode', TransportProteinToolNode );