// Copyright 2025, University of Colorado Boulder

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';

/**
 * Display the membrane channel for a node, which can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembraneChannelNode extends Node {
  private readonly dragListener: DragListener;

  public constructor( screenViewModelViewTransform: ModelViewTransform2, modelPosition: Vector2, visibleBoundsProperty: TReadOnlyProperty<Bounds2> ) {
    super();

    // TODO: Keyboard support
    const positionProperty = new Vector2Property( modelPosition );
    positionProperty.link( position => {
      this.center = screenViewModelViewTransform.modelToViewPosition( position );
    } );

    // TODO: If the model Bounds changes and leaves the object offscreen, move the object onscreen.
    const modelBoundsProperty = new DerivedProperty( [ visibleBoundsProperty ], visibleBounds => {
      return screenViewModelViewTransform.viewToModelBounds( visibleBounds );
    } );

    this.dragListener = new DragListener( {
      useParentOffset: true,
      dragBoundsProperty: modelBoundsProperty,
      positionProperty: positionProperty,
      transform: screenViewModelViewTransform,
      tandem: Tandem.OPT_OUT
    } );
    this.addInputListener( this.dragListener );

    const circle = new Circle( 15, {
      fill: 'rgba( 0,0,255,0.5)',
      left: 0,
      top: 0,
      cursor: 'pointer'
    } );

    this.addChild( circle );
  }

  public press( event: PressListenerEvent ): void {
    this.dragListener.press( event );
  }
}

membraneChannels.register( 'MembraneChannelNode', MembraneChannelNode );