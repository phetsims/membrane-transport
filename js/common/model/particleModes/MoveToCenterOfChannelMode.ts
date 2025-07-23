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
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import Slot from '../Slot.js';
import EnteringTransportProteinMode from './EnteringTransportProteinMode.js';
import MoveToTargetMode from './MoveToTargetMode.js';

export default class MoveToCenterOfChannelMode extends MoveToTargetMode {

  public constructor( public readonly slot: Slot, startPosition: Vector2, checkpoints: Vector2[], targetPosition: Vector2, currentCheckpointIndex = 0 ) {
    super( 'moveToCenterOfChannel', startPosition, checkpoints, targetPosition, currentCheckpointIndex );
  }

  public override toStateObject(): IntentionalAny {
    return this.createStateObject( {
      slot: this.slot.getIndex()
    } );
  }

  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    // Determine the y-coordinate of the mouth of the protein based on which side the particle is on
    const isOutsideCell = particle.position.y > 0;
    const mouthY = isOutsideCell ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY
                                 : MembraneTransportConstants.MEMBRANE_BOUNDS.minY;

    // Move directly to the mouth of the protein at the membrane edge
    return new Vector2( this.slot.position, mouthY );
  }

  protected onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void {
    particle.mode = new EnteringTransportProteinMode(
      this.slot,
      particle.position.y > 0 ? 'inward' : 'outward'
    );
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToCenterOfChannelMode {
    return new MoveToCenterOfChannelMode(
      slot,
      MoveToTargetMode.createVector2FromState( stateObject.startPosition ),
      MoveToTargetMode.createCheckpointsFromState( stateObject.checkpoints ),
      MoveToTargetMode.createVector2FromState( stateObject.targetPosition ),
      stateObject.currentCheckpointIndex
    );
  }
}

membraneTransport.register( 'MoveToCenterOfChannelMode', MoveToCenterOfChannelMode );