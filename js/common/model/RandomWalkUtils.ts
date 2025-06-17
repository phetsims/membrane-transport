// Copyright 2025, University of Colorado Boulder

/**
 * Utility functions for random walk behavior in membrane transport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import { boxMullerTransform } from '../../../../dot/js/util/boxMullerTransform.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import membraneTransport from '../../membraneTransport.js';

const RandomWalkUtils = {

  /**
   * For the random walk, the brownian motion is straight lines then random angles. This function determines how long to
   * go straight before a sudden direction change.
   */
  sampleValueHowLongToGoStraight(): number {
    const result = boxMullerTransform( 0.3, 0.4, dotRandom );
    return clamp( result, 0.01, 2 );
  },

  /**
   * Creates a random unit vector by picking an angle between 0 and 2π.
   */
  createRandomUnitVector(): Vector2 {
    const angle = dotRandom.nextDouble() * 2 * Math.PI;
    return new Vector2( Math.cos( angle ), Math.sin( angle ) );
  }
};

membraneTransport.register( 'RandomWalkUtils', RandomWalkUtils );

export default RandomWalkUtils;