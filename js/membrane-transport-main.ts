// Copyright 2024-2025, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import showFluentTable from '../../chipper/js/browser/showFluentTable.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import ActiveTransportScreen from './active-transport/ActiveTransportScreen.js';
import MembraneTransportPreferencesNode from './common/view/MembraneTransportPreferencesNode.js';
import MembraneTransportSoundPreferencesNode from './common/view/MembraneTransportSoundPreferencesNode.js';
import FacilitatedDiffusionScreen from './facilitated-diffusion/FacilitatedDiffusionScreen.js';
import MembraneTransportFluent from './MembraneTransportFluent.js';
import './common/MembraneTransportQueryParameters.js';
import PlaygroundScreen from './playground/PlaygroundScreen.js';
import SimpleDiffusionScreen from './simple-diffusion/SimpleDiffusionScreen.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  if ( phet.chipper.queryParameters.fluentTable !== 'none' ) {
    showFluentTable( MembraneTransportFluent, phet.chipper.queryParameters.fluentTable );
    return;
  }

  const titleStringProperty = MembraneTransportFluent[ 'membrane-transport' ].titleStringProperty;

  const screens = [
    new SimpleDiffusionScreen( Tandem.ROOT.createTandem( 'simpleDiffusionScreen' ) ),
    new FacilitatedDiffusionScreen( Tandem.ROOT.createTandem( 'facilitatedDiffusionScreen' ) ),
    new ActiveTransportScreen( Tandem.ROOT.createTandem( 'activeTransportScreen' ) ),
    new PlaygroundScreen( Tandem.ROOT.createTandem( 'playgroundScreen' ) )
  ];

  const options: SimOptions = {

    credits: {
      leadDesign: 'Brett Fiedler, Taliesin Smith',
      softwareDevelopment: 'Jesse Greenberg, Sam Reid',
      team: 'Holly Basta, Mike Klymkowsky, Mark Nielsen, Kathy Perkins, Amy Rouinfar, Nancy Salpepi',
      contributors: '',
      qualityAssurance: 'Matthew Moore, Nancy Salpepi, Valentina P\u00e9rez, Kathryn Woessner',
      graphicArts: 'Brett Fiedler',
      soundDesign: 'Ashton Morris, Emily Moore',
      thanks: 'HHMI BioInteractive for supporting the design and development of this simulation.'
    },

    preferencesModel: new PreferencesModel( {
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new MembraneTransportPreferencesNode( tandem )
        } ]
      },
      audioOptions: {
        customPreferences: [ {
          createContent: tandem => new MembraneTransportSoundPreferencesNode( tandem ),
          column: 'right'
        } ]
      }
    } )
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );