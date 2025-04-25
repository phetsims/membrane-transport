// Copyright 2025, University of Colorado Boulder

/**
 * LigandNode is a node that represents a ligand in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// TODO (SR): The focus rectangle shows on the membrane when a ligand has focus. This is incorrect. https://github.com/phetsims/membrane-transport/issues/45
// TODO (design): Rewrite keyboard interaction to be discrete instead of continuous. See https://github.com/phetsims/membrane-transport/issues/45

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
import Particle, { CAPTURE_RADIUS_PROPERTY } from '../model/Particle.js';
import LigandGatedChannel from '../model/proteins/LigandGatedChannel.js';
import Slot from '../model/Slot.js';
import { LigandType } from '../model/SoluteType.js';
import LigandParticleNode from './particles/LigandParticleNode.js';

export default class LigandNode extends Node {

  public constructor(
    slots: Slot[],
    areLigandsAddedProperty: TProperty<boolean>,
    private readonly ligand: Particle<LigandType>,
    private readonly modelViewTransform: ModelViewTransform2,
    ligandView: LigandParticleNode,
    focusable: boolean,
    tandem: Tandem
  ) {

    const options = combineOptions<NodeOptions>( {
      children: [ ligandView ],
      visibleProperty: areLigandsAddedProperty,
      cursor: 'pointer',

      /* TODO (JG/SR): Add the type of ligand. Add i18n. * Ligand Accessible Names: https://github.com/phetsims/membrane-transport/issues/45
      * Sodium-specific ligand
      * Potassium-specific ligand
      *
      * This is complicated by the operateOnLigand method, and I recommend we design a better way.
      * - Maybe the model should always allocate the Ligands, but they may or may not participate based on the settings.
      * - Or we can use the index or other metadata to identify the ligand.
      */
      accessibleName: ligandView.type === 'ligandA' ? 'Triangle Ligand' : 'Star Ligand' // TODO: i18n https://github.com/phetsims/membrane-transport/issues/45
    }, AccessibleDraggableOptions, {
      pdomVisible: focusable // TODO: After rewriting to be discrete keyboard interaction, make sure only 2 are in the DOM https://github.com/phetsims/membrane-transport/issues/45
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
        ligand.mode = { type: 'userControlled', slot: null };

        // Store initial offset from pointer to ligand position
        const localPoint = this.globalToParentPoint( event.pointer.point );
        const modelPoint = this.modelViewTransform.viewToModelPosition( localPoint );
        pressOffset = modelPoint.minus( ligand.position );
      },
      drag: ( event, listener ) => {

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
      },
      end: () => {
        ligand.mode = soundRichDragListener.dragListener.isOverOrFocusedProperty.value ? { type: 'userOver', slot: null } : Particle.createRandomWalkMode( true );

        // If the ligand is release within the capture radius of a corresponding ligand gated channel, clear the ligand gated channel cooldown so it can immediately bind.
        for ( let i = 0; i < slots.length; i++ ) {
          const transportProtein = slots[ i ].transportProteinProperty.value;
          const distance = ligand.position.distance( new Vector2( slots[ i ].position, 0 ) );

          if ( transportProtein &&
               distance < CAPTURE_RADIUS_PROPERTY.value &&
               transportProtein instanceof LigandGatedChannel &&
               transportProtein.stateProperty.value === 'closed' &&
               ( ( transportProtein.type === 'sodiumIonLigandGatedChannel' && ligand.type === 'ligandA' ) ||
                 ( transportProtein.type === 'potassiumIonLigandGatedChannel' && ligand.type === 'ligandB' ) ) ) {
            transportProtein.clearRebindingCooldown();
          }
        }
        pressOffset = null;
      },
      transform: this.modelViewTransform,
      dragListenerOptions: {

        // TODO: Improve the API for tandems for rich drag listeners. https://github.com/phetsims/membrane-transport/issues/45
        tandem: tandem.createTandem( 'dragListener' )
      },
      keyboardDragListenerOptions: {

        // TODO: Improve the API for tandems for rich drag listeners. https://github.com/phetsims/membrane-transport/issues/45
        tandem: tandem.createTandem( 'keyboardDragListener' ),
        dragSpeed: 200,
        shiftDragSpeed: 50
      }
    } );
    this.addInputListener( soundRichDragListener );

    soundRichDragListener.dragListener.isOverOrFocusedProperty.link( isOver => {
      // If the ligand is already controlled, don't start walking when the pointer goes out
      if ( ligand.mode.type !== 'userControlled' ) {
        ligand.mode = isOver ? { type: 'userOver', slot: null } : Particle.createRandomWalkMode( true );
      }
    } );

    const modelWidth = this.ligand.dimension.width;
    const viewWidth = this.modelViewTransform.modelToViewDeltaX( modelWidth );

    const viewScale = viewWidth / this.width;
    this.setScaleMagnitude( viewScale );
  }

  /**
   * Update the view with the animation state since the positions are not observable.
   */
  public step(): void {
    this.center = this.modelViewTransform.modelToViewPosition( this.ligand.position );
  }
}
membraneTransport.register( 'LigandNode', LigandNode );