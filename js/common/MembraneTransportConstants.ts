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
import Dimension2 from '../../../dot/js/Dimension2.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportQueryParameters from './MembraneTransportQueryParameters.js';
import { ParticleType, ParticleTypes } from './model/SoluteType.js';
import getParticleNode from './view/particles/getParticleNode.js';

let particleAspectRatioMap: Record<ParticleType, Dimension2> | null = null;

export default class MembraneTransportConstants {

  // Size of the observation window in view coordinates
  public static readonly OBSERVATION_WINDOW_WIDTH = 534;
  public static readonly OBSERVATION_WINDOW_HEIGHT = 448;

  public static readonly OBSERVATION_WINDOW_BOUNDS = new Bounds2(
    0, 0,
    MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT
  );

  // The full dimensions in model coordinates for the area that you can see in the observation window.
  public static readonly MODEL_WIDTH = 200;
  public static readonly MODEL_HEIGHT = MembraneTransportConstants.MODEL_WIDTH *
                                        MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT /
                                        MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH;

  // A map of solute type to the dimension of the artwork so that we can create bounds in the model that accurately
  // match the artwork.
  // NOTE: When loading SVG files (and maybe PNG files?) you have to wait for the simLauncher to complete before you
  // get good bounds. Hence, this is a method rather than an attribute, and called during screen creation.
  public static getParticleViewDimensions(): Record<ParticleType, Dimension2> {

    if ( !particleAspectRatioMap ) {
      const record = {} as Record<ParticleType, Dimension2>;
      ParticleTypes.forEach( soluteType => {
        const myParticleNode = getParticleNode( soluteType );
        const soluteNodeBounds = myParticleNode.bounds;

        assert && assert( soluteNodeBounds.height > 0, `soluteNodeBounds.height is ${soluteNodeBounds.height}` );

        // Ligands are rendered in scenery, not in canvas, and have a different scale factor
        const scale = soluteType === 'ligandA' || soluteType === 'ligandB' ? 1 / MembraneTransportConstants.TRANSPORT_PROTEIN_IMAGE_SCALE : 1;

        record[ soluteType ] = new Dimension2( soluteNodeBounds.width * scale, soluteNodeBounds.height * scale );
      } );
      particleAspectRatioMap = record;
    }
    return particleAspectRatioMap;
  }

  public static readonly LIGAND_COUNT = 10; // Per ligand type
  public static readonly MAX_SOLUTE_COUNT = MembraneTransportQueryParameters.maxSolutes; // Per solute type
  public static readonly TRANSPORT_PROTEIN_WIDTH = 10; // Width in model coordinates
  public static readonly TRANSPORT_PROTEIN_IMAGE_SCALE = 0.1; // Based on the given artwork

  public static readonly SCREEN_VIEW_X_MARGIN = 8;
  public static readonly SCREEN_VIEW_Y_MARGIN = 8;

  // Bounds of the membrane for collision detection and rendering.
  public static readonly MEMBRANE_BOUNDS = new Bounds2(
    -MembraneTransportConstants.MODEL_WIDTH / 2, -10,
    MembraneTransportConstants.MODEL_WIDTH / 2, 10
  );

  public static readonly INSIDE_CELL_BOUNDS = new Bounds2(
    MembraneTransportConstants.MEMBRANE_BOUNDS.minX, -MembraneTransportConstants.MODEL_HEIGHT / 2,
    MembraneTransportConstants.MEMBRANE_BOUNDS.maxX, MembraneTransportConstants.MEMBRANE_BOUNDS.minY
  );

  public static readonly OUTSIDE_CELL_BOUNDS = new Bounds2(
    MembraneTransportConstants.MEMBRANE_BOUNDS.minX, MembraneTransportConstants.MEMBRANE_BOUNDS.maxY,
    MembraneTransportConstants.MEMBRANE_BOUNDS.maxX, MembraneTransportConstants.MODEL_HEIGHT / 2
  );

  public static readonly PANEL_TITLE_FONT_SIZE = 18;
}

membraneTransport.register( 'MembraneTransportConstants', MembraneTransportConstants );