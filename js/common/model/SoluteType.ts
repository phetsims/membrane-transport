// Copyright 2025, University of Colorado Boulder
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import MembraneChannelsColors from '../../common/MembraneChannelsColors.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';

/**
 * The types of solutes that can be selected or depicted in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const SoluteTypes = [ 'oxygen', 'carbonDioxide', 'sodiumIon', 'potassiumIon', 'glucose', 'atp' ] as const;
export const LigandTypes = [ 'ligandA', 'ligandB' ] as const;
export const ParticleTypes = [ ...SoluteTypes, ...LigandTypes ] as const;

export type PlottableSoluteTypes = Exclude<SoluteType, 'atp'>;

type SoluteType = typeof SoluteTypes[number];
export default SoluteType;

type LigandType = typeof LigandTypes[number];
type ParticleType = typeof ParticleTypes[number];

export type { LigandType, ParticleType };

export const getSoluteTypeString = ( soluteType: SoluteType ): LocalizedStringProperty =>

  soluteType === 'oxygen' ? MembraneChannelsStrings.oxygenStringProperty :
  soluteType === 'carbonDioxide' ? MembraneChannelsStrings.carbonDioxideStringProperty :
  soluteType === 'sodiumIon' ? MembraneChannelsStrings.sodiumIonStringProperty :
  soluteType === 'potassiumIon' ? MembraneChannelsStrings.potassiumIonStringProperty :
  soluteType === 'glucose' ? MembraneChannelsStrings.glucoseStringProperty :
  MembraneChannelsStrings.atpStringProperty;

export const getSoluteBarChartColorProperty = ( soluteType: PlottableSoluteTypes ): ProfileColorProperty =>
  soluteType === 'oxygen' ? MembraneChannelsColors.oxygenColorProperty :
  soluteType === 'carbonDioxide' ? MembraneChannelsColors.carbonDioxideColorProperty :
  soluteType === 'sodiumIon' ? MembraneChannelsColors.sodiumIonColorProperty :
  soluteType === 'potassiumIon' ? MembraneChannelsColors.potassiumIonColorProperty :
  MembraneChannelsColors.glucoseColorProperty;

// TODO: Oxygen in o2 should be same size as oxygen in co2.
export const getParticleModelWidth = ( particleType: ParticleType ): number =>
  particleType === 'oxygen' ? 3 :
  particleType === 'carbonDioxide' ? 5 :
  particleType === 'sodiumIon' ? 4 :
  particleType === 'potassiumIon' ? 6 :
  particleType === 'glucose' ? 10 :
  particleType === 'ligandA' ? 10 :
  particleType === 'ligandB' ? 10 :
  10;

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

export const isSolute = ( particleType: ParticleType ): particleType is SoluteType => SoluteTypes.includes( particleType as SoluteType );
export const isLigand = ( particleType: ParticleType ): particleType is LigandType => LigandTypes.includes( particleType as LigandType );