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
import LeakageChannel from '../model/proteins/LeakageChannel.js';
import LigandGatedChannel from '../model/proteins/LigandGatedChannel.js';
import SodiumGlucoseCotransporter from '../model/proteins/SodiumGlucoseCotransporter.js';
import SodiumPotassiumPump from '../model/proteins/SodiumPotassiumPump.js';
import TransportProtein from '../model/proteins/TransportProtein.js';
import VoltageGatedChannel from '../model/proteins/VoltageGatedChannel.js';
import SoluteCrossedMembraneEvent from '../model/SoluteCrossedMembraneEvent.js';
import SoluteType from '../model/SoluteType.js';

type SoluteComparisonDescriptor = 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' |
  'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' |
  'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | 'none';

const descriptionInterval = 5;

export default class MembraneTransportDescriber {

  private timeSinceDescription = 0;
  private previousResponse: TAlertable | null = null;

  private previousSoluteComparisons: Record<SoluteType, SoluteComparisonDescriptor> = {
    oxygen: 'none',
    carbonDioxide: 'none',
    sodiumIon: 'none',
    potassiumIon: 'none',
    glucose: 'none',
    atp: 'none',
    adp: 'none',
    phosphate: 'none'
  };

  public constructor( public readonly model: MembraneTransportModel, public readonly contextResponseNode: Node ) {
  }

  private addAccessibleContextResponse( response: AlertableNoUtterance ): void {
    if ( response !== this.previousResponse && response !== '' ) {
      this.contextResponseNode.addAccessibleContextResponse( response );
    }
    this.previousResponse = response;
  }

  public step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {
      this.timeSinceDescription += dt;

      if ( this.timeSinceDescription > descriptionInterval ) {

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

        // Clear the event queue after processing this description.
        this.model.clearDescriptionEventQueue();
      }
    }
  }

  public reset(): void {
    this.timeSinceDescription = 0;
    this.previousSoluteComparisons = {
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

  private getDescriptionFromEventQueue(
    queue: SoluteCrossedMembraneEvent[],
    focusedProtein: null | TransportProtein,
    transportProteins: TransportProtein[],
    insideSoluteCountProperties: Record<SoluteType, NumberProperty>,
    outsideSoluteCountProperties: Record<SoluteType, NumberProperty>
  ): string {

    if ( focusedProtein ) {
      return ''; // No description when a protein is focused
    }

    if ( queue.length === 0 ) {
      return ''; // No events to describe
    }

    const descriptionParts: string[] = [];

    // Identify active transport events
    const sodiumPumped = queue.some( e => e.transportProteinType === 'sodiumPotassiumPump' && e.solute.soluteType === 'sodiumIon' );
    const potassiumPumped = queue.some( e => e.transportProteinType === 'sodiumPotassiumPump' && e.solute.soluteType === 'potassiumIon' );
    const cotransported = queue.some( e => e.transportProteinType === 'sodiumGlucoseCotransporter' );

    if ( sodiumPumped && potassiumPumped ) {
      descriptionParts.push( 'Sodium pumped out and potassium pumped in' );
    }
    else if ( sodiumPumped ) {
      descriptionParts.push( 'Sodium pumped out' );
    }
    else if ( potassiumPumped ) {
      descriptionParts.push( 'Potassium pumped in' );
    }

    if ( cotransported ) {
      descriptionParts.push( 'Sodium and glucose shuttled across membrane' );
    }

    // Identify facilitated diffusion events (that were not part of active transport)
    const facilitatedSolutes = _.uniq( queue.filter( e => {
      return ( e.transportProteinType?.includes( 'Leakage' ) || e.transportProteinType?.includes( 'Gated' ) ) &&
             !descriptionParts.some( part => part.toLowerCase().includes( e.solute.soluteType.toLowerCase() ) );
    } ).map( e => e.solute.soluteType ) );

    if ( facilitatedSolutes.length > 0 ) {
      const soluteNames = facilitatedSolutes.filter( s => s !== 'adp' && s !== 'phosphate' ).map( s => MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: s } ) ).join( ' and ' );
      descriptionParts.push( `${soluteNames} crossed through channels` );
    }

    // Identify simple diffusion events
    const simpleDiffusers = _.uniq( queue.filter( e => e.transportProteinType === null ).map( e => e.solute.soluteType ) );
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
    const solutesThatCrossed = _.uniq( queue.map( event => event.solute.soluteType ) );
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