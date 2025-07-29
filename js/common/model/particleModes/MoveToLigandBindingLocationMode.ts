// Copyright 2025, University of Colorado Boulder

/**
 * Particle (a ligand) is moving towards the designated binding location on a LigandGatedChannel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import LigandGatedChannel from '../proteins/LigandGatedChannel.js';
import Slot from '../Slot.js';
import MoveToTargetMode from './MoveToTargetMode.js';

export default class MoveToLigandBindingLocationMode extends MoveToTargetMode {

  public constructor( public readonly slot: Slot, startPosition: Vector2, checkpoints: Vector2[], targetPosition: Vector2, currentCheckpointIndex = 0 ) {
    super( 'moveToLigandBindingLocation', startPosition, checkpoints, targetPosition, currentCheckpointIndex );
  }

  public override toStateObject(): IntentionalAny {
    return this.createStateObject( {
      slot: this.slot.getIndex()
    } );
  }

  /**
   * Calculates the target position for the ligand particle to move toward the binding site
   * on the associated LigandGatedChannel. If no channel is present, returns the particle's current position.
   */
  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    const ligandGatedChannel = this.slot.transportProteinProperty.value as LigandGatedChannel;
    return ligandGatedChannel ? ligandGatedChannel.getBindingPosition() : particle.position.copy();
  }

  /**
   * Handles the event when the ligand particle reaches the binding location. Binds the ligand to
   * the LigandGatedChannel (if available) and sets the particle's position.
   */
  protected onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void {
    const ligandGatedChannel = this.slot.transportProteinProperty.value as LigandGatedChannel;
    if ( ligandGatedChannel && ligandGatedChannel.isAvailableForBinding() ) {
      affirm( particle.type === 'triangleLigand' || particle.type === 'starLigand', 'ligand should be triangleLigand or starLigand' );
      ligandGatedChannel.bindLigand( particle );
      particle.position.set( targetPosition );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToLigandBindingLocationMode {
    return new MoveToLigandBindingLocationMode(
      slot,
      MoveToTargetMode.createVector2FromState( stateObject.startPosition ),
      MoveToTargetMode.createCheckpointsFromState( stateObject.checkpoints ),
      MoveToTargetMode.createVector2FromState( stateObject.targetPosition ),
      stateObject.currentCheckpointIndex
    );
  }
}

membraneTransport.register( 'MoveToLigandBindingLocationMode', MoveToLigandBindingLocationMode );