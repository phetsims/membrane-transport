// Copyright 2025, University of Colorado Boulder

/**
 * The Particle is moving towards the central opening of a transport protein channel (e.g., leakage or gated ion channel).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import Slot from '../Slot.js';
import EnteringTransportProteinMode from './EnteringTransportProteinMode.js';
import MoveToTargetMode from './MoveToTargetMode.js';

export default class MoveToCenterOfChannelMode extends MoveToTargetMode {

  public constructor( public readonly slot: Slot ) {
    super( 'moveToCenterOfChannel' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex()
    };
  }

  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    // Move only in X direction, maintaining current Y position
    return new Vector2( this.slot.position, particle.position.y );
  }

  protected onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void {
    particle.mode = new EnteringTransportProteinMode(
      this.slot,
      particle.position.y > 0 ? 'inward' : 'outward'
    );
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToCenterOfChannelMode {
    return new MoveToCenterOfChannelMode( slot );
  }
}

membraneTransport.register( 'MoveToCenterOfChannelMode', MoveToCenterOfChannelMode );