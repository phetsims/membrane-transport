// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Simple Diffusion screen in the Membrane Transport simulation. See MembraneTransportFeatureSet
 * for details about what features are available in this screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import simple_diffusion_home_icon_svg from '../../images/simple_diffusion_home_icon_svg.js';
import simple_diffusion_nav_icon_svg from '../../images/simple_diffusion_nav_icon_svg.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFluent from '../MembraneTransportFluent.js';

export default class SimpleDiffusionScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super(
      MembraneTransportFluent.screen.simpleDiffusionStringProperty,
      tandem,
      'simpleDiffusion',
      MembraneTransportFluent.a11y.simpleDiffusionScreen.screenButtonsHelpTextStringProperty,
      new ScreenIcon( new Image( simple_diffusion_home_icon_svg ) ),
      new ScreenIcon( new Image( simple_diffusion_nav_icon_svg ) )
    );
  }

}

membraneTransport.register( 'SimpleDiffusionScreen', SimpleDiffusionScreen );