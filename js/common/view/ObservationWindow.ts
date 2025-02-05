// Copyright 2025, University of Colorado Boulder

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, Rectangle, Text, TextOptions } from '../../../../scenery/js/imports.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';
import LigandNode from './LigandNode.js';

/**
 * Shows the rectangle with the cross section of the cell membrane where solutes, ligands, membrane channels are.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

export default class ObservationWindow extends Node {
  private readonly observationWindowCanvasNode: ObservationWindowCanvasNode;

  public constructor( model: MembraneChannelsModel, modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2 ) {

    const frameNode = new Rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT, {
      stroke: 'black',
      lineWidth: 2
    } );

    // Clipping region that contains the background canvas and the ligand node
    // TODO: The canvas node doesn't actually need to be clippped since it can only draw within its bounds. UPDATE: Removing the clip shows a lot of drawing out of the bounds.
    const clipNode = new Node( {
      clipArea: Shape.rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT )
    } );

    super( {
      children: [ clipNode, frameNode ]
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    this.observationWindowCanvasNode = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds );
    clipNode.addChild( this.observationWindowCanvasNode );

    // ligand and membrane channel layer
    // On top, we will have a layer for the interactive parts of the simulation

    const ligandNode = new LigandNode();
    clipNode.addChild( ligandNode );

    // NOTE: Duplication with SoluteBarChartsAccordionBox
    const TEXT_MARGIN = 3;
    const textOptions = { fontSize: 13, right: MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH - TEXT_MARGIN, maxWidth: 200 };
    const outsideText = new Text( membraneChannelsStrings.outsideStringProperty, combineOptions<TextOptions>( { top: 0 + TEXT_MARGIN }, textOptions ) );
    const insideText = new Text( membraneChannelsStrings.insideStringProperty, combineOptions<TextOptions>( { bottom: MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT - TEXT_MARGIN }, textOptions ) );

    this.addChild( outsideText );
    this.addChild( insideText );
  }

  public step( dt: number ): void {
    this.observationWindowCanvasNode.step( dt );
    this.observationWindowCanvasNode.invalidatePaint();
  }

}
membraneChannels.register( 'ObservationWindow', ObservationWindow );