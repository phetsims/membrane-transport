// Copyright 2025, University of Colorado Boulder

/**
 * TransportProtein keeps track of stateful model information for a transport protein that is actively in a slot.
 * NOTE: this does not extend PhetioObject only the critical part (the type) is needed for serialization.
 * This allows us to avoid dynamic elements in the PhET-iO tree and in the state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import Disposable from '../../../../../axon/js/Disposable.js';
import Property from '../../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../../dot/js/Bounds2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle, { ParticleModeWithSlot } from '../Particle.js';
import Slot from '../Slot.js';
import SoluteType from '../SoluteType.js';
import TransportProteinType from './TransportProteinType.js';

// The State type parameter is a string union defined by the subclass, indicating which conformation or mode the protein
// is in. We leave the default as the union of all possibilities several (15+) usage sites that don't care what state it is in.
type AllStates = 'openToInsideEmpty' | 'openToInsideSodiumBound' | 'openToInsideSodiumAndATPBound' | 'openToInsideSodiumAndPhosphateBound' | 'openToOutsideAwaitingPotassium' | 'openToOutsidePotassiumBound' | 'openToOutsideAwaitingParticles' | 'openToOutsideAllParticlesBound' | 'openToInside' | 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV' | 'closedNegative50mV' | 'open30mV' | 'ligandBoundClosed' | 'ligandBoundOpen' | 'ligandUnboundOpen' | 'closed' | 'open';

export default abstract class TransportProtein<State extends AllStates = AllStates> extends Disposable {

  // Bounds of the transport protein in model coordinates.
  public readonly bounds: Bounds2;

  // Certain subtypes of TransportProtein have a specific state, such as 'open', 'closed', 'openToInsideEmpty', etc.
  public readonly stateProperty: Property<State>;

  // A convenience Property that describes the overall open vs closed state of the channel.
  public readonly openOrClosedProperty: TReadOnlyProperty<'open' | 'closed'>;

  // Track how long since the state last changed, for timing of state transitions. Used in the active transporters.
  // Public only for PhET-iO state serialization, otherwise treat as protected.
  public timeSinceStateTransition = 0;

  /**
   * @param model - reference to the containing model, so we can access information like the membrane voltage
   * @param type - the type of transport protein
   * @param position - the horizontal position of the transport protein in the membrane
   * @param initialState - transport proteins may be in one of many states, such as 'open', 'closed', 'openToInsideEmpty', 'openToInsideSodiumBound'.
   * @param openStates - A list of states that are considered 'open' for the purposes of transport.
   */
  protected constructor(
    public readonly model: MembraneTransportModel,
    public readonly type: TransportProteinType,
    public readonly position: number,
    initialState: State,
    openStates: State[]
  ) {
    super();
    this.bounds = new Bounds2(
      position - MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH / 2,
      MembraneTransportConstants.MEMBRANE_BOUNDS.minY,
      position + MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH / 2,
      MembraneTransportConstants.MEMBRANE_BOUNDS.maxY
    );

    this.stateProperty = new Property( initialState );

    this.openOrClosedProperty = new DerivedProperty( [ this.stateProperty ], ( state: State ) => {
      return openStates.includes( state ) ? 'open' : 'closed';
    } );

    this.stateProperty.link( () => {
      this.timeSinceStateTransition = 0;
    } );
  }

  /**
   * Implement in subclasses.
   * @param dt - time step in seconds
   */
  public step( dt: number ): void {
    this.timeSinceStateTransition += dt;

    // More specific details in a subclass
  }

  public get slot(): Slot {
    const slot = this.model.getSlotForTransportProtein( this );

    affirm( slot !== null, 'Slot should be non-null' );
    return slot;
  }

  public hasSolutesMovingTowardOrThroughTransportProtein( solutePredicate: ( solute: Particle ) => boolean = ( () => true ) ): boolean {
    return !this.model.isTransportProteinSoluteFree( this.slot, solutePredicate );
  }

  public isLeakageGatedChannel(): boolean {
    return this.type === 'potassiumIonLeakageChannel' || this.type === 'sodiumIonLeakageChannel';
  }

  public isLigandGatedChannel(): boolean {
    return this.type === 'potassiumIonLigandGatedChannel' || this.type === 'sodiumIonLigandGatedChannel';
  }

  /**
   * A transport protein is available for transport if there are no solutes moving toward or through it with some
   * biasing depending on the concentration gradient. Subclasses may have additional criteria for availability.
   */
  public abstract isAvailableForPassiveTransport( soluteType: SoluteType, location: 'outside' | 'inside' ): boolean;

  /**
   * Release any of the provided particles that are interacting with the transport protein.
   */
  protected releaseParticlesWithSlot( particles: Particle[], slot: Slot ): void {
    particles
      .filter( particle => ( particle.mode as ParticleModeWithSlot ).slot === slot )
      .forEach( particle => particle.releaseFromInteraction( particle.position.y > 0 ? 20 : -20 ) );
  }

  /**
   * Release any solutes that are interacting with the transport protein.
   */
  public clearSolutes( slot: Slot ): void {

    // Release any solutes that were interacting with the transport protein.
    this.releaseParticlesWithSlot( this.model.solutes, slot );
  }

  /**
   * Release any particles (ligands or solutes) from this protein, and reset the state.
   * Particles return to their random walk.
   */
  public clear( slot: Slot ): void {
    this.clearSolutes( slot );

    this.stateProperty.reset();
  }
}

membraneTransport.register( 'TransportProtein', TransportProtein );