// Copyright 2025, University of Colorado Boulder

/**
 * Manages descriptions about the solute concentrations and how they change.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import _ from '../../../../sherpa/js/lodash.js';
import { AlertableNoUtterance, TAlertable } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProtein from '../model/proteins/TransportProtein.js';
import SoluteCrossedMembraneEvent from '../model/SoluteCrossedMembraneEvent.js';
import SoluteType from '../model/SoluteType.js';

type SoluteComparisonDescriptor = 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' |
  'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' |
  'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | 'none';

// The interval in seconds at which the system will trigger responses.
const DESCRIPTION_INTERVAL = 5;

export default class MembraneTransportDescriber {

  // This system triggers responses at a fixed interval.
  private timeSinceDescription = 0;

  // We keep track of the last response to avoid repeating it unnecessarily.
  private previousResponse: TAlertable | null = null;

  // Keep track of the previous solute comparisons. When any of these change, the description of the new comparison
  // will be added to the response.
  private previousSoluteComparisons: Record<SoluteType, SoluteComparisonDescriptor>;

  private readonly model: MembraneTransportModel;

  // The Node which is used to trigger context responses.
  private readonly contextResponseNode: Node;

  public constructor( model: MembraneTransportModel, contextResponseNode: Node ) {
    this.model = model;
    this.contextResponseNode = contextResponseNode;

    this.previousSoluteComparisons = this.getCleanSoluteComparisons();
  }

  /**
   * Add a context response to the queue. But only if it is different from the previous response
   * to prevent unnecessary repetition.
   */
  private addAccessibleContextResponse( response: AlertableNoUtterance ): void {
    if ( response !== this.previousResponse && response !== '' ) {
      this.contextResponseNode.addAccessibleContextResponse( response );
    }
    this.previousResponse = response;
  }

  /**
   * Step the describer, triggering a response at the interval.
   */
  public step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {
      this.timeSinceDescription += dt;

      if ( this.timeSinceDescription > DESCRIPTION_INTERVAL ) {
        const response = this.getDescriptionFromEventQueue(
          this.model.descriptionEventQueue,
          this.model.focusedProteinProperty.value,
          this.model.getTransportProteins(),
          this.model.insideSoluteCountProperties,
          this.model.outsideSoluteCountProperties
        );

        console.log( response );
        this.addAccessibleContextResponse( response );

        this.timeSinceDescription = 0;

        // The queue should be cleared every time a description is generated to accurately describe
        // at the next interval.
        this.model.clearDescriptionEventQueue();
      }
    }
  }

  /**
   * Reset the map of solute comparisons to a clean state so that any changes will be described.
   */
  private getCleanSoluteComparisons(): Record<SoluteType, SoluteComparisonDescriptor> {
    return {
      oxygen: 'none',
      carbonDioxide: 'none',
      sodiumIon: 'none',
      potassiumIon: 'none',
      glucose: 'none',
      atp: 'none',
      adp: 'none',
      phosphate: 'none'
    };
  }

  public reset(): void {
    this.timeSinceDescription = 0;
    this.previousSoluteComparisons = this.getCleanSoluteComparisons();
  }

  private getDescriptionFromEventQueue(
    queue: SoluteCrossedMembraneEvent[],
    focusedProtein: null | TransportProtein,
    transportProteins: TransportProtein[],
    insideSoluteCountProperties: Record<SoluteType, NumberProperty>,
    outsideSoluteCountProperties: Record<SoluteType, NumberProperty>
  ): string {

    // No description when a protein is focused (to be implemented at another time).
    if ( focusedProtein ) {
      return '';
    }

    // No events to describe.
    if ( queue.length === 0 ) {
      return '';
    }

    // In this implementation, the overall description is built from pieces of information.
    const descriptionParts: string[] = [];

    // If oxygen or carbon dioxide cross the membrane, that information will be included as part of the description
    // of active transport events.
    const oxygenCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'oxygen' );
    const carbonDioxideCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'carbonDioxide' );
    const anySimpleDiffusion = oxygenCrossed || carbonDioxideCrossed;

    // Identify active transport events
    const sodiumPumped = queue.some( e => e.transportProteinType === 'sodiumPotassiumPump' && e.solute.soluteType === 'sodiumIon' );
    const potassiumPumped = queue.some( e => e.transportProteinType === 'sodiumPotassiumPump' && e.solute.soluteType === 'potassiumIon' );
    const cotransported = queue.some( e => e.transportProteinType === 'sodiumGlucoseCotransporter' );
    const anyActiveTransport = sodiumPumped || potassiumPumped || cotransported;

    // Identify simple diffusion events
    const simpleDiffusers = _.uniq( queue.filter( e => e.transportProteinType === null ).map( e => e.solute.soluteType ) );

    // Identify facilitated diffusion events (that were not part of active transport)
    const facilitatedSolutes = _.uniq( queue.filter( e => {
      return ( e.transportProteinType?.includes( 'Leakage' ) || e.transportProteinType?.includes( 'Gated' ) ) &&
             !descriptionParts.some( part => part.toLowerCase().includes( e.solute.soluteType.toLowerCase() ) );
    } ).map( e => e.solute.soluteType ) );

    // Identify all solute types that crossed the membrane
    const solutesThatCrossed = _.uniq( queue.map( event => event.solute.soluteType ) );

    if ( anyActiveTransport ) {

      // When simple diffusion occurs alongside active transport, a summary statement is provided.
      if ( anySimpleDiffusion ) {
        descriptionParts.push( 'multiple solutes crossing' );
      }

      if ( sodiumPumped && potassiumPumped ) {
        descriptionParts.push( 'sodium pumped out and potassium pumped in' );
      }
      else if ( sodiumPumped ) {
        descriptionParts.push( 'sodium pumped out' );
      }
      else if ( potassiumPumped ) {
        descriptionParts.push( 'potassium pumped in' );
      }

      if ( cotransported ) {
        descriptionParts.push( 'sodium and glucose shuttled across' );
      }
    }

    if ( facilitatedSolutes.length > 0 ) {
      const soluteNames = facilitatedSolutes.filter( s => s !== 'adp' && s !== 'phosphate' ).map( s => MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: s } ) ).join( ' and ' );
      descriptionParts.push( `${soluteNames} crossed through channels` );
    }

    if ( simpleDiffusers.length > 0 && descriptionParts.length === 0 && simpleDiffusers[ 0 ] !== 'adp' && simpleDiffusers[ 0 ] !== 'phosphate' ) {
      if ( simpleDiffusers.length === 1 ) {
        descriptionParts.push( `${MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: simpleDiffusers[ 0 ] } )} crossed the membrane` );
      }
      else {
        descriptionParts.push( 'Multiple solutes crossed the membrane' );
      }
    }

    // If after all that, we still have nothing, don't say anything.
    if ( descriptionParts.length === 0 ) {
      return '';
    }

    // Combine the event descriptions
    let response = descriptionParts.join( ' and ' );

    // Capitalize the first letter
    response = response.charAt( 0 ).toUpperCase() + response.slice( 1 );

    // Append the comparison string
    const comparisonString = this.getCompareSoluteCompartmentsIfChanged(
      solutesThatCrossed,
      insideSoluteCountProperties,
      outsideSoluteCountProperties
    );

    if ( comparisonString ) {
      response += `, ${comparisonString}`;
    }

    return response;
  }

  private getCompareSoluteCompartmentsIfChanged(
    solutesThatCrossed: SoluteType[],
    insideSoluteCountProperties: Record<SoluteType, NumberProperty>,
    outsideSoluteCountProperties: Record<SoluteType, NumberProperty>
  ): string {
    const changedComparisons: string[] = [];
    solutesThatCrossed.forEach( soluteType => {
      const comparison = MembraneTransportDescriber.getSoluteComparisonDescriptor(
        outsideSoluteCountProperties[ soluteType ].value,
        insideSoluteCountProperties[ soluteType ].value
      );
      if ( comparison !== this.previousSoluteComparisons[ soluteType ] && soluteType !== 'adp' && soluteType !== 'phosphate' ) {
        const soluteName = MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: soluteType } );
        const comparisonString = this.getSoluteComparisonString( soluteType, insideSoluteCountProperties, outsideSoluteCountProperties );
        changedComparisons.push( `${soluteName}, ${comparisonString}` );
      }
      this.previousSoluteComparisons[ soluteType ] = comparison;
    } );
    return changedComparisons.join( ', ' );
  }

  private getSoluteComparisonString(
    soluteType: SoluteType,
    insideSoluteCountProperties: Record<SoluteType, NumberProperty>,
    outsideSoluteCountProperties: Record<SoluteType, NumberProperty>
  ): string {
    const descriptor = MembraneTransportDescriber.getSoluteComparisonDescriptor(
      outsideSoluteCountProperties[ soluteType ].value,
      insideSoluteCountProperties[ soluteType ].value
    );
    return MembraneTransportFluent.a11y.soluteComparison.format( {
      amount: descriptor
    } );
  }

  private static didSoluteTypeCross( queue: SoluteCrossedMembraneEvent[], soluteType: SoluteType ): boolean {
    return queue.some( event => event.solute.soluteType === soluteType );
  }

  public static getSoluteComparisonDescriptor( outsideAmount: number, insideAmount: number ): SoluteComparisonDescriptor {

    // Thresholds describing the ratio of solute counts inside and outside.
    const MANY_MORE = 2.09;
    const ABOUT_TWICE = 1.9;
    const SOME_MORE = 1.3;
    const ROUGHLY_EQUAL = 1;

    // These could be dividing by zero, but it is handled in the table below.
    const outsideToInside = outsideAmount / insideAmount;
    const insideToOutside = insideAmount / outsideAmount;

    // Equality cases first because otherwise ratios are infinite and exact equality is important to describe.
    return ( outsideAmount === 0 && insideAmount === 0 ) ? 'none' :
           ( insideAmount === 0 && outsideAmount > 0 ) ? 'allOutside' :
           ( outsideAmount === 0 && insideAmount > 0 ) ? 'allInside' :
           ( outsideAmount === insideAmount ) ? 'equal' :

             // More outside than inside
           outsideToInside >= MANY_MORE ? 'manyMoreOutside' :
           outsideToInside >= ABOUT_TWICE ? 'aboutTwiceAsManyOutside' :
           outsideToInside >= SOME_MORE ? 'someMoreOutside' :
           outsideToInside > ROUGHLY_EQUAL ? 'roughlyEqualOutside' :

             // More inside than outside
           insideToOutside >= MANY_MORE ? 'manyMoreInside' :
           insideToOutside >= ABOUT_TWICE ? 'aboutTwiceAsManyInside' :
           insideToOutside >= SOME_MORE ? 'someMoreInside' :
           insideToOutside > ROUGHLY_EQUAL ? 'roughlyEqualInside' :
           ( () => { throw new Error( 'Undescribed counts' ); } )(); // IIFE to throw error
  }
}

membraneTransport.register( 'MembraneTransportDescriber', MembraneTransportDescriber );