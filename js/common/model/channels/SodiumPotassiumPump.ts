// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium potassium pump.
 *
 * TODO: Implement the behavior for this protein (currently copies the cotransporter).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import membraneChannels from '../../../membraneChannels.js';
import Channel from './Channel.js';

export default class SodiumPotassiumPump extends Channel {

  public readonly isOpenProperty: BooleanProperty = new BooleanProperty( false );

  public override step( dt: number ): void {

    const slot = this.model.getSlotForChannel( this )!;

    const leftIon = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumGlucoseTransporter' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'left' );
    const glucose = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumGlucoseTransporter' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'center' );
    const rightIon = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumGlucoseTransporter' &&
                                                        solute.mode.slot === slot &&
                                                        solute.mode.site === 'right' );

    if ( leftIon && glucose && rightIon ) {
      this.isOpenProperty.set( true );

      // Move solutes through the open channel
      leftIon.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward', offset: -5 };
      glucose.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward' };
      rightIon.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward', offset: +5 };
    }
  }
}

membraneChannels.register( 'SodiumPotassiumPump', SodiumPotassiumPump );