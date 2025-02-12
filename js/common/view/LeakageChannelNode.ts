// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import CanvasNode, { CanvasNodeOptions } from '../../../../scenery/js/nodes/CanvasNode.js';
import membraneChannels from '../../membraneChannels.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LeakageChannelNode extends CanvasNode {
  public constructor( public readonly type: 'sodiumLeakage' | 'potassiumLeakage', providedOptions?: CanvasNodeOptions ) {

    super( combineOptions<CanvasNodeOptions>( {
      canvasBounds: new Bounds2( 0, 0, 45, 50 ),
      cursor: 'pointer'
    }, providedOptions ) );

    this.invalidatePaint();
  }

  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    // Draw a red rectangle for debugging
    // context.fillStyle = 'rgba(255,0,0,0.5)';
    // context.fillRect( 0, 0, 45, 50 );

    // Draw the membrane channel
    // TODO: Do we like this pattern? If so, how can we get the geometry to be explicit and accurate?
    // TODO: The stroke line width doesn't match up exactly
    ObservationWindowCanvasNode.drawMembraneChannel( context, this.type, ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( 5, 25 ), 1.75, 1.75 ), 10 );
  }

  /**
   * Allow to be dragged
   */
  public override containsPointSelf( point: Vector2 ): boolean {
    return true;
  }
}

membraneChannels.register( 'LeakageChannelNode', LeakageChannelNode );