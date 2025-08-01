// Copyright 2025, University of Colorado Boulder

/**
 * Implements Interactive Description for  proteins in the membrane while "grabbed."
 *
 * This approach focuses on accessibility for both Interactive Description and Voicing.
 * There are two interaction modes:
 * - The "selection" mode, which lets users move focus among placed proteins
 * - The "sorting" mode which is active when a protein is being moved using the keyboard.
 *
 * This Node implements the "sorting" mode. See ObservationWindowTransportProteinLayer for the "selection" mode.
 * Focus is passed between these two Nodes to implement the full interaction.
 *
 * While in the "grabbed" state, arrow keys move the selection between available slots, and focus/aria
 * output (as well as voicing) updates to reflect the targeted drop location.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import GroupFocusListener from '../../../../scenery/js/accessibility/GroupFocusListener.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import voicingUtteranceQueue from '../../../../scenery/js/accessibility/voicing/voicingUtteranceQueue.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import { AriaLive } from '../../../../utterance-queue/js/AriaLiveAnnouncer.js';
import ResponsePacket from '../../../../utterance-queue/js/ResponsePacket.js';
import Utterance, { AlertableNoUtterance } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import animateProteinReturn from './animateProteinReturn.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

// Describes the way that a protein may be released.
type ReleaseReason = 'release' // basic release case
  | 'swap' // swap slots with another protein in the membrane
  | 'return' // return the protein to the toolbox
  | 'cancel' // cancel the interaction
  | 'delete' // remove the protein from the membrane
  | 'replace'; // replace existing protein with one from toolbar

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

  // These are the focusable Nodes that implement much of the interaction. One surrounds each slot.
  // Arrow keys move focus between these Nodes so that information about the potential slot is
  // read to the user while they are selecting a new slot.
  private focusableRectangles: Rectangle[] = [];

  // Utterances should not interrupt others so we hear the 'grabbed' response and the name of the protein.
  private readonly grabReleaseUtterance = new Utterance( {
    announcerOptions: {

      // So that we do not interrupt the name response when the protein is grabbed.
      cancelOther: false,

      // Assertive was "losing" the message on Mac/Voiceover, but polite correctly schedules it after reading the accessible name from focus change
      // See https://github.com/phetsims/membrane-transport/issues/299
      ariaLivePriority: AriaLive.POLITE
    }
  } );
  private readonly nameUtterance = new Utterance( { announcerOptions: { cancelOther: false } } );

  /**
   * @param slots - Slots available to place a protein
   * @param view - The view so that we can create new icons for dragging.
   * @param focusLeftmostProteinNode - A function that focuses the leftmost protein node, if any, or returns false
   * @param updateFocusForSelectables - A function that updates which proteins are focusable when in the 'select' state.
   * @param modelViewTransform
   */
  public constructor(
    private readonly slots: Slot[],
    private readonly view: MembraneTransportScreenView,
    focusLeftmostProteinNode: () => boolean,
    updateFocusForSelectables: () => void,
    modelViewTransform: ModelViewTransform2
  ) {
    super( {
      tagName: 'div',

      // A custom group highlight that surrounds the entire membrane and the protein when it is hovering
      // above the slots.
      groupFocusHighlight: new GroupHighlightPath( Shape.bounds(
        modelViewTransform.modelToViewBounds( MembraneTransportConstants.MEMBRANE_BOUNDS ).dilatedXY( 10, 70 )
      ) )
    } );

    // A focusable Node that contains the accessible content for the interaction.
    const createAccessibleRectangle = (
      accessibleNameProperty: TReadOnlyProperty<string>,
      voicingNameResponseProperty: TReadOnlyProperty<string>,
      voicingObjectResponseProperty: TReadOnlyProperty<string> | null,
      modelX: number,
      modelY: number
    ): Rectangle => {

      // AccessibleInteractiveOptions allows keys to be used to interact with this Node while a screen reader is
      // in use. It also the appropriate role and adds it to the traversal order.
      const rect = new Rectangle( 0, 0, 20, 20,
        combineOptions<RectangleOptions>( {}, AccessibleInteractiveOptions, {
          center: modelViewTransform.modelToViewXY( modelX, modelY ),

          // pdom
          accessibleRoleDescription: 'sortable',
          accessibleName: accessibleNameProperty
        } ) );

      rect.focusedProperty.link( focused => {
        if ( focused ) {
          const responsePacket = new ResponsePacket( {
            nameResponse: voicingNameResponseProperty,
            objectResponse: voicingObjectResponseProperty
          } );

          // Only added for Voicing because the accessibleName is spoken automatically by the
          // screen reader when the Node is focused.
          voicingUtteranceQueue.addToBack( this.nameUtterance, responsePacket );
        }
      } );

      return rect;
    };

    // Create and start an animation to return a grabbed protein back to the toolbox.
    // @param grabbedNode - Note this is a reference to the Node to dispose, NOT this.grabbedNode, because this.grabbedNode
    // may change from other interaction before the animation completes.
    const returnToolToToolbox = ( grabbedNode: TransportProteinDragNode ) => {
      const toolNode = view.getTransportProteinToolNode( grabbedNode.type );

      // May have been hidden by phet-io
      if ( toolNode && toolNode.wasVisuallyDisplayed() ) {
        const viewPoint = view.globalToLocalPoint( toolNode.transportProteinNode.globalBounds.center );
        const modelPoint = view.screenViewModelViewTransform.viewToModelPosition( viewPoint );
        animateProteinReturn( grabbedNode, modelPoint );
      }
      else {

        // Tool node is not visually displayed, just dispose without animation
        grabbedNode.dispose();
      }
    };

    // Create the focusable rectangles that represent the slots.
    slots.forEach( ( slot, index ) => {

      // The name of the protein in a slot, for when there is one.
      const briefNameProperty = MembraneTransportFluent.a11y.transportProtein.briefName.createProperty( {
        type: new DerivedProperty( [ slot.transportProteinProperty ], transportProtein => {

          // Default case is provided, but this will only be used when there is a protein in the slot.
          return transportProtein ? transportProtein.type : 'sodiumPotassiumPump';
        } )
      } );

      const objectResponseStringProperty = MembraneTransportFluent.a11y.transportProtein.accessibleObjectResponseMoving.createProperty( {
        slotIndex: `${index + 1}`,
        slotCount: `${slots.length}`
      } );
      const nameResponseStringProperty = new DerivedProperty( [
        slot.transportProteinProperty,
        MembraneTransportFluent.a11y.transportProtein.emptyStringProperty,
        briefNameProperty
      ], ( transportProtein, emptyString, briefName ) => {
        return transportProtein ? briefName : emptyString;
      } );

      // The "reversed" accessible name pattern puts the slot before the protein name and will produce the requested output like
      // "Above slot 1 of 3, empty" or
      // "Above slot 2 of 3, Sodium Ion, Leakage"
      const accessibleNameProperty = MembraneTransportFluent.a11y.transportProtein.accessibleNameMoving.createProperty( {
        slotIndex: `${index + 1}`,
        slotCount: `${slots.length}`,
        nameResponse: nameResponseStringProperty
      } );

      const rect = createAccessibleRectangle(
        accessibleNameProperty,
        nameResponseStringProperty,
        objectResponseStringProperty,
        slot.position,
        MODEL_DRAG_VERTICAL_OFFSET
      );

      this.focusableRectangles.push( rect );
      this.addChild( rect );
    } );

    // Add a rectangle for the off-membrane state
    const offMembraneRect = createAccessibleRectangle(
      MembraneTransportFluent.a11y.transportProtein.offMembraneResponseStringProperty,
      MembraneTransportFluent.a11y.transportProtein.offMembraneResponseStringProperty,
      null,
      MembraneTransportConstants.MEMBRANE_BOUNDS.width / 2 - OFF_MEMBRANE_HORIZONTAL_OFFSET,
      OFF_MEMBRANE_VERTICAL_OFFSET
    );
    this.focusableRectangles.push( offMembraneRect );
    this.addChild( offMembraneRect );

    this.grabbedProperty = new BooleanProperty( false );
    this.selectedType = null;

    this.visibleProperty = this.grabbedProperty;

    // When grabbed, move focus to the rectangle with the selected index.
    this.grabbedProperty.link( grabbed => {
      if ( grabbed ) {
        this.updateFocus();
      }
    } );

    // Add a keyboard listener that manages selection of the transport proteins
    const selectionKeyboardListener = new KeyboardListener( {
      keyStringProperties: MembraneTransportHotkeyData.interactiveSlotsNode.selection.keyStringProperties,
      enabledProperty: this.grabbedProperty,
      fire: ( event, keysPressed, listener ) => {
        const allSlotsCount = slots.length;
        const delta = MembraneTransportHotkeyData.SELECT_LEFT.includes( keysPressed ) ? -1 : 1;

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
          // but only if the corresponding tool node is visually displayed (not hidden via phet-io)
          if ( nextIndex === allSlotsCount ) {
            affirm( this.selectedType, 'selectedType should be defined when grabbed' );
            const toolNode = this.view.getTransportProteinToolNode( this.selectedType );
            if ( toolNode && toolNode.wasVisuallyDisplayed() ) {
              this.selectedIndex = 'offMembrane';

              // Play a sound for moving off the membrane
              MembraneTransportSounds.slotHover( 7, false );
            }
            else {
              // Cannot move off membrane, stay at the rightmost slot
              this.selectedIndex = allSlotsCount - 1;
            }
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
        else {

          // The user was at the edge, and tried to move further, so play a boundary reached sound
          MembraneTransportSounds.boundaryReached();
        }
      }
    } );
    this.addInputListener( selectionKeyboardListener );

    /**
     * When the user releases the protein OR the protein loses focus, this function is called to handle the release.
     */
    const fireReleased = () => {
      if ( this.grabbedProperty.value ) {

        affirm( this.grabbedNode, 'There needs to be a grabbedNode when releasing.' );
        const grabbedNode = this.grabbedNode;
        const grabbedType = this.grabbedNode.type;
        const origin = this.grabbedNode.origin;
        const selectedType = this.selectedType;
        const selectedIndex = this.selectedIndex;

        // Release first to update grabbedProperty. Then add a new transport protein, so that listeners in the parent Node
        // can manage focus on protein Node addition.
        this.release( false );

        // A reason for the release will determine which sound/response to use
        // due to the release.
        let releaseReason: ReleaseReason;

        // Work that needs to be done after we voice that the protein was released. Useful for ordering responses.
        const afterEmoteActions: VoidFunction[] = [];

        if ( selectedIndex === 'offMembrane' ) {

          // NEXT STEPS: Turn this into animation
          const toolNode = view.getTransportProteinToolNode( grabbedType );

          // Check if the tool node is visually displayed before returning to toolbox
          if ( toolNode && toolNode.wasVisuallyDisplayed() ) {
            toolNode.focus();

            releaseReason = 'return';

            // Animate the tool back to the toolbox. Cleanup is done at the end of animation.
            returnToolToToolbox( grabbedNode );
          }
          else {

            // Tool node is hidden, so we need to handle this differently
            // If it came from a slot, return it to the original slot
            if ( origin instanceof Slot ) {
              origin.transportProteinType = grabbedType;
              releaseReason = 'cancel';
              grabbedNode.dispose();
            }
            else {
              // Came from toolbox but toolbox is now hidden, just dispose
              releaseReason = 'delete';
              grabbedNode.dispose();
            }
          }
        }
        else {

          // No animations so clean up right away.
          grabbedNode.dispose();

          const selectedSlot = this.slots[ selectedIndex ];

          // When changing the protein, it disrupts the focus. This helps us restore focus to the right place
          // after that step, taking precedence.
          let focusTarget: Node | null = null;

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
              releaseReason = 'swap';
            }
            else {

              // Protein from toolbar replaces existing protein in slot. Animate the replaced protein back to the toolbox.
              const replacedProteinNode = view.createTemporaryProteinNode( currentType, selectedSlot );
              returnToolToToolbox( replacedProteinNode );
              releaseReason = 'replace';

              if ( origin instanceof TransportProteinToolNode ) {
                focusTarget = origin;
              }
            }
          }
          else {
            releaseReason = 'release';

            if ( origin instanceof TransportProteinToolNode ) {
              focusTarget = origin;
            }
          }

          // Place the transport protein in the selected slot
          affirm( selectedType, 'If grabbed, there must be a selected type.' );
          afterEmoteActions.push( () => {
            selectedSlot.transportProteinType = selectedType;

            // Must be done after setting the transport protein type, since that alters the focus
            focusTarget && focusTarget.focus();
          } );
        }

        affirm( releaseReason, 'We should have a reason for the release to emote.' );
        this.emoteRelease( releaseReason );
        afterEmoteActions.forEach( action => action() );
      }
    };
    const releaseKeyboardListener = new KeyboardListener( {
      keyStringProperties: MembraneTransportHotkeyData.interactiveSlotsNode.releaseProtein.keyStringProperties,
      fireOnDown: false,
      fire: ( event, keysPressed, listener ) => {
        fireReleased();
      }
    } );
    this.addInputListener( releaseKeyboardListener );

    const deleteKeyboardListener = new KeyboardListener( {
      keyStringProperties: MembraneTransportHotkeyData.interactiveSlotsNode.deleteProtein.keyStringProperties,
      enabledProperty: this.grabbedProperty,
      fire: ( event, keysPressed, listener ) => {
        const grabbedNode = this.grabbedNode;
        affirm( grabbedNode, 'We must have a node to delete' );
        const type = grabbedNode.type;
        const toolNode = this.view.getTransportProteinToolNode( type );

        // You can only delete a protein if the tool node is visually displayed,
        // it can be hidden by phet-io.
        if ( toolNode && toolNode.wasVisuallyDisplayed() ) {
          this.release( false );

          returnToolToToolbox( grabbedNode );

          // Manage focus after animation
          const success = focusLeftmostProteinNode();
          if ( !success ) {
            this.view.getTransportProteinToolNode( type ).focus();
          }

          this.emoteRelease( 'delete' );
        }
      }
    } );
    this.addInputListener( deleteKeyboardListener );

    // Return the protein to its origin when pressing escape to cancel.
    const escapeKeyboardListener = new KeyboardListener( {
      keyStringProperties: MembraneTransportHotkeyData.interactiveSlotsNode.cancelInteraction.keyStringProperties,
      enabledProperty: this.grabbedProperty,
      fire: () => {
        affirm( this.grabbedNode, 'We must have a Node if this listener is firing.' );
        const origin = this.grabbedNode.origin;
        const selectedType = this.selectedType;

        this.release();

        this.emoteRelease( 'cancel' );

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
        fireReleased();

        // After releasing, make sure that the correct protein is in the traversal order according to
        // the selected index in the 'select' state.
        updateFocusForSelectables();
      }
    } );
  }

  /**
   * Releases this interaction, putting the interaction back into 'select' mode. State variables are reset.
   * @param disposeIcon - If true, the icon is disposed. This may need to be deferred for animations.
   */
  private release( disposeIcon = true ): void {
    this.selectedType = null;
    this.selectedIndex = 0;

    if ( this.grabbedNode ) {
      this.grabbedNode.release();

      if ( disposeIcon ) {
        this.grabbedNode.dispose();
      }
    }

    this.grabbedNode = null;
    this.grabbedProperty.value = false;
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
    this.focusableRectangles.forEach( ( ( rect, index ) => {
      if ( index === this.selectedIndex || ( this.selectedIndex === 'offMembrane' && index === this.focusableRectangles.length - 1 ) ) {
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
    this.selectedType = type;
    this.selectedIndex = this.slots.indexOf( slot );
    this.grabbedNode = this.view.createTemporaryProteinNode( type, slot, toolNode );

    // Alert 'grabbed' after so that it will interrupt the focus change read above.
    this.alert( this.grabReleaseUtterance, MembraneTransportFluent.a11y.transportProtein.grabbedResponseStringProperty );

    this.grabbedNode.grab( () => {

      // Make sure that the selected index is set before the grabbedProperty, so that the focus is set correctly.
      this.grabbedProperty.value = true;

      // Update the interactive and focus highlights.
      this.updateGrabHighlights();

      // Move focus to the grabbed Node.
      this.updateFocus();
    } );
  }

  /**
   * Alert a response and play a sound corresponding to the way a protein was released.
   */
  private emoteRelease( reason: ReleaseReason ): void {
    let responseString: string | null = null;

    if ( reason === 'return' ) {
      MembraneTransportSounds.proteinReturnedToToolbox();
      responseString = 'Released. Back in panel.';
    }
    else if ( reason === 'swap' ) {
      MembraneTransportSounds.transportProteinSwapped();
      responseString = 'Re-ordered.';
    }
    else if ( reason === 'delete' ) {
      MembraneTransportSounds.proteinReturnedToToolbox();
      responseString = MembraneTransportFluent.a11y.transportProtein.deletedResponseStringProperty.value;
    }
    else if ( reason === 'release' ) {
      MembraneTransportSounds.transportProteinReleased();
      responseString = 'Released.';
    }
    else if ( reason === 'cancel' ) {
      MembraneTransportSounds.transportProteinReleased();
      responseString = MembraneTransportFluent.a11y.transportProtein.cancelledResponseStringProperty.value;
    }
    else if ( reason === 'replace' ) {
      MembraneTransportSounds.proteinReturnedToToolbox();
      responseString = MembraneTransportFluent.a11y.transportProtein.releasedReplacedResponseStringProperty.value;
    }

    affirm( responseString !== null, 'We should have a response string to say.' );
    this.alert( this.grabReleaseUtterance, responseString );
  }

  /**
   * A convenience method to alert an accessible response for both Interactive Description and Voicing.
   */
  private alert( utterance: Utterance, response: AlertableNoUtterance ): void {
    utterance.alert = response;
    this.addAccessibleResponse( utterance );
    voicingUtteranceQueue.addToBack( utterance );
  }

  /**
   * Redraw the Rectangles that represent the slots so that the highlight nicely surrounds the grabbed
   * protein Node.
   */
  private updateGrabHighlights(): void {
    this.focusableRectangles.forEach( rect => {
      affirm( this.grabbedNode, 'grabbedNode was expected on updateRectangleSize.' );
      const oldCenter = rect.center;
      rect.setRectBounds( this.grabbedNode.localBounds );
      rect.center = oldCenter;
    } );
  }
}

membraneTransport.register( 'InteractiveSlotsNode', InteractiveSlotsNode );