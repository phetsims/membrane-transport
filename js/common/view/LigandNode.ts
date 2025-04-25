// Copyright 2025, University of Colorado Boulder

/**
 * LigandNode is a node that represents a ligand in the simulation.
 * Added keyboard interaction following the pattern of MembraneGroupSelectView.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// TODO: Add Accessible Names: https://github.com/phetsims/membrane-transport/issues/45
// TODO: i18n https://github.com/phetsims/membrane-transport/issues/45
// TODO: Improve the API for tandems for rich drag listeners. https://github.com/phetsims/membrane-transport/issues/124
// TODO: When mousing over a bound ligand, it causes unbinding, but should remain bound. https://github.com/phetsims/membrane-transport/issues/45
// TODO: When a ligand is bound, it cannot be unbound by the user, see https://github.com/phetsims/membrane-transport/issues/45

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Alerter from '../../../../scenery-phet/js/accessibility/describers/Alerter.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Utterance, { AlertableNoUtterance } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
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
const MODEL_DRAG_VERTICAL_OFFSET = 10;

// Off-membrane target index, analogous to the protein toolbox drop zone
const OFF_MEMBRANE_SLOT_INDEX = SLOT_COUNT;

// Track if the initial grab hint has been shown for each ligand type. Static to persist across instances.
const hasShownGrabHint: Record<LigandType, boolean> = {
  ligandA: true, // Needs showing first time
  ligandB: true  // Needs showing first time
};

export default class LigandNode extends Node {

  private readonly ligand: Particle<LigandType>;
  private readonly modelViewTransform: ModelViewTransform2;

  // Keyboard interaction state
  private isKeyboardGrabbed = false;
  private currentTargetSlotIndex: number | null = null; // 0 to SLOT_COUNT-1 for slots, SLOT_COUNT for off-membrane, null if not targeted
  private initialPositionBeforeGrab: Vector2 | null = null;

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

        innerContent: ligandView.type === 'ligandA' ? MembraneTransportStrings.a11y.triangleLigandStringProperty : MembraneTransportStrings.a11y.starLigandStringProperty,
        appendDescription: true // Append help text dynamically later if needed

        // TODO: https://github.com/phetsims/membrane-transport/issues/45
        // descriptionContent: MembraneTransportMessages.ligandDescriptionPatternStringProperty, // Default description
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
      blur: () => {

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

    const soundRichDragListener = new SoundRichDragListener( {
      start: event => {
        // Prevent interaction if grabbed by keyboard
        if ( this.isKeyboardGrabbed ) {
          // listener.interrupt();
          return;
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

        const setConstrainedPosition = ( proposedPosition: Vector2 ) => {
          const boundModelPoint = MembraneTransportConstants.OUTSIDE_CELL_BOUNDS.closestPointTo( proposedPosition );
          isOnBoundaryProperty.value = !boundModelPoint.equals( proposedPosition );
          ligand.position.set( boundModelPoint );
        };

        if ( event.isFromPDOM() ) {
          // This path should ideally not be taken if useAccessibleDraggable is false,
          // but handle defensively. We use custom keyboard controls.
          // console.warn( 'PDOM drag event received unexpectedly by SoundRichDragListener' );
        }
        else {
          const localPoint = this.globalToParentPoint( event.pointer.point );
          const modelPointerPosition = this.modelViewTransform.viewToModelPosition( localPoint );
          const proposedPosition = modelPointerPosition.minus( pressOffset! );
          setConstrainedPosition( proposedPosition );
        }
      },
      end: () => {
        // Prevent interaction if grabbed by keyboard
        if ( this.isKeyboardGrabbed ) {
          return;
        }

        ligand.mode = soundRichDragListener.dragListener.isOverOrFocusedProperty.value ? { type: 'userOver', slot: null } : Particle.createRandomWalkMode( true );

        // If the ligand is release within the capture radius of a corresponding ligand gated channel, clear the ligand gated channel cooldown so it can immediately bind.
        this.checkAndClearBindingCooldown();

        pressOffset = null;
      },
      transform: this.modelViewTransform,
      dragListenerOptions: {
        tandem: tandem.createTandem( 'dragListener' )
      },
      keyboardDragListenerOptions: {
        // We are implementing custom keyboard logic, disable the default
        enabled: false // Disable default keyboard drag behavior
      }
    } );

    // All ligands can be mouse-controlled, but only one of each type can be keyboard-focused
    this.addInputListener( soundRichDragListener );

    // Custom Keyboard Interaction Listener
    if ( focusable ) {
      const keyboardListener = new KeyboardListener( {
        keys: [ 'space', 'enter', 'arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight', 'w', 's', 'a', 'd', 'escape' ],
        fireOnHold: true, // Allow holding arrow keys for movement
        fire: ( event, keysPressed ) => {
          // Ignore if focus is lost or interaction disabled somehow
          if ( !this.focused ) { return; }

          const key = keysPressed;

          if ( [ 'space', 'enter' ].includes( key ) ) {

            if ( !this.isKeyboardGrabbed ) {
              // --- Grab Logic ---
              this.isKeyboardGrabbed = true;
              this.initialPositionBeforeGrab = this.ligand.position.copy();
              this.ligand.mode = { type: 'userControlled', slot: null }; // Take control
              this.currentTargetSlotIndex = null; // Reset target until first move

              const grabHintNeeded = hasShownGrabHint[ this.ligand.type ];

              // Alerting + Hint
              // TODO: https://github.com/phetsims/membrane-transport/issues/45
              // const ligandTypeName = ligandView.type === 'ligandA' ? MembraneTransportMessages.triangleLigandStringProperty : MembraneTransportMessages.starLigandStringProperty;
              // const messageTemplate = grabHintNeeded ? MembraneTransportMessages.grabbedLigandWithHintPatternStringProperty : MembraneTransportMessages.grabbedLigandPatternStringProperty;
              //
              // this.alert( FluentUtils.formatMessage( messageTemplate, {
              //   ligandName: ligandTypeName.value // Pass the string value
              // } ) );

              if ( grabHintNeeded ) {
                hasShownGrabHint[ this.ligand.type ] = false;
              }

              // const grabHintNeeded = hasShownGrabHint[ this.ligand.type ];
              // MembraneTransportSounds.ligandGrabbed();

              // Stop any ongoing mouse/touch drag
              soundRichDragListener.interrupt();

            }
            else {
              // --- Drop Logic ---

              const wasGrabbed = this.isKeyboardGrabbed; // Store state before resetting
              this.isKeyboardGrabbed = false;

              if ( this.currentTargetSlotIndex === null ) {

                // Dropped without moving: treat as drop at original location (effectively a cancel without explicit alert)
                this.ligand.position.set( this.initialPositionBeforeGrab! );

                this.alert( MembraneTransportStrings.a11y.releasedLigandStringProperty );
                MembraneTransportSounds.ligandReleased();
              }
              else if ( this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ) {
                // Drop off membrane: Use calculated position above "slot 8"
                const offMembranePosition = this.getOffMembraneDropPosition();
                this.ligand.position.set( offMembranePosition );

                // TODO: https://github.com/phetsims/membrane-transport/issues/45
                // this.alert( MembraneTransportMessages.ligandReleasedOffMembranePatternStringProperty, { ligandName: this.getLigandTypeName() } );
                // MembraneTransportSounds.ligandReleased();
              }
              else {
                // Drop on a slot (0 to SLOT_COUNT-1)
                const targetSlot = this.slots[ this.currentTargetSlotIndex ];
                // Drop visually centered above the slot
                const dropPosition = new Vector2( targetSlot.position, MODEL_DRAG_VERTICAL_OFFSET );
                this.ligand.position.set( dropPosition );

                const protein = targetSlot.transportProteinProperty.value;
                let correctDrop = false;
                if ( protein instanceof LigandGatedChannel && this.isCompatibleLigand( protein ) ) {
                  correctDrop = true;

                  // Allow immediate binding attempt by model
                  protein.clearRebindingCooldown();

                  // TODO: https://github.com/phetsims/membrane-transport/issues/45
                  // this.alert( MembraneTransportMessages.ligandReleasedOnProteinPatternStringProperty, {
                  //   ligandName: this.getLigandTypeName(),
                  //   proteinName: getBriefProteinName( protein.type ).value
                  // } );
                  MembraneTransportSounds.ligandBound();
                  // Model's physics update loop will handle the actual binding and state change.
                }

                if ( !correctDrop ) {
                  // Incompatible drop (wrong LGC, non-LGC, or empty slot)

                  // TODO: https://github.com/phetsims/membrane-transport/issues/45
                  // this.alert( MembraneTransportMessages.ligandReleasedAboveSlotPatternStringProperty, {
                  //   ligandName: this.getLigandTypeName(),
                  //   slotNumber: this.currentTargetSlotIndex + 1 // User-facing index is 1-based
                  // } );
                  // MembraneTransportSounds.ligandReleased();
                  // Ligand mode is already set to random walk, starting from the dropPosition.
                }
              }

              // Reset state only if it was actually grabbed before this drop action
              if ( wasGrabbed ) {
                this.resetKeyboardInteractionState();
              }

              // Resume random walk. If close to a target channel, it can bind.
              this.ligand.mode = Particle.createRandomWalkMode( true );

              this.updateVisualPosition(); // Ensure view matches model after drop
            }
          }
          else if ( [ 'arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight', 'w', 's', 'a', 'd' ].includes( key ) ) {
            if ( this.isKeyboardGrabbed ) {

              // --- Movement Logic ---
              let newIndex: number;
              const isLeftOrDown = [ 'arrowLeft', 'a', 'arrowDown', 's' ].includes( key );
              const delta = isLeftOrDown ? -1 : 1;

              if ( this.currentTargetSlotIndex === null ) {
                newIndex = 0; // First move snaps to slot 0
              }
              else {
                newIndex = clamp( this.currentTargetSlotIndex + delta, 0, OFF_MEMBRANE_SLOT_INDEX ); // Clamp between slot 0 and off-membrane index
              }

              if ( newIndex !== this.currentTargetSlotIndex ) {
                this.currentTargetSlotIndex = newIndex;
                // TODO: Add distinct left/right sounds if desired. See https://github.com/phetsims/membrane-transport/issues/45
                // TODO: https://github.com/phetsims/membrane-transport/issues/45
                // MembraneTransportSounds.ligandMoved();

                // Alert new target
                // TODO: https://github.com/phetsims/membrane-transport/issues/45
                // let targetDesc;
                // if ( this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ) {
                //   targetDesc = MembraneTransportMessages.offMembraneStringProperty.value;
                // }
                // else {
                //   const targetSlot = this.slots[ this.currentTargetSlotIndex ];
                //   const protein = targetSlot.transportProteinProperty.value;
                //   const contentsDesc = protein ? getBriefProteinName( protein.type ).value : MembraneTransportMessages.emptyStringProperty.value;
                //   targetDesc = FluentUtils.formatMessage( MembraneTransportMessages.slotDescriptionPatternStringProperty, {
                //     slotNumber: this.currentTargetSlotIndex + 1,
                //     slotContents: contentsDesc
                //   } );
                // }
                // this.alert( targetDesc );

              }
              else {
                MembraneTransportSounds.boundaryReached();
              }

              // Update visual position to be centered *above* the target slot/area
              let targetModelPosition: Vector2;
              if ( this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ) {
                targetModelPosition = this.getOffMembraneDropPosition();
              }
              else {
                targetModelPosition = this.getTargetPositionForSlot( this.currentTargetSlotIndex );
              }
              this.ligand.position.set( targetModelPosition );
              this.updateVisualPosition();
            }
          }
          else if ( key === 'escape' ) {
            if ( this.isKeyboardGrabbed ) {

              // --- Cancel Logic ---
              this.isKeyboardGrabbed = false;
              this.ligand.position.set( this.initialPositionBeforeGrab! ); // Return to start position
              this.ligand.mode = Particle.createRandomWalkMode( true ); // Release control

              // TODO: https://github.com/phetsims/membrane-transport/issues/45
              // this.alert( MembraneTransportMessages.ligandMoveCancelledPatternStringProperty, { ligandName: this.getLigandTypeName() } );
              // MembraneTransportSounds.ligandReleased(); // Use release sound for cancel

              this.resetKeyboardInteractionState();
              this.updateVisualPosition(); // Ensure view matches model after cancel
            }
          }
        }
      } );
      this.addInputListener( keyboardListener );
    }

    // Scale the node view based on model dimensions
    const modelWidth = this.ligand.dimension.width;
    const viewWidth = this.modelViewTransform.modelToViewDeltaX( modelWidth );
    const viewScale = viewWidth / this.width; // Use initial (unscaled) width
    this.setScaleMagnitude( viewScale );

    // Initial positioning
    this.updateVisualPosition();

    soundRichDragListener.dragListener.isOverProperty.link( isOver => {

      // If the ligand is already controlled, don't start walking when the pointer goes out
      if ( ligand.mode.type !== 'userControlled' ) {
        ligand.mode = isOver ? { type: 'userOver', slot: null } : Particle.createRandomWalkMode( true );
      }
    } );
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
    return this.ligand.type === 'ligandA' ? MembraneTransportStrings.a11y.triangleLigandStringProperty : MembraneTransportStrings.a11y.starLigandStringProperty;
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
   * Call this when not keyboard-dragging, or after a drop/cancel.
   */
  private updateVisualPosition(): void {
    this.center = this.modelViewTransform.modelToViewPosition( this.ligand.position );
  }

  /**
   * Check if the ligand is compatible with the given LigandGatedChannel.
   */
  private isCompatibleLigand( protein: LigandGatedChannel ): boolean {
    return ( ( protein.type === 'sodiumIonLigandGatedChannel' && this.ligand.type === 'ligandA' ) ||
             ( protein.type === 'potassiumIonLigandGatedChannel' && this.ligand.type === 'ligandB' ) );
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