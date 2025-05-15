/* eslint-disable */
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated 2025-05-15T04:35:25.818Z from membrane-transport-strings_en.yaml

import StringProperty from '../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import FluentUtils from '../../chipper/js/browser/FluentUtils.js';
import { FluentBundle, FluentResource } from '../../chipper/js/browser-and-node/FluentLibrary.js';
import IntentionalAny from '../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from './membraneTransport.js';
import MembraneTransportStrings from './MembraneTransportStrings.js';
import { isTReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';

const getFTL = () => {
  const ftl = `
membrane-transport.title = ${MembraneTransportStrings["membrane-transport"].titleStringProperty.value}

screen.simpleDiffusion = ${MembraneTransportStrings.screen.simpleDiffusionStringProperty.value}

screen.facilitatedDiffusion = ${MembraneTransportStrings.screen.facilitatedDiffusionStringProperty.value}

screen.activeTransport = ${MembraneTransportStrings.screen.activeTransportStringProperty.value}

screen.playground = ${MembraneTransportStrings.screen.playgroundStringProperty.value}

solutes = ${MembraneTransportStrings.solutesStringProperty.value}

oxygen = ${MembraneTransportStrings.oxygenStringProperty.value}

carbonDioxide = ${MembraneTransportStrings.carbonDioxideStringProperty.value}

sodiumIon = ${MembraneTransportStrings.sodiumIonStringProperty.value}

potassiumIon = ${MembraneTransportStrings.potassiumIonStringProperty.value}

glucose = ${MembraneTransportStrings.glucoseStringProperty.value}

atp = ${MembraneTransportStrings.atpStringProperty.value}

outside = ${MembraneTransportStrings.outsideStringProperty.value}

inside = ${MembraneTransportStrings.insideStringProperty.value}

membranePotentialLabels = ${MembraneTransportStrings.membranePotentialLabelsStringProperty.value}

voltageGatedChannels = ${MembraneTransportStrings.voltageGatedChannelsStringProperty.value}

ligandGatedChannels = ${MembraneTransportStrings.ligandGatedChannelsStringProperty.value}

activeTransporters = ${MembraneTransportStrings.activeTransportersStringProperty.value}

leakageChannels = ${MembraneTransportStrings.leakageChannelsStringProperty.value}

sodiumIonNaPlus = ${MembraneTransportStrings.sodiumIonNaPlusStringProperty.value}

potassiumIonKPlus = ${MembraneTransportStrings.potassiumIonKPlusStringProperty.value}

NaPlusKPlusPump = ${MembraneTransportStrings.NaPlusKPlusPumpStringProperty.value}

sodiumGlucoseCotransporter = ${MembraneTransportStrings.sodiumGlucoseCotransporterStringProperty.value}

membranePotential_mV = ${MembraneTransportStrings.membranePotential_mVStringProperty.value}

signs = ${MembraneTransportStrings.signsStringProperty.value}

addLigands = ${MembraneTransportStrings.addLigandsStringProperty.value}

removeLigands = ${MembraneTransportStrings.removeLigandsStringProperty.value}

animateLipids = ${MembraneTransportStrings.animateLipidsStringProperty.value}

animateLipidsDescription = ${MembraneTransportStrings.animateLipidsDescriptionStringProperty.value}

soluteConcentrations = ${MembraneTransportStrings.soluteConcentrationsStringProperty.value}

a11y_summary_playAreaSummaryIntro = ${MembraneTransportStrings.a11y.summary.playAreaSummaryIntroStringProperty.value}

a11y_summary_playAreaSummarySolutes = ${MembraneTransportStrings.a11y.summary.playAreaSummarySolutesStringProperty.value}

a11y_summary_playAreaSummaryProteins = ${MembraneTransportStrings.a11y.summary.playAreaSummaryProteinsStringProperty.value}

a11y_summary_playAreaSummaryPotential = ${MembraneTransportStrings.a11y.summary.playAreaSummaryPotentialStringProperty.value}

a11y_summary_playAreaSummaryBarCharts = ${MembraneTransportStrings.a11y.summary.playAreaSummaryBarChartsStringProperty.value}

a11y_summary_playAreaSummaryScreen1 = ${MembraneTransportStrings.a11y.summary.playAreaSummaryScreen1StringProperty.value}

a11y_summary_playAreaSummaryScreen2and4 = ${MembraneTransportStrings.a11y.summary.playAreaSummaryScreen2and4StringProperty.value}

a11y_summary_playAreaSummaryScreen3 = ${MembraneTransportStrings.a11y.summary.playAreaSummaryScreen3StringProperty.value}

a11y_summary_controlAreaSummary = ${MembraneTransportStrings.a11y.summary.controlAreaSummaryStringProperty.value}

a11y_summary_interactionHint = ${MembraneTransportStrings.a11y.summary.interactionHintStringProperty.value}

a11y_summary_interactionHintWithTransportProteins = ${MembraneTransportStrings.a11y.summary.interactionHintWithTransportProteinsStringProperty.value}

a11y_observationWindow_membrane_accessibleName = ${MembraneTransportStrings.a11y.observationWindow.membrane.accessibleNameStringProperty.value}

a11y_soluteControls_accessibleHeading = ${MembraneTransportStrings.a11y.soluteControls.accessibleHeadingStringProperty.value}

a11y_eraseSolutesButton_accessibleName = ${MembraneTransportStrings.a11y.eraseSolutesButton.accessibleNameStringProperty.value}

a11y_eraseSolutesButton_accessibleContextResponse = ${MembraneTransportStrings.a11y.eraseSolutesButton.accessibleContextResponseStringProperty.value}

a11y_transportProteinPanel_transportProteins = ${MembraneTransportStrings.a11y.transportProteinPanel.transportProteinsStringProperty.value}

a11y_transportProteinPanel_accessibleHelpText = ${MembraneTransportStrings.a11y.transportProteinPanel.accessibleHelpTextStringProperty.value}

a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated = ${MembraneTransportStrings.a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty.value}

a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated = ${MembraneTransportStrings.a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty.value}

a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage = ${MembraneTransportStrings.a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty.value}

a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage = ${MembraneTransportStrings.a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleNameStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleNameStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleNameStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_accessibleHelpText = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.accessibleHelpTextStringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative70 = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponseNegative70StringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative50 = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponseNegative50StringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponsePositive30 = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponsePositive30StringProperty.value}

a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_uncheckedContextResponse = ${MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.uncheckedContextResponseStringProperty.value}

a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump = ${MembraneTransportStrings.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty.value}

a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter = ${MembraneTransportStrings.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty.value}

a11y_transportProteinPanel_toolAccessibleHelpText = ${MembraneTransportStrings.a11y.transportProteinPanel.toolAccessibleHelpTextStringProperty.value}

a11y_ligandNode_starLigand = ${MembraneTransportStrings.a11y.ligandNode.starLigandStringProperty.value}

a11y_ligandNode_triangleLigand = ${MembraneTransportStrings.a11y.ligandNode.triangleLigandStringProperty.value}

a11y_ligandNode_accessibleHelpText = ${MembraneTransportStrings.a11y.ligandNode.accessibleHelpTextStringProperty.value}

a11y_ligandNode_releasedLigand = ${MembraneTransportStrings.a11y.ligandNode.releasedLigandStringProperty.value}

a11y_ligandNode_grabbedLigand = ${MembraneTransportStrings.a11y.ligandNode.grabbedLigandStringProperty.value}

a11y_ligandNode_ligandReleasedOffMembranePattern = ${MembraneTransportStrings.a11y.ligandNode.ligandReleasedOffMembranePatternStringProperty.value}

a11y_ligandNode_ligandReleasedOnProteinPattern = ${MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty.value}

a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern = ${MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty.value}

a11y_ligandNode_ligandMovedToSlotPattern = ${MembraneTransportStrings.a11y.ligandNode.ligandMovedToSlotPatternStringProperty.value}

a11y_ligandNode_ligandUnboundAlert = ${MembraneTransportStrings.a11y.ligandNode.ligandUnboundAlertStringProperty.value}

a11y_ligandNode_thereIsNoProteinAtThisSlot = ${MembraneTransportStrings.a11y.ligandNode.thereIsNoProteinAtThisSlotStringProperty.value}

a11y_ligandNode_thereIsProteinAtThisSlotPattern = ${MembraneTransportStrings.a11y.ligandNode.thereIsProteinAtThisSlotPatternStringProperty.value}

a11y_ligandNode_moveCancelledPattern = ${MembraneTransportStrings.a11y.ligandNode.moveCancelledPatternStringProperty.value}

a11y_ligandNode_cannotInteractWhileLigandIsBoundPattern = ${MembraneTransportStrings.a11y.ligandNode.cannotInteractWhileLigandIsBoundPatternStringProperty.value}

a11y_soluteControlsAccessibleHelpText = ${MembraneTransportStrings.a11y.soluteControlsAccessibleHelpTextStringProperty.value}

a11y_outsideMembraneSpinnerAccessibleName = ${MembraneTransportStrings.a11y.outsideMembraneSpinnerAccessibleNameStringProperty.value}

a11y_outsideMembraneSpinnerHelpText = ${MembraneTransportStrings.a11y.outsideMembraneSpinnerHelpTextStringProperty.value}

a11y_insideMembraneSpinnerAccessibleName = ${MembraneTransportStrings.a11y.insideMembraneSpinnerAccessibleNameStringProperty.value}

a11y_insideMembraneSpinnerHelpText = ${MembraneTransportStrings.a11y.insideMembraneSpinnerHelpTextStringProperty.value}

a11y_soluteSpinnerRoleDescription = ${MembraneTransportStrings.a11y.soluteSpinnerRoleDescriptionStringProperty.value}

a11y_solute = ${MembraneTransportStrings.a11y.soluteStringProperty.value}

a11y_soluteSpinnerObjectResponsePattern = ${MembraneTransportStrings.a11y.soluteSpinnerObjectResponsePatternStringProperty.value}

a11y_soluteSpinnerContextResponsePattern = ${MembraneTransportStrings.a11y.soluteSpinnerContextResponsePatternStringProperty.value}

a11y_soluteBarChartsDescriptionParagraph = ${MembraneTransportStrings.a11y.soluteBarChartsDescriptionParagraphStringProperty.value}

a11y_arrowSizeDescription = ${MembraneTransportStrings.a11y.arrowSizeDescriptionStringProperty.value}

a11y_arrowDirectionDescription = ${MembraneTransportStrings.a11y.arrowDirectionDescriptionStringProperty.value}

a11y_barSizeDescription = ${MembraneTransportStrings.a11y.barSizeDescriptionStringProperty.value}

a11y_barChartPattern = ${MembraneTransportStrings.a11y.barChartPatternStringProperty.value}

a11y_currentDetailsActivityLevel = ${MembraneTransportStrings.a11y.currentDetailsActivityLevelStringProperty.value}

a11y_currentDetails = ${MembraneTransportStrings.a11y.currentDetailsStringProperty.value}

a11y_currentDetailsSoluteTypesOnOutside = ${MembraneTransportStrings.a11y.currentDetailsSoluteTypesOnOutsideStringProperty.value}

a11y_currentDetailsSoluteTypesOnInside = ${MembraneTransportStrings.a11y.currentDetailsSoluteTypesOnInsideStringProperty.value}

a11y_currentDetailsTransportProteins = ${MembraneTransportStrings.a11y.currentDetailsTransportProteinsStringProperty.value}

a11y_ligandsOnOutsideOnly = ${MembraneTransportStrings.a11y.ligandsOnOutsideOnlyStringProperty.value}

a11y_currentDetailsMembranePotential = ${MembraneTransportStrings.a11y.currentDetailsMembranePotentialStringProperty.value}

a11y_releasedBackInToolbox = ${MembraneTransportStrings.a11y.releasedBackInToolboxStringProperty.value}

a11y_selectedTransportProteinInSlot = ${MembraneTransportStrings.a11y.selectedTransportProteinInSlotStringProperty.value}

a11y_canceledBackInMembrane = ${MembraneTransportStrings.a11y.canceledBackInMembraneStringProperty.value}

a11y_grabbedProteinResponsePattern = ${MembraneTransportStrings.a11y.grabbedProteinResponsePatternStringProperty.value}

a11y_grabbedProteinResponseWithHintPattern = ${MembraneTransportStrings.a11y.grabbedProteinResponseWithHintPatternStringProperty.value}

a11y_ligandToggleButtonAccessibleHelpText = ${MembraneTransportStrings.a11y.ligandToggleButtonAccessibleHelpTextStringProperty.value}

a11y_ligandToggleButtonAddedContextResponse = ${MembraneTransportStrings.a11y.ligandToggleButtonAddedContextResponseStringProperty.value}

a11y_ligandToggleButtonRemovedContextResponse = ${MembraneTransportStrings.a11y.ligandToggleButtonRemovedContextResponseStringProperty.value}

a11y_grabbedLigandResponsePattern = ${MembraneTransportStrings.a11y.grabbedLigandResponsePatternStringProperty.value}

a11y_grabbedLigandResponseWithHintPattern = ${MembraneTransportStrings.a11y.grabbedLigandResponseWithHintPatternStringProperty.value}

a11y_grabbedLigandResponseWithEmptyMembraneHintPattern = ${MembraneTransportStrings.a11y.grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty.value}

a11y_transportProteinBriefName = ${MembraneTransportStrings.a11y.transportProteinBriefNameStringProperty.value}

a11y_ligandMovedAboveLigandGatedChannelPattern = ${MembraneTransportStrings.a11y.ligandMovedAboveLigandGatedChannelPatternStringProperty.value}

a11y_ligandMovedAboveLeakageChannelPattern = ${MembraneTransportStrings.a11y.ligandMovedAboveLeakageChannelPatternStringProperty.value}

a11y_ligandMovedAboveOtherChannelPattern = ${MembraneTransportStrings.a11y.ligandMovedAboveOtherChannelPatternStringProperty.value}

a11y_transportProtein_accessibleNamePattern = ${MembraneTransportStrings.a11y.transportProtein.accessibleNamePatternStringProperty.value}
`;
  return ftl;
};

const formatPattern = ( key: string, args: IntentionalAny ): string => {
  const bundle   = new FluentBundle( 'en' );
  const resource = new FluentResource( getFTL() );
  const errors   = bundle.addResource( resource );
  assert && assert( errors.length === 0, 'Errors when adding resource for locale en' );

  const newArgs = FluentUtils.handleFluentArgs( args );

  const message = bundle.getMessage( key );
  const result  = bundle.formatPattern( message!.value!, newArgs, errors );
  assert && assert( errors.length === 0, `Fluent errors found when formatting message: ${errors}` );
  return result;
};

const formatToProperty = ( key: string, args: IntentionalAny ): TReadOnlyProperty<string> => {
  const initialValue = formatPattern( key, args );
  const stringProperty = new StringProperty( initialValue );

  const update = () => {
    stringProperty.value = formatPattern( key, args );
  };

  // Whenever any arg changes update the string property
  Object.values( args ).forEach( arg => {
    if ( isTReadOnlyProperty( arg ) ) {
      arg.lazyLink( update )
    }
  } );

  // TODO: When the locale changes or when a string forming the FTL changes, also update the string property, see https://github.com/phetsims/chipper/issues/1588

  return stringProperty;
};

const MembraneTransportFluent = {
  "membrane-transport.title": {
    format: ( args: IntentionalAny ): string => formatPattern( 'membrane-transport.title', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'membrane-transport.title', args )
  },
  "screen.simpleDiffusion": {
    format: ( args: IntentionalAny ): string => formatPattern( 'screen.simpleDiffusion', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'screen.simpleDiffusion', args )
  },
  "screen.facilitatedDiffusion": {
    format: ( args: IntentionalAny ): string => formatPattern( 'screen.facilitatedDiffusion', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'screen.facilitatedDiffusion', args )
  },
  "screen.activeTransport": {
    format: ( args: IntentionalAny ): string => formatPattern( 'screen.activeTransport', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'screen.activeTransport', args )
  },
  "screen.playground": {
    format: ( args: IntentionalAny ): string => formatPattern( 'screen.playground', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'screen.playground', args )
  },
  solutes: {
    format: ( args: IntentionalAny ): string => formatPattern( 'solutes', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'solutes', args )
  },
  oxygen: {
    format: ( args: IntentionalAny ): string => formatPattern( 'oxygen', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'oxygen', args )
  },
  carbonDioxide: {
    format: ( args: IntentionalAny ): string => formatPattern( 'carbonDioxide', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'carbonDioxide', args )
  },
  sodiumIon: {
    format: ( args: IntentionalAny ): string => formatPattern( 'sodiumIon', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'sodiumIon', args )
  },
  potassiumIon: {
    format: ( args: IntentionalAny ): string => formatPattern( 'potassiumIon', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'potassiumIon', args )
  },
  glucose: {
    format: ( args: IntentionalAny ): string => formatPattern( 'glucose', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'glucose', args )
  },
  atp: {
    format: ( args: IntentionalAny ): string => formatPattern( 'atp', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'atp', args )
  },
  outside: {
    format: ( args: IntentionalAny ): string => formatPattern( 'outside', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'outside', args )
  },
  inside: {
    format: ( args: IntentionalAny ): string => formatPattern( 'inside', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'inside', args )
  },
  membranePotentialLabels: {
    format: ( args: IntentionalAny ): string => formatPattern( 'membranePotentialLabels', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'membranePotentialLabels', args )
  },
  voltageGatedChannels: {
    format: ( args: IntentionalAny ): string => formatPattern( 'voltageGatedChannels', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'voltageGatedChannels', args )
  },
  ligandGatedChannels: {
    format: ( args: IntentionalAny ): string => formatPattern( 'ligandGatedChannels', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'ligandGatedChannels', args )
  },
  activeTransporters: {
    format: ( args: IntentionalAny ): string => formatPattern( 'activeTransporters', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'activeTransporters', args )
  },
  leakageChannels: {
    format: ( args: IntentionalAny ): string => formatPattern( 'leakageChannels', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'leakageChannels', args )
  },
  sodiumIonNaPlus: {
    format: ( args: IntentionalAny ): string => formatPattern( 'sodiumIonNaPlus', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'sodiumIonNaPlus', args )
  },
  potassiumIonKPlus: {
    format: ( args: IntentionalAny ): string => formatPattern( 'potassiumIonKPlus', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'potassiumIonKPlus', args )
  },
  NaPlusKPlusPump: {
    format: ( args: IntentionalAny ): string => formatPattern( 'NaPlusKPlusPump', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'NaPlusKPlusPump', args )
  },
  sodiumGlucoseCotransporter: {
    format: ( args: IntentionalAny ): string => formatPattern( 'sodiumGlucoseCotransporter', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'sodiumGlucoseCotransporter', args )
  },
  membranePotential_mV: {
    format: ( args: IntentionalAny ): string => formatPattern( 'membranePotential_mV', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'membranePotential_mV', args )
  },
  signs: {
    format: ( args: IntentionalAny ): string => formatPattern( 'signs', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'signs', args )
  },
  addLigands: {
    format: ( args: IntentionalAny ): string => formatPattern( 'addLigands', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'addLigands', args )
  },
  removeLigands: {
    format: ( args: IntentionalAny ): string => formatPattern( 'removeLigands', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'removeLigands', args )
  },
  animateLipids: {
    format: ( args: IntentionalAny ): string => formatPattern( 'animateLipids', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'animateLipids', args )
  },
  animateLipidsDescription: {
    format: ( args: IntentionalAny ): string => formatPattern( 'animateLipidsDescription', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'animateLipidsDescription', args )
  },
  soluteConcentrations: {
    format: ( args: IntentionalAny ): string => formatPattern( 'soluteConcentrations', args ),
    createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'soluteConcentrations', args )
  },
  a11y: {
    summary: {
      playAreaSummaryIntro: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryIntro', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryIntro', args )
      },
      playAreaSummarySolutes: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummarySolutes', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummarySolutes', args )
      },
      playAreaSummaryProteins: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryProteins', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryProteins', args )
      },
      playAreaSummaryPotential: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryPotential', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryPotential', args )
      },
      playAreaSummaryBarCharts: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryBarCharts', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryBarCharts', args )
      },
      playAreaSummaryScreen1: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryScreen1', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryScreen1', args )
      },
      playAreaSummaryScreen2and4: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryScreen2and4', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryScreen2and4', args )
      },
      playAreaSummaryScreen3: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_playAreaSummaryScreen3', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_playAreaSummaryScreen3', args )
      },
      controlAreaSummary: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_controlAreaSummary', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_controlAreaSummary', args )
      },
      interactionHint: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_interactionHint', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_interactionHint', args )
      },
      interactionHintWithTransportProteins: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_summary_interactionHintWithTransportProteins', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_summary_interactionHintWithTransportProteins', args )
      }
    },
    observationWindow: {
      membrane: {
        accessibleName: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_observationWindow_membrane_accessibleName', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_observationWindow_membrane_accessibleName', args )
        }
      }
    },
    soluteControls: {
      accessibleHeading: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_soluteControls_accessibleHeading', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_soluteControls_accessibleHeading', args )
      }
    },
    eraseSolutesButton: {
      accessibleName: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_eraseSolutesButton_accessibleName', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_eraseSolutesButton_accessibleName', args )
      },
      accessibleContextResponse: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_eraseSolutesButton_accessibleContextResponse', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_eraseSolutesButton_accessibleContextResponse', args )
      }
    },
    transportProteinPanel: {
      transportProteins: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_transportProteins', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_transportProteins', args )
      },
      accessibleHelpText: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_accessibleHelpText', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_accessibleHelpText', args )
      },
      ligandGatedChannelPanel: {
        sodiumIonNaPlusLigandGated: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', args )
        },
        potassiumIonKPlusLigandGated: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', args )
        }
      },
      leakageChannelPanel: {
        sodiumIonNaPlusLeakage: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', args )
        },
        potassiumIonKPlusLeakage: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', args )
        }
      },
      voltageGatedChannelPanel: {
        sodiumIonNaPlusVoltageGated: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', args )
        },
        potassiumIonKPlusVoltageGated: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', args )
        },
        membranePotential: {
          radioButtonGroup: {
            accessibleName: {
              format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', args ),
              createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', args )
            },
            accessibleHelpText: {
              format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText', args ),
              createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText', args )
            },
            negative70RadioButton: {
              accessibleName: {
                format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName', args ),
                createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName', args )
              }
            },
            negative50RadioButton: {
              accessibleName: {
                format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName', args ),
                createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName', args )
              }
            },
            positive30RadioButton: {
              accessibleName: {
                format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName', args ),
                createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName', args )
              }
            }
          }
        },
        signsCheckbox: {
          accessibleHelpText: {
            format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_accessibleHelpText', args ),
            createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_accessibleHelpText', args )
          },
          checkedContextResponseNegative70: {
            format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative70', args ),
            createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative70', args )
          },
          checkedContextResponseNegative50: {
            format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative50', args ),
            createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative50', args )
          },
          checkedContextResponsePositive30: {
            format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponsePositive30', args ),
            createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponsePositive30', args )
          },
          uncheckedContextResponse: {
            format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_uncheckedContextResponse', args ),
            createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_uncheckedContextResponse', args )
          }
        }
      },
      activeTransportProteinPanel: {
        sodiumPotassiumPump: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', args )
        },
        sodiumGlucoseCotransporter: {
          format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', args ),
          createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', args )
        }
      },
      toolAccessibleHelpText: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinPanel_toolAccessibleHelpText', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinPanel_toolAccessibleHelpText', args )
      }
    },
    ligandNode: {
      starLigand: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_starLigand', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_starLigand', args )
      },
      triangleLigand: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_triangleLigand', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_triangleLigand', args )
      },
      accessibleHelpText: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_accessibleHelpText', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_accessibleHelpText', args )
      },
      releasedLigand: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_releasedLigand', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_releasedLigand', args )
      },
      grabbedLigand: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_grabbedLigand', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_grabbedLigand', args )
      },
      ligandReleasedOffMembranePattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_ligandReleasedOffMembranePattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_ligandReleasedOffMembranePattern', args )
      },
      ligandReleasedOnProteinPattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_ligandReleasedOnProteinPattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_ligandReleasedOnProteinPattern', args )
      },
      ligandReleasedOnBusyOrIncompatibleProteinPattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern', args )
      },
      ligandMovedToSlotPattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_ligandMovedToSlotPattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_ligandMovedToSlotPattern', args )
      },
      ligandUnboundAlert: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_ligandUnboundAlert', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_ligandUnboundAlert', args )
      },
      thereIsNoProteinAtThisSlot: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_thereIsNoProteinAtThisSlot', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_thereIsNoProteinAtThisSlot', args )
      },
      thereIsProteinAtThisSlotPattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_thereIsProteinAtThisSlotPattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_thereIsProteinAtThisSlotPattern', args )
      },
      moveCancelledPattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_moveCancelledPattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_moveCancelledPattern', args )
      },
      cannotInteractWhileLigandIsBoundPattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandNode_cannotInteractWhileLigandIsBoundPattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandNode_cannotInteractWhileLigandIsBoundPattern', args )
      }
    },
    soluteControlsAccessibleHelpText: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_soluteControlsAccessibleHelpText', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_soluteControlsAccessibleHelpText', args )
    },
    outsideMembraneSpinnerAccessibleName: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_outsideMembraneSpinnerAccessibleName', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_outsideMembraneSpinnerAccessibleName', args )
    },
    outsideMembraneSpinnerHelpText: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_outsideMembraneSpinnerHelpText', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_outsideMembraneSpinnerHelpText', args )
    },
    insideMembraneSpinnerAccessibleName: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_insideMembraneSpinnerAccessibleName', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_insideMembraneSpinnerAccessibleName', args )
    },
    insideMembraneSpinnerHelpText: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_insideMembraneSpinnerHelpText', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_insideMembraneSpinnerHelpText', args )
    },
    soluteSpinnerRoleDescription: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_soluteSpinnerRoleDescription', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_soluteSpinnerRoleDescription', args )
    },
    solute: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_solute', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_solute', args )
    },
    soluteSpinnerObjectResponsePattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_soluteSpinnerObjectResponsePattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_soluteSpinnerObjectResponsePattern', args )
    },
    soluteSpinnerContextResponsePattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_soluteSpinnerContextResponsePattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_soluteSpinnerContextResponsePattern', args )
    },
    soluteBarChartsDescriptionParagraph: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_soluteBarChartsDescriptionParagraph', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_soluteBarChartsDescriptionParagraph', args )
    },
    arrowSizeDescription: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_arrowSizeDescription', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_arrowSizeDescription', args )
    },
    arrowDirectionDescription: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_arrowDirectionDescription', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_arrowDirectionDescription', args )
    },
    barSizeDescription: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_barSizeDescription', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_barSizeDescription', args )
    },
    barChartPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_barChartPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_barChartPattern', args )
    },
    currentDetailsActivityLevel: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_currentDetailsActivityLevel', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_currentDetailsActivityLevel', args )
    },
    currentDetails: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_currentDetails', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_currentDetails', args )
    },
    currentDetailsSoluteTypesOnOutside: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_currentDetailsSoluteTypesOnOutside', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_currentDetailsSoluteTypesOnOutside', args )
    },
    currentDetailsSoluteTypesOnInside: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_currentDetailsSoluteTypesOnInside', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_currentDetailsSoluteTypesOnInside', args )
    },
    currentDetailsTransportProteins: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_currentDetailsTransportProteins', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_currentDetailsTransportProteins', args )
    },
    ligandsOnOutsideOnly: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandsOnOutsideOnly', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandsOnOutsideOnly', args )
    },
    currentDetailsMembranePotential: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_currentDetailsMembranePotential', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_currentDetailsMembranePotential', args )
    },
    releasedBackInToolbox: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_releasedBackInToolbox', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_releasedBackInToolbox', args )
    },
    selectedTransportProteinInSlot: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_selectedTransportProteinInSlot', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_selectedTransportProteinInSlot', args )
    },
    canceledBackInMembrane: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_canceledBackInMembrane', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_canceledBackInMembrane', args )
    },
    grabbedProteinResponsePattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_grabbedProteinResponsePattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_grabbedProteinResponsePattern', args )
    },
    grabbedProteinResponseWithHintPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_grabbedProteinResponseWithHintPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_grabbedProteinResponseWithHintPattern', args )
    },
    ligandToggleButtonAccessibleHelpText: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandToggleButtonAccessibleHelpText', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandToggleButtonAccessibleHelpText', args )
    },
    ligandToggleButtonAddedContextResponse: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandToggleButtonAddedContextResponse', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandToggleButtonAddedContextResponse', args )
    },
    ligandToggleButtonRemovedContextResponse: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandToggleButtonRemovedContextResponse', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandToggleButtonRemovedContextResponse', args )
    },
    grabbedLigandResponsePattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_grabbedLigandResponsePattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_grabbedLigandResponsePattern', args )
    },
    grabbedLigandResponseWithHintPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_grabbedLigandResponseWithHintPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_grabbedLigandResponseWithHintPattern', args )
    },
    grabbedLigandResponseWithEmptyMembraneHintPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern', args )
    },
    transportProteinBriefName: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProteinBriefName', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProteinBriefName', args )
    },
    ligandMovedAboveLigandGatedChannelPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandMovedAboveLigandGatedChannelPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandMovedAboveLigandGatedChannelPattern', args )
    },
    ligandMovedAboveLeakageChannelPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandMovedAboveLeakageChannelPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandMovedAboveLeakageChannelPattern', args )
    },
    ligandMovedAboveOtherChannelPattern: {
      format: ( args: IntentionalAny ): string => formatPattern( 'a11y_ligandMovedAboveOtherChannelPattern', args ),
      createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_ligandMovedAboveOtherChannelPattern', args )
    },
    transportProtein: {
      accessibleNamePattern: {
        format: ( args: IntentionalAny ): string => formatPattern( 'a11y_transportProtein_accessibleNamePattern', args ),
        createProperty: ( args: IntentionalAny ): TReadOnlyProperty<string> => formatToProperty( 'a11y_transportProtein_accessibleNamePattern', args )
      }
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register( 'MembraneTransportFluent', MembraneTransportFluent );
