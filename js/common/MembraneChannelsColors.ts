// Copyright 2024-2025, University of Colorado Boulder

/**
 * Defines the colors for this sim.
 *
 * All simulations should have a Colors.js file, see https://github.com/phetsims/scenery-phet/issues/642.
 *
 * For static colors that are used in more than one place, add them here.
 *
 * For dynamic colors that can be controlled via colorProfileProperty.js, add instances of ProfileColorProperty here,
 * each of which is required to have a default color. Note that dynamic colors can be edited by running the sim from
 * phetmarks using the "Color Edit" mode.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { ProfileColorProperty } from '../../../scenery/js/imports.js';
import membraneChannels from '../membraneChannels.js';

const MembraneChannelsColors = {

  // Background color for screens in this sim
  screenBackgroundColorProperty: new ProfileColorProperty( membraneChannels, 'background', {
    default: 'white'
  } ),

  outsideCellColorProperty: new ProfileColorProperty( membraneChannels, 'outsideCellColor', {
    default: 'rgb(152,205,255)'
  } ),
  insideCellColorProperty: new ProfileColorProperty( membraneChannels, 'insideCellColor', {
    default: 'rgb(101,185,234)'
  } ),

  // TODO: Finalize names here
  O2BarChartColorProperty: new ProfileColorProperty( membraneChannels, 'O2BarChartColor', {
    default: 'rgb(250,0,6)'
  } ),
  CO2BarChartColorProperty: new ProfileColorProperty( membraneChannels, 'CO2BarChartColor', {
    default: 'rgb(95,80,69)'
  } ),
  NaBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'NaBarChartColor', {
    default: 'rgb(255,255,11)'
  } ),
  KBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'KBarChartColor', {
    default: 'rgb(32,255,253)'
  } ),
  glucoseBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'glucoseBarChartColor', {
    default: 'rgb(106,42,211)'
  } )
};

membraneChannels.register( 'MembraneChannelsColors', MembraneChannelsColors );
export default MembraneChannelsColors;