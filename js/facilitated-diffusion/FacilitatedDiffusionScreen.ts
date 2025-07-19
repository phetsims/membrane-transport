// Copyright 2025, University of Colorado Boulder

/**
 * Class for the Facilitated Diffusion screen in the Membrane Transport simulation. See MembraneTransportFeatureSet
 * for details about what features are available in this screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import facilitated_diffusion_home_icon_svg from '../../images/facilitated_diffusion_home_icon_svg.js';
import facilitated_diffusion_nav_icon_svg from '../../images/facilitated_diffusion_nav_icon_svg.js';
import MembraneTransportScreen from '../common/MembraneTransportScreen.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFluent from '../MembraneTransportFluent.js';

export default class FacilitatedDiffusionScreen extends MembraneTransportScreen {

  public constructor( tandem: Tandem ) {
    super(
      MembraneTransportFluent.screen.facilitatedDiffusionStringProperty,
      tandem,
      'facilitatedDiffusion',
      MembraneTransportFluent.a11y.facilitatedDiffusionScreen.screenButtonsHelpTextStringProperty,
      new ScreenIcon( new Image( facilitated_diffusion_home_icon_svg ) ),
      new ScreenIcon( new Image( facilitated_diffusion_nav_icon_svg ) )
    );
  }
}

membraneTransport.register( 'FacilitatedDiffusionScreen', FacilitatedDiffusionScreen );