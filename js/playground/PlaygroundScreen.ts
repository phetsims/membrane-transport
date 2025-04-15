// Copyright 2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportStrings from '../MembraneTransportStrings.js';

export default class PlaygroundScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super( MembraneTransportStrings.screen.playgroundStringProperty, tandem, 'playground' );
  }

}

membraneTransport.register( 'PlaygroundScreen', PlaygroundScreen );