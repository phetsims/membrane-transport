// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Simple Diffusion screen in the Membrane Transport simulation. See MembraneTransportFeatureSet
 * for details about what features are available in this screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFluent from '../MembraneTransportFluent.js';

export default class SimpleDiffusionScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super( MembraneTransportFluent.screen.simpleDiffusionStringProperty, tandem, 'simpleDiffusion' );
  }

}

membraneTransport.register( 'SimpleDiffusionScreen', SimpleDiffusionScreen );