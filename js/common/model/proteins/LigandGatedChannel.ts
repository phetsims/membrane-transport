// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a ligand-gated channel. When a ligand binds to the channel, it opens and allows ions to pass
 * through. After a certain time, the ligand unbinds and the channel closes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../../axon/js/Emitter.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import Ligand from '../Ligand.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import LigandBoundMode from '../particleModes/LigandBoundMode.js';
import Slot from '../Slot.js';
import SoluteType from '../SoluteType.js';
import TransportProtein from './TransportProtein.js';

// Time in seconds that must elapse after a ligand unbinds before another can bind, in seconds
const REBINDING_DELAY = 5;

// Dwell time in seconds that a ligand remains bound before detaching. Multiple ions can pass through during this time, in seconds.
const BINDING_DURATION = 15;

// Delay for the protein to transition from bound and closed to bound and open, in seconds.
const STATE_TRANSITION_INTERVAL = 0.5;

type LigandGatedChannelState = 'closed' | // idle state, not bound to a ligand
  'ligandBoundClosed' | // ligand has bound, but the channel has not yet opened (brief)
  'ligandBoundOpen' | // ligand has unbound, but the channel is still open (brief)
  'ligandUnboundOpen';  // ligand has bound and the channel has opened

export default class LigandGatedChannel extends TransportProtein<LigandGatedChannelState> {

  private readonly ligandUnboundDueToNaturalCausesEmitter: Emitter<[ Ligand ]>;

  // Offsets for binding positions, relative to the center of the slot. Static so that they can be controlled from the dev tools.
  private static readonly SODIUM_BINDING_OFFSET_CLOSED = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumLigandGatedChannel.closed.dimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumLigandGatedChannel.closed.ligandBindingSite
  );
  private static readonly SODIUM_BINDING_OFFSET_OPEN = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumLigandGatedChannel.open.dimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumLigandGatedChannel.open.ligandBindingSite
  );

  private static readonly POTASSIUM_BINDING_OFFSET_CLOSED = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.potassiumLigandGatedChannel.closed.dimension,
    MembraneTransportConstants.IMAGE_METRICS.potassiumLigandGatedChannel.closed.ligandBindingSite
  );
  private static readonly POTASSIUM_BINDING_OFFSET_OPEN = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.potassiumLigandGatedChannel.open.dimension,
    MembraneTransportConstants.IMAGE_METRICS.potassiumLigandGatedChannel.open.ligandBindingSite
  );

  public constructor( model: MembraneTransportModel, type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel', position: number ) {
    super( model, type, position, 'closed', [ 'ligandBoundOpen', 'ligandUnboundOpen' ] );

    this.ligandUnboundDueToNaturalCausesEmitter = model.ligandUnboundDueToNaturalCausesEmitter;

    // Start ready to bind
    this.timeSinceStateTransition = REBINDING_DELAY;
  }

  public clearRebindingCooldown(): void {
    this.timeSinceStateTransition = REBINDING_DELAY;
  }

  /**
   * @param dt - in seconds
   */
  public override step( dt: number ): void {
    super.step( dt );

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
      this.unbindLigand( true );
    }
  }

  /**
   * Look up the ligand bound to this protein. This is not an instance variable because
   * we need this to be on the Particle to make it easier to control
   * deserializing from PhET-iO state.
   */
  private get boundLigand(): Ligand | null {
    return this.model.ligands.find( ligand => ligand.mode instanceof LigandBoundMode && ligand.mode.ligandGatedChannel === this ) || null;
  }

  /**
   * The ligand remains attached while solutes are passing through. We prevent new solutes from passing through
   * if this.timeSinceLigandBound >= this.BINDING_DURATION, so that we don't end up in an infinite loop.
   */
  public override isAvailableForPassiveTransport( soluteType: SoluteType, location: 'inside' | 'outside' ): boolean {
    return this.stateProperty.value === 'ligandBoundOpen' &&
           this.timeSinceStateTransition < BINDING_DURATION &&
           !this.hasSolutesMovingTowardOrThroughTransportProtein() &&
           this.model.checkGradientForCrossing( soluteType, location );
  }

  /**
   * Returns whether the channel is available for binding - not currently bound and past the rebinding delay.
   */
  public isAvailableForBinding(): boolean {
    return this.stateProperty.value === 'closed' && this.timeSinceStateTransition >= REBINDING_DELAY;
  }

  /**
   * Attempts to bind a ligand to the channel. If the channel is available for binding, updates the channel state and sets the
   * ligand to 'bound' mode.
   */
  public bindLigand( ligand: Particle ): void {

    // Only bind if not already bound and past the rebinding delay
    if ( this.isAvailableForBinding() ) {
      this.stateProperty.value = 'ligandBoundClosed';

      // Set the ligand to 'bound' mode to pause its motion.
      ligand.mode = new LigandBoundMode( this, this.slot );
    }
  }

  /**
   * Releases the currently bound ligand from the channel, if present.
   * Updates the ligand to random walk mode, resets the channel state, and emits an event if the release was due to natural causes.
   *
   * @param naturally - True if unbinding occurs naturally (e.g., binding duration expired); false if unbound by other means.
   */
  public unbindLigand( naturally: boolean ): void {
    if ( this.boundLigand ) {
      const ligand = this.boundLigand;

      // Reset the ligand to random walk mode
      ligand.mode = Particle.createRandomWalkMode( false );

      // Clear the bound state
      this.stateProperty.value = 'ligandUnboundOpen';

      if ( naturally ) {
        this.ligandUnboundDueToNaturalCausesEmitter.emit( ligand );
      }

      // After the above emitter so that manuallyBound is correct in callbacks.
      ligand.manuallyBound = false;
    }
  }

  /**
   * Returns the position offset of the binding site for the ligand.
   */
  public getBindingPositionOffset(): Vector2 {
    return this.type === 'sodiumIonLigandGatedChannel' ?
           this.stateProperty.value === 'ligandBoundClosed' ? LigandGatedChannel.SODIUM_BINDING_OFFSET_CLOSED : LigandGatedChannel.SODIUM_BINDING_OFFSET_OPEN :
           this.stateProperty.value === 'ligandBoundClosed' ? LigandGatedChannel.POTASSIUM_BINDING_OFFSET_CLOSED : LigandGatedChannel.POTASSIUM_BINDING_OFFSET_OPEN;
  }

  /**
   * Calculates and returns the absolute binding site position for the ligand based on the slot position and binding offset.
   */
  public getBindingPosition(): Vector2 {
    const bindingPositionOffset = this.getBindingPositionOffset();
    return new Vector2( this.slot.position, 0 ).plus( bindingPositionOffset );
  }

  /**
   * For the ligand gated channels, clear removes all particles and ligands.
   */
  public override clear( slot: Slot ): void {

    // Also release any ligands interacting with this channel.
    if ( this.boundLigand ) {
      this.unbindLigand( false );
    }
    this.releaseParticlesWithSlot( this.model.ligands, slot );

    // release solutes and reset state.
    super.clear( slot );
  }
}

membraneTransport.register( 'LigandGatedChannel', LigandGatedChannel );