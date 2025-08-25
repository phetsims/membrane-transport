// Copyright 2025, University of Colorado Boulder

/**
 * LigandNode is a node that represents a ligand in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Alerter from '../../../../scenery-phet/js/accessibility/describers/Alerter.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import GrabDragInteraction from '../../../../scenery-phet/js/accessibility/grab-drag/GrabDragInteraction.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import { InteractiveHighlightingNodeOptions } from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import VoicingNode from '../../../../scenery/js/accessibility/voicing/nodes/VoicingNode.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Utterance, { AlertableNoUtterance } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import type Ligand from '../model/Ligand.js';
import { SLOT_COUNT } from '../model/MembraneTransportModel.js';
import Particle, { CAPTURE_RADIUS_PROPERTY } from '../model/Particle.js';
import UserControlledMode from '../model/particleModes/UserControlledMode.js';
import UserOverMode from '../model/particleModes/UserOverMode.js';
import LigandGatedChannel from '../model/proteins/LigandGatedChannel.js';
import Slot from '../model/Slot.js';
import LigandParticleNode from './particles/LigandParticleNode.js';

// constants
// Vertical offset for the ligand when dragged via keyboard, similar to proteins
const MODEL_DRAG_VERTICAL_OFFSET = 15;

// Off-membrane target index, analogous to the protein toolbox drop zone
const OFF_MEMBRANE_SLOT_INDEX = SLOT_COUNT;

const INITIAL_POSITION_INDEX = new Vector2( -1, 0 );

class LigandIndexProperty extends Vector2Property {

  // Made public so we can change the value without triggering listeners.
  public override setPropertyValue( value: Vector2 ): void {
    super.setPropertyValue( value );
  }
}

export default class LigandNode extends VoicingNode {

  private readonly ligand: Ligand;
  private readonly modelViewTransform: ModelViewTransform2;

  // Keyboard interaction state
  private isKeyboardGrabbed = false;
  private currentTargetSlotIndex: number | null = null; // 0 to SLOT_COUNT-1 for slots, SLOT_COUNT for off-membrane, null if not targeted
  private initialPositionBeforeGrab: Vector2 | null = null;

  public readonly resetEmitter = new Emitter();

  private readonly utterance = new Utterance( {

    // A longer delay to prevent this content from being spoken too frequently.
    alertStableDelay: 500,

    // This utterance is not registered to a Node, and so it will always be spoken.
    voicingCanAnnounceProperties: [ new Property( true ) ]
  } );
  private readonly alerter: Alerter;

  public constructor(
    private readonly slots: Slot[],
    private readonly ligands: Ligand[],
    areLigandsAddedProperty: TProperty<boolean>,
    ligand: Ligand,
    modelViewTransform: ModelViewTransform2,
    ligandView: LigandParticleNode,
    focusable: boolean,
    transportProteinCountProperty: TProperty<number>,
    ligandUnboundDueToNaturalCausesEmitter: Emitter<[ Ligand ]>,
    ligandInteractionCueVisibleProperty: TProperty<boolean>,
    tandem: Tandem,
    observationWindow: Node
  ) {

    // Options for both focusable and non-focusable cases
    const sharedOptions = {
      children: [ ligandView ],
      visibleProperty: areLigandsAddedProperty,
      cursor: 'pointer'
    };

    const accessibleNameProperty = MembraneTransportFluent.a11y.ligandNode.accessibleName.createProperty( { ligandType: ligand.ligandType } );

    // For voicing, speak the accessible name when focused or pressed and hint response (when enabled)
    // 
    const voiceAccessibleName = () => {
      this.voicingSpeakNameResponse( {
        nameResponse: accessibleNameProperty,
        hintResponse: MembraneTransportFluent.a11y.ligandNode.voicingHintResponseStringProperty
      } );
    };

    const options =
      focusable ?
      ( combineOptions<InteractiveHighlightingNodeOptions>( {
        tagName: 'button', // Treat as a button for focus/activation
        labelTagName: 'p', // Contains the accessible name
        containerTagName: 'div', // Required for labelTagName
        innerContent: accessibleNameProperty
      }, AccessibleDraggableOptions, sharedOptions ) ) :
      sharedOptions;

    super( options );

    // Expand the hit area for touch/mouse interactions, so it is easier to grab with the mouse
    const region = this.localBounds.dilated( 70 );
    this.mouseArea = this.touchArea = region;

    // Use the same bounds for both ligand types so they have equal focus + highlight sizes
    const POTASSIUM_REGION_HEIGHT = 369;
    const highlightPath = new HighlightPath( Shape.circle( POTASSIUM_REGION_HEIGHT / 2 ).transformed( Matrix3.translation( region.centerX, region.centerY ) ) );

    this.setFocusHighlight( highlightPath );
    this.setInteractiveHighlight( highlightPath );

    this.alerter = new Alerter( {
      descriptionAlertNode: observationWindow
    } );

    this.focusedProperty.lazyLink( focused => {
      this.ligand.focused = focused;

      // Resume brownian motion when focus is lost (but not if interacting with the protein)
      if ( !focused && this.ligand.mode.type !== 'ligandBound' && this.ligand.mode.type !== 'moveToLigandBindingLocation' ) {
        this.ligand.mode = Particle.createRandomWalkMode( true );
      }

      if ( focused ) {
        voiceAccessibleName();
      }
    } );

    this.ligand = ligand;
    this.modelViewTransform = modelViewTransform;

    // For dragging relative to the press point on the ligand (mouse/touch)
    let pressOffset: null | Vector2 = null;

    // Play a sound when hitting the boundary via mouse or keyboard
    const isOnBoundaryProperty = new BooleanProperty( false );
    isOnBoundaryProperty.lazyLink( isOnBoundary => {
      if ( isOnBoundary ) {
        MembraneTransportSounds.boundaryReached();
      }
    } );

    const soundDragListener = new SoundDragListener( {
      start: event => {

        ligandInteractionCueVisibleProperty.value = false;

        // Prevent interaction if grabbed by keyboard
        if ( this.isKeyboardGrabbed ) {
          return;
        }

        // Voice the name at the start of the interaction
        voiceAccessibleName();

        // Make sure that the ligand is no longer bound to a ligand gated channel
        ligand.unbindFromChannel();

        ligand.mode = new UserControlledMode();

        // Store initial offset from pointer to ligand position
        const localPoint = this.globalToParentPoint( event.pointer.point );
        const modelPoint = this.modelViewTransform.viewToModelPosition( localPoint );
        pressOffset = modelPoint.minus( ligand.position );

        // While dragging with mouse/touch, ensure keyboard interaction state is reset
        this.resetKeyboardInteractionState();
      },
      drag: ( event, listener ) => {

        // Prevent interaction if grabbed by keyboard - listener might still be active briefly
        if ( this.isKeyboardGrabbed ) {
          listener.interrupt();
          return;
        }

        if ( event.isFromPDOM() ) {
          // This path should ideally not be taken if useAccessibleDraggable is false,
          // but handle defensively. We use custom keyboard controls.
          // console.warn( 'PDOM drag event received unexpectedly by SoundRichDragListener' );
        }
        else {
          const localPoint = this.globalToParentPoint( event.pointer.point );
          const modelPointerPosition = this.modelViewTransform.viewToModelPosition( localPoint );
          affirm( pressOffset, 'pressOffset should be set before the listener fires.' );
          const proposedPosition = modelPointerPosition.minus( pressOffset );

          const boundModelPoint = MembraneTransportConstants.OUTSIDE_CELL_BOUNDS.closestPointTo( proposedPosition );
          isOnBoundaryProperty.value = !boundModelPoint.equals( proposedPosition );
          ligand.position.set( boundModelPoint );
        }
      },
      end: () => {
        // Prevent interaction if grabbed by keyboard
        if ( this.isKeyboardGrabbed ) {
          return;
        }

        this.setLigandModeOnRelease();

        pressOffset = null;
      },
      transform: this.modelViewTransform,
      tandem: tandem.createTandem( 'soundDragListener' )
    } );

    // All ligands can be mouse-controlled, but only one of each type can be keyboard-focused
    this.addInputListener( soundDragListener );

    const ligandIndexProperty = new LigandIndexProperty( INITIAL_POSITION_INDEX.copy() );
    this.resetEmitter.addListener( () => ligandIndexProperty.reset() );

    const keyboardListenerBoundsProperty = new Property( new Bounds2( 0, 0, transportProteinCountProperty.value, 0 ) );
    transportProteinCountProperty.link( count => {
      keyboardListenerBoundsProperty.value = new Bounds2( 0, 0, count, 0 );
    } );

    ligandIndexProperty.lazyLink( ( position, oldPosition ) => {

      // Since the design is to only move to filled slots or the off-membrane area, move based on deltas only.
      const delta = position.x - oldPosition.x;
      if ( delta === 0 ) {

        // No movement, do nothing
        return;
      }

      // Search in the direction of delta to find the next occupied slot
      const searchDirection = delta > 0 ? 1 : -1;
      const searchStartIndex = ( this.currentTargetSlotIndex === null ? -1 : this.currentTargetSlotIndex ) + searchDirection;
      let newIndex = null;
      let foundSlot = false;
      for ( let i = searchStartIndex; i >= 0 && i <= slots.length - 1; i += searchDirection ) {
        const slot = this.slots[ i ];
        if ( slot && slot.transportProteinProperty.value ) {
          newIndex = i;
          foundSlot = true;
          break;
        }
      }

      if ( !foundSlot && delta > 0 ) {

        // If we are moving right and there are no slots, then we are off the membrane
        newIndex = OFF_MEMBRANE_SLOT_INDEX;
        this.alert( MembraneTransportFluent.a11y.ligandNode.movedOffMembraneResponseStringProperty );
      }

      if ( newIndex !== null && newIndex !== this.currentTargetSlotIndex ) {
        this.currentTargetSlotIndex = newIndex;
        MembraneTransportSounds.keyboardMovedLigand( newIndex > this.currentTargetSlotIndex ? 'right' : 'left' );

        const targetSlot = this.slots[ newIndex ];
        const protein = targetSlot?.transportProteinProperty.value;

        // The response cares about the protein type, whether the protein is open or closed, the type of binding site for the
        // ligand (if available).
        if ( protein ) {
          const isLeakageChannel = protein.isLeakageGatedChannel();
          const isLigandGatedChannel = protein.isLigandGatedChannel();

          const filledSlots = slots.filter( slot => slot.isFilled() );
          const index = filledSlots.indexOf( targetSlot ) + 1;

          if ( isLeakageChannel ) {
            this.alert( MembraneTransportFluent.a11y.ligandNode.movedAboveLeakageChannelResponse.format( {
              type: protein.type,
              transportProteinCount: transportProteinCountProperty,
              index: index
            } ) );
          }
          else if ( isLigandGatedChannel ) {
            const proteinType = protein.type;
            affirm(
              proteinType === 'sodiumIonLigandGatedChannel' || proteinType === 'potassiumIonLigandGatedChannel',
              'Expecting a ligand gated channel type in this case'
            );

            this.alert( MembraneTransportFluent.a11y.ligandNode.movedAboveLigandGatedChannelResponse.format( {
              openOrClosed: protein.openOrClosedProperty,
              index: index,
              type: proteinType,
              proteinType: proteinType,
              transportProteinCount: transportProteinCountProperty
            } ) );
          }
          else {
            this.alert( MembraneTransportFluent.a11y.ligandNode.movedAboveOtherChannelResponse.format( {
              openOrClosed: protein.openOrClosedProperty,
              type: protein.type,
              index: index,
              transportProteinCount: transportProteinCountProperty
            } ) );
          }
        }
      }

      if ( this.currentTargetSlotIndex !== null ) {

        // Update position to be centered *above* the target slot/area
        const targetModelPosition = this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ? this.getOffMembraneDropPosition() :
                                    this.getTargetPositionForSlot( this.currentTargetSlotIndex );
        this.ligand.position.set( targetModelPosition );
        this.updateVisualPosition();
      }
    } );

    // Custom Keyboard Interaction Listener
    if ( focusable ) {

      const escListener = new KeyboardListener( {
        keyStringProperties: MembraneTransportHotkeyData.interactiveSlotsNode.cancelInteraction.keyStringProperties,
        fire: () => {

          // Ignore if focus is lost or interaction disabled somehow
          if ( !this.focused ) { return; }
          if ( this.isKeyboardGrabbed ) {

            // So that the ligand always returns to where it was picked up when escape is pressed.
            this.currentTargetSlotIndex = null;

            // The GrabDragInteraction handles the cancel logic upon interruption.
            grabDragInteraction.interrupt();
          }
        }
      } );
      this.addInputListener( escListener );

      // the GrabDragInteraction uses a KeyboardDragListener instead of a SoundKeyboardDragListener
      // because grab/release sounds need to play on pickup and drop of the grab/drag and not on every
      // key press.
      const keyboardListener = new KeyboardDragListener( {
        positionProperty: ligandIndexProperty,
        dragDelta: 1,
        shiftDragDelta: 1,
        dragBoundsProperty: keyboardListenerBoundsProperty,
        keyboardDragDirection: 'leftRight',
        start: ( event, listener ) => {

          // Play the boundary sound if on the boundary and attempting to move beyond it.
          const atLeftEdge = ligandIndexProperty.value.x === keyboardListenerBoundsProperty.value.minX;
          const atRightEdge = ligandIndexProperty.value.x === keyboardListenerBoundsProperty.value.maxX;
          const movingLeft = listener.modelDelta.x < 0;
          const movingRight = listener.modelDelta.x > 0;
          isOnBoundaryProperty.value = ( atLeftEdge && movingLeft ) || ( atRightEdge && movingRight );
        },
        tandem: tandem.createTandem( 'keyboardListener' )
      } );

      // Declare type since it refers to itself in its own declaration
      const grabDragInteraction: GrabDragInteraction = new GrabDragInteraction( this, keyboardListener, observationWindow, {
        tandem: tandem.createTandem( 'grabDragInteraction' ),
        objectToGrabString: MembraneTransportFluent.a11y.ligandNode.accessibleName.createProperty( { ligandType: ligand.ligandType } ),

        accessibleHelpText: MembraneTransportFluent.a11y.ligandNode.accessibleHelpTextStringProperty,

        onGrab: inputType => {
          if ( inputType === 'alternative' ) {
            ligandInteractionCueVisibleProperty.value = false;

            // Make sure that this ligand is no longer bound to a ligand gated channel.
            this.ligand.unbindFromChannel();

            // --- Grab Logic ---
            this.isKeyboardGrabbed = true;
            this.initialPositionBeforeGrab = this.ligand.position.copy();
            this.ligand.mode = new UserControlledMode(); // Take control
            this.currentTargetSlotIndex = null; // Reset target until first move

            // const grabHintNeeded = hasShownGrabHint[ this.ligand.type ];
            MembraneTransportSounds.ligandGrabbed();

            // Stop any ongoing mouse/touch drag
            soundDragListener.interrupt();
          }
        },

        onRelease: inputType => {
          if ( inputType === 'alternative' ||

               // When escape is pressed, it calls a cancel event which shows up here as 'programmatic'.
               // But we don't want to run this logic for other programmatic cases, so also guard on this.isKeyboardGrabbed
               ( inputType === 'programmatic' && this.isKeyboardGrabbed )
          ) {
            const wasGrabbed = this.isKeyboardGrabbed; // Store state before resetting
            this.isKeyboardGrabbed = false;
            MembraneTransportSounds.ligandReleased();

            // Clear the position property so that on the next grab + move it will start at index 0.
            // Set without notifying listeners because we do not want the release to return the ligand
            // to the original position.
            ligandIndexProperty.setPropertyValue( INITIAL_POSITION_INDEX.copy() );

            if ( this.currentTargetSlotIndex === null ) {

              // Dropped without moving: treat as drop at original location (effectively a cancel without explicit alert)
              // OR cancelled by pressing escape
              affirm( this.initialPositionBeforeGrab, 'initialPositionBeforeGrab should be set before the listener fires.' );
              this.ligand.position.set( this.initialPositionBeforeGrab );

              this.alert( MembraneTransportFluent.a11y.ligandNode.releasedResponseStringProperty );
            }
            else if ( this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ) {

              // Drop off membrane: Use calculated position above "slot 8"
              this.ligand.position.set( this.getOffMembraneDropPosition() );
              this.alert( MembraneTransportFluent.a11y.ligandNode.releasedOffMembraneResponse.format( { ligandType: this.ligand.ligandType } ) );
            }
            else {

              // Drop on a slot (0 to SLOT_COUNT-1)
              const targetSlot = this.slots[ this.currentTargetSlotIndex ];

              // Drop visually centered above the slot
              const dropPosition = new Vector2( targetSlot.position, MODEL_DRAG_VERTICAL_OFFSET );
              this.ligand.position.set( dropPosition );

              const protein = targetSlot.transportProteinProperty.value;
              if ( protein instanceof LigandGatedChannel ) {

                if ( protein.stateProperty.value === 'closed' && this.isCompatibleLigand( protein ) ) {

                  // Allow immediate binding attempt by model
                  protein.clearRebindingCooldown();
                  this.alert( MembraneTransportFluent.a11y.ligandNode.releasedOnProteinResponseStringProperty );
                  this.ligand.manuallyBound = true;
                }
                else {
                  this.alert( MembraneTransportFluent.a11y.ligandNode.releasedOnBusyOrIncompatibleProteinResponseStringProperty );
                }
              }
              else {

                // Incompatible drop (wrong LGC, non-LGC, or empty slot)
                // Ligand mode is already set to random walk, starting from the dropPosition.
                this.alert( MembraneTransportFluent.a11y.ligandNode.releasedResponseStringProperty );
              }
            }

            // Reset state only if it was actually grabbed before this drop action
            if ( wasGrabbed ) {
              this.resetKeyboardInteractionState();
            }

            // If close to a target channel, it can bind. Otherwise, resume random walk.
            this.setLigandModeOnRelease();

            this.updateVisualPosition(); // Ensure view matches model after drop
          }
        },

        // The grab and release alerts are handled by the logic in onGrab and onRelease.
        createReleasedResponse: () => null,

        createGrabbedResponse: inputType => {
          if ( inputType === 'alternative' ) {
            // If there are no proteins, add a hint that guides to add more. If it is the first grab, add additional information about how to move the ligand. Otherwise, no hint.
            const patternMessageProperty = transportProteinCountProperty.value === 0 ? MembraneTransportFluent.a11y.ligandNode.grabbedResponseWithEmptyMembraneHint :
                                           grabDragInteraction.grabDragUsageTracker.numberOfKeyboardGrabs > 1 ? MembraneTransportFluent.a11y.ligandNode.grabbedResponse :
                                           MembraneTransportFluent.a11y.ligandNode.grabbedResponseWithHint;
            return patternMessageProperty.format( {
              proteinCount: transportProteinCountProperty
            } );
          }
          return null;
        }
      } );

      this.resetEmitter.addListener( () => {
        grabDragInteraction.reset();
      } );
    }

    // Scale the node view based on model dimensions
    const modelWidth = this.ligand.dimension.width;
    const viewWidth = this.modelViewTransform.modelToViewDeltaX( modelWidth );
    const viewScale = viewWidth / this.width; // Use initial (unscaled) width
    this.setScaleMagnitude( viewScale );

    // Must be done after scale is set above, otherwise the ligand is shrunken
    if ( focusable ) {

      const outline = new Circle( POTASSIUM_REGION_HEIGHT / 2, {
        translation: region.center,
        stroke: 'black',
        lineWidth: 15,

        // Adjusted so the phase matches
        lineDash: [ 50, 47 ],

        visibleProperty: ligandInteractionCueVisibleProperty
      } );

      this.addChild( outline );
    }

    // Initial positioning
    this.updateVisualPosition();

    Multilink.multilink( [
      soundDragListener.isPressedProperty,
      soundDragListener.isOverProperty
    ], ( isPressed, isOver ) => {

      if ( isOver ) {
        ligandInteractionCueVisibleProperty.value = false;
      }

      // If the ligand is already controlled, don't start walking when the pointer goes out.
      // Do not release a bound ligand by mouseover
      if ( !isPressed && ligand.mode.type !== 'ligandBound' ) {
        ligand.mode = isOver ? new UserOverMode() : Particle.createRandomWalkMode( true );
      }
    } );

    // When the unbinding happens after a NATURAL binding, don't speak this. We only want to hear this if the
    // binding occurs after a user-initiated action.
    ligandUnboundDueToNaturalCausesEmitter.addListener( ligand => {
      if ( ligand === this.ligand && this.ligand.manuallyBound ) {
        this.alert( MembraneTransportFluent.a11y.ligandNode.unboundResponseStringProperty );
        this.ligand.manuallyBound = false; // Reset the flag after alerting
      }
    }, { disposer: this } );
  }

  /**
   * Helper to reset keyboard interaction state variables.
   */
  private resetKeyboardInteractionState(): void {
    this.isKeyboardGrabbed = false;
    this.currentTargetSlotIndex = null;
    this.initialPositionBeforeGrab = null;
  }

  /**
   * Calculate the target model position when hovering over the off-membrane area ("slot 8").
   */
  private getOffMembraneDropPosition(): Vector2 {
    return new Vector2( 0, 50 );
  }

  /**
   * Calculate the target model position when hovering over a specific slot index.
   * @param slotIndex - 0 to SLOT_COUNT - 1
   */
  private getTargetPositionForSlot( slotIndex: number ): Vector2 {
    const targetSlot = this.slots[ slotIndex ];
    return new Vector2( targetSlot.position, MODEL_DRAG_VERTICAL_OFFSET );
  }

  /**
   * Update the visual position based on the ligand's actual model position.
   * Call this when not keyboard-dragging, or after a drop/cancel, so that even when paused this will still update.
   */
  private updateVisualPosition(): void {
    this.center = this.modelViewTransform.modelToViewPosition( this.ligand.position );
  }

  /**
   * Check if the ligand is compatible with the given LigandGatedChannel.
   */
  private isCompatibleLigand( protein: LigandGatedChannel ): boolean {
    return ( ( protein.type === 'sodiumIonLigandGatedChannel' && this.ligand.type === 'triangleLigand' ) ||
             ( protein.type === 'potassiumIonLigandGatedChannel' && this.ligand.type === 'starLigand' ) );
  }

  /**
   * Returns true if the provided slot has a ligand gated channel that is
   * available for binding this ligand.
   */
  private isNearbyChannelAvailableForBinding( slot: Slot ): boolean {
    const transportProtein = slot.transportProteinProperty.value;
    const distance = this.ligand.position.distance( new Vector2( slot.position, 0 ) ); // Check distance to binding site (y=0)

    return !!( transportProtein &&
               distance < CAPTURE_RADIUS_PROPERTY.value &&
               transportProtein instanceof LigandGatedChannel &&
               transportProtein.stateProperty.value === 'closed' &&
               this.isCompatibleLigand( transportProtein ) );
  }

  private alert( message: AlertableNoUtterance ): void {
    this.utterance.alert = message;
    this.alerter.alert( this.utterance );
  }

  /**
   * Upon release, set the ligand to immediately bind to a nearby ligand
   * gated channel if it is available for binding. Interrupts any other
   * ligands that are trying to bind to that same protein. If no nearby
   * protein is available for binding, return to random walk model.
   */
  private setLigandModeOnRelease(): void {

    // If releasing above a free ligand gated channel, bind to it. Otherwise, resume random walk.
    const closestSlot = _.minBy( this.slots, slot => this.ligand.position.distance( new Vector2( slot.position, 0 ) ) );
    if ( closestSlot && this.isNearbyChannelAvailableForBinding( closestSlot ) ) {

      // iterate over all particles and see if any are moving toward this protein. If they are, then put them back in random walk. Then proceed with
      // binding this ligand...
      this.ligands.forEach( otherLigand => {
        if ( otherLigand !== this.ligand && otherLigand.mode.type === 'moveToLigandBindingLocation' ) {
          otherLigand.mode = Particle.createRandomWalkMode( true );
        }
      } );

      const protein = closestSlot.transportProteinProperty.value as LigandGatedChannel;

      // Clear the binding cooldown so that the ligand can be immediately placed on release.
      protein.clearRebindingCooldown();
      protein.bindLigand( this.ligand );
    }
    else {
      this.ligand.mode = Particle.createRandomWalkMode( true );
    }

    // Ensure view matches model after drop since view position usually only updates during step().
    this.updateVisualPosition();
  }

  /**
   * Update the view node's position based on the model particle's position.
   * Overrides the default step if keyboard interaction is active.
   */
  public step(): void {
    this.updateVisualPosition();
  }
}
membraneTransport.register( 'LigandNode', LigandNode );