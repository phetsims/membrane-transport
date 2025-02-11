// Copyright 2025, University of Colorado Boulder

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import MembraneChannelsModel from './MembraneChannelsModel.js';
import Particle from './Particle.js';
import { ParticleType } from './SoluteType.js';

// We'll use a base "random walk speed" for solutes
const randomWalkSpeed = 10;

/**
 * Helper function: gets the "current" interpolated direction based on how
 * far we've turned so far, so we can store or use it if we choose a new target.
 */
function getInterpolatedDirection( solute: Particle<ParticleType> ): Vector2 {
  const alpha = Utils.clamp( solute.turnElapsed / solute.turnDuration, 0, 1 );
  return solute.currentDirection.blend( solute.targetDirection, alpha ).normalized();
}

/**
 * Step the solute along a random walk path, causing it to bounce off the
 * membrane (central horizontal band) AND also bounce off the bounding walls.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default function stepSoluteRandomWalk( solute: Particle<ParticleType>, dt: number, model: MembraneChannelsModel ): void {

  // 1) Possibly update direction choices
  solute.timeUntilNextDirection -= dt;
  if ( solute.timeUntilNextDirection <= 0 ) {

    // finalize "currentDirection" from the previous interpolation
    solute.currentDirection = getInterpolatedDirection( solute );

    // choose a new target direction randomly
    solute.targetDirection = Particle.createRandomUnitVector();

    // decide how long to turn to this target
    solute.turnDuration = dotRandom.nextDoubleBetween( 0.5, 1.5 );
    solute.turnElapsed = 0;

    // reset the time until next direction change
    solute.timeUntilNextDirection = dotRandom.nextDoubleBetween( 1, 4 );
  }

  // 2) Accumulate turn time and compute interpolated direction
  solute.turnElapsed += dt;
  const alpha = Utils.clamp( solute.turnElapsed / solute.turnDuration, 0, 1 );
  const direction = solute.currentDirection.blend( solute.targetDirection, alpha );

  // 3) If the solute is overlapping the membrane, bounce off of it
  //    (this is the original membrane-bounce logic).
  const soluteBounds = solute.dimension.toBounds(
    solute.position.x - solute.dimension.width / 2,
    solute.position.y - solute.dimension.height / 2
  );

  // Are we above (y>0) or below (y<0) the membrane region?
  const outsideOfCell = solute.position.y > 0;

  // Check overlap with membrane bounds
  if ( MembraneChannelsConstants.MEMBRANE_BOUNDS.intersectsBounds( soluteBounds ) ) {

    // Oxygen and carbon dioxide solutes can pass through the membrane
    if ( solute.type === 'oxygen' || solute.type === 'carbonDioxide' ) {

      if ( model.canDiffuseThroughMembrane( solute ) && dotRandom.nextDouble() < 0.90 ) {
        solute.mode = outsideOfCell ? 'passThroughToInside' : 'passThroughToOutside';

        return;
      }
    }

    if ( solute.type === 'sodiumIon' && model.isCloseToSodiumChannel( solute ) ) {
      solute.mode = outsideOfCell ? 'passThroughToInside' : 'passThroughToOutside';
      return;
    }

    if ( outsideOfCell ) {
      // Overlap with the membrane from above
      const overlap = MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - soluteBounds.minY;

      // push the solute back out of the membrane
      solute.position.y += overlap;

      // Reflect the motion upward
      direction.y = Math.abs( direction.y );
      solute.currentDirection.y = Math.abs( solute.currentDirection.y );
      solute.targetDirection.y = Math.abs( solute.targetDirection.y );
    }
    else {
      // Overlap with the membrane from below
      const overlap = soluteBounds.maxY - MembraneChannelsConstants.MEMBRANE_BOUNDS.minY;

      // push the solute back out of the membrane
      solute.position.y -= overlap;

      // Reflect the motion downward
      direction.y = -Math.abs( direction.y );
      solute.currentDirection.y = -Math.abs( solute.currentDirection.y );
      solute.targetDirection.y = -Math.abs( solute.targetDirection.y );
    }
  }

  // 4) Move the solute according to the direction and speed
  //    (do this AFTER membrane collisions are handled).
  const speed = dt * 3;
  solute.position.x += direction.x * speed * randomWalkSpeed;
  solute.position.y += direction.y * speed * randomWalkSpeed;

  // 5) Now bounce off the 3 other walls in whichever bounding region we are in
  //    (INSIDE_CELL_BOUNDS if y<0, or OUTSIDE_CELL_BOUNDS if y>0).
  const boundingRegion = outsideOfCell ?
                         MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS :
                         MembraneChannelsConstants.INSIDE_CELL_BOUNDS;

  // Recompute soluteBounds after the move
  const updatedBounds = solute.dimension.toBounds(
    solute.position.x - solute.dimension.width / 2,
    solute.position.y - solute.dimension.height / 2
  );

  // Collide with left wall
  if ( updatedBounds.minX < boundingRegion.minX ) {
    const overlap = boundingRegion.minX - updatedBounds.minX;
    solute.position.x += overlap;
    direction.x = Math.abs( direction.x );
    solute.currentDirection.x = Math.abs( solute.currentDirection.x );
    solute.targetDirection.x = Math.abs( solute.targetDirection.x );
  }

  // Collide with right wall
  if ( updatedBounds.maxX > boundingRegion.maxX ) {
    const overlap = updatedBounds.maxX - boundingRegion.maxX;
    solute.position.x -= overlap;
    direction.x = -Math.abs( direction.x );
    solute.currentDirection.x = -Math.abs( solute.currentDirection.x );
    solute.targetDirection.x = -Math.abs( solute.targetDirection.x );
  }

  // Collide with bottom wall
  if ( updatedBounds.minY < boundingRegion.minY ) {
    const overlap = boundingRegion.minY - updatedBounds.minY;
    solute.position.y += overlap;
    direction.y = Math.abs( direction.y );
    solute.currentDirection.y = Math.abs( solute.currentDirection.y );
    solute.targetDirection.y = Math.abs( solute.targetDirection.y );
  }

  // Collide with top wall
  if ( updatedBounds.maxY > boundingRegion.maxY ) {
    const overlap = updatedBounds.maxY - boundingRegion.maxY;
    solute.position.y -= overlap;
    direction.y = -Math.abs( direction.y );
    solute.currentDirection.y = -Math.abs( solute.currentDirection.y );
    solute.targetDirection.y = -Math.abs( solute.targetDirection.y );
  }
}