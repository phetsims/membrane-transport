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
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import Particle, { ParticleModeWithSlot } from '../Particle.js';
import Slot from '../Slot.js';
import { ParticleType } from '../SoluteType.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';
import TransportProteinType from './TransportProteinType.js';

// The State type parameter is a string union defined by the subclass, indicating which conformation or mode the protein
// is in. We leave the default as IntentionalAny since there are several (10+) usage sites that don't care what state it is in.
export default abstract class TransportProtein<State extends string = IntentionalAny> extends Disposable {

  // Bounds of the transport protein in model coordinates.
  public readonly bounds: Bounds2;

  // Certain subtypes of TransportProtein have a specific state, such as 'open', 'closed', 'openToInsideEmpty', etc.
  public readonly stateProperty: Property<State>;

  // A convenience Property that describes the overall open vs closed state of the channel.
  public readonly openOrClosedProperty: TReadOnlyProperty<'open' | 'closed'>;

  /**
   * @param model - reference to the containing model, so we can access information like the membrane voltage
   * @param type - the type of transport protein
   * @param position - the horizontal position of the transport protein in the membrane
   * @param initialState - transport proteins may be in one of many states, such as 'open', 'closed', 'openToInsideEmpty', 'openToInsideSodiumBound'.
   * @param openStates - A list of states that are considered 'open' for the purposes of transport.
   */
  protected constructor(
    public readonly model: TransportProteinModelContext,
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
  }

  /**
   * Implement in subclasses.
   * @param dt - time step in seconds
   */
  public step( dt: number ): void {

    // implement in a subclass, if necessary
  }

  public get slot(): Slot {
    const slot = this.model.getSlotForTransportProtein( this );

    affirm( slot !== null, 'Slot should be non-null' );
    return slot;
  }

  public hasSolutesMovingTowardOrThroughTransportProtein( solutePredicate: ( solute: Particle<ParticleType> ) => boolean = ( () => true ) ): boolean {
    return !this.model.isTransportProteinSoluteFree( this.slot, solutePredicate );
  }

  public isLeakageGatedChannel(): boolean {
    return this.type === 'potassiumIonLeakageChannel' || this.type === 'sodiumIonLeakageChannel';
  }

  public isLigandGatedChannel(): boolean {
    return this.type === 'potassiumIonLigandGatedChannel' || this.type === 'sodiumIonLigandGatedChannel';
  }

  /**
   * A transport protein is available for transport if there are no solutes moving toward or through it. Subclasses may
   * have additional criteria for availability.
   */
  public abstract isAvailableForPassiveTransport(): boolean;

  /**
   * Set free any ligands or particles that are interacting with the transport protein.
   */
  public releaseParticles( slot: Slot ): void {

    this.model.solutes.forEach( solute => {
      if ( ( solute.mode as ParticleModeWithSlot ).slot === slot ) {
        solute.releaseFromInteraction( solute.position.y > 0 ? 20 : -20 );
      }
    } );
  }
}

membraneTransport.register( 'TransportProtein', TransportProtein );