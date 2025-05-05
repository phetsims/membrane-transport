// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard interaction for membrane proteins on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import FluentUtils from '../../../../chipper/js/browser/FluentUtils.js';
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
import ResponsePacket from '../../../../utterance-queue/js/ResponsePacket.js';
import Utterance, { AlertableNoUtterance } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import { SLOT_COUNT } from '../model/MembraneTransportModel.js';
import TransportProtein from '../model/proteins/TransportProtein.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import createPositionAnimation from './createPositionAnimation.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import ObservationWindow from './ObservationWindow.js';
import getBriefProteinName from './proteins/getBriefProteinName.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

// This is the index of the slot in the model, or if an item has been grabbed.
type ItemModel = number | 'grabbedItem';

type Selection = {
  grabbedNode: TransportProteinDragNode;
  initialSlot: Slot;
  currentSlotIndex: number;
};

const MODEL_DRAG_VERTICAL_OFFSET = 10;

export default class MembraneGroupSelectView extends GroupSelectView<ItemModel, Node> {

  private currentSelection: Selection | null = null;

  // Manage this separately from the groupSelectModel so we don't need to be concerned about the GroupSelectModel
  // signifies hasKeyboardGrabbedGroupItemProperty before or after the onGrab is called.
  private isFirstGrab = true;

  public readonly groupSelectModel: GroupSelectModel<ItemModel>;
  private readonly utterance = new Utterance( {

    // This utterance is not registered to a Node, and so it will always be spoken.
    // TODO (JG): This is required because this Node does not compose Voicing. Is that too strict? Can we remove the assertion in Voicing.alertUtterance? See https://github.com/phetsims/membrane-transport/issues/95
    voicingCanAnnounceProperties: [ new Property( true ) ]
  } );
  private readonly alerter: Alerter;

