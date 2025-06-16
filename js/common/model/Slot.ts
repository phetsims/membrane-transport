// Copyright 2025, University of Colorado Boulder

/**
 * Model representation for a Slot, which can hold a membrane transport protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import membraneTransport from '../../membraneTransport.js';
import createTransportProtein from './proteins/createTransportProtein.js';
import TransportProtein from './proteins/TransportProtein.js';
import TransportProteinModelContext from './proteins/TransportProteinModelContext.js';
import TransportProteinType from './proteins/TransportProteinType.js';

export default class Slot {

  // The type of transport protein that is currently in this slot.
  public readonly transportProteinProperty: Property<null | TransportProtein>;
  private readonly transportProteinTypeProperty: DerivedProperty<TransportProteinType | null, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny, IntentionalAny>;

  public constructor( private readonly model: TransportProteinModelContext, public readonly position: number, tandem: Tandem ) {

    this.transportProteinProperty = new Property<null | TransportProtein>( null );

    // Just for PhET-iO, indicate what kind of protein is in the slot, if any.
    this.transportProteinTypeProperty = new DerivedProperty( [ this.transportProteinProperty ], transportProtein => {
      return transportProtein ? transportProtein.type : null;
    }, {
      tandem: tandem.createTandem( 'transportProteinTypeProperty' ),
      phetioValueType: NullableIO( StringIO ),
      phetioFeatured: true,
      phetioDocumentation: 'The type of transport protein in this slot, or null if the slot is empty.'
    } );

    this.transportProteinProperty.lazyLink( ( transportProtein, oldTransportProtein ) => {

      // We must releaseParticle given a slot, since the slot is already disassociated from the transport protein.
      // However, we also do not want to add arguments to dispose, so we do this in two steps.
      oldTransportProtein && oldTransportProtein.releaseParticles( this );
      oldTransportProtein && oldTransportProtein.dispose();
    } );
  }

  public getIndex(): number {
    return this.model.membraneSlots.indexOf( this );
  }

  public reset(): void {
    this.transportProteinProperty.reset();
  }

  public get transportProteinType(): TransportProteinType | null {
    return this.transportProteinProperty.value ? this.transportProteinProperty.value.type : null;
  }

  public set transportProteinType( transportProteinType: TransportProteinType | null ) {
    this.transportProteinProperty.value = transportProteinType ? createTransportProtein( this.model, transportProteinType, this.position ) : null;
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
   * This is a convenience function to get the position as a Vector2.
   */
  public getPositionVector(): Vector2 {
    return new Vector2( this.position, 0 );
  }
}

membraneTransport.register( 'Slot', Slot );