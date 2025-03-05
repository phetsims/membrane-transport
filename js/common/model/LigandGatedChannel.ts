// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a ligand-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import membraneChannels from '../../membraneChannels.js';
import Channel from './Channel.js';

export default class LigandGatedChannel extends Channel {
  public readonly isLigandBoundProperty = new BooleanProperty( false );

  // TODO: Just to test changes to binding.
  private readonly bindingInterval = 1;
  private timeSinceBindingChanged = 0;

  public constructor( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' ) {
    super( type );
  }

  public override step( dt: number ): void {
    this.timeSinceBindingChanged += dt;

    if ( this.timeSinceBindingChanged > this.bindingInterval ) {
      this.isLigandBoundProperty.value = !this.isLigandBoundProperty.value;
      this.timeSinceBindingChanged = 0;
    }
  }
}

membraneChannels.register( 'LigandGatedChannel', LigandGatedChannel );