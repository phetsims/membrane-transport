// Copyright 2025, University of Colorado Boulder

import Property from '../../../../../axon/js/Property.js';
import Bounds2 from '../../../../../dot/js/Bounds2.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Slot from '../Slot.js';
import TransportProteinType from './TransportProteinType.js';

/**
 * TransportProtein keeps track of stateful model information for a transport protein that is actively in a slot.
 * NOTE: this does not extend PhetioObject only the critical part (the type) is needed for serialization.
 * This allows us to avoid dynamic elements in the PhET-iO tree and in the state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default abstract class TransportProtein<State = IntentionalAny> {

  // Bounds of the transport protein in model coordinates.
  public readonly bounds: Bounds2;

  public readonly stateProperty: Property<State>;

  /**
   * @param model - reference to the containing model, so we can access information like the membrane voltage
   * @param type - the type of transport protein
   * @param position - the horizontal position of the transport protein in the membrane
   * @param initialState - transport proteins may be in one of many states, such as 'open', 'closed', 'idle', 'sodiumBound'.
   */
  public constructor(
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
    return this.model.getSlotForTransportProtein( this )!;
  }

  public hasSolutesMovingThroughTransportProtein(): boolean {
    return !!this.model.solutes.find( solute => solute.mode.type === 'movingThroughChannel' && solute.mode.slot === this.slot );
  }
}

membraneTransport.register( 'TransportProtein', TransportProtein );