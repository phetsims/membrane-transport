// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import BackgroundCanvasNode from './BackgroundCanvasNode.js';
import LigandNode from './LigandNode.js';

/**
 * Shows the rectangle with the cross section of the cell membrane where solutes, ligands, membrane channels are.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

export default class ObservationWindow extends Node {
  private readonly backgroundCanvasNode: BackgroundCanvasNode;

  public constructor( modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2 ) {

    const frameNode = new Rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT, {
      stroke: 'black',
      lineWidth: 2
    } );

    // Clipping region that contains the background canvas and the ligand node
    // TODO: The canvas node doesn't actually need to be clippped since it can only draw within its bounds.
    const clipNode = new Node( {
      clipArea: Shape.rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT )
    } );

    super( {
      children: [ clipNode, frameNode ]
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    this.backgroundCanvasNode = new BackgroundCanvasNode( modelViewTransform, canvasBounds );
    clipNode.addChild( this.backgroundCanvasNode );

    // ligand and membrane channel layer
    // On top, we will have a layer for the interactive parts of the simulation

    const ligandNode = new LigandNode();
    clipNode.addChild( ligandNode );
  }

  public step( dt: number ): void {
    this.backgroundCanvasNode.step( dt );
    this.backgroundCanvasNode.invalidatePaint();
  }

}
membraneChannels.register( 'ObservationWindow', ObservationWindow );