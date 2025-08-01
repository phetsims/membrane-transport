// Copyright 2024-2025, University of Colorado Boulder

/**
 * Base class for any of the screens in the Membrane Transport simulation.  This class is responsible for creating the model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import ReadOnlyProperty from '../../../axon/js/ReadOnlyProperty.js';
import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportColors from '../common/MembraneTransportColors.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFeatureSet from './MembraneTransportFeatureSet.js';
import MembraneTransportModel from './model/MembraneTransportModel.js';
import MembraneTransportKeyboardHelpNode from './view/MembraneTransportKeyboardHelpNode.js';
import MembraneTransportScreenView from './view/MembraneTransportScreenView.js';

export default class MembraneTransportScreen extends Screen<MembraneTransportModel, MembraneTransportScreenView> {

  public constructor( nameProperty: ReadOnlyProperty<string>,
                      tandem: Tandem,
                      featureSet: MembraneTransportFeatureSet,
                      screenButtonHelpTextProperty: TReadOnlyProperty<string>,
                      homeScreenIcon: HTMLImageElement,
                      navigationBarIcon: HTMLImageElement ) {

    super(
      () => new MembraneTransportModel( featureSet, { tandem: tandem.createTandem( 'model' ) } ),
      model => new MembraneTransportScreenView( model, { tandem: tandem.createTandem( 'view' ) } ), {
        name: nameProperty,
        backgroundColorProperty: MembraneTransportColors.outsideCellColorProperty,
        tandem: tandem,
        createKeyboardHelpNode: () => new MembraneTransportKeyboardHelpNode(),
        screenButtonsHelpText: screenButtonHelpTextProperty,
        homeScreenIcon: new ScreenIcon( new Image( homeScreenIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        navigationBarIcon: new ScreenIcon( new Image( navigationBarIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } )
      }
    );
  }
}

membraneTransport.register( 'MembraneTransportScreen', MembraneTransportScreen );