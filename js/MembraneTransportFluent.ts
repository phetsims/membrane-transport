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
addToMapIfDefined( 'glucoseMetabolism', 'glucoseMetabolismStringProperty' );
addToMapIfDefined( 'glucoseMetabolismDescription', 'glucoseMetabolismDescriptionStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSounds', 'preferencesDialog.audio.sounds.stereoSoundsStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSoundsDescription', 'preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty' );
addToMapIfDefined( 'soluteConcentrations', 'soluteConcentrationsStringProperty' );
addToMapIfDefined( 'crossingHighlights', 'crossingHighlightsStringProperty' );
addToMapIfDefined( 'crossingSounds', 'crossingSoundsStringProperty' );
addToMapIfDefined( 'a11y_simpleDiffusionScreen_screenButtonsHelpText', 'a11y.simpleDiffusionScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_facilitatedDiffusionScreen_screenButtonsHelpText', 'a11y.facilitatedDiffusionScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_activeTransportScreen_screenButtonsHelpText', 'a11y.activeTransportScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_playgroundScreen_screenButtonsHelpText', 'a11y.playgroundScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_intro', 'a11y.screenSummary.playArea.introStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_proteins', 'a11y.screenSummary.playArea.proteinsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_potential', 'a11y.screenSummary.playArea.potentialStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_barCharts', 'a11y.screenSummary.playArea.barChartsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_screen1', 'a11y.screenSummary.playArea.screen1StringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_screen2and4', 'a11y.screenSummary.playArea.screen2and4StringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_screen3', 'a11y.screenSummary.playArea.screen3StringProperty' );
addToMapIfDefined( 'a11y_screenSummary_controlArea', 'a11y.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_leadingParagraph', 'a11y.screenSummary.currentDetails.leadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_noAddedSolutes', 'a11y.screenSummary.currentDetails.noAddedSolutesStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_soluteTypesOnOutside', 'a11y.screenSummary.currentDetails.soluteTypesOnOutsideStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_soluteTypesOnInside', 'a11y.screenSummary.currentDetails.soluteTypesOnInsideStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_transportProteins', 'a11y.screenSummary.currentDetails.transportProteinsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_ligands', 'a11y.screenSummary.currentDetails.ligandsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_atpReacting', 'a11y.screenSummary.currentDetails.atpReactingStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_membranePotential', 'a11y.screenSummary.currentDetails.membranePotentialStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint', 'a11y.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHintWithTransportProteins', 'a11y.screenSummary.interactionHintWithTransportProteinsStringProperty' );
addToMapIfDefined( 'a11y_soluteControls_accessibleHeading', 'a11y.soluteControls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_soluteControls_accessibleHelpText', 'a11y.soluteControls.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleName', 'a11y.eraseSolutesButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleContextResponse', 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleHelpText', 'a11y.eraseSolutesButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_crossingHighlightsCheckbox_accessibleHelpText', 'a11y.crossingHighlightsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_crossingHighlightsCheckbox_accessibleContextResponseChecked', 'a11y.crossingHighlightsCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_crossingHighlightsCheckbox_accessibleContextResponseUnchecked', 'a11y.crossingHighlightsCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_crossingSoundsCheckbox_accessibleHelpText', 'a11y.crossingSoundsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_crossingSoundsCheckbox_accessibleContextResponseChecked', 'a11y.crossingSoundsCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_crossingSoundsCheckbox_accessibleContextResponseUnchecked', 'a11y.crossingSoundsCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_accessibleHeading', 'a11y.transportProteinPanel.accessibleHeadingStringProperty' );
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
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseCheckedNegative70', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedNegative70StringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseCheckedNegative50', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedNegative50StringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseCheckedPositive30', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedPositive30StringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseUnchecked', 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_accessibleHelpText', 'a11y.transportProteinPanel.activeTransportProteinPanel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_accessibleName', 'a11y.ligandNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_accessibleHelpText', 'a11y.ligandNode.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_releasedResponse', 'a11y.ligandNode.releasedResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_releasedOffMembraneResponse', 'a11y.ligandNode.releasedOffMembraneResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_releasedOnProteinResponse', 'a11y.ligandNode.releasedOnProteinResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_releasedOnBusyOrIncompatibleProteinResponse', 'a11y.ligandNode.releasedOnBusyOrIncompatibleProteinResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_unboundResponse', 'a11y.ligandNode.unboundResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_movedAboveLigandGatedChannelResponse', 'a11y.ligandNode.movedAboveLigandGatedChannelResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_movedAboveLeakageChannelResponse', 'a11y.ligandNode.movedAboveLeakageChannelResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_movedAboveOtherChannelResponse', 'a11y.ligandNode.movedAboveOtherChannelResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_grabbedResponse', 'a11y.ligandNode.grabbedResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_grabbedResponseWithHint', 'a11y.ligandNode.grabbedResponseWithHintStringProperty' );
addToMapIfDefined( 'a11y_ligandNode_grabbedResponseWithEmptyMembraneHint', 'a11y.ligandNode.grabbedResponseWithEmptyMembraneHintStringProperty' );
addToMapIfDefined( 'a11y_membranePotentialValue', 'a11y.membranePotentialValueStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_oxygen', 'a11y.soluteAccessibleNames.oxygenStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_carbonDioxide', 'a11y.soluteAccessibleNames.carbonDioxideStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_sodiumIon', 'a11y.soluteAccessibleNames.sodiumIonStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_potassiumIon', 'a11y.soluteAccessibleNames.potassiumIonStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_glucose', 'a11y.soluteAccessibleNames.glucoseStringProperty' );
addToMapIfDefined( 'a11y_soluteAccessibleNames_atp', 'a11y.soluteAccessibleNames.atpStringProperty' );
addToMapIfDefined( 'a11y_solute', 'a11y.soluteStringProperty' );
addToMapIfDefined( 'a11y_soluteCapitalized', 'a11y.soluteCapitalizedStringProperty' );
addToMapIfDefined( 'a11y_soluteBrief', 'a11y.soluteBriefStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_outside_accessibleName', 'a11y.soluteControl.outside.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_outside_accessibleHelpText', 'a11y.soluteControl.outside.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_inside_accessibleName', 'a11y.soluteControl.inside.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_inside_accessibleHelpText', 'a11y.soluteControl.inside.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_voicingHintResponse', 'a11y.soluteControl.voicingHintResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleRoleDescription', 'a11y.soluteControl.accessibleRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleObjectResponse', 'a11y.soluteControl.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleContextResponse', 'a11y.soluteControl.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_descriptionContent', 'a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleName', 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_comparison', 'a11y.soluteConcentrationsAccordionBox.barChart.comparisonStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_crossing', 'a11y.soluteConcentrationsAccordionBox.barChart.crossingStringProperty' );
addToMapIfDefined( 'a11y_soluteCrossing_initialResponse', 'a11y.soluteCrossing.initialResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteCrossing_subsequentResponse', 'a11y.soluteCrossing.subsequentResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteCrossing_inBalanceResponse', 'a11y.soluteCrossing.inBalanceResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteCrossing_manyTypesResponse', 'a11y.soluteCrossing.manyTypesResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteCrossing_manyTypesInBalanceResponse', 'a11y.soluteCrossing.manyTypesInBalanceResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButton_accessibleHelpText', 'a11y.ligandToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButton_addedAccessibleContextResponse', 'a11y.ligandToggleButton.addedAccessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButton_removedAccessibleContextResponse', 'a11y.ligandToggleButton.removedAccessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHeading', 'a11y.cellMembrane.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextNoSolutesProteinsHidden', 'a11y.cellMembrane.accessibleHelpTextNoSolutesProteinsHiddenStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextWithSolutesProteinsHidden', 'a11y.cellMembrane.accessibleHelpTextWithSolutesProteinsHiddenStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextNoSolutesOrProteins', 'a11y.cellMembrane.accessibleHelpTextNoSolutesOrProteinsStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextWithSolutesNoProteins', 'a11y.cellMembrane.accessibleHelpTextWithSolutesNoProteinsStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextWithProteinsNoSolutes', 'a11y.cellMembrane.accessibleHelpTextWithProteinsNoSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextWithSolutesAndProteins', 'a11y.cellMembrane.accessibleHelpTextWithSolutesAndProteinsStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_grabbedResponse', 'a11y.transportProtein.grabbedResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_offMembraneResponse', 'a11y.transportProtein.offMembraneResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_releasedReplacedResponse', 'a11y.transportProtein.releasedReplacedResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_deletedResponse', 'a11y.transportProtein.deletedResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_cancelledResponse', 'a11y.transportProtein.cancelledResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_objectResponse', 'a11y.transportProtein.objectResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleName', 'a11y.transportProtein.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleNameReversed', 'a11y.transportProtein.accessibleNameReversedStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleObjectResponse', 'a11y.transportProtein.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_empty', 'a11y.transportProtein.emptyStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_briefName', 'a11y.transportProtein.briefNameStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_sodiumVoltageGatedOpenedResponse', 'a11y.membranePotential.sodiumVoltageGatedOpenedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_sodiumVoltageGatedClosedResponse', 'a11y.membranePotential.sodiumVoltageGatedClosedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_potassiumVoltageGatedOpenedResponse', 'a11y.membranePotential.potassiumVoltageGatedOpenedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_potassiumVoltageGatedClosedResponse', 'a11y.membranePotential.potassiumVoltageGatedClosedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_sodiumOpenedPotassiumOpenedResponse', 'a11y.membranePotential.sodiumOpenedPotassiumOpenedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_sodiumOpenedPotassiumClosedResponse', 'a11y.membranePotential.sodiumOpenedPotassiumClosedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_sodiumClosedPotassiumOpenedResponse', 'a11y.membranePotential.sodiumClosedPotassiumOpenedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_sodiumClosedPotassiumClosedResponse', 'a11y.membranePotential.sodiumClosedPotassiumClosedResponseStringProperty' );
addToMapIfDefined( 'a11y_membranePotential_noChangeResponse', 'a11y.membranePotential.noChangeResponseStringProperty' );

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
    _comment_0: new FluentComment( {"comment":"Strings for the Membrane Transport simulation","associatedKey":"membrane-transport.title"} ),
    _comment_1: new FluentComment( {"comment":"Title","associatedKey":"membrane-transport.title"} ),
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membrane_transport_title', _.get( MembraneTransportStrings, 'membrane-transport.titleStringProperty' ) )
  },
  screen: {
    _comment_0: new FluentComment( {"comment":"Screens","associatedKey":"screen.simpleDiffusion"} ),
    simpleDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_simpleDiffusion', _.get( MembraneTransportStrings, 'screen.simpleDiffusionStringProperty' ) ),
    facilitatedDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_facilitatedDiffusion', _.get( MembraneTransportStrings, 'screen.facilitatedDiffusionStringProperty' ) ),
    activeTransportStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_activeTransport', _.get( MembraneTransportStrings, 'screen.activeTransportStringProperty' ) ),
    playgroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_playground', _.get( MembraneTransportStrings, 'screen.playgroundStringProperty' ) )
  },
  _comment_0: new FluentComment( {"comment":"Solutes","associatedKey":"solutes"} ),
  solutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'solutes', _.get( MembraneTransportStrings, 'solutesStringProperty' ) ),
  oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'oxygen', _.get( MembraneTransportStrings, 'oxygenStringProperty' ) ),
  carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'carbonDioxide', _.get( MembraneTransportStrings, 'carbonDioxideStringProperty' ) ),
  sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumIon', _.get( MembraneTransportStrings, 'sodiumIonStringProperty' ) ),
  potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'potassiumIon', _.get( MembraneTransportStrings, 'potassiumIonStringProperty' ) ),
  glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucose', _.get( MembraneTransportStrings, 'glucoseStringProperty' ) ),
  atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'atp', _.get( MembraneTransportStrings, 'atpStringProperty' ) ),
  _comment_1: new FluentComment( {"comment":"Cell Regions","associatedKey":"outside"} ),
  outsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'outside', _.get( MembraneTransportStrings, 'outsideStringProperty' ) ),
  insideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'inside', _.get( MembraneTransportStrings, 'insideStringProperty' ) ),
  _comment_2: new FluentComment( {"comment":"On the Toolbox","associatedKey":"voltageGatedChannels"} ),
  voltageGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'voltageGatedChannels', _.get( MembraneTransportStrings, 'voltageGatedChannelsStringProperty' ) ),
  ligandGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'ligandGatedChannels', _.get( MembraneTransportStrings, 'ligandGatedChannelsStringProperty' ) ),
  activeTransportersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'activeTransporters', _.get( MembraneTransportStrings, 'activeTransportersStringProperty' ) ),
  leakageChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'leakageChannels', _.get( MembraneTransportStrings, 'leakageChannelsStringProperty' ) ),
  NaPlusKPlusPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'NaPlusKPlusPump', _.get( MembraneTransportStrings, 'NaPlusKPlusPumpStringProperty' ) ),
  sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'sodiumGlucoseCotransporterStringProperty' ) ),
  _comment_3: new FluentComment( {"comment":"Membrane Potential Section","associatedKey":"membranePotential_mV"} ),
  membranePotential_mVStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membranePotential_mV', _.get( MembraneTransportStrings, 'membranePotential_mVStringProperty' ) ),
  chargesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'charges', _.get( MembraneTransportStrings, 'chargesStringProperty' ) ),
  _comment_4: new FluentComment( {"comment":"Ligands Section","associatedKey":"addLigands"} ),
  addLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'addLigands', _.get( MembraneTransportStrings, 'addLigandsStringProperty' ) ),
  removeLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'removeLigands', _.get( MembraneTransportStrings, 'removeLigandsStringProperty' ) ),
  _comment_5: new FluentComment( {"comment":"Preferences Dialog","associatedKey":"animateLipids"} ),
  animateLipidsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipids', _.get( MembraneTransportStrings, 'animateLipidsStringProperty' ) ),
  animateLipidsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipidsDescription', _.get( MembraneTransportStrings, 'animateLipidsDescriptionStringProperty' ) ),
  glucoseMetabolismStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseMetabolism', _.get( MembraneTransportStrings, 'glucoseMetabolismStringProperty' ) ),
  glucoseMetabolismDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseMetabolismDescription', _.get( MembraneTransportStrings, 'glucoseMetabolismDescriptionStringProperty' ) ),
  preferencesDialog: {
    audio: {
      sounds: {
        stereoSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSounds', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoSoundsStringProperty' ) ),
        stereoSoundsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSoundsDescription', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty' ) )
      }
    }
  },
  _comment_6: new FluentComment( {"comment":"Solute Concentration Bar Charts","associatedKey":"soluteConcentrations"} ),
  soluteConcentrationsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteConcentrations', _.get( MembraneTransportStrings, 'soluteConcentrationsStringProperty' ) ),
  _comment_7: new FluentComment( {"comment":"Checkboxes below the play area","associatedKey":"crossingHighlights"} ),
  crossingHighlightsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'crossingHighlights', _.get( MembraneTransportStrings, 'crossingHighlightsStringProperty' ) ),
  crossingSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'crossingSounds', _.get( MembraneTransportStrings, 'crossingSoundsStringProperty' ) ),
  a11y: {
    simpleDiffusionScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_simpleDiffusionScreen_screenButtonsHelpText', _.get( MembraneTransportStrings, 'a11y.simpleDiffusionScreen.screenButtonsHelpTextStringProperty' ) )
    },
    facilitatedDiffusionScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_facilitatedDiffusionScreen_screenButtonsHelpText', _.get( MembraneTransportStrings, 'a11y.facilitatedDiffusionScreen.screenButtonsHelpTextStringProperty' ) )
    },
    activeTransportScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_activeTransportScreen_screenButtonsHelpText', _.get( MembraneTransportStrings, 'a11y.activeTransportScreen.screenButtonsHelpTextStringProperty' ) )
    },
    playgroundScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_playgroundScreen_screenButtonsHelpText', _.get( MembraneTransportStrings, 'a11y.playgroundScreen.screenButtonsHelpTextStringProperty' ) )
    },
    screenSummary: {
      playArea: {
        introStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_intro', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.introStringProperty' ) ),
        proteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_proteins', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.proteinsStringProperty' ) ),
        potentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_potential', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.potentialStringProperty' ) ),
        barChartsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_barCharts', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.barChartsStringProperty' ) ),
        screen1StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_screen1', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.screen1StringProperty' ) ),
        screen2and4StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_screen2and4', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.screen2and4StringProperty' ) ),
        screen3StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_screen3', _.get( MembraneTransportStrings, 'a11y.screenSummary.playArea.screen3StringProperty' ) )
      },
      controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_controlArea', _.get( MembraneTransportStrings, 'a11y.screenSummary.controlAreaStringProperty' ) ),
      currentDetails: {
        leadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_leadingParagraph', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.leadingParagraphStringProperty' ) ),
        noAddedSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_noAddedSolutes', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.noAddedSolutesStringProperty' ) ),
        soluteTypesOnOutside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_soluteTypesOnOutside', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.soluteTypesOnOutsideStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        soluteTypesOnInside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_soluteTypesOnInside', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.soluteTypesOnInsideStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        transportProteins: new FluentPattern<{ proteinCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, proteinTypeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_transportProteins', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.transportProteinsStringProperty' ), [{"name":"proteinCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"proteinTypeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        ligandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_ligands', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.ligandsStringProperty' ) ),
        atpReactingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_atpReacting', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.atpReactingStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"For the Membrane Potential radio buttons","associatedKey":"membranePotential"} ),
        _comment_1: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","associatedKey":"membranePotential"} ),
        membranePotential: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_membranePotential', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.membranePotentialStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] )
      },
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint', _.get( MembraneTransportStrings, 'a11y.screenSummary.interactionHintStringProperty' ) ),
      interactionHintWithTransportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHintWithTransportProteins', _.get( MembraneTransportStrings, 'a11y.screenSummary.interactionHintWithTransportProteinsStringProperty' ) )
    },
    soluteControls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.soluteControls.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControls.accessibleHelpTextStringProperty' ) )
    },
    eraseSolutesButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleNameStringProperty' ) ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleHelpTextStringProperty' ) )
    },
    crossingHighlightsCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingHighlightsCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.crossingHighlightsCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingHighlightsCheckbox_accessibleContextResponseChecked', _.get( MembraneTransportStrings, 'a11y.crossingHighlightsCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingHighlightsCheckbox_accessibleContextResponseUnchecked', _.get( MembraneTransportStrings, 'a11y.crossingHighlightsCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    crossingSoundsCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingSoundsCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.crossingSoundsCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingSoundsCheckbox_accessibleContextResponseChecked', _.get( MembraneTransportStrings, 'a11y.crossingSoundsCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_crossingSoundsCheckbox_accessibleContextResponseUnchecked', _.get( MembraneTransportStrings, 'a11y.crossingSoundsCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    transportProteinPanel: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.accessibleHeadingStringProperty' ) ),
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
        _comment_0: new FluentComment( {"comment":"For the Membrane Potential radio buttons","associatedKey":"membranePotential"} ),
        _comment_1: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","associatedKey":"membranePotential"} ),
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
          accessibleContextResponseCheckedNegative70StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseCheckedNegative70', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedNegative70StringProperty' ) ),
          accessibleContextResponseCheckedNegative50StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseCheckedNegative50', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedNegative50StringProperty' ) ),
          accessibleContextResponseCheckedPositive30StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseCheckedPositive30', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedPositive30StringProperty' ) ),
          accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleContextResponseUnchecked', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
        }
      },
      activeTransportProteinPanel: {
        sodiumPotassiumPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty' ) ),
        sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.accessibleHelpTextStringProperty' ) )
      }
    },
    ligandNode: {
      accessibleName: new FluentPattern<{ ligandType: 'starLigand' | 'triangleLigand' | TReadOnlyProperty<'starLigand' | 'triangleLigand'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleName', _.get( MembraneTransportStrings, 'a11y.ligandNode.accessibleNameStringProperty' ), [{"name":"ligandType","variants":["starLigand","triangleLigand"]}] ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandNode.accessibleHelpTextStringProperty' ) ),
      releasedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedResponseStringProperty' ) ),
      releasedOffMembraneResponse: new FluentPattern<{ ligandType: 'starLigand' | 'triangleLigand' | TReadOnlyProperty<'starLigand' | 'triangleLigand'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedOffMembraneResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedOffMembraneResponseStringProperty' ), [{"name":"ligandType","variants":["starLigand","triangleLigand"]}] ),
      releasedOnProteinResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedOnProteinResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedOnProteinResponseStringProperty' ) ),
      releasedOnBusyOrIncompatibleProteinResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedOnBusyOrIncompatibleProteinResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedOnBusyOrIncompatibleProteinResponseStringProperty' ) ),
      unboundResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_unboundResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.unboundResponseStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Spoken when the ligand moves above a protein that can open or close","associatedKey":"movedAboveLigandGatedChannelResponse"} ),
      movedAboveLigandGatedChannelResponse: new FluentPattern<{ index: FluentVariable, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_movedAboveLigandGatedChannelResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.movedAboveLigandGatedChannelResponseStringProperty' ), [{"name":"index"},{"name":"ligandType","variants":["triangleLigand","starLigand"]},{"name":"openOrClosed","variants":["open","closed"]},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
      _comment_1: new FluentComment( {"comment":"Spoken when the ligand moves above a protein that cannot open or close (leakage channel).","associatedKey":"movedAboveLeakageChannelResponse"} ),
      movedAboveLeakageChannelResponse: new FluentPattern<{ index: FluentVariable, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_movedAboveLeakageChannelResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.movedAboveLeakageChannelResponseStringProperty' ), [{"name":"index"},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
      _comment_2: new FluentComment( {"comment":"Spoken when the ligand moves above any other channel that can open/close, but does not bind to ligands.","associatedKey":"movedAboveOtherChannelResponse"} ),
      movedAboveOtherChannelResponse: new FluentPattern<{ index: FluentVariable, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_movedAboveOtherChannelResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.movedAboveOtherChannelResponseStringProperty' ), [{"name":"index"},{"name":"openOrClosed","variants":["open","closed"]},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
      _comment_3: new FluentComment( {"comment":"Spoken when the ligand is grabbed.","associatedKey":"grabbedResponse"} ),
      grabbedResponse: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_ligandNode_grabbedResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.grabbedResponseStringProperty' ), [{"name":"proteinCount"}] ),
      grabbedResponseWithHint: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_ligandNode_grabbedResponseWithHint', _.get( MembraneTransportStrings, 'a11y.ligandNode.grabbedResponseWithHintStringProperty' ), [{"name":"proteinCount"}] ),
      grabbedResponseWithEmptyMembraneHint: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_ligandNode_grabbedResponseWithEmptyMembraneHint', _.get( MembraneTransportStrings, 'a11y.ligandNode.grabbedResponseWithEmptyMembraneHintStringProperty' ), [{"name":"proteinCount"}] )
    },
    _comment_0: new FluentComment( {"comment":"The membrane potential value, used in various places.","associatedKey":"membranePotentialValue"} ),
    membranePotentialValue: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_membranePotentialValue', _.get( MembraneTransportStrings, 'a11y.membranePotentialValueStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
    _comment_1: new FluentComment( {"comment":"Accessible names for solute radio buttons","associatedKey":"soluteAccessibleNames"} ),
    soluteAccessibleNames: {
      oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_oxygen', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.oxygenStringProperty' ) ),
      carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_carbonDioxide', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.carbonDioxideStringProperty' ) ),
      sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_sodiumIon', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.sodiumIonStringProperty' ) ),
      potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_potassiumIon', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.potassiumIonStringProperty' ) ),
      glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_glucose', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.glucoseStringProperty' ) ),
      atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_atp', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.atpStringProperty' ) )
    },
    _comment_2: new FluentComment( {"comment":"Names for the solute type. Reused in various places.","associatedKey":"solute"} ),
    solute: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solute', _.get( MembraneTransportStrings, 'a11y.soluteStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    _comment_3: new FluentComment( {"comment":"Capitalized names for the solute type. Reused in various places.","associatedKey":"soluteCapitalized"} ),
    soluteCapitalized: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCapitalized', _.get( MembraneTransportStrings, 'a11y.soluteCapitalizedStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    _comment_4: new FluentComment( {"comment":"Brevity is the soul of wit, so we use these brief names in various places.","associatedKey":"soluteBrief"} ),
    soluteBrief: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteBrief', _.get( MembraneTransportStrings, 'a11y.soluteBriefStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
    soluteControl: {
      _comment_0: new FluentComment( {"comment":"Cell Regions","associatedKey":"outside"} ),
      outside: {
        accessibleName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_outside_accessibleName', _.get( MembraneTransportStrings, 'a11y.soluteControl.outside.accessibleNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_outside_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControl.outside.accessibleHelpTextStringProperty' ) )
      },
      inside: {
        accessibleName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_inside_accessibleName', _.get( MembraneTransportStrings, 'a11y.soluteControl.inside.accessibleNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_inside_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControl.inside.accessibleHelpTextStringProperty' ) )
      },
      voicingHintResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_voicingHintResponse', _.get( MembraneTransportStrings, 'a11y.soluteControl.voicingHintResponseStringProperty' ) ),
      accessibleRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleRoleDescription', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleRoleDescriptionStringProperty' ) ),
      accessibleObjectResponse: new FluentPattern<{ amount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleObjectResponse', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleObjectResponseStringProperty' ), [{"name":"amount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      accessibleContextResponse: new FluentPattern<{ addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSameOrNone: 'none' | 'same' | number | 'other' | 'more' | 'less' | TReadOnlyProperty<'none' | 'same' | number | 'other' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleContextResponseStringProperty' ), [{"name":"addedOrRemoved","variants":["added","removed"]},{"name":"amount","variants":["aLittle","aLot"]},{"name":"differenceSize","variants":["aLittle","aLot"]},{"name":"directionality","variants":["insideThanOutside","outsideThanInside"]},{"name":"moreOrLessOrSameOrNone","variants":["none","same",{"type":"number","value":"other"},"more","less"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] )
    },
    soluteConcentrationsAccordionBox: {
      descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_descriptionContent', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty' ) ),
      barChart: {
        accessibleName: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside'>, crossing: 'none' | 'inside' | 'outside' | 'both' | TReadOnlyProperty<'none' | 'inside' | 'outside' | 'both'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleName', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyMoreOutside","aboutTwiceAsManyOutside","someMoreOutside","roughlyEqualOutside","manyMoreInside","aboutTwiceAsManyInside","someMoreInside","roughlyEqualInside"]},{"name":"crossing","variants":["none","inside","outside","both"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        comparison: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_comparison', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.comparisonStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyMoreOutside","aboutTwiceAsManyOutside","someMoreOutside","roughlyEqualOutside","manyMoreInside","aboutTwiceAsManyInside","someMoreInside","roughlyEqualInside"]}] ),
        crossing: new FluentPattern<{ crossing: 'none' | 'inside' | 'outside' | 'both' | TReadOnlyProperty<'none' | 'inside' | 'outside' | 'both'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_crossing', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.crossingStringProperty' ), [{"name":"crossing","variants":["none","inside","outside","both"]}] )
      }
    },
    soluteCrossing: {
      initialResponse: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCrossing_initialResponse', _.get( MembraneTransportStrings, 'a11y.soluteCrossing.initialResponseStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyMoreOutside","aboutTwiceAsManyOutside","someMoreOutside","roughlyEqualOutside","manyMoreInside","aboutTwiceAsManyInside","someMoreInside","roughlyEqualInside"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      subsequentResponse: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'someMoreOutside' | 'roughlyEqualOutside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'someMoreInside' | 'roughlyEqualInside'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCrossing_subsequentResponse', _.get( MembraneTransportStrings, 'a11y.soluteCrossing.subsequentResponseStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyMoreOutside","aboutTwiceAsManyOutside","someMoreOutside","roughlyEqualOutside","manyMoreInside","aboutTwiceAsManyInside","someMoreInside","roughlyEqualInside"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      inBalanceResponse: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCrossing_inBalanceResponse', _.get( MembraneTransportStrings, 'a11y.soluteCrossing.inBalanceResponseStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      manyTypesResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteCrossing_manyTypesResponse', _.get( MembraneTransportStrings, 'a11y.soluteCrossing.manyTypesResponseStringProperty' ) ),
      manyTypesInBalanceResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteCrossing_manyTypesInBalanceResponse', _.get( MembraneTransportStrings, 'a11y.soluteCrossing.manyTypesInBalanceResponseStringProperty' ) )
    },
    ligandToggleButton: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButton_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandToggleButton.accessibleHelpTextStringProperty' ) ),
      addedAccessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButton_addedAccessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButton.addedAccessibleContextResponseStringProperty' ) ),
      removedAccessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButton_removedAccessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButton.removedAccessibleContextResponseStringProperty' ) )
    },
    cellMembrane: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHeadingStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"A description of the cell membrane when there are no solutes, and you cannot add any proteins.","associatedKey":"accessibleHelpTextNoSolutesProteinsHidden"} ),
      accessibleHelpTextNoSolutesProteinsHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextNoSolutesProteinsHidden', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextNoSolutesProteinsHiddenStringProperty' ) ),
      _comment_1: new FluentComment( {"comment":"A description of the cell membrane when there ARE solutes, but you cannot add any proteins.","associatedKey":"accessibleHelpTextWithSolutesProteinsHidden"} ),
      accessibleHelpTextWithSolutesProteinsHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextWithSolutesProteinsHidden', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextWithSolutesProteinsHiddenStringProperty' ) ),
      _comment_2: new FluentComment( {"comment":"A description of the cell membrane when there are no solutes and no proteins yet.","associatedKey":"accessibleHelpTextNoSolutesOrProteins"} ),
      accessibleHelpTextNoSolutesOrProteins: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextNoSolutesOrProteins', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextNoSolutesOrProteinsStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
      _comment_3: new FluentComment( {"comment":"A description of the cell membrane when there are solutes but no proteins yet.","associatedKey":"accessibleHelpTextWithSolutesNoProteins"} ),
      accessibleHelpTextWithSolutesNoProteins: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextWithSolutesNoProteins', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextWithSolutesNoProteinsStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
      _comment_4: new FluentComment( {"comment":"A description of the cell membrane when there are no solutes but there are proteins.","associatedKey":"accessibleHelpTextWithProteinsNoSolutes"} ),
      accessibleHelpTextWithProteinsNoSolutes: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30>, typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextWithProteinsNoSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextWithProteinsNoSolutesStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]},{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
      _comment_5: new FluentComment( {"comment":"A description of the cell membrane when there are solutes and proteins.","associatedKey":"accessibleHelpTextWithSolutesAndProteins"} ),
      accessibleHelpTextWithSolutesAndProteins: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30>, typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextWithSolutesAndProteins', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextWithSolutesAndProteinsStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]},{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] )
    },
    transportProtein: {
      _comment_0: new FluentComment( {"comment":"Spoken when the ligand is grabbed.","associatedKey":"grabbedResponse"} ),
      grabbedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_grabbedResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.grabbedResponseStringProperty' ) ),
      offMembraneResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_offMembraneResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.offMembraneResponseStringProperty' ) ),
      releasedReplacedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_releasedReplacedResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.releasedReplacedResponseStringProperty' ) ),
      deletedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_deletedResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.deletedResponseStringProperty' ) ),
      cancelledResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_cancelledResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.cancelledResponseStringProperty' ) ),
      objectResponse: new FluentPattern<{ proteinCount: FluentVariable, proteinIndex: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_objectResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.objectResponseStringProperty' ), [{"name":"proteinCount"},{"name":"proteinIndex"}] ),
      accessibleName: new FluentPattern<{ nameResponse: FluentVariable, objectResponse: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleNameStringProperty' ), [{"name":"nameResponse"},{"name":"objectResponse"}] ),
      accessibleNameReversed: new FluentPattern<{ nameResponse: FluentVariable, objectResponse: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleNameReversed', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleNameReversedStringProperty' ), [{"name":"nameResponse"},{"name":"objectResponse"}] ),
      accessibleObjectResponse: new FluentPattern<{ slotCount: FluentVariable, slotIndex: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleObjectResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleObjectResponseStringProperty' ), [{"name":"slotCount"},{"name":"slotIndex"}] ),
      _comment_1: new FluentComment( {"comment":"Included in the accessibleName for the protein when it is above an empty slot.","associatedKey":"empty"} ),
      emptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_empty', _.get( MembraneTransportStrings, 'a11y.transportProtein.emptyStringProperty' ) ),
      _comment_2: new FluentComment( {"comment":"Transport protein brief names, used reused in several in the simulation.","associatedKey":"briefName"} ),
      briefName: new FluentPattern<{ type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_transportProtein_briefName', _.get( MembraneTransportStrings, 'a11y.transportProtein.briefNameStringProperty' ), [{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] )
    },
    _comment_5: new FluentComment( {"comment":"For the Membrane Potential radio buttons","associatedKey":"membranePotential"} ),
    _comment_6: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","associatedKey":"membranePotential"} ),
    membranePotential: {
      sodiumVoltageGatedOpenedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_sodiumVoltageGatedOpenedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.sodiumVoltageGatedOpenedResponseStringProperty' ) ),
      sodiumVoltageGatedClosedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_sodiumVoltageGatedClosedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.sodiumVoltageGatedClosedResponseStringProperty' ) ),
      potassiumVoltageGatedOpenedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_potassiumVoltageGatedOpenedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.potassiumVoltageGatedOpenedResponseStringProperty' ) ),
      potassiumVoltageGatedClosedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_potassiumVoltageGatedClosedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.potassiumVoltageGatedClosedResponseStringProperty' ) ),
      sodiumOpenedPotassiumOpenedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_sodiumOpenedPotassiumOpenedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.sodiumOpenedPotassiumOpenedResponseStringProperty' ) ),
      sodiumOpenedPotassiumClosedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_sodiumOpenedPotassiumClosedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.sodiumOpenedPotassiumClosedResponseStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"We like to say opening first, since users are more interested to hear what just opened.","associatedKey":"sodiumClosedPotassiumOpenedResponse"} ),
      sodiumClosedPotassiumOpenedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_sodiumClosedPotassiumOpenedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.sodiumClosedPotassiumOpenedResponseStringProperty' ) ),
      sodiumClosedPotassiumClosedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_sodiumClosedPotassiumClosedResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.sodiumClosedPotassiumClosedResponseStringProperty' ) ),
      noChangeResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membranePotential_noChangeResponse', _.get( MembraneTransportStrings, 'a11y.membranePotential.noChangeResponseStringProperty' ) )
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register('MembraneTransportFluent', MembraneTransportFluent);
