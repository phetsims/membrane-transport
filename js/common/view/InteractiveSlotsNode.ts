// Copyright 2025, University of Colorado Boulder

/**
 * Part of the drag operation for keyboard input of the proteins in the membrane. When a protein is grabbed,
 * this Node becomes active and manages selection of a slot to place the protein.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import GroupFocusListener from '../../../../scenery/js/accessibility/GroupFocusListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

const MODEL_DRAG_VERTICAL_OFFSET = 10; // The vertical offset of the drag node from the slot
const OFF_MEMBRANE_VERTICAL_OFFSET = 50; // The vertical offset of the drag node from the membrane when off-membrane
const OFF_MEMBRANE_HORIZONTAL_OFFSET = 10;

export default class InteractiveSlotsNode extends Node {

  // The index of the slot that is currently selected. If the user activates the slot, the selected protein type will be placed there.
  private selectedIndex: number | 'offMembrane' = 0;

  // Is this interaction in a "grabbed" state? If so, this Node is active and the user is selecting a slot to place the protein.
  public readonly grabbedProperty: TProperty<boolean>;

  // The protein type that was selected on grab.
  public selectedType: TransportProteinType | null;

  // A reference to the grabbed icon Node that indicates visually the type and position of the grabbed protein.
  private grabbedNode: TransportProteinDragNode | null = null;

  // Highlight regions for the target areas, including the off-membrane site
  private rectangles: Node[] = [];

  /**
   * @param slots - Slots available to place a protein
   * @param view - The view so that we can create new icons for dragging.
   * @param focusLeftmostProteinNode - A function that focuses the leftmost protein node, if any, or returns false
   * @param updateFocusForSelectables - A function that updates which proteins are focusable when in the 'select' state.
   * @param modelViewTransform
   */
  public constructor(
    private readonly slots: Slot[],
    private readonly view: Pick<MembraneTransportScreenView, 'createFromKeyboard' | 'getTransportProteinToolNode'>,
    focusLeftmostProteinNode: () => boolean,
    updateFocusForSelectables: () => void,
    modelViewTransform: ModelViewTransform2
  ) {
    super( {
      tagName: 'div',
      groupFocusHighlight: true,
      accessibleRoleDescription: 'sortable'
    } );

    // A focusable Node that contains the accessible content for the interaction.
    const createTestRectangle = ( accessibleNameProperty: TReadOnlyProperty<string>, modelX: number ): Rectangle => {

      // It was found that the accessible name and role information requires AccessibleDraggableOptions
      // to be on the focusable element, see https://github.com/phetsims/membrane-transport/issues/97.
      return new Rectangle( 0, 0, 20, 20, combineOptions<RectangleOptions>( {}, AccessibleDraggableOptions, {
        fill: 'red',
        center: modelViewTransform.modelToViewXY( modelX, MODEL_DRAG_VERTICAL_OFFSET ),

        // pdom
        accessibleRoleDescription: 'protein',
        accessibleName: accessibleNameProperty
      } ) );
    };

    // Draw a rectangle centered at each slot, vertically above them.
    slots.forEach( ( slot, index ) => {

      // Slots are persistent and this should not need to be disposed.
      const accessibleNameProperty = new DerivedProperty( [
        slot.transportProteinProperty
      ], transportProtein => {

        let proteinName = 'empty';
        if ( transportProtein ) {
          proteinName = MembraneTransportFluent.a11y.transportProteinBriefName.format( {
            type: transportProtein.type
          } );
        }

        // TODO, i18n, see https://github.com/phetsims/membrane-transport/issues/97. I could not figure out how to use the YAML in main.
        return `Above slot ${index + 1} of ${slots.length}, ${proteinName}`;
      } );

      const rect = createTestRectangle( accessibleNameProperty, slot.position );

      this.rectangles.push( rect );
      this.addChild( rect );
    } );

    // Add a rectangle for the off-membrane state
    const offMembraneRect = createTestRectangle( new StringProperty( 'Off membrane' ), MembraneTransportConstants.MEMBRANE_BOUNDS.width / 2 - OFF_MEMBRANE_HORIZONTAL_OFFSET );
    this.rectangles.push( offMembraneRect );
    this.addChild( offMembraneRect );

    this.grabbedProperty = new BooleanProperty( false );
    this.selectedType = null;

    this.visibleProperty = this.grabbedProperty;

    // When grabbed, move focus to the rectangle with the selected index.
    this.grabbedProperty.link( grabbed => {
      if ( grabbed ) {
        affirm( typeof this.selectedIndex === 'number', 'If grabbed, selectedIndex should be a number.' );
        const rect = this.rectangles[ this.selectedIndex ];
        rect.focusable = true;
        rect.focus();
      }
    } );

    // Add a keyboard listener that manages selection of the transport proteins
    const selectionKeyboardListener = new KeyboardListener( {
      keys: [ 'arrowLeft', 'arrowRight', 'a', 'd' ],
      enabledProperty: this.grabbedProperty,
      fire: ( event, keysPressed, listener ) => {
        const allSlotsCount = slots.length;
        const delta = [ 'arrowLeft', 'a' ].includes( keysPressed ) ? -1 : 1;

        // If off the membrane, we can only move to the left, and the next index should be slots.length;
        const originalIndex = this.selectedIndex;
        if ( this.selectedIndex === 'offMembrane' ) {
          if ( delta < 0 ) {
            this.selectedIndex = allSlotsCount - 1;
          }
        }
        else {
          const nextIndex = this.selectedIndex + delta;

          // If at the right edge and trying to move further right, move off the membrane
          if ( nextIndex === allSlotsCount ) {
            this.selectedIndex = 'offMembrane';
          }
          else {

            // otherwise, bound to the left edge of the membrane
            this.selectedIndex = Math.max( nextIndex, 0 );
          }
        }
        if ( this.selectedIndex !== originalIndex ) {

          // If the selected index changed, update the focus
          this.updateFocus();
        }
      }
    } );
    this.addInputListener( selectionKeyboardListener );

    const releaseKeyboardListener = new KeyboardListener( {
      keys: [ 'enter', 'space' ],
      fireOnDown: false,
      fire: ( event, keysPressed, listener ) => {
        if ( this.grabbedProperty.value ) {

          affirm( this.grabbedNode, 'There needs to be a grabbedNode when releasing.' );
          const grabbedType = this.grabbedNode.type;
          const origin = this.grabbedNode.origin;
          const selectedType = this.selectedType;
          const selectedIndex = this.selectedIndex;

          // Release first to update grabbedProperty. Then add a new transport protein, so that listeners in the parent Node
          // can manage focus on protein Node addition.
          this.release();

          if ( selectedIndex === 'offMembrane' ) {

            // NEXT STEPS: Turn this into animation
            const toolNode = view.getTransportProteinToolNode( grabbedType );
            toolNode.focus();
          }
          else {
            const selectedSlot = this.slots[ selectedIndex ];

            // If the selected slot already has a transport protein, the proteins will be "swapped" -
            // move the current protein to the slot that was originally selected.
            if ( selectedSlot.isFilled() ) {
              const currentType = selectedSlot.transportProteinType;
              affirm( currentType, 'If filled, there must be a transport protein type.' );
              const originSlot = origin;
              affirm( originSlot, 'If grabbed, there must be an origin slot.' );

              // If the origin is a slot, then we can swap the proteins. If the origin was the toolbar, then
              // the protein will simply be replaced.
              if ( originSlot instanceof Slot ) {
                originSlot.transportProteinType = currentType;
              }
            }

            // Place the transport protein in the selected slot
            affirm( selectedType, 'If grabbed, there must be a selected type.' );
            selectedSlot.transportProteinType = selectedType;
          }
        }
      }
    } );
    this.addInputListener( releaseKeyboardListener );

    const deleteKeyboardListener = new KeyboardListener( {
      keys: [ 'backspace', 'delete' ],
      enabledProperty: this.grabbedProperty,
      fire: ( event, keysPressed, listener ) => {
        affirm( this.grabbedNode, 'We must have a node to delete' );
        const type = this.grabbedNode.type;

        this.release();

        const success = focusLeftmostProteinNode();
        if ( !success ) {
          this.view.getTransportProteinToolNode( type ).focus();
        }
      }
    } );
    this.addInputListener( deleteKeyboardListener );

    // Return the protein to its origin when pressing escape to cancel.
    const escapeKeyboardListener = new KeyboardListener( {
      keys: [ 'escape' ],
      enabledProperty: this.grabbedProperty,
      fire: () => {
        affirm( this.grabbedNode, 'We must have a Node if this listener is firing.' );
        const origin = this.grabbedNode.origin;
        const selectedType = this.selectedType;

        this.release();

        if ( origin instanceof TransportProteinToolNode ) {

          // Return focus to the toolbar
          origin.focus();
        }
        else {

          // Restore the selectedType to the origin slot.
          origin.transportProteinType = selectedType;
        }
      }
    } );
    this.addInputListener( escapeKeyboardListener );

    // If focus leaves the group because the user used a mouse, release the interaction.
    const groupFocusListener = new GroupFocusListener( this );
    this.addInputListener( groupFocusListener );
    groupFocusListener.focusInGroupProperty.link( focus => {
      if ( !focus && this.grabbedProperty.value ) {
        this.release();

        // After releasing, make sure that the correct protein is in the traversal order according to
        // the selected index in the 'select' state.
        updateFocusForSelectables();
      }
    } );
  }

  /**
   * Releases this interaction, putting the interaction back into 'select' mode. State variables are reset.
   */
  private release(): void {
    affirm( this.grabbedNode, 'grabbedNode was expected on release.' );
    this.grabbedNode.dispose();
    this.grabbedNode = null;

    this.selectedType = null;
    this.selectedIndex = 0;

    this.grabbedProperty.value = false;

    // TODO: i18n, see #97
    this.addAccessibleResponse( 'Released' );
  }

  // The selected index is controlled by the keyboard listener in the parent Node.
  private updateFocus(): void {

    // Move the grabbedNode icon to the selected slot
    if ( this.grabbedNode ) {
      if ( this.selectedIndex === 'offMembrane' ) {
        this.grabbedNode.setModelPosition( new Vector2( MembraneTransportConstants.MEMBRANE_BOUNDS.width / 2 - OFF_MEMBRANE_HORIZONTAL_OFFSET, OFF_MEMBRANE_VERTICAL_OFFSET ) );
      }
      else {
        const selectedSlot = this.slots[ this.selectedIndex ];
        this.grabbedNode.setModelPosition( new Vector2( selectedSlot.position, MODEL_DRAG_VERTICAL_OFFSET ) );
      }
    }

    // Only the selected index is in the traversal order. Make the next rectangle focusable before removing others
    // from the traversal order so that this operation doesn't trigger a blur event. We need to watch for that
    // important event to release/interrupt the interaction.
    const removeFocusRectangles: Node[] = [];
    this.rectangles.forEach( ( ( rect, index ) => {
      if ( index === this.selectedIndex || ( this.selectedIndex === 'offMembrane' && index === this.rectangles.length - 1 ) ) {
        rect.focusable = true;
        rect.focus();
      }
      else {
        removeFocusRectangles.push( rect );
      }
    } ) );
    removeFocusRectangles.forEach( rect => rect.setFocusable( false ) );
  }

  /**
   * Begin the 'grabbed' state. The slot is the slot that the user will be "over" when they begin the operation.
   * This should be the selected slot from the select interaction.
   *
   * @param slot - the slot that this protein was grabbed from
   * @param type - the type of transport protein that is being grabbed since it may not always be assigned to the slot
   *               when forwarding from the toolbar.
   * @param toolNode - If the protein came from the toolbox, this is set to support swap/return operations.
   */
  public grab( slot: Slot, type: TransportProteinType, toolNode?: TransportProteinToolNode ): void {
    this.grabbedProperty.value = true;
    this.selectedType = type;
    this.selectedIndex = this.slots.indexOf( slot );
    this.updateFocus();

    this.grabbedNode = this.view.createFromKeyboard( type, slot, toolNode );

    // TODO: i18n, see #97
    this.addAccessibleResponse( 'Grabbed.' );
  }
}

membraneTransport.register( 'InteractiveSlotsNode', InteractiveSlotsNode );