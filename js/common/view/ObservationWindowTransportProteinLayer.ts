// Copyright 2025, University of Colorado Boulder

/**
 * This layer shows the channels in the observation window. They can be dragged out like a toolbox pattern, which
 * creates TransportProteinDragNode instances. They also animate based on the model characteristics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import voicingUtteranceQueue from '../../../../scenery/js/accessibility/voicing/voicingUtteranceQueue.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';
import ResponsePacket from '../../../../utterance-queue/js/ResponsePacket.js';
import Utterance from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import { getFeatureSetHasProteins } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProtein from '../model/proteins/TransportProtein.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import InteractiveSlotsNode from './InteractiveSlotsNode.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import createTransportProteinNode from './proteins/createTransportProteinNode.js';
import LigandGatedChannelNode from './proteins/LigandGatedChannelNode.js';
import TransportProteinNode from './proteins/TransportProteinNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

export type SlottedNode = {
  slot: Slot;
  node: Node;

  // The index of the transport protein relative to the other proteins in the membrane (not the index of the slot).
  indexProperty: TProperty<number>;
};

export default class ObservationWindowTransportProteinLayer extends Node {

  private readonly record = new Map<TransportProtein, SlottedNode>();
  private readonly interactiveSlotsNode: InteractiveSlotsNode;

  private readonly nameUtterance = new Utterance( { announcerOptions: { cancelOther: false } } );

  // The index of the selected transport protein, out of the existing transport proteins.
  private selectedIndex = 0;

  // A parent for the proteins so that the accessibility attributes like accessibleRoleDescription
  // do not apply to all children of this Node.
  private readonly proteinsNodeParent: Node;

  public constructor(
    public readonly model: MembraneTransportModel,
    view: MembraneTransportScreenView,
    modelViewTransform: ModelViewTransform2
  ) {
    super();

    this.proteinsNodeParent = new Node( {
      tagName: 'div',

      accessibleHeading: MembraneTransportFluent.a11y.cellMembrane.accessibleHeadingStringProperty,

      // An accessible paragraph that describes the membrane potential, number of protein types, and hints to interact when there
      // are no solutes or proteins. It includes string Properties so that it can be localized. Dependency Properties that change
      // strings may not be included in the DerivedProperty since changes to string content will already change the accessibleHelpText.
      accessibleHelpText: new DerivedProperty( [

        // model Properties
        model.hasAnySolutesProperty,
        model.transportProteinCountProperty,

        // string Properties
        MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextNoSolutesProteinsHiddenStringProperty,
        MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextWithSolutesProteinsHiddenStringProperty,
        MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextNoSolutesOrProteins.createProperty( {
          membranePotential: model.membranePotentialProperty
        } ),
        MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextWithSolutesNoProteins.createProperty( {
          membranePotential: model.membranePotentialProperty
        } ),
        MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextWithProteinsNoSolutes.createProperty( {
          membranePotential: model.membranePotentialProperty,
          typeCount: model.transportProteinTypesCountProperty
        } ),
        MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextWithSolutesAndProteins.createProperty( {
          membranePotential: model.membranePotentialProperty,
          typeCount: model.transportProteinTypesCountProperty
        } )
      ], (
        hasAnySolutes,
        transportProteinCount,
        noSolutesProteinsHiddenString,
        withSolutesProteinsHiddenString,
        noSolutesOrProteinsString,
        withSolutesNoProteinsString,
        withProteinsNoSolutesString,
        withSolutesAndProteinsString
      ) => {
        if ( !getFeatureSetHasProteins( model.featureSet ) && !hasAnySolutes ) {
          return noSolutesProteinsHiddenString;
        }
        else if ( !getFeatureSetHasProteins( model.featureSet ) && hasAnySolutes ) {
          return withSolutesProteinsHiddenString;
        }
        else if ( !hasAnySolutes && transportProteinCount === 0 ) {
          return noSolutesOrProteinsString;
        }
        else if ( hasAnySolutes && transportProteinCount === 0 ) {
          return withSolutesNoProteinsString;
        }
        else if ( transportProteinCount > 0 && !hasAnySolutes ) {
          return withProteinsNoSolutesString;
        }
        else {
          return withSolutesAndProteinsString;
        }
      } ),
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT,
      groupFocusHighlight: true,
      focusable: false
    } );
    this.addChild( this.proteinsNodeParent );

    // A node that manages the slots that receive focus while the protein is in its "grabbed" state.
    // When this has focus, the user is deciding which slot to place the protein in. When grabbed,
    // focus is forwarded to components of this Node.
    this.interactiveSlotsNode = new InteractiveSlotsNode(
      model.membraneSlots,
      view,

      // A closure that focuses the leftmost protein, or returns false if there are no proteins
      // This is called when the user deletes a protein from the membrane using the keyboard
      () => {
        if ( model.transportProteinCountProperty.value > 0 ) {
          this.selectedIndex = 0;
          this.updateFocus();
          return true;
        }
        else {
          return false;
        }
      },

      // A closure that updates resets the selected index and makes sure that the correct protein is focusable,
      // without actually changing the focus. Called on interruption.
      () => {
        this.selectedIndex = 0;
        this.updateFocus( false );
      },
      modelViewTransform
    );
    this.addChild( this.interactiveSlotsNode );

    // Add a keyboard listener that manages selection of the transport proteins
    const selectionKeyboardListener = new KeyboardListener( {
      keyStringProperties: MembraneTransportHotkeyData.observationWindowTransportProteinLayer.selection.keyStringProperties,
      enabledProperty: DerivedProperty.not( this.interactiveSlotsNode.grabbedProperty ),
      fire: ( event, keysPressed, listener ) => {
        const proteinCount = model.getFilledSlots().length;
        const delta = MembraneTransportHotkeyData.SELECT_LEFT.includes( keysPressed ) ? -1 : 1;
        const nextIndex = this.selectedIndex + delta;
        this.selectedIndex = Math.min( Math.max( nextIndex, 0 ), proteinCount - 1 );
        this.updateFocus();
      }
    } );
    this.addInputListener( selectionKeyboardListener );

    const grabKeyboardListener = new KeyboardListener( {
      keyStringProperties: MembraneTransportHotkeyData.observationWindowTransportProteinLayer.grabProtein.keyStringProperties,
      fire: ( event, keysPressed, listener ) => {
        if ( !this.interactiveSlotsNode.grabbedProperty.value ) {
          const selectedSlot = this.getTransportProteinNodes()[ this.selectedIndex ].slot;
          affirm( selectedSlot.transportProteinType, 'The selected slot should have a protein type before grabbing.' );
          this.interactiveSlotsNode.grab( selectedSlot, selectedSlot.transportProteinType );

          // remove the protein from the selected slot
          selectedSlot.transportProteinType = null;
        }
      }
    } );
    this.addInputListener( grabKeyboardListener );

    model.membraneSlots.forEach( slot => {
      slot.transportProteinProperty.link( ( transportProtein, oldTransportProtein ) => {

        if ( oldTransportProtein ) {
          const node = this.record.get( oldTransportProtein );
          if ( node ) {
            this.proteinsNodeParent.removeChild( node.node );
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
            center: modelViewTransform.modelToViewXY( slot.position, 0 ),
            cursor: 'pointer'
          } );

          this.proteinsNodeParent.addChild( transportProteinNode );
          const slottedNode = { slot: slot, node: transportProteinNode, indexProperty: new NumberProperty( 0 ) };
          this.record.set( slot.transportProteinProperty.value!, slottedNode );

          // The selected index becomes the index of the new transport protein
          // Notify listeners so that we make sure that the there is at least one focusable protein.
          this.selectedIndex = _.findIndex( this.getTransportProteinNodes(), node => node.node === transportProteinNode );
          this.updateFocus();

          // Make sure that the transport proteins are in the correct reading order.
          this.proteinsNodeParent.pdomOrder = this.getTransportProteinNodes().map( node => node.node );

          // The short name of the transport protein.
          const nameResponseProperty = MembraneTransportFluent.a11y.transportProtein.briefName.createProperty( {
            type: type
          } );

          // The name of the transport protein combined with its index within the membrane.
          const objectResponseProperty = MembraneTransportFluent.a11y.transportProtein.objectResponse.createProperty( {
            proteinIndex: slottedNode.indexProperty,
            proteinCount: model.transportProteinCountProperty
          } );

          // The accessibleName for the PDOM, combine the name response and object response in the requested order.
          const accessibleNameProperty = MembraneTransportFluent.a11y.transportProtein.accessibleName.createProperty( {
            nameResponse: nameResponseProperty,
            objectResponse: objectResponseProperty
          } );

          // Voicing - speak the appropriate response on focus.
          transportProteinNode.focusedProperty.link( focused => {
            if ( focused ) {
              const responsePacket = new ResponsePacket( {
                nameResponse: nameResponseProperty,
                objectResponse: objectResponseProperty
              } );

              // Only added for Voicing because the accessibleName is spoken for Interactive Description when the
              // Node is focused.
              voicingUtteranceQueue.addToBack( this.nameUtterance, responsePacket );
            }

            this.model.focusedProteinProperty.value = focused ? transportProtein : null;
          }, { disposer: transportProteinNode } );

          transportProteinNode.accessibleName = accessibleNameProperty;
          transportProteinNode.addDisposable( accessibleNameProperty, nameResponseProperty, objectResponseProperty, slottedNode.indexProperty );

          // Make sure that the indices of all the proteins are correct after adding/removing proteins
          this.record.forEach( collection => {
            collection.indexProperty.value = this.getTransportProteinNodes().indexOf( collection ) + 1;
          } );

          // Add the highlight after centering the node, since the highlight goes out of bounds and would throw
          // off the centering
          if ( transportProteinNode instanceof LigandGatedChannelNode ) {
            transportProteinNode.addHighlightAsChild();
          }
        }
        else {

          // When a protein is removed, reset the selected index to 0. This ensures that when the selected protein is removed,
          // the left most protein will still be in the traversal order.
          this.selectedIndex = 0;
          this.updateFocus( false );
        }
      } );
    } );
  }

  /**
   * Update the focusable proteins, and optionally place focus on the selected protein. Proteins are made non-focusable
   * so that only the selected protein is in the traversal order.  That way, pressing tab goes to the toolbox rather
   * than to the next protein.
   */
  private updateFocus( setFocus = true ): void {
    const proteinNodes = this.getTransportProteinNodes();

    // Only the selected index is in the traversal order.
    proteinNodes.forEach( ( ( node, index ) => {
      if ( index === this.selectedIndex ) {
        node.node.focusable = true;
        setFocus && node.node.focus();
      }
      else {
        node.node.focusable = false;
      }
    } ) );
  }

  // Return the Nodes in the order that they appear in the slots.
  public getTransportProteinNodes(): SlottedNode[] {
    return Array.from( this.record.values() ).sort( ( a, b ) => {
      return this.model.membraneSlots.indexOf( a.slot ) - this.model.membraneSlots.indexOf( b.slot );
    } );
  }

  public forwardFromKeyboard( slot: Slot, type: TransportProteinType, toolNode: TransportProteinToolNode ): void {
    this.interactiveSlotsNode.grab( slot, type, toolNode );
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