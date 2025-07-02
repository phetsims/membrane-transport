// Copyright 2025, University of Colorado Boulder

/**
 * Particle (a ligand) is currently attached to the binding site of a LigandGatedChannel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import LigandGatedChannel from '../proteins/LigandGatedChannel.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class LigandBoundMode extends BaseParticleMode {

  public constructor( public readonly ligandGatedChannel: LigandGatedChannel,
                      public readonly slot: Slot ) {
    super( 'ligandBound' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      ligandGatedChannel: true
    };
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    particle.position.set( this.ligandGatedChannel.getBindingPosition() );
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): LigandBoundMode {
    return new LigandBoundMode(
      slot.transportProteinProperty.value as LigandGatedChannel,
      slot
    );
  }
}

membraneTransport.register( 'LigandBoundMode', LigandBoundMode );