// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../../dot/js/Bounds2.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { CanvasNodeOptions } from '../../../../../scenery/js/nodes/CanvasNode.js';
import { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../../membraneTransport.js';
import LigandGatedChannel from '../../model/proteins/LigandGatedChannel.js';
import ProteinNode from './ProteinNode.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default class LigandGatedChannelNode extends ProteinNode {
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

    const backgroundRectangle = new Rectangle( 10, 0, modelWidth - 10 * 2, modelHeight, cornerRound, cornerRound, { fill: type === 'sodiumIonLigandGatedChannel' ? 'green' : 'yellow', stroke: 'black', lineWidth: 2 } );
    const leftPore = new Rectangle( 0, 0, sideWidth, modelHeight, cornerRound, cornerRound, { fill: poreColor, stroke: 'black', lineWidth: 2 } );
    const rightPore = new Rectangle( modelWidth - sideWidth, 0, sideWidth, modelHeight, cornerRound, cornerRound, { fill: poreColor, stroke: 'black', lineWidth: 2 } );

    this.addChild( backgroundRectangle );
    this.addChild( leftPore );
    this.addChild( rightPore );

    if ( model ) {

      // Update pore positions based on whether the ligand is bound.
      const updatePores = ( bound: boolean ) => {
        if ( bound ) {
          // Open state: pores are at their original positions.
          leftPore.setRect( 0, 0, sideWidth, modelHeight );
          rightPore.setRect( modelWidth - sideWidth, 0, sideWidth, modelHeight );
        }
        else {
          // Closed state: pores move together to close the gap.
          const closedX = ( modelWidth - 2 * sideWidth ) / 2;
          leftPore.setRect( closedX, 0, sideWidth, modelHeight );
          rightPore.setRect( closedX + sideWidth, 0, sideWidth, modelHeight );
        }
      };

      // Set initial positions based on the current ligand state.
      updatePores( model.isLigandBoundProperty.value );

      // Link the update function to ligand state changes.
      model.isLigandBoundProperty.link( updatePores );
    }
  }
}

membraneTransport.register( 'LigandGatedChannelNode', LigandGatedChannelNode );