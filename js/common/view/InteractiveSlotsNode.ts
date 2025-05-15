// Copyright 2025, University of Colorado Boulder

/**
 * Part of the drag operation for keyboard input of the proteins in the membrane. When a protein is grabbed,
 * this Node becomes active and manages selection of a slot to place the protein.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../membraneTransport.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';

export default class InteractiveSlotsNode extends Node {

  private slots: Slot[];
  private selectedIndexProperty: Property<number>;
  public grabbedProperty: TProperty<boolean>;
  public selectedType: TransportProteinType | null;

  public constructor( slots: Slot[], modelViewTransform: ModelViewTransform2 ) {
    super( {
      groupFocusHighlight: true
    } );

    const rectangles: Node[] = [];

    // Draw a rectangle centered at each slot, vertically above them.
    slots.forEach( ( slot, index ) => {
      const rect = new Rectangle( 0, 0, 20, 20, {
        fill: 'red',
        center: modelViewTransform.modelToViewXY( slot.position, 25 ),

        // pdom
        tagName: 'div',
        accessibleName: `Above slot ${index} of ${slots.length}`
      } );
      rectangles.push( rect );
      this.addChild( rect );
    } );

    this.selectedIndexProperty = new Property( 0 );
    this.slots = slots;
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

          // Place the transport protein in the selected slot
          const selectedSlot = this.slots[ this.selectedIndexProperty.value ];
          affirm( this.selectedType, 'If grabbed, there must be a selected type.' );
          selectedSlot.transportProteinType = this.selectedType;

          this.selectedType = null;
          this.selectedIndexProperty.value = 0;
        }
      }
    } );
    this.addInputListener( releaseKeyboardListener );
  }

  /**
   * Begin the 'grabbed' state. The slot is the slot that the user will be "over" when they begin the operation.
   * This should be the selected slot from the select interaction.
   * @param slot
   * @param type - the type of transport protein that is being grabbed since it may not always be assigned to the slot
   *               when forwarding from the toolbar.
   */
  public grab( slot: Slot, type: TransportProteinType ): void {
    this.grabbedProperty.value = true;
    this.selectedType = type;
    this.selectedIndexProperty.value = this.slots.indexOf( slot );
  }
}

membraneTransport.register( 'InteractiveSlotsNode', InteractiveSlotsNode );