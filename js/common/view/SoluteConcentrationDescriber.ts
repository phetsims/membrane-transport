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
      return 'focused protein: ' + focusedProtein.type;
    }

    const oxygenCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'oxygen' );
    const carbonDioxideCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'carbonDioxide' );
    const sodiumCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'sodiumIon' );
    const potassiumCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'potassiumIon' );
    const glucoseCrossed = MembraneTransportDescriber.didSoluteTypeCross( queue, 'glucose' );

    const simpleDiffusion = oxygenCrossed || carbonDioxideCrossed;

    const hasFacilitatedDiffusionChannels = transportProteins.some( p =>
      p instanceof LeakageChannel || p instanceof LigandGatedChannel || p instanceof VoltageGatedChannel
    );
    const hasActiveTransporters = transportProteins.some( p =>
      p instanceof SodiumPotassiumPump || p instanceof SodiumGlucoseCotransporter
    );
    const hasNaKPump = transportProteins.some( p => p instanceof SodiumPotassiumPump );
    const hasNaGlucoseCotransporter = transportProteins.some( p => p instanceof SodiumGlucoseCotransporter );

    const sodiumPumpedOut = queue.some( event => event.solute.soluteType === 'sodiumIon' && event.transportProteinType === 'sodiumPotassiumPump' );
    const potassiumPumpedIn = queue.some( event => event.solute.soluteType === 'potassiumIon' && event.transportProteinType === 'sodiumPotassiumPump' );
    const sodiumShuttled = queue.some( event => event.solute.soluteType === 'sodiumIon' && event.transportProteinType === 'sodiumGlucoseCotransporter' );
    const glucoseShuttled = queue.some( event => event.solute.soluteType === 'glucose' && event.transportProteinType === 'sodiumGlucoseCotransporter' );

    const solutesThatCrossed = _.uniq( queue.map( event => event.solute.soluteType ) );
    const compareSoluteCompartmentsIfChanged = this.getCompareSoluteCompartmentsIfChanged(
      solutesThatCrossed,
      insideSoluteCountProperties,
      outsideSoluteCountProperties
    );

    let response = '';

    if ( simpleDiffusion ) {
      if ( !hasActiveTransporters && !hasFacilitatedDiffusionChannels ) {
        if ( oxygenCrossed && !carbonDioxideCrossed ) {
          response = `Oxygen crossing membrane, Oxygen ${this.getSoluteComparisonString( 'oxygen', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
        }
        else if ( !oxygenCrossed && carbonDioxideCrossed ) {
          response = `Carbon Dioxide crossing membrane, Carbon Dioxide ${this.getSoluteComparisonString( 'carbonDioxide', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
        }
        else if ( oxygenCrossed && carbonDioxideCrossed ) {
          response = `Multiple solutes crossing membrane, ${compareSoluteCompartmentsIfChanged}`;
        }
      }
      else if ( !hasActiveTransporters && hasFacilitatedDiffusionChannels ) {
        response = `Multiple solutes crossing membrane, ${compareSoluteCompartmentsIfChanged}`;
      }
      else if ( hasActiveTransporters ) {
        if ( hasNaKPump && !hasNaGlucoseCotransporter ) {
          if ( sodiumPumpedOut && !potassiumPumpedIn ) {
            response = `Multiple solutes crossing membrane and Sodium pumped outside, ${compareSoluteCompartmentsIfChanged}`;
          }
          else if ( !sodiumPumpedOut && potassiumPumpedIn ) {
            response = `Multiple solutes crossing membrane and Potassium pumped inside, ${compareSoluteCompartmentsIfChanged}`;
          }
          else if ( sodiumPumpedOut && potassiumPumpedIn ) {
            response = `Multiple solutes crossing membrane and Sodium pumped outside, Potassium pumped inside, ${compareSoluteCompartmentsIfChanged}`;
          }
        }
        else if ( hasNaGlucoseCotransporter && !hasNaKPump ) {
          if ( sodiumShuttled && glucoseShuttled ) {
            response = `Multiple solutes crossing membrane and Sodium shuttled with Glucose, ${compareSoluteCompartmentsIfChanged}.`;
          }
        }
        else if ( hasNaKPump && hasNaGlucoseCotransporter ) {
          if ( sodiumPumpedOut && sodiumShuttled && !potassiumPumpedIn ) {
            response = `Multiple solutes crossing membrane and Sodium pumped outside and shuttled with Glucose, ${compareSoluteCompartmentsIfChanged}.`;
          }
          else if ( potassiumPumpedIn && sodiumPumpedOut && sodiumShuttled ) {
            response = `Multiple solutes crossing membrane, Potassium pumped inside, sodium pumped outside and shuttled with glucose ${compareSoluteCompartmentsIfChanged}`;
          }
        }
      }
    }
    else {

      // No simple diffusion
      if ( !hasActiveTransporters && hasFacilitatedDiffusionChannels ) {
        if ( sodiumCrossed && !potassiumCrossed ) {
          response = `Sodium crossing membrane, Sodium ${this.getSoluteComparisonString( 'sodiumIon', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
        }
        else if ( !sodiumCrossed && potassiumCrossed ) {
          response = `Potassium crossing membrane, Potassium ${this.getSoluteComparisonString( 'potassiumIon', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
        }
        else if ( sodiumCrossed && potassiumCrossed ) {
          response = `Multiple solutes crossing membrane, ${compareSoluteCompartmentsIfChanged}`;
        }
      }
      else if ( hasActiveTransporters && !hasFacilitatedDiffusionChannels ) {
        if ( hasNaKPump && !hasNaGlucoseCotransporter ) {
          if ( sodiumPumpedOut && !potassiumPumpedIn ) {
            response = `Sodium pumped outside, Sodium ${this.getSoluteComparisonString( 'sodiumIon', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
          }
          else if ( !sodiumPumpedOut && potassiumPumpedIn ) {
            response = `Potassium pumped inside, Potassium, ${this.getSoluteComparisonString( 'potassiumIon', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
          }
          else if ( sodiumPumpedOut && potassiumPumpedIn ) {
            response = `Sodium pumped outside, Potassium pumped inside, ${compareSoluteCompartmentsIfChanged}`;
          }
        }
        else if ( hasNaGlucoseCotransporter && !hasNaKPump ) {
          if ( sodiumShuttled && glucoseShuttled ) {
            response = `Sodium and glucose shuttled across membrane, ${compareSoluteCompartmentsIfChanged}`;
          }
        }
        else if ( hasNaKPump && hasNaGlucoseCotransporter ) {
          if ( sodiumPumpedOut && sodiumShuttled && !potassiumPumpedIn && !glucoseCrossed ) {
            response = `Sodium pumped outside and shuttled with Glucose, ${compareSoluteCompartmentsIfChanged}.`;
          }
          else if ( potassiumPumpedIn && sodiumPumpedOut && sodiumShuttled ) {
            response = `Potassium pumped inside, sodium pumped outside and shuttled with glucose ${compareSoluteCompartmentsIfChanged}`;
          }
        }
      }
      else if ( hasActiveTransporters && hasFacilitatedDiffusionChannels ) {
        if ( hasNaKPump && !hasNaGlucoseCotransporter ) {
          if ( sodiumCrossed && !potassiumCrossed ) {
            response = `Sodium crossing membrane and pumped outside, Sodium ${this.getSoluteComparisonString( 'sodiumIon', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
          }
          else if ( !sodiumCrossed && potassiumCrossed ) {
            response = `Potassium crossing membrane and pumped inside, Potassium ${this.getSoluteComparisonString( 'potassiumIon', insideSoluteCountProperties, outsideSoluteCountProperties )}`;
          }
          else if ( sodiumCrossed && potassiumCrossed ) {
            response = `Multiple solutes crossing membrane and Sodium pumped outside, Potassium pumped inside, ${compareSoluteCompartmentsIfChanged}`;
          }
        }
        else if ( hasNaGlucoseCotransporter && !hasNaKPump ) {
          if ( sodiumShuttled && glucoseShuttled && !potassiumCrossed ) {
            response = `Sodium crossing and shuttled with glucose across membrane, ${compareSoluteCompartmentsIfChanged}`;
          }
          else if ( potassiumCrossed && sodiumShuttled && glucoseShuttled ) {
            response = `Multiple solutes crossing membrane and Sodium shuttled with Glucose, ${compareSoluteCompartmentsIfChanged}.`;
          }
        }
        else if ( hasNaKPump && hasNaGlucoseCotransporter ) {
          if ( sodiumCrossed && glucoseCrossed && !potassiumCrossed ) {
            response = `Multiple solutes crossing membrane and Sodium pumped outside and shuttled with Glucose, ${compareSoluteCompartmentsIfChanged}.`;
          }
          else if ( sodiumCrossed && potassiumCrossed && glucoseCrossed ) {
            response = `Multiple solutes crossing membrane, Potassium pumped inside, sodium pumped outside and shuttled with glucose ${compareSoluteCompartmentsIfChanged}`;
          }
        }
      }
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
      if ( comparison !== this.previousSoluteComparisons[ soluteType ] ) {
        const soluteName = soluteType;
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
    return MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.barChart.comparison.format( {
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