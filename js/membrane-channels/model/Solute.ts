// Copyright 2025, University of Colorado Boulder

/**
 * The model for a particle in membrane channels.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

//
// Particle
//  type
//  location
//  binding (ligand)
//  state (walking, moving through channel, moving toward channel)
//  bounds (for collision detection)
//  velocity (if necessary, depends on the behavior of the random walk)
//
// Most of this can be in a base type Particle. Some specific behavior can be in a subclass for a
// specific solute.
//
// Particles do not need to be in phet-io state. However, it is best to capture locations.
// Keep as much stateful as possible.
//
//
// Solute.ts
//  - Some of these fields (like position)
//  - Create an array of these with some examples
//  - Render them in the canvas.

import Dimension2 from '../../../../dot/js/Dimension2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import SoluteType from './SoluteType.js';

/**
 * Solute class for Membrane Channels sim, supporting multiple modes of motion,
 * including a smooth "curved" random walk.
 */
export default class Solute {

  // Possible modes of motion:
  //   - 'randomWalk'         -> simple random walk, changes every frame
  //   - 'delayedWalk'        -> random direction change after every few seconds
  //   - 'smoothDelayedWalk'  -> same as 'delayedWalk' but direction changes are gradual
  //   - 'bound'              -> solute is bound (for example, to a channel)
  public mode: 'randomWalk' | 'delayedWalk' | 'smoothDelayedWalk' | 'bound' = 'smoothDelayedWalk';

  // =============================================================
  // FIELDS FOR SMOOTH, DELAYED RANDOM WALK
  // =============================================================

  // Current direction of travel. This vector is usually normalized (length 1).
  public currentDirection: Vector2;

  // The new direction we will gradually turn toward.
  public targetDirection: Vector2;

  // How long (in seconds) it takes to fully rotate from currentDirection to targetDirection.
  public turnDuration: number;

  // How much time (in seconds) has elapsed in the current "turn" from currentDirection to targetDirection.
  public turnElapsed: number;

  // How long (in seconds) we continue traveling before choosing a new targetDirection.
  public timeUntilNextDirection: number;

  // Size of the solute in model coordinates.
  public readonly dimension: Dimension2;

  public constructor(
    public readonly position: Vector2,
    public readonly type: SoluteType
  ) {
    this.dimension = MembraneChannelsConstants.SOLUTE_DIMENSION_MAP[ type ];

    // For smooth turning, initialize both directions to something random.
    this.currentDirection = Solute.createRandomUnitVector();
    this.targetDirection = Solute.createRandomUnitVector();

    // Initialize how long it takes to turn (e.g., 0.5 to 1.5 seconds).
    this.turnDuration = dotRandom.nextDoubleBetween( 0.5, 1.5 );
    this.turnElapsed = 0;

    // After 1–4 seconds, we’ll pick a new direction and smoothly turn to it.
    this.timeUntilNextDirection = dotRandom.nextDoubleBetween( 1, 4 );
  }

  public static createRandomUnitVector(): Vector2 {
    // Create a random direction by picking a random angle between 0 and 2π.
    const angle = dotRandom.nextDouble() * 2 * Math.PI;
    return new Vector2( Math.cos( angle ), Math.sin( angle ) );
  }
}

membraneChannels.register( 'Solute', Solute );