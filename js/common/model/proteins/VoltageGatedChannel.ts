// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a voltage-gated channel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import SoluteType from '../SoluteType.js';
import TransportProtein from './TransportProtein.js';

export default abstract class VoltageGatedChannel<T extends 'closedNegative70mV' | 'closedNegative50mV' | 'open30mV' | 'openNegative50mV' | 'closed30mV'> extends TransportProtein<T> {
  private timeSinceVoltageChanged: number | null = null;

  protected constructor( model: MembraneTransportModel, type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', position: number, initialState: T, openStates: T[] ) {
    super( model, type, position, initialState, openStates );

    // * 3 point control that controls the open/close states of the Na and K channels separately and possibly instantaneously.
    // * -70: resting, both closed
    // * -50: Na open, K closed
    // * +30: Na closed, K open
    model.membranePotentialProperty.link( voltage => {

      this.timeSinceVoltageChanged = 0;

    }, { disposer: this } );
  }

  public abstract getStateForVoltage( voltage: number ): T;

  public abstract isStateOpen( state: T ): boolean;

  public override step( dt: number ): void {
    super.step( dt );

    if ( this.timeSinceVoltageChanged !== null ) {
      this.timeSinceVoltageChanged += dt;

      if ( this.timeSinceVoltageChanged > 0.5 ) {
        const voltage = this.model.membranePotentialProperty.value;
        this.stateProperty.value = this.getStateForVoltage( voltage );
        this.timeSinceVoltageChanged = null;
      }
    }
  }

  /**
   * A voltage gated channel is only available for transport if in the correct state.
   */
  public override isAvailableForPassiveTransport( soluteType: SoluteType, location: 'inside' | 'outside' ): boolean {
    return this.isStateOpen( this.stateProperty.value ) &&
           !this.hasSolutesMovingTowardOrThroughTransportProtein() &&
           this.model.checkGradientForCrossing( soluteType, location );
  }
}

membraneTransport.register( 'VoltageGatedChannel', VoltageGatedChannel );