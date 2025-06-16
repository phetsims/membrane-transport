// Copyright 2025, University of Colorado Boulder

/**
 * Particle (e.g., O2, CO2) is moving directly across the lipid bilayer without a channel or transporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class PassiveDiffusionMode extends BaseParticleMode {

  public readonly slot = null;

  public constructor( public readonly direction: 'inward' | 'outward' ) {
    super( 'passiveDiffusion' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      direction: this.direction
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny ): PassiveDiffusionMode {
    return new PassiveDiffusionMode( stateObject.direction );
  }
}

membraneTransport.register( 'PassiveDiffusionMode', PassiveDiffusionMode );