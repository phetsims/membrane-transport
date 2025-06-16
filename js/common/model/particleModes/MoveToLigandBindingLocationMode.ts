// Copyright 2025, University of Colorado Boulder

/**
 * Particle (a ligand) is moving towards the designated binding location on a LigandGatedChannel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class MoveToLigandBindingLocationMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot ) {
    super( 'moveToLigandBindingLocation' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex()
    };
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToLigandBindingLocationMode {
    return new MoveToLigandBindingLocationMode( slot );
  }
}

membraneTransport.register( 'MoveToLigandBindingLocationMode', MoveToLigandBindingLocationMode );