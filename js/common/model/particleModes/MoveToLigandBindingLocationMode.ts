// Copyright 2025, University of Colorado Boulder

/**
 * Particle (a ligand) is moving towards the designated binding location on a LigandGatedChannel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import LigandGatedChannel from '../proteins/LigandGatedChannel.js';
import Slot from '../Slot.js';
import BaseParticleMode from './BaseParticleMode.js';

export default class MoveToLigandBindingLocationMode extends BaseParticleMode {

  public constructor( public readonly slot: Slot ) {
    super( 'moveToLigandBindingLocation' );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.slot.getIndex()
    };
  }

  public step( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const ligandGatedChannel = this.slot.transportProteinProperty.value as LigandGatedChannel;
    if ( ligandGatedChannel ) {
      const currentPosition = particle.position;
      const targetPosition = ligandGatedChannel.getBindingPosition();
      const maxStepSize = MembraneTransportConstants.TYPICAL_SPEED * dt;

      particle.position.x += Math.sign( targetPosition.x - currentPosition.x ) * maxStepSize;
      particle.position.y += Math.sign( targetPosition.y - currentPosition.y ) * maxStepSize;

      if ( targetPosition.distance( currentPosition ) <= maxStepSize && ligandGatedChannel.isAvailableForBinding() ) {
        affirm( particle.type === 'triangleLigand' || particle.type === 'starLigand', 'ligand should be triangleLigand or starLigand' );
        ligandGatedChannel.bindLigand( particle );

        particle.position.set( targetPosition );
      }
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MoveToLigandBindingLocationMode {
    return new MoveToLigandBindingLocationMode( slot );
  }
}

membraneTransport.register( 'MoveToLigandBindingLocationMode', MoveToLigandBindingLocationMode );