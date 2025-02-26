// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { CanvasNodeOptions } from '../../../../../scenery/js/nodes/CanvasNode.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../../membraneChannels.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LeakageChannelNode extends Node {
  public constructor( public readonly type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel', providedOptions?: NodeOptions ) {

    super( combineOptions<CanvasNodeOptions>( {
      canvasBounds: new Bounds2( 0, 0, 45, 50 )
    }, providedOptions ) );

    // ObservationWindowCanvasNode.drawLeakageChannel( context, this.type, ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( 5, 25 ), 1.75, 1.75 ), 10 );

    const modelWidth = 40;
    const modelHeight = 60;

    const cornerRound = 4;

    // For the leakage channels, the sodium pore should be smaller than the potassium pore
    const poreSize = type === 'sodiumIonLeakageChannel' ? 8 : 12;
    const sideWidth = modelWidth / 2 - poreSize / 2;

    const backgroundRectangle = new Rectangle( 0, 0, modelWidth, modelHeight, cornerRound, cornerRound, { fill: 'rgb(191,191,191)', stroke: 'black', lineWidth: 2 } );
    const leftPore = new Rectangle( 0, 0, sideWidth, modelHeight, cornerRound, cornerRound, { fill: 'rgb(254,254,254)', stroke: 'black', lineWidth: 2 } );
    const rightPore = new Rectangle( modelWidth - sideWidth, 0, sideWidth, modelHeight, cornerRound, cornerRound, { fill: 'rgb(254,254,254)', stroke: 'black', lineWidth: 2 } );

    this.addChild( backgroundRectangle );
    this.addChild( leftPore );
    this.addChild( rightPore );

  }
}

membraneChannels.register( 'LeakageChannelNode', LeakageChannelNode );