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
import Vector2 from '../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportQueryParameters from './MembraneTransportQueryParameters.js';

export default class MembraneTransportConstants {

  // The typical speed of particles in the simulation. Some particles may use value relative to this,
  // to move faster or slower. In model units per second.
  public static readonly TYPICAL_SPEED = 30;

  // Size of the observation window in view coordinates
  public static readonly OBSERVATION_WINDOW_WIDTH = 534;
  public static readonly OBSERVATION_WINDOW_HEIGHT = 400;

  public static readonly OBSERVATION_WINDOW_BOUNDS = new Bounds2(
    0, 0,
    MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT
  );

  // The full dimensions in model coordinates for the area that you can see in the observation window.
  public static readonly MODEL_WIDTH = 200;
  public static readonly MODEL_HEIGHT = MembraneTransportConstants.MODEL_WIDTH *
                                        MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT /
                                        MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH;

  public static readonly LIGAND_COUNT = 7; // Per ligand type
  public static readonly MAX_SOLUTE_COUNT = MembraneTransportQueryParameters.maxSolutes; // Per solute type
  public static readonly TRANSPORT_PROTEIN_WIDTH = 25; // Width in model coordinates

  public static readonly SCREEN_VIEW_X_MARGIN = 8;
  public static readonly SCREEN_VIEW_Y_MARGIN = 8;

  // The artwork is sized correctly relatively to each other, but this determines the overall scale factor so that
  // they will have the correct model bounds. This applies to particles and transport proteins.
  public static readonly OVERALL_ARTWORK_SCALE = 0.1;

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

  public static readonly FOCUSED_LIGAND_BOUNDS = new Bounds2(
    MembraneTransportConstants.MEMBRANE_BOUNDS.minX + 20, MembraneTransportConstants.MEMBRANE_BOUNDS.maxY,
    MembraneTransportConstants.MEMBRANE_BOUNDS.maxX - 20, MembraneTransportConstants.MODEL_HEIGHT / 2 - 20
  );

  public static readonly PANEL_TITLE_FONT_SIZE = 16;

  public static readonly OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
    new Vector2( 0, 0 ),
    MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.center,
    MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneTransportConstants.MODEL_WIDTH
  );

  public static readonly FONT = new PhetFont( 14 );
  public static readonly TEXT_OPTIONS = { font: MembraneTransportConstants.FONT };

  // Track some image metrics in the constants since they are used interaction coordinates in the model
  public static readonly IMAGE_METRICS = {
    potassiumLigandGatedChannel: {
      closed: {
        dimension: new Dimension2( 650, 900 ),
        ligandBindingSite: new Vector2( 76, 126.1 )
      },
      open: {
        dimension: new Dimension2( 650, 900 ),
        ligandBindingSite: new Vector2( 76, 126.1 )
      }
    },
    sodiumLigandGatedChannel: {
      closed: {
        dimension: new Dimension2( 650, 900 ),
        ligandBindingSite: new Vector2( 185, 148 )
      },
      open: {
        dimension: new Dimension2( 650, 900 ),
        ligandBindingSite: new Vector2( 129, 148 )
      }
    },

    sodiumGlucoseCotransporter: {
      dimension: new Dimension2( 650, 900 ),
      sodiumSiteLeft: new Vector2( 189.5, 208.5 ),
      sodiumSiteRight: new Vector2( 497.5, 208.5 ),
      glucoseSiteCenter: new Vector2( 345.4, 366 )
    },
    sodiumPotassiumPump: {
      openDownDimension: new Dimension2( 650, 900 ),
      openDownWithPhosphateSiteDimension: new Dimension2( 650, 900 ),
      openUpDimension: new Dimension2( 650, 900 ),

      sodiumSite1: new Vector2( 241, 624.5 ),
      sodiumSite2: new Vector2( 410, 531 ),
      sodiumSite3: new Vector2( 252, 450.5 ),
      phosphateSite: new Vector2( 325, 809 ),
      phosphateSiteOpenToInside: new Vector2( 490, 800 ),
      atpSiteOpenToInside: new Vector2( 406, 1220 ),
      potassiumSite1: new Vector2( 209, 339.5 ),
      potassiumSite2: new Vector2( 443, 339 )
    }
  };
  public static readonly PANEL_CORNER_RADIUS = 5;

  /**
   * Compute the model coordinates of the binding site, given its coordinates in the image.
   *
   * @param dimension - The dimension of the protein in the image.
   * @param site - The coordinates of the binding site in the image.
   */
  public static getBindingSiteOffset( dimension: Dimension2, site: Vector2 ): Vector2 {
    return MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.viewToModelDeltaXY(
      -( dimension.width / 2 - site.x ) * MembraneTransportConstants.OVERALL_ARTWORK_SCALE,
      -( dimension.height / 2 - site.y ) * MembraneTransportConstants.OVERALL_ARTWORK_SCALE
    );
  }

  // Yes, it is unused, but this will remind us to not accidentally instantiate
  private constructor() {

    // This class should not be instantiated
  }
}

membraneTransport.register( 'MembraneTransportConstants', MembraneTransportConstants );