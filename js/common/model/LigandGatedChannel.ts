// Copyright 2025, University of Colorado Boulder

import membraneChannels from '../../membraneChannels.js';
import Channel from './Channel.js';

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LigandGatedChannel extends Channel {
  private isLigandBound = false;

  public constructor( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' ) {
    super( type );
  }
}

membraneChannels.register( 'LigandGatedChannel', LigandGatedChannel );