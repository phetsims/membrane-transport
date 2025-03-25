// Copyright 2025, University of Colorado Boulder

import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportStrings from '../MembraneTransportStrings.js';

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class FacilitatedDiffusionScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super( MembraneTransportStrings.screen.facilitatedDiffusionStringProperty, tandem, 'facilitatedDiffusion' );
  }
}

membraneTransport.register( 'FacilitatedDiffusionScreen', FacilitatedDiffusionScreen );