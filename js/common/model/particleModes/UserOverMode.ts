// Copyright 2025, University of Colorado Boulder

/**
 * User's pointer is currently hovering over the ligand, which pauses its motion.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class UserOverMode extends BaseParticleMode {

  public readonly slot = null;

  public constructor() {
    super( 'userOver' );
  }

  public override toStateObject(): IntentionalAny {
    return this.baseToStateObject();
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    // nothing to do when user is hovering over the particle, the particle pauses motion
  }

  public static override fromStateObject( stateObject: IntentionalAny ): UserOverMode {
    return new UserOverMode();
  }
}

membraneTransport.register( 'UserOverMode', UserOverMode );