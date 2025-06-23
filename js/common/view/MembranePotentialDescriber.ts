// Copyright 2025, University of Colorado Boulder

/**
 * Description for when the membrane potential changes, specifically for voltage-gated channels.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import PotassiumVoltageGatedChannel from '../model/proteins/PotassiumVoltageGatedChannel.js';
import SodiumVoltageGatedChannel from '../model/proteins/SodiumVoltageGatedChannel.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';

export default class MembranePotentialDescriber {
  public static createListener(
    model: MembraneTransportModel,
    view: MembraneTransportScreenView
  ): ( membranePotential: ( -70 ) | -50 | 30, oldMembranePotential: ( -70 ) | -50 | 30 ) => void {

    return ( membranePotential: ( -70 ) | -50 | 30, oldMembranePotential: ( -70 ) | -50 | 30 ): void => {
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
            response = MembraneTransportFluent.a11y.membranePotentialChanges.sodiumOpenedPotassiumOpenedStringProperty.value;
          }
          else if ( sodiumIsOpen && !potassiumIsOpen ) {
            response = MembraneTransportFluent.a11y.membranePotentialChanges.sodiumOpenedPotassiumClosedStringProperty.value;
          }
          else if ( !sodiumIsOpen && potassiumIsOpen ) {
            response = MembraneTransportFluent.a11y.membranePotentialChanges.sodiumClosedPotassiumOpenedStringProperty.value;
          }
          else {
            response = MembraneTransportFluent.a11y.membranePotentialChanges.sodiumClosedPotassiumClosedStringProperty.value;
          }
        }
        else if ( sodiumChanged ) {
          // Only sodium changed
          response = sodiumIsOpen ?
                     MembraneTransportFluent.a11y.membranePotentialChanges.sodiumVoltageGatedOpenedStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotentialChanges.sodiumVoltageGatedClosedStringProperty.value;
        }
        else if ( potassiumChanged ) {
          // Only potassium changed
          response = potassiumIsOpen ?
                     MembraneTransportFluent.a11y.membranePotentialChanges.potassiumVoltageGatedOpenedStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotentialChanges.potassiumVoltageGatedClosedStringProperty.value;
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
                     MembraneTransportFluent.a11y.membranePotentialChanges.sodiumVoltageGatedOpenedStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotentialChanges.sodiumVoltageGatedClosedStringProperty.value;
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
                     MembraneTransportFluent.a11y.membranePotentialChanges.potassiumVoltageGatedOpenedStringProperty.value :
                     MembraneTransportFluent.a11y.membranePotentialChanges.potassiumVoltageGatedClosedStringProperty.value;
        }
      }
      else {
        // No voltage-gated channels present
        response = MembraneTransportFluent.a11y.membranePotentialChanges.noChangeStringProperty.value;
      }

      // Only announce if there was actually a change
      if ( response ) {
        view.addAccessibleResponse( response );
      }
    };
  }
}

membraneTransport.register( 'MembranePotentialDescriber', MembranePotentialDescriber );