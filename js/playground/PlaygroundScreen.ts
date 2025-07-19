// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Playground screen in the Membrane Transport simulation. See MembraneTransportFeatureSet
 * for details about what features are available in this screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import playground_home_icon_svg from '../../images/playground_home_icon_svg.js';
import playground_nav_icon_svg from '../../images/playground_nav_icon_svg.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFluent from '../MembraneTransportFluent.js';

export default class PlaygroundScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super(
      MembraneTransportFluent.screen.playgroundStringProperty,
      tandem,
      'playground',
      MembraneTransportFluent.a11y.playgroundScreen.screenButtonsHelpTextStringProperty,
      new ScreenIcon( new Image( playground_home_icon_svg ) ),
      new ScreenIcon( new Image( playground_nav_icon_svg ) )
    );
  }
}

membraneTransport.register( 'PlaygroundScreen', PlaygroundScreen );