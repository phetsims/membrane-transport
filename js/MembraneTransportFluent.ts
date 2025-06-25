// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from membrane-transport-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import membraneTransport from './membraneTransport.js';
import MembraneTransportStrings from './MembraneTransportStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( MembraneTransportStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'membrane_transport_title', 'membrane-transport.titleStringProperty' );
addToMapIfDefined( 'screen_simpleDiffusion', 'screen.simpleDiffusionStringProperty' );
addToMapIfDefined( 'screen_facilitatedDiffusion', 'screen.facilitatedDiffusionStringProperty' );
addToMapIfDefined( 'screen_activeTransport', 'screen.activeTransportStringProperty' );
addToMapIfDefined( 'screen_playground', 'screen.playgroundStringProperty' );
addToMapIfDefined( 'solutes', 'solutesStringProperty' );
addToMapIfDefined( 'oxygen', 'oxygenStringProperty' );
addToMapIfDefined( 'carbonDioxide', 'carbonDioxideStringProperty' );
addToMapIfDefined( 'sodiumIon', 'sodiumIonStringProperty' );
addToMapIfDefined( 'potassiumIon', 'potassiumIonStringProperty' );
addToMapIfDefined( 'glucose', 'glucoseStringProperty' );
addToMapIfDefined( 'atp', 'atpStringProperty' );
addToMapIfDefined( 'outside', 'outsideStringProperty' );
addToMapIfDefined( 'inside', 'insideStringProperty' );
addToMapIfDefined( 'voltageGatedChannels', 'voltageGatedChannelsStringProperty' );
addToMapIfDefined( 'ligandGatedChannels', 'ligandGatedChannelsStringProperty' );
addToMapIfDefined( 'activeTransporters', 'activeTransportersStringProperty' );
addToMapIfDefined( 'leakageChannels', 'leakageChannelsStringProperty' );
addToMapIfDefined( 'NaPlusKPlusPump', 'NaPlusKPlusPumpStringProperty' );
addToMapIfDefined( 'sodiumGlucoseCotransporter', 'sodiumGlucoseCotransporterStringProperty' );
addToMapIfDefined( 'membranePotential_mV', 'membranePotential_mVStringProperty' );
addToMapIfDefined( 'charges', 'chargesStringProperty' );
addToMapIfDefined( 'addLigands', 'addLigandsStringProperty' );
addToMapIfDefined( 'removeLigands', 'removeLigandsStringProperty' );
addToMapIfDefined( 'animateLipids', 'animateLipidsStringProperty' );
addToMapIfDefined( 'animateLipidsDescription', 'animateLipidsDescriptionStringProperty' );
addToMapIfDefined( 'glucoseDrain', 'glucoseDrainStringProperty' );
addToMapIfDefined( 'glucoseDrainDescription', 'glucoseDrainDescriptionStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSounds', 'preferencesDialog.audio.sounds.stereoSoundsStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSoundsDescription', 'preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty' );
addToMapIfDefined( 'soluteConcentrations', 'soluteConcentrationsStringProperty' );
addToMapIfDefined( 'crossingHighlights', 'crossingHighlightsStringProperty' );
addToMapIfDefined( 'crossingSounds', 'crossingSoundsStringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryIntro', 'a11y.summary.playAreaSummaryIntroStringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryProteins', 'a11y.summary.playAreaSummaryProteinsStringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryPotential', 'a11y.summary.playAreaSummaryPotentialStringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryBarCharts', 'a11y.summary.playAreaSummaryBarChartsStringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryScreen1', 'a11y.summary.playAreaSummaryScreen1StringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryScreen2and4', 'a11y.summary.playAreaSummaryScreen2and4StringProperty' );
addToMapIfDefined( 'a11y_summary_playAreaSummaryScreen3', 'a11y.summary.playAreaSummaryScreen3StringProperty' );
addToMapIfDefined( 'a11y_summary_controlAreaSummary', 'a11y.summary.controlAreaSummaryStringProperty' );
addToMapIfDefined( 'a11y_summary_interactionHint', 'a11y.summary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_summary_interactionHintWithTransportProteins', 'a11y.summary.interactionHintWithTransportProteinsStringProperty' );
addToMapIfDefined( 'a11y_soluteControls_accessibleHeading', 'a11y.soluteControls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleName', 'a11y.eraseSolutesButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleContextResponse', 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_crossingHighlightsCheckbox_accessibleHelpText', 'a11y.crossingHighlightsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_crossingHighlightsCheckbox_accessibleCheckedContextResponse', 'a11y.crossingHighlightsCheckbox.accessibleCheckedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_crossingHighlightsCheckbox_accessibleUncheckedContextResponse', 'a11y.crossingHighlightsCheckbox.accessibleUncheckedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_crossingSoundsCheckbox_accessibleHelpText', 'a11y.crossingSoundsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_crossingSoundsCheckbox_accessibleCheckedContextResponse', 'a11y.crossingSoundsCheckbox.accessibleCheckedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_crossingSoundsCheckbox_accessibleUncheckedContextResponse', 'a11y.crossingSoundsCheckbox.accessibleUncheckedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_transportProteins', 'a11y.transportProteinPanel.transportProteinsStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_accessibleHelpText', 'a11y.transportProteinPanel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', 'a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', 'a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', 'a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', 'a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', 'a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', 'a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText', 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName', 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName', 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName', 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleHelpText', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_voicingHelpText', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.voicingHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_checkedContextResponseNegative70', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.checkedContextResponseNegative70StringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_checkedContextResponseNegative50', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.checkedContextResponseNegative50StringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_checkedContextResponsePositive30', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.checkedContextResponsePositive30StringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_uncheckedContextResponse', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.uncheckedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_toolAccessibleHelpText', 'a11y.transportProteinPanel.toolAccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_starLigand', 'a11y.ligandNode.starLigandStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_triangleLigand', 'a11y.ligandNode.triangleLigandStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_accessibleHelpText', 'a11y.ligandNode.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_releasedLigand', 'a11y.ligandNode.releasedLigandStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_ligandReleasedOnProteinPattern', 'a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern', 'a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_ligandUnboundAlert', 'a11y.ligandNode.ligandUnboundAlertStringProperty' );
addToMapIfDefined( 'a11y_soluteControlsAccessibleHelpText', 'a11y.soluteControlsAccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_oxygen', 'a11y.soluteAccessibleNames.oxygenStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_carbonDioxide', 'a11y.soluteAccessibleNames.carbonDioxideStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_sodiumIon', 'a11y.soluteAccessibleNames.sodiumIonStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_potassiumIon', 'a11y.soluteAccessibleNames.potassiumIonStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_glucose', 'a11y.soluteAccessibleNames.glucoseStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_atp', 'a11y.soluteAccessibleNames.atpStringProperty' );
addToMapIfDefined( 'a11y_outsideMembraneSpinnerAccessibleNamePattern', 'a11y.outsideMembraneSpinnerAccessibleNamePatternStringProperty' );
addToMapIfDefined( 'a11y_outsideMembraneSpinnerHelpText', 'a11y.outsideMembraneSpinnerHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteSpinnerVoicingHintResponse', 'a11y.soluteSpinnerVoicingHintResponseStringProperty' );
addToMapIfDefined( 'a11y_insideMembraneSpinnerAccessibleNamePattern', 'a11y.insideMembraneSpinnerAccessibleNamePatternStringProperty' );
addToMapIfDefined( 'a11y_insideMembraneSpinnerHelpText', 'a11y.insideMembraneSpinnerHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteSpinnerRoleDescription', 'a11y.soluteSpinnerRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_solute', 'a11y.soluteStringProperty' );
addToMapIfDefined( 'a11y_soluteCapitalized', 'a11y.soluteCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_soluteSpinnerObjectResponsePattern', 'a11y.soluteSpinnerObjectResponsePatternStringProperty' );
addToMapIfDefined( 'a11y_soluteSpinnerContextResponsePattern', 'a11y.soluteSpinnerContextResponsePatternStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_descriptionContent', 'a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleName', 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_comparison', 'a11y.soluteConcentrationsAccordionBox.barChart.comparisonStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_crossing', 'a11y.soluteConcentrationsAccordionBox.barChart.crossingStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsLeadingParagraph', 'a11y.currentDetailsLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsNoAddedSolutes', 'a11y.currentDetailsNoAddedSolutesStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsSoluteTypesOnOutside', 'a11y.currentDetailsSoluteTypesOnOutsideStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsSoluteTypesOnInside', 'a11y.currentDetailsSoluteTypesOnInsideStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsTransportProteins', 'a11y.currentDetailsTransportProteinsStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsLigands', 'a11y.currentDetailsLigandsStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialValue', 'a11y.membranePotentialValueStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsMembranePotential', 'a11y.currentDetailsMembranePotentialStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButtonAccessibleHelpText', 'a11y.ligandToggleButtonAccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButtonAddedContextResponse', 'a11y.ligandToggleButtonAddedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButtonRemovedContextResponse', 'a11y.ligandToggleButtonRemovedContextResponseStringProperty' );
addToMapIfDefined( 'a11y_grabbedLigandResponsePattern', 'a11y.grabbedLigandResponsePatternStringProperty' );
addToMapIfDefined( 'a11y_grabbedLigandResponseWithHintPattern', 'a11y.grabbedLigandResponseWithHintPatternStringProperty' );
addToMapIfDefined( 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern', 'a11y.grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty' );
addToMapIfDefined( 'a11y_transportProteinBriefName', 'a11y.transportProteinBriefNameStringProperty' );
addToMapIfDefined( 'a11y_ligandMovedAboveLigandGatedChannelPattern', 'a11y.ligandMovedAboveLigandGatedChannelPatternStringProperty' );
addToMapIfDefined( 'a11y_ligandMovedAboveLeakageChannelPattern', 'a11y.ligandMovedAboveLeakageChannelPatternStringProperty' );
addToMapIfDefined( 'a11y_ligandMovedAboveOtherChannelPattern', 'a11y.ligandMovedAboveOtherChannelPatternStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_sodiumVoltageGatedOpened', 'a11y.membranePotentialChanges.sodiumVoltageGatedOpenedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_sodiumVoltageGatedClosed', 'a11y.membranePotentialChanges.sodiumVoltageGatedClosedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_potassiumVoltageGatedOpened', 'a11y.membranePotentialChanges.potassiumVoltageGatedOpenedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_potassiumVoltageGatedClosed', 'a11y.membranePotentialChanges.potassiumVoltageGatedClosedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_sodiumOpenedPotassiumOpened', 'a11y.membranePotentialChanges.sodiumOpenedPotassiumOpenedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_sodiumOpenedPotassiumClosed', 'a11y.membranePotentialChanges.sodiumOpenedPotassiumClosedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_sodiumClosedPotassiumOpened', 'a11y.membranePotentialChanges.sodiumClosedPotassiumOpenedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_sodiumClosedPotassiumClosed', 'a11y.membranePotentialChanges.sodiumClosedPotassiumClosedStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialChanges_noChange', 'a11y.membranePotentialChanges.noChangeStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_grabbed', 'a11y.transportProtein.grabbedStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const MembraneTransportFluent = {
  "membrane-transport": {
    _comment_1: new FluentComment( {"comment":"Strings for the Membrane Transport simulation","lineNumber":1,"associatedKey":"membrane-transport.title"} ),
    _comment_3: new FluentComment( {"comment":"Title","lineNumber":3,"associatedKey":"membrane-transport.title"} ),
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membrane_transport_title', _.get( MembraneTransportStrings, 'membrane-transport.titleStringProperty' ) )
  },
  screen: {
    _comment_6: new FluentComment( {"comment":"Screens","lineNumber":6,"associatedKey":"screen.simpleDiffusion"} ),
    simpleDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_simpleDiffusion', _.get( MembraneTransportStrings, 'screen.simpleDiffusionStringProperty' ) ),
    facilitatedDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_facilitatedDiffusion', _.get( MembraneTransportStrings, 'screen.facilitatedDiffusionStringProperty' ) ),
    activeTransportStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_activeTransport', _.get( MembraneTransportStrings, 'screen.activeTransportStringProperty' ) ),
    playgroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_playground', _.get( MembraneTransportStrings, 'screen.playgroundStringProperty' ) )
  },
  _comment_12: new FluentComment( {"comment":"Solutes","lineNumber":12,"associatedKey":"solutes"} ),
  solutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'solutes', _.get( MembraneTransportStrings, 'solutesStringProperty' ) ),
  oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'oxygen', _.get( MembraneTransportStrings, 'oxygenStringProperty' ) ),
  carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'carbonDioxide', _.get( MembraneTransportStrings, 'carbonDioxideStringProperty' ) ),
  sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumIon', _.get( MembraneTransportStrings, 'sodiumIonStringProperty' ) ),
  potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'potassiumIon', _.get( MembraneTransportStrings, 'potassiumIonStringProperty' ) ),
  glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucose', _.get( MembraneTransportStrings, 'glucoseStringProperty' ) ),
  atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'atp', _.get( MembraneTransportStrings, 'atpStringProperty' ) ),
  _comment_21: new FluentComment( {"comment":"Cell Regions","lineNumber":21,"associatedKey":"outside"} ),
  outsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'outside', _.get( MembraneTransportStrings, 'outsideStringProperty' ) ),
  insideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'inside', _.get( MembraneTransportStrings, 'insideStringProperty' ) ),
  _comment_25: new FluentComment( {"comment":"On the Toolbox","lineNumber":25,"associatedKey":"voltageGatedChannels"} ),
  voltageGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'voltageGatedChannels', _.get( MembraneTransportStrings, 'voltageGatedChannelsStringProperty' ) ),
  ligandGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'ligandGatedChannels', _.get( MembraneTransportStrings, 'ligandGatedChannelsStringProperty' ) ),
  activeTransportersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'activeTransporters', _.get( MembraneTransportStrings, 'activeTransportersStringProperty' ) ),
  leakageChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'leakageChannels', _.get( MembraneTransportStrings, 'leakageChannelsStringProperty' ) ),
  NaPlusKPlusPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'NaPlusKPlusPump', _.get( MembraneTransportStrings, 'NaPlusKPlusPumpStringProperty' ) ),
  sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'sodiumGlucoseCotransporterStringProperty' ) ),
  _comment_34: new FluentComment( {"comment":"Membrane Potential Section","lineNumber":34,"associatedKey":"membranePotential_mV"} ),
  membranePotential_mVStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membranePotential_mV', _.get( MembraneTransportStrings, 'membranePotential_mVStringProperty' ) ),
  chargesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'charges', _.get( MembraneTransportStrings, 'chargesStringProperty' ) ),
  _comment_38: new FluentComment( {"comment":"Ligands Section","lineNumber":38,"associatedKey":"addLigands"} ),
  addLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'addLigands', _.get( MembraneTransportStrings, 'addLigandsStringProperty' ) ),
  removeLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'removeLigands', _.get( MembraneTransportStrings, 'removeLigandsStringProperty' ) ),
  _comment_42: new FluentComment( {"comment":"Preferences Dialog","lineNumber":42,"associatedKey":"animateLipids"} ),
  animateLipidsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipids', _.get( MembraneTransportStrings, 'animateLipidsStringProperty' ) ),
  animateLipidsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipidsDescription', _.get( MembraneTransportStrings, 'animateLipidsDescriptionStringProperty' ) ),
  glucoseDrainStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseDrain', _.get( MembraneTransportStrings, 'glucoseDrainStringProperty' ) ),
  glucoseDrainDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseDrainDescription', _.get( MembraneTransportStrings, 'glucoseDrainDescriptionStringProperty' ) ),
  preferencesDialog: {
    audio: {
      sounds: {
        stereoSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSounds', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoSoundsStringProperty' ) ),
        stereoSoundsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSoundsDescription', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty' ) )
      }
    }
  },
  _comment_50: new FluentComment( {"comment":"Solute Concentration Bar Charts","lineNumber":50,"associatedKey":"soluteConcentrations"} ),
  soluteConcentrationsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteConcentrations', _.get( MembraneTransportStrings, 'soluteConcentrationsStringProperty' ) ),
  _comment_53: new FluentComment( {"comment":"Checkboxes below the play area","lineNumber":53,"associatedKey":"crossingHighlights"} ),
  crossingHighlightsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'crossingHighlights', _.get( MembraneTransportStrings, 'crossingHighlightsStringProperty' ) ),
  crossingSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'crossingSounds', _.get( MembraneTransportStrings, 'crossingSoundsStringProperty' ) ),
  a11y: {
    summary: {
      playAreaSummaryIntroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryIntro', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryIntroStringProperty' ) ),
      playAreaSummaryProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryProteins', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryProteinsStringProperty' ) ),
      playAreaSummaryPotentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryPotential', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryPotentialStringProperty' ) ),
      playAreaSummaryBarChartsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryBarCharts', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryBarChartsStringProperty' ) ),
      playAreaSummaryScreen1StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen1', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryScreen1StringProperty' ) ),
      playAreaSummaryScreen2and4StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen2and4', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryScreen2and4StringProperty' ) ),
      playAreaSummaryScreen3StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen3', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryScreen3StringProperty' ) ),
      controlAreaSummaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_controlAreaSummary', _.get( MembraneTransportStrings, 'a11y.summary.controlAreaSummaryStringProperty' ) ),
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHint', _.get( MembraneTransportStrings, 'a11y.summary.interactionHintStringProperty' ) ),
      interactionHintWithTransportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHintWithTransportProteins', _.get( MembraneTransportStrings, 'a11y.summary.interactionHintWithTransportProteinsStringProperty' ) )
    },
    soluteControls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.soluteControls.accessibleHeadingStringProperty' ) )
    },
    eraseSolutesButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleNameStringProperty' ) ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' ) )
    },
    crossingHighlightsCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingHighlightsCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.crossingHighlightsCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleCheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingHighlightsCheckbox_accessibleCheckedContextResponse', _.get( MembraneTransportStrings, 'a11y.crossingHighlightsCheckbox.accessibleCheckedContextResponseStringProperty' ) ),
      accessibleUncheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingHighlightsCheckbox_accessibleUncheckedContextResponse', _.get( MembraneTransportStrings, 'a11y.crossingHighlightsCheckbox.accessibleUncheckedContextResponseStringProperty' ) )
    },
    crossingSoundsCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingSoundsCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.crossingSoundsCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleCheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingSoundsCheckbox_accessibleCheckedContextResponse', _.get( MembraneTransportStrings, 'a11y.crossingSoundsCheckbox.accessibleCheckedContextResponseStringProperty' ) ),
      accessibleUncheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingSoundsCheckbox_accessibleUncheckedContextResponse', _.get( MembraneTransportStrings, 'a11y.crossingSoundsCheckbox.accessibleUncheckedContextResponseStringProperty' ) )
    },
    transportProteinPanel: {
      transportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_transportProteins', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.transportProteinsStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.accessibleHelpTextStringProperty' ) ),
      ligandGatedChannelPanel: {
        sodiumIonNaPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty' ) ),
        potassiumIonKPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty' ) )
      },
      leakageChannelPanel: {
        sodiumIonNaPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty' ) ),
        potassiumIonKPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty' ) )
      },
      voltageGatedChannelPanel: {
        sodiumIonNaPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty' ) ),
        potassiumIonKPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty' ) ),
        _comment_100: new FluentComment( {"comment":"For the Membrane Potential radio buttons","lineNumber":100,"associatedKey":"membranePotential"} ),
        membranePotential: {
          radioButtonGroup: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty' ) ),
            accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty' ) ),
            negative70RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleNameStringProperty' ) )
            },
            negative50RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleNameStringProperty' ) )
            },
            positive30RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleNameStringProperty' ) )
            }
          }
        },
        chargesCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleHelpTextStringProperty' ) ),
          voicingHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_voicingHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.voicingHelpTextStringProperty' ) ),
          checkedContextResponseNegative70StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_checkedContextResponseNegative70', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.checkedContextResponseNegative70StringProperty' ) ),
          checkedContextResponseNegative50StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_checkedContextResponseNegative50', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.checkedContextResponseNegative50StringProperty' ) ),
          checkedContextResponsePositive30StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_checkedContextResponsePositive30', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.checkedContextResponsePositive30StringProperty' ) ),
          uncheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_uncheckedContextResponse', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.uncheckedContextResponseStringProperty' ) )
        }
      },
      activeTransportProteinPanel: {
        sodiumPotassiumPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty' ) ),
        sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty' ) )
      },
      toolAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_toolAccessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.toolAccessibleHelpTextStringProperty' ) )
    },
    ligandNode: {
      starLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_starLigand', _.get( MembraneTransportStrings, 'a11y.ligandNode.starLigandStringProperty' ) ),
      triangleLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_triangleLigand', _.get( MembraneTransportStrings, 'a11y.ligandNode.triangleLigandStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandNode.accessibleHelpTextStringProperty' ) ),
      releasedLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedLigand', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedLigandStringProperty' ) ),
      ligandReleasedOffMembranePatternStringProperty: _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandReleasedOffMembranePatternStringProperty' ),
      ligandReleasedOnProteinPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandReleasedOnProteinPattern', _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty' ) ),
      ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern', _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty' ) ),
      ligandUnboundAlertStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandUnboundAlert', _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandUnboundAlertStringProperty' ) )
    },
    soluteControlsAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControlsAccessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControlsAccessibleHelpTextStringProperty' ) ),
    _comment_133: new FluentComment( {"comment":"Accessible names for solute radio buttons","lineNumber":133,"associatedKey":"soluteAccessibleNames"} ),
    soluteAccessibleNames: {
      oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_oxygen', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.oxygenStringProperty' ) ),
      carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_carbonDioxide', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.carbonDioxideStringProperty' ) ),
      sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_sodiumIon', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.sodiumIonStringProperty' ) ),
      potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_potassiumIon', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.potassiumIonStringProperty' ) ),
      glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_glucose', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.glucoseStringProperty' ) ),
      atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_atp', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.atpStringProperty' ) )
    },
    outsideMembraneSpinnerAccessibleNamePattern: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_outsideMembraneSpinnerAccessibleNamePattern', _.get( MembraneTransportStrings, 'a11y.outsideMembraneSpinnerAccessibleNamePatternStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    outsideMembraneSpinnerHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_outsideMembraneSpinnerHelpText', _.get( MembraneTransportStrings, 'a11y.outsideMembraneSpinnerHelpTextStringProperty' ) ),
    soluteSpinnerVoicingHintResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteSpinnerVoicingHintResponse', _.get( MembraneTransportStrings, 'a11y.soluteSpinnerVoicingHintResponseStringProperty' ) ),
    insideMembraneSpinnerAccessibleNamePattern: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_insideMembraneSpinnerAccessibleNamePattern', _.get( MembraneTransportStrings, 'a11y.insideMembraneSpinnerAccessibleNamePatternStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    insideMembraneSpinnerHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_insideMembraneSpinnerHelpText', _.get( MembraneTransportStrings, 'a11y.insideMembraneSpinnerHelpTextStringProperty' ) ),
    soluteSpinnerRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteSpinnerRoleDescription', _.get( MembraneTransportStrings, 'a11y.soluteSpinnerRoleDescriptionStringProperty' ) ),
    solute: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solute', _.get( MembraneTransportStrings, 'a11y.soluteStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    soluteCapitalized: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCapitalized', _.get( MembraneTransportStrings, 'a11y.soluteCapitalizedStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    soluteSpinnerObjectResponsePattern: new FluentPattern<{ amount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteSpinnerObjectResponsePattern', _.get( MembraneTransportStrings, 'a11y.soluteSpinnerObjectResponsePatternStringProperty' ), [{"name":"amount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    soluteSpinnerContextResponsePattern: new FluentPattern<{ addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | number | 'other' | 'more' | 'less' | TReadOnlyProperty<'same' | number | 'other' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteSpinnerContextResponsePattern', _.get( MembraneTransportStrings, 'a11y.soluteSpinnerContextResponsePatternStringProperty' ), [{"name":"addedOrRemoved","variants":["added","removed"]},{"name":"amount","variants":["aLittle","aLot"]},{"name":"differenceSize","variants":["aLittle","aLot"]},{"name":"directionality","variants":["insideThanOutside","outsideThanInside"]},{"name":"moreOrLessOrSame","variants":["same",{"type":"number","value":"other"},"more","less"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    soluteConcentrationsAccordionBox: {
      descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_descriptionContent', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty' ) ),
      barChart: {
        accessibleName: new FluentPattern<{ amount: 'none' | 'equal' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside'>, crossing: 'none' | 'inside' | 'outside' | 'both' | TReadOnlyProperty<'none' | 'inside' | 'outside' | 'both'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleName', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameStringProperty' ), [{"name":"amount","variants":["none","equal","manyMoreOutside","aboutTwiceAsManyOutside","someMoreOutside","roughlyEqualOutside","manyMoreInside","aboutTwiceAsManyInside","someMoreInside","roughlyEqualInside"]},{"name":"crossing","variants":["none","inside","outside","both"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        comparison: new FluentPattern<{ amount: 'none' | 'equal' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_comparison', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.comparisonStringProperty' ), [{"name":"amount","variants":["none","equal","manyMoreOutside","aboutTwiceAsManyOutside","someMoreOutside","roughlyEqualOutside","manyMoreInside","aboutTwiceAsManyInside","someMoreInside","roughlyEqualInside"]}] ),
        crossing: new FluentPattern<{ crossing: 'none' | 'inside' | 'outside' | 'both' | TReadOnlyProperty<'none' | 'inside' | 'outside' | 'both'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_crossing', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.crossingStringProperty' ), [{"name":"crossing","variants":["none","inside","outside","both"]}] )
      }
    },
    currentDetailsLeadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsLeadingParagraph', _.get( MembraneTransportStrings, 'a11y.currentDetailsLeadingParagraphStringProperty' ) ),
    currentDetailsNoAddedSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsNoAddedSolutes', _.get( MembraneTransportStrings, 'a11y.currentDetailsNoAddedSolutesStringProperty' ) ),
    currentDetailsSoluteTypesOnOutside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsSoluteTypesOnOutside', _.get( MembraneTransportStrings, 'a11y.currentDetailsSoluteTypesOnOutsideStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
    currentDetailsSoluteTypesOnInside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsSoluteTypesOnInside', _.get( MembraneTransportStrings, 'a11y.currentDetailsSoluteTypesOnInsideStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
    currentDetailsTransportProteins: new FluentPattern<{ proteinCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, proteinTypeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsTransportProteins', _.get( MembraneTransportStrings, 'a11y.currentDetailsTransportProteinsStringProperty' ), [{"name":"proteinCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"proteinTypeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
    currentDetailsLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsLigands', _.get( MembraneTransportStrings, 'a11y.currentDetailsLigandsStringProperty' ) ),
    membranePotentialValue: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_membranePotentialValue', _.get( MembraneTransportStrings, 'a11y.membranePotentialValueStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
    currentDetailsMembranePotential: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsMembranePotential', _.get( MembraneTransportStrings, 'a11y.currentDetailsMembranePotentialStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
    _comment_259: new FluentComment( {"comment":"accessibleHelpText for the ligand control","lineNumber":259,"associatedKey":"ligandToggleButtonAccessibleHelpText"} ),
    ligandToggleButtonAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonAccessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandToggleButtonAccessibleHelpTextStringProperty' ) ),
    ligandToggleButtonAddedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonAddedContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButtonAddedContextResponseStringProperty' ) ),
    ligandToggleButtonRemovedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonRemovedContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButtonRemovedContextResponseStringProperty' ) ),
    _comment_264: new FluentComment( {"comment":"Spoken when the ligand is grabbed.","lineNumber":264,"associatedKey":"grabbedLigandResponsePattern"} ),
    grabbedLigandResponsePattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponsePattern', _.get( MembraneTransportStrings, 'a11y.grabbedLigandResponsePatternStringProperty' ), [{"name":"proteinCount"}] ),
    grabbedLigandResponseWithHintPattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponseWithHintPattern', _.get( MembraneTransportStrings, 'a11y.grabbedLigandResponseWithHintPatternStringProperty' ), [{"name":"proteinCount"}] ),
    grabbedLigandResponseWithEmptyMembraneHintPattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern', _.get( MembraneTransportStrings, 'a11y.grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty' ), [{"name":"proteinCount"}] ),
    _comment_269: new FluentComment( {"comment":"Transport protein brief names","lineNumber":269,"associatedKey":"transportProteinBriefName"} ),
    transportProteinBriefName: new FluentPattern<{ type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_transportProteinBriefName', _.get( MembraneTransportStrings, 'a11y.transportProteinBriefNameStringProperty' ), [{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
    _comment_282: new FluentComment( {"comment":"Spoken when the ligand moves above a protein that can open or close","lineNumber":282,"associatedKey":"ligandMovedAboveLigandGatedChannelPattern"} ),
    ligandMovedAboveLigandGatedChannelPattern: new FluentPattern<{ index: FluentVariable, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveLigandGatedChannelPattern', _.get( MembraneTransportStrings, 'a11y.ligandMovedAboveLigandGatedChannelPatternStringProperty' ), [{"name":"index"},{"name":"ligandType","variants":["triangleLigand","starLigand"]},{"name":"openOrClosed","variants":["open","closed"]},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
    _comment_292: new FluentComment( {"comment":"Spoken when the ligand moves above a protein that cannot open or close (leakage channel).","lineNumber":292,"associatedKey":"ligandMovedAboveLeakageChannelPattern"} ),
    ligandMovedAboveLeakageChannelPattern: new FluentPattern<{ index: FluentVariable, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveLeakageChannelPattern', _.get( MembraneTransportStrings, 'a11y.ligandMovedAboveLeakageChannelPatternStringProperty' ), [{"name":"index"},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
    _comment_295: new FluentComment( {"comment":"Spoken when the ligand moves above any other channel that can open/close, but does not bind to ligands.","lineNumber":295,"associatedKey":"ligandMovedAboveOtherChannelPattern"} ),
    ligandMovedAboveOtherChannelPattern: new FluentPattern<{ index: FluentVariable, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveOtherChannelPattern', _.get( MembraneTransportStrings, 'a11y.ligandMovedAboveOtherChannelPatternStringProperty' ), [{"name":"index"},{"name":"openOrClosed","variants":["open","closed"]},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
    _comment_302: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","lineNumber":302,"associatedKey":"membranePotentialChanges"} ),
    membranePotentialChanges: {
      sodiumVoltageGatedOpenedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_sodiumVoltageGatedOpened', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.sodiumVoltageGatedOpenedStringProperty' ) ),
      sodiumVoltageGatedClosedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_sodiumVoltageGatedClosed', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.sodiumVoltageGatedClosedStringProperty' ) ),
      potassiumVoltageGatedOpenedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_potassiumVoltageGatedOpened', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.potassiumVoltageGatedOpenedStringProperty' ) ),
      potassiumVoltageGatedClosedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_potassiumVoltageGatedClosed', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.potassiumVoltageGatedClosedStringProperty' ) ),
      sodiumOpenedPotassiumOpenedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_sodiumOpenedPotassiumOpened', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.sodiumOpenedPotassiumOpenedStringProperty' ) ),
      sodiumOpenedPotassiumClosedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_sodiumOpenedPotassiumClosed', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.sodiumOpenedPotassiumClosedStringProperty' ) ),
      _comment_311: new FluentComment( {"comment":"We like to say opening first, since users are more interested to hear what just opened.","lineNumber":311,"associatedKey":"sodiumClosedPotassiumOpened"} ),
      sodiumClosedPotassiumOpenedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_sodiumClosedPotassiumOpened', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.sodiumClosedPotassiumOpenedStringProperty' ) ),
      sodiumClosedPotassiumClosedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_sodiumClosedPotassiumClosed', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.sodiumClosedPotassiumClosedStringProperty' ) ),
      noChangeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotentialChanges_noChange', _.get( MembraneTransportStrings, 'a11y.membranePotentialChanges.noChangeStringProperty' ) )
    },
    transportProtein: {
      grabbedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_grabbed', _.get( MembraneTransportStrings, 'a11y.transportProtein.grabbedStringProperty' ) )
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register('MembraneTransportFluent', MembraneTransportFluent);
