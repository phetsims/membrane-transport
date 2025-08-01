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
                      checkpoints: Vector2[],
                      targetPosition: Vector2,
                      currentCheckpointIndex = 0 ) {
    super( 'moveToSodiumPotassiumPump', startPosition, checkpoints, targetPosition, currentCheckpointIndex );
  }

  public override toStateObject(): IntentionalAny {
    return this.createStateObject( {
      slot: this.slot.getIndex(),
      sodiumPotassiumPump: true,
      site: this.site
    } );
  }

  /**
   * Returns the position for the particle to move towards to reach the binding site.
   */
  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    return this.sodiumPotassiumPump.getSitePosition( this.site );
  }

  /**
   * Updates state when a particle reaches its binding site.
   */
  protected onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void {
    const sodiumPotassiumPump = this.slot.transportProteinProperty.value as SodiumPotassiumPump;

    if ( particle.type === 'sodiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToInsideEmpty' &&

         ( this.site === 'sodium1' || this.site === 'sodium2' || this.site === 'sodium3' )

    ) {

      const mode = new WaitingInSodiumPotassiumPumpMode( this.slot, sodiumPotassiumPump, this.site );
      particle.mode = mode;
      particle.position.set( targetPosition );

      sodiumPotassiumPump.soluteBoundEmitter.emit( mode.site, particle.type );
    }
    else if ( particle.type === 'atp' && sodiumPotassiumPump.stateProperty.value === 'openToInsideSodiumBound' &&

              ( this.site === 'atp' )
    ) {

      const mode = new WaitingInSodiumPotassiumPumpMode( this.slot, sodiumPotassiumPump, this.site );
      particle.mode = mode;
      sodiumPotassiumPump.stateProperty.value = 'openToInsideSodiumAndATPBound';

      sodiumPotassiumPump.soluteBoundEmitter.emit( mode.site, 'phosphate' );
    }
    else if ( particle.type === 'potassiumIon' && sodiumPotassiumPump.stateProperty.value === 'openToOutsideAwaitingPotassium' ) {

      const mode = new WaitingInSodiumPotassiumPumpMode( this.slot, sodiumPotassiumPump, this.site === 'atp' ? 'phosphate' : this.site );
      particle.mode = mode;
      particle.position.set( targetPosition );

      sodiumPotassiumPump.soluteBoundEmitter.emit( mode.site, particle.type );

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
      MoveToTargetMode.createVector2FromState( stateObject.startPosition ),
      MoveToTargetMode.createCheckpointsFromState( stateObject.checkpoints ),
      MoveToTargetMode.createVector2FromState( stateObject.targetPosition ),
      stateObject.currentCheckpointIndex
    );
  }
}

membraneTransport.register( 'MoveToSodiumPotassiumPumpMode', MoveToSodiumPotassiumPumpMode );