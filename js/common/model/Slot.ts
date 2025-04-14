// Copyright 2025, University of Colorado Boulder

/**
 * Model representation for a Slot, which can hold a membrane transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import membraneTransport from '../../membraneTransport.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinType from './proteins/TransportProteinType.js';
import getTransportProtein from './proteins/getTransportProtein.js';
import MembraneTransportModel, { TransportProteinIO } from './MembraneTransportModel.js';

export default class Slot {

  // The type of transport protein that is currently in this slot.
  public readonly transportProteinProperty: Property<null | TransportProtein>;

  public constructor( private readonly model: MembraneTransportModel, public readonly position: number, tandem: Tandem ) {
    this.transportProteinProperty = new Property<null | TransportProtein>( null, {
      tandem: tandem.createTandem( 'transportProteinProperty' ),
      phetioValueType: NullableIO( TransportProteinIO ),
      phetioFeatured: true
    } );
  }

  public reset(): void {
    this.transportProteinProperty.reset();
  }

  public get transportProteinType(): TransportProteinType | null {
    return this.transportProteinProperty.value ? this.transportProteinProperty.value.type : null;
  }

  public set transportProteinType( transportProteinType: TransportProteinType | null ) {
    this.transportProteinProperty.value = transportProteinType ? getTransportProtein( this.model, transportProteinType, this.position ) : null;
  }

  public isFilled(): boolean {
    return this.transportProteinProperty.value !== null;
  }

  public clear(): void {
    this.transportProteinProperty.value = null;
  }

  /**
   * Returns the model position of this slot. Slots have a horizontal position in the membrane, which is always
   * vertically at 0.
   *
   * This is a convenience function to get the position as a Vecctor2.
   */
  public getPositionVector(): Vector2 {
    return new Vector2( this.position, 0 );
  }
}

membraneTransport.register( 'Slot', Slot );