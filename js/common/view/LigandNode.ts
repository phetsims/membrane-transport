// Copyright 2025, University of Colorado Boulder
/**
 * LigandNode is a node that represents a ligand in the simulation.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TProperty from '../../../../axon/js/TProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import SoundRichDragListener from '../../../../scenery-phet/js/SoundRichDragListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsConstants from '../MembraneChannelsConstants.js';
import Particle from '../model/Particle.js';
import { LigandType } from '../model/SoluteType.js';

class LigandNodeView extends Node {
  public constructor( providedOptions?: NodeOptions ) {
    super( providedOptions );

    this.addChild( new Path( Shape.polygon( [
      new Vector2( 0, 0 ),
      new Vector2( 10, 15 ),
      new Vector2( -10, 15 )
    ] ), {
      fill: new LinearGradient( -10, 0, 10, 0 ).addColorStop( 0, 'rgb(254,241,227)' ).addColorStop( 1, 'rgb(246,148,72)' ),
      stroke: 'black'
    } ) );
  }
}

export default class LigandNode extends LigandNodeView {
  public constructor(
    areLigandsAddedProperty: TProperty<boolean>,
    private readonly ligands: Particle<LigandType>[],
    private readonly ligandIndex: number,
    private readonly modelViewTransform: ModelViewTransform2,
    tandem: Tandem
  ) {

    const options = combineOptions<NodeOptions>( {
      visibleProperty: areLigandsAddedProperty,
      cursor: 'pointer',
      accessibleName: 'Ligand', // TODO: What should this be?
      focusable: ligandIndex === 0 // TODO: Just one ligand is focusable for now, but how should this behave?
    }, AccessibleDraggableOptions );

    super( options );

    const soundRichDragListener = new SoundRichDragListener( {
      start: ( event, listener ) => {
        this.operateOnLigand( ligand => {
          ligand.mode = 'userControlled';
        } );
      },
      drag: ( event, listener ) => {
        this.operateOnLigand( ligand => {

          // TODO: Handle the ligand becoming detached from the pointer.

          // The DragListener cannot use dragBoundsProperty option unless using translateNode or positionProperty
          // so that check is done manually here.
          const proposedPosition = ligand.position.plus( listener.modelDelta );
          const boundModelPoint = MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS.closestPointTo( proposedPosition );
          ligand.position.set( boundModelPoint );
        } );
      },
      end: ( event, listener ) => {
        this.operateOnLigand( ligand => {
          ligand.mode = soundRichDragListener.dragListener.looksOverProperty.value ? 'userOver' : 'randomWalk';
        } );
      },
      transform: this.modelViewTransform,
      dragListenerOptions: {
        tandem: tandem.createTandem( 'soundRichDragListener' )
      },
      keyboardDragListenerOptions: {
        tandem: tandem.createTandem( 'keyboardDragListener' )
      }

    } );
    this.addInputListener( soundRichDragListener );

    // TODO: Rename looksOverProperty? Or maybe we need a new Property for isOverProperty || focusedProperty
    soundRichDragListener.dragListener.looksOverProperty.link( isOver => {
      this.operateOnLigand( ligand => {

        // If the ligand is already controlled, don't start walking when the pointer goes out
        if ( ligand.mode !== 'userControlled' ) {
          ligand.mode = isOver ? 'userOver' : 'randomWalk';
        }
      } );
    } );
  }

  /**
   * Do some work on the Ligand associate with this Node if it exists. Otherwise, do nothing. The ligand in the model
   * may be added or removed but the view component will always exist.
   */
  private operateOnLigand( operation: ( ligand: Particle<LigandType> ) => void ): void {
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
membraneChannels.register( 'LigandNode', LigandNode );

export { LigandNodeView };