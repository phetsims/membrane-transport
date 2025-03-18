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

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumGlucoseTransporter' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'left' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumGlucoseTransporter' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'center' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumGlucoseTransporter' &&
                                                        solute.mode.slot === slot &&
                                                        solute.mode.site === 'right' );

    if ( sodium1 && sodium2 && sodium3 ) {
      this.isOpenProperty.set( true );

      // Move solutes through the open channel
      sodium1.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward', offset: -5 };
      sodium2.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward' };
      sodium3.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward', offset: +5 };
    }
  }
}

membraneChannels.register( 'SodiumPotassiumPump', SodiumPotassiumPump );