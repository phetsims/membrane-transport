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
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import EnteringTransportProteinMode from './EnteringTransportProteinMode.js';

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

  public step( dt: number, particle: Particle<IntentionalAny>, model: MembraneTransportModel ): void {
    const currentPositionX = particle.position.x;
    const targetPositionX = this.slot.position;
    const TYPICAL_SPEED = 30;

    const maxStepSize = TYPICAL_SPEED * dt;
    particle.position.x += Math.sign( targetPositionX - currentPositionX ) * maxStepSize;

    if ( Math.abs( targetPositionX - currentPositionX ) <= maxStepSize ) {
      particle.mode = new EnteringTransportProteinMode(
        this.slot,
        particle.position.y > 0 ? 'inward' : 'outward'
      );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToCenterOfChannelMode {
    return new MoveToCenterOfChannelMode( slot );
  }
}

membraneTransport.register( 'MoveToCenterOfChannelMode', MoveToCenterOfChannelMode );