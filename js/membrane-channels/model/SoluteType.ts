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
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const SoluteTypes = [ 'O2', 'CO2', 'Na+', 'K+', 'glucose', 'atp' ] as const;

type SoluteType = typeof SoluteTypes[number];
export default SoluteType;

export const getSoluteTypeString = ( soluteType: SoluteType ): LocalizedStringProperty =>
  soluteType === 'O2' ? MembraneChannelsStrings.O2StringProperty :
  soluteType === 'CO2' ? MembraneChannelsStrings.CO2StringProperty :
  soluteType === 'Na+' ? MembraneChannelsStrings.NaStringProperty :
  soluteType === 'K+' ? MembraneChannelsStrings.KStringProperty :
  soluteType === 'glucose' ? MembraneChannelsStrings.glucoseStringProperty :
  MembraneChannelsStrings.atpStringProperty;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error StictOmit doesn't work here for unknown reasons TODO
export const getSoluteBarChartColorProperty = ( soluteType: StrictOmit<SoluteType, 'atp'> ): ProfileColorProperty =>
  soluteType === 'O2' ? MembraneChannelsColors.O2BarChartColorProperty :
  soluteType === 'CO2' ? MembraneChannelsColors.CO2BarChartColorProperty :
  soluteType === 'Na+' ? MembraneChannelsColors.NaBarChartColorProperty :
  soluteType === 'K+' ? MembraneChannelsColors.KBarChartColorProperty :
  MembraneChannelsColors.glucoseBarChartColorProperty;