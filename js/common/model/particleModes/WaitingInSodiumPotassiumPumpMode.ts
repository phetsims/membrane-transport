// Copyright 2025, University of Colorado Boulder

/**
 * Particle is occupying a binding site within the Sodium-Potassium Pump, waiting for the transport cycle to proceed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
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

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): WaitingInSodiumPotassiumPumpMode {
    return new WaitingInSodiumPotassiumPumpMode(
      slot,
      slot.transportProteinProperty.value as SodiumPotassiumPump,
      stateObject.site
    );
  }
}

membraneTransport.register( 'WaitingInSodiumPotassiumPumpMode', WaitingInSodiumPotassiumPumpMode );