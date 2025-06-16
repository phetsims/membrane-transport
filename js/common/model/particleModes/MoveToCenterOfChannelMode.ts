// Copyright 2025, University of Colorado Boulder

/**
 * Particle is moving towards the central opening of a transport protein channel (e.g., leakage or gated ion channel).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class MoveToCenterOfChannelMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot ) {
    super( 'moveToCenterOfChannel' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex()
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToCenterOfChannelMode {
    return new MoveToCenterOfChannelMode( slot );
  }
}

membraneTransport.register( 'MoveToCenterOfChannelMode', MoveToCenterOfChannelMode );