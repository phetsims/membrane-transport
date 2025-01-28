// Copyright 2024-2025, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import SoluteType, { SoluteTypes } from '../membrane-channels/model/SoluteType.js';
import getSoluteNode from '../membrane-channels/view/solutes/getSoluteNode.js';
import membraneChannels from '../membraneChannels.js';

const OBSERVATION_WINDOW_WIDTH = 534;
const OBSERVATION_WINDOW_HEIGHT = 448;
const OBSERVATION_WINDOW_BOUNDS = new Bounds2( 0, 0, OBSERVATION_WINDOW_WIDTH, OBSERVATION_WINDOW_HEIGHT );

// The full width in model coordinates for the area that you can see in the observation window.
const MODEL_WIDTH = 200;

// A map of solute type to the aspect ratio of its artwork so that we can create bounds
// in the model that accurately match the artwork. The aspect ratio is the width divided by the height.
const SOLUTE_ASPECT_RATIO_MAP = {} as Record<SoluteType, number>;

SoluteTypes.forEach( soluteType => {
  const soluteNode = getSoluteNode( soluteType ).bounds;
  SOLUTE_ASPECT_RATIO_MAP[ soluteType ] = soluteNode.width / soluteNode.height;
} );

const MembraneChannelsConstants = {
  SCREEN_VIEW_X_MARGIN: 8,
  SCREEN_VIEW_Y_MARGIN: 8,

  // Size of the observation window
  OBSERVATION_WINDOW_WIDTH: OBSERVATION_WINDOW_WIDTH,
  OBSERVATION_WINDOW_HEIGHT: OBSERVATION_WINDOW_HEIGHT,

  MODEL_WIDTH: MODEL_WIDTH,

  OBSERVATION_WINDOW_BOUNDS: OBSERVATION_WINDOW_BOUNDS,

  PANEL_TITLE_FONT_SIZE: 18,

  SOLUTE_ASPECT_RATIO_MAP: SOLUTE_ASPECT_RATIO_MAP
};

membraneChannels.register( 'MembraneChannelsConstants', MembraneChannelsConstants );
export default MembraneChannelsConstants;