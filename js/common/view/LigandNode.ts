// Copyright 2025, University of Colorado Boulder

/**
 * LigandNode is a node that represents a ligand in the simulation.
 * Added keyboard interaction following the pattern of MembraneGroupSelectView.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Alerter from '../../../../scenery-phet/js/accessibility/describers/Alerter.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import GrabDragInteraction from '../../../../scenery-phet/js/accessibility/grab-drag/GrabDragInteraction.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Utterance, { AlertableNoUtterance } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings, { membrane_transportStringsNewInterface } from '../../MembraneTransportStrings.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import { SLOT_COUNT } from '../model/MembraneTransportModel.js';
import Particle, { CAPTURE_RADIUS_PROPERTY } from '../model/Particle.js';
import LigandGatedChannel from '../model/proteins/LigandGatedChannel.js';
import Slot from '../model/Slot.js';
import { LigandType } from '../model/SoluteType.js';
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

export default class LigandNode extends InteractiveHighlightingNode {

  private readonly ligand: Particle<LigandType>;
  private readonly modelViewTransform: ModelViewTransform2;

  // Keyboard interaction state
  private isKeyboardGrabbed = false;
  private currentTargetSlotIndex: number | null = null; // 0 to SLOT_COUNT-1 for slots, SLOT_COUNT for off-membrane, null if not targeted
  private initialPositionBeforeGrab: Vector2 | null = null;

  public readonly resetEmitter = new Emitter();

  private readonly utterance = new Utterance( {

    // This utterance is not registered to a Node, and so it will always be spoken.
    voicingCanAnnounceProperties: [ new Property( true ) ]
  } );
  private readonly alerter: Alerter;

  public constructor(
    private readonly slots: Slot[],
    areLigandsAddedProperty: TProperty<boolean>,
    ligand: Particle<LigandType>,
    modelViewTransform: ModelViewTransform2,
    ligandView: LigandParticleNode,
    focusable: boolean,
    transportProteinCountProperty: TProperty<number>,
    ligandUnboundDueToNaturalCausesEmitter: Emitter<[ Particle<LigandType> ]>,
    tandem: Tandem,
    observationWindow: Node
  ) {

    // Options for both focusable and non-focusable cases
    const sharedOptions = {
      children: [ ligandView ],
      visibleProperty: areLigandsAddedProperty,
      cursor: 'pointer'
    };

    const options =
      focusable ?
      ( combineOptions<NodeOptions>( {
        tagName: 'button', // Treat as a button for focus/activation
        labelTagName: 'p', // Contains the accessible name
        containerTagName: 'div', // Required for labelTagName
        innerContent: ligandView.type === 'triangleLigand' ? MembraneTransportStrings.a11y.ligandNode.triangleLigandStringProperty : MembraneTransportStrings.a11y.ligandNode.starLigandStringProperty
      }, AccessibleDraggableOptions, sharedOptions ) ) :
      sharedOptions;

    super( options );

    // Expand the hit area for touch/mouse interactions, so it is easier to grab with the mouse
    this.mouseArea = this.touchArea = this.localBounds.dilated( 50 );

    this.alerter = new Alerter( {
      descriptionAlertNode: observationWindow
    } );

    // Scenery provides isFocused() as a method, but we must convert it to a Property so we can observe changes.
    this.addInputListener( {

      focus: () => {
        this.ligand.focused = true;
      },
      blur: () => {

        this.ligand.focused = false;

        // Resume brownian motion when focus is lost
        this.ligand.mode = Particle.createRandomWalkMode( true );
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
        // Prevent interaction if grabbed by keyboard
        if ( this.isKeyboardGrabbed ) {
          // listener.interrupt();
          return;
        }

        if ( ligand.mode.type === 'ligandBound' ) {
          ligand.mode.ligandGatedChannel.unbindLigand();
        }

        ligand.mode = { type: 'userControlled', slot: null };

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

        // Upon release of a mouse/touch drag, resume random walk. This also allows the ligand to bind if close to a target.
        ligand.mode = Particle.createRandomWalkMode( true );

        // If the ligand is release within the capture radius of a corresponding ligand gated channel, clear the ligand gated channel cooldown so it can immediately bind.
        this.checkAndClearBindingCooldown();

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
      }

      if ( newIndex !== null && newIndex !== this.currentTargetSlotIndex ) {
        this.currentTargetSlotIndex = newIndex;
        MembraneTransportSounds.itemMoved( newIndex > this.currentTargetSlotIndex ? 'right' : 'left' );

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
            this.alert( membrane_transportStringsNewInterface.ligandMovedAboveLeakageChannelPattern.format( {
              type: protein.type,
              transportProteinCount: transportProteinCountProperty,
              index: index
            } ) );
          }
          else if ( isLigandGatedChannel ) {
            this.alert( membrane_transportStringsNewInterface.ligandMovedAboveLigandGatedChannelPattern.format( {
              openOrClosed: protein.openOrClosedProperty,
              index: index,
              type: protein.type,
              ligandType: this.ligand.type,
              transportProteinCount: transportProteinCountProperty
            } ) );
          }
          else {
            this.alert( membrane_transportStringsNewInterface.ligandMovedAboveOtherChannelPattern.format( {
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
        keys: [ 'escape' ],
        fire: () => {
          // Ignore if focus is lost or interaction disabled somehow
          if ( !this.focused ) { return; }
          if ( this.isKeyboardGrabbed ) {
            affirm( this.initialPositionBeforeGrab, 'initialPositionBeforeGrab should be set before the listener fires.' );

            // --- Cancel Logic ---
            this.isKeyboardGrabbed = false;
            this.ligand.position.set( this.initialPositionBeforeGrab ); // Return to start position
            this.ligand.mode = Particle.createRandomWalkMode( true ); // Release control

            this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.moveCancelledPatternStringProperty, { ligandType: this.getLigandTypeName() } ) );
            MembraneTransportSounds.ligandReleased(); // Use release sound for cancel

            this.resetKeyboardInteractionState();
            this.updateVisualPosition(); // Ensure view matches model after cancel
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

      const grabDragInteraction = new GrabDragInteraction( this, keyboardListener, observationWindow, {
        tandem: tandem.createTandem( 'grabDragInteraction' ),
        objectToGrabString: this.getLigandTypeName(),

        accessibleHelpText: MembraneTransportStrings.a11y.ligandNode.accessibleHelpTextStringProperty,

        onGrab: () => {

          if ( ligand.mode.type === 'ligandBound' ) {
            ligand.mode.ligandGatedChannel.unbindLigand();
          }

          // --- Grab Logic ---
          this.isKeyboardGrabbed = true;
          this.initialPositionBeforeGrab = this.ligand.position.copy();
          this.ligand.mode = { type: 'userControlled', slot: null }; // Take control
          this.currentTargetSlotIndex = null; // Reset target until first move

          // const grabHintNeeded = hasShownGrabHint[ this.ligand.type ];
          MembraneTransportSounds.ligandGrabbed();

          // Stop any ongoing mouse/touch drag
          soundDragListener.interrupt();
        },

        onRelease: () => {
          // --- Drop Logic ---

          const wasGrabbed = this.isKeyboardGrabbed; // Store state before resetting
          this.isKeyboardGrabbed = false;
          MembraneTransportSounds.ligandReleased();

          // Clear the position property so that on the next grab + move it will start at index 0.
          // Set without notifying listeners because we do not want the release to return the ligand
          // to the original position.
          ligandIndexProperty.setPropertyValue( INITIAL_POSITION_INDEX.copy() );

          if ( this.currentTargetSlotIndex === null ) {

            // Dropped without moving: treat as drop at original location (effectively a cancel without explicit alert)
            affirm( this.initialPositionBeforeGrab, 'initialPositionBeforeGrab should be set before the listener fires.' );
            this.ligand.position.set( this.initialPositionBeforeGrab );

            this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.releasedLigandStringProperty, { ligandType: this.getLigandTypeName() } ) );
          }
          else if ( this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ) {

            // Drop off membrane: Use calculated position above "slot 8"
            this.ligand.position.set( this.getOffMembraneDropPosition() );

            this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.ligandReleasedOffMembranePatternStringProperty, { ligandType: this.getLigandTypeName() } ) );
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

                this.alert( MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty );
              }
              else {
                this.alert( MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty );
              }
            }
            else {

              // Incompatible drop (wrong LGC, non-LGC, or empty slot)
              // Ligand mode is already set to random walk, starting from the dropPosition.
              this.alert( MembraneTransportStrings.a11y.ligandNode.releasedLigandStringProperty );
            }
          }

          // Reset state only if it was actually grabbed before this drop action
          if ( wasGrabbed ) {
            this.resetKeyboardInteractionState();
          }

          // Resume random walk. If close to a target channel, it can bind.
          this.ligand.mode = Particle.createRandomWalkMode( true );

          this.updateVisualPosition(); // Ensure view matches model after drop
        },

        // The grab and release alerts are handled by the logic in onGrab and onRelease.
        createReleasedResponse: () => null,

        // TODO: Why the type error on this line too? Related to the one below?
        createGrabbedResponse: () => {

          // If there are no proteins, add a hint that guides to add more. If it is the first grab, add additional information about how to move the ligand. Otherwise, no hint.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error TODO: Why do we need to declare this type? https://github.com/phetsims/membrane-transport/issues/45, https://github.com/phetsims/chipper/issues/1588
          const patternMessageProperty = transportProteinCountProperty.value === 0 ? membrane_transportStringsNewInterface.grabbedLigandResponseWithEmptyMembraneHintPattern :
                                         grabDragInteraction.grabDragUsageTracker.numberOfKeyboardGrabs > 1 ? membrane_transportStringsNewInterface.grabbedLigandResponsePattern :
                                         membrane_transportStringsNewInterface.grabbedLigandResponseWithHintPattern;
          return patternMessageProperty.format( {
            proteinCount: transportProteinCountProperty
          } );
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

    // Initial positioning
    this.updateVisualPosition();

    soundDragListener.isOverProperty.link( isOver => {

      // If the ligand is already controlled, don't start walking when the pointer goes out.
      // Do not release a bound ligand by mouseover
      if ( ligand.mode.type !== 'userControlled' && ligand.mode.type !== 'ligandBound' ) {
        ligand.mode = isOver ? { type: 'userOver', slot: null } : Particle.createRandomWalkMode( true );
      }
    } );

    ligandUnboundDueToNaturalCausesEmitter.addListener( ligand => {
      if ( ligand === this.ligand ) {
        this.alert( MembraneTransportStrings.a11y.ligandNode.ligandUnboundAlertStringProperty );
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
   * Get the user-friendly name for the ligand type.
   */
  private getLigandTypeName(): TReadOnlyProperty<string> {
    return this.ligand.type === 'triangleLigand' ? MembraneTransportStrings.a11y.ligandNode.triangleLigandStringProperty : MembraneTransportStrings.a11y.ligandNode.starLigandStringProperty;
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
   * Checks if the ligand is near a compatible, closed LGC and clears the cooldown if so.
   * This is called after a mouse/touch drag ends. The keyboard drop handles this inline.
   */
  private checkAndClearBindingCooldown(): void {
    for ( let i = 0; i < this.slots.length; i++ ) {
      const slot = this.slots[ i ];
      const transportProtein = slot.transportProteinProperty.value;
      const distance = this.ligand.position.distance( new Vector2( slot.position, 0 ) ); // Check distance to binding site (y=0)

      if ( transportProtein &&
           distance < CAPTURE_RADIUS_PROPERTY.value &&
           transportProtein instanceof LigandGatedChannel &&
           transportProtein.stateProperty.value === 'closed' &&
           this.isCompatibleLigand( transportProtein ) ) {
        transportProtein.clearRebindingCooldown();
      }
    }
  }

  private alert( message: AlertableNoUtterance ): void {
    this.utterance.alert = message;
    this.alerter.alert( this.utterance );
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