// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a ligand-gated channel. When a ligand binds to the channel, it opens and allows ions to pass
 * through. After a certain time, the ligand unbinds and the channel closes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import { LigandType } from '../SoluteType.js';
import TransportProtein from './TransportProtein.js';

// Time in seconds that must elapse after a ligand unbinds before another can bind
const REBINDING_DELAY = 5;

export default class LigandGatedChannel extends TransportProtein {

  public readonly isLigandBoundProperty = new BooleanProperty( false );

  public readonly isOpenProperty: TReadOnlyProperty<boolean> = this.isLigandBoundProperty;

  // When a ligand is bound, keep track of it
  private boundLigand: Particle<LigandType> | null = null;

  // Dwell time in seconds that a ligand remains bound before detaching. Multiple ions can pass through during this time.
  private readonly bindingDuration = 7;

  // Tracks how long the current ligand has been bound
  private timeSinceLigandBound = 0;

  // Tracks time since a ligand was unbound, used for rebinding delay
  private timeSinceUnbound = REBINDING_DELAY; // Start ready to bind

  public constructor( model: MembraneTransportModel, type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel', position: number ) {
    super( model, type, position );
  }

  public override step( dt: number ): void {

    // If a ligand is bound, increment the timer
    if ( this.isLigandBoundProperty.value ) {
      this.timeSinceLigandBound += dt;

      // After the binding duration, release the ligand
      // TODO: Prevent solutes from passing through if this.timeSinceLigandBound >= this.bindingDuration, so that we don't end up in an infinite loop
      if ( this.timeSinceLigandBound >= this.bindingDuration && this.boundLigand && !this.hasSolutesMovingThroughTransportProtein() ) {
        this.unbindLigand();
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

      // Set the ligand to 'bound' mode to pause its motion. The slot is null because a solute has not reserved it.
      ligand.mode = { type: 'ligandBound', slot: null };
    }
  }

  /**
   * Release the bound ligand if any
   */
  public unbindLigand(): void {
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

  /**
   * Returns the position of the binding site for the ligand.
   */
  public getBindingPosition(): Vector2 {

    return this.type === 'sodiumIonLigandGatedChannel' ?
           new Vector2( this.bounds.minX, this.bounds.maxY ) :
           new Vector2( this.bounds.minX - 2.75, this.bounds.maxY + 3.5 );
  }
}

membraneTransport.register( 'LigandGatedChannel', LigandGatedChannel );