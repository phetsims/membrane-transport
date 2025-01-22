// Copyright 2024-2025, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import membraneChannels from '../membraneChannels.js';

const MembraneChannelsConstants = {
  SCREEN_VIEW_X_MARGIN: 8,
  SCREEN_VIEW_Y_MARGIN: 8,

  // Size of the observation window
  // TODO: Probably should be non-square
  OBSERVATION_WINDOW_WIDTH: 448
};

membraneChannels.register( 'MembraneChannelsConstants', MembraneChannelsConstants );
export default MembraneChannelsConstants;