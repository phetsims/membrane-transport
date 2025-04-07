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
import MembraneTransportModel from '../MembraneTransportModel.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

export default class SodiumPotassiumPump extends TransportProtein<'idle' | 'sodiumBound' | 'openToOutside'> { // TODO: April 7, check on these names, they seem asymmetrical

  public constructor(
    model: MembraneTransportModel,
    type: TransportProteinType,
    position: number
  ) {
    super( model, type, position, 'idle' );
  }

  private isSiteOpen( site: 'sodium1' | 'sodium2' | 'sodium3' | 'potassium1' | 'potassium2' ): boolean {
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

    const sodium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium1' );
    const sodium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium2' );
    const sodium3 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                       solute.mode.slot === this.slot &&
                                                       solute.mode.site === 'sodium3' );

    if ( this.stateProperty.value === 'idle' ) {

      if ( sodium1 && sodium2 && sodium3 ) {
        this.stateProperty.value = 'sodiumBound';
      }
    }
    else if ( this.stateProperty.value === 'sodiumBound' ) {

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
    sodium1!.mode = { type: 'movingThroughChannel', slot: this.slot, transportProteinType: this.type, direction: 'outward', offset: -5 };
    sodium2!.mode = { type: 'movingThroughChannel', slot: this.slot, transportProteinType: this.type, direction: 'outward' };
    sodium3!.mode = { type: 'movingThroughChannel', slot: this.slot, transportProteinType: this.type, direction: 'outward', offset: +5 };
  }

  // Open upward, letting sodium go outside the cell
  public openDownward(): void {

    const potassium1 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                          solute.mode.slot === this.slot &&
                                                          solute.mode.site === 'potassium1' );
    const potassium2 = this.model.solutes.find( solute => solute.mode.type === 'waitingInSodiumPotassiumPump' &&
                                                          solute.mode.slot === this.slot &&
                                                          solute.mode.site === 'potassium2' );
    this.stateProperty.value = 'idle';

    // Move solutes through the open sodium potassium pump
    potassium1!.mode = { type: 'movingThroughChannel', slot: this.slot, transportProteinType: this.type, direction: 'inward', offset: -5 };
    potassium2!.mode = { type: 'movingThroughChannel', slot: this.slot, transportProteinType: this.type, direction: 'inward' };

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
}

membraneTransport.register( 'SodiumPotassiumPump', SodiumPotassiumPump );