// Copyright 2025, University of Colorado Boulder

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSortInteractionView from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSortInteractionView.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsConstants, { MODEL_HEIGHT } from '../MembraneChannelsConstants.js';
import MembraneChannelsModel, { Slot, SLOT_COUNT } from '../model/MembraneChannelsModel.js';
import ChannelDragNode from './ChannelDragNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import ObservationWindow from './ObservationWindow.js';

// This is the index of the slot in the model
type SortItem = number;

const MODEL_DRAG_VERTICAL_OFFSET = 10;

/**
 * Keyboard interaction for channels on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class MembraneGroupSortInteractionView extends GroupSortInteractionView<SortItem, Node> {
  public constructor( model: MembraneChannelsModel, view: MembraneChannelsScreenView, observationWindow: ObservationWindow ) {

    const returnToToolboxRectangle = new Rectangle( 0, 0, 50, 50, {
      fill: 'blue',
      centerX: observationWindow.bounds.width - 30,
      centerY: observationWindow.bounds.height / 4 - 23,
      opacity: 0
    } );
    observationWindow.addChild( returnToToolboxRectangle );

    const groupSelectModel = new GroupSelectModel<SortItem>( {
      getGroupItemValue: slot => 0, // TODO
      tandem: Tandem.OPT_OUT // TODO?
    } );

    let grabbedNode: ChannelDragNode | null = null;
    let initialSlot: Slot | null = null;

    super( groupSelectModel, observationWindow, {
      getNextSelectedGroupItem: ( delta: number, currentlySelectedGroupItem: SortItem ) => {

        const slot = model.getNextFilledSlot( delta, currentlySelectedGroupItem );

        if ( slot === null ) {
          return currentlySelectedGroupItem;
        }
        else {
          return model.getSlotIndex( slot );
        }
      },

      // Called when a selected item becomes "grabbed" for sorting
      onGrab: ( groupItem: SortItem ) => {

        // Make all the slots visible?
        observationWindow.setSlotIndicatorsVisible( true );

        const slot = model.getSlotForIndex( groupItem );
        const channelType = model.getSlotContents( slot );
        affirm( channelType, 'The grabbed item should have a channel type' );

        // Remove the channel from the model
        model.setSlotContents( slot, null );

        // Create a ChannelDragNode at the location of the selected item, in an offset position.
        grabbedNode = view.createFromKeyboard( channelType, [ observationWindow ] ); // TODO: swapped with the mouse one, watch out!!!!
        initialSlot = slot;

        // Offset above the membrane so it is clear it isn't in the model
        grabbedNode.setModelPosition( new Vector2( model.getSlotPosition( slot ), MODEL_DRAG_VERTICAL_OFFSET ) );
        groupSelectModel.selectedGroupItemProperty.value = groupItem;
      },
      onRelease: ( groupItem: SortItem ) => {

        // Triggered automatically on backspace/delete, so be graceful
        if ( grabbedNode && !grabbedNode.isDisposed ) {

          // TODO: After dropping back in the membrane, clear the selected index so the empty spot by the toolbox is no longer selected
          // when returning focus here

          if ( groupItem < SLOT_COUNT ) {
            model.setSlotContents( model.getSlotForIndex( groupItem ), grabbedNode.type );
          }

          grabbedNode.dispose();
          grabbedNode = null;
          initialSlot = null;

          // TODO: When dropping an item with spacebar, focus correctly goes back to the toolbox.
          // TODO: However, when dropping an item with enter, focus incorrectly stays on the group and creates another channel on the left.
          view.keyboardDroppedMembraneChannel();
        }
      },

      // Note that this range is not used by the implementation, but the min must be negative so that we get a delta at the start.
      sortingRangeProperty: new Property( new Range( -10, 10 ) ),
      sortGroupItem: ( oldSlotIndex: SortItem, newValue: number ) => {

        const newSlotIndex = clamp( oldSlotIndex + newValue, 0, SLOT_COUNT );

        if ( newSlotIndex === SLOT_COUNT ) {
          grabbedNode!.setModelPosition( new Vector2( 90, 50 ) ); // TODO: Coordinate bounds with the returnToToolboxRectangle
        }
        else {
          const newSlot = model.getSlotForIndex( newSlotIndex );
          const newPosition = model.getSlotPosition( newSlot );
          grabbedNode!.setModelPosition( new Vector2( newPosition, MODEL_DRAG_VERTICAL_OFFSET ) );
        }

        groupSelectModel.selectedGroupItemProperty.value = newSlotIndex;
      },
      getGroupItemToSelect: () => {
        const leftMostFilledSlot = model.getLeftmostFilledSlot();
        if ( leftMostFilledSlot ) {
          return model.getSlotIndex( leftMostFilledSlot );
        }
        else {
          return null;
        }
      },
      getNodeFromModelItem: model => {

        // TODO: We probably don't want to use the slotDragIndicatorNodes for this.
        const indicatorNode = observationWindow.slotDragIndicatorNodes[ model ];

        if ( indicatorNode ) {
          return observationWindow.slotDragIndicatorNodes[ model ];
        }
        else {
          return returnToToolboxRectangle;
        }
      },
      grabReleaseCueOptions: {
        center: observationWindow.bounds.center.plusXY( 0, observationWindow.modelViewTransform.modelToViewDeltaY( MODEL_HEIGHT * 0.25 ) )
      }
    } );

    // Specify shape around the membrane
    const verticalFractionalHeight = 0.3;
    const horizontalMargin = 5;
    this.groupSortGroupFocusHighlightPath.shape = Shape.rect(
      -horizontalMargin, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT / 2 - MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT * verticalFractionalHeight / 2,
      horizontalMargin * 2 + MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT * verticalFractionalHeight );

    // Resets fields tracking what is grabbed, where it was grabbed from, etc that are saved at the beginning
    // of an interaction.
    const resetState = () => {
      grabbedNode = null;
      initialSlot = null;
    };

    // add a keyboard listener to delete the currently grabbed item
    const keyboardListener = new KeyboardListener( {
      keys: [ 'backspace', 'delete', 'escape' ],
      fire: ( event, keysPressed ) => {

        if ( groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {
          if ( keysPressed === 'backspace' || keysPressed === 'delete' ) {

            grabbedNode!.dispose();
            resetState();

            groupSelectModel.isGroupItemKeyboardGrabbedProperty.value = false;

            // next, tell the group sort interaction that nothing is grabbed.
            const leftmostFilledSlot = model.getLeftmostFilledSlot();
            if ( leftmostFilledSlot ) {
              groupSelectModel.selectedGroupItemProperty.value = model.getSlotIndex( leftmostFilledSlot );
            }
            else {
              groupSelectModel.selectedGroupItemProperty.value = null;
            }

            // TODO: If you grabbed from the toolbox, then hit backspace/delete, focus should go back to the toolbox.
            // See how this is done via keyboardDroppedMembraneChannel when something is dropped in the membrane
          }
          else {
            // TODO: Why is this not running? The GroupSelectView.grabReleaseKeyboardListener seems to be firing and taking over the escape key. https://github.com/phetsims/scenery/issues/1692
            // TODO: JG will investigate simplifying the overlap + override parameters in KeyboardListener to make this possible.
            affirm( initialSlot, 'initialSlot should be set' );
            affirm( grabbedNode, 'grabbedNode should be set' );
            model.setSlotContents( initialSlot, grabbedNode.type );

            const tempInitialSlot = initialSlot;
            grabbedNode.dispose();
            resetState();

            // TODO: these come back in if we have to turn off the supertype escape listener. https://github.com/phetsims/scenery/issues/1692
            // isGroupItemKeyboardGrabbedProperty.value = false;
            // isKeyboardFocusedProperty.value = true;

            groupSelectModel.selectedGroupItemProperty.value = model.getSlotIndex( tempInitialSlot );
          }
        }
      }
    } );
    observationWindow.addInputListener( keyboardListener );
  }
}

membraneChannels.register( 'MembraneGroupSortInteractionView', MembraneGroupSortInteractionView );