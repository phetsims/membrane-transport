// Copyright 2025, University of Colorado Boulder

/**
 * Screen that shows the active transport of solutes across the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Tandem from '../../../tandem/js/Tandem.js';
import active_transport_home_icon_svg from '../../images/active_transport_home_icon_svg.js';
import active_transport_nav_icon_svg from '../../images/active_transport_nav_icon_svg.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFluent from '../MembraneTransportFluent.js';

export default class ActiveTransportScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super(
      MembraneTransportFluent.screen.activeTransportStringProperty,
      tandem,
      'activeTransport',
      MembraneTransportFluent.a11y.activeTransportScreen.screenButtonsHelpTextStringProperty,
      active_transport_home_icon_svg,
      active_transport_nav_icon_svg
    );
  }
}

membraneTransport.register( 'ActiveTransportScreen', ActiveTransportScreen );