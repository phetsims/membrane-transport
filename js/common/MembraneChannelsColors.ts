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

  // Color for the outside/extracellular fluid, also serves as the background color for the screen.
  outsideCellColorProperty: new ProfileColorProperty( membraneChannels, 'outsideCellColor', {
    default: 'rgb(152,205,255)'
  } ),
  insideCellColorProperty: new ProfileColorProperty( membraneChannels, 'insideCellColor', {
    default: 'rgb(101,185,234)'
  } ),

  oxygenBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'O2BarChartColor', {
    default: 'rgb(250,0,6)'
  } ),
  carbonDioxideBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'CO2BarChartColor', {
    default: 'rgb(95,80,69)'
  } ),
  sodiumIonBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'NaBarChartColor', {
    default: 'rgb(255,255,11)'
  } ),
  potassiumIonBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'KBarChartColor', {
    default: 'rgb(32,255,253)'
  } ),
  glucoseBarChartColorProperty: new ProfileColorProperty( membraneChannels, 'glucoseBarChartColor', {
    default: 'rgb(106,42,211)'
  } ),

  lipidTailColorProperty: new ProfileColorProperty( membraneChannels, 'lipidTailColor', {
    default: 'rgb(229,68,143)'
  } ),
  lipidHeadColorProperty: new ProfileColorProperty( membraneChannels, 'lipidHeadColor', {
    default: 'rgb(248,161,46)'
  } )
};

membraneChannels.register( 'MembraneChannelsColors', MembraneChannelsColors );
export default MembraneChannelsColors;