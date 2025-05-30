// Copyright 2024-2025, University of Colorado Boulder

/**
 * Base class for any of the screens in the Membrane Transport simulation.  This class is responsible for creating the model and view.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import ReadOnlyProperty from '../../../axon/js/ReadOnlyProperty.js';
import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportColors from '../common/MembraneTransportColors.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFeatureSet from './MembraneTransportFeatureSet.js';
import MembraneTransportModel from './model/MembraneTransportModel.js';
import MembraneTransportKeyboardHelpNode from './view/MembraneTransportKeyboardHelpNode.js';
import MembraneTransportScreenView from './view/MembraneTransportScreenView.js';

export default class MembraneTransportScreen extends Screen<MembraneTransportModel, MembraneTransportScreenView> {

  public constructor( nameProperty: ReadOnlyProperty<string>, tandem: Tandem, featureSet: MembraneTransportFeatureSet ) {

    super(
      () => new MembraneTransportModel( featureSet, { tandem: tandem.createTandem( 'model' ) } ),
      model => new MembraneTransportScreenView( model, { tandem: tandem.createTandem( 'view' ) } ), {
        name: nameProperty,
        backgroundColorProperty: MembraneTransportColors.outsideCellColorProperty,
        tandem: tandem,
        createKeyboardHelpNode: () => new MembraneTransportKeyboardHelpNode( featureSet )
      }
    );
  }
}

membraneTransport.register( 'MembraneTransportScreen', MembraneTransportScreen );