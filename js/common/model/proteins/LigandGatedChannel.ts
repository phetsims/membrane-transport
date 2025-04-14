// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a ligand-gated channel. When a ligand binds to the channel, it opens and allows ions to pass
 * through. After a certain time, the ligand unbinds and the channel closes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import { LigandType } from '../SoluteType.js';
import TransportProtein from './TransportProtein.js';

// Time in seconds that must elapse after a ligand unbinds before another can bind, in seconds
// TODO (design): Should the rebinding delay cooldown finish when you release a ligand right on top of the channel?
//   It is confusing sometimes when you release a ligand on the channel and it just moves away.
const REBINDING_DELAY = 5;

// Dwell time in seconds that a ligand remains bound before detaching. Multiple ions can pass through during this time, in seconds.
const BINDING_DURATION = 7;

// Delay for the protein to transition from bound and closed to bound and open, in seconds.
const STATE_TRANSITION_INTERVAL = 0.5;

export default class LigandGatedChannel extends TransportProtein<
  'closed' | // idle state, not bound to a ligand
  'ligandBoundClosed' | // ligand has bound, but channel has not yet opened (brief)
  'ligandBoundOpen' | // ligand has unbound, but channel is still open (brief)
  'ligandUnboundOpen'  // ligand has bound and channel has opened
> {

  // When a ligand is bound, keep track of it
  private boundLigand: Particle<LigandType> | null = null;

  // Start ready to bind
  private timeSinceStateTransition = REBINDING_DELAY;

  // Offsets for binding positions, relative to the center of the slot. Static so that they can be controlled from the dev tools.
  private static readonly SODIUM_BINDING_OFFSET_CLOSED = new Vector2( -5.5, 11 );
  private static readonly SODIUM_BINDING_OFFSET_OPEN = new Vector2( -7.5, 11 );
  private static readonly POTASSIUM_BINDING_OFFSET_CLOSED = new Vector2( 2.75, 3.5 );
  private static readonly POTASSIUM_BINDING_OFFSET_OPEN = new Vector2( 2.75, 3.5 );

  public constructor( model: MembraneTransportModel, type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel', position: number ) {
    super( model, type, position, 'closed' );

    this.stateProperty.link( state => {
      this.timeSinceStateTransition = 0;
    } );
  }

  public override step( dt: number ): void {

    this.timeSinceStateTransition += dt;

    // after an interval, transitions from ligandUnboundOpen to closed
    if ( this.stateProperty.value === 'ligandUnboundOpen' && this.timeSinceStateTransition >= STATE_TRANSITION_INTERVAL ) {
      this.stateProperty.value = 'closed';
    }

    // after an interval, transition from ligandBoundClosed to ligandBoundOpen
    if ( this.stateProperty.value === 'ligandBoundClosed' && this.timeSinceStateTransition >= STATE_TRANSITION_INTERVAL ) {
      this.stateProperty.value = 'ligandBoundOpen';
    }

    // After the binding duration, release the ligand
    if ( this.stateProperty.value === 'ligandBoundOpen' && this.timeSinceStateTransition >= BINDING_DURATION && this.boundLigand && !this.hasSolutesMovingTowardOrThroughTransportProtein() ) {
      this.unbindLigand();
    }
  }

  /**
   * The ligand remains attached while solutes are passing through, so we must prevent new solutes from passing through
   * if this.timeSinceLigandBound >= this.BINDING_DURATION, so that we don't end up in an infinite loop.
   */
  public override isAvailableForPassiveTransport(): boolean {
    return this.stateProperty.value === 'ligandBoundOpen' && this.timeSinceStateTransition < BINDING_DURATION && !this.hasSolutesMovingTowardOrThroughTransportProtein();
  }

  /**
   * Returns whether the channel is available for binding (not currently bound and past the rebinding delay)
   */
  public isAvailableForBinding(): boolean {
    return this.stateProperty.value === 'closed' && this.timeSinceStateTransition >= REBINDING_DELAY;
  }

  /**
   * Called when a ligand hits the membrane near this channel
   */
  public bindLigand( ligand: Particle<LigandType> ): void {

    // Only bind if not already bound and past the rebinding delay
    if ( this.isAvailableForBinding() ) {
      this.stateProperty.value = 'ligandBoundClosed';
      this.boundLigand = ligand;

      // Set the ligand to 'bound' mode to pause its motion. The slot is null because a solute has not reserved it.
      // TODO: Add the slot to this, and make the checks to see if the slot is available more sophisticated.
      //  We need the slot so we know how to find the binding location for the ligand.
      //  ligandGatedChannel would be replaced by slot once this is done.
      ligand.mode = { type: 'ligandBound', slot: null, ligandGatedChannel: this };
    }
  }

  /**
   * Release the bound ligand if any
   */
  public unbindLigand(): void {
    if ( this.boundLigand ) {

      // Reset the ligand to random walk mode
      this.boundLigand.mode = this.boundLigand.createRandomWalkMode( false );

      // Clear the bound state
      this.stateProperty.value = 'ligandUnboundOpen';
      this.boundLigand = null;
    }
  }

  /**
   * Returns the position of the binding site for the ligand.
   */
  public getBindingPositionOffset(): Vector2 {
    return this.type === 'sodiumIonLigandGatedChannel' ?
           this.stateProperty.value === 'ligandBoundClosed' ? LigandGatedChannel.SODIUM_BINDING_OFFSET_CLOSED : LigandGatedChannel.SODIUM_BINDING_OFFSET_OPEN :
           this.stateProperty.value === 'ligandBoundClosed' ? LigandGatedChannel.POTASSIUM_BINDING_OFFSET_CLOSED : LigandGatedChannel.POTASSIUM_BINDING_OFFSET_OPEN;
  }
}

membraneTransport.register( 'LigandGatedChannel', LigandGatedChannel );