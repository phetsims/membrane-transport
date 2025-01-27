// Copyright 2024-2025, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import SoluteType, { SoluteTypes } from '../membrane-channels/model/SoluteType.js';
import getSoluteNode from '../membrane-channels/view/solutes/getSoluteNode.js';
import membraneChannels from '../membraneChannels.js';

// Create Nodes for each Solute so that we can inspect the bounds (keeping the aspect ratio)
// This will inform the bounds of the model as well for collision detection.
const SOLUTE_DIMENSION_MAP = {} as Record<SoluteType, Dimension2>;

SoluteTypes.forEach( soluteType => {
  const bounds = getSoluteNode( soluteType ).bounds;
  SOLUTE_DIMENSION_MAP[ soluteType ] = new Dimension2( bounds.width, bounds.height );
} );

const MembraneChannelsConstants = {
  SCREEN_VIEW_X_MARGIN: 8,
  SCREEN_VIEW_Y_MARGIN: 8,

  // Size of the observation window
  OBSERVATION_WINDOW_WIDTH: 534,
  OBSERVATION_WINDOW_HEIGHT: 448,

  PANEL_TITLE_FONT_SIZE: 18,

  SOLUTE_DIMENSION_MAP: SOLUTE_DIMENSION_MAP
};

membraneChannels.register( 'MembraneChannelsConstants', MembraneChannelsConstants );
export default MembraneChannelsConstants;