// Copyright 2024-2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../axon/js/PhetioProperty.js';
import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MembraneChannelsColors from '../common/MembraneChannelsColors.js';
import membraneChannels from '../membraneChannels.js';
import MembraneChannelsModel from './model/MembraneChannelsModel.js';
import MembraneChannelsScreenView from './view/MembraneChannelsScreenView.js';

export default class MembraneChannelsScreen extends Screen<MembraneChannelsModel, MembraneChannelsScreenView> {

  public constructor( nameProperty: PhetioProperty<string>, tandem: Tandem, featureSet: 'simpleDiffusion' | 'facilitatedDiffusion' | 'activeTransport' | 'playground' ) {

    super(
      () => new MembraneChannelsModel( { tandem: tandem.createTandem( 'model' ) } ),
      model => new MembraneChannelsScreenView( model, featureSet, { tandem: tandem.createTandem( 'view' ) } ), {
        name: nameProperty,
        backgroundColorProperty: MembraneChannelsColors.outsideCellColorProperty,
        tandem: tandem
      }
    );
  }
}

membraneChannels.register( 'MembraneChannelsScreen', MembraneChannelsScreen );