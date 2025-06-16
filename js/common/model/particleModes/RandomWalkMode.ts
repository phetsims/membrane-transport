// Copyright 2025, University of Colorado Boulder

/**
 * Particle is moving randomly in Brownian motion within the cell or extracellular space.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class RandomWalkMode extends BaseParticleMode {

  public readonly slot = null;

  public constructor( public readonly currentDirection: Vector2,
                      public readonly timeUntilNextDirection: number,
                      public readonly timeElapsedSinceMembraneCrossing: number
  ) {
    super( 'randomWalk' );
  }

  public override toStateObject(): IntentionalAny {
    const baseState = this.baseToStateObject();
    return {
      type: baseState.type,
      currentDirection: Vector2.Vector2IO.toStateObject( this.currentDirection ),
      timeUntilNextDirection: this.timeUntilNextDirection,
      timeElapsedSinceMembraneCrossing: this.timeElapsedSinceMembraneCrossing
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny ): RandomWalkMode {
    return new RandomWalkMode(
      Vector2.Vector2IO.fromStateObject( stateObject.currentDirection ),
      stateObject.timeUntilNextDirection,
      stateObject.timeElapsedSinceMembraneCrossing
    );
  }
}

membraneTransport.register( 'RandomWalkMode', RandomWalkMode );