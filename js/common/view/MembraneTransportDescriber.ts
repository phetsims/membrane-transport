// Copyright 2025, University of Colorado Boulder

/**
 * Manages descriptions about the solute concentrations and how they change.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import _ from '../../../../sherpa/js/lodash.js';
import { AlertableNoUtterance, TAlertable } from '../../../../utterance-queue/js/Utterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import SoluteType from '../model/SoluteType.js';

type SoluteComparisonDescriptor = 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' |
  'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'alotMoreOutside' | 'someMoreOutside' |
  'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' |
  'aboutTwiceAsManyInside' | 'alotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' |
  'roughlyEqualInside' | 'none';

type AverageCrossingDirectionDescriptor = 'toOutside' | 'mostlyToOutside' | 'inBothDirections' |
  'mostlyToInside' | 'toInside' | 'none';

type SoluteQualitativeAmountDescriptor = 'none' | 'few' | 'some' | 'smallAmount' |
  'several' | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount';

// These are the model states that will trigger the describer to provide hints to the user to
// encourage productive activity. Each hint state is spoken once until some action occurs that
// resets the state, such as adding/removing solutes, ligands, or proteins.
type HintState = {
  active: boolean; // Is the simulation in a state where a hint is needed?
  provided: boolean; // Has the hint been provided to the user?
};
type HintStates = {
  hasLigandGatedChannelWithoutLigands: HintState;
  hasVoltageGatedChannelAtRestingPotential: HintState;
  hasPumpAwaitingPhosphateWithoutATP: HintState;
  hasSodiumGlucoseCotransporterWithLowOutsideSodium: HintState;
};

// A fundamental snapshot of the simulation state. If any of these change, it indicates that the user
// has done something important. The describer will reset the time since the last hint description
// AND whether hints have been provided.
type FundamentalState = {
  soluteCount: number; // The total number of solutes in the system, both inside and outside.
  proteinCount: number; // The total number of transport proteins in the system.
  ligandsAdded: boolean; // Whether ligands have been added to the system.
};

// The interval in seconds at which the system will trigger responses.
const DESCRIPTION_INTERVAL = 5;

// The interval in seconds at wich the system will trigger a 'hint' response to guide the user to make
// a change.
const HINT_DESCRIPTION_INTERVAL = 20;

export default class MembraneTransportDescriber {

  // This system triggers responses at a fixed interval.
  private timeSinceDescription = 0;
  private timeSinceHintDescription = 0;

  // We keep track of the last response to avoid repeating it unnecessarily.
  private previousResponse: TAlertable | null = null;

  // Keep track of the previous solute comparisons. When any of these change, the description of the new comparison
  // will be added to the response.
  private previousSoluteComparisons: Record<SoluteType, SoluteComparisonDescriptor>;

  // Keep track of the solutes that were in 'steady state' with roughly equal solute counts since the
  // last description. When any solute first enters steady state with roughly equal solute counts,
  // the description of the new steady state will be added to the response.
  private previousSteadyStateMap: Record<SoluteType, boolean>;

  // The states that require hints to be provided to the user, and whether they have been provided yet.
  private hintStates: HintStates;

  // A basic snapshot of the model, when this changes it indicates the user has done something significant.
  private fundamentalState: FundamentalState;

  private readonly model: MembraneTransportModel;

  // The Node which is used to trigger context responses.
  private readonly contextResponseNode: Node;

  public constructor( model: MembraneTransportModel, contextResponseNode: Node ) {
    this.model = model;
    this.contextResponseNode = contextResponseNode;

    this.previousSoluteComparisons = this.getCleanSoluteComparisons();
    this.previousSteadyStateMap = this.getCleanSteadyStates();
    this.hintStates = this.getCleanHintStates();
    this.fundamentalState = this.getCleanFundamentalState();
  }

  /**
   * Add a context response to the queue. But only if it is different from the previous response
   * to prevent unnecessary repetition.
   */
  private addAccessibleContextResponse( response: AlertableNoUtterance ): void {
    if ( response !== this.previousResponse && response !== '' ) {
      console.log( response );
      this.contextResponseNode.addAccessibleContextResponse( response );
    }
    this.previousResponse = response;
  }

  /**
   * Step the describer, triggering a response at the interval.
   */
  public step( dt: number ): void {
    if ( this.model.isPlayingProperty.value ) {

      // If the model has changed significantly, reset the time since the last hint description.
      const updatedFundamentalState = this.getUpdatedFundamentalState();
      if ( MembraneTransportDescriber.areFundamentalStatesDifferent( this.fundamentalState, updatedFundamentalState ) ) {
        this.fundamentalState = updatedFundamentalState;

        // Reset hint timing variables and make sure that none of the hints have been provided yet.
        this.resetAfterFundamentalStateChange();
      }

      //-------------------------------------------------------------------------
      // Regular response describing solute and protein activity
      //-------------------------------------------------------------------------
      this.timeSinceDescription += dt;
      if ( this.timeSinceDescription > DESCRIPTION_INTERVAL ) {
        const response = this.getDescriptionFromEventQueue();

        this.addAccessibleContextResponse( response );

        this.timeSinceDescription = 0;

        // The queue should be cleared every time a description is generated to accurately describe
        // at the next interval.
        this.model.clearDescriptionEventQueue();
      }

      //-------------------------------------------------------------------------
      // Hint response (if needed) to guide the user to productive activity
      //-------------------------------------------------------------------------
      this.hintStates = this.computeHintStates();
      if ( MembraneTransportDescriber.shouldMakeHintDescription( this.hintStates ) ) {
        this.timeSinceHintDescription += dt;
        if ( this.timeSinceHintDescription > HINT_DESCRIPTION_INTERVAL ) {
          const hintResponse = MembraneTransportDescriber.getHintDescription( this.hintStates );
          this.addAccessibleContextResponse( hintResponse );

          this.timeSinceHintDescription = 0;
        }
      }
      else {

        // The simulation is not in a state where a hint is needed, so reset the time and we will start counting
        // again when the next hint is needed.
        this.timeSinceHintDescription = 0;
      }
    }
  }

  /**
   * Returns true if any of the hint states require a hint to be provided to the user.
   */
  private static shouldMakeHintDescription( hintStates: HintStates ): boolean {
    return MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasLigandGatedChannelWithoutLigands ) ||
           MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasVoltageGatedChannelAtRestingPotential ) ||
           MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasPumpAwaitingPhosphateWithoutATP ) ||
           MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasSodiumGlucoseCotransporterWithLowOutsideSodium );
  }

  /**
   * A hint state requires a hint if it is active and has not been provided yet to the user.
   */
  private static doesHintStateRequireHint( hintState: HintState ): boolean {
    return hintState.active && !hintState.provided;
  }

  /**
   * Compute new hint states based on the current model state. The provided flags are kept as-is.
   */
  private computeHintStates(): HintStates {
    return {
      hasLigandGatedChannelWithoutLigands: {
        active: this.hasLigandGatedChannelWithoutLigands(),
        provided: this.hintStates.hasLigandGatedChannelWithoutLigands.provided
      },
      hasVoltageGatedChannelAtRestingPotential: {
        active: this.hasVoltageGatedChannelAtRestingPotential(),
        provided: this.hintStates.hasVoltageGatedChannelAtRestingPotential.provided
      },
      hasPumpAwaitingPhosphateWithoutATP: {
        active: this.hasPumpAwaitingPhosphateWithoutATP(),
        provided: this.hintStates.hasPumpAwaitingPhosphateWithoutATP.provided
      },
      hasSodiumGlucoseCotransporterWithLowOutsideSodium: {
        active: this.hasSodiumGlucoseCotransporterWithLowOutsideSodium(),
        provided: this.hintStates.hasSodiumGlucoseCotransporterWithLowOutsideSodium.provided
      }
    };
  }

  /**
   * One of the states where a hint condition is required. In this case, there are sodium or potassium
   * ligand-gated channels but no ligands have been added.
   */
  private hasLigandGatedChannelWithoutLigands(): boolean {
    const transportProteins = this.model.getTransportProteins();
    const hasSodiumLigandGatedChannel = transportProteins.some( p => p.type === 'sodiumIonLigandGatedChannel' );
    const hasPotassiumLigandGatedChannel = transportProteins.some( p => p.type === 'potassiumIonLigandGatedChannel' );
    return ( hasSodiumLigandGatedChannel || hasPotassiumLigandGatedChannel ) && !this.model.areLigandsAddedProperty.value;
  }

  /**
   * One of the states where a hint condition is required. In this case, there are sodium or potassium
   * voltage-gated channels, and the membrane potential is at resting potential (-70 mV).
   */
  private hasVoltageGatedChannelAtRestingPotential(): boolean {
    const transportProteins = this.model.getTransportProteins();
    const hasSodiumVoltageGatedChannel = transportProteins.some( p => p.type === 'sodiumIonVoltageGatedChannel' );
    const hasPotassiumVoltageGatedChannel = transportProteins.some( p => p.type === 'potassiumIonVoltageGatedChannel' );
    return ( hasSodiumVoltageGatedChannel || hasPotassiumVoltageGatedChannel ) && this.model.membranePotentialProperty.value === -70;
  }

  /**
   * One of the states where a hint condition is required. In this case, there is a sodium-potassium pump
   * that is awaiting phosphate (open to inside and bound to sodium), but there is no ATP inside the cell.
   */
  private hasPumpAwaitingPhosphateWithoutATP(): boolean {
    const transportProteins = this.model.getTransportProteins();
    const sodiumPotassiumPumps = transportProteins.filter( p => p.type === 'sodiumPotassiumPump' );
    const hasPumpAwaitingPhosphate = sodiumPotassiumPumps.some( p => p.stateProperty.value === 'openToInsideSodiumBound' );
    const atpInside = this.model.insideSoluteCountProperties.atp?.value > 0;
    return hasPumpAwaitingPhosphate && !atpInside;
  }

  /**
   * One of the states where a hint condition is required. In this case, there is a sodium-glucose cotransporter
   * and the sodium concentration outside the cell is less than or equal to the sodium concentration inside the cell.
   */
  private hasSodiumGlucoseCotransporterWithLowOutsideSodium(): boolean {
    const transportProteins = this.model.getTransportProteins();
    const hasSodiumGlucoseCotransporter = transportProteins.some( p => p.type === 'sodiumGlucoseCotransporter' );
    const sodiumOutside = this.model.outsideSoluteCountProperties.sodiumIon?.value;
    const sodiumInside = this.model.insideSoluteCountProperties.sodiumIon?.value;
    return hasSodiumGlucoseCotransporter && ( sodiumOutside <= sodiumInside );
  }

  /**
   * Returns a hint description based on the computed states that require a hint.
   * Note that this mutates the hintStates to mark the hints as they are provided.
   */
  private static getHintDescription( hintStates: HintStates ): string {

    // Loop through the hint states and describe all that are required. As they are consumed, mark them as provided.
    const hintDescriptions = [];

    if ( MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasLigandGatedChannelWithoutLigands ) ) {
      hintDescriptions.push( 'Ligand-gated protein closed. Look for ligands' );
      hintStates.hasLigandGatedChannelWithoutLigands.provided = true;
    }
    if ( MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasVoltageGatedChannelAtRestingPotential ) ) {
      hintDescriptions.push( 'Voltage-gated protein closed. Check membrane potential' );
      hintStates.hasVoltageGatedChannelAtRestingPotential.provided = true;
    }
    if ( MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasPumpAwaitingPhosphateWithoutATP ) ) {
      hintDescriptions.push( 'Pump needs phosphate source' );
      hintStates.hasPumpAwaitingPhosphateWithoutATP.provided = true;
    }
    if ( MembraneTransportDescriber.doesHintStateRequireHint( hintStates.hasSodiumGlucoseCotransporterWithLowOutsideSodium ) ) {
      hintDescriptions.push( 'Cotransporter not binding sodium. Check outside sodium levels' );
      hintStates.hasSodiumGlucoseCotransporterWithLowOutsideSodium.provided = true;
    }

    // Combine contents
    return hintDescriptions.join( ', ' );
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

  private getCleanSteadyStates(): Record<SoluteType, boolean> {
    return {
      oxygen: false,
      carbonDioxide: false,
      sodiumIon: false,
      potassiumIon: false,
      glucose: false,
      atp: false,
      adp: false,
      phosphate: false
    };
  }

  /**
   * Returns a clean set of hint states, where all hints are inactive and have not been provided.
   */
  private getCleanHintStates(): HintStates {
    return {
      hasLigandGatedChannelWithoutLigands: { active: false, provided: false },
      hasVoltageGatedChannelAtRestingPotential: { active: false, provided: false },
      hasPumpAwaitingPhosphateWithoutATP: { active: false, provided: false },
      hasSodiumGlucoseCotransporterWithLowOutsideSodium: { active: false, provided: false }
    };
  }

  /**
   * Returns a clean fundamental state.
   */
  private getCleanFundamentalState(): FundamentalState {
    return {
      soluteCount: 0,
      proteinCount: 0,
      ligandsAdded: false
    };
  }

  /**
   * Returns an updated fundamental state based on the current model state.
   */
  private getUpdatedFundamentalState(): FundamentalState {
    return {
      soluteCount: this.model.totalInsideSoluteCountProperty.value + this.model.totalOutsideSoluteCountProperty.value,
      proteinCount: this.model.getTransportProteins().length,
      ligandsAdded: this.model.areLigandsAddedProperty.value
    };
  }

  /**
   * Returns true if the two FundamentalStates are different.
   */
  private static areFundamentalStatesDifferent( previous: FundamentalState, current: FundamentalState ): boolean {
    return previous.soluteCount !== current.soluteCount ||
           previous.proteinCount !== current.proteinCount ||
           previous.ligandsAdded !== current.ligandsAdded;
  }

  /**
   * A full reset of the describer.
   */
  public reset(): void {
    this.timeSinceDescription = 0;
    this.fundamentalState = this.getCleanFundamentalState();
    this.resetAfterFundamentalStateChange();
  }

  /**
   * Reset state tracking variables that should be reset after an important user interaction, like adding/removing solutes or proteins.
   */
  public resetAfterFundamentalStateChange(): void {
    this.hintStates = this.getCleanHintStates();
    this.timeSinceHintDescription = 0;
    this.previousSoluteComparisons = this.getCleanSoluteComparisons();
    this.previousSteadyStateMap = this.getCleanSteadyStates();
  }

  private getDescriptionFromEventQueue(): string {

    // No description when a protein is focused (to be implemented at another time).
    if ( this.model.focusedProteinProperty.value ) {
      return '';
    }

    const queue = this.model.descriptionEventQueue;

    // No events to describe.
    if ( queue.length === 0 ) {
      return '';
    }

    // In this implementation, the overall description is built from pieces of information.
    const descriptionParts: string[] = [];

    // If oxygen or carbon dioxide cross the membrane, that information will be included as part of the description
    // of active transport events.
    const oxygenCrossed = this.didSoluteTypeCross( 'oxygen' );
    const carbonDioxideCrossed = this.didSoluteTypeCross( 'carbonDioxide' );
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
        descriptionParts.push( 'sodium pumped outside and potassium pumped inside' );
      }
      else if ( sodiumPumped ) {
        descriptionParts.push( 'sodium pumped outside' );
      }
      else if ( potassiumPumped ) {
        descriptionParts.push( 'potassium pumped inside' );
      }

      if ( cotransported ) {
        descriptionParts.push( 'sodium and glucose shuttled inside' );
      }
    }

    if ( facilitatedSolutes.length > 0 && facilitatedSolutes[ 0 ] !== 'adp' && facilitatedSolutes[ 0 ] !== 'phosphate' ) {
      if ( facilitatedSolutes.length === 1 ) {
        const facilitatedSolute = facilitatedSolutes[ 0 ];
        if ( this.shouldDescribeComparisons( facilitatedSolute ) ) {
          const directionDescriptor = this.getAverageCrossingDirectionDescriptorFromQueue( facilitatedSolute );
          const directionDescriptionString = MembraneTransportFluent.a11y.soluteAverageCrossingDirection.format( { direction: directionDescriptor } );
          descriptionParts.push( `${MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: facilitatedSolute } )} crossing through channels, ${directionDescriptionString}` );
        }
      }
      else {
        const soluteNames = facilitatedSolutes.filter( s => s !== 'adp' && s !== 'phosphate' ).map( s => MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: s } ) ).join( ' and ' );
        descriptionParts.push( `${soluteNames} crossing through channels` );
      }
    }

    if ( descriptionParts.length === 0 ) {
      if ( simpleDiffusers.length > 0 && simpleDiffusers[ 0 ] !== 'adp' && simpleDiffusers[ 0 ] !== 'phosphate' ) {
        if ( simpleDiffusers.length === 1 ) {
          if ( this.shouldDescribeComparisons( simpleDiffusers[ 0 ] ) ) {
            const directionDescriptor = this.getAverageCrossingDirectionDescriptorFromQueue( simpleDiffusers[ 0 ] );
            const directionDescriptionString = MembraneTransportFluent.a11y.soluteAverageCrossingDirection.format( { direction: directionDescriptor } );
            descriptionParts.push( `${MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: simpleDiffusers[ 0 ] } )} crossing membrane, ${directionDescriptionString}` );
          }
        }
        else {
          descriptionParts.push( 'Multiple solutes crossing' );
        }
      }
    }

    // Combine the event descriptions
    let response = descriptionParts.join( ' and ' );

    // TODO: Capitalize the first letter, see https://github.com/phetsims/membrane-transport/issues/348
    // response = response.charAt( 0 ).toUpperCase() + response.slice( 1 );

    const steadyStateString = this.getEnteredSteadyStateIfChanged( solutesThatCrossed );

    if ( steadyStateString ) {

      // TODO: Fix the commas, see https://github.com/phetsims/membrane-transport/issues/348
      response += `, ${steadyStateString}`;
    }
    const comparisonString = this.getCompareSoluteCompartmentsIfChanged( solutesThatCrossed );

    if ( comparisonString ) {

      // TODO: Fix the commas, see https://github.com/phetsims/membrane-transport/issues/348
      response += `, ${comparisonString}`;
    }

    return response;
  }

  /**
   * Returns true when the describer should describe the relative solute comparisons for the given solute type.
   * This is true when the solute type has changed its comparison since the last description, and
   * it is not in steady state.
   */
  private shouldDescribeComparisons( soluteType: SoluteType ): boolean {
    const currentComparison = MembraneTransportDescriber.getSoluteComparisonDescriptor(
      this.model.outsideSoluteCountProperties[ soluteType ].value,
      this.model.insideSoluteCountProperties[ soluteType ].value
    );
    const previousComparison = this.previousSoluteComparisons[ soluteType ];

    // If the solute is in steady state, don't describe the comparison because we want to hear that it is in steady state.
    // and don't want to make it seem like it is changing.
    const inSteadyState = this.isSteadyState( soluteType );

    return ( currentComparison !== previousComparison ) && !inSteadyState;
  }

  private getCompareSoluteCompartmentsIfChanged( solutesThatCrossed: SoluteType[] ): string {
    const changedComparisons: string[] = [];

    // If only one solute type crossed, we don't need to include the name in the description.
    const includeSoluteName = solutesThatCrossed.length > 1;

    solutesThatCrossed.forEach( soluteType => {
      const comparison = MembraneTransportDescriber.getSoluteComparisonDescriptor(
        this.model.outsideSoluteCountProperties[ soluteType ].value,
        this.model.insideSoluteCountProperties[ soluteType ].value
      );

      if ( this.shouldDescribeComparisons( soluteType ) && soluteType !== 'adp' && soluteType !== 'phosphate' ) {
        const soluteName = MembraneTransportFluent.a11y.soluteBrief.format( { soluteType: soluteType } );
        const comparisonString = this.getSoluteComparisonString( soluteType );

        if ( includeSoluteName ) {
          changedComparisons.push( `${soluteName}, ${comparisonString}` );
        }
        else {
          changedComparisons.push( comparisonString );
        }
      }
      this.previousSoluteComparisons[ soluteType ] = comparison;
    } );
    return changedComparisons.join( ', ' );
  }

  private getEnteredSteadyStateIfChanged( solutesThatCrossed: SoluteType[] ): string {
    const changedSteadyStates: string[] = [];

    solutesThatCrossed.forEach( soluteType => {
      const isSteadyState = this.isSteadyState( soluteType );
      const isRoughlyEqual = MembraneTransportDescriber.isRoughlyEqual(
        this.model.outsideSoluteCountProperties[ soluteType ].value,
        this.model.insideSoluteCountProperties[ soluteType ].value
      );

      console.log( 'soluteType: ', soluteType, ' isSteadyState: ', isSteadyState, ' isRoughlyEqual: ', isRoughlyEqual );

      // The steady-state description should only be included if there are ALSO equal counts of the solute inside and outside. TODO: replace soluteType with brief solute name, see https://github.com/phetsims/membrane-transport/issues/323
      if ( isSteadyState && isRoughlyEqual && !this.previousSteadyStateMap[ soluteType ] ) {
        changedSteadyStates.push( `${soluteType} crossing steadily in both directions, amounts each side roughly equal` );
      }

      this.previousSteadyStateMap[ soluteType ] = isSteadyState;
    } );

    return changedSteadyStates.join( ', ' );
  }

  /**
   * Returns true when the solute type is in 'steady state', according to getAverageCrossingDirectionDescriptor.
   */
  private isSteadyState( soluteType: SoluteType ): boolean {
    return this.getAverageCrossingDirectionDescriptorFromQueue( soluteType ) === 'inBothDirections';
  }

  /**
   * Returns true when the solute type is in 'steady state', according to getAverageCrossingDirectionDescriptor.
   */
  private getAverageCrossingDirectionDescriptorFromQueue( soluteType: SoluteType ): AverageCrossingDirectionDescriptor {
    const crossedInside = this.model.descriptionEventQueue.filter( event => event.solute.soluteType === soluteType && event.direction === 'inward' ).length;
    const crossedOutside = this.model.descriptionEventQueue.filter( event => event.solute.soluteType === soluteType && event.direction === 'outward' ).length;
    return MembraneTransportDescriber.getAverageCrossingDirectionDescriptor( crossedOutside, crossedInside );
  }

  /**
   * Returns true when the outside and inside counts are roughly equal, according to getSoluteComparisonDescriptor.
   */
  private static isRoughlyEqual( outsideCount: number, insideCount: number ): boolean {
    return MembraneTransportDescriber.getSoluteComparisonDescriptor( outsideCount, insideCount ) === 'roughlyEqualInside' ||
           MembraneTransportDescriber.getSoluteComparisonDescriptor( outsideCount, insideCount ) === 'roughlyEqualOutside';
  }

  private getSoluteComparisonString( soluteType: SoluteType ): string {
    const descriptor = MembraneTransportDescriber.getSoluteComparisonDescriptor(
      this.model.outsideSoluteCountProperties[ soluteType ].value,
      this.model.insideSoluteCountProperties[ soluteType ].value
    );
    return MembraneTransportFluent.a11y.soluteComparison.format( {
      amount: descriptor
    } );
  }

  /**
   * Returns true when the solute type has crossed the membrane at all, according to the event queue.
   */
  private didSoluteTypeCross( soluteType: SoluteType ): boolean {
    return this.model.descriptionEventQueue.some( event => event.solute.soluteType === soluteType );
  }

  /**
   * Returns an enum descriptor of the average crossing direction for a solute type based on the number that have crossed in and
   * out of the membrane.
   * @param crossedToOutside - Count of solutes of a type that crossed to the outside
   * @param crossedToInside - Count of solutes of a type that crossed to the inside
   */
  public static getAverageCrossingDirectionDescriptor( crossedToOutside: number, crossedToInside: number ): AverageCrossingDirectionDescriptor {
    const total = crossedToOutside + crossedToInside;

    let descriptor: AverageCrossingDirectionDescriptor = 'none';

    if ( total === 0 ) {
      descriptor = 'none';
    }

    const percentOutward = crossedToOutside / total;
    const percentInward = crossedToInside / total;

    if ( Math.abs( percentOutward - percentInward ) <= 0.3 ) {
      // 0 - 20% difference - in this case the solute is considered to be in steady state
      descriptor = 'inBothDirections';
    }
    if ( percentOutward === 0.95 ) {
      // 100% outward
      descriptor = 'toOutside';
    }
    if ( percentInward === 0.95 ) {
      // 100% inward
      descriptor = 'toInside';
    }
    if ( percentOutward >= 0.6 ) {
      // >= 0.61 outward
      descriptor = 'mostlyToOutside';
    }
    if ( percentInward >= 0.6 ) {
      // >= 0.61 inward
      descriptor = 'mostlyToInside';
    }


    return descriptor;
  }

  public static getSoluteComparisonDescriptor( outsideAmount: number, insideAmount: number ): SoluteComparisonDescriptor {

    // Thresholds describing the ratio of solute counts inside and outside.
    const MANY_MANY_MORE = 5.0;
    const MANY_MORE = 2.1;
    const ABOUT_TWICE = 1.9;
    const A_LOT = 1.7;
    const SOME_MORE = 1.5;
    const LITTLE_BIT = 1.2;
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

           outsideToInside >= MANY_MANY_MORE ? 'manyManyMoreOutside' :
           outsideToInside >= MANY_MORE ? 'manyMoreOutside' :
           outsideToInside >= ABOUT_TWICE ? 'aboutTwiceAsManyOutside' :
           outsideToInside >= A_LOT ? 'alotMoreOutside' :
           outsideToInside >= SOME_MORE ? 'someMoreOutside' :
           outsideToInside >= LITTLE_BIT ? 'littleBitMoreOutside' :
           outsideToInside > ROUGHLY_EQUAL ? 'roughlyEqualOutside' :

             // More inside than outside
           insideToOutside >= MANY_MANY_MORE ? 'manyManyMoreInside' :
           insideToOutside >= MANY_MORE ? 'manyMoreInside' :
           insideToOutside >= ABOUT_TWICE ? 'aboutTwiceAsManyInside' :
           insideToOutside >= A_LOT ? 'alotMoreInside' :
           insideToOutside >= SOME_MORE ? 'someMoreInside' :
           insideToOutside >= LITTLE_BIT ? 'littleBitMoreInside' :
           insideToOutside > ROUGHLY_EQUAL ? 'roughlyEqualInside' :
           ( () => { throw new Error( 'Undescribed counts' ); } )(); // IIFE to throw error
  }

  public static getSoluteQualitativeAmountDescriptor( count: number ): SoluteQualitativeAmountDescriptor {
    const countAsFraction = count / MembraneTransportConstants.MAX_SOLUTE_COUNT;
    return count === 0 ? 'none' :
           count <= 3 ? 'few' :
           countAsFraction <= 0.10 ? 'some' : // = 10% of 300 = 30 solutes
           countAsFraction <= 0.25 ? 'smallAmount' : // = 25% of 300 = 75 solutes
           countAsFraction <= 0.40 ? 'several' : // = 40% of 300 = 120 solutes
           countAsFraction <= 0.60 ? 'many' : // = 60% of 300 = 180 solutes
           countAsFraction <= 0.80 ? 'largeAmount' : // = 80% of 300 = 240 solutes
           countAsFraction < 1 ? 'hugeAmount' : // = up to 300 solutes
           'maxAmount'; // = 300 solutes, the maximum amount

  }

  /**
   * Creates a Property for the qualitative amount descriptor that will change with the countProperty.
   */
  public static createQualitativeAmountDescriptorProperty( countProperty: TReadOnlyProperty<number> ): TReadOnlyProperty<SoluteQualitativeAmountDescriptor> {
    return new DerivedProperty( [ countProperty ], MembraneTransportDescriber.getSoluteQualitativeAmountDescriptor );
  }
}

membraneTransport.register( 'MembraneTransportDescriber', MembraneTransportDescriber );