// Copyright 2025, University of Colorado Boulder

/**
 * Particle (e.g., O2, CO2) is moving directly across the lipid bilayer without a channel or transporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import DirectionalMovementMode from './DirectionalMovementMode.js';

export default class PassiveDiffusionMode extends DirectionalMovementMode {

  public readonly slot = null;

  public constructor( direction: 'inward' | 'outward' ) {
    super( 'passiveDiffusion', direction );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      direction: this.direction
    };
  }

  protected handleSpecificBehavior( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    // Passive diffusion has no specific behavior beyond the common directional movement
  }

  public static override fromStateObject( stateObject: IntentionalAny ): PassiveDiffusionMode {
    return new PassiveDiffusionMode( stateObject.direction );
  }
}

membraneTransport.register( 'PassiveDiffusionMode', PassiveDiffusionMode );