// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Sam Reid (PhET Interactive Simulations, and Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import MembraneChannelsColors from '../common/MembraneChannelsColors.js';
import membraneChannels from '../membraneChannels.js';
import MembraneChannelsStrings from '../MembraneChannelsStrings.js';
import MembraneChannelsModel from './model/MembraneChannelsModel.js';
import MembraneChannelsScreenView from './view/MembraneChannelsScreenView.js';

type SelfOptions = {
  //TODO add options that are specific to MembraneChannelsScreen here
};

type MembraneChannelsScreenOptions = SelfOptions & ScreenOptions;

export default class MembraneChannelsScreen extends Screen<MembraneChannelsModel, MembraneChannelsScreenView> {

  public constructor( providedOptions: MembraneChannelsScreenOptions ) {

    const options = optionize<MembraneChannelsScreenOptions, SelfOptions, ScreenOptions>()( {
      name: MembraneChannelsStrings.screen.nameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: MembraneChannelsColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new MembraneChannelsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new MembraneChannelsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

membraneChannels.register( 'MembraneChannelsScreen', MembraneChannelsScreen );