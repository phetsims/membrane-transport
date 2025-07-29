// Copyright 2025, University of Colorado Boulder

/**
 * Particle is occupying a binding site within the Sodium-Potassium Pump, waiting for the transport cycle to proceed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumPotassiumPump from '../proteins/SodiumPotassiumPump.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class WaitingInSodiumPotassiumPumpMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumPotassiumPump: SodiumPotassiumPump,
                      public readonly site: 'sodium1' | 'sodium2' | 'sodium3' | 'phosphate' | 'potassium1' | 'potassium2' ) {
    super( 'waitingInSodiumPotassiumPump' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      sodiumPotassiumPump: true,
      site: this.site
    };
  }

  /**
   * While the particle is waiting in the pump, keep it at its binding site. Implemented in step
   * so that particles stay in the right place during conformation changes of the pump.
   */
  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const targetPosition = this.sodiumPotassiumPump.getSitePosition( this.site );
    particle.position.set( targetPosition );
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): WaitingInSodiumPotassiumPumpMode {
    return new WaitingInSodiumPotassiumPumpMode(
      slot,
      slot.transportProteinProperty.value as SodiumPotassiumPump,
      stateObject.site
    );
  }
}

membraneTransport.register( 'WaitingInSodiumPotassiumPumpMode', WaitingInSodiumPotassiumPumpMode );