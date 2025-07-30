// Copyright 2025, University of Colorado Boulder

/**
 * The types of solutes that can be selected or depicted in the simulation.
 *
 * Solute types are modeled as strings to simplify PhET-iO serialization. As strings, we can easily
 * iterate over values without instantiating solutes. It also lets us declare types with
 * closely related behavior without writing a new class for each type.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ProfileColorProperty from '../../../../scenery/js/util/ProfileColorProperty.js';
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';

export const SoluteTypeValues = [ 'oxygen', 'carbonDioxide', 'sodiumIon', 'potassiumIon', 'glucose', 'atp', 'adp', 'phosphate' ] as const;
export const LigandTypeValues = [ 'triangleLigand', 'starLigand' ] as const;
export const ParticleTypeValues = [ ...SoluteTypeValues, ...LigandTypeValues ] as const;

type SoluteType = typeof SoluteTypeValues[number];
export default SoluteType;

export type PlottableSoluteType = Exclude<SoluteType, 'atp' | 'adp' | 'phosphate'>;
export type SoluteControlSolute = 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp';

type LigandType = typeof LigandTypeValues[number];
type ParticleType = typeof ParticleTypeValues[number];

export type { LigandType, ParticleType };

export const getSoluteTypeString = ( soluteType: SoluteType ): TReadOnlyProperty<string> =>

  soluteType === 'oxygen' ? MembraneTransportFluent.soluteNames.oxygenStringProperty :
  soluteType === 'carbonDioxide' ? MembraneTransportFluent.soluteNames.carbonDioxideStringProperty :
  soluteType === 'sodiumIon' ? MembraneTransportFluent.soluteNames.sodiumIonStringProperty :
  soluteType === 'potassiumIon' ? MembraneTransportFluent.soluteNames.potassiumIonStringProperty :
  soluteType === 'glucose' ? MembraneTransportFluent.soluteNames.glucoseStringProperty :
  MembraneTransportFluent.soluteNames.atpStringProperty;

export const getSoluteBarChartColorProperty = ( soluteType: PlottableSoluteType ): ProfileColorProperty =>
  soluteType === 'oxygen' ? MembraneTransportColors.oxygenColorProperty :
  soluteType === 'carbonDioxide' ? MembraneTransportColors.carbonDioxideColorProperty :
  soluteType === 'sodiumIon' ? MembraneTransportColors.sodiumIonColorProperty :
  soluteType === 'potassiumIon' ? MembraneTransportColors.potassiumIonColorProperty :
  MembraneTransportColors.glucoseColorProperty;

export const getSoluteBarChartTandemName = ( soluteType: PlottableSoluteType ): string =>
  `${soluteType}BarChart`;

export const soluteTypeToRadioButtonTandemName = ( soluteType: SoluteType ): string => `${soluteType}RadioButton`;

export const getSoluteSpinnerTandemName = ( soluteType: SoluteType ): string => `${soluteType}Spinner`;

export const getSoluteAccessibleName = ( soluteType: SoluteType ): TReadOnlyProperty<string> => {
  return soluteType === 'oxygen' ? MembraneTransportFluent.a11y.solutesPanel.oxygenRadioButtonStringProperty :
         soluteType === 'carbonDioxide' ? MembraneTransportFluent.a11y.solutesPanel.carbonDioxideRadioButtonStringProperty :
         soluteType === 'sodiumIon' ? MembraneTransportFluent.a11y.solutesPanel.sodiumIonRadioButtonStringProperty :
         soluteType === 'potassiumIon' ? MembraneTransportFluent.a11y.solutesPanel.potassiumIonRadioButtonStringProperty :
         soluteType === 'glucose' ? MembraneTransportFluent.a11y.solutesPanel.glucoseRadioButtonStringProperty :
         MembraneTransportFluent.a11y.solutesPanel.atpRadioButtonStringProperty;
};