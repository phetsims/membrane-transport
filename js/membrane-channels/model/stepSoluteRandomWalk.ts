// Copyright 2025, University of Colorado Boulder

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import Solute from './Solute.js';

// We'll use a base "random walk speed" for solutes
const randomWalkSpeed = 10;

/**
 * Helper function: gets the "current" interpolated direction based on how
 * far we’ve turned so far, so we can store or use it if we choose a new target.
 */
function getInterpolatedDirection( solute: Solute ): Vector2 {
  const alpha = Utils.clamp( solute.turnElapsed / solute.turnDuration, 0, 1 );
  return solute.currentDirection.blend( solute.targetDirection, alpha ).normalized();
}

/**
 * Step the solute along a random walk path.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function stepSoluteRandomWalk( solute: Solute, dt: number ): void {

  const speed = dt * 3;

  // 1) Decrement the time until we pick a NEW target direction
  solute.timeUntilNextDirection -= dt;

  // If it's time for a new direction, store the final "currentDirection"
  // (so we don't lose any partial turn) and pick a new random direction.
  if ( solute.timeUntilNextDirection <= 0 ) {

    // Set currentDirection to the "latest" direction from the end of the last turn
    // to avoid small rounding errors during interpolation.
    const lastDir = getInterpolatedDirection( solute );
    solute.currentDirection = lastDir; // store it

    // Choose a new target direction
    solute.targetDirection = Solute.createRandomUnitVector();

    // Decide how long it will take to turn to this new target
    solute.turnDuration = dotRandom.nextDoubleBetween( 0.5, 1.5 );
    solute.turnElapsed = 0;

    // Reset the time until next direction change (in 1–4 seconds again)
    solute.timeUntilNextDirection = dotRandom.nextDoubleBetween( 1, 4 );
  }

  // 2) Accumulate turn time
  solute.turnElapsed += dt;
  // We clamp in case we exceed the turn duration
  const alpha = Utils.clamp( solute.turnElapsed / solute.turnDuration, 0, 1 );

  // 3) Interpolate from currentDirection to targetDirection by alpha
  // Then normalize for a unit vector
  const direction = solute.currentDirection.blend( solute.targetDirection, alpha );

  const soluteBounds = solute.dimension.toBounds(
    solute.position.x - solute.dimension.width / 2,
    solute.position.y - solute.dimension.height / 2
  );

  const outsideOfCell = solute.position.y > 0;

  if ( MembraneChannelsConstants.MEMBRANE_BOUNDS.intersectsBounds( soluteBounds ) ) {
    if ( outsideOfCell ) {
      const overlap = MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - soluteBounds.minY;

      // push the solute back out of the membrane
      solute.position.y += overlap;

      // Make it move up.
      direction.y = Math.abs( direction.y );

      // Also make the current and target direction go up (for smooth walking algorithms)
      solute.currentDirection.y = Math.abs( solute.currentDirection.y );
      solute.targetDirection.y = Math.abs( solute.targetDirection.y );
    }
    else {
      const overlap = soluteBounds.maxY - MembraneChannelsConstants.MEMBRANE_BOUNDS.minY;

      // push the solute back out of the membrane
      solute.position.y -= overlap;

      // Make it move down.
      direction.y = -Math.abs( direction.y );

      // Also make the current and target direction go down (for smooth walking algorithms)
      solute.currentDirection.y = -Math.abs( solute.currentDirection.y );
      solute.targetDirection.y = -Math.abs( solute.targetDirection.y );
    }
  }

  // 4) Move the solute along this direction
  solute.position.x += direction.x * speed * randomWalkSpeed;
  solute.position.y += direction.y * speed * randomWalkSpeed;
}