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
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import { ParticleModeWithSlot } from '../Particle.js';
import MoveToSodiumPotassiumPumpMode from '../particleModes/MoveToSodiumPotassiumPumpMode.js';
import MovingThroughTransportProteinMode from '../particleModes/MovingThroughTransportProteinMode.js';
import WaitingInSodiumPotassiumPumpMode from '../particleModes/WaitingInSodiumPotassiumPumpMode.js';
import Slot from '../Slot.js';
import Solute from '../Solute.js';
import TransportProtein from './TransportProtein.js';
import TransportProteinType from './TransportProteinType.js';

type SodiumPotassiumPumpState =
  'openToInsideEmpty' | // Ready to get sodium ions
  'openToInsideSodiumBound' |  // Got the sodium ions, waiting for the phosphate from ATP
  'openToInsideSodiumAndATPBound' | // Sodium and ATP bound, waiting to release the phosphate and create ADP
  'openToInsideSodiumAndPhosphateBound' | // Got the sodium ions and the phosphate, a short delay before opening to the outside
  'openToOutsideAwaitingPotassium' |
  'openToOutsidePotassiumBound'; // waiting for the potassium

// Delay for the protein to transition from bound and closed to bound and open, in seconds.
const STATE_TRANSITION_INTERVAL = 0.5;

type SodiumPotassiumPumpSite = 'sodium1' | 'sodium2' | 'sodium3' | 'potassium1' | 'potassium2' | 'phosphate' | 'atp';

export default class SodiumPotassiumPump extends TransportProtein<SodiumPotassiumPumpState> {

