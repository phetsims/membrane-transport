// Copyright 2025, University of Colorado Boulder

/**
 * Particle (Sodium, Potassium, or ATP) is moving towards a specific binding site on the Sodium-Potassium Pump.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumPotassiumPump from '../proteins/SodiumPotassiumPump.js';
import Slot from '../Slot.js';
import MoveToTargetMode from './MoveToTargetMode.js';
import WaitingInSodiumPotassiumPumpMode from './WaitingInSodiumPotassiumPumpMode.js';

export default class MoveToSodiumPotassiumPumpMode extends MoveToTargetMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumPotassiumPump: SodiumPotassiumPump,
                      public readonly site: 'sodium1' | 'sodium2' | 'sodium3' | 'atp' | 'potassium1' | 'potassium2',
                      startPosition: Vector2,
                      checkpoint: Vector2,
                      targetPosition: Vector2,
                      hasReachedCheckpoint = false ) {
    super( 'moveToSodiumPotassiumPump', startPosition, checkpoint, targetPosition, hasReachedCheckpoint );
  }

  public override toStateObject(): IntentionalAny {
    const parentState = super.toStateObject();
    return {
      type: parentState.type,
      startPosition: parentState.startPosition,
      checkpoint: parentState.checkpoint,
      targetPosition: parentState.targetPosition,
      hasReachedCheckpoint: parentState.hasReachedCheckpoint,
      slot: this.slot.getIndex(),
      sodiumPotassiumPump: true,
      site: this.site
    };
  }

  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    return this.sodiumPotassiumPump.getSitePosition( this.site );
  }

  protected onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void {
    const sodiumPotassiumPump = this.slot.transportProteinProperty.value as SodiumPotassiumPump;

    if ( particle.type === 'sodiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToInsideEmpty' ) {

      const mode = new WaitingInSodiumPotassiumPumpMode( this.slot, sodiumPotassiumPump, this.site === 'atp' ? 'phosphate' : this.site );
      particle.mode = mode;
      particle.position.set( targetPosition );

      MembraneTransportSounds.sodiumLockedInToSodiumPotassiumPump( mode.site, sodiumPotassiumPump.getNumberOfFilledSodiumSites() );
    }
    else if ( particle.type === 'atp' && sodiumPotassiumPump.stateProperty.value === 'openToInsideSodiumBound' ) {

      particle.mode = new WaitingInSodiumPotassiumPumpMode( this.slot, sodiumPotassiumPump, this.site === 'atp' ? 'phosphate' : this.site );
      sodiumPotassiumPump.stateProperty.value = 'openToInsideSodiumAndATPBound';
      MembraneTransportSounds.phosphateLockedInToSodiumPotassiumPump();
    }
    else if ( particle.type === 'potassiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToOutsideAwaitingPotassium' ) {

      const mode = new WaitingInSodiumPotassiumPumpMode( this.slot, sodiumPotassiumPump, this.site === 'atp' ? 'phosphate' : this.site );
      particle.mode = mode;
      particle.position.set( targetPosition );

      MembraneTransportSounds.potassiumLockedInToSodiumPotassiumPump( mode.site, sodiumPotassiumPump.getNumberOfFilledPotassiumSites() );

      if ( sodiumPotassiumPump.getNumberOfFilledPotassiumSites() === 2 ) {
        sodiumPotassiumPump.stateProperty.value = 'openToOutsidePotassiumBound';
      }
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToSodiumPotassiumPumpMode {
    return new MoveToSodiumPotassiumPumpMode(
      slot,
      slot.transportProteinProperty.value as SodiumPotassiumPump,
      stateObject.site,
      new Vector2( stateObject.startPosition.x, stateObject.startPosition.y ),
      new Vector2( stateObject.checkpoint.x, stateObject.checkpoint.y ),
      new Vector2( stateObject.targetPosition.x, stateObject.targetPosition.y ),
      stateObject.hasReachedCheckpoint
    );
  }
}

membraneTransport.register( 'MoveToSodiumPotassiumPumpMode', MoveToSodiumPotassiumPumpMode );