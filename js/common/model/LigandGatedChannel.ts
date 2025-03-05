// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a ligand-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import membraneChannels from '../../membraneChannels.js';
import Channel from './Channel.js';
import { LigandType } from './SoluteType.js';
import Particle from './Particle.js';

// Time in seconds that must elapse after a ligand unbinds before another can bind
const REBINDING_DELAY = 5;

export default class LigandGatedChannel extends Channel {
  public readonly isLigandBoundProperty = new BooleanProperty( false );

  // When a ligand is bound, keep track of it
  private boundLigand: Particle<LigandType> | null = null;
  
  // Time in seconds that a ligand remains bound before detaching
  private readonly bindingDuration = 10;
  
  // Tracks how long the current ligand has been bound
  private timeSinceLigandBound = 0;
  
  // Tracks time since a ligand was unbound, used for rebinding delay
  private timeSinceUnbound = REBINDING_DELAY; // Start ready to bind

  public constructor( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' ) {
    super( type );
  }

  public override step( dt: number ): void {

    // If a ligand is bound, increment the timer
    if ( this.isLigandBoundProperty.value ) {
      this.timeSinceLigandBound += dt;
      
      // After the binding duration, release the ligand
      if ( this.timeSinceLigandBound >= this.bindingDuration && this.boundLigand ) {
        this.releaseLigand();
      }
    }
    else {
      // If no ligand is bound, increment the unbinding timer
      this.timeSinceUnbound += dt;
    }
  }
  
  /**
   * Returns whether the channel is available for binding (not currently bound and past the rebinding delay)
   */
  public isAvailableForBinding(): boolean {
    return !this.isLigandBoundProperty.value && this.timeSinceUnbound >= REBINDING_DELAY;
  }
  
  /**
   * Called when a ligand hits the membrane near this channel
   */
  public bindLigand( ligand: Particle<LigandType> ): void {
    // Only bind if not already bound and past the rebinding delay
    if ( this.isAvailableForBinding() ) {
      this.isLigandBoundProperty.value = true;
      this.boundLigand = ligand;
      this.timeSinceLigandBound = 0;
      
      // Set the ligand to 'bound' mode to pause its motion
      ligand.mode = { type: 'bound' };
    }
  }
  
  /**
   * Release the bound ligand if any
   * TODO: Release after a particle passes through.
   */
  private releaseLigand(): void {
    if ( this.boundLigand ) {
      // Reset the ligand to random walk mode
      this.boundLigand.mode = this.boundLigand.createRandomWalkMode();
      
      // Clear the bound state
      this.isLigandBoundProperty.value = false;
      this.boundLigand = null;
      this.timeSinceLigandBound = 0;
      this.timeSinceUnbound = 0; // Reset the unbinding timer
    }
  }
}

membraneChannels.register( 'LigandGatedChannel', LigandGatedChannel );