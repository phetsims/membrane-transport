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
addToMapIfDefined( 'soluteNames_oxygen', 'soluteNames.oxygenStringProperty' );
addToMapIfDefined( 'soluteNames_carbonDioxide', 'soluteNames.carbonDioxideStringProperty' );
addToMapIfDefined( 'soluteNames_sodiumIon', 'soluteNames.sodiumIonStringProperty' );
addToMapIfDefined( 'soluteNames_potassiumIon', 'soluteNames.potassiumIonStringProperty' );
addToMapIfDefined( 'soluteNames_glucose', 'soluteNames.glucoseStringProperty' );
addToMapIfDefined( 'soluteNames_atp', 'soluteNames.atpStringProperty' );
addToMapIfDefined( 'cellRegions_outside', 'cellRegions.outsideStringProperty' );
addToMapIfDefined( 'cellRegions_inside', 'cellRegions.insideStringProperty' );
addToMapIfDefined( 'transportProteinPanel_voltageGatedChannels', 'transportProteinPanel.voltageGatedChannelsStringProperty' );
addToMapIfDefined( 'transportProteinPanel_ligandGatedChannels', 'transportProteinPanel.ligandGatedChannelsStringProperty' );
addToMapIfDefined( 'transportProteinPanel_activeTransporters', 'transportProteinPanel.activeTransportersStringProperty' );
addToMapIfDefined( 'transportProteinPanel_leakageChannels', 'transportProteinPanel.leakageChannelsStringProperty' );
addToMapIfDefined( 'transportProteinPanel_naPlusKPlusPump', 'transportProteinPanel.naPlusKPlusPumpStringProperty' );
addToMapIfDefined( 'transportProteinPanel_sodiumGlucoseCotransporter', 'transportProteinPanel.sodiumGlucoseCotransporterStringProperty' );
addToMapIfDefined( 'transportProteinPanel_membranePotentialMV', 'transportProteinPanel.membranePotentialMVStringProperty' );
addToMapIfDefined( 'transportProteinPanel_charges', 'transportProteinPanel.chargesStringProperty' );
addToMapIfDefined( 'transportProteinPanel_addLigands', 'transportProteinPanel.addLigandsStringProperty' );
addToMapIfDefined( 'transportProteinPanel_removeLigands', 'transportProteinPanel.removeLigandsStringProperty' );
addToMapIfDefined( 'preferencesDialog_animateLipids_label', 'preferencesDialog.animateLipids.labelStringProperty' );
addToMapIfDefined( 'preferencesDialog_animateLipids_description', 'preferencesDialog.animateLipids.descriptionStringProperty' );
addToMapIfDefined( 'preferencesDialog_glucoseMetabolism_label', 'preferencesDialog.glucoseMetabolism.labelStringProperty' );
addToMapIfDefined( 'preferencesDialog_glucoseMetabolism_description', 'preferencesDialog.glucoseMetabolism.descriptionStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoCrossingSounds_label', 'preferencesDialog.audio.sounds.stereoCrossingSounds.labelStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoCrossingSounds_description', 'preferencesDialog.audio.sounds.stereoCrossingSounds.descriptionStringProperty' );
addToMapIfDefined( 'soluteConcentrationsAccordionBox_title', 'soluteConcentrationsAccordionBox.titleStringProperty' );
addToMapIfDefined( 'settings_crossingHighlights', 'settings.crossingHighlightsStringProperty' );
addToMapIfDefined( 'settings_crossingSounds', 'settings.crossingSoundsStringProperty' );
addToMapIfDefined( 'keyboardHelp_soluteAdjusters_title', 'keyboardHelp.soluteAdjusters.titleStringProperty' );
addToMapIfDefined( 'keyboardHelp_soluteAdjusters_addOrRemoveALot', 'keyboardHelp.soluteAdjusters.addOrRemoveALotStringProperty' );
addToMapIfDefined( 'keyboardHelp_soluteAdjusters_addOrRemoveALittle', 'keyboardHelp.soluteAdjusters.addOrRemoveALittleStringProperty' );
addToMapIfDefined( 'keyboardHelp_transportProteinsAndLigands_title', 'keyboardHelp.transportProteinsAndLigands.titleStringProperty' );
addToMapIfDefined( 'keyboardHelp_transportProteinsAndLigands_navigate', 'keyboardHelp.transportProteinsAndLigands.navigateStringProperty' );
addToMapIfDefined( 'keyboardHelp_transportProteinsAndLigands_grabOrRelease', 'keyboardHelp.transportProteinsAndLigands.grabOrReleaseStringProperty' );
addToMapIfDefined( 'keyboardHelp_transportProteinsAndLigands_moveGrabbedItem', 'keyboardHelp.transportProteinsAndLigands.moveGrabbedItemStringProperty' );
addToMapIfDefined( 'keyboardHelp_transportProteinsAndLigands_cancelGrab', 'keyboardHelp.transportProteinsAndLigands.cancelGrabStringProperty' );
addToMapIfDefined( 'keyboardHelp_sortOrDeleteProteins_title', 'keyboardHelp.sortOrDeleteProteins.titleStringProperty' );
addToMapIfDefined( 'keyboardHelp_sortOrDeleteProteins_navigateProteins', 'keyboardHelp.sortOrDeleteProteins.navigateProteinsStringProperty' );
addToMapIfDefined( 'keyboardHelp_sortOrDeleteProteins_grabProtein', 'keyboardHelp.sortOrDeleteProteins.grabProteinStringProperty' );
addToMapIfDefined( 'keyboardHelp_sortOrDeleteProteins_moveGrabbedProtein', 'keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinStringProperty' );
addToMapIfDefined( 'keyboardHelp_sortOrDeleteProteins_releaseProtein', 'keyboardHelp.sortOrDeleteProteins.releaseProteinStringProperty' );
addToMapIfDefined( 'keyboardHelp_sortOrDeleteProteins_deleteProtein', 'keyboardHelp.sortOrDeleteProteins.deleteProteinStringProperty' );
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
addToMapIfDefined( 'a11y_screenSummary_currentDetails_noAddedProteins', 'a11y.screenSummary.currentDetails.noAddedProteinsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_soluteTypesOnOutside', 'a11y.screenSummary.currentDetails.soluteTypesOnOutsideStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_soluteTypesOnInside', 'a11y.screenSummary.currentDetails.soluteTypesOnInsideStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_transportProteins', 'a11y.screenSummary.currentDetails.transportProteinsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_ligands', 'a11y.screenSummary.currentDetails.ligandsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_atpReacting', 'a11y.screenSummary.currentDetails.atpReactingStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_membranePotential', 'a11y.screenSummary.currentDetails.membranePotentialStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_glucoseMetabolism', 'a11y.screenSummary.currentDetails.glucoseMetabolismStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint', 'a11y.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHintWithTransportProteins', 'a11y.screenSummary.interactionHintWithTransportProteinsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_customInteractionsHint', 'a11y.screenSummary.customInteractionsHintStringProperty' );
addToMapIfDefined( 'a11y_soluteControls_accessibleHeading', 'a11y.soluteControls.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_soluteControls_accessibleHelpText', 'a11y.soluteControls.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleName', 'a11y.eraseSolutesButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleContextResponse', 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleHelpText', 'a11y.eraseSolutesButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_settings_crossingHighlightsCheckbox_accessibleHelpText', 'a11y.settings.crossingHighlightsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_settings_crossingHighlightsCheckbox_accessibleContextResponseChecked', 'a11y.settings.crossingHighlightsCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_settings_crossingHighlightsCheckbox_accessibleContextResponseUnchecked', 'a11y.settings.crossingHighlightsCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_settings_crossingSoundsCheckbox_accessibleHelpText', 'a11y.settings.crossingSoundsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_settings_crossingSoundsCheckbox_accessibleContextResponseChecked', 'a11y.settings.crossingSoundsCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_settings_crossingSoundsCheckbox_accessibleContextResponseUnchecked', 'a11y.settings.crossingSoundsCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_accessibleHeading', 'a11y.transportProteinPanel.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_accessibleHelpText', 'a11y.transportProteinPanel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', 'a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', 'a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_accessibleHelpText', 'a11y.transportProteinPanel.ligandGatedChannelPanel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', 'a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', 'a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_accessibleHelpText', 'a11y.transportProteinPanel.leakageChannelPanel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', 'a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', 'a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty' );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_accessibleHelpText', 'a11y.transportProteinPanel.voltageGatedChannelPanel.accessibleHelpTextStringProperty' );
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
addToMapIfDefined( 'a11y_solutes_lowercaseName', 'a11y.solutes.lowercaseNameStringProperty' );
addToMapIfDefined( 'a11y_solutes_uppercaseName', 'a11y.solutes.uppercaseNameStringProperty' );
addToMapIfDefined( 'a11y_solutes_briefName', 'a11y.solutes.briefNameStringProperty' );
addToMapIfDefined( 'a11y_solutes_amountComparison', 'a11y.solutes.amountComparisonStringProperty' );
addToMapIfDefined( 'a11y_solutes_averageCrossingDirection', 'a11y.solutes.averageCrossingDirectionStringProperty' );
addToMapIfDefined( 'a11y_solutesPanel_oxygenRadioButton', 'a11y.solutesPanel.oxygenRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_solutesPanel_carbonDioxideRadioButton', 'a11y.solutesPanel.carbonDioxideRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_solutesPanel_sodiumIonRadioButton', 'a11y.solutesPanel.sodiumIonRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_solutesPanel_potassiumIonRadioButton', 'a11y.solutesPanel.potassiumIonRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_solutesPanel_glucoseRadioButton', 'a11y.solutesPanel.glucoseRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_solutesPanel_atpRadioButton', 'a11y.solutesPanel.atpRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_outside_accessibleName', 'a11y.soluteControl.outside.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_outside_accessibleHelpText', 'a11y.soluteControl.outside.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_inside_accessibleName', 'a11y.soluteControl.inside.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_inside_accessibleHelpText', 'a11y.soluteControl.inside.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_voicingHintResponse', 'a11y.soluteControl.voicingHintResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleRoleDescription', 'a11y.soluteControl.accessibleRoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleHelpTextAllDisabled', 'a11y.soluteControl.accessibleHelpTextAllDisabledStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleObjectResponse', 'a11y.soluteControl.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteControl_accessibleContextResponse', 'a11y.soluteControl.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_descriptionContent', 'a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_voicingHintResponseCollapsed', 'a11y.soluteConcentrationsAccordionBox.voicingHintResponseCollapsedStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithNoParticles', 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithNoParticlesStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithParticles', 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithParticlesStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_glucoseMetabolism', 'a11y.soluteConcentrationsAccordionBox.barChart.glucoseMetabolismStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithParticlesAndGlucoseMetabolism', 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithParticlesAndGlucoseMetabolismStringProperty' );
addToMapIfDefined( 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithNoParticlesAndGlucoseMetabolism', 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithNoParticlesAndGlucoseMetabolismStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButton_accessibleHelpText', 'a11y.ligandToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButton_addedAccessibleContextResponse', 'a11y.ligandToggleButton.addedAccessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_ligandToggleButton_removedAccessibleContextResponse', 'a11y.ligandToggleButton.removedAccessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHeading', 'a11y.cellMembrane.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinTypeCountDescription', 'a11y.cellMembrane.accessibleStateDescription.proteinTypeCountDescriptionStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsHidden_potentialHidden_noSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsHidden.potentialHidden.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsHidden_potentialHidden_withSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsHidden.potentialHidden.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_noProteins_noSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.noProteins.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_noProteins_withSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.noProteins.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_withProteins_noSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.withProteins.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_withProteins_withSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.withProteins.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_noProteins_noSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.noProteins.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_noProteins_withSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.noProteins.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_withProteins_noSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.withProteins.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_withProteins_withSolutes', 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.withProteins.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpText_proteinsHidden_noSolutes', 'a11y.cellMembrane.accessibleHelpText.proteinsHidden.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpText_proteinsHidden_withSolutes', 'a11y.cellMembrane.accessibleHelpText.proteinsHidden.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpText_proteinsShown_noProteins_noSolutes', 'a11y.cellMembrane.accessibleHelpText.proteinsShown.noProteins.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpText_proteinsShown_noProteins_withSolutes', 'a11y.cellMembrane.accessibleHelpText.proteinsShown.noProteins.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpText_proteinsShown_withProteins_noSolutes', 'a11y.cellMembrane.accessibleHelpText.proteinsShown.withProteins.noSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpText_proteinsShown_withProteins_withSolutes', 'a11y.cellMembrane.accessibleHelpText.proteinsShown.withProteins.withSolutesStringProperty' );
addToMapIfDefined( 'a11y_cellMembrane_accessibleHelpTextPattern', 'a11y.cellMembrane.accessibleHelpTextPatternStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_grabbedResponse', 'a11y.transportProtein.grabbedResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_offMembraneResponse', 'a11y.transportProtein.offMembraneResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_releasedReplacedResponse', 'a11y.transportProtein.releasedReplacedResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_deletedResponse', 'a11y.transportProtein.deletedResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_cancelledResponse', 'a11y.transportProtein.cancelledResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_proteinLocation', 'a11y.transportProtein.proteinLocationStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleName', 'a11y.transportProtein.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleObjectResponse', 'a11y.transportProtein.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleParagraph', 'a11y.transportProtein.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleContextResponse', 'a11y.transportProtein.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleNameMoving', 'a11y.transportProtein.accessibleNameMovingStringProperty' );
addToMapIfDefined( 'a11y_transportProtein_accessibleObjectResponseMoving', 'a11y.transportProtein.accessibleObjectResponseMovingStringProperty' );
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
addToMapIfDefined( 'a11y_keyboardHelp_soluteAdjusters_addOrRemoveALotDescription', 'a11y.keyboardHelp.soluteAdjusters.addOrRemoveALotDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_soluteAdjusters_addOrRemoveALittleDescription', 'a11y.keyboardHelp.soluteAdjusters.addOrRemoveALittleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_transportProteinsAndLigands_navigateDescription', 'a11y.keyboardHelp.transportProteinsAndLigands.navigateDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_transportProteinsAndLigands_grabOrReleaseDescription', 'a11y.keyboardHelp.transportProteinsAndLigands.grabOrReleaseDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_transportProteinsAndLigands_moveGrabbedItemDescription', 'a11y.keyboardHelp.transportProteinsAndLigands.moveGrabbedItemDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_transportProteinsAndLigands_cancelGrabDescription', 'a11y.keyboardHelp.transportProteinsAndLigands.cancelGrabDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_sortOrDeleteProteins_navigateProteinsDescription', 'a11y.keyboardHelp.sortOrDeleteProteins.navigateProteinsDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_sortOrDeleteProteins_grabProteinDescription', 'a11y.keyboardHelp.sortOrDeleteProteins.grabProteinDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_sortOrDeleteProteins_moveGrabbedProteinDescription', 'a11y.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_sortOrDeleteProteins_releaseProteinDescription', 'a11y.keyboardHelp.sortOrDeleteProteins.releaseProteinDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelp_sortOrDeleteProteins_deleteProteinDescription', 'a11y.keyboardHelp.sortOrDeleteProteins.deleteProteinDescriptionStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_particleCrossing', 'a11y.membraneTransportDescriber.particleCrossingStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_hints_ligandGatedChannelWithoutLigands', 'a11y.membraneTransportDescriber.hints.ligandGatedChannelWithoutLigandsStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_hints_voltageGatedChannelAtRestingPotential', 'a11y.membraneTransportDescriber.hints.voltageGatedChannelAtRestingPotentialStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_hints_pumpAwaitingPhosphateWithoutATP', 'a11y.membraneTransportDescriber.hints.pumpAwaitingPhosphateWithoutATPStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_hints_sodiumGlucoseCotransporterWithLowOutsideSodium', 'a11y.membraneTransportDescriber.hints.sodiumGlucoseCotransporterWithLowOutsideSodiumStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_commaSeparator', 'a11y.membraneTransportDescriber.commaSeparatorStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_andSeparator', 'a11y.membraneTransportDescriber.andSeparatorStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_sentencePattern', 'a11y.membraneTransportDescriber.sentencePatternStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_crossingSteadilyInBothDirections', 'a11y.membraneTransportDescriber.crossingSteadilyInBothDirectionsStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_crossingChannelsWithDirection', 'a11y.membraneTransportDescriber.crossingChannelsWithDirectionStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_crossingMembraneWithDirection', 'a11y.membraneTransportDescriber.crossingMembraneWithDirectionStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_multipleSolutesCrossing', 'a11y.membraneTransportDescriber.multipleSolutesCrossingStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_soluteComparisonWithName', 'a11y.membraneTransportDescriber.soluteComparisonWithNameStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_sodiumPumpedOutside', 'a11y.membraneTransportDescriber.sodiumPumpedOutsideStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_potassiumPumpedInside', 'a11y.membraneTransportDescriber.potassiumPumpedInsideStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_sodiumPumpedOutsideAndPotassiumPumpedInside', 'a11y.membraneTransportDescriber.sodiumPumpedOutsideAndPotassiumPumpedInsideStringProperty' );
addToMapIfDefined( 'a11y_membraneTransportDescriber_sodiumAndGlucoseShuttledInside', 'a11y.membraneTransportDescriber.sodiumAndGlucoseShuttledInsideStringProperty' );
addToMapIfDefined( 'a11y_preferencesDialog_animateLipids_accessibleContextResponseLeftValue', 'a11y.preferencesDialog.animateLipids.accessibleContextResponseLeftValueStringProperty' );
addToMapIfDefined( 'a11y_preferencesDialog_animateLipids_accessibleContextResponseRightValue', 'a11y.preferencesDialog.animateLipids.accessibleContextResponseRightValueStringProperty' );
addToMapIfDefined( 'a11y_preferencesDialog_glucoseMetabolism_accessibleContextResponseLeftValue', 'a11y.preferencesDialog.glucoseMetabolism.accessibleContextResponseLeftValueStringProperty' );
addToMapIfDefined( 'a11y_preferencesDialog_glucoseMetabolism_accessibleContextResponseRightValue', 'a11y.preferencesDialog.glucoseMetabolism.accessibleContextResponseRightValueStringProperty' );

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
  _comment_1: new FluentComment( {"comment":"Names for the solute type. Reused in various places.","associatedKey":"solutes"} ),
  solutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'solutes', _.get( MembraneTransportStrings, 'solutesStringProperty' ) ),
  _comment_2: new FluentComment( {"comment":"Solute Types","associatedKey":"soluteNames"} ),
  soluteNames: {
    oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteNames_oxygen', _.get( MembraneTransportStrings, 'soluteNames.oxygenStringProperty' ) ),
    carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteNames_carbonDioxide', _.get( MembraneTransportStrings, 'soluteNames.carbonDioxideStringProperty' ) ),
    sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteNames_sodiumIon', _.get( MembraneTransportStrings, 'soluteNames.sodiumIonStringProperty' ) ),
    potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteNames_potassiumIon', _.get( MembraneTransportStrings, 'soluteNames.potassiumIonStringProperty' ) ),
    glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteNames_glucose', _.get( MembraneTransportStrings, 'soluteNames.glucoseStringProperty' ) ),
    atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteNames_atp', _.get( MembraneTransportStrings, 'soluteNames.atpStringProperty' ) )
  },
  _comment_3: new FluentComment( {"comment":"Cell Regions","associatedKey":"cellRegions"} ),
  cellRegions: {
    outsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'cellRegions_outside', _.get( MembraneTransportStrings, 'cellRegions.outsideStringProperty' ) ),
    insideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'cellRegions_inside', _.get( MembraneTransportStrings, 'cellRegions.insideStringProperty' ) )
  },
  _comment_4: new FluentComment( {"comment":"On the Toolbox","associatedKey":"transportProteinPanel"} ),
  transportProteinPanel: {
    voltageGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_voltageGatedChannels', _.get( MembraneTransportStrings, 'transportProteinPanel.voltageGatedChannelsStringProperty' ) ),
    ligandGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_ligandGatedChannels', _.get( MembraneTransportStrings, 'transportProteinPanel.ligandGatedChannelsStringProperty' ) ),
    activeTransportersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_activeTransporters', _.get( MembraneTransportStrings, 'transportProteinPanel.activeTransportersStringProperty' ) ),
    leakageChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_leakageChannels', _.get( MembraneTransportStrings, 'transportProteinPanel.leakageChannelsStringProperty' ) ),
    naPlusKPlusPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_naPlusKPlusPump', _.get( MembraneTransportStrings, 'transportProteinPanel.naPlusKPlusPumpStringProperty' ) ),
    sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'transportProteinPanel.sodiumGlucoseCotransporterStringProperty' ) ),
    _comment_0: new FluentComment( {"comment":"Membrane Potential Section","associatedKey":"membranePotentialMV"} ),
    membranePotentialMVStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_membranePotentialMV', _.get( MembraneTransportStrings, 'transportProteinPanel.membranePotentialMVStringProperty' ) ),
    chargesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_charges', _.get( MembraneTransportStrings, 'transportProteinPanel.chargesStringProperty' ) ),
    _comment_1: new FluentComment( {"comment":"Ligands Section","associatedKey":"addLigands"} ),
    addLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_addLigands', _.get( MembraneTransportStrings, 'transportProteinPanel.addLigandsStringProperty' ) ),
    removeLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'transportProteinPanel_removeLigands', _.get( MembraneTransportStrings, 'transportProteinPanel.removeLigandsStringProperty' ) )
  },
  _comment_5: new FluentComment( {"comment":"Preferences Dialog","associatedKey":"preferencesDialog"} ),
  preferencesDialog: {
    animateLipids: {
      labelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_animateLipids_label', _.get( MembraneTransportStrings, 'preferencesDialog.animateLipids.labelStringProperty' ) ),
      descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_animateLipids_description', _.get( MembraneTransportStrings, 'preferencesDialog.animateLipids.descriptionStringProperty' ) )
    },
    glucoseMetabolism: {
      labelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_glucoseMetabolism_label', _.get( MembraneTransportStrings, 'preferencesDialog.glucoseMetabolism.labelStringProperty' ) ),
      descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_glucoseMetabolism_description', _.get( MembraneTransportStrings, 'preferencesDialog.glucoseMetabolism.descriptionStringProperty' ) )
    },
    audio: {
      sounds: {
        stereoCrossingSounds: {
          labelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoCrossingSounds_label', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoCrossingSounds.labelStringProperty' ) ),
          descriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoCrossingSounds_description', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoCrossingSounds.descriptionStringProperty' ) )
        }
      }
    }
  },
  _comment_6: new FluentComment( {"comment":"Solute Concentration Bar Charts","associatedKey":"soluteConcentrationsAccordionBox"} ),
  soluteConcentrationsAccordionBox: {
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteConcentrationsAccordionBox_title', _.get( MembraneTransportStrings, 'soluteConcentrationsAccordionBox.titleStringProperty' ) )
  },
  _comment_7: new FluentComment( {"comment":"Checkboxes below the play area","associatedKey":"settings"} ),
  settings: {
    crossingHighlightsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'settings_crossingHighlights', _.get( MembraneTransportStrings, 'settings.crossingHighlightsStringProperty' ) ),
    crossingSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'settings_crossingSounds', _.get( MembraneTransportStrings, 'settings.crossingSoundsStringProperty' ) )
  },
  _comment_8: new FluentComment( {"comment":"Keyboard Help Dialog","associatedKey":"keyboardHelp"} ),
  keyboardHelp: {
    soluteAdjusters: {
      titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_soluteAdjusters_title', _.get( MembraneTransportStrings, 'keyboardHelp.soluteAdjusters.titleStringProperty' ) ),
      addOrRemoveALotStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_soluteAdjusters_addOrRemoveALot', _.get( MembraneTransportStrings, 'keyboardHelp.soluteAdjusters.addOrRemoveALotStringProperty' ) ),
      addOrRemoveALittleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_soluteAdjusters_addOrRemoveALittle', _.get( MembraneTransportStrings, 'keyboardHelp.soluteAdjusters.addOrRemoveALittleStringProperty' ) )
    },
    transportProteinsAndLigands: {
      titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_transportProteinsAndLigands_title', _.get( MembraneTransportStrings, 'keyboardHelp.transportProteinsAndLigands.titleStringProperty' ) ),
      navigateStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_transportProteinsAndLigands_navigate', _.get( MembraneTransportStrings, 'keyboardHelp.transportProteinsAndLigands.navigateStringProperty' ) ),
      grabOrReleaseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_transportProteinsAndLigands_grabOrRelease', _.get( MembraneTransportStrings, 'keyboardHelp.transportProteinsAndLigands.grabOrReleaseStringProperty' ) ),
      moveGrabbedItemStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_transportProteinsAndLigands_moveGrabbedItem', _.get( MembraneTransportStrings, 'keyboardHelp.transportProteinsAndLigands.moveGrabbedItemStringProperty' ) ),
      cancelGrabStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_transportProteinsAndLigands_cancelGrab', _.get( MembraneTransportStrings, 'keyboardHelp.transportProteinsAndLigands.cancelGrabStringProperty' ) )
    },
    sortOrDeleteProteins: {
      titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_sortOrDeleteProteins_title', _.get( MembraneTransportStrings, 'keyboardHelp.sortOrDeleteProteins.titleStringProperty' ) ),
      navigateProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_sortOrDeleteProteins_navigateProteins', _.get( MembraneTransportStrings, 'keyboardHelp.sortOrDeleteProteins.navigateProteinsStringProperty' ) ),
      grabProteinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_sortOrDeleteProteins_grabProtein', _.get( MembraneTransportStrings, 'keyboardHelp.sortOrDeleteProteins.grabProteinStringProperty' ) ),
      moveGrabbedProteinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_sortOrDeleteProteins_moveGrabbedProtein', _.get( MembraneTransportStrings, 'keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinStringProperty' ) ),
      releaseProteinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_sortOrDeleteProteins_releaseProtein', _.get( MembraneTransportStrings, 'keyboardHelp.sortOrDeleteProteins.releaseProteinStringProperty' ) ),
      deleteProteinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'keyboardHelp_sortOrDeleteProteins_deleteProtein', _.get( MembraneTransportStrings, 'keyboardHelp.sortOrDeleteProteins.deleteProteinStringProperty' ) )
    }
  },
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
        noAddedProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_noAddedProteins', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.noAddedProteinsStringProperty' ) ),
        soluteTypesOnOutside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_soluteTypesOnOutside', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.soluteTypesOnOutsideStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        soluteTypesOnInside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_soluteTypesOnInside', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.soluteTypesOnInsideStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        transportProteins: new FluentPattern<{ proteinCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, proteinTypeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_transportProteins', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.transportProteinsStringProperty' ), [{"name":"proteinCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"proteinTypeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        ligandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_ligands', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.ligandsStringProperty' ) ),
        atpReactingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_atpReacting', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.atpReactingStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"For the Membrane Potential radio buttons","associatedKey":"membranePotential"} ),
        _comment_1: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","associatedKey":"membranePotential"} ),
        membranePotential: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_membranePotential', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.membranePotentialStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
        glucoseMetabolismStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_glucoseMetabolism', _.get( MembraneTransportStrings, 'a11y.screenSummary.currentDetails.glucoseMetabolismStringProperty' ) )
      },
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint', _.get( MembraneTransportStrings, 'a11y.screenSummary.interactionHintStringProperty' ) ),
      interactionHintWithTransportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHintWithTransportProteins', _.get( MembraneTransportStrings, 'a11y.screenSummary.interactionHintWithTransportProteinsStringProperty' ) ),
      customInteractionsHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_customInteractionsHint', _.get( MembraneTransportStrings, 'a11y.screenSummary.customInteractionsHintStringProperty' ) )
    },
    soluteControls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.soluteControls.accessibleHeadingStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
      _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControls.accessibleHelpTextStringProperty' ) )
    },
    _comment_0: new FluentComment( {"comment":"Only display help text when button is disabled","associatedKey":"eraseSolutesButton"} ),
    eraseSolutesButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleNameStringProperty' ) ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
      _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleHelpTextStringProperty' ) )
    },
    _comment_1: new FluentComment( {"comment":"Checkboxes below the play area","associatedKey":"settings"} ),
    settings: {
      crossingHighlightsCheckbox: {
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_settings_crossingHighlightsCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.settings.crossingHighlightsCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_settings_crossingHighlightsCheckbox_accessibleContextResponseChecked', _.get( MembraneTransportStrings, 'a11y.settings.crossingHighlightsCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_settings_crossingHighlightsCheckbox_accessibleContextResponseUnchecked', _.get( MembraneTransportStrings, 'a11y.settings.crossingHighlightsCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      crossingSoundsCheckbox: {
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_settings_crossingSoundsCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.settings.crossingSoundsCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_settings_crossingSoundsCheckbox_accessibleContextResponseChecked', _.get( MembraneTransportStrings, 'a11y.settings.crossingSoundsCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_settings_crossingSoundsCheckbox_accessibleContextResponseUnchecked', _.get( MembraneTransportStrings, 'a11y.settings.crossingSoundsCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      }
    },
    _comment_2: new FluentComment( {"comment":"On the Toolbox","associatedKey":"transportProteinPanel"} ),
    transportProteinPanel: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.accessibleHeadingStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
      _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.accessibleHelpTextStringProperty' ) ),
      ligandGatedChannelPanel: {
        sodiumIonNaPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty' ) ),
        potassiumIonKPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.accessibleHelpTextStringProperty' ) )
      },
      leakageChannelPanel: {
        sodiumIonNaPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty' ) ),
        potassiumIonKPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.accessibleHelpTextStringProperty' ) )
      },
      voltageGatedChannelPanel: {
        sodiumIonNaPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty' ) ),
        potassiumIonKPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.accessibleHelpTextStringProperty' ) ),
        _comment_2: new FluentComment( {"comment":"For the Membrane Potential radio buttons","associatedKey":"membranePotential"} ),
        _comment_3: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","associatedKey":"membranePotential"} ),
        membranePotential: {
          radioButtonGroup: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty' ) ),
            _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
            _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
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
          _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
          _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
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
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.accessibleHelpTextStringProperty' ) )
      }
    },
    ligandNode: {
      accessibleName: new FluentPattern<{ ligandType: 'starLigand' | 'triangleLigand' | TReadOnlyProperty<'starLigand' | 'triangleLigand'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleName', _.get( MembraneTransportStrings, 'a11y.ligandNode.accessibleNameStringProperty' ), [{"name":"ligandType","variants":["starLigand","triangleLigand"]}] ),
      _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
      _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandNode.accessibleHelpTextStringProperty' ) ),
      releasedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedResponseStringProperty' ) ),
      releasedOffMembraneResponse: new FluentPattern<{ ligandType: 'starLigand' | 'triangleLigand' | TReadOnlyProperty<'starLigand' | 'triangleLigand'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedOffMembraneResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedOffMembraneResponseStringProperty' ), [{"name":"ligandType","variants":["starLigand","triangleLigand"]}] ),
      releasedOnProteinResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedOnProteinResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedOnProteinResponseStringProperty' ) ),
      releasedOnBusyOrIncompatibleProteinResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedOnBusyOrIncompatibleProteinResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedOnBusyOrIncompatibleProteinResponseStringProperty' ) ),
      unboundResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_unboundResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.unboundResponseStringProperty' ) ),
      _comment_2: new FluentComment( {"comment":"Spoken when the ligand moves above a protein that can open or close","associatedKey":"movedAboveLigandGatedChannelResponse"} ),
      movedAboveLigandGatedChannelResponse: new FluentPattern<{ index: FluentVariable, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_movedAboveLigandGatedChannelResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.movedAboveLigandGatedChannelResponseStringProperty' ), [{"name":"index"},{"name":"ligandType","variants":["triangleLigand","starLigand"]},{"name":"openOrClosed","variants":["open","closed"]},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
      _comment_3: new FluentComment( {"comment":"Spoken when the ligand moves above a protein that cannot open or close (leakage channel).","associatedKey":"movedAboveLeakageChannelResponse"} ),
      movedAboveLeakageChannelResponse: new FluentPattern<{ index: FluentVariable, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_movedAboveLeakageChannelResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.movedAboveLeakageChannelResponseStringProperty' ), [{"name":"index"},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
      _comment_4: new FluentComment( {"comment":"Spoken when the ligand moves above any other channel that can open/close, but does not bind to ligands.","associatedKey":"movedAboveOtherChannelResponse"} ),
      movedAboveOtherChannelResponse: new FluentPattern<{ index: FluentVariable, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandNode_movedAboveOtherChannelResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.movedAboveOtherChannelResponseStringProperty' ), [{"name":"index"},{"name":"openOrClosed","variants":["open","closed"]},{"name":"transportProteinCount"},{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] ),
      _comment_5: new FluentComment( {"comment":"Spoken when the ligand is grabbed.","associatedKey":"grabbedResponse"} ),
      grabbedResponse: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_ligandNode_grabbedResponse', _.get( MembraneTransportStrings, 'a11y.ligandNode.grabbedResponseStringProperty' ), [{"name":"proteinCount"}] ),
      grabbedResponseWithHint: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_ligandNode_grabbedResponseWithHint', _.get( MembraneTransportStrings, 'a11y.ligandNode.grabbedResponseWithHintStringProperty' ), [{"name":"proteinCount"}] ),
      grabbedResponseWithEmptyMembraneHint: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_ligandNode_grabbedResponseWithEmptyMembraneHint', _.get( MembraneTransportStrings, 'a11y.ligandNode.grabbedResponseWithEmptyMembraneHintStringProperty' ), [{"name":"proteinCount"}] )
    },
    _comment_3: new FluentComment( {"comment":"The membrane potential value, used in various places.","associatedKey":"membranePotentialValue"} ),
    membranePotentialValue: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_membranePotentialValue', _.get( MembraneTransportStrings, 'a11y.membranePotentialValueStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
    _comment_4: new FluentComment( {"comment":"Solutes","associatedKey":"solutes"} ),
    _comment_5: new FluentComment( {"comment":"Names for the solute type. Reused in various places.","associatedKey":"solutes"} ),
    solutes: {
      lowercaseName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solutes_lowercaseName', _.get( MembraneTransportStrings, 'a11y.solutes.lowercaseNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_0: new FluentComment( {"comment":"Capitalized names for the solute type. Reused in various places.","associatedKey":"uppercaseName"} ),
      uppercaseName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solutes_uppercaseName', _.get( MembraneTransportStrings, 'a11y.solutes.uppercaseNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_1: new FluentComment( {"comment":"Brevity is the soul of wit, so we use these brief names in various places.","associatedKey":"briefName"} ),
      _comment_2: new FluentComment( {"comment":"Transport protein brief names, used reused in several in the simulation.","associatedKey":"briefName"} ),
      briefName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solutes_briefName', _.get( MembraneTransportStrings, 'a11y.solutes.briefNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_3: new FluentComment( {"comment":"A description of relative amounts of solute outside and inside the cell.","associatedKey":"amountComparison"} ),
      amountComparison: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside'> }>( fluentSupport.bundleProperty, 'a11y_solutes_amountComparison', _.get( MembraneTransportStrings, 'a11y.solutes.amountComparisonStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyManyMoreOutside","manyMoreOutside","aboutTwiceAsManyOutside","aLotMoreOutside","someMoreOutside","littleBitMoreOutside","roughlyEqualOutside","manyManyMoreInside","manyMoreInside","aboutTwiceAsManyInside","aLotMoreInside","someMoreInside","littleBitMoreInside","roughlyEqualInside"]}] ),
      _comment_4: new FluentComment( {"comment":"A description of the average crossing direction of a solute across the membrane.","associatedKey":"averageCrossingDirection"} ),
      averageCrossingDirection: new FluentPattern<{ direction: 'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none' | TReadOnlyProperty<'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none'> }>( fluentSupport.bundleProperty, 'a11y_solutes_averageCrossingDirection', _.get( MembraneTransportStrings, 'a11y.solutes.averageCrossingDirectionStringProperty' ), [{"name":"direction","variants":["toOutside","mostlyToOutside","inBothDirections","mostlyToInside","toInside","none"]}] )
    },
    solutesPanel: {
      _comment_0: new FluentComment( {"comment":"Accessible names for solute radio buttons","associatedKey":"oxygenRadioButton"} ),
      oxygenRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_solutesPanel_oxygenRadioButton', _.get( MembraneTransportStrings, 'a11y.solutesPanel.oxygenRadioButtonStringProperty' ) ),
      carbonDioxideRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_solutesPanel_carbonDioxideRadioButton', _.get( MembraneTransportStrings, 'a11y.solutesPanel.carbonDioxideRadioButtonStringProperty' ) ),
      sodiumIonRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_solutesPanel_sodiumIonRadioButton', _.get( MembraneTransportStrings, 'a11y.solutesPanel.sodiumIonRadioButtonStringProperty' ) ),
      potassiumIonRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_solutesPanel_potassiumIonRadioButton', _.get( MembraneTransportStrings, 'a11y.solutesPanel.potassiumIonRadioButtonStringProperty' ) ),
      glucoseRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_solutesPanel_glucoseRadioButton', _.get( MembraneTransportStrings, 'a11y.solutesPanel.glucoseRadioButtonStringProperty' ) ),
      atpRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_solutesPanel_atpRadioButton', _.get( MembraneTransportStrings, 'a11y.solutesPanel.atpRadioButtonStringProperty' ) )
    },
    soluteControl: {
      outside: {
        accessibleName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_outside_accessibleName', _.get( MembraneTransportStrings, 'a11y.soluteControl.outside.accessibleNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_outside_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControl.outside.accessibleHelpTextStringProperty' ) )
      },
      inside: {
        accessibleName: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_inside_accessibleName', _.get( MembraneTransportStrings, 'a11y.soluteControl.inside.accessibleNameStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
        _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_inside_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControl.inside.accessibleHelpTextStringProperty' ) )
      },
      voicingHintResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_voicingHintResponse', _.get( MembraneTransportStrings, 'a11y.soluteControl.voicingHintResponseStringProperty' ) ),
      accessibleRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleRoleDescription', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleRoleDescriptionStringProperty' ) ),
      accessibleHelpTextAllDisabledStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleHelpTextAllDisabled', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleHelpTextAllDisabledStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"The accessible object response for the transport protein when it is in a slot, describing its open/closed state.","associatedKey":"accessibleObjectResponse"} ),
      accessibleObjectResponse: new FluentPattern<{ amount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleObjectResponse', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleObjectResponseStringProperty' ), [{"name":"amount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      accessibleContextResponse: new FluentPattern<{ addedOrRemoved: 'addedToMax' | 'removedToMin' | 'added' | 'removed' | TReadOnlyProperty<'addedToMax' | 'removedToMin' | 'added' | 'removed'>, amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside'>, delta: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_soluteControl_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.soluteControl.accessibleContextResponseStringProperty' ), [{"name":"addedOrRemoved","variants":["addedToMax","removedToMin","added","removed"]},{"name":"amount","variants":["none","equal","allOutside","allInside","manyManyMoreOutside","manyMoreOutside","aboutTwiceAsManyOutside","aLotMoreOutside","someMoreOutside","littleBitMoreOutside","roughlyEqualOutside","manyManyMoreInside","manyMoreInside","aboutTwiceAsManyInside","aLotMoreInside","someMoreInside","littleBitMoreInside","roughlyEqualInside"]},{"name":"delta"}] )
    },
    _comment_6: new FluentComment( {"comment":"Solute Concentration Bar Charts","associatedKey":"soluteConcentrationsAccordionBox"} ),
    soluteConcentrationsAccordionBox: {
      descriptionContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_descriptionContent', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty' ) ),
      voicingHintResponseCollapsedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_voicingHintResponseCollapsed', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.voicingHintResponseCollapsedStringProperty' ) ),
      barChart: {
        _comment_0: new FluentComment( {"comment":"Note this description is used instead of accessibleName in the case that there are none inside AND none outside.","associatedKey":"accessibleNameWithNoParticles"} ),
        accessibleNameWithNoParticles: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithNoParticles', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithNoParticlesStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        accessibleNameWithParticles: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside'>, direction: 'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none' | TReadOnlyProperty<'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none'>, insideAmount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, outsideAmount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithParticles', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithParticlesStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyManyMoreOutside","manyMoreOutside","aboutTwiceAsManyOutside","aLotMoreOutside","someMoreOutside","littleBitMoreOutside","roughlyEqualOutside","manyManyMoreInside","manyMoreInside","aboutTwiceAsManyInside","aLotMoreInside","someMoreInside","littleBitMoreInside","roughlyEqualInside"]},{"name":"direction","variants":["toOutside","mostlyToOutside","inBothDirections","mostlyToInside","toInside","none"]},{"name":"insideAmount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"outsideAmount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        glucoseMetabolismStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_glucoseMetabolism', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.glucoseMetabolismStringProperty' ) ),
        accessibleNameWithParticlesAndGlucoseMetabolism: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside'>, direction: 'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none' | TReadOnlyProperty<'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none'>, insideAmount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, outsideAmount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithParticlesAndGlucoseMetabolism', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithParticlesAndGlucoseMetabolismStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyManyMoreOutside","manyMoreOutside","aboutTwiceAsManyOutside","aLotMoreOutside","someMoreOutside","littleBitMoreOutside","roughlyEqualOutside","manyManyMoreInside","manyMoreInside","aboutTwiceAsManyInside","aLotMoreInside","someMoreInside","littleBitMoreInside","roughlyEqualInside"]},{"name":"direction","variants":["toOutside","mostlyToOutside","inBothDirections","mostlyToInside","toInside","none"]},{"name":"insideAmount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"outsideAmount","variants":["none",{"type":"number","value":"few"},"some","smallAmount","several",{"type":"number","value":"many"},"largeAmount","hugeAmount","maxAmount"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
        accessibleNameWithNoParticlesAndGlucoseMetabolism: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteConcentrationsAccordionBox_barChart_accessibleNameWithNoParticlesAndGlucoseMetabolism', _.get( MembraneTransportStrings, 'a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithNoParticlesAndGlucoseMetabolismStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] )
      }
    },
    ligandToggleButton: {
      _comment_0: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
      _comment_1: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButton_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandToggleButton.accessibleHelpTextStringProperty' ) ),
      addedAccessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButton_addedAccessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButton.addedAccessibleContextResponseStringProperty' ) ),
      removedAccessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButton_removedAccessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButton.removedAccessibleContextResponseStringProperty' ) )
    },
    cellMembrane: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHeadingStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"A description of the current state of the protein. For Interactive Description, it will be combined","associatedKey":"accessibleStateDescription"} ),
      _comment_1: new FluentComment( {"comment":"with the accessibleHelpText to create the full description content. For voicing, it will be used","associatedKey":"accessibleStateDescription"} ),
      _comment_2: new FluentComment( {"comment":"separately as the reading block response.","associatedKey":"accessibleStateDescription"} ),
      accessibleStateDescription: {
        _comment_0: new FluentComment( {"comment":"Reusable description describing the number of types of proteins in the membrane.","associatedKey":"proteinTypeCountDescription"} ),
        proteinTypeCountDescription: new FluentPattern<{ typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinTypeCountDescription', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinTypeCountDescriptionStringProperty' ), [{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        _comment_1: new FluentComment( {"comment":"For screens where you cannot add any proteins.","associatedKey":"proteinsHidden"} ),
        _comment_2: new FluentComment( {"comment":"For screens where you cannot add any proteins.","associatedKey":"proteinsHidden"} ),
        proteinsHidden: {
          _comment_0: new FluentComment( {"comment":"For screens where there is no membrane potential control/display.","associatedKey":"potentialHidden"} ),
          _comment_1: new FluentComment( {"comment":"For screens where there is no membrane potential control/display.","associatedKey":"potentialHidden"} ),
          potentialHidden: {
            noSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsHidden_potentialHidden_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsHidden.potentialHidden.noSolutesStringProperty' ) ),
            withSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsHidden_potentialHidden_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsHidden.potentialHidden.withSolutesStringProperty' ) )
          }
        },
        _comment_3: new FluentComment( {"comment":"For screens where you can add proteins.","associatedKey":"proteinsShown"} ),
        _comment_4: new FluentComment( {"comment":"For screens where you can add proteins.","associatedKey":"proteinsShown"} ),
        proteinsShown: {
          _comment_0: new FluentComment( {"comment":"For screens where there is no membrane potential control/display.","associatedKey":"potentialHidden"} ),
          _comment_1: new FluentComment( {"comment":"For screens where there is no membrane potential control/display.","associatedKey":"potentialHidden"} ),
          potentialHidden: {
            noProteins: {
              noSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_noProteins_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.noProteins.noSolutesStringProperty' ) ),
              withSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_noProteins_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.noProteins.withSolutesStringProperty' ) )
            },
            withProteins: {
              noSolutes: new FluentPattern<{ typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_withProteins_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.withProteins.noSolutesStringProperty' ), [{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
              withSolutes: new FluentPattern<{ typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialHidden_withProteins_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.withProteins.withSolutesStringProperty' ), [{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] )
            }
          },
          _comment_2: new FluentComment( {"comment":"For screens where there is membrane potential control/display.","associatedKey":"potentialShown"} ),
          potentialShown: {
            noProteins: {
              noSolutes: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_noProteins_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.noProteins.noSolutesStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] ),
              withSolutes: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_noProteins_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.noProteins.withSolutesStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]}] )
            },
            withProteins: {
              noSolutes: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30>, typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_withProteins_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.withProteins.noSolutesStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]},{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
              withSolutes: new FluentPattern<{ membranePotential: -70 | -50 | 30 | TReadOnlyProperty<-70 | -50 | 30>, typeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleStateDescription_proteinsShown_potentialShown_withProteins_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.withProteins.withSolutesStringProperty' ), [{"name":"membranePotential","variants":[-70,-50,30]},{"name":"typeCount","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] )
            }
          }
        }
      },
      _comment_3: new FluentComment( {"comment":"The accessibleHelpText portion of the description. It is combined with the accessibleStateDescription","associatedKey":"accessibleHelpText"} ),
      _comment_4: new FluentComment( {"comment":"to create the full accessibleHelpText. For voicing, it is used separately as the reading block hint response.","associatedKey":"accessibleHelpText"} ),
      accessibleHelpText: {
        _comment_0: new FluentComment( {"comment":"For screens where you cannot add any proteins.","associatedKey":"proteinsHidden"} ),
        _comment_1: new FluentComment( {"comment":"For screens where you cannot add any proteins.","associatedKey":"proteinsHidden"} ),
        proteinsHidden: {
          noSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpText_proteinsHidden_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpText.proteinsHidden.noSolutesStringProperty' ) ),
          withSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpText_proteinsHidden_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpText.proteinsHidden.withSolutesStringProperty' ) )
        },
        _comment_2: new FluentComment( {"comment":"For screens where you can add proteins.","associatedKey":"proteinsShown"} ),
        _comment_3: new FluentComment( {"comment":"For screens where you can add proteins.","associatedKey":"proteinsShown"} ),
        proteinsShown: {
          noProteins: {
            noSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpText_proteinsShown_noProteins_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpText.proteinsShown.noProteins.noSolutesStringProperty' ) ),
            withSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpText_proteinsShown_noProteins_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpText.proteinsShown.noProteins.withSolutesStringProperty' ) )
          },
          withProteins: {
            noSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpText_proteinsShown_withProteins_noSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpText.proteinsShown.withProteins.noSolutesStringProperty' ) ),
            withSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpText_proteinsShown_withProteins_withSolutes', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpText.proteinsShown.withProteins.withSolutesStringProperty' ) )
          }
        }
      },
      _comment_5: new FluentComment( {"comment":"The accessibleHelpText combines the accessibleStateDescription and accessibleHelpText for","associatedKey":"accessibleHelpTextPattern"} ),
      _comment_6: new FluentComment( {"comment":"Interactive Description.","associatedKey":"accessibleHelpTextPattern"} ),
      accessibleHelpTextPattern: new FluentPattern<{ accessibleHelpText: FluentVariable, accessibleStateDescription: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_cellMembrane_accessibleHelpTextPattern', _.get( MembraneTransportStrings, 'a11y.cellMembrane.accessibleHelpTextPatternStringProperty' ), [{"name":"accessibleHelpText"},{"name":"accessibleStateDescription"}] )
    },
    transportProtein: {
      _comment_0: new FluentComment( {"comment":"Spoken when the ligand is grabbed.","associatedKey":"grabbedResponse"} ),
      grabbedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_grabbedResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.grabbedResponseStringProperty' ) ),
      offMembraneResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_offMembraneResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.offMembraneResponseStringProperty' ) ),
      releasedReplacedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_releasedReplacedResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.releasedReplacedResponseStringProperty' ) ),
      deletedResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_deletedResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.deletedResponseStringProperty' ) ),
      cancelledResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_cancelledResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.cancelledResponseStringProperty' ) ),
      proteinLocation: new FluentPattern<{ proteinCount: FluentVariable, proteinIndex: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_proteinLocation', _.get( MembraneTransportStrings, 'a11y.transportProtein.proteinLocationStringProperty' ), [{"name":"proteinCount"},{"name":"proteinIndex"}] ),
      accessibleName: new FluentPattern<{ nameResponse: FluentVariable, proteinCount: FluentVariable, proteinIndex: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleNameStringProperty' ), [{"name":"nameResponse"},{"name":"proteinCount"},{"name":"proteinIndex"}] ),
      _comment_1: new FluentComment( {"comment":"The accessible object response for the transport protein when it is in a slot, describing its open/closed state.","associatedKey":"accessibleObjectResponse"} ),
      accessibleObjectResponse: new FluentPattern<{ state: 'openToInsideEmpty' | 'openToInsideSodiumBound' | 'openToInsideSodiumAndATPBound' | 'openToInsideSodiumAndPhosphateBound' | 'openToOutsideAwaitingPotassium' | 'openToOutsidePotassiumBound' | 'openToOutsideAwaitingParticles' | 'openToOutsideAllParticlesBound' | 'openToInside' | 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV' | 'closedNegative50mV' | 'open30mV' | 'ligandBoundClosed' | 'ligandBoundOpen' | 'ligandUnboundOpen' | 'closed' | 'open' | TReadOnlyProperty<'openToInsideEmpty' | 'openToInsideSodiumBound' | 'openToInsideSodiumAndATPBound' | 'openToInsideSodiumAndPhosphateBound' | 'openToOutsideAwaitingPotassium' | 'openToOutsidePotassiumBound' | 'openToOutsideAwaitingParticles' | 'openToOutsideAllParticlesBound' | 'openToInside' | 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV' | 'closedNegative50mV' | 'open30mV' | 'ligandBoundClosed' | 'ligandBoundOpen' | 'ligandUnboundOpen' | 'closed' | 'open'> }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleObjectResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleObjectResponseStringProperty' ), [{"name":"state","variants":["openToInsideEmpty","openToInsideSodiumBound","openToInsideSodiumAndATPBound","openToInsideSodiumAndPhosphateBound","openToOutsideAwaitingPotassium","openToOutsidePotassiumBound","openToOutsideAwaitingParticles","openToOutsideAllParticlesBound","openToInside","closedNegative70mV","openNegative50mV","closed30mV","closedNegative50mV","open30mV","ligandBoundClosed","ligandBoundOpen","ligandUnboundOpen","closed","open"]}] ),
      accessibleParagraph: new FluentPattern<{ proteinType: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | TReadOnlyProperty<'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel'>, state: 'openToInsideEmpty' | 'openToInsideSodiumBound' | 'openToInsideSodiumAndATPBound' | 'openToInsideSodiumAndPhosphateBound' | 'openToOutsideAwaitingPotassium' | 'openToOutsidePotassiumBound' | 'openToOutsideAwaitingParticles' | 'openToOutsideAllParticlesBound' | 'openToInside' | 'ligandBoundClosed' | 'ligandBoundOpen' | 'ligandUnboundOpen' | 'closed' | 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV' | 'closedNegative50mV' | 'open30mV' | 'open' | TReadOnlyProperty<'openToInsideEmpty' | 'openToInsideSodiumBound' | 'openToInsideSodiumAndATPBound' | 'openToInsideSodiumAndPhosphateBound' | 'openToOutsideAwaitingPotassium' | 'openToOutsidePotassiumBound' | 'openToOutsideAwaitingParticles' | 'openToOutsideAllParticlesBound' | 'openToInside' | 'ligandBoundClosed' | 'ligandBoundOpen' | 'ligandUnboundOpen' | 'closed' | 'closedNegative70mV' | 'openNegative50mV' | 'closed30mV' | 'closedNegative50mV' | 'open30mV' | 'open'>, warning: 'shown' | 'hidden' | TReadOnlyProperty<'shown' | 'hidden'> }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleParagraph', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleParagraphStringProperty' ), [{"name":"proteinType","variants":["sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel"]},{"name":"state","variants":["openToInsideEmpty","openToInsideSodiumBound","openToInsideSodiumAndATPBound","openToInsideSodiumAndPhosphateBound","openToOutsideAwaitingPotassium","openToOutsidePotassiumBound","openToOutsideAwaitingParticles","openToOutsideAllParticlesBound","openToInside","ligandBoundClosed","ligandBoundOpen","ligandUnboundOpen","closed","closedNegative70mV","openNegative50mV","closed30mV","closedNegative50mV","open30mV","open"]},{"name":"warning","variants":["shown","hidden"]}] ),
      accessibleContextResponse: new FluentPattern<{ glucoseBehavior: 'metabolized' | 'persistent' | TReadOnlyProperty<'metabolized' | 'persistent'>, proteinType: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | TReadOnlyProperty<'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel'>, state: 'openToInsideEmpty' | 'openToInsideSodiumAndATPBound' | 'openToInside' | 'ligandBoundOpen' | 'closed' | TReadOnlyProperty<'openToInsideEmpty' | 'openToInsideSodiumAndATPBound' | 'openToInside' | 'ligandBoundOpen' | 'closed'> }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleContextResponseStringProperty' ), [{"name":"glucoseBehavior","variants":["metabolized","persistent"]},{"name":"proteinType","variants":["sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel"]},{"name":"state","variants":["openToInsideEmpty","openToInsideSodiumAndATPBound","openToInside","ligandBoundOpen","closed"]}] ),
      _comment_2: new FluentComment( {"comment":"The accessible object response for the transport protein when the user is moving it between different slots.","associatedKey":"accessibleNameMoving"} ),
      accessibleNameMoving: new FluentPattern<{ nameResponse: FluentVariable, slotCount: FluentVariable, slotIndex: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleNameMoving', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleNameMovingStringProperty' ), [{"name":"nameResponse"},{"name":"slotCount"},{"name":"slotIndex"}] ),
      accessibleObjectResponseMoving: new FluentPattern<{ slotCount: FluentVariable, slotIndex: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_transportProtein_accessibleObjectResponseMoving', _.get( MembraneTransportStrings, 'a11y.transportProtein.accessibleObjectResponseMovingStringProperty' ), [{"name":"slotCount"},{"name":"slotIndex"}] ),
      _comment_3: new FluentComment( {"comment":"Included in the accessibleName for the protein when it is above an empty slot.","associatedKey":"empty"} ),
      emptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_empty', _.get( MembraneTransportStrings, 'a11y.transportProtein.emptyStringProperty' ) ),
      _comment_4: new FluentComment( {"comment":"Brevity is the soul of wit, so we use these brief names in various places.","associatedKey":"briefName"} ),
      _comment_5: new FluentComment( {"comment":"Transport protein brief names, used reused in several in the simulation.","associatedKey":"briefName"} ),
      briefName: new FluentPattern<{ type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_transportProtein_briefName', _.get( MembraneTransportStrings, 'a11y.transportProtein.briefNameStringProperty' ), [{"name":"type","variants":["sodiumIonLeakageChannel","potassiumIonLeakageChannel","sodiumIonVoltageGatedChannel","potassiumIonVoltageGatedChannel","sodiumIonLigandGatedChannel","potassiumIonLigandGatedChannel","sodiumPotassiumPump","sodiumGlucoseCotransporter"]}] )
    },
    _comment_7: new FluentComment( {"comment":"For the Membrane Potential radio buttons","associatedKey":"membranePotential"} ),
    _comment_8: new FluentComment( {"comment":"Membrane potential change responses for voltage-gated channels","associatedKey":"membranePotential"} ),
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
    },
    _comment_9: new FluentComment( {"comment":"Keyboard Help Dialog","associatedKey":"keyboardHelp"} ),
    keyboardHelp: {
      soluteAdjusters: {
        _comment_0: new FluentComment( {"comment":"Description strings for PDOM","associatedKey":"addOrRemoveALotDescription"} ),
        addOrRemoveALotDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_soluteAdjusters_addOrRemoveALotDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.soluteAdjusters.addOrRemoveALotDescriptionStringProperty' ) ),
        addOrRemoveALittleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_soluteAdjusters_addOrRemoveALittleDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.soluteAdjusters.addOrRemoveALittleDescriptionStringProperty' ) )
      },
      transportProteinsAndLigands: {
        _comment_0: new FluentComment( {"comment":"Description strings for PDOM","associatedKey":"navigateDescription"} ),
        navigateDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_transportProteinsAndLigands_navigateDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.transportProteinsAndLigands.navigateDescriptionStringProperty' ) ),
        grabOrReleaseDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_transportProteinsAndLigands_grabOrReleaseDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.transportProteinsAndLigands.grabOrReleaseDescriptionStringProperty' ) ),
        moveGrabbedItemDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_transportProteinsAndLigands_moveGrabbedItemDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.transportProteinsAndLigands.moveGrabbedItemDescriptionStringProperty' ) ),
        cancelGrabDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_transportProteinsAndLigands_cancelGrabDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.transportProteinsAndLigands.cancelGrabDescriptionStringProperty' ) )
      },
      sortOrDeleteProteins: {
        _comment_0: new FluentComment( {"comment":"Description strings for PDOM","associatedKey":"navigateProteinsDescription"} ),
        navigateProteinsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_sortOrDeleteProteins_navigateProteinsDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.sortOrDeleteProteins.navigateProteinsDescriptionStringProperty' ) ),
        grabProteinDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_sortOrDeleteProteins_grabProteinDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.sortOrDeleteProteins.grabProteinDescriptionStringProperty' ) ),
        moveGrabbedProteinDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_sortOrDeleteProteins_moveGrabbedProteinDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinDescriptionStringProperty' ) ),
        releaseProteinDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_sortOrDeleteProteins_releaseProteinDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.sortOrDeleteProteins.releaseProteinDescriptionStringProperty' ) ),
        deleteProteinDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelp_sortOrDeleteProteins_deleteProteinDescription', _.get( MembraneTransportStrings, 'a11y.keyboardHelp.sortOrDeleteProteins.deleteProteinDescriptionStringProperty' ) )
      }
    },
    _comment_10: new FluentComment( {"comment":"Strings for MembraneTransportDescriber","associatedKey":"membraneTransportDescriber"} ),
    membraneTransportDescriber: {
      _comment_0: new FluentComment( {"comment":"Particle crossing responses - spoken whenever a particle crosses through a focused protein.","associatedKey":"particleCrossing"} ),
      particleCrossing: new FluentPattern<{ direction: 'inward' | 'outward' | TReadOnlyProperty<'inward' | 'outward'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_particleCrossing', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.particleCrossingStringProperty' ), [{"name":"direction","variants":["inward","outward"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_1: new FluentComment( {"comment":"Hint messages for different protein states. These are spoken after a long delay when the user needs to","associatedKey":"hints"} ),
      _comment_2: new FluentComment( {"comment":"do something to create a productive interaction.","associatedKey":"hints"} ),
      hints: {
        ligandGatedChannelWithoutLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_hints_ligandGatedChannelWithoutLigands', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.hints.ligandGatedChannelWithoutLigandsStringProperty' ) ),
        voltageGatedChannelAtRestingPotentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_hints_voltageGatedChannelAtRestingPotential', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.hints.voltageGatedChannelAtRestingPotentialStringProperty' ) ),
        pumpAwaitingPhosphateWithoutATPStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_hints_pumpAwaitingPhosphateWithoutATP', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.hints.pumpAwaitingPhosphateWithoutATPStringProperty' ) ),
        sodiumGlucoseCotransporterWithLowOutsideSodiumStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_hints_sodiumGlucoseCotransporterWithLowOutsideSodium', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.hints.sodiumGlucoseCotransporterWithLowOutsideSodiumStringProperty' ) )
      },
      _comment_3: new FluentComment( {"comment":"Message separators. Multiple pieces of information are often combined into a single message and","associatedKey":"commaSeparator"} ),
      _comment_4: new FluentComment( {"comment":"these are used to separate them.","associatedKey":"commaSeparator"} ),
      commaSeparatorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_commaSeparator', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.commaSeparatorStringProperty' ) ),
      andSeparatorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_andSeparator', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.andSeparatorStringProperty' ) ),
      _comment_5: new FluentComment( {"comment":"After assembling content with separators, it sometimes needs to be wrapped in a sentence.","associatedKey":"sentencePattern"} ),
      sentencePattern: new FluentPattern<{ content: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_sentencePattern', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.sentencePatternStringProperty' ), [{"name":"content"}] ),
      _comment_6: new FluentComment( {"comment":"A statement that is included when a solute type has reached steady state, with the same amounts moving in and out of the membrane.","associatedKey":"crossingSteadilyInBothDirections"} ),
      crossingSteadilyInBothDirections: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_crossingSteadilyInBothDirections', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.crossingSteadilyInBothDirectionsStringProperty' ), [{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_7: new FluentComment( {"comment":"When there is only one facilitated solute type to describe, this more verbose description is used to describe that it is crossing","associatedKey":"crossingChannelsWithDirection"} ),
      _comment_8: new FluentComment( {"comment":"through a channel.","associatedKey":"crossingChannelsWithDirection"} ),
      crossingChannelsWithDirection: new FluentPattern<{ direction: 'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none' | TReadOnlyProperty<'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_crossingChannelsWithDirection', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.crossingChannelsWithDirectionStringProperty' ), [{"name":"direction","variants":["toOutside","mostlyToOutside","inBothDirections","mostlyToInside","toInside","none"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_9: new FluentComment( {"comment":"When there is only one solute type to describe that is going through simple diffusion, this more verbose statement is used.","associatedKey":"crossingMembraneWithDirection"} ),
      crossingMembraneWithDirection: new FluentPattern<{ direction: 'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none' | TReadOnlyProperty<'toOutside' | 'mostlyToOutside' | 'inBothDirections' | 'mostlyToInside' | 'toInside' | 'none'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_crossingMembraneWithDirection', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.crossingMembraneWithDirectionStringProperty' ), [{"name":"direction","variants":["toOutside","mostlyToOutside","inBothDirections","mostlyToInside","toInside","none"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_10: new FluentComment( {"comment":"Used in most cases, this describes that many solutes are crossing the membrane.","associatedKey":"multipleSolutesCrossing"} ),
      multipleSolutesCrossing: new FluentPattern<{ soluteNames: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_multipleSolutesCrossing', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.multipleSolutesCrossingStringProperty' ), [{"name":"soluteNames"}] ),
      _comment_11: new FluentComment( {"comment":"Describes the solute type and relative amount inside vs outside the cell. This is included in the description when","associatedKey":"soluteComparisonWithName"} ),
      _comment_12: new FluentComment( {"comment":"the described amount comparison changes for a solute type.","associatedKey":"soluteComparisonWithName"} ),
      soluteComparisonWithName: new FluentPattern<{ amount: 'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside' | TReadOnlyProperty<'none' | 'equal' | 'allOutside' | 'allInside' | 'manyManyMoreOutside' | 'manyMoreOutside' | 'aboutTwiceAsManyOutside' | 'aLotMoreOutside' | 'someMoreOutside' | 'littleBitMoreOutside' | 'roughlyEqualOutside' | 'manyManyMoreInside' | 'manyMoreInside' | 'aboutTwiceAsManyInside' | 'aLotMoreInside' | 'someMoreInside' | 'littleBitMoreInside' | 'roughlyEqualInside'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_soluteComparisonWithName', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.soluteComparisonWithNameStringProperty' ), [{"name":"amount","variants":["none","equal","allOutside","allInside","manyManyMoreOutside","manyMoreOutside","aboutTwiceAsManyOutside","aLotMoreOutside","someMoreOutside","littleBitMoreOutside","roughlyEqualOutside","manyManyMoreInside","manyMoreInside","aboutTwiceAsManyInside","aLotMoreInside","someMoreInside","littleBitMoreInside","roughlyEqualInside"]},{"name":"soluteType","variants":["oxygen","carbonDioxide","sodiumIon","potassiumIon","glucose","atp"]}] ),
      _comment_13: new FluentComment( {"comment":"Specific descriptions for active transport events.","associatedKey":"sodiumPumpedOutside"} ),
      sodiumPumpedOutsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_sodiumPumpedOutside', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.sodiumPumpedOutsideStringProperty' ) ),
      potassiumPumpedInsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_potassiumPumpedInside', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.potassiumPumpedInsideStringProperty' ) ),
      sodiumPumpedOutsideAndPotassiumPumpedInsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_sodiumPumpedOutsideAndPotassiumPumpedInside', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.sodiumPumpedOutsideAndPotassiumPumpedInsideStringProperty' ) ),
      sodiumAndGlucoseShuttledInsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_membraneTransportDescriber_sodiumAndGlucoseShuttledInside', _.get( MembraneTransportStrings, 'a11y.membraneTransportDescriber.sodiumAndGlucoseShuttledInsideStringProperty' ) )
    },
    _comment_11: new FluentComment( {"comment":"Preferences Dialog","associatedKey":"preferencesDialog"} ),
    preferencesDialog: {
      animateLipids: {
        accessibleContextResponseLeftValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferencesDialog_animateLipids_accessibleContextResponseLeftValue', _.get( MembraneTransportStrings, 'a11y.preferencesDialog.animateLipids.accessibleContextResponseLeftValueStringProperty' ) ),
        accessibleContextResponseRightValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferencesDialog_animateLipids_accessibleContextResponseRightValue', _.get( MembraneTransportStrings, 'a11y.preferencesDialog.animateLipids.accessibleContextResponseRightValueStringProperty' ) )
      },
      glucoseMetabolism: {
        accessibleContextResponseLeftValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferencesDialog_glucoseMetabolism_accessibleContextResponseLeftValue', _.get( MembraneTransportStrings, 'a11y.preferencesDialog.glucoseMetabolism.accessibleContextResponseLeftValueStringProperty' ) ),
        accessibleContextResponseRightValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferencesDialog_glucoseMetabolism_accessibleContextResponseRightValue', _.get( MembraneTransportStrings, 'a11y.preferencesDialog.glucoseMetabolism.accessibleContextResponseRightValueStringProperty' ) )
      }
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register('MembraneTransportFluent', MembraneTransportFluent);
