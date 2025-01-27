// Copyright 2024-2025, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import Vector2 from '../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import SoluteType, { SoluteTypes } from '../membrane-channels/model/SoluteType.js';
import getSoluteNode from '../membrane-channels/view/solutes/getSoluteNode.js';
import membraneChannels from '../membraneChannels.js';

const OBSERVATION_WINDOW_WIDTH = 534;
const OBSERVATION_WINDOW_HEIGHT = 448;
const OBSERVATION_WINDOW_BOUNDS = new Bounds2( 0, 0, OBSERVATION_WINDOW_WIDTH, OBSERVATION_WINDOW_HEIGHT );

// The full width in model coordinates for the area that you can see in the observation window.
const MODEL_WIDTH = 200;

// TODO: Review with SR - We need the solute dimensions in model coordinates. Pulling from the Node bounds
//   gives us view dimensions so we need the modelViewTransform in Constants so it can be used in the
//   SOLUTE_DIMENSION_MAP.
const OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
  new Vector2( 0, 0 ),
  OBSERVATION_WINDOW_BOUNDS.center,
  OBSERVATION_WINDOW_BOUNDS.width / MODEL_WIDTH
);

// Create Nodes for each Solute so that we can inspect the bounds (keeping the aspect ratio).
// Bounds are in model coordinates.
const SOLUTE_DIMENSION_MAP = {} as Record<SoluteType, Dimension2>;

SoluteTypes.forEach( soluteType => {
  const bounds = OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelBounds( getSoluteNode( soluteType ).bounds );
  SOLUTE_DIMENSION_MAP[ soluteType ] = new Dimension2( bounds.width, bounds.height );
} );

const MembraneChannelsConstants = {
  SCREEN_VIEW_X_MARGIN: 8,
  SCREEN_VIEW_Y_MARGIN: 8,

  // Size of the observation window
  OBSERVATION_WINDOW_WIDTH: OBSERVATION_WINDOW_WIDTH,
  OBSERVATION_WINDOW_HEIGHT: OBSERVATION_WINDOW_HEIGHT,

  MODEL_WIDTH: MODEL_WIDTH,

  OBSERVATION_WINDOW_BOUNDS: OBSERVATION_WINDOW_BOUNDS,

  OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM: OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM,

  PANEL_TITLE_FONT_SIZE: 18,

  SOLUTE_DIMENSION_MAP: SOLUTE_DIMENSION_MAP
};

membraneChannels.register( 'MembraneChannelsConstants', MembraneChannelsConstants );
export default MembraneChannelsConstants;