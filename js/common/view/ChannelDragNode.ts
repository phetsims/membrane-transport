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
import ChannelType from '../model/ChannelType.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import Slot from '../model/Slot.js';
import getChannelNode from './channels/getChannelNode.js';
import ChannelToolNode from './ChannelToolNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import ObservationWindow from './ObservationWindow.js';

/**
 * Type guard that checks if a value is a Slot
 *
 * TODO: Now that Slot is a class, this should not be necessary.
 */
export function isOriginSlot( origin: Slot | ChannelToolNode ): origin is Slot {
  return origin instanceof Slot;
}

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
  private readonly positionProperty: Vector2Property;

  public constructor(
    model: MembraneChannelsModel,
    view: MembraneChannelsScreenView,
    observationWindow: ObservationWindow,
    screenViewModelViewTransform: ModelViewTransform2,
    modelPosition: Vector2,
    visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    public readonly type: ChannelType,
    // Where this came from, so that during a swap, the other one knows where to go. Or when pressing 'escape', it knows where to return
    public readonly origin: Slot | ChannelToolNode
  ) {
    super( {
      tagName: 'p',
      focusable: true
    } );

    this.addChild( getChannelNode( type, null ) );

    this.positionProperty = new Vector2Property( modelPosition );
    this.positionProperty.link( position => {
      this.center = screenViewModelViewTransform.modelToViewPosition( position );
    } );

    const positionProperty = this.positionProperty;

    // Convert view bounds to model bounds for dragging constraints
    // If the view bounds change while dragging, it's OK to not keep the node in bounds, because the ChannelDragNode is
    // transient and will return to the toolbox when it is dropped anyways.
    const modelBoundsProperty = new DerivedProperty( [ visibleBoundsProperty ], visibleBounds => {
      return screenViewModelViewTransform.viewToModelBounds( visibleBounds );
    } );

    const getClosestSlotDragIndicatorNode = () => {

      // Check the observation window to find the closest available target we overlap
      // If any rectangle overlaps, change its stroke color to red, Change all others back to black
      const overlappingSlotDragIndicatorNodes = observationWindow.slotDragIndicatorNodes.filter( slotDragIndicatorNode => {
        return slotDragIndicatorNode.globalBounds.intersectsBounds( this.globalBounds );
      } );

      return _.sortBy( overlappingSlotDragIndicatorNodes, slotDragIndicatorNode => {
        return slotDragIndicatorNode.globalBounds.center.distance( this.globalBounds.center );
      } )[ 0 ];
    };

    // eslint-disable-next-line consistent-this,@typescript-eslint/no-this-alias
    const myself = this;

    const updateHighlight = () => {
      const closest = getClosestSlotDragIndicatorNode();

      observationWindow.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => {
        slotDragIndicatorNode.stroke = slotDragIndicatorNode === closest ? 'red' : 'black';
      } );
    };

    // TODO: Use SoundRichDragListener?
    // TODO: MK suggested RichDragListener which also has keyboard support
    this.dragListener = new DragListener( {
      useParentOffset: true,
      dragBoundsProperty: modelBoundsProperty,
      positionProperty: this.positionProperty,
      transform: screenViewModelViewTransform,
      tandem: Tandem.OPT_OUT,
      start: () => {
        updateHighlight();
        observationWindow.setSlotDragIndicatorsVisible( true );
      },
      drag: () => {
        updateHighlight();
      },
      end: () => {

        observationWindow.setSlotDragIndicatorsVisible( false );

        // drop into the selected target, or move back to the toolbox
        const closest = getClosestSlotDragIndicatorNode();

        if ( closest ) {

          const otherContents = closest.slot.channelType;

          // drop into the selected target
          closest.slot.channelType = this.type;

          if ( otherContents && isOriginSlot( this.origin ) ) {
            this.origin.channelType = otherContents;
          }

          // Reuse
          this.visible = false;
        }
        else {

          // Animate back to the toolbox

          myself.pickable = false; // Prevent being grabbed on the way home

          const toolNode = view.getChannelToolNode( this.type );
          const viewPoint = view.globalToLocalPoint( toolNode.channelNode.globalBounds.center );
          const modelPoint = screenViewModelViewTransform.viewToModelPosition( viewPoint );

          const animation = new Animation( {
            setValue: function( value ) {
              positionProperty.value = value;
            },
            from: positionProperty.value.copy(),
            to: modelPoint,
            duration: 0.4,
            easing: Easing.CUBIC_IN_OUT
          } );
          animation.endedEmitter.addListener( () => {
            this.visible = false;
          } );

          animation.start();
        }
      }
    } );
    this.addInputListener( this.dragListener );

    // TODO: Interactive highlight?
    // this.setInteractiveHighlight( new HighlightFromNode( this ) );
  }

  public press( event: PressListenerEvent ): void {
    this.dragListener.press( event );
  }

  public setModelPosition( modelPosition: Vector2 ): void {
    this.positionProperty.value = modelPosition;
  }
}

membraneChannels.register( 'ChannelDragNode', ChannelDragNode );