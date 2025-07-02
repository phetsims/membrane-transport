// Copyright 2025, University of Colorado Boulder

/**
 * Manages descriptions about the solute concentrations and how they change.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import { getFeatureSetSelectableSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import Solute from '../model/Solute.js';
import SoluteType, { SoluteControlSolutes } from '../model/SoluteType.js';

type SoluteComparisonDescriptor = 'equal' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' |
  'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | 'none';

type CrossingEvent = {
  solute: Solute;
  direction: 'inward' | 'outward';
};

type CrossingData = {
  crossingEvents: CrossingEvent[];
};

const descriptionInterval = 5;

export default class SoluteConcentrationDescriber {
  private soluteTypeToCrossingDataMap: Map<SoluteType, CrossingData> = new Map<SoluteType, CrossingData>();
  private timeSinceDescription = 0;
  private isInitialDescription = true;

  public constructor( public readonly model: MembraneTransportModel, public readonly contextResponseNode: Node ) {

    getFeatureSetSelectableSoluteTypes( model.featureSet ).forEach( soluteType => {
      this.soluteTypeToCrossingDataMap.set( soluteType, {
          crossingEvents: []
        }
      );
    } );

    // When there is a crossing event, add it to the corresponding list
    model.soluteCrossedMembraneEmitter.addListener( ( solute, direction ) => {
      this.soluteTypeToCrossingDataMap.get( solute.soluteType )!.crossingEvents.push( {
        solute: solute,
        direction: direction
      } );
    } );
  }

  private clearCrossingData(): void {
    this.soluteTypeToCrossingDataMap.forEach( crossingData => {
      crossingData.crossingEvents.length = 0;
    } );
  }

  public step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {
      this.timeSinceDescription += dt;

      if ( this.timeSinceDescription > descriptionInterval ) {

        // Print the crossing events for each solute type.
        const soluteTypesCrossing = new Set<SoluteType>();
        this.soluteTypeToCrossingDataMap.forEach( ( crossingData, soluteType ) => {
          const insideCount = this.model.countSolutes( soluteType, 'inside' );
          const outsideCount = this.model.countSolutes( soluteType, 'outside' );

          if ( insideCount + outsideCount > 0 ) {

            const inwardCrossingCount = crossingData.crossingEvents.filter( event => event.direction === 'inward' ).length;
            const outwardCrossingCount = crossingData.crossingEvents.filter( event => event.direction === 'outward' ).length;

            if ( inwardCrossingCount > 0 || outwardCrossingCount > 0 ) {
              soluteTypesCrossing.add( soluteType );
            }
          }
        } );

        if ( soluteTypesCrossing.size === 1 ) {

          const soluteType = Array.from( soluteTypesCrossing )[ 0 ];

          const outsideCount = this.model.countSolutes( soluteType, 'outside' );
          const insideCount = this.model.countSolutes( soluteType, 'inside' );
          const comparisonDescription = SoluteConcentrationDescriber.getSoluteComparisonDescriptor( outsideCount, insideCount );

          if ( this.isInitialDescription ) {

            // Initial: {{solute}} crossing membrane, {compareSoluteCompartments}
            this.contextResponseNode.addAccessibleContextResponse( MembraneTransportFluent.a11y.crossingInitialResponse.format( {
              soluteType: soluteType as SoluteControlSolutes,
              amount: comparisonDescription
            } ) );
            this.isInitialDescription = false;
          }
          else {

            // Subsequent: {soluteShortName}, {compareSoluteCompartments}
            this.contextResponseNode.addAccessibleContextResponse( MembraneTransportFluent.a11y.crossingSubsequentResponse.format( {
              soluteType: soluteType as SoluteControlSolutes,
              amount: comparisonDescription
            } ) );
          }
        }

        this.timeSinceDescription = 0;

        // clear the crossing events for the next interval
        this.clearCrossingData();
      }
    }
  }

  public reset(): void {
    this.clearCrossingData();
    this.timeSinceDescription = 0;
    this.isInitialDescription = true;
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

membraneTransport.register( 'SoluteConcentrationDescriber', SoluteConcentrationDescriber );