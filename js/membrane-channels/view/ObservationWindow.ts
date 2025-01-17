// Copyright 2025, University of Colorado Boulder

import { Shape } from '../../../../kite/js/imports.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import BackgroundCanvasNode from './BackgroundCanvasNode.js';
import LigandNode from './LigandNode.js';

/**
 * Shows the rectangle with the cross section of the cell membrane where solutes, ligands, membrane channels are.
 * TODO: We should have a better name that aligns with description.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

export default class ObservationWindow extends Node {

  public constructor() {
    super( {
      clipArea: Shape.rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH )
    } );
    const rectangle = new Rectangle(
      0,
      0,
      MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH,
      MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, {
        fill: 'white',
        stroke: 'black',

        // NOTE: This is sheared in half by the clipArea above
        lineWidth: 1
      }
    );
    this.addChild( rectangle );

    // first, we will have a background canvas layer for the performance intensive parts
    const backgroundCanvasNode = new BackgroundCanvasNode();
    this.addChild( backgroundCanvasNode );

    // ligand and membrane channel layer
    // On top, we will have a layer for the interactive parts of the simulation

    const ligandNode = new LigandNode();
    this.addChild( ligandNode );
  }

}
membraneChannels.register( 'ObservationWindow', ObservationWindow );