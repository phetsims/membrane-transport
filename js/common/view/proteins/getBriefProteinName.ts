// Copyright 2025, University of Colorado Boulder

import ChannelType from '../../model/proteins/ChannelType.js';

/**
 * Get the brief name for a ChannelType
 * TODO (JG): This may move into fluent during i18n.
 * TODO (JG): i18n once design is finalized.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function( type: ChannelType ): string {
  return type === 'sodiumIonLeakageChannel' ? 'Sodium Ion, Leakage' :
         type === 'potassiumIonLeakageChannel' ? 'Potassium Ion, Leakage' :

         type === 'sodiumIonVoltageGatedChannel' ? 'Sodium Ion, Voltage-Gated' :
         type === 'potassiumIonVoltageGatedChannel' ? 'Potassium Ion, Ligand-Gated' :

         type === 'sodiumIonLigandGatedChannel' ? 'Sodium Ion, Ligand-Gated' :
         type === 'potassiumIonLigandGatedChannel' ? 'Potassium Ion, Ligand-Gated' :

         type === 'sodiumPotassiumPump' ? 'Sodium Potassium Pump' :
         type === 'sodiumGlucoseCotransporter' ? 'Sodium-Glucose Cotransporter' :
           // final fallback -> throw
         ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
}