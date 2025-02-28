// Copyright 2025, University of Colorado Boulder

import { ChannelType } from '../../model/MembraneChannelsModel.js';

/**
 * Returns the Node for the given ChannelType
 *
 * TODO: i18n once design is finalized.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default function( type: ChannelType ): string {
  return type === 'sodiumIonVoltageGatedChannel' ? 'Sodium Ion, Voltage Gated' :
         type === 'potassiumIonLeakageChannel' ? 'Potassium Ion, Leakage' :
         type === 'sodiumIonLeakageChannel' ? 'Sodium Ion, Leakage' :
         type === 'sodiumIonLigandGatedChannel' ? 'Sodium Ion, Ligand Gated' :
         type === 'potassiumIonLigandGatedChannel' ? 'Potassium Ion, Ligand Gated' :
         type === 'sodiumIonActiveGatedChannel' ? 'Sodium Potassium Pump' :

           // TODO: This should be glucoseSodiumCoTransporter
         type === 'potassiumIonActiveGatedChannel' ? 'Potassium Ion, Active Gated' :
           // final fallback -> throw
         ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
}