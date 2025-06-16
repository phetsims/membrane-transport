// Copyright 2025, University of Colorado Boulder

/**
 * Particle is paused briefly upon entering a channel, simulating the shedding of associated water molecules.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class SheddingCagedWaterMoleculesMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly sheddingElapsed?: number ) {
    super( 'sheddingCagedWaterMolecules' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      sheddingElapsed: this.sheddingElapsed || null
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): SheddingCagedWaterMoleculesMode {
    return new SheddingCagedWaterMoleculesMode( slot, stateObject.sheddingElapsed );
  }
}

membraneTransport.register( 'SheddingCagedWaterMoleculesMode', SheddingCagedWaterMoleculesMode );