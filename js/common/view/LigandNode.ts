// Copyright 2025, University of Colorado Boulder

/**
 * LigandNode is a node that represents a ligand in the simulation.
 * Added keyboard interaction following the pattern of MembraneGroupSelectView.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// TODO: Improve the API for tandems for rich drag listeners. https://github.com/phetsims/membrane-transport/issues/124
// TODO: Improve the position of the message about grabbing the ligand. See https://github.com/phetsims/membrane-transport/issues/126

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Alerter from '../../../../scenery-phet/js/accessibility/describers/Alerter.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import GrabDragInteraction from '../../../../scenery-phet/js/accessibility/grab-drag/GrabDragInteraction.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
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
import getBriefProteinName from './proteins/getBriefProteinName.js';

// constants
// Vertical offset for the ligand when dragged via keyboard, similar to proteins
const MODEL_DRAG_VERTICAL_OFFSET = 10;

// Off-membrane target index, analogous to the protein toolbox drop zone
const OFF_MEMBRANE_SLOT_INDEX = SLOT_COUNT;

export default class LigandNode extends Node {

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
        innerContent: ligandView.type === 'ligandA' ? MembraneTransportStrings.a11y.ligandNode.triangleLigandStringProperty : MembraneTransportStrings.a11y.ligandNode.starLigandStringProperty
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

    const positionProperty = new Vector2Property( new Vector2( -1, 0 ) );
    this.resetEmitter.addListener( () => positionProperty.reset() );

    positionProperty.lazyLink( position => {

      // Fun hack, x + y = index. If the user pushes up, it should move to the right, so we add x + y.
      const newIndex = clamp( roundSymmetric( position.x + position.y ), 0, OFF_MEMBRANE_SLOT_INDEX );

      if ( newIndex !== this.currentTargetSlotIndex ) {
        this.currentTargetSlotIndex = newIndex;
        MembraneTransportSounds.itemMoved( newIndex > this.currentTargetSlotIndex ? 'right' : 'left' );

        const targetSlot = this.slots[ newIndex ];
        const protein = targetSlot?.transportProteinProperty.value;

        const additionalInformation = protein ?
                                      new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.thereIsProteinAtThisSlotPatternStringProperty, { proteinName: getBriefProteinName( protein.type ).value } ) :
                                      MembraneTransportStrings.a11y.ligandNode.thereIsNoProteinAtThisSlotStringProperty;

        this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.ligandMovedToSlotPatternStringProperty, {
          ligandType: this.getLigandTypeName(),
          slotNumber: newIndex + 1,
          additionalInformation: additionalInformation
        } ) );
      }
      else {
        MembraneTransportSounds.boundaryReached();
      }

      // Update position to be centered *above* the target slot/area
      const targetModelPosition = this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ? this.getOffMembraneDropPosition() :
                                  this.getTargetPositionForSlot( this.currentTargetSlotIndex );
      this.ligand.position.set( targetModelPosition );
      this.updateVisualPosition();
    } );

    // Custom Keyboard Interaction Listener
    if ( focusable ) {

      const escListener = new KeyboardListener( {
        keys: [ 'escape' ],
        fire: () => {
          // Ignore if focus is lost or interaction disabled somehow
          if ( !this.focused ) { return; }
          if ( this.isKeyboardGrabbed ) {

            // --- Cancel Logic ---
            this.isKeyboardGrabbed = false;
            this.ligand.position.set( this.initialPositionBeforeGrab! ); // Return to start position
            this.ligand.mode = Particle.createRandomWalkMode( true ); // Release control

            this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.moveCancelledPatternStringProperty, { ligandType: this.getLigandTypeName() } ) );
            MembraneTransportSounds.ligandReleased(); // Use release sound for cancel

            this.resetKeyboardInteractionState();
            this.updateVisualPosition(); // Ensure view matches model after cancel
          }
        }
      } );
      this.addInputListener( escListener );

      // Unfortunately, the KeyboardDragListener doesn't support "press up/down to move horizontally" sort of functionality. Do we need that?
      // TODO https://github.com/phetsims/membrane-transport/issues/125
      const keyboardListener = new KeyboardDragListener( {
        positionProperty: positionProperty,
        dragDelta: 1,
        shiftDragDelta: 1,
        dragBoundsProperty: new Property( new Bounds2( 0, 0, 7, 0 ) ),
        keyboardDragDirection: 'leftRight'
      } );

      const grabDragInteraction = new GrabDragInteraction( this, keyboardListener, observationWindow, {
        tandem: tandem.createTandem( 'grabDragInteraction' ),
        objectToGrabString: this.getLigandTypeName(),

        onGrab: () => {

          // --- Grab Logic ---
          this.isKeyboardGrabbed = true;
          this.initialPositionBeforeGrab = this.ligand.position.copy();
          this.ligand.mode = { type: 'userControlled', slot: null }; // Take control
          this.currentTargetSlotIndex = null; // Reset target until first move

          // Alerting + Hint
          this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.grabbedLigandStringProperty, { ligandType: this.getLigandTypeName() } ) );

          // const grabHintNeeded = hasShownGrabHint[ this.ligand.type ];
          MembraneTransportSounds.ligandGrabbed();

          // Stop any ongoing mouse/touch drag
          soundRichDragListener.interrupt();
        },

        onRelease: () => {
          // --- Drop Logic ---

          const wasGrabbed = this.isKeyboardGrabbed; // Store state before resetting
          this.isKeyboardGrabbed = false;
          MembraneTransportSounds.ligandReleased();

          if ( this.currentTargetSlotIndex === null ) {

            // Dropped without moving: treat as drop at original location (effectively a cancel without explicit alert)
            this.ligand.position.set( this.initialPositionBeforeGrab! );

            // TODO: Some alerts are redundant with GrabDragInteraction now, see https://github.com/phetsims/membrane-transport/issues/128
            this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.releasedLigandStringProperty, { ligandType: this.getLigandTypeName() } ) );
          }
          else if ( this.currentTargetSlotIndex === OFF_MEMBRANE_SLOT_INDEX ) {

            // Drop off membrane: Use calculated position above "slot 8"
            const offMembranePosition = this.getOffMembraneDropPosition();
            this.ligand.position.set( offMembranePosition );

            this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.ligandReleasedOffMembranePatternStringProperty, { ligandType: this.getLigandTypeName() } ) );
          }
          else {
            // Drop on a slot (0 to SLOT_COUNT-1)
            const targetSlot = this.slots[ this.currentTargetSlotIndex ];
            // Drop visually centered above the slot
            const dropPosition = new Vector2( targetSlot.position, MODEL_DRAG_VERTICAL_OFFSET );
            this.ligand.position.set( dropPosition );

            const protein = targetSlot.transportProteinProperty.value;
            if ( protein instanceof LigandGatedChannel && this.isCompatibleLigand( protein ) ) {


              if ( protein.stateProperty.value === 'closed' ) {

                // Allow immediate binding attempt by model
                protein.clearRebindingCooldown();

                this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty, {
                  ligandType: this.getLigandTypeName(),
                  proteinName: getBriefProteinName( protein.type ).value
                } ) );
              }
              else {
                this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnBusyProteinPatternStringProperty, {
                  ligandType: this.getLigandTypeName(),
                  proteinName: getBriefProteinName( protein.type ).value
                } ) );
              }
            }
            else {

              // Incompatible drop (wrong LGC, non-LGC, or empty slot)
              // Ligand mode is already set to random walk, starting from the dropPosition.
              this.alert( new PatternStringProperty( MembraneTransportStrings.a11y.ligandNode.releasedLigandStringProperty, { ligandType: this.getLigandTypeName() } ) );
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
      } );

      this.resetEmitter.addListener( () => grabDragInteraction.reset() );
    }

    // Scale the node view based on model dimensions
    const modelWidth = this.ligand.dimension.width;
    const viewWidth = this.modelViewTransform.modelToViewDeltaX( modelWidth );
    const viewScale = viewWidth / this.width; // Use initial (unscaled) width
    this.setScaleMagnitude( viewScale );

    // Initial positioning
    this.updateVisualPosition();

    soundRichDragListener.dragListener.isOverProperty.link( isOver => {

      // If the ligand is already controlled, don't start walking when the pointer goes out.
      // Do not release a bound ligand by mouseover
      if ( ligand.mode.type !== 'userControlled' && ligand.mode.type !== 'ligandBound' ) {
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
    return this.ligand.type === 'ligandA' ? MembraneTransportStrings.a11y.ligandNode.triangleLigandStringProperty : MembraneTransportStrings.a11y.ligandNode.starLigandStringProperty;
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