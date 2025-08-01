// Copyright 2025, University of Colorado Boulder

/**
 * Model representation for a Slot, which can hold a membrane transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportModel from './MembraneTransportModel.js';
import createTransportProtein from './proteins/createTransportProtein.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinType, { TransportProteinTypeValues } from './proteins/TransportProteinType.js';

export default class Slot {

  // The type of transport protein that is currently in this slot.
  public readonly transportProteinProperty: Property<null | TransportProtein>;
  private readonly transportProteinTypeProperty: TReadOnlyProperty<TransportProteinType | null>;

  public constructor( private readonly model: MembraneTransportModel, public readonly position: number, tandem: Tandem ) {

    this.transportProteinProperty = new Property<null | TransportProtein>( null );

    // Just for PhET-iO, indicate what kind of protein is in the slot, if any.
    this.transportProteinTypeProperty = new DerivedProperty( [ this.transportProteinProperty ], transportProtein => {
      return transportProtein ? transportProtein.type : null;
    }, {
      tandem: tandem.createTandem( 'transportProteinTypeProperty' ),
      phetioValueType: NullableIO( StringIO ),
      phetioFeatured: true,
      phetioDocumentation: 'The type of transport protein in this slot, or null if the slot is empty.',
      validValues: [ ...TransportProteinTypeValues, null ]
    } );

    this.transportProteinProperty.lazyLink( ( transportProtein, oldTransportProtein ) => {

      // We must clear given a slot, since the slot is already disassociated from the transport protein.
      // However, we also do not want to add arguments to dispose, so we do this in two steps.
      oldTransportProtein && oldTransportProtein.clear( this );
      oldTransportProtein && oldTransportProtein.dispose();
    } );
  }

  /**
   * Returns the index of this slot in the list of slots (mostly for phet-io serialization).
   */
  public getIndex(): number {
    return this.model.membraneSlots.indexOf( this );
  }

  public reset(): void {
    this.transportProteinProperty.reset();
  }

  /**
   * Returns the type of the transport protein in this slot, or null if the slot is empty.
   */
  public get transportProteinType(): TransportProteinType | null {
    return this.transportProteinProperty.value ? this.transportProteinProperty.value.type : null;
  }

  /**
   * Sets the type for the transport protein in this slot by creating a new transport protein of the specified type.
   * @param transportProteinType
   */
  public set transportProteinType( transportProteinType: TransportProteinType | null ) {
    this.transportProteinProperty.value = transportProteinType ? createTransportProtein( this.model, transportProteinType, this.position ) : null;
  }

  /**
   * Returns true if this slot is holding a transport protein.
   */
  public isFilled(): boolean {
    return this.transportProteinProperty.value !== null;
  }

  /**
   * Remove the transport protein from the slot, and also clear the transport protein if one is present.
   */
  public clear(): void {
    if ( this.transportProteinProperty.value ) {
      this.transportProteinProperty.value.clear( this );
    }
    this.transportProteinProperty.value = null;
  }

  /**
   * Returns the model position of this slot. Slots have a horizontal position in the membrane, which is always
   * vertically at 0.
   *
   * This is a convenience function to get the position as a Vector2.
   */
  public getPositionVector(): Vector2 {
    return new Vector2( this.position, 0 );
  }
}

membraneTransport.register( 'Slot', Slot );