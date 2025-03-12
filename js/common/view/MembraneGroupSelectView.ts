// Copyright 2025, University of Colorado Boulder

import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import Alerter from '../../../../scenery-phet/js/accessibility/describers/Alerter.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSelectView from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSelectView.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsConstants from '../MembraneChannelsConstants.js';
import ChannelType from '../model/channels/ChannelType.js';
import MembraneChannelsModel, { SLOT_COUNT } from '../model/MembraneChannelsModel.js';
import Slot from '../model/Slot.js';
import ChannelDragNode, { isOriginSlot } from './ChannelDragNode.js';
import getBriefProteinName from './channels/getBriefProteinName.js';
import ChannelToolNode from './ChannelToolNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import ObservationWindow from './ObservationWindow.js';

// This is the index of the slot in the model, or if an item has been grabbed.
type ItemModel = number | 'grabbedItem';

type Selection = {
  grabbedNode: ChannelDragNode;
  initialSlot: Slot;
  currentSlotIndex: number;
};

const MODEL_DRAG_VERTICAL_OFFSET = 10;

/**
 * Keyboard interaction for channels on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default class MembraneGroupSelectView extends GroupSelectView<ItemModel, Node> {

  private currentSelection: Selection | null = null;

  // Manage this separately from the groupSelectModel so we don't need to be concerned about the GroupSelectModel
  // signifies hasKeyboardGrabbedGroupItemProperty before or after the onGrab is called.
  private isFirstGrab = true;

  private readonly groupSelectModel: GroupSelectModel<ItemModel>;

  public constructor( private readonly membraneChannelsModel: MembraneChannelsModel, private readonly view: MembraneChannelsScreenView, private readonly observationWindow: ObservationWindow ) {

    const alerter = new Alerter( {
      descriptionAlertNode: observationWindow,
      alertToVoicing: false
    } );

    const groupSelectModel = new GroupSelectModel<ItemModel>( {

      // This is only used in assertions, so it is ok to return a constant.
      getGroupItemValue: () => 0,

      tandem: Tandem.OPT_OUT // TODO?
    } );

    // A list of all keys that are listened to, except those covered by the numberKeyMapper
    // TODO: Copied from GroupSortInteraction
    const movementKeys = [
      'd', 'arrowRight', 'a', 'arrowLeft', 'arrowUp', 'arrowDown', 'w', 's',
      'home', 'end' // min/max
    ] as const;

    // TODO: Copied from GroupSortInteraction
    /**
     * Get the delta to change the value given what key was pressed. The returned delta may not result in a value in range,
     * please constrain value from range or provide your own defensive measures to this delta.
     */
    const getDeltaForKey = ( key: string ): number => {
      const fullRange = SLOT_COUNT + 1;
      return key === 'home' ? -fullRange :
             key === 'end' ? fullRange :
             [ 'arrowLeft', 'a', 'arrowDown', 's' ].includes( key ) ? -1 :
             [ 'arrowRight', 'd', 'arrowUp', 'w' ].includes( key ) ? 1 :
             0;
    };

    // // TODO: Mostly Copied from GroupSortInteraction
    const deltaKeyboardListener = new KeyboardListener( {
      fireOnHold: true,
      keys: movementKeys,
      fire: ( event, keysPressed ) => {

        if ( groupSelectModel.selectedGroupItemProperty.value !== null ) {

          const groupItem = groupSelectModel.selectedGroupItemProperty.value;
          const oldValue = this.model.getGroupItemValue( groupItem )!;

          // Moving an item
          if ( groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {

            // Don't do any movement when disabled
            // For these keys, the item will move by a particular delta
            if ( this.model.enabled && movementKeys.includes( keysPressed ) ) {
              const delta = getDeltaForKey( keysPressed );

              const grabbedNode = this.currentSelection!.grabbedNode;
              const currentSlotIndex = this.currentSelection!.currentSlotIndex;

              const newIndex = clamp( currentSlotIndex + delta, 0, SLOT_COUNT );

              if ( newIndex === SLOT_COUNT ) {

                // Model coordinates up by the toolbox
                grabbedNode.setModelPosition( new Vector2( 90, 50 ) );
              }
              else {
                const newSlot = membraneChannelsModel.getSlotForIndex( newIndex );
                grabbedNode.setModelPosition( new Vector2( newSlot.position, MODEL_DRAG_VERTICAL_OFFSET ) );
              }

              this.currentSelection!.currentSlotIndex = newIndex;

              // alert the user of the new position
              const channelType = this.membraneChannelsModel.getSlotForIndex( newIndex ).channelType;
              const contentsString = channelType === null ? 'empty' : getBriefProteinName( channelType );
              const message = newIndex === SLOT_COUNT ? 'Off membrane' : `Slot ${newIndex + 1} of ${SLOT_COUNT}, ${contentsString}`;
              alerter.alert( message );
            }
          }
          else {

            // Selecting an item
            const delta = getDeltaForKey( keysPressed );
            this.model.hasKeyboardSelectedGroupItemProperty.value = true;

            const channelNodes = observationWindow.getChannelNodes();

            const selectMax = channelNodes.length - 1;
            groupSelectModel.selectedGroupItemProperty.value = clamp( oldValue + delta, 0, selectMax );
          }
          this.onGroupItemChange( groupItem );
        }
      }
    } );

    observationWindow.addInputListener( deltaKeyboardListener );

    // Alert the user of the type of protein that has been selected, and which slot it is in.
    // This handles both initial selection and subsequent changes
    groupSelectModel.selectedGroupItemProperty.lazyLink( selectedItem => {

      // Only alert for numeric indices (not for 'grabbedItem' state)
      if ( typeof selectedItem === 'number' ) {
        const channelNodes = observationWindow.getChannelNodes();
        const selectedNode = channelNodes[ selectedItem ];

        if ( selectedNode ) {
          const slot = selectedNode.slot;
          const channelType = slot.channelType;
          const slotIndex = membraneChannelsModel.getSlotIndex( slot );
          const channelName = channelType ? getBriefProteinName( channelType ) : 'empty';

          // prevent saying what is selected in the group when focus immediately goes back to the toolbox
          if ( groupSelectModel.isKeyboardFocusedProperty.value ) {

            // TODO: i18n after design finalized
            alerter.alert( `Selected ${channelName} in slot ${slotIndex + 1} of ${SLOT_COUNT}` );
          }
        }
      }
    } );

    super( groupSelectModel, observationWindow, {

      // Called when a selected item becomes "grabbed" for movement
      onGrab: ( groupItem: ItemModel ) => {

        if ( groupItem === 'grabbedItem' ) {
          console.log( 'hello grabbed item' );
        }
        else {
          const slot = observationWindow.getChannelNodes()[ groupItem ].slot;

          const channelType = slot.channelType;
          affirm( channelType, 'The grabbed item should have a channel type' );

          // Remove the channel from the model
          slot.clear();

          this.initializeKeyboardDrag( slot, channelType, slot );

          groupSelectModel.selectedGroupItemProperty.value = 'grabbedItem';
        }

        // TODO: i18n after the design is finalized
        const phrase1 = `Grabbed. Above membrane. Slot ${this.currentSelection!.currentSlotIndex + 1} of ${SLOT_COUNT}.`;
        const phrase2 = 'Move protein with W, A, S, or D key. Space to release.';

        const phrase = this.isFirstGrab ? `${phrase1} ${phrase2}` : phrase1;
        alerter.alert( phrase );

        this.isFirstGrab = false;
      },
      onRelease: ( groupItem: ItemModel ) => {

        // Guard against calls during delete
        const currentSelection = this.currentSelection;
        if ( groupItem === 'grabbedItem' && currentSelection ) {

          const currentSlotIndex = currentSelection.currentSlotIndex;
          const grabbedNode = currentSelection.grabbedNode;

          // Triggered automatically on backspace/delete, so be graceful
          if ( currentSlotIndex >= 0 && grabbedNode && !grabbedNode.isDisposed ) {

            // when returning focus here
            const droppedIntoSlot = membraneChannelsModel.getSlotForIndex( currentSlotIndex );
            if ( currentSlotIndex < SLOT_COUNT ) {

              const oldContents = droppedIntoSlot.channelType;

              // Drop the item into the membrane
              droppedIntoSlot.channelType = grabbedNode.type;

              const contentsString = getBriefProteinName( grabbedNode.type );
              alerter.alert( `Released ${contentsString} into membrane` );

              if ( oldContents && isOriginSlot( grabbedNode.origin ) ) {
                grabbedNode.origin.channelType = oldContents;
              }
            }
            else {

              // Drop the item back into the toolbox
              // TODO: i18n after design finalized
              alerter.alert( 'Released. Back in toolbox.' );
            }

            view.keyboardDroppedMembraneChannel();

            // Look through the nodes to find the corresponding index of the one just released, so it can retain highlight.
            const selectedIndex = observationWindow.getChannelNodes().findIndex( node => node.slot === droppedIntoSlot );

            // Dropped into membrane
            if ( currentSlotIndex < SLOT_COUNT ) {
              groupSelectModel.selectedGroupItemProperty.value = selectedIndex === -1 ? null : selectedIndex;
            }
            else {

              // dropped into toolbox
              groupSelectModel.selectedGroupItemProperty.value = observationWindow.getChannelNodes().length === 0 ? null : 0;
            }

            resetState();
          }
        }
        else {
          console.log( 'was not dragged item, but why' );
        }
      },
      getGroupItemToSelect: () => {

        const channelNodes = observationWindow.getChannelNodes();
        if ( channelNodes.length > 0 ) {
          return 0; // the left most Node
        }
        else {
          return null;
        }
      },
      getNodeFromModelItem: model => {

        if ( model === 'grabbedItem' ) {

          // Guard against calls during delete
          if ( this.currentSelection ) {
            return this.currentSelection.grabbedNode;
          }
          else {
            return null;
          }
        }
        else {
          const channelNodes = observationWindow.getChannelNodes();
          const slottedNode = channelNodes[ model ];
          if ( slottedNode ) {
            return slottedNode.node;
          }
          else {
            return null;
          }
        }
      },
      grabReleaseCueOptions: {
        center: observationWindow.bounds.center.plusXY( 0, observationWindow.modelViewTransform.modelToViewDeltaY( MembraneChannelsConstants.MODEL_HEIGHT * 0.25 ) )
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
      this.currentSelection?.grabbedNode.dispose();
      this.currentSelection = null;
    };

    // add a keyboard listener to delete the currently grabbed item
    const deleteKeyboardListener = new KeyboardListener( {
      keys: [ 'backspace', 'delete' ],
      fire: () => {

        if ( groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {

          resetState();

          groupSelectModel.isGroupItemKeyboardGrabbedProperty.value = false;

          // next, tell the group select interaction that nothing is grabbed.
          groupSelectModel.selectedGroupItemProperty.value = this.observationWindow.getChannelNodes().length > 0 ? 0 : null;

          // TODO: If you grabbed from the toolbox, then hit backspace/delete, focus should go back to the toolbox.
          // See how this is done via keyboardDroppedMembraneChannel when something is dropped in the membrane
        }
      }
    } );
    observationWindow.addInputListener( deleteKeyboardListener );

    const escKeyboardListener = new KeyboardListener( {

      // TODO: Remove 'm' after 'escape' is working. I used 'm' since it is the same on qwerty and dvorak.
      keys: [ 'm', 'escape' ],
      fire: () => {
        // TODO: Why is this not running for 'escape'? The GroupSelectView.grabReleaseKeyboardListener seems to be firing and taking over the escape key. https://github.com/phetsims/scenery/issues/1692
        // TODO: JG will investigate simplifying the overlap + override parameters in KeyboardListener to make this possible.

        const currentSelection = this.currentSelection;
        resetState();
        if ( currentSelection ) {
          const grabbedNode = currentSelection.grabbedNode;

          if ( isOriginSlot( grabbedNode.origin ) ) {

            // TODO: What if something else moved there in the meantime?
            grabbedNode.origin.channelType = grabbedNode.type;

            // Select the index corresponding to the item just dropped
            // Look through the nodes to find the corresponding index of the one just released, so it can retain highlight.
            const selectedIndex = observationWindow.getChannelNodes().findIndex( node => node.slot === grabbedNode.origin );

            // Dropped into membrane
            groupSelectModel.selectedGroupItemProperty.value = selectedIndex === -1 ? null : selectedIndex;

            // TODO: i18n after design finalized
            alerter.alert( 'Cancelled. Back in membrane.' );
          }
          else {
            // Dropped into toolbox
            groupSelectModel.selectedGroupItemProperty.value = observationWindow.getChannelNodes().length === 0 ? null : 0;

            // Drop the item back into the toolbox
            // TODO: i18n after design finalized
            // TODO: Duplicated above
            alerter.alert( 'Released. Back in toolbox.' );
          }
        }

        // TODO: comment these back out if the parent does part of the work. https://github.com/phetsims/scenery/issues/1692
        groupSelectModel.isGroupItemKeyboardGrabbedProperty.value = false;
        groupSelectModel.isKeyboardFocusedProperty.value = true;

        view.keyboardDroppedMembraneChannel();
      }
    } );
    observationWindow.addInputListener( escKeyboardListener );
    this.groupSelectModel = groupSelectModel;
  }

  private initializeKeyboardDrag( slot: Slot, channelType: ChannelType, origin: Slot | ChannelToolNode ): void {

    // Create a ChannelDragNode at the location of the selected item, in an offset position.
    this.currentSelection = {
      grabbedNode: this.view.createFromKeyboard( channelType, origin ),
      initialSlot: slot,
      currentSlotIndex: this.membraneChannelsModel.getSlotIndex( slot )
    };

    // Offset above the membrane so it is clear it isn't in the model
    this.currentSelection.grabbedNode.setModelPosition( new Vector2( slot.position, MODEL_DRAG_VERTICAL_OFFSET ) );
  }

  public forwardFromKeyboard( slot: Slot, channelType: ChannelType, channelToolNode: ChannelToolNode ): void {
    this.initializeKeyboardDrag( slot, channelType, channelToolNode );

    this.keyboardGrab( 'grabbedItem' );
  }

  public reset(): void {
    this.isFirstGrab = true;
    this.groupSelectModel.reset();
  }
}

membraneChannels.register( 'MembraneGroupSelectView', MembraneGroupSelectView );