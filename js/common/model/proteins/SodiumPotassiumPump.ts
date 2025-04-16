// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium potassium pump.
 *
 * ### LIMITING STEP ONE: 3 × Sodium bind
 * - Conformation change: Phosphate binding site opens
 *
 * ### LIMITING STEP TWO: ATP binds and _release_ PO₄
 * - ADP drifts
 * - PO₄ stays attached
 * - Conformation change (swap sides)
 * - 3 × Sodium released
 *
 * ### LIMITING STEP THREE: 2 × K bind
 * - PO₄ releases
 * - Conformation change (to starting position)
 * - 2 × K release
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import membraneTransport from '../../../membraneTransport.js';
import TransportProteinModelContext from './TransportProteinModelContext.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

type SodiumPotassiumPumpState =
  'openToInsideEmpty' | // Ready to get sodium ions
  'openToInsideSodiumBound' |  // Got the sodium ions, waiting for the phoshpate from ATP
  'openToOutside'; // waiting for the potassium

export default class SodiumPotassiumPump extends TransportProtein<SodiumPotassiumPumpState> {

  // Declared like so, so that they can be adjusted at runtime in the dev tools, like so:
  // phet.membraneTransport.SodiumPotassiumPump.SODIUM_SITE_1.y=-6.5
  // TODO (SR|JG): These need to be adjusted to match the artwork.
  public static readonly SODIUM_SITE_1 = new Vector2( -3.5, -5.6 );
  public static readonly SODIUM_SITE_2 = new Vector2( -3.2, 0.8 );
  public static readonly SODIUM_SITE_3 = new Vector2( 3.5, -2.2 );
  public static readonly PHOSPHATE_SITE = new Vector2( 0, -12 );
  public static readonly POTASSIUM_SITE_1 = new Vector2( 5, 5 );
  public static readonly POTASSIUM_SITE_2 = new Vector2( 5, 10 );

  public constructor(
    model: TransportProteinModelContext,
    type: TransportProteinType,
    position: number
  ) {
    super( model, type, position, 'openToInsideEmpty' );
  }

  private isSiteOpen( site: 'sodium1' | 'sodium2' | 'sodium3' | 'potassium1' | 'potassium2' ): boolean {
    return this.model.solutes.find( solute => ( solute.mode.type === 'moveToSodiumPotassiumPump' ||
                                                solute.mode.type === 'waitingInSodiumPotassiumPump' ) &&
                                              solute.mode.slot === this.slot &&
                                              solute.mode.site === site ) === undefined;
  }

  public override isAvailableForPassiveTransport(): boolean {
    return false;
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

  public getOpenPotassiumSites(): Array<'potassium1' | 'potassium2'> {
    const availableSites: Array<'potassium1' | 'potassium2'> = [];
    if ( this.isSiteOpen( 'potassium1' ) ) {
      availableSites.push( 'potassium1' );
    }
    if ( this.isSiteOpen( 'potassium2' ) ) {
      availableSites.push( 'potassium2' );
    }

    return availableSites;
  }

  public getNumberOfFilledSodiumSites(): number {

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium2' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium3' );

    // Count the number of sodium that are filled
    let numberSodiumFilled = 0;
    if ( sodium1 ) {
      numberSodiumFilled++;
    }
    if ( sodium2 ) {
      numberSodiumFilled++;
    }
    if ( sodium3 ) {
      numberSodiumFilled++;
    }
    return numberSodiumFilled;
  }

  public getNumberOfFilledPotassiumSites(): number {

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'potassium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'potassium2' );

    let numberSitesFilled = 0;
    if ( sodium1 ) {
      numberSitesFilled++;
    }
    if ( sodium2 ) {
      numberSitesFilled++;
    }
    return numberSitesFilled;
  }


  public override step( dt: number ): void {
    super.step( dt );

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium2' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium3' );

    if ( this.stateProperty.value === 'openToInsideEmpty' ) {
      if ( sodium1 && sodium2 && sodium3 ) {
        this.stateProperty.value = 'openToInsideSodiumBound';
      }
    }
    else if ( this.stateProperty.value === 'openToInsideSodiumBound' ) {

      //
    }
    else if ( this.stateProperty.value === 'openToOutside' ) {

      //
    }
  }

  // Open upward, letting sodium go outside the cell
  public openUpward(): void {

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium2' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium3' );
    this.stateProperty.value = 'openToOutside';

    // Move solutes through the open sodium potassium pump
    sodium1!.mode = { type: 'movingThroughTransportProtein', slot: this.slot, transportProteinType: this.type, direction: 'outward', offset: -5 };
    sodium2!.mode = { type: 'movingThroughTransportProtein', slot: this.slot, transportProteinType: this.type, direction: 'outward' };
    sodium3!.mode = { type: 'movingThroughTransportProtein', slot: this.slot, transportProteinType: this.type, direction: 'outward', offset: +5 };
  }

  // Open upward, letting sodium go outside the cell
  public openDownward(): void {

    const potassium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                          solute.mode.slot === this.slot &&
                                                          solute.mode.site === 'potassium1' );
    const potassium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                          solute.mode.slot === this.slot &&
                                                          solute.mode.site === 'potassium2' );
    this.stateProperty.value = 'openToInsideEmpty';

    // Move solutes through the open sodium potassium pump
    potassium1!.mode = { type: 'movingThroughTransportProtein', slot: this.slot, transportProteinType: this.type, direction: 'inward', offset: -5 };
    potassium2!.mode = { type: 'movingThroughTransportProtein', slot: this.slot, transportProteinType: this.type, direction: 'inward' };

    // release the phosphate
    const phosphate = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                         solute.mode.slot === this.slot &&
                                                         solute.mode.site === 'phosphate' );
    if ( phosphate ) {
      phosphate.moveInDirection( new Vector2( 0, -1 ), 0.5 );
    }
  }

  // True if an ATP is on the way or waiting in the site
  public isATPEnRoute(): boolean {

    // check if an ATP is going to the site
    return !!this.model.solutes.find( solute => solute.mode.type === 'moveToSodiumPotassiumPump' &&
                                                solute.mode.slot === this.slot );
  }

  public static getSitePositionOffset( site: 'sodium1' | 'sodium2' | 'sodium3' | 'potassium1' | 'potassium2' | 'phosphate' ): Vector2 {
    return site === 'sodium1' ? SodiumPotassiumPump.SODIUM_SITE_1 :
           site === 'sodium2' ? SodiumPotassiumPump.SODIUM_SITE_2 :
           site === 'sodium3' ? SodiumPotassiumPump.SODIUM_SITE_3 :
           site === 'phosphate' ? SodiumPotassiumPump.PHOSPHATE_SITE :
           site === 'potassium1' ? SodiumPotassiumPump.POTASSIUM_SITE_1 :
           site === 'potassium2' ? SodiumPotassiumPump.POTASSIUM_SITE_2 :
           ( () => { throw new Error( `Unhandled site: ${site}` ); } )(); // IIFE to throw error
  }
}

membraneTransport.register( 'SodiumPotassiumPump', SodiumPotassiumPump );