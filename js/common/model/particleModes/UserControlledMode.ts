// Copyright 2025, University of Colorado Boulder

/**
 * Ligand's position is being directly controlled by user input (e.g., dragging).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class UserControlledMode extends BaseParticleMode {

  public readonly slot = null;

  public constructor() {
    super( 'userControlled' );
  }

  public override toStateObject(): IntentionalAny {
    return this.baseToStateObject();
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    // nothing to do when user is controlling the particle
  }

  public static override fromStateObject( stateObject: IntentionalAny ): UserControlledMode {
    return new UserControlledMode();
  }
}

membraneTransport.register( 'UserControlledMode', UserControlledMode );