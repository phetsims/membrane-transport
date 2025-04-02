// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium glucose cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProtein from './TransportProtein.js';

export default class SodiumGlucoseCotransporter extends TransportProtein {

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

  /**
   * Determine if a site is available. A site may be reserved if a particle is moving toward it, or waiting in it.
   */
  private isSiteOpen( site: 'left' | 'center' | 'right' ): boolean {
    return this.model.solutes.find( solute => ( solute.mode.type === 'moveToSodiumGlucoseTransporter' ||
                                                solute.mode.type === 'waitingInSodiumGlucoseTransporter' ) &&
                                              solute.mode.slot === this.slot &&
                                              solute.mode.site === site ) === undefined;
  }

  /**
   * Determine open sites on the channel for sodium ions
   */
  public getOpenSodiumSites(): Array<'left' | 'right'> {

    // Sodium ions can use left or right site
    const availableSites: Array<'left' | 'right'> = [];
    if ( this.isSiteOpen( 'left' ) ) {
      availableSites.push( 'left' );
    }
    if ( this.isSiteOpen( 'right' ) ) {
      availableSites.push( 'right' );
    }

    return availableSites;
  }

  public isGlucoseSiteOpen(): boolean {
    return this.isSiteOpen( 'center' );
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporter', SodiumGlucoseCotransporter );