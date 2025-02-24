// Copyright 2025, University of Colorado Boulder

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
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
import MembraneChannelsModel, { ChannelType, Slot } from '../model/MembraneChannelsModel.js';
import ChannelDragNode from './ChannelDragNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import ObservationWindow from './ObservationWindow.js';

// This is the index of the slot in the model
type SortItem = number;

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class MembraneGroupSortInteractionView extends GroupSortInteractionView<SortItem, Node> {
  public constructor( model: MembraneChannelsModel, view: MembraneChannelsScreenView, observationWindow: ObservationWindow ) {

    const sampleRectangle = new Rectangle( 100, 100, 10, 10, {
      fill: 'blue'
    } );
    // this.addChild( sampleRectangle );

    // super( );


    const groupSelectModel = new GroupSelectModel<SortItem>( {
      getGroupItemValue: slot => 0, // TODO
      tandem: Tandem.OPT_OUT // TODO?
    } );

    let grabbedNode: ChannelDragNode | null = null;
    let grabbedSlot: Slot | null = null;
    let grabbedType: ChannelType | null = null;
    // let initialSlot: Slot | null = null; // TODO: Delete this if we don't need to return it to the original slot

    // TODO: This is in progress. We hope to use GroupSortInteractionView to drive the drag and drop behavior
    //   with a keyboard.
    super( groupSelectModel, observationWindow, {
      getNextSelectedGroupItem: ( delta: number, currentlySelectedGroupItem: SortItem ) => {
        const slot = model.getNextFilledSlot( delta, currentlySelectedGroupItem.toString() as Slot );

        if ( slot === null ) {
          return currentlySelectedGroupItem;
        }
        else {
          return model.getSlotIndex( slot );
        }

        // return clamp( currentlySelectedGroupItem + delta, 0, 7 );
      },

      // Called when a selected item becomes "grabbed" for sorting
      onGrab: ( groupItem: SortItem ) => {

        // Make all the slots visible?
        observationWindow.setSlotIndicatorsVisible( true );

        const slot = model.getSlotForIndex( groupItem );
        const channelType = model.getSlotContents( slot );
        affirm( channelType, 'The grabbed item should have a channel type' );

        // Remove the channel from the model
        model.setSlotContents( model.getSlotForIndex( groupItem ), null );

        // Create a ChannelDragNode at the location of the selected item, in an offset position.
        grabbedNode = view.createFromKeyboard( channelType, [ observationWindow ], false ); // TODO: swapped with the mouse one, watch out!!!!
        grabbedSlot = slot;
        grabbedType = channelType;
        // initialSlot = slot;

        // TODO: duplicated below
        const newPosition = model.getSlotPosition( slot );
        grabbedNode.setModelPosition( new Vector2( newPosition, 10 ) );

        groupSelectModel.selectedGroupItemProperty.value = groupItem;

        // somehow, getNodeFromModelItem will need to work with this new ChannelDragNode instead of the TODO: finish this sentence
      },
      onRelease: ( groupItem: SortItem ) => {

        // Triggered automatically on backspace/delete, so be graceful
        // TODO: Hey Michael, why is this getting triggered from the delete/backspace key?
        if ( grabbedSlot ) {
          model.setSlotContents( grabbedSlot, grabbedType );
          grabbedNode!.dispose();
          grabbedNode = null;
          grabbedSlot = null;
          // initialSlot = null;
          grabbedType = null;
        }
      },

      // Note that this range is not used by the implementation, but the min
      // must be negative so that we get a delta at the start.
      sortingRangeProperty: new Property( new Range( -10, 10 ) ),
      sortGroupItem: ( groupItem: SortItem, newValue: number ) => {
        console.log( 'sortGroupItem', groupItem, newValue );

        const oldSlotIndex = model.getSlotIndex( grabbedSlot! );
        let newSlotIndex = oldSlotIndex + newValue;

        if ( newSlotIndex < 0 ) {
          newSlotIndex = 0;
        }
        if ( newSlotIndex >= 6 ) {
          newSlotIndex = 6;
        }

        const newSlot = model.getSlotForIndex( newSlotIndex );
        const newPosition = model.getSlotPosition( newSlot );

        grabbedSlot = newSlot;

        grabbedNode!.setModelPosition( new Vector2( newPosition, 10 ) );

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
          return sampleRectangle;
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
      grabbedSlot = null;
      // initialSlot = null;
      grabbedType = null;
    };

    // add a keyboard listener to delete the currently grabbed item
    const keyboardListener = new KeyboardListener( {
      keys: [ 'backspace', 'delete' ],
      fire: ( event, keysPressed ) => {
        console.log( 'keyboardListener', event, keysPressed );

        if ( grabbedSlot ) {
          if ( keysPressed === 'backspace' || keysPressed === 'delete' ) {

            model.setSlotContents( grabbedSlot, null );
            grabbedNode!.dispose();
            resetState();

            // next, tell the group sort interaction that nothing is grabbed.
            const leftmostFilledSlot = model.getLeftmostFilledSlot();
            if ( leftmostFilledSlot ) {
              groupSelectModel.selectedGroupItemProperty.value = model.getSlotIndex( leftmostFilledSlot );
            }
            else {
              groupSelectModel.selectedGroupItemProperty.value = null;
            }

            // TODO: Is there a better way to trigger this? We can ask Michael
            observationWindow.blur();
            observationWindow.focus();
          }
          // else {
          //   TODO: The escape key behavior is built into GroupSortInteractionView and places the item
          //     in the selected slot. Is that OK?
          //   affirm( initialSlot, 'initialSlot should be set' );
          //   model.setSlotContents( initialSlot, grabbedType );
          //
          //   grabbedNode!.dispose();
          //
          //   resetState();
          //
          //   groupSelectModel.selectedGroupItemProperty.value = null;
          //   observationWindow.blur();
          //   observationWindow.focus();
          // }
        }
      }
    } );
    observationWindow.addInputListener( keyboardListener );
  }
}

membraneChannels.register( 'MembraneGroupSortInteractionView', MembraneGroupSortInteractionView );