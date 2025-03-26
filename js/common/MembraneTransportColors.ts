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

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import membraneTransport from '../membraneTransport.js';

const MembraneTransportColors = {

  // Color for the outside/extracellular fluid, also serves as the background color for the screen.
  outsideCellColorProperty: new ProfileColorProperty( membraneTransport, 'outsideCellColor', {
    default: 'rgb(152,205,255)'
  } ),
  insideCellColorProperty: new ProfileColorProperty( membraneTransport, 'insideCellColor', {
    default: 'rgb(101,185,234)'
  } ),

  // Color for the outside/extracellular fluid, also serves as the background color for the screen.
  observationWindowOutsideCellColorProperty: new ProfileColorProperty( membraneTransport, 'observationWindowOutsideCellColor', {
    default: 'rgb(179, 218, 255)'
  } ),
  observationWindowInsideCellColorProperty: new ProfileColorProperty( membraneTransport, 'observationWindowInsideCellColor', {
    default: 'rgb(126, 189, 226)'
  } ),

  oxygenColorProperty: new ProfileColorProperty( membraneTransport, 'O2Color', {
    default: PhetColorScheme.RED_COLORBLIND.toCSS() // Same as ph-scale OxygenNode
  } ),
  phosphateColorProperty: new ProfileColorProperty( membraneTransport, 'phosphateColor', {
    default: 'rgb(123,104,238)'
  } ),
  carbonDioxideColorProperty: new ProfileColorProperty( membraneTransport, 'CO2BarChartColor', {
    default: 'rgb(95,80,69)'
  } ),
  sodiumIonColorProperty: new ProfileColorProperty( membraneTransport, 'NaBarChartColor', {
    default: 'rgb(255,255,11)'
  } ),
  potassiumIonColorProperty: new ProfileColorProperty( membraneTransport, 'KBarChartColor', {
    default: 'rgb(32,255,253)'
  } ),
  glucoseColorProperty: new ProfileColorProperty( membraneTransport, 'glucoseBarChartColor', {
    default: 'rgb(106,42,211)'
  } ),
  lipidTailColorProperty: new ProfileColorProperty( membraneTransport, 'lipidTailColor', {
    default: 'rgb(229,68,143)'
  } ),
  lipidHeadColorProperty: new ProfileColorProperty( membraneTransport, 'lipidHeadColor', {
    default: 'rgb(248,161,46)'
  } ),
  atpColorProperty: new ProfileColorProperty( membraneTransport, 'atpColorProperty', {
    default: 'rgb(59,147,74)'
  } ),
  phospholipidHeadColorProperty: new ProfileColorProperty( membraneTransport, 'phospholipidHeadColor', {
    default: 'rgb(220,120,39)'
  } ),
  phospholipidTailColorProperty: new ProfileColorProperty( membraneTransport, 'phospholipidTailColor', {
    default: 'rgb(234,144,255)'
  } ),
  ligandButtonColorProperty: new ProfileColorProperty( membraneTransport, 'ligandButtonColor', {
    default: 'rgb(224,200,88)'
  } )
};

membraneTransport.register( 'MembraneTransportColors', MembraneTransportColors );
export default MembraneTransportColors;