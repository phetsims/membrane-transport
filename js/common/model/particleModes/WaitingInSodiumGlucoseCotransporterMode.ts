// Copyright 2025, University of Colorado Boulder

/**
 * Particle is occupying a binding site within the Sodium-Glucose Cotransporter, waiting for the transport cycle to proceed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class WaitingInSodiumGlucoseCotransporterMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter,
                      public readonly site: 'left' | 'center' | 'right' ) {
    super( 'waitingInSodiumGlucoseCotransporter' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      sodiumGlucoseCotransporter: true,
      site: this.site
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): WaitingInSodiumGlucoseCotransporterMode {
    return new WaitingInSodiumGlucoseCotransporterMode(
      slot,
      slot.transportProteinProperty.value as SodiumGlucoseCotransporter,
      stateObject.site
    );
  }
}

membraneTransport.register( 'WaitingInSodiumGlucoseCotransporterMode', WaitingInSodiumGlucoseCotransporterMode );