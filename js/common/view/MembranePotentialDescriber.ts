// Copyright 2025, University of Colorado Boulder

/**
 * Description for when the membrane potential changes, specifically for voltage-gated channels.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import PotassiumVoltageGatedChannel from '../model/proteins/PotassiumVoltageGatedChannel.js';
import SodiumVoltageGatedChannel from '../model/proteins/SodiumVoltageGatedChannel.js';

export default class MembranePotentialDescriber {

  /**
   * Creates a description string Property that describes the state of the membrane due to a change in membrane potential.
   * Description content depends on the presence and state of sodium and potassium voltage-gated channels.
   *
   * To dispose, dispose of the returned Property.
   */
  public static createDescriptionStringProperty( model: MembraneTransportModel ): Property<string | null> {
    const descriptionStringProperty = new Property<string | null>( null );

    // This listener will be unlinked when the descriptionStringProperty is disposed through the disposer option.
    model.membranePotentialProperty.lazyLink( ( membranePotential, oldMembranePotential ) => {
      const filledSlots = model.getFilledSlots();
      const sodiumVoltageGatedChannels = filledSlots.filter( slot => slot.transportProteinType === 'sodiumIonVoltageGatedChannel' );
      const potassiumVoltageGatedChannels = filledSlots.filter( slot => slot.transportProteinType === 'potassiumIonVoltageGatedChannel' );

      const hasSodium = sodiumVoltageGatedChannels.length > 0;
      const hasPotassium = potassiumVoltageGatedChannels.length > 0;

      let response: string | null = null;

      if ( hasSodium && hasPotassium ) {
        // Both sodium and potassium channels present
        const sodiumTransportProtein = sodiumVoltageGatedChannels[ 0 ].transportProteinProperty.value as SodiumVoltageGatedChannel;
        const sodiumOldState = sodiumTransportProtein.getStateForVoltage( oldMembranePotential );
        const sodiumNewState = sodiumTransportProtein.getStateForVoltage( membranePotential );
        const sodiumWasOpen = sodiumTransportProtein.isStateOpen( sodiumOldState );
        const sodiumIsOpen = sodiumTransportProtein.isStateOpen( sodiumNewState );

        const potassiumTransportProtein = potassiumVoltageGatedChannels[ 0 ].transportProteinProperty.value as PotassiumVoltageGatedChannel;
        const potassiumOldState = potassiumTransportProtein.getStateForVoltage( oldMembranePotential );
        const potassiumNewState = potassiumTransportProtein.getStateForVoltage( membranePotential );
        const potassiumWasOpen = potassiumTransportProtein.isStateOpen( potassiumOldState );
        const potassiumIsOpen = potassiumTransportProtein.isStateOpen( potassiumNewState );

        const sodiumChanged = sodiumWasOpen !== sodiumIsOpen;
        const potassiumChanged = potassiumWasOpen !== potassiumIsOpen;

        if ( sodiumChanged && potassiumChanged ) {
          // Both channels changed state
          if ( sodiumIsOpen && potassiumIsOpen ) {
            response = MembraneTransportFluent.a11y.membranePotential.sodiumOpenedPotassiumOpenedResponseStringProperty.value;
          }
          else if ( sodiumIsOpen && !potassiumIsOpen ) {
            response = MembraneTransportFluent.a11y.membranePotential.sodiumOpenedPotassiumClosedResponseStringProperty.value;
          }
          else if ( !sodiumIsOpen && potassiumIsOpen ) {
            response = MembraneTransportFluent.a11y.membranePotential.sodiumClosedPotassiumOpenedResponseStringProperty.value;
          }
          else {
            response = MembraneTransportFluent.a11y.membranePotential.sodiumClosedPotassiumClosedResponseStringProperty.value;
          }
        }
        else if ( sodiumChanged ) {
          // Only sodium changed
          response = sodiumIsOpen ?
                     MembraneTransportFluent.a11y.membranePotential.sodiumVoltageGatedOpenedResponseStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotential.sodiumVoltageGatedClosedResponseStringProperty.value;
        }
        else if ( potassiumChanged ) {
          // Only potassium changed
          response = potassiumIsOpen ?
                     MembraneTransportFluent.a11y.membranePotential.potassiumVoltageGatedOpenedResponseStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotential.potassiumVoltageGatedClosedResponseStringProperty.value;
        }
        // If neither changed, response remains null
      }
      else if ( hasSodium ) {
        // Only sodium channels present
        const sodiumTransportProtein = sodiumVoltageGatedChannels[ 0 ].transportProteinProperty.value as SodiumVoltageGatedChannel;
        const sodiumOldState = sodiumTransportProtein.getStateForVoltage( oldMembranePotential );
        const sodiumNewState = sodiumTransportProtein.getStateForVoltage( membranePotential );
        const sodiumWasOpen = sodiumTransportProtein.isStateOpen( sodiumOldState );
        const sodiumIsOpen = sodiumTransportProtein.isStateOpen( sodiumNewState );

        if ( sodiumWasOpen !== sodiumIsOpen ) {
          response = sodiumIsOpen ?
                     MembraneTransportFluent.a11y.membranePotential.sodiumVoltageGatedOpenedResponseStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotential.sodiumVoltageGatedClosedResponseStringProperty.value;
        }
      }
      else if ( hasPotassium ) {
        // Only potassium channels present
        const potassiumTransportProtein = potassiumVoltageGatedChannels[ 0 ].transportProteinProperty.value as PotassiumVoltageGatedChannel;
        const potassiumOldState = potassiumTransportProtein.getStateForVoltage( oldMembranePotential );
        const potassiumNewState = potassiumTransportProtein.getStateForVoltage( membranePotential );
        const potassiumWasOpen = potassiumTransportProtein.isStateOpen( potassiumOldState );
        const potassiumIsOpen = potassiumTransportProtein.isStateOpen( potassiumNewState );

        if ( potassiumWasOpen !== potassiumIsOpen ) {
          response = potassiumIsOpen ?
                     MembraneTransportFluent.a11y.membranePotential.potassiumVoltageGatedOpenedResponseStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotential.potassiumVoltageGatedClosedResponseStringProperty.value;
        }
      }
      else {
        // No voltage-gated channels present
        response = MembraneTransportFluent.a11y.membranePotential.noChangeResponseStringProperty.value;
      }

      descriptionStringProperty.value = response;
    }, { disposer: descriptionStringProperty } );

    return descriptionStringProperty;
  }
}

membraneTransport.register( 'MembranePotentialDescriber', MembranePotentialDescriber );