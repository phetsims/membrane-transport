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
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import createTransportProteinNode from './proteins/createTransportProteinNode.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';

const richTextOptions: RichTextOptions = {
  align: 'center',
  font: new PhetFont( 14 ), // TODO (SR): Factor out reused fonts or font sizes

  // Found by inspection. maxHeight required to constrain multi-line text.
  maxWidth: 100,
  maxHeight: 40
};

/**
 * In the "Membrane Transport" accordion box, show a tool icon that can be dragged to create a new transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class TransportProteinToolNode extends VBox {

  // So we can return ChannelDragNodes to its exact location
  public readonly transportProteinNode: Node;

  public constructor( type: TransportProteinType, label: TReadOnlyProperty<string>, accessibleName: TReadOnlyProperty<string>, view: MembraneTransportScreenView ) {

    // NOTE: There is similar code in ObservationWindowChanelLayer (which drags out of the membrane).
    const transportProteinNode = createTransportProteinNode( type, null );

    // Scale down the icon further so there is enough space in the toolbox to fit all controls.
    transportProteinNode.scale( 0.5 );

    transportProteinNode.addInputListener( DragListener.createForwardingListener( event => view.createFromMouseDrag( event, type, this ) ) );

    super( combineOptions<VBoxOptions>( {}, {
      spacing: 3,
      tagName: 'button',
      children: [ transportProteinNode, new RichText( label, richTextOptions ) ],
      cursor: 'pointer',
      accessibleName: accessibleName,
      accessibleHelpText: MembraneTransportStrings.a11y.accordionBoxGroup.toolAccessibleHelpTextStringProperty
    } ) );

    this.addInputListener( {
      click: () => view.forwardFromKeyboard( type, this )
    } );

    this.transportProteinNode = transportProteinNode;
  }
}

membraneTransport.register( 'TransportProteinToolNode', TransportProteinToolNode );