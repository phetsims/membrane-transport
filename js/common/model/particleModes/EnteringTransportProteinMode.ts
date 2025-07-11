// Copyright 2025, University of Colorado Boulder

/**
 * Particle is in the initial phase of entering a transport protein channel from either the inside or outside.
 * Particles are moving toward the entrance of the transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';
import MovingThroughTransportProteinMode from './MovingThroughTransportProteinMode.js';

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

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const direction = particle.position.y > 0 ? -1 : 1;
    const thresholdY = direction === -1
                       ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY - particle.dimension.height / 2
                       : MembraneTransportConstants.MEMBRANE_BOUNDS.minY + particle.dimension.height / 2;

    particle.position.y += direction * MembraneTransportConstants.TYPICAL_SPEED * dt;

    if ( ( direction === -1 && particle.position.y <= thresholdY ) || // above membrane, moving inward
         ( direction === 1 && particle.position.y >= thresholdY ) ) { // below membrane, moving outward
      particle.mode = new MovingThroughTransportProteinMode( this.slot, this.slot.transportProteinType!, this.direction );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): EnteringTransportProteinMode {
    return new EnteringTransportProteinMode( slot, stateObject.direction );
  }
}

membraneTransport.register( 'EnteringTransportProteinMode', EnteringTransportProteinMode );