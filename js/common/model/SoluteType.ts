// Copyright 2025, University of Colorado Boulder
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';

/**
 * The types of solutes that can be selected or depicted in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const SoluteTypes = [ 'oxygen', 'carbonDioxide', 'sodiumIon', 'potassiumIon', 'glucose', 'atp', 'adp', 'phosphate' ] as const;
export const LigandTypes = [ 'ligandA', 'ligandB' ] as const;
export const ParticleTypes = [ ...SoluteTypes, ...LigandTypes ] as const;

type SoluteType = typeof SoluteTypes[number];
export default SoluteType;

export type PlottableSoluteTypes = Exclude<SoluteType, 'atp' | 'adp' | 'phosphate'>;

type LigandType = typeof LigandTypes[number];
type ParticleType = typeof ParticleTypes[number];

export type { LigandType, ParticleType };

export const getSoluteTypeString = ( soluteType: SoluteType ): LocalizedStringProperty =>

  soluteType === 'oxygen' ? MembraneTransportStrings.oxygenStringProperty :
  soluteType === 'carbonDioxide' ? MembraneTransportStrings.carbonDioxideStringProperty :
  soluteType === 'sodiumIon' ? MembraneTransportStrings.sodiumIonStringProperty :
  soluteType === 'potassiumIon' ? MembraneTransportStrings.potassiumIonStringProperty :
  soluteType === 'glucose' ? MembraneTransportStrings.glucoseStringProperty :
  MembraneTransportStrings.atpStringProperty;

export const getSoluteBarChartColorProperty = ( soluteType: PlottableSoluteTypes ): ProfileColorProperty =>
  soluteType === 'oxygen' ? MembraneTransportColors.oxygenColorProperty :
  soluteType === 'carbonDioxide' ? MembraneTransportColors.carbonDioxideColorProperty :
  soluteType === 'sodiumIon' ? MembraneTransportColors.sodiumIonColorProperty :
  soluteType === 'potassiumIon' ? MembraneTransportColors.potassiumIonColorProperty :
  MembraneTransportColors.glucoseColorProperty;

export const getSoluteBarChartTandemName = ( soluteType: PlottableSoluteTypes ): string =>
  `${soluteType}BarChart`;

export const soluteTypeToRadioButtonTandemName = ( soluteType: SoluteType ): string => `${soluteType}RadioButton`;

export const getSoluteSpinnerTandemName = ( soluteType: SoluteType ): string => `${soluteType}Spinner`;

export const getSoluteAccessibleName = ( soluteType: SoluteType ): string => {
  return soluteType === 'oxygen' ? 'Oxygen, O2, nonpolar, small' :
         soluteType === 'carbonDioxide' ? 'Carbon Dioxide, CO2, nonpolar, small' :
         soluteType === 'sodiumIon' ? 'Sodium Ion, Na, positive, small' :
         soluteType === 'potassiumIon' ? 'Potassium Ion, K, positive, small' :
         soluteType === 'glucose' ? 'Glucose, hexagonal ring, large' :
         'Adenosine Triphosphate, ATP, complex, large';
};