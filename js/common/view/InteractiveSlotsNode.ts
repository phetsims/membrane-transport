// Copyright 2025, University of Colorado Boulder

/**
 * Part of the drag operation for keyboard input of the proteins in the membrane. When a protein is grabbed,
 * this Node becomes active and manages selection of a slot to place the protein.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../membraneTransport.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

const MODEL_DRAG_VERTICAL_OFFSET = 10; // The vertical offset of the drag node from the slot

export default class InteractiveSlotsNode extends Node {

  // The index of the slot that is currently selected. If the user activates the slot, the selected protein type will be placed there.
  private selectedIndexProperty: Property<number>;

  // Is this interaction in a "grabbed" state? If so, this Node is active and the user is selecting a slot to place the protein.
  public grabbedProperty: TProperty<boolean>;

  // The protein type that was selected on grab.
  public selectedType: TransportProteinType | null;

  // A reference to the grabbed icon Node that indicates visually the type and position of the grabbed protein.
  private grabbedNode: TransportProteinDragNode | null = null;

  /**
   * @param slots - Slots available to place a protein
   * @param createDragNode - A function that creates the icon Node for the protein being dragged and adds it to the view.
   * @param modelViewTransform
   */
  public constructor(
    private readonly slots: Slot[],
    private readonly createDragNode: ( type: TransportProteinType, slot: Slot, toolNode?: TransportProteinToolNode ) => TransportProteinDragNode,
    modelViewTransform: ModelViewTransform2
  ) {
    super();

    const rectangles: Node[] = [];

    // Draw a rectangle centered at each slot, vertically above them.
    slots.forEach( ( slot, index ) => {

      // Slots are persistent and this should not need to be disposed.
      const accessibleNameProperty = new DerivedProperty( [
        slot.transportProteinProperty
      ], transportProtein => {

        // TODO, i18n, see https://github.com/phetsims/membrane-transport/issues/97
        return `Above slot ${index + 1} of ${slots.length}, ${transportProtein ? transportProtein.type : 'empty'}`;
      } );

      const rect = new Rectangle( 0, 0, 20, 20, {
        fill: 'red',
        center: modelViewTransform.modelToViewXY( slot.position, MODEL_DRAG_VERTICAL_OFFSET ),

        // pdom
        tagName: 'div',
        accessibleName: accessibleNameProperty
      } );
      rectangles.push( rect );
      this.addChild( rect );
    } );

    this.selectedIndexProperty = new Property( 0 );
    this.grabbedProperty = new BooleanProperty( false );
    this.selectedType = null;

    this.visibleProperty = this.grabbedProperty;

    // When grabbed, move focus to the rectangle with the selected index.
    this.grabbedProperty.link( grabbed => {
      if ( grabbed ) {
        const selectedIndex = this.selectedIndexProperty.value;
        const rect = rectangles[ selectedIndex ];
        rect.focusable = true;
        rect.focus();
      }
    } );

    // The selected index is controlled by the keyboard listener in the parent Node.
    this.selectedIndexProperty.link( selectedIndex => {

      // Move the grabbedNode icon to the selected slot
      if ( this.grabbedNode ) {
        const selectedSlot = this.slots[ selectedIndex ];
        this.grabbedNode.setModelPosition( new Vector2( selectedSlot.position, MODEL_DRAG_VERTICAL_OFFSET ) );
      }

      // Only the selected index is in the traversal order.
      rectangles.forEach( ( ( rect, index ) => {
        if ( index === selectedIndex ) {
          rect.focusable = true;
          rect.focus();
        }
        else {
          rect.focusable = false;
        }
      } ) );
    } );

    // Add a keyboard listener that manages selection of the transport proteins
    const selectionKeyboardListener = new KeyboardListener( {
      keys: [ 'arrowLeft', 'arrowRight' ],
      enabledProperty: this.grabbedProperty,
      fire: ( event, keysPressed, listener ) => {
        const allSlotsCount = slots.length;
        const delta = keysPressed === 'arrowLeft' ? -1 : 1;
        const nextIndex = this.selectedIndexProperty.value + delta;
        this.selectedIndexProperty.value = Math.min( Math.max( nextIndex, 0 ), allSlotsCount - 1 );
      }
    } );
    this.addInputListener( selectionKeyboardListener );

    const releaseKeyboardListener = new KeyboardListener( {
      keys: [ 'enter', 'space' ],
      fire: ( event, keysPressed, listener ) => {
        if ( this.grabbedProperty.value ) {

          // Release first to update grabbedProperty. Then add a new transport protein, so that listeners in the parent Node
          // can manage focus on protein Node addition.
          this.grabbedProperty.value = false;

          const selectedSlot = this.slots[ this.selectedIndexProperty.value ];

          // If the selected slot already has a transport protein, the proteins will be "swapped" -
          // move the current protein to the slot that was originally selected.
          if ( selectedSlot.isFilled() ) {
            const currentType = selectedSlot.transportProteinType;
            affirm( currentType, 'If filled, there must be a transport protein type.' );
            const originSlot = this.grabbedNode!.origin;
            affirm( originSlot, 'If grabbed, there must be an origin slot.' );

            // If the origin is a slot, then we can swap the proteins. If the origin was the toolbar, then
            // the protein will simply be replaced.
            if ( originSlot instanceof Slot ) {
              originSlot.transportProteinType = currentType;
            }
          }

          // Place the transport protein in the selected slot
          affirm( this.selectedType, 'If grabbed, there must be a selected type.' );
          selectedSlot.transportProteinType = this.selectedType;

          this.selectedType = null;
          this.selectedIndexProperty.value = 0;

          // destroy the icon Node
          if ( this.grabbedNode ) {
            this.grabbedNode.dispose();
            this.grabbedNode = null;
          }
        }
      }
    } );
    this.addInputListener( releaseKeyboardListener );
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
    this.selectedIndexProperty.value = this.slots.indexOf( slot );

    this.grabbedNode = this.createDragNode( type, slot, toolNode );
  }
}

membraneTransport.register( 'InteractiveSlotsNode', InteractiveSlotsNode );