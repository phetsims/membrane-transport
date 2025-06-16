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

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): EnteringTransportProteinMode {
    return new EnteringTransportProteinMode( slot, stateObject.direction );
  }
}

membraneTransport.register( 'EnteringTransportProteinMode', EnteringTransportProteinMode );