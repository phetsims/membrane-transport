// Copyright 2025, University of Colorado Boulder

/**
 * Particle (Sodium or Glucose) is moving towards a specific binding site on the Sodium-Glucose Cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import Slot from '../Slot.js';
import MoveToTargetMode from './MoveToTargetMode.js';
import WaitingInSodiumGlucoseCotransporterMode from './WaitingInSodiumGlucoseCotransporterMode.js';

export default class MoveToSodiumGlucoseTransporterMode extends MoveToTargetMode {

  public constructor( public readonly slot: Slot,
                      public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter,
                      public readonly site: 'left' | 'center' | 'right',
                      startPosition: Vector2,
                      checkpoints: Vector2[],
                      targetPosition: Vector2,
                      currentCheckpointIndex = 0 ) {
    super( 'moveToSodiumGlucoseCotransporter', startPosition, checkpoints, targetPosition, currentCheckpointIndex );
  }

  public override toStateObject(): IntentionalAny {
    return this.createStateObject( {
      slot: this.slot.getIndex(),
      sodiumGlucoseCotransporter: true,
      site: this.site
    } );
  }

  /**
   * Calculates the target position for the particle to move toward the specified binding site on the transporter.
   */
  protected getTargetPosition( particle: Particle, model: MembraneTransportModel ): Vector2 {
    return this.sodiumGlucoseCotransporter.getSitePosition( this.site );
  }

  /**
   * When the particle reaches the binding site, switch to the WaitingInSodiumGlucoseCotransporterMode.
   * Snaps to the exact particle position to complete the animation.
   */
  protected onTargetReached( particle: Particle, model: MembraneTransportModel, targetPosition: Vector2 ): void {
    affirm( particle.type === 'sodiumIon' || particle.type === 'glucose', 'Only sodium and glucose can move to the sodium glucose cotransporter' );

    const newMode = new WaitingInSodiumGlucoseCotransporterMode(
      this.slot,
      this.sodiumGlucoseCotransporter,
      this.site
    );
    particle.mode = newMode;

    particle.position.set( targetPosition );

    MembraneTransportSounds.particleBoundToSodiumGlucoseTransporter( particle.type, newMode.sodiumGlucoseCotransporter.getFilledSodiumSiteCount() );
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToSodiumGlucoseTransporterMode {
    return new MoveToSodiumGlucoseTransporterMode(
      slot,
      slot.transportProteinProperty.value as SodiumGlucoseCotransporter,
      stateObject.site,
      MoveToTargetMode.createVector2FromState( stateObject.startPosition ),
      MoveToTargetMode.createCheckpointsFromState( stateObject.checkpoints ),
      MoveToTargetMode.createVector2FromState( stateObject.targetPosition ),
      stateObject.currentCheckpointIndex
    );
  }
}

membraneTransport.register( 'MoveToSodiumGlucoseTransporterMode', MoveToSodiumGlucoseTransporterMode );