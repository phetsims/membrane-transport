// Copyright 2025, University of Colorado Boulder

import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportStrings from '../MembraneTransportStrings.js';

/**
 * Screen that shows the active transport of solutes across the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ActiveTransportScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super( MembraneTransportStrings.screen.activeTransportStringProperty, tandem, 'activeTransport' );
  }
}

membraneTransport.register( 'ActiveTransportScreen', ActiveTransportScreen );