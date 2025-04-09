// Copyright 2025, University of Colorado Boulder

/**
 * LigandNode is a node that represents a ligand in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import Particle from '../model/Particle.js';
import { LigandType } from '../model/SoluteType.js';

export default class LigandNode extends Node {
  public constructor(
    areLigandsAddedProperty: TProperty<boolean>,
    private readonly ligands: Particle<LigandType>[],
    private readonly ligandIndex: number,
    private readonly modelViewTransform: ModelViewTransform2,
    ligandView: Node,
    tandem: Tandem,
    focusable: boolean
  ) {

    const options = combineOptions<NodeOptions>( {
      children: [ ligandView ],
      visibleProperty: areLigandsAddedProperty,
      cursor: 'pointer',

      /* TODO (JG/SR): Add the type of ligand. Add i18n. * Ligand Accessible Names:
      * Sodium-specific ligand
      * Potassium-specific ligand
      *
      * This is complicated by the operateOnLigand method, and I recommend we design a better way.
      * - Maybe the model should always allocate the Ligands, but they may or may not participate based on the settings.
      * - Or we can use the index or other metadata to identify the ligand.
      */
      accessibleName: 'Ligand',

      focusable: focusable
    }, AccessibleDraggableOptions, {

      // Must take precedence over the AccessibleDraggableOptions which has focusable: true
      focusable: focusable
    } );

    super( options );

    // For dragging relative to the press point on the ligand
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
        this.operateOnLigand( ligand => {
          ligand.mode = { type: 'userControlled', slot: null };

          // Store initial offset from pointer to ligand position
          const localPoint = this.globalToParentPoint( event.pointer.point );
          const modelPoint = this.modelViewTransform.viewToModelPosition( localPoint );
          pressOffset = modelPoint.minus( ligand.position );
        } );
      },
      drag: ( event, listener ) => {

        this.operateOnLigand( ligand => {

          const setConstrainedPosition = ( proposedPosition: Vector2 ) => {
            const boundModelPoint = MembraneTransportConstants.OUTSIDE_CELL_BOUNDS.closestPointTo( proposedPosition );
            isOnBoundaryProperty.value = !boundModelPoint.equals( proposedPosition );
            ligand.position.set( boundModelPoint );
          };

          if ( event.isFromPDOM() ) {
            const proposedPosition = ligand.position.plus( listener.modelDelta );
            setConstrainedPosition( proposedPosition );
          }
          else {
            const localPoint = this.globalToParentPoint( event.pointer.point );
            const modelPointerPosition = this.modelViewTransform.viewToModelPosition( localPoint );
            const proposedPosition = modelPointerPosition.minus( pressOffset! );
            setConstrainedPosition( proposedPosition );
          }
        } );
      },
      end: () => {
        this.operateOnLigand( ligand => {
          ligand.mode = soundRichDragListener.dragListener.isOverOrFocusedProperty.value ? { type: 'userOver', slot: null } : ligand.createRandomWalkMode( true );
        } );
        pressOffset = null;
      },
      transform: this.modelViewTransform,
      dragListenerOptions: {

        // TODO: Improve the API for tandems for rich drag listeners.
        // TODO (phet-io, design) - should this (or another input event emitter) be added for PhET-iO?
        tandem: Tandem.OPT_OUT
      },
      keyboardDragListenerOptions: {

        // TODO: Improve the API for tandems for rich drag listeners.
        // TODO (phet-io, design) - should this (or another input event emitter) be added for PhET-iO?
        tandem: Tandem.OPT_OUT,
        dragSpeed: 200,
        shiftDragSpeed: 50
      }
    } );
    this.addInputListener( soundRichDragListener );

    soundRichDragListener.dragListener.isOverOrFocusedProperty.link( isOver => {
      this.operateOnLigand( ligand => {

        // If the ligand is already controlled, don't start walking when the pointer goes out
        if ( ligand.mode.type !== 'userControlled' ) {
          ligand.mode = isOver ? { type: 'userOver', slot: null } : ligand.createRandomWalkMode( true );
        }
      } );
    } );
  }

  /**
   * Do some work on the Ligand associate with this Node if it exists. Otherwise, do nothing. The ligand in the model
   * may be added or removed but the view component will always exist.
   */
  private operateOnLigand( operation: ( ligand: Particle<LigandType> ) => void ): void {

    // TODO: Can we just preallocate all the ligands and get rid of this part?
    const ligand = this.ligands[ this.ligandIndex ] || null;
    if ( ligand ) {
      operation( ligand );
    }
  }

  /**
   * Update the view with the animation state since the positions are not observable.
   */
  public step(): void {
    this.operateOnLigand( ligand => {
      this.center = this.modelViewTransform.modelToViewPosition( ligand.position );
    } );
  }
}
membraneTransport.register( 'LigandNode', LigandNode );
