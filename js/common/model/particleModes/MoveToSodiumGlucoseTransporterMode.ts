// Copyright 2025, University of Colorado Boulder

/**
 * Particle (Sodium or Glucose) is moving towards a specific binding site on the Sodium-Glucose Cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class MoveToSodiumGlucoseTransporterMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter,
                      public readonly site: 'left' | 'center' | 'right' ) {
    super( 'moveToSodiumGlucoseCotransporter' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      sodiumGlucoseCotransporter: true,
      site: this.site
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToSodiumGlucoseTransporterMode {
    return new MoveToSodiumGlucoseTransporterMode(
      slot,
      slot.transportProteinProperty.value as SodiumGlucoseCotransporter,
      stateObject.site
    );
  }
}

membraneTransport.register( 'MoveToSodiumGlucoseTransporterMode', MoveToSodiumGlucoseTransporterMode );