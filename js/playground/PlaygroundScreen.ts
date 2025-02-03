// Copyright 2025, University of Colorado Boulder

import Tandem from '../../../tandem/js/Tandem.js';
import MembraneChannelsScreen from '../common/MembraneChannelsScreen.js';
import membraneChannels from '../membraneChannels.js';
import MembraneChannelsStrings from '../MembraneChannelsStrings.js';

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class PlaygroundScreen extends MembraneChannelsScreen {

  public constructor( tandem: Tandem ) {
    super( MembraneChannelsStrings.screen.playgroundStringProperty, tandem );
  }

}

membraneChannels.register( 'PlaygroundScreen', PlaygroundScreen );