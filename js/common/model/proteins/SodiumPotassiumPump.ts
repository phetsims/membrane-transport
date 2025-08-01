// Copyright 2025, University of Colorado Boulder

/**
 * A model component for a sodium potassium pump. This is the most complex transport protein and goes
 * through the following steps and particle interactions:
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

import Emitter from '../../../../../axon/js/Emitter.js';
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

const SodiumPotassiumPumpSiteValues = [ 'sodium1', 'sodium2', 'sodium3', 'potassium1', 'potassium2', 'phosphate', 'atp' ] as const;
type SodiumPotassiumPumpSite = typeof SodiumPotassiumPumpSiteValues[number];

export default class SodiumPotassiumPump extends TransportProtein<SodiumPotassiumPumpState> {

  // Emitters an event when a solute binds to a site on the pump.
  public readonly soluteBoundEmitter = new Emitter<[ SodiumPotassiumPumpSite, 'sodiumIon' | 'potassiumIon' | 'phosphate' ]>( {
    parameters: [
      { validValues: SodiumPotassiumPumpSiteValues },
      { validValues: [ 'sodiumIon', 'potassiumIon', 'phosphate' ] }
    ]
  } );

  // Binding sites for the protein, relative to the center of the slot.
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
    MembraneTransportConstants.IMAGE_METRICS.sodiumPotassiumPump.openUpDimension,
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

  /**
   * The sodium potassium pump does not support passive transport.
   */
  public override isAvailableForPassiveTransport(): boolean {
    return false;
  }

  /**
   * Returns an array of open (not occupied) sites for sodium.
   */
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

  /**
   * Returns an array of open (not occupied) sites for potassium.
   */
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

  /**
   * Returns the number of sodium binding sites that are currently filled.
   */
  public getNumberOfFilledSodiumSites(): number {
    const sites: SodiumPotassiumPumpSite[] = [ 'sodium1', 'sodium2', 'sodium3' ];
    return sites.filter( site => this.getWaitingSolute( site ) ).length;
  }

  /**
   * Returns the number of potassium binding sites that are currently filled.
   */
  public getNumberOfFilledPotassiumSites(): number {
    const sites: SodiumPotassiumPumpSite[] = [ 'potassium1', 'potassium2' ];
    return sites.filter( site => this.getWaitingSolute( site ) ).length;
  }

  /**
   * Returns the solute that is waiting in the specified site, if any.
   */
  private getWaitingSolute( site: SodiumPotassiumPumpSite ): Solute | undefined {
    return this.model.solutes.find( solute => solute.mode instanceof WaitingInSodiumPotassiumPumpMode &&
                                              solute.mode.slot === this.slot &&
                                              solute.mode.site === site );
  }

  /**
   * Handles state transitions when the binding sites are filled.
   */
  public override step( dt: number ): void {
    super.step( dt );

    const sodium1 = this.getWaitingSolute( 'sodium1' );
    const sodium2 = this.getWaitingSolute( 'sodium2' );
    const sodium3 = this.getWaitingSolute( 'sodium3' );

    const potassium1 = this.getWaitingSolute( 'potassium1' );
    const potassium2 = this.getWaitingSolute( 'potassium2' );

    const atp = this.getWaitingSolute( 'atp' );

    /**
     * Gracefully handle the case where a user removed a bound solute. In that case, we must go to a prior state.
     * Note that we don't need special handling for the phosphate, since it can only be released by the eraser button
     * which already resets the protein state.
     */
    if ( this.stateProperty.value === 'openToInsideSodiumBound' && ( !sodium1 || !sodium2 || !sodium3 ) ) {
      this.stateProperty.value = 'openToInsideEmpty';
    }
    if ( this.stateProperty.value === 'openToInsideSodiumAndATPBound' && !atp ) {
      this.stateProperty.value = 'openToInsideSodiumBound';
    }
    if ( this.stateProperty.value === 'openToOutsidePotassiumBound' && ( !potassium1 || !potassium2 ) ) {
      this.stateProperty.value = 'openToOutsideAwaitingPotassium';
    }

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
   * Splits the bound ATP into ADP and phosphate, updates the solutes and state accordingly.
   */
  public splitATP(): void {
    const atp = this.getWaitingSolute( 'atp' );

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

  /**
   * Opens the pump to the outside, releasing sodium ions outward and updating the pump state.
   */
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

  /**
   * Opens the pump to the inside, releasing potassium ions inward and expelling phosphate.
   */
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
   * Clears solutes from the slot and resets the pump state after removing interacting particles.
   */
  public override clearSolutes( slot: Slot ): void {
    super.clearSolutes( slot );

    this.model.solutes.filter( solute => ( solute.mode as ParticleModeWithSlot ).slot === slot ).forEach( particle => {
      particle.releaseFromInteraction( particle.type === 'potassiumIon' ? 20 : -20 );
    } );

    // Reset the state of the transport protein after clearing interacting particles.
    this.stateProperty.reset();
  }

  /**
   * Returns the position offset for the specified site based on the current state of the pump.
   * The offset is relative to the center of the slot.
   */
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