  /**
   * @param slots
   * @param focusable - If false, this interaction is removed from the traversal order.
   * @param view
   * @param observationWindow
   * @param groupSelectContainer - The primaryFocusedNode for the group select interaction.
   */
  public constructor(
    private readonly slots: Slot[],
    focusable: boolean,
    private readonly view: MembraneTransportScreenView,
    private readonly observationWindow: ObservationWindow,
    groupSelectContainer: Node
  ) {

    const alerter = new Alerter( {
      descriptionAlertNode: observationWindow
    } );

    const groupSelectModel = new GroupSelectModel<ItemModel>( {

      // This is only used in assertions, so it is ok to return a constant.
      getGroupItemValue: () => 0,

      tandem: Tandem.OPT_OUT // TODO (design/phet-io): Hopefully this doesn't need to be instrumented, can we confirm? See https://github.com/phetsims/membrane-transport/issues/32
    } );

    groupSelectModel.isGroupItemKeyboardGrabbedProperty.link( isGroupItemKeyboardGrabbed => {
      observationWindow.setSlotDragIndicatorsVisible( isGroupItemKeyboardGrabbed );
    } );

    // A list of all keys that are listened to, except those covered by the numberKeyMapper
    const movementKeys = [
      'd', 'arrowRight', 'a', 'arrowLeft', 'arrowUp', 'arrowDown', 'w', 's',
      'home', 'end' // min/max
    ] as const;

    // Get the delta to change the value given what key was pressed.
    const getDeltaForKey = ( key: string ): number => {
      const fullRange = SLOT_COUNT + 1; // the extra space is by the toolbox, to put the transport protein away
      return key === 'home' ? -fullRange :
             key === 'end' ? fullRange :
             [ 'arrowLeft', 'a', 'arrowDown', 's' ].includes( key ) ? -1 :
             [ 'arrowRight', 'd', 'arrowUp', 'w' ].includes( key ) ? 1 :
             0;
    };

    const deltaKeyboardListener = new KeyboardListener( {
      fireOnHold: true,
      keys: movementKeys,
      fire: ( event, keysPressed ) => {

        if ( groupSelectModel.selectedGroupItemProperty.value !== null ) {

          const groupItem = groupSelectModel.selectedGroupItemProperty.value;

          // Moving an item
          if ( groupSelectModel.isGroupItemKeyboardGrabbedProperty.value ) {

            // Don't do any movement when disabled
            // For these keys, the item will move by a particular delta
            if ( this.model.enabled && movementKeys.includes( keysPressed ) ) {
              const delta = getDeltaForKey( keysPressed );

              const grabbedNode = this.currentSelection!.grabbedNode;
              const currentSlotIndex = this.currentSelection!.currentSlotIndex;

              const newIndex = clamp( currentSlotIndex + delta, 0, SLOT_COUNT );
              if ( newIndex === currentSlotIndex ) {
                MembraneTransportSounds.boundaryReached();
              }
              else if ( newIndex > currentSlotIndex ) {
                MembraneTransportSounds.itemMoved( 'right' );
              }
              else if ( newIndex < currentSlotIndex ) {
                MembraneTransportSounds.itemMoved( 'left' );
              }

              if ( newIndex === SLOT_COUNT ) {

                // Model coordinates up by the toolbox
                grabbedNode.setModelPosition( new Vector2( 90, 50 ) );
              }
              else {
                const newSlot = this.getSlotForIndex( newIndex );
                grabbedNode.setModelPosition( new Vector2( newSlot.position, MODEL_DRAG_VERTICAL_OFFSET ) );
              }

              this.currentSelection!.currentSlotIndex = newIndex;

              // alert the user of the new position
              // Only call this method if there is a transport protein
              const getContentsString = () => {
                const transportProteinType = this.getSlotForIndex( newIndex ).transportProteinType;
                const contentsString = transportProteinType === null ? 'empty' : getBriefProteinName( transportProteinType ).value; // TODO (SR): i18n "empty" https://github.com/phetsims/membrane-transport/issues/103 - notes in #103 supercede this TODO
                return contentsString;
              };
              const message = newIndex === SLOT_COUNT ? 'Off membrane' : `Slot ${newIndex + 1} of ${SLOT_COUNT}, ${getContentsString()}`; // TODO (SR): i18n "Slot" https://github.com/phetsims/membrane-transport/issues/103 - notes in #103 supercede this TODO
              this.alert( message );
            }
          }
          else {

            const oldValue = groupItem;

            affirm( typeof oldValue === 'number', 'oldValue should be a number, but it was: ' + oldValue );

            // Selecting an item
            const delta = getDeltaForKey( keysPressed );
            this.model.hasKeyboardSelectedGroupItemProperty.value = true;

            const transportProteinNodes = observationWindow.getTransportProteinNodes();

            const selectMax = transportProteinNodes.length - 1;
            groupSelectModel.selectedGroupItemProperty.value = clamp( oldValue + delta, 0, selectMax );
          }
          this.onGroupItemChange( groupItem );
        }
      }
    } );

    groupSelectContainer.addInputListener( deltaKeyboardListener );

    // Alert the user of the type of protein that has been selected, and which slot it is in.
    // This handles both initial selection and subsequent changes
    groupSelectModel.selectedGroupItemProperty.lazyLink( selectedItem => {

      // Only alert for numeric indices (not for 'grabbedItem' state)
      if ( typeof selectedItem === 'number' ) {
        const transportProteinNodes = observationWindow.getTransportProteinNodes();
        const selectedNode = transportProteinNodes[ selectedItem ];

        if ( selectedNode ) {
          const slot = selectedNode.slot;
          const transportProteinType = slot.transportProteinType;
          const filledProteins = this.getTransportProteins();
          const transportProtein = slot.transportProteinProperty.value;
          affirm( transportProtein, 'The selected item should have a transport protein type' );
          const proteinIndex = filledProteins.indexOf( transportProtein );

          const transportProteinName = transportProteinType ? getBriefProteinName( transportProteinType ).value : 'empty';

          // prevent saying what is selected in the group when focus immediately goes back to the toolbox
          if ( groupSelectModel.isKeyboardFocusedProperty.value ) {

            this.alert( new ResponsePacket( {
              nameResponse: transportProteinName,
              objectResponse: `Open, ${proteinIndex + 1} of ${filledProteins.length}`
            } ) );
          }
        }
      }
    } );

    super( groupSelectModel, groupSelectContainer, {

      primaryFocusedNodeOptions: {

        // For the simple diffusion feature set, there are no proteins that you can drag into the membrane so the
        // membrane is not interactive and therefore removed from the traversal order.
        focusable: focusable
      },

      // Called when a selected item becomes "grabbed" for movement
      onGrab: ( groupItem: ItemModel ) => {

        if ( groupItem === 'grabbedItem' ) {
          console.log( 'hello grabbed item' );
        }
        else {
          const slot = observationWindow.getTransportProteinNodes()[ groupItem ].slot;

          const transportProteinType = slot.transportProteinType;
          affirm( transportProteinType, 'The grabbed item should have a transport protein type' );

          // Remove the transport protein from the model
          slot.clear();

          this.initializeKeyboardDrag( slot, transportProteinType, slot );

          groupSelectModel.selectedGroupItemProperty.value = 'grabbedItem';
        }

        const fluentPatternMessageProperty = this.isFirstGrab ?
                                             MembraneTransportMessages.grabbedProteinResponseWithHintPatternMessageProperty :
                                             MembraneTransportMessages.grabbedProteinResponsePatternMessageProperty;
        this.alert( FluentUtils.formatMessage( fluentPatternMessageProperty, {
          slotIndex: this.currentSelection!.currentSlotIndex + 1,
          slotCount: SLOT_COUNT
        } ) );

        this.isFirstGrab = false;

        MembraneTransportSounds.transportProteinGrabbed();
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
            const droppedIntoSlot = this.getSlotForIndex( currentSlotIndex );
            if ( currentSlotIndex < SLOT_COUNT ) {

              const oldContents = droppedIntoSlot.transportProteinType;

              // Drop the item into the membrane
              droppedIntoSlot.transportProteinType = grabbedNode.type;

              const contentsString = getBriefProteinName( grabbedNode.type ).value;

              this.alert( `Released ${contentsString} into membrane` );

              // Swap
              if ( oldContents && grabbedNode.origin instanceof Slot ) {
                grabbedNode.origin.transportProteinType = oldContents;
                MembraneTransportSounds.transportProteinSwapped();
              }
              else {
                MembraneTransportSounds.transportProteinReleased();
              }

            }
            else {

              // Drop the item back into the toolbox
              this.alert( MembraneTransportMessages.releasedBackInToolboxMessageProperty );

              // Animate the protein back to the toolbox
              const toolNode = view.getTransportProteinToolNode( grabbedNode.type );
              if ( toolNode ) {
                const viewPoint = view.globalToLocalPoint( toolNode.transportProteinNode.globalBounds.center );
                const modelPoint = view.screenViewModelViewTransform.viewToModelPosition( viewPoint );

                const animation = createPositionAnimation(
                  value => grabbedNode.setModelPosition( value ),
                  grabbedNode.getModelPosition(),
                  modelPoint,
                  () => resetState()
                );

                animation.start();
              }

              MembraneTransportSounds.proteinReturnedToToolbox();
            }

            view.keyboardDroppedOrDeletedTransportProtein();

            // Look through the nodes to find the corresponding index of the one just released, so it can retain highlight.
            const selectedIndex = observationWindow.getTransportProteinNodes().findIndex( node => node.slot === droppedIntoSlot );

            // Dropped into membrane
            if ( currentSlotIndex < SLOT_COUNT ) {
              groupSelectModel.selectedGroupItemProperty.value = selectedIndex === -1 ? null : selectedIndex;
              resetState();
            }
            else {

              // dropped into toolbox
              groupSelectModel.selectedGroupItemProperty.value = observationWindow.getTransportProteinNodes().length === 0 ? null : 0;

              // Will be disposed on animation end
            }
          }
        }
        else {

          // This is expected when the user presses escape to cancel the drag. No operation needed.
        }
      },
      getGroupItemToSelect: () => {

        const transportProteinNodes = observationWindow.getTransportProteinNodes();
        if ( transportProteinNodes.length > 0 ) {
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
          const transportProteinNodes = observationWindow.getTransportProteinNodes();
          const slottedNode = transportProteinNodes[ model ];
          if ( slottedNode ) {
            return slottedNode.node;
          }
          else {
            return null;
          }
        }
      },
      grabReleaseCueOptions: {
        center: observationWindow.bounds.center.plusXY( 0, observationWindow.modelViewTransform.modelToViewDeltaY( MembraneTransportConstants.MODEL_HEIGHT * 0.25 ) )
      }
    } );

    this.alerter = alerter;

    // Specify shape around the membrane
    const verticalFractionalHeight = 0.4;
    const horizontalMargin = 5;
    this.groupSortGroupFocusHighlightPath.shape = Shape.rect(
      -horizontalMargin, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT / 2 - MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT * verticalFractionalHeight / 2,
      horizontalMargin * 2 + MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT * verticalFractionalHeight );

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
          groupSelectModel.selectedGroupItemProperty.value = this.observationWindow.getTransportProteinNodes().length > 0 ? 0 : null;

          // Restore focus to the toolbox, if that is where the deleted transport protein was.
          view.keyboardDroppedOrDeletedTransportProtein();
        }
      }
    } );
    groupSelectContainer.addInputListener( deleteKeyboardListener );

    const escKeyboardListener = new KeyboardListener( {
      keys: [ 'escape' ],
      fire: () => {
        const currentSelection = this.currentSelection;
        resetState();
        if ( currentSelection ) {
          const grabbedNode = currentSelection.grabbedNode;

          if ( grabbedNode.origin instanceof Slot ) {

            grabbedNode.origin.transportProteinType = grabbedNode.type;

            // Select the index corresponding to the item just dropped
            // Look through the nodes to find the corresponding index of the one just released, so it can retain highlight.
            const selectedIndex = observationWindow.getTransportProteinNodes().findIndex( node => node.slot === grabbedNode.origin );

            // Dropped into membrane
            groupSelectModel.selectedGroupItemProperty.value = selectedIndex === -1 ? null : selectedIndex;
            this.alert( MembraneTransportMessages.canceledBackInMembraneMessageProperty );

            MembraneTransportSounds.transportProteinReleased();
          }
          else {

            // Dropped into toolbox
            groupSelectModel.selectedGroupItemProperty.value = observationWindow.getTransportProteinNodes().length === 0 ? null : 0;
            this.alert( MembraneTransportMessages.releasedBackInToolboxMessageProperty );

            MembraneTransportSounds.proteinReturnedToToolbox();
          }
        }

        groupSelectModel.isGroupItemKeyboardGrabbedProperty.value = false;
        groupSelectModel.isKeyboardFocusedProperty.value = true;

        view.keyboardDroppedOrDeletedTransportProtein();
      }
    } );
    groupSelectContainer.addInputListener( escKeyboardListener );
    this.groupSelectModel = groupSelectModel;
  }

  private alert( message: AlertableNoUtterance ): void {
    this.utterance.alert = message;
    this.alerter.alert( this.utterance );
  }

  private initializeKeyboardDrag( slot: Slot, transportProteinType: TransportProteinType, origin: Slot | TransportProteinToolNode ): void {

    // Create a TransportProteinDragNode at the location of the selected item, in an offset position.
    this.currentSelection = {
      grabbedNode: this.view.createFromKeyboard( transportProteinType, origin ),
      initialSlot: slot,
      currentSlotIndex: this.getSlotIndex( slot )
    };

    // Offset above the membrane so it is clear it isn't in the model
    this.currentSelection.grabbedNode.setModelPosition( new Vector2( slot.position, MODEL_DRAG_VERTICAL_OFFSET ) );
  }

  public forwardFromKeyboard( slot: Slot, transportProteinType: TransportProteinType, transportProteinToolNode: TransportProteinToolNode ): void {
    this.initializeKeyboardDrag( slot, transportProteinType, transportProteinToolNode );

    this.keyboardGrab( 'grabbedItem' );
  }

  private getSlotIndex( slot: Slot ): number {
    return this.slots.indexOf( slot );
  }

  private getSlotForIndex( index: number ): Slot {
    return this.slots[ index ];
  }

  /**
   * Returns an array of transport proteins that exist in the membrane.
   */
  private getTransportProteins(): TransportProtein[] {
    const filledSlotList = this.slots.filter( slot => slot.isFilled() );
    return filledSlotList.map( slot => {
      affirm( slot.transportProteinProperty.value, 'A filled slot must have a transport protein.' );
      return slot.transportProteinProperty.value;
    } );
  }

  public reset(): void {
    this.isFirstGrab = true;
    this.groupSelectModel.reset();
  }
}

membraneTransport.register( 'MembraneGroupSelectView', MembraneGroupSelectView );