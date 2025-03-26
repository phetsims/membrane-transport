// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium potassium pump.
 *
 * TODO: Implement the behavior for this protein (currently copies the cotransporter).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import membraneTransport from '../../../membraneTransport.js';
import Channel from './Channel.js';

export default class SodiumPotassiumPump extends Channel {

  private isSiteOpen( site: 'sodium1' | 'sodium2' | 'sodium3' ): boolean {
    return this.model.solutes.find( solute => ( solute.mode.type === 'moveToSodiumPotassiumPump' ||
                                                solute.mode.type === 'waitingInSodiumPotassiumPump' ) &&
                                              solute.mode.slot === this.slot &&
                                              solute.mode.site === site ) === undefined;
  }

  public getOpenSodiumSites(): Array<'sodium1' | 'sodium2' | 'sodium3'> {
    const availableSites: Array<'sodium1' | 'sodium2' | 'sodium3'> = [];
    if ( this.isSiteOpen( 'sodium1' ) ) {
      availableSites.push( 'sodium1' );
    }
    if ( this.isSiteOpen( 'sodium2' ) ) {
      availableSites.push( 'sodium2' );
    }
    if ( this.isSiteOpen( 'sodium3' ) ) {
      availableSites.push( 'sodium3' );
    }

    return availableSites;
  }

  public getNumberOfFilledSodiumSites(): number {

    const slot = this.model.getSlotForChannel( this )!;

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'sodium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'sodium2' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'sodium3' );

    // Count the number of sodiums that are filled
    let numberSodiumsFilled = 0;
    if ( sodium1 ) {
      numberSodiumsFilled++;
    }
    if ( sodium2 ) {
      numberSodiumsFilled++;
    }
    if ( sodium3 ) {
      numberSodiumsFilled++;
    }
    return numberSodiumsFilled;
  }

  public readonly isOpenProperty: BooleanProperty = new BooleanProperty( false );

  public override step( dt: number ): void {

    const slot = this.model.getSlotForChannel( this )!;

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'sodium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === slot &&
                                                       solute.mode.site === 'sodium2' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                        solute.mode.slot === slot &&
                                                       solute.mode.site === 'sodium3' );

    if ( sodium1 && sodium2 && sodium3 ) {
      this.isOpenProperty.set( true );

      // Move solutes through the open channel
      sodium1.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward', offset: -5 };
      sodium2.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward' };
      sodium3.mode = { type: 'movingThroughChannel', slot: slot, channelType: this.type, direction: 'inward', offset: +5 };
    }
  }

  public isSodiumFullyBound(): boolean {
    return this.getOpenSodiumSites().length === 0;
  }

  // True if an ATP is on the way or waiting in the site
  public isATPEnRoute(): boolean {
    return false;
  }
}

membraneTransport.register( 'SodiumPotassiumPump', SodiumPotassiumPump );