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

import Vector2 from '../../../../dot/js/Vector2.js';
import membraneChannels from '../../membraneChannels.js';
import SoluteType from './SoluteType.js';

export default class Solute {
  public readonly position = new Vector2( 0, 0 );

  public constructor( public readonly type: SoluteType ) {

    // TODO: Other state
  }


}

membraneChannels.register( 'Solute', Solute );