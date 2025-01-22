// Copyright 2025, University of Colorado Boulder
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import MembraneChannelsColors from '../../common/MembraneChannelsColors.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';

/**
 * The types of solutes that can be selected or depicted in the simulation.
 * TODO: Sensible names for PhET-iO?
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const SoluteTypes = [ 'oxygenMolecule', 'carbonDioxide', 'sodiumIon', 'potassiumIon', 'glucose', 'atp' ] as const;

export type PlottableSoluteTypes = Exclude<SoluteType, 'atp'>;

type SoluteType = typeof SoluteTypes[number];
export default SoluteType;

export const getSoluteTypeString = ( soluteType: SoluteType ): LocalizedStringProperty =>

  soluteType === 'oxygenMolecule' ? MembraneChannelsStrings.oxygenMoleculeStringProperty :
  soluteType === 'carbonDioxide' ? MembraneChannelsStrings.carbonDioxideStringProperty :
  soluteType === 'sodiumIon' ? MembraneChannelsStrings.sodiumIonStringProperty :
  soluteType === 'potassiumIon' ? MembraneChannelsStrings.potassiumIonStringProperty :
  soluteType === 'glucose' ? MembraneChannelsStrings.glucoseStringProperty :
  MembraneChannelsStrings.atpStringProperty;

export const getSoluteBarChartColorProperty = ( soluteType: PlottableSoluteTypes ): ProfileColorProperty =>
  soluteType === 'oxygenMolecule' ? MembraneChannelsColors.oxygenMoleculeBarChartColorProperty :
  soluteType === 'carbonDioxide' ? MembraneChannelsColors.carbonDioxideBarChartColorProperty :
  soluteType === 'sodiumIon' ? MembraneChannelsColors.sodiumIonBarChartColorProperty :
  soluteType === 'potassiumIon' ? MembraneChannelsColors.potassiumIonBarChartColorProperty :
  MembraneChannelsColors.glucoseBarChartColorProperty;

export const getSoluteBarChartTandemName = ( soluteType: PlottableSoluteTypes ): string =>
  `${soluteType}BarChart`;