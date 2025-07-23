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

  public constructor( public readonly slot: Slot, startPosition: Vector2, checkpoint: Vector2, targetPosition: Vector2, hasReachedCheckpoint = false ) {
    super( 'moveToLigandBindingLocation', startPosition, checkpoint, targetPosition, hasReachedCheckpoint );
  }

  public override toStateObject(): IntentionalAny {
    const parentState = super.toStateObject();
    return {
      type: parentState.type,
      startPosition: parentState.startPosition,
      checkpoint: parentState.checkpoint,
      targetPosition: parentState.targetPosition,
      hasReachedCheckpoint: parentState.hasReachedCheckpoint,
      slot: this.slot.getIndex()
    };
  }

  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    const ligandGatedChannel = this.slot.transportProteinProperty.value as LigandGatedChannel;
    return ligandGatedChannel ? ligandGatedChannel.getBindingPosition() : particle.position.copy();
  }

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
      new Vector2( stateObject.startPosition.x, stateObject.startPosition.y ),
      new Vector2( stateObject.checkpoint.x, stateObject.checkpoint.y ),
      new Vector2( stateObject.targetPosition.x, stateObject.targetPosition.y ),
      stateObject.hasReachedCheckpoint
    );
  }
}

membraneTransport.register( 'MoveToLigandBindingLocationMode', MoveToLigandBindingLocationMode );