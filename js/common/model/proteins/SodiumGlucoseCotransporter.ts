// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium glucose cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

export default class SodiumGlucoseCotransporter extends TransportProtein<'openToOutside' | 'openToInside'> {

  public constructor( model: MembraneTransportModel, type: TransportProteinType, position: number ) {
    super( model, type, position, 'openToOutside' );
  }

  public override step( dt: number ): void {

    const slot = this.model.getSlotForTransportProtein( this )!;

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
      this.stateProperty.value = 'openToInside';

      // Move solutes through the open transport protein
      leftIon.mode = { type: 'movingThroughChannel', slot: slot, transportProteinType: this.type, direction: 'inward', offset: -5 };
      glucose.mode = { type: 'movingThroughChannel', slot: slot, transportProteinType: this.type, direction: 'inward' };
      rightIon.mode = { type: 'movingThroughChannel', slot: slot, transportProteinType: this.type, direction: 'inward', offset: +5 };
    }

    if ( this.stateProperty.value === 'openToInside' ) {

      // Check to see if the sodium ions or glucose is still passing through
      const numberPassingThrough = this.model.solutes.filter( solute => solute.mode.type === 'movingThroughChannel' &&
                                                                        solute.mode.slot === slot );

      // Once all solutes have passed through, the sodium glucose cotransporter is open to the outside
      if ( numberPassingThrough.length === 0 ) {
        this.stateProperty.value = 'openToOutside';
      }
    }
  }

  /**
   * Determine if a site is available. A site may be reserved if a particle is moving toward it, or waiting in it.
   */
  private isSiteOpen( site: 'left' | 'center' | 'right' ): boolean {
    return this.model.solutes.find( solute => ( solute.mode.type === 'moveToSodiumGlucoseCotransporter' ||
                                                solute.mode.type === 'waitingInSodiumGlucoseTransporter' ) &&
                                              solute.mode.slot === this.slot &&
                                              solute.mode.site === site ) === undefined;
  }

  /**
   * Determine open sites on the sodium glucose cotransporter for sodium ions
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

  public static getSitePosition( site: 'left' | 'right' | 'center' ): Vector2 {
    return site === 'left' ? new Vector2( -5.2, 8.5 ) :
           site === 'right' ? new Vector2( 6.2, 8.5 ) :
           site === 'center' ? new Vector2( 0.65, 3 ) :
           ( () => { throw new Error( `Unhandled site: ${site}` ); } )(); // IIFE to throw error
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporter', SodiumGlucoseCotransporter );