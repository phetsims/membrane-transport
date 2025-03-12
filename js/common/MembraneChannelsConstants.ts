// Copyright 2024-2025, University of Colorado Boulder

/**
 * Constants used throughout this simulation. Note that some constants may alternatively be defined in the file where
 * they are used. The criteria for a constant being defined here is either or both of:
 * 1. The constant is used in multiple files.
 * 2. The constant is a critical part of the simulation and good to have defined here with other constants.
 *
 * NOTE: This simulation uses a class with static attributes, so the values can refer to each other in the declaration.
 * This is unlike other simulations that export const and use file-specific local variables for cross-references.
 * This also helps with searchability, since values are referred to the same way everywhere (including in this file).
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import membraneChannels from '../membraneChannels.js';
import MembraneChannelsQueryParameters from './MembraneChannelsQueryParameters.js';
import { ParticleType, ParticleTypes } from './model/SoluteType.js';
import getParticleNode from './view/particles/getParticleNode.js';

export default class MembraneChannelsConstants {

  // Size of the observation window in view coordinates
  public static readonly OBSERVATION_WINDOW_WIDTH = 534;
  public static readonly OBSERVATION_WINDOW_HEIGHT = 448;

  public static readonly OBSERVATION_WINDOW_BOUNDS = new Bounds2(
    0, 0,
    MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT
  );

  // The full dimensions in model coordinates for the area that you can see in the observation window.
  public static readonly MODEL_WIDTH = 200;
  public static readonly MODEL_HEIGHT = MembraneChannelsConstants.MODEL_WIDTH *
                                        MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT /
                                        MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH;

  // A map of solute type to the aspect ratio of its artwork so that we can create bounds
  // in the model that accurately match the artwork. The aspect ratio is the width divided by the height.
  public static readonly PARTICLE_ASPECT_RATIO_MAP = ( () => {
    const record = {} as Record<ParticleType, number>;
    ParticleTypes.forEach( soluteType => {
      const soluteNode = getParticleNode( soluteType ).bounds;
      record[ soluteType ] = soluteNode.width / soluteNode.height;
    } );
    return record;
  } )();

  // compute width of O2 and CO2
  public static readonly OXYGEN_NODE_WIDTH = getParticleNode( 'oxygen' ).bounds.width;
  public static readonly CARBON_DIOXIDE_NODE_HEIGHT = getParticleNode( 'carbonDioxide' ).bounds.width;

  public static readonly LIGAND_COUNT = 10; // Per ligand type
  public static readonly MAX_SOLUTE_COUNT = MembraneChannelsQueryParameters.maxSolutes; // Per solute type
  public static readonly CHANNEL_WIDTH = 10; // Width of the channel in model coordinates

  public static readonly SCREEN_VIEW_X_MARGIN = 8;
  public static readonly SCREEN_VIEW_Y_MARGIN = 8;

  // Bounds of the membrane for collision detection and rendering.
  public static readonly MEMBRANE_BOUNDS = new Bounds2(
    -MembraneChannelsConstants.MODEL_WIDTH / 2, -10,
    MembraneChannelsConstants.MODEL_WIDTH / 2, 10
  );

  public static readonly INSIDE_CELL_BOUNDS = new Bounds2(
    MembraneChannelsConstants.MEMBRANE_BOUNDS.minX, -MembraneChannelsConstants.MODEL_HEIGHT / 2,
    MembraneChannelsConstants.MEMBRANE_BOUNDS.maxX, MembraneChannelsConstants.MEMBRANE_BOUNDS.minY
  );

  public static readonly OUTSIDE_CELL_BOUNDS = new Bounds2(
    MembraneChannelsConstants.MEMBRANE_BOUNDS.minX, MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY,
    MembraneChannelsConstants.MEMBRANE_BOUNDS.maxX, MembraneChannelsConstants.MODEL_HEIGHT / 2
  );

  public static readonly PANEL_TITLE_FONT_SIZE = 18;
}

membraneChannels.register( 'MembraneChannelsConstants', MembraneChannelsConstants );