  private static readonly SODIUM_SITE_1 = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openDownDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.sodiumSite1
  );
  private static readonly SODIUM_SITE_2 = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openDownDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.sodiumSite2
  );
  private static readonly SODIUM_SITE_3 = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openDownDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.sodiumSite3
  );
  private static readonly PHOSPHATE_SITE = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openDownWithPhosphateSiteDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.phosphateSite
  );
  private static readonly ATP_SITE_OPEN_TO_INSIDE = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openDownWithPhosphateSiteDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.atpSiteOpenToInside
  );
  private static readonly PHOSPHATE_SITE_OPEN_TO_INSIDE = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openDownWithPhosphateSiteDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.phosphateSiteOpenToInside
  );
  private static readonly POTASSIUM_SITE_1 = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openUpDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.potassiumSite1
  );
  private static readonly POTASSIUM_SITE_2 = MembraneTransportConstants.getBindingSiteOffset(
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openUpDimension,
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.potassiumSite2
  );

  public constructor(
    model: MembraneTransportModel,
    type: TransportProteinType,
    position: number
  ) {

    // This protein is always 'closed' because it has no states that allow a particle to move through it freely.
    super( model, type, position, 'openToInsideEmpty', [] );

    this.stateProperty.link( state => {
      this.timeSinceStateTransition = 0;
    } );
  }

  private isSiteOpen( site: 'sodium1' | 'sodium2' | 'sodium3' | 'potassium1' | 'potassium2' ): boolean {
    return this.model.solutes.find( solute => ( solute.mode instanceof MoveToSodiumPotassiumPumpMode ||
                                                solute.mode instanceof WaitingInSodiumPotassiumPumpMode ) &&
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
    const sites: SodiumPotassiumPumpSite[] = [ 'sodium1', 'sodium2', 'sodium3' ];
    return sites.filter( site => this.getWaitingSolute( site ) ).length;
  }

  public getNumberOfFilledPotassiumSites(): number {
    const sites: SodiumPotassiumPumpSite[] = [ 'potassium1', 'potassium2' ];
    return sites.filter( site => this.getWaitingSolute( site ) ).length;
  }

  private getWaitingSolute( site: SodiumPotassiumPumpSite ): Solute | undefined {
    return this.model.solutes.find( solute => solute.mode instanceof WaitingInSodiumPotassiumPumpMode &&
                                              solute.mode.slot === this.slot &&
                                              solute.mode.site === site );
  }

  public override step( dt: number ): void {
    super.step( dt );

    const sodium1 = this.getWaitingSolute( 'sodium1' );
    const sodium2 = this.getWaitingSolute( 'sodium2' );
    const sodium3 = this.getWaitingSolute( 'sodium3' );

    if ( this.stateProperty.value === 'openToInsideEmpty' ) {
      if ( sodium1 && sodium2 && sodium3 ) {
        this.stateProperty.value = 'openToInsideSodiumBound';
      }
    }
    else if ( this.timeSinceStateTransition >= STATE_TRANSITION_INTERVAL ) {
      if ( this.stateProperty.value === 'openToInsideSodiumAndATPBound' ) {
        this.splitATP();
      }
      else if ( this.stateProperty.value === 'openToInsideSodiumAndPhosphateBound' ) {
        this.openUpward();
      }
      else if ( this.stateProperty.value === 'openToOutsidePotassiumBound' ) {
        this.openDownward();
      }
    }
  }

  /**
   * After a delay, the bound ATP hydrolyzes into ADP + phosphate
   */
  public splitATP(): void {
    const atp = this.getWaitingSolute( 'phosphate' );

    affirm( atp, 'There should be an ATP if we are trying to split it.' );
    const currentPosition = atp.position;

    const phosphate = this.model.splitATP( currentPosition );

    phosphate.mode = new WaitingInSodiumPotassiumPumpMode(
      this.slot,
      this,
      'phosphate'
    );
    this.model.removeSolute( atp );

    this.stateProperty.value = 'openToInsideSodiumAndPhosphateBound';
  }

  // Open upward, letting sodium go outside the cell
  public openUpward(): void {

    const sodium1 = this.getWaitingSolute( 'sodium1' );
    const sodium2 = this.getWaitingSolute( 'sodium2' );
    const sodium3 = this.getWaitingSolute( 'sodium3' );
    this.stateProperty.value = 'openToOutsideAwaitingPotassium';

    // Move solutes through the open sodium potassium pump
    sodium1!.mode = new MovingThroughTransportProteinMode( this.slot, this.type, 'outward', -5 );
    sodium2!.mode = new MovingThroughTransportProteinMode( this.slot, this.type, 'outward' );
    sodium3!.mode = new MovingThroughTransportProteinMode( this.slot, this.type, 'outward', +5 );
  }

  // Open downward, letting potassium go into the cell
  public openDownward(): void {

    const potassium1 = this.getWaitingSolute( 'potassium1' );
    const potassium2 = this.getWaitingSolute( 'potassium2' );
    this.stateProperty.value = 'openToInsideEmpty';

    // Move solutes through the open sodium potassium pump
    potassium1!.mode = new MovingThroughTransportProteinMode( this.slot, this.type, 'inward', -2 );
    potassium2!.mode = new MovingThroughTransportProteinMode( this.slot, this.type, 'inward', +2 );

    // release the phosphate
    const phosphate = this.getWaitingSolute( 'phosphate' );
    if ( phosphate ) {
      phosphate.moveInDirection( new Vector2( 0, -1 ), 0.5 );
    }
  }

  public getSitePosition( site: SodiumPotassiumPumpSite ): Vector2 {
    const offset = SodiumPotassiumPump.getSitePositionOffset( site, this.stateProperty.value );
    return this.slot.getPositionVector().plus( offset );
  }

  /**
   * For the sodium potassium pump, solutes control the state so the state needs to be reset after clearing.
   * @param slot
   */
  public override clearSolutes( slot: Slot ): void {
    super.clearSolutes( slot );

    this.model.solutes.filter( solute => ( solute.mode as ParticleModeWithSlot ).slot === slot ).forEach( particle => {
      particle.releaseFromInteraction( particle.type === 'potassiumIon' ? 20 : -20 );
    } );

    // Reset the state of the transport protein after clearing interacting particles.
    this.stateProperty.reset();
  }

  public static getSitePositionOffset( site: SodiumPotassiumPumpSite, state: SodiumPotassiumPumpState ): Vector2 {
    return site === 'sodium1' ? SodiumPotassiumPump.SODIUM_SITE_1 :
           site === 'sodium2' ? SodiumPotassiumPump.SODIUM_SITE_2 :
           site === 'sodium3' ? SodiumPotassiumPump.SODIUM_SITE_3 :
           site === 'atp' ? SodiumPotassiumPump.ATP_SITE_OPEN_TO_INSIDE.plusXY( 0, 0 ) :
           site === 'phosphate' && state === 'openToInsideSodiumAndATPBound' ? SodiumPotassiumPump.ATP_SITE_OPEN_TO_INSIDE :
           site === 'phosphate' && state === 'openToInsideSodiumAndPhosphateBound' ? SodiumPotassiumPump.PHOSPHATE_SITE_OPEN_TO_INSIDE.plusXY( 0, -0.5 ) :
           site === 'phosphate' ? SodiumPotassiumPump.PHOSPHATE_SITE :
           site === 'potassium1' ? SodiumPotassiumPump.POTASSIUM_SITE_1 :
           site === 'potassium2' ? SodiumPotassiumPump.POTASSIUM_SITE_2 :
           ( () => { throw new Error( `Unhandled site: ${site}` ); } )(); // IIFE to throw error
  }
}

membraneTransport.register( 'SodiumPotassiumPump', SodiumPotassiumPump );