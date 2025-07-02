// Copyright 2025, University of Colorado Boulder

/**
 * Particle (Sodium or Glucose) is moving towards a specific binding site on the Sodium-Glucose Cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';
import WaitingInSodiumGlucoseCotransporterMode from './WaitingInSodiumGlucoseCotransporterMode.js';

export default class MoveToSodiumGlucoseTransporterMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter,
                      public readonly site: 'left' | 'center' | 'right' ) {
    super( 'moveToSodiumGlucoseCotransporter' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex(),
      sodiumGlucoseCotransporter: true,
      site: this.site
    };
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    affirm( particle.type === 'sodiumIon' || particle.type === 'glucose', 'Only sodium and glucose can move to the sodium glucose cotransporter' );

    const currentPosition = particle.position.copy();
    const targetPosition = this.sodiumGlucoseCotransporter.getSitePosition( this.site );
    const vector = targetPosition.minus( currentPosition );
    const direction = vector.normalized();
    const TYPICAL_SPEED = 30;

    const maxStepSize = TYPICAL_SPEED * dt;
    particle.position.x += direction.x * maxStepSize;
    particle.position.y += direction.y * maxStepSize;

    if ( currentPosition.distance( targetPosition ) <= maxStepSize ) {
      const newMode = new WaitingInSodiumGlucoseCotransporterMode(
        this.slot,
        this.sodiumGlucoseCotransporter,
        this.site
      );
      particle.mode = newMode;

      particle.position.set( targetPosition );

      MembraneTransportSounds.particleBoundToSodiumGlucoseTransporter( particle.type, newMode.sodiumGlucoseCotransporter.getFilledSodiumSiteCount() );
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToSodiumGlucoseTransporterMode {
    return new MoveToSodiumGlucoseTransporterMode(
      slot,
      slot.transportProteinProperty.value as SodiumGlucoseCotransporter,
      stateObject.site
    );
  }
}

membraneTransport.register( 'MoveToSodiumGlucoseTransporterMode', MoveToSodiumGlucoseTransporterMode );