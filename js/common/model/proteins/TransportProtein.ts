// Copyright 2025, University of Colorado Boulder

/**
 * TransportProtein keeps track of stateful model information for a transport protein that is actively in a slot.
 * NOTE: this does not extend PhetioObject only the critical part (the type) is needed for serialization.
 * This allows us to avoid dynamic elements in the PhET-iO tree and in the state.
 *
 * The type parameter defaults to IntentionalAny, since there are ~10 cases where we need to specify the type
 * TransportProtein without caring about the specific states it can be in.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import Bounds2 from '../../../../../dot/js/Bounds2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';
import Slot from '../Slot.js';
import { ParticleType } from '../SoluteType.js';
import TransportProteinType from './TransportProteinType.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';

// State is a string union defined by the subclass.
export default abstract class TransportProtein<State extends string = IntentionalAny> {

  // Bounds of the transport protein in model coordinates.
  public readonly bounds: Bounds2;

  // Certain subtypes of TransportProtein have a specific state, such as 'open', 'closed', 'openToInsideEmpty', etc.
  public readonly stateProperty: Property<State>;

  /**
   * @param model - reference to the containing model, so we can access information like the membrane voltage
   * @param type - the type of transport protein
   * @param position - the horizontal position of the transport protein in the membrane
   * @param initialState - transport proteins may be in one of many states, such as 'open', 'closed', 'openToInsideEmpty', 'openToInsideSodiumBound'.
   */
  protected constructor(
    public readonly model: MembraneTransportModel,
    public readonly type: TransportProteinType,
    public readonly position: number,
    initialState: State
  ) {
    this.bounds = new Bounds2(
      position - MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH / 2,
      MembraneTransportConstants.MEMBRANE_BOUNDS.minY,
      position + MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH / 2,
      MembraneTransportConstants.MEMBRANE_BOUNDS.maxY
    );

    this.stateProperty = new Property( initialState );
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

  /**
   * A transport protein is available for transport if there are no solutes moving toward or through it. Subclasses may
   * have additional criteria for availability.
   */
  public abstract isAvailableForPassiveTransport(): boolean;
}

membraneTransport.register( 'TransportProtein', TransportProtein );