// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { CanvasNodeOptions } from '../../../../../scenery/js/nodes/CanvasNode.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../../membraneChannels.js';
import LigandGatedChannel from '../../model/LigandGatedChannel.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default class LigandGatedChannelNode extends Node {
  public constructor(
    public readonly type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel',
    public readonly model: LigandGatedChannel | null,
    providedOptions?: NodeOptions
  ) {

    super( combineOptions<CanvasNodeOptions>( {
      canvasBounds: new Bounds2( 0, 0, 45, 50 )
    }, providedOptions ) );

    const modelWidth = 40;
    const modelHeight = 52;

    const cornerRound = 4;

    // For the leakage channels, the sodium pore should be smaller than the potassium pore
    const poreSize = type === 'sodiumIonLigandGatedChannel' ? 8 : 12;
    const sideWidth = modelWidth / 2 - poreSize / 2;

    const poreColor = 'rgb(254,254,254)';
    const boundPoreColor = 'rgb(254,0,0)';

    const backgroundRectangle = new Rectangle( 0, 0, modelWidth, modelHeight, cornerRound, cornerRound, { fill: type === 'sodiumIonLigandGatedChannel' ? 'green' : 'yellow', stroke: 'black', lineWidth: 2 } );
    const leftPore = new Rectangle( 0, 0, sideWidth, modelHeight, cornerRound, cornerRound, { fill: poreColor, stroke: 'black', lineWidth: 2 } );
    const rightPore = new Rectangle( modelWidth - sideWidth, 0, sideWidth, modelHeight, cornerRound, cornerRound, { fill: poreColor, stroke: 'black', lineWidth: 2 } );

    this.addChild( backgroundRectangle );
    this.addChild( leftPore );
    this.addChild( rightPore );

    if ( model ) {

      // Disposal is not necessary because the model is also transient and
      // will be garbage collected.
      model.isLigandBoundProperty.link( bound => {
        leftPore.fill = bound ? boundPoreColor : poreColor;
        rightPore.fill = bound ? boundPoreColor : poreColor;
      } );
    }
  }
}

membraneChannels.register( 'LigandGatedChannelNode', LigandGatedChannelNode );