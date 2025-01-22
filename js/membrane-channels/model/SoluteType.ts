// Copyright 2025, University of Colorado Boulder
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { ProfileColorProperty } from '../../../../scenery/js/imports.js';
import MembraneChannelsColors from '../../common/MembraneChannelsColors.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';

/**
 * The types of solutes that can be selected or depicted in the simulation.
 * TODO: Sensible names for PhET-iO?
 * TODO: Casing?
 * TODO: Visit the string file and finalize key names
 * TODO: Probably don't have "+" in the name
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const SoluteTypes = [ 'oxygenMolecule', 'carbonDioxide', 'sodiumIon', 'potassiumIon', 'glucose', 'atp' ] as const;

type SoluteType = typeof SoluteTypes[number];
export default SoluteType;

export const getSoluteTypeString = ( soluteType: SoluteType ): LocalizedStringProperty =>
  soluteType === 'oxygenMolecule' ? MembraneChannelsStrings.O2StringProperty :
  soluteType === 'carbonDioxide' ? MembraneChannelsStrings.CO2StringProperty :
  soluteType === 'sodiumIon' ? MembraneChannelsStrings.NaStringProperty :
  soluteType === 'potassiumIon' ? MembraneChannelsStrings.KStringProperty :
  soluteType === 'glucose' ? MembraneChannelsStrings.glucoseStringProperty :
  MembraneChannelsStrings.atpStringProperty;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error StictOmit doesn't work here for unknown reasons TODO
export const getSoluteBarChartColorProperty = ( soluteType: StrictOmit<SoluteType, 'atp'> ): ProfileColorProperty =>
  soluteType === 'oxygenMolecule' ? MembraneChannelsColors.O2BarChartColorProperty :
  soluteType === 'carbonDioxide' ? MembraneChannelsColors.CO2BarChartColorProperty :
  soluteType === 'sodiumIon' ? MembraneChannelsColors.NaBarChartColorProperty :
  soluteType === 'potassiumIon' ? MembraneChannelsColors.KBarChartColorProperty :
  MembraneChannelsColors.glucoseBarChartColorProperty;