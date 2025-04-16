// Copyright 2025, University of Colorado Boulder

/**
 * Display the membrane transport protein for a node, which can be dragged out of the toolbox and dropped into specific targets
 * in the membrane.
 *
 * This Node is transient and only displayed while dragging. Therefore, it does not need to be phet-io instrumented.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

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
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import createPositionAnimation from './createPositionAnimation.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import ObservationWindow from './ObservationWindow.js';
import createTransportProteinNode from './proteins/createTransportProteinNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

export default class TransportProteinDragNode extends Node {
  private readonly dragListener: DragListener;
  private readonly positionProperty: Vector2Property;

  public constructor(
    model: MembraneTransportModel,
    view: MembraneTransportScreenView,
    observationWindow: ObservationWindow,
    screenViewModelViewTransform: ModelViewTransform2,
    modelPosition: Vector2,
    visibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    public readonly type: TransportProteinType,
    // Where this came from, so that during a swap, the other one knows where to go. Or when pressing 'escape', it knows where to return
    public readonly origin: Slot | TransportProteinToolNode
  ) {
    super( {
      tagName: 'p',
      focusable: true
    } );

    this.addChild( createTransportProteinNode( type, null ) );

    this.positionProperty = new Vector2Property( modelPosition );
    this.positionProperty.link( position => {
      this.center = screenViewModelViewTransform.modelToViewPosition( position );
    } );

    const positionProperty = this.positionProperty;

    // Convert view bounds to model bounds for dragging constraints
    // If the view bounds change while dragging, it's OK to not keep the node in bounds, because the TransportProteinDragNode is
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

    const inContactWithWallProperty = new DerivedProperty( [ positionProperty, modelBoundsProperty ], ( position, bounds ) => {
      return position.x === bounds.minX || position.x === bounds.maxX || position.y === bounds.minY || position.y === bounds.maxY;
    } );

    inContactWithWallProperty.lazyLink( inContactWithWall => {
      if ( inContactWithWall ) {
        MembraneTransportSounds.boundaryReached();
      }
    } );

    // Mouse drag listener while dragging a transport protein with mouse/touch.
    // Do not use RichDragListener or SoundRichDragListener because the keyboard
    // interaction is mediated by the MembraneGroupSelectView
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

          const otherContents = closest.slot.transportProteinType;

          // drop into the selected target
          closest.slot.transportProteinType = this.type;

          if ( otherContents && this.origin instanceof Slot ) {
            this.origin.transportProteinType = otherContents;
          }

          // Reuse
          this.visible = false;

          MembraneTransportSounds.transportProteinReleased();
        }
        else {

          // Animate back to the toolbox

          myself.pickable = false; // Prevent being grabbed on the way home

          const toolNode = view.getTransportProteinToolNode( this.type );
          assert && assert( toolNode, `toolNode should be defined, type = ${this.type}` ); // This was failing on CT
          const viewPoint = view.globalToLocalPoint( toolNode.transportProteinNode.globalBounds.center );
          const modelPoint = screenViewModelViewTransform.viewToModelPosition( viewPoint );

          const animation = createPositionAnimation( value => positionProperty.set( value ), positionProperty.value, modelPoint, () => {this.visible = false;} );

          animation.start();

          MembraneTransportSounds.proteinReturnedToToolbox();
        }

        observationWindow.clearSlotDragIndicatorHighlights();
      }
    } );
    this.addInputListener( this.dragListener );
  }

  public press( event: PressListenerEvent ): void {
    this.dragListener.press( event, this );
  }

  public setModelPosition( modelPosition: Vector2 ): void {
    this.positionProperty.value = modelPosition;
  }

  public getModelPosition(): Vector2 {
    return this.positionProperty.value;
  }
}

membraneTransport.register( 'TransportProteinDragNode', TransportProteinDragNode );