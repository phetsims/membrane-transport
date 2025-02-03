// Copyright 2024, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import ActiveTransportScreen from './active-transport/ActiveTransportScreen.js';
import FacilitatedDiffusionScreen from './facilitated-diffusion/FacilitatedDiffusionScreen.js';
import MembraneChannelsStrings from './MembraneChannelsStrings.js';
import './common/MembraneChannelsQueryParameters.js';
import PlaygroundScreen from './playground/PlaygroundScreen.js';
import SimpleDiffusionScreen from './simple-diffusion/SimpleDiffusionScreen.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  const titleStringProperty = MembraneChannelsStrings[ 'membrane-channels' ].titleStringProperty;

  const screens = [
    new SimpleDiffusionScreen( Tandem.ROOT.createTandem( 'simpleDiffusionScreen' ) ),
    new FacilitatedDiffusionScreen( Tandem.ROOT.createTandem( 'facilitatedDiffusionScreen' ) ),
    new ActiveTransportScreen( Tandem.ROOT.createTandem( 'activeTransportScreen' ) ),
    new PlaygroundScreen( Tandem.ROOT.createTandem( 'playgroundScreen' ) )
  ];

  const options: SimOptions = {

    credits: {
      leadDesign: 'Brett Fiedler',
      softwareDevelopment: 'Jesse Greenberg, Sam Reid',
      team: 'Holly Basta, Mike Klymkowsky, Mark Nielsen, Kathy Perkins, Amy Rouinfar, Taliesin Smith',
      contributors: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );