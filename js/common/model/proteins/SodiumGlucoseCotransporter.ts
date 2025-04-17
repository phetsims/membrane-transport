// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium glucose cotransporter.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';
import TransportProteinType from './TransportProteinType.js';

// The sodium glucose cotransporter is always open to the inside or outside of the cell
type SodiumGlucoseCotransporterState = 'openToOutside' | 'openToInside';

export default class SodiumGlucoseCotransporter extends TransportProtein<SodiumGlucoseCotransporterState> {

  // Declared like so in order to allow editing in the dev tools
  // TODO (SR|JG): These need to be adjusted to match the artwork.
  public static readonly SODIUM_SITE_LEFT = new Vector2( -5.2, 8.5 );
  public static readonly SODIUM_SITE_RIGHT = new Vector2( 6.2, 8.5 );
  public static readonly GLUCOSE_SITE_CENTER = new Vector2( 0.65, 3 );

  public constructor( model: TransportProteinModelContext, type: TransportProteinType, position: number ) {
    super( model, type, position, 'openToOutside' );
  }

  public override step( dt: number ): void {
    super.step( dt );

    const slot = this.model.getSlotForTransportProtein( this )!;

    affirm( slot, 'Slot should be non-null' );

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
      leftIon.mode = { type: 'movingThroughTransportProtein', slot: slot, transportProteinType: this.type, direction: 'inward', offset: -5 };
      glucose.mode = { type: 'movingThroughTransportProtein', slot: slot, transportProteinType: this.type, direction: 'inward' };
      rightIon.mode = { type: 'movingThroughTransportProtein', slot: slot, transportProteinType: this.type, direction: 'inward', offset: +5 };
    }

    if ( this.stateProperty.value === 'openToInside' ) {

      // Check to see if the sodium ions or glucose is still passing through
      const numberPassingThrough = this.model.solutes.filter( solute => solute.mode.type === 'movingThroughTransportProtein' &&
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

  public isAvailableForPassiveTransport(): boolean {
    return false;
  }

  public getSitePosition( site: 'left' | 'right' | 'center' ): Vector2 {
    const offset = SodiumGlucoseCotransporter.getSitePositionOffset( site );
    return new Vector2( this.slot.position + offset.x, offset.y );
  }

  public static getSitePositionOffset( site: 'left' | 'right' | 'center' ): Vector2 {

    return site === 'left' ? SodiumGlucoseCotransporter.SODIUM_SITE_LEFT :
           site === 'right' ? SodiumGlucoseCotransporter.SODIUM_SITE_RIGHT :
           site === 'center' ? SodiumGlucoseCotransporter.GLUCOSE_SITE_CENTER :
           ( () => { throw new Error( `Unhandled site: ${site}` ); } )(); // IIFE to throw error
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporter', SodiumGlucoseCotransporter );