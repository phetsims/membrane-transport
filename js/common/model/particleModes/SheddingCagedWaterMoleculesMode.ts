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
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import MovingThroughTransportProteinMode from './MovingThroughTransportProteinMode.js';

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

  public step( dt: number, particle: Particle<IntentionalAny>, model: MembraneTransportModel ): void {
    const sheddingDuration = 0.1;
    const newSheddingElapsed = ( this.sheddingElapsed || 0 ) + dt;

    if ( newSheddingElapsed >= sheddingDuration ) {
      const outsideOfCell = particle.position.y > 0;
      particle.mode = new MovingThroughTransportProteinMode(
        this.slot,
        this.slot.transportProteinType!,
        outsideOfCell ? 'inward' : 'outward'
      );
    }
    else {
      particle.mode = new SheddingCagedWaterMoleculesMode( this.slot, newSheddingElapsed );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): SheddingCagedWaterMoleculesMode {
    return new SheddingCagedWaterMoleculesMode( slot, stateObject.sheddingElapsed );
  }
}

membraneTransport.register( 'SheddingCagedWaterMoleculesMode', SheddingCagedWaterMoleculesMode );