// Copyright 2025, University of Colorado Boulder

/**
 * Particle is moving (active or passive) through the interior of a transport protein channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import SodiumGlucoseCotransporter from '../proteins/SodiumGlucoseCotransporter.js';
import TransportProteinType from '../proteins/TransportProteinType.js';
import Slot from '../Slot.js';
import DirectionalMovementMode from './DirectionalMovementMode.js';

export default class MovingThroughTransportProteinMode extends DirectionalMovementMode {

  public constructor( private readonly movingThroughSlot: Slot,
                      public readonly transportProteinType: TransportProteinType,
                      direction: 'inward' | 'outward',
                      public readonly offset?: number ) {
    super( 'movingThroughTransportProtein', direction, movingThroughSlot );
  }

  public override toStateObject(): IntentionalAny {
    return {
      type: this.type,
      slot: this.movingThroughSlot.getIndex(),
      transportProteinType: this.transportProteinType,
      direction: this.direction,
      offset: this.offset || null
    };
  }

  /**
   * Keep the particle close to the center of the transport protein. If the particle moves through SodiumGlucoseCotransporter,
   * the protein becomes open to the inside.
   */
  protected handleSpecificBehavior( dt: number, particle: Particle, model: MembraneTransportModel ): void {
    const center = this.movingThroughSlot.position + ( this.offset || 0 );
    const maxDistanceFromCenter = 0.8;
    if ( Math.abs( particle.position.x - center ) > maxDistanceFromCenter ) {
      particle.position.x = center + maxDistanceFromCenter * Math.sign( particle.position.x - center );
    }

    const crossedOver = this.direction === 'inward' && particle.position.y < 0 ||
                        this.direction === 'outward' && particle.position.y > 0;

    if ( crossedOver && Math.abs( particle.position.y ) > MembraneTransportConstants.MEMBRANE_BOUNDS.height / 2 ) {
      const transportProtein = this.movingThroughSlot.transportProteinProperty.value;

      if ( transportProtein instanceof SodiumGlucoseCotransporter ) {
        transportProtein.stateProperty.value = 'openToInside';
      }
    }
  }

  public static override fromStateObject( stateObject: IntentionalAny, slot: Slot ): MovingThroughTransportProteinMode {
    return new MovingThroughTransportProteinMode(
      slot,
      stateObject.transportProteinType,
      stateObject.direction,
      stateObject.offset
    );
  }
}

membraneTransport.register( 'MovingThroughTransportProteinMode', MovingThroughTransportProteinMode );