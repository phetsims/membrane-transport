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
import MembraneChannelsModel, { Slot } from '../model/MembraneChannelsModel.js';
import ChannelDragNode from './ChannelDragNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import ObservationWindow from './ObservationWindow.js';

// This is the index of the slot in the model
type SortItem = number;

/**
 * Keyboard interaction for channels on the membrane.
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
    let initialSlot: Slot | null = null;

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
        grabbedNode = view.createFromKeyboard( channelType, [ observationWindow ] ); // TODO: swapped with the mouse one, watch out!!!!
        initialSlot = slot;

        // TODO: duplicated below
        const newPosition = model.getSlotPosition( slot );
        grabbedNode.setModelPosition( new Vector2( newPosition, 10 ) );

        groupSelectModel.selectedGroupItemProperty.value = groupItem;

        // somehow, getNodeFromModelItem will need to work with this new ChannelDragNode instead of the TODO: finish this sentence
      },
      onRelease: ( groupItem: SortItem ) => {

        // Triggered automatically on backspace/delete, so be graceful
        if ( grabbedNode && !grabbedNode.isDisposed ) {
          model.setSlotContents( model.getSlotForIndex( groupItem ), grabbedNode.type );
          grabbedNode.dispose();
          grabbedNode = null;
          initialSlot = null;
        }
      },

      // Note that this range is not used by the implementation, but the min
      // must be negative so that we get a delta at the start.
      sortingRangeProperty: new Property( new Range( -10, 10 ) ),
      sortGroupItem: ( oldSlotIndex: SortItem, newValue: number ) => {

        let newSlotIndex = oldSlotIndex + newValue;

        if ( newSlotIndex < 0 ) {
          newSlotIndex = 0;
        }
        if ( newSlotIndex >= 6 ) {
          newSlotIndex = 6;
        }

        const newSlot = model.getSlotForIndex( newSlotIndex );
        const newPosition = model.getSlotPosition( newSlot );

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
          }
          else {
            // TODO: Why is this not running? The GroupSelectView.grabReleaseKeyboardListener seems to be firing and taking over the escape key. https://github.com/phetsims/scenery/issues/1692
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