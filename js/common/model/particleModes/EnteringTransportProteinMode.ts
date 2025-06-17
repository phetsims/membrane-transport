// Copyright 2025, University of Colorado Boulder

/**
 * Particle is in the initial phase of entering a transport protein channel from either the inside or outside.
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
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import SheddingCagedWaterMoleculesMode from './SheddingCagedWaterMoleculesMode.js';

export default class EnteringTransportProteinMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly direction: 'inward' | 'outward' ) {
    super( 'enteringTransportProtein' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      direction: this.direction
    };
  }

  public step( dt: number, particle: Particle<IntentionalAny>, model: MembraneTransportModel ): void {
    const direction = particle.position.y > 0 ? -1 : 1;
    const thresholdY = direction === -1
                     ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - particle.dimension.height / 2
                     : MembraneTransportConstants.MEMBRANE_BOUNDS.minY + particle.dimension.height / 2;
    const TYPICAL_SPEED = 30;

    particle.position.y += direction * TYPICAL_SPEED * dt;

    if ( ( direction === -1 && particle.position.y <= thresholdY ) ||
         ( direction === 1 && particle.position.y >= thresholdY ) ) {
      particle.mode = new SheddingCagedWaterMoleculesMode( this.slot );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): EnteringTransportProteinMode {
    return new EnteringTransportProteinMode( slot, stateObject.direction );
  }
}

membraneTransport.register( 'EnteringTransportProteinMode', EnteringTransportProteinMode );