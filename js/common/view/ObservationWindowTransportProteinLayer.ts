// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProtein from '../model/proteins/TransportProtein.js';
import Slot from '../model/Slot.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import getTransportProteinNode from './proteins/getTransportProteinNode.js';
import ProteinNode from './proteins/ProteinNode.js';

/**
 * This layer shows the channels in the observation window. They can be dragged out like a toolbox pattern, which
 * creates TransportProteinDragNode instances. They also animate based on the model characteristics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

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
    super();

    model.slots.forEach( slot => {
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

          // NOTE: There is similar code in TransportProteinToolNode (which drags out of the panel).
          const transportProteinNode = getTransportProteinNode( type, slot.transportProteinProperty.value );
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
        }
      } );
    } );
  }

  // Return in the order of the slots, so that the MembraneGroupSelectView will select them in the correct order
  public getTransportProteinNodes(): SlottedNode[] {
    return Array.from( this.record.values() ).sort( ( a, b ) => {
      return this.model.slots.indexOf( a.slot ) - this.model.slots.indexOf( b.slot );
    } );
  }

  public step( dt: number ): void {
    this.children.forEach( child => {
      if ( child instanceof ProteinNode ) {
        child.step( dt );
      }
    } );
  }
}

membraneTransport.register( 'ObservationWindowTransportProteinLayer', ObservationWindowTransportProteinLayer );