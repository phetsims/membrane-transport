// Copyright 2025, University of Colorado Boulder

/**
 * The canvas renderer for background content in the observation window. This is for rendering
 * many particles that are not interactive.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';

export default class BackgroundCanvasNode extends CanvasNode {

  public constructor() {
    super( {
      canvasBounds: new Bounds2( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH )
    } );
  }

  public override paintCanvas( context: CanvasRenderingContext2D ): void {
    context.fillStyle = 'red';
    context.fillRect( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH );
  }
}
membraneChannels.register( 'BackgroundCanvasNode', BackgroundCanvasNode );