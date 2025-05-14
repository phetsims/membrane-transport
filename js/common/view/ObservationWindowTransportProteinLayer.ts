// Copyright 2025, University of Colorado Boulder

/**
 * This layer shows the channels in the observation window. They can be dragged out like a toolbox pattern, which
 * creates TransportProteinDragNode instances. They also animate based on the model characteristics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProtein from '../model/proteins/TransportProtein.js';
import Slot from '../model/Slot.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import createTransportProteinNode from './proteins/createTransportProteinNode.js';
import LigandGatedChannelNode from './proteins/LigandGatedChannelNode.js';
import TransportProteinNode from './proteins/TransportProteinNode.js';

export type SlottedNode = {
  slot: Slot;
  node: Node;
};

export default class ObservationWindowTransportProteinLayer extends Node {

  private readonly record = new Map<TransportProtein, SlottedNode>();

  public constructor(
    public readonly model: MembraneTransportModel,
    view: MembraneTransportScreenView,
    modelViewTransform: ModelViewTransform2
  ) {
    super( {
      groupFocusHighlight: true
    } );

    // The index of the selected transport protein
    const selectedIndexProperty = new Property( 0 );

    // Add a keyboard listener that manages selection of the transport proteins
    const selectionKeyboardListener = new KeyboardListener( {
      keys: [ 'arrowLeft', 'arrowRight' ],
      fire: ( event, keysPressed, listener ) => {
        const proteinCount = model.getFilledSlots().length;

        const delta = keysPressed === 'arrowLeft' ? -1 : 1;
        const nextIndex = selectedIndexProperty.value + delta;
        selectedIndexProperty.value = Math.min( Math.max( nextIndex, 0 ), proteinCount - 1 );
      }
    } );
    this.addInputListener( selectionKeyboardListener );

    const grabKeyboardListener = new KeyboardListener( {
      keys: [ 'enter', 'space' ],
      fire: ( event, keysPressed, listener ) => {
        console.log( 'GRABBED PROTEIN' );
      }
    } );
    this.addInputListener( grabKeyboardListener );

    selectedIndexProperty.link( selectedIndex => {
      const proteinNodes = this.getTransportProteinNodes();

      // Only the selected index is in the traversal order.
      proteinNodes.forEach( ( ( node, index ) => {
        if ( index === selectedIndex ) {
          node.node.focusable = true;
          node.node.focus();
        }
        else {
          node.node.focusable = false;
        }
      } ) );
    } );

    model.membraneSlots.forEach( slot => {
      slot.transportProteinProperty.link( ( transportProtein, oldTransportProtein ) => {

        if ( oldTransportProtein ) {
          const node = this.record.get( oldTransportProtein );
          if ( node ) {
            this.removeChild( node.node );
            node.node.dispose();
            this.record.delete( oldTransportProtein );
          }
        }

        const type = slot.transportProteinType;
        if ( type !== null ) {

          affirm( transportProtein, 'There should be a transportProtein model if there is a type' );

          // NOTE: There is similar code in TransportProteinToolNode (which drags out of the panel).
          const transportProteinNode = createTransportProteinNode( type, slot.transportProteinProperty.value );
          transportProteinNode.addInputListener( DragListener.createForwardingListener( event => {
            slot.clear();
            view.createFromMouseDrag( event, type, slot );
          } ) );

          transportProteinNode.mutate( {
            center: modelViewTransform.modelToViewXY( slot.position, 0 ).plus( transportProteinNode.viewOffset ),
            cursor: 'pointer'
          } );

          this.addChild( transportProteinNode );
          this.record.set( slot.transportProteinProperty.value!, { slot: slot, node: transportProteinNode } );

          // The selected index becomes the index of the new transport protein
          // Notify listeners so that we make sure that the there is at least one focusable protein.
          selectedIndexProperty.value = _.findIndex( this.getTransportProteinNodes(), node => node.node === transportProteinNode );
          selectedIndexProperty.notifyListenersStatic();

          // Make sure that the transport proteins are in the correct reading order.
          this.pdomOrder = this.getTransportProteinNodes().map( node => node.node );

          // Set up listeners that update the accessible name of the transport protein
          const accessibleNameProperty = MembraneTransportFluent.a11y.transportProtein.accessibleNamePattern.createProperty( {
            openOrClosed: transportProtein.openOrClosedProperty,
            proteinIndex: selectedIndexProperty.value + 1, // index is the value on addition, not the current Property value
            proteinCount: model.transportProteinCountProperty,
            type: type
          } );
          transportProteinNode.accessibleName = accessibleNameProperty;
          transportProteinNode.addDisposable( accessibleNameProperty );

          // Add the highlight after centering the node, since the highlight goes out of bounds and would throw
          // off the centering
          if ( transportProteinNode instanceof LigandGatedChannelNode ) {
            transportProteinNode.addHighlightAsChild();
          }
        }
      } );
    } );
  }

  // Return in the order of the slots, so that the MembraneGroupSelectView will select them in the correct order
  public getTransportProteinNodes(): SlottedNode[] {
    return Array.from( this.record.values() ).sort( ( a, b ) => {
      return this.model.membraneSlots.indexOf( a.slot ) - this.model.membraneSlots.indexOf( b.slot );
    } );
  }

  public step( dt: number ): void {
    this.children.forEach( child => {
      if ( child instanceof TransportProteinNode ) {
        child.step( dt );
      }
    } );
  }
}

membraneTransport.register( 'ObservationWindowTransportProteinLayer', ObservationWindowTransportProteinLayer );