// Copyright 2024, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import MembraneChannelsColors from '../common/MembraneChannelsColors.js';
import membraneChannels from '../membraneChannels.js';
import MembraneChannelsStrings from '../MembraneChannelsStrings.js';
import MembraneChannelsModel from './model/MembraneChannelsModel.js';
import MembraneChannelsScreenView from './view/MembraneChannelsScreenView.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsScreenOptions = SelfOptions & ScreenOptions;

export default class MembraneChannelsScreen extends Screen<MembraneChannelsModel, MembraneChannelsScreenView> {

  public constructor( providedOptions: MembraneChannelsScreenOptions ) {

    const options = optionize<MembraneChannelsScreenOptions, SelfOptions, ScreenOptions>()( {
      name: MembraneChannelsStrings.screen.nameStringProperty,
      backgroundColorProperty: MembraneChannelsColors.outsideCellColorProperty
    }, providedOptions );

    super(
      () => new MembraneChannelsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new MembraneChannelsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

membraneChannels.register( 'MembraneChannelsScreen', MembraneChannelsScreen );