// Copyright 2025, University of Colorado Boulder

/**
 * Particle is moving (active or passive) through the interior of a transport protein channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProteinType from '../proteins/TransportProteinType.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class MovingThroughTransportProteinMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly transportProteinType: TransportProteinType,
                      public readonly direction: 'inward' | 'outward',
                      public readonly offset?: number ) {
    super( 'movingThroughTransportProtein' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      transportProteinType: this.transportProteinType,
      direction: this.direction,
      offset: this.offset || null
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MovingThroughTransportProteinMode {
    return new MovingThroughTransportProteinMode(
      slot,
      stateObject.transportProteinType,
      stateObject.direction,
      stateObject.offset
    );
  }
}

membraneTransport.register( 'MovingThroughTransportProteinMode', MovingThroughTransportProteinMode );