// Copyright 2025, University of Colorado Boulder

/**
 * Particle (Sodium, Potassium, or ATP) is moving towards a specific binding site on the Sodium-Potassium Pump.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumPotassiumPump from '../proteins/SodiumPotassiumPump.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';
import WaitingInSodiumPotassiumPumpMode from './WaitingInSodiumPotassiumPumpMode.js';

export default class MoveToSodiumPotassiumPumpMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumPotassiumPump: SodiumPotassiumPump,
                      public readonly site: 'sodium1' | 'sodium2' | 'sodium3' | 'atp' | 'potassium1' | 'potassium2' ) {
    super( 'moveToSodiumPotassiumPump' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      sodiumPotassiumPump: true,
      site: this.site
    };
  }

  // TODO: There are 5 lines of duplication between this and MoveToGlucoseSodiumTransporterMode. Lets refactor it. See https://github.com/phetsims/membrane-transport/issues/315.
  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const currentPosition = particle.position.copy();
    const targetPosition = this.sodiumPotassiumPump.getSitePosition( this.site );

    const vector = targetPosition.minus( currentPosition );
    const direction = vector.normalized();

    const maxStepSize = MembraneTransportConstants.TYPICAL_SPEED * dt;
    particle.position.x += direction.x * maxStepSize;
    particle.position.y += direction.y * maxStepSize;

    const sodiumPotassiumPump = this.slot.transportProteinProperty.value as SodiumPotassiumPump;

    if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {

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
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToSodiumPotassiumPumpMode {
    return new MoveToSodiumPotassiumPumpMode(
      slot,
      slot.transportProteinProperty.value as SodiumPotassiumPump,
      stateObject.site
    );
  }
}

membraneTransport.register( 'MoveToSodiumPotassiumPumpMode', MoveToSodiumPotassiumPumpMode );