// Copyright 2025, University of Colorado Boulder

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel, { ChannelType } from '../model/MembraneChannelsModel.js';
import getChannelNode from './channels/getChannelNode.js';
import ObservationWindow from './ObservationWindow.js';

/**
 * Display the membrane channel for a node, which can be dragged out of the toolbox and dropped into specific targets
 * in the membrane.
 *
 * This Node is transient and only displayed while dragging. Therefore, it does not need to be phet-io instrumented.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class ChannelDragNode extends Node {
  private readonly dragListener: DragListener;

  public constructor(
    model: MembraneChannelsModel,
    observationWindow: ObservationWindow,
    screenViewModelViewTransform: ModelViewTransform2,
    modelPosition: Vector2,
    visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    homes: Node[],
    public readonly type: ChannelType
  ) {
    super();

    // TODO: Keyboard support, probably GroupSortInteraction
    const positionProperty = new Vector2Property( modelPosition );
    positionProperty.link( position => {
      this.center = screenViewModelViewTransform.modelToViewPosition( position );
    } );

    // TODO: If the model Bounds changes and leaves the object offscreen, move the object onscreen.
    const modelBoundsProperty = new DerivedProperty( [ visibleBoundsProperty ], visibleBounds => {
      return screenViewModelViewTransform.viewToModelBounds( visibleBounds );
    } );

    const getClosestOverlappingTarget = () => {

      // Check the observation window to find the closest available target we overlap
      // If any rectangle overlaps, change its stroke color to red, Change all others back to black
      const overlappingTargets = observationWindow.targetZoneNodes.filter( targetZoneNode => {
        return targetZoneNode.globalBounds.intersectsBounds( this.globalBounds ) && !model.isTargetFilled( targetZoneNode.targetKey );
      } );

      const closest = _.sortBy( overlappingTargets, targetZoneNode => {
        return targetZoneNode.globalBounds.center.distance( this.globalBounds.center );
      } )[ 0 ];
      return closest;
    };

    // eslint-disable-next-line consistent-this,@typescript-eslint/no-this-alias
    const myself = this;

    // TODO: Use SoundRichDragListener?
    this.dragListener = new DragListener( {
      useParentOffset: true,
      dragBoundsProperty: modelBoundsProperty,
      positionProperty: positionProperty,
      transform: screenViewModelViewTransform,
      tandem: Tandem.OPT_OUT,
      start: () => {
        const closest = getClosestOverlappingTarget();

        observationWindow.targetZoneNodes.forEach( targetZoneNode => {
          targetZoneNode.stroke = targetZoneNode === closest ? 'red' : 'black';
          targetZoneNode.visible = !model.isTargetFilled( targetZoneNode.targetKey );
        } );
      },
      drag: () => {

        // TODO: Duplicated with above
        const closest = getClosestOverlappingTarget();

        observationWindow.targetZoneNodes.forEach( targetZoneNode => {
          targetZoneNode.stroke = targetZoneNode === closest ? 'red' : 'black';
          targetZoneNode.visible = !model.isTargetFilled( targetZoneNode.targetKey );
        } );
      },
      end: () => {

        observationWindow.targetZoneNodes.forEach( targetZoneNode => {
          targetZoneNode.visible = false;
        } );

        // drop into the selected target, or move back to the toolbox
        const closest = getClosestOverlappingTarget();

        if ( closest ) {

          // drop into the selected target
          model.setTarget( closest.targetKey, this.type );

          // Reuse
          this.visible = false;
        }
        else {

          // Animate back to the closest home
          if ( homes[ 0 ].isVisible() ) {

            myself.pickable = false; // Prevent being grabbed on the way home

            const animation = new Animation( {
              setValue: function( value ) {
                const screenViewPoint = myself.globalToParentPoint( value );
                positionProperty.value = screenViewModelViewTransform.viewToModelPosition( screenViewPoint );
              },
              from: this.globalBounds.center,
              to: homes[ 0 ].globalBounds.center,
              duration: 0.4,
              easing: Easing.CUBIC_IN_OUT
            } );
            animation.endedEmitter.addListener( () => {
              this.visible = false;
            } );

            animation.start();
          }
        }
      }
    } );
    this.addInputListener( this.dragListener );

    this.addChild( getChannelNode( type ) );
  }

  public press( event: PressListenerEvent ): void {
    this.dragListener.press( event );
  }
}

membraneChannels.register( 'ChannelDragNode', ChannelDragNode );