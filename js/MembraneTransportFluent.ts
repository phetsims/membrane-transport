// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from membrane-transport-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import Multilink from '../../axon/js/Multilink.js';
import Property from '../../axon/js/Property.js';
import StringProperty from '../../axon/js/StringProperty.js';
import localeProperty from '../../joist/js/i18n/localeProperty.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import FluentUtils from '../../chipper/js/browser/FluentUtils.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import { FluentBundle, FluentResource } from '../../chipper/js/browser-and-node/FluentLibrary.js';
import IntentionalAny from '../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from './membraneTransport.js';
import MembraneTransportStrings from './MembraneTransportStrings.js';
import { isTReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';

const getFTL = (): string => {
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
a11y_soluteAccessibleNames_oxygen = ${MembraneTransportStrings.a11y.soluteAccessibleNames.oxygenStringProperty.value}
a11y_soluteAccessibleNames_carbonDioxide = ${MembraneTransportStrings.a11y.soluteAccessibleNames.carbonDioxideStringProperty.value}
a11y_soluteAccessibleNames_sodiumIon = ${MembraneTransportStrings.a11y.soluteAccessibleNames.sodiumIonStringProperty.value}
a11y_soluteAccessibleNames_potassiumIon = ${MembraneTransportStrings.a11y.soluteAccessibleNames.potassiumIonStringProperty.value}
a11y_soluteAccessibleNames_glucose = ${MembraneTransportStrings.a11y.soluteAccessibleNames.glucoseStringProperty.value}
a11y_soluteAccessibleNames_atp = ${MembraneTransportStrings.a11y.soluteAccessibleNames.atpStringProperty.value}
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

const allStringProperties = [
  MembraneTransportStrings["membrane-transport"].titleStringProperty,
MembraneTransportStrings.screen.simpleDiffusionStringProperty,
MembraneTransportStrings.screen.facilitatedDiffusionStringProperty,
MembraneTransportStrings.screen.activeTransportStringProperty,
MembraneTransportStrings.screen.playgroundStringProperty,
MembraneTransportStrings.solutesStringProperty,
MembraneTransportStrings.oxygenStringProperty,
MembraneTransportStrings.carbonDioxideStringProperty,
MembraneTransportStrings.sodiumIonStringProperty,
MembraneTransportStrings.potassiumIonStringProperty,
MembraneTransportStrings.glucoseStringProperty,
MembraneTransportStrings.atpStringProperty,
MembraneTransportStrings.outsideStringProperty,
MembraneTransportStrings.insideStringProperty,
MembraneTransportStrings.membranePotentialLabelsStringProperty,
MembraneTransportStrings.voltageGatedChannelsStringProperty,
MembraneTransportStrings.ligandGatedChannelsStringProperty,
MembraneTransportStrings.activeTransportersStringProperty,
MembraneTransportStrings.leakageChannelsStringProperty,
MembraneTransportStrings.sodiumIonNaPlusStringProperty,
MembraneTransportStrings.potassiumIonKPlusStringProperty,
MembraneTransportStrings.NaPlusKPlusPumpStringProperty,
MembraneTransportStrings.sodiumGlucoseCotransporterStringProperty,
MembraneTransportStrings.membranePotential_mVStringProperty,
MembraneTransportStrings.signsStringProperty,
MembraneTransportStrings.addLigandsStringProperty,
MembraneTransportStrings.removeLigandsStringProperty,
MembraneTransportStrings.animateLipidsStringProperty,
MembraneTransportStrings.animateLipidsDescriptionStringProperty,
MembraneTransportStrings.soluteConcentrationsStringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryIntroStringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummarySolutesStringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryProteinsStringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryPotentialStringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryBarChartsStringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryScreen1StringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryScreen2and4StringProperty,
MembraneTransportStrings.a11y.summary.playAreaSummaryScreen3StringProperty,
MembraneTransportStrings.a11y.summary.controlAreaSummaryStringProperty,
MembraneTransportStrings.a11y.summary.interactionHintStringProperty,
MembraneTransportStrings.a11y.summary.interactionHintWithTransportProteinsStringProperty,
MembraneTransportStrings.a11y.observationWindow.membrane.accessibleNameStringProperty,
MembraneTransportStrings.a11y.soluteControls.accessibleHeadingStringProperty,
MembraneTransportStrings.a11y.eraseSolutesButton.accessibleNameStringProperty,
MembraneTransportStrings.a11y.eraseSolutesButton.accessibleContextResponseStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.transportProteinsStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.accessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleNameStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleNameStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleNameStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.accessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponseNegative70StringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponseNegative50StringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponsePositive30StringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.uncheckedContextResponseStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty,
MembraneTransportStrings.a11y.transportProteinPanel.toolAccessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.ligandNode.starLigandStringProperty,
MembraneTransportStrings.a11y.ligandNode.triangleLigandStringProperty,
MembraneTransportStrings.a11y.ligandNode.accessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.ligandNode.releasedLigandStringProperty,
MembraneTransportStrings.a11y.ligandNode.grabbedLigandStringProperty,
MembraneTransportStrings.a11y.ligandNode.ligandReleasedOffMembranePatternStringProperty,
MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty,
MembraneTransportStrings.a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty,
MembraneTransportStrings.a11y.ligandNode.ligandMovedToSlotPatternStringProperty,
MembraneTransportStrings.a11y.ligandNode.ligandUnboundAlertStringProperty,
MembraneTransportStrings.a11y.ligandNode.thereIsNoProteinAtThisSlotStringProperty,
MembraneTransportStrings.a11y.ligandNode.thereIsProteinAtThisSlotPatternStringProperty,
MembraneTransportStrings.a11y.ligandNode.moveCancelledPatternStringProperty,
MembraneTransportStrings.a11y.ligandNode.cannotInteractWhileLigandIsBoundPatternStringProperty,
MembraneTransportStrings.a11y.soluteControlsAccessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.soluteAccessibleNames.oxygenStringProperty,
MembraneTransportStrings.a11y.soluteAccessibleNames.carbonDioxideStringProperty,
MembraneTransportStrings.a11y.soluteAccessibleNames.sodiumIonStringProperty,
MembraneTransportStrings.a11y.soluteAccessibleNames.potassiumIonStringProperty,
MembraneTransportStrings.a11y.soluteAccessibleNames.glucoseStringProperty,
MembraneTransportStrings.a11y.soluteAccessibleNames.atpStringProperty,
MembraneTransportStrings.a11y.outsideMembraneSpinnerAccessibleNameStringProperty,
MembraneTransportStrings.a11y.outsideMembraneSpinnerHelpTextStringProperty,
MembraneTransportStrings.a11y.insideMembraneSpinnerAccessibleNameStringProperty,
MembraneTransportStrings.a11y.insideMembraneSpinnerHelpTextStringProperty,
MembraneTransportStrings.a11y.soluteSpinnerRoleDescriptionStringProperty,
MembraneTransportStrings.a11y.soluteStringProperty,
MembraneTransportStrings.a11y.soluteSpinnerObjectResponsePatternStringProperty,
MembraneTransportStrings.a11y.soluteSpinnerContextResponsePatternStringProperty,
MembraneTransportStrings.a11y.soluteBarChartsDescriptionParagraphStringProperty,
MembraneTransportStrings.a11y.arrowSizeDescriptionStringProperty,
MembraneTransportStrings.a11y.arrowDirectionDescriptionStringProperty,
MembraneTransportStrings.a11y.barSizeDescriptionStringProperty,
MembraneTransportStrings.a11y.barChartPatternStringProperty,
MembraneTransportStrings.a11y.currentDetailsActivityLevelStringProperty,
MembraneTransportStrings.a11y.currentDetailsStringProperty,
MembraneTransportStrings.a11y.currentDetailsSoluteTypesOnOutsideStringProperty,
MembraneTransportStrings.a11y.currentDetailsSoluteTypesOnInsideStringProperty,
MembraneTransportStrings.a11y.currentDetailsTransportProteinsStringProperty,
MembraneTransportStrings.a11y.ligandsOnOutsideOnlyStringProperty,
MembraneTransportStrings.a11y.currentDetailsMembranePotentialStringProperty,
MembraneTransportStrings.a11y.releasedBackInToolboxStringProperty,
MembraneTransportStrings.a11y.selectedTransportProteinInSlotStringProperty,
MembraneTransportStrings.a11y.canceledBackInMembraneStringProperty,
MembraneTransportStrings.a11y.grabbedProteinResponsePatternStringProperty,
MembraneTransportStrings.a11y.grabbedProteinResponseWithHintPatternStringProperty,
MembraneTransportStrings.a11y.ligandToggleButtonAccessibleHelpTextStringProperty,
MembraneTransportStrings.a11y.ligandToggleButtonAddedContextResponseStringProperty,
MembraneTransportStrings.a11y.ligandToggleButtonRemovedContextResponseStringProperty,
MembraneTransportStrings.a11y.grabbedLigandResponsePatternStringProperty,
MembraneTransportStrings.a11y.grabbedLigandResponseWithHintPatternStringProperty,
MembraneTransportStrings.a11y.grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty,
MembraneTransportStrings.a11y.transportProteinBriefNameStringProperty,
MembraneTransportStrings.a11y.ligandMovedAboveLigandGatedChannelPatternStringProperty,
MembraneTransportStrings.a11y.ligandMovedAboveLeakageChannelPatternStringProperty,
MembraneTransportStrings.a11y.ligandMovedAboveOtherChannelPatternStringProperty,
MembraneTransportStrings.a11y.transportProtein.accessibleNamePatternStringProperty
];

let isLocaleChanging = false;

localeProperty.lazyLink( () => {
  isLocaleChanging = true;
} );

const createFluentBundle = () => {
  const bundle = new FluentBundle('en');
  const resource = new FluentResource(getFTL());
  const errors = bundle.addResource(resource);
  assert && assert(errors.length === 0, 'Errors when adding resource for locale en');
  
  return bundle;
};

// Initial compute of the bundle
const fluentBundleProperty = new Property<FluentBundle>( createFluentBundle() );

Multilink.multilinkAny( allStringProperties, () => {
  if ( !isLocaleChanging ) {
    fluentBundleProperty.value = createFluentBundle();
  }
} );

// When all strings change due to a locale change, update the bundle once
localeProperty.lazyLink( () => {
  isLocaleChanging = false;
  fluentBundleProperty.value = createFluentBundle();
} );

const MembraneTransportFluent = {
  "membrane-transport.title": new FluentPattern( fluentBundleProperty, 'membrane-transport.title' ),
  "screen.simpleDiffusion": new FluentPattern( fluentBundleProperty, 'screen.simpleDiffusion' ),
  "screen.facilitatedDiffusion": new FluentPattern( fluentBundleProperty, 'screen.facilitatedDiffusion' ),
  "screen.activeTransport": new FluentPattern( fluentBundleProperty, 'screen.activeTransport' ),
  "screen.playground": new FluentPattern( fluentBundleProperty, 'screen.playground' ),
  solutes: new FluentPattern( fluentBundleProperty, 'solutes' ),
  oxygen: new FluentPattern( fluentBundleProperty, 'oxygen' ),
  carbonDioxide: new FluentPattern( fluentBundleProperty, 'carbonDioxide' ),
  sodiumIon: new FluentPattern( fluentBundleProperty, 'sodiumIon' ),
  potassiumIon: new FluentPattern( fluentBundleProperty, 'potassiumIon' ),
  glucose: new FluentPattern( fluentBundleProperty, 'glucose' ),
  atp: new FluentPattern( fluentBundleProperty, 'atp' ),
  outside: new FluentPattern( fluentBundleProperty, 'outside' ),
  inside: new FluentPattern( fluentBundleProperty, 'inside' ),
  membranePotentialLabels: new FluentPattern( fluentBundleProperty, 'membranePotentialLabels' ),
  voltageGatedChannels: new FluentPattern( fluentBundleProperty, 'voltageGatedChannels' ),
  ligandGatedChannels: new FluentPattern( fluentBundleProperty, 'ligandGatedChannels' ),
  activeTransporters: new FluentPattern( fluentBundleProperty, 'activeTransporters' ),
  leakageChannels: new FluentPattern( fluentBundleProperty, 'leakageChannels' ),
  sodiumIonNaPlus: new FluentPattern( fluentBundleProperty, 'sodiumIonNaPlus' ),
  potassiumIonKPlus: new FluentPattern( fluentBundleProperty, 'potassiumIonKPlus' ),
  NaPlusKPlusPump: new FluentPattern( fluentBundleProperty, 'NaPlusKPlusPump' ),
  sodiumGlucoseCotransporter: new FluentPattern( fluentBundleProperty, 'sodiumGlucoseCotransporter' ),
  membranePotential_mV: new FluentPattern( fluentBundleProperty, 'membranePotential_mV' ),
  signs: new FluentPattern( fluentBundleProperty, 'signs' ),
  addLigands: new FluentPattern( fluentBundleProperty, 'addLigands' ),
  removeLigands: new FluentPattern( fluentBundleProperty, 'removeLigands' ),
  animateLipids: new FluentPattern( fluentBundleProperty, 'animateLipids' ),
  animateLipidsDescription: new FluentPattern( fluentBundleProperty, 'animateLipidsDescription' ),
  soluteConcentrations: new FluentPattern( fluentBundleProperty, 'soluteConcentrations' ),
  a11y: {
    summary: {
      playAreaSummaryIntro: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryIntro' ),
      playAreaSummarySolutes: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummarySolutes' ),
      playAreaSummaryProteins: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryProteins' ),
      playAreaSummaryPotential: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryPotential' ),
      playAreaSummaryBarCharts: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryBarCharts' ),
      playAreaSummaryScreen1: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryScreen1' ),
      playAreaSummaryScreen2and4: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryScreen2and4' ),
      playAreaSummaryScreen3: new FluentPattern( fluentBundleProperty, 'a11y_summary_playAreaSummaryScreen3' ),
      controlAreaSummary: new FluentPattern( fluentBundleProperty, 'a11y_summary_controlAreaSummary' ),
      interactionHint: new FluentPattern( fluentBundleProperty, 'a11y_summary_interactionHint' ),
      interactionHintWithTransportProteins: new FluentPattern( fluentBundleProperty, 'a11y_summary_interactionHintWithTransportProteins' )
    },
    observationWindow: {
      membrane: {
        accessibleName: new FluentPattern( fluentBundleProperty, 'a11y_observationWindow_membrane_accessibleName' )
      }
    },
    soluteControls: {
      accessibleHeading: new FluentPattern( fluentBundleProperty, 'a11y_soluteControls_accessibleHeading' )
    },
    eraseSolutesButton: {
      accessibleName: new FluentPattern( fluentBundleProperty, 'a11y_eraseSolutesButton_accessibleName' ),
      accessibleContextResponse: new FluentPattern( fluentBundleProperty, 'a11y_eraseSolutesButton_accessibleContextResponse' )
    },
    transportProteinPanel: {
      transportProteins: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_transportProteins' ),
      accessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_accessibleHelpText' ),
      ligandGatedChannelPanel: {
        sodiumIonNaPlusLigandGated: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated' ),
        potassiumIonKPlusLigandGated: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated' )
      },
      leakageChannelPanel: {
        sodiumIonNaPlusLeakage: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage' ),
        potassiumIonKPlusLeakage: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage' )
      },
      voltageGatedChannelPanel: {
        sodiumIonNaPlusVoltageGated: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated' ),
        potassiumIonKPlusVoltageGated: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated' ),
        membranePotential: {
          radioButtonGroup: {
            accessibleName: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName' ),
            accessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText' ),
            negative70RadioButton: {
              accessibleName: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName' )
            },
            negative50RadioButton: {
              accessibleName: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName' )
            },
            positive30RadioButton: {
              accessibleName: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName' )
            }
          }
        },
        signsCheckbox: {
          accessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_accessibleHelpText' ),
          checkedContextResponseNegative70: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative70' ),
          checkedContextResponseNegative50: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponseNegative50' ),
          checkedContextResponsePositive30: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_checkedContextResponsePositive30' ),
          uncheckedContextResponse: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_signsCheckbox_uncheckedContextResponse' )
        }
      },
      activeTransportProteinPanel: {
        sodiumPotassiumPump: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump' ),
        sodiumGlucoseCotransporter: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter' )
      },
      toolAccessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinPanel_toolAccessibleHelpText' )
    },
    ligandNode: {
      starLigand: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_starLigand' ),
      triangleLigand: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_triangleLigand' ),
      accessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_accessibleHelpText' ),
      releasedLigand: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_releasedLigand' ),
      grabbedLigand: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_grabbedLigand' ),
      ligandReleasedOffMembranePattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_ligandReleasedOffMembranePattern' ),
      ligandReleasedOnProteinPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_ligandReleasedOnProteinPattern' ),
      ligandReleasedOnBusyOrIncompatibleProteinPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern' ),
      ligandMovedToSlotPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_ligandMovedToSlotPattern' ),
      ligandUnboundAlert: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_ligandUnboundAlert' ),
      thereIsNoProteinAtThisSlot: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_thereIsNoProteinAtThisSlot' ),
      thereIsProteinAtThisSlotPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_thereIsProteinAtThisSlotPattern' ),
      moveCancelledPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_moveCancelledPattern' ),
      cannotInteractWhileLigandIsBoundPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandNode_cannotInteractWhileLigandIsBoundPattern' )
    },
    soluteControlsAccessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_soluteControlsAccessibleHelpText' ),
    soluteAccessibleNames: {
      oxygen: new FluentPattern( fluentBundleProperty, 'a11y_soluteAccessibleNames_oxygen' ),
      carbonDioxide: new FluentPattern( fluentBundleProperty, 'a11y_soluteAccessibleNames_carbonDioxide' ),
      sodiumIon: new FluentPattern( fluentBundleProperty, 'a11y_soluteAccessibleNames_sodiumIon' ),
      potassiumIon: new FluentPattern( fluentBundleProperty, 'a11y_soluteAccessibleNames_potassiumIon' ),
      glucose: new FluentPattern( fluentBundleProperty, 'a11y_soluteAccessibleNames_glucose' ),
      atp: new FluentPattern( fluentBundleProperty, 'a11y_soluteAccessibleNames_atp' )
    },
    outsideMembraneSpinnerAccessibleName: new FluentPattern( fluentBundleProperty, 'a11y_outsideMembraneSpinnerAccessibleName' ),
    outsideMembraneSpinnerHelpText: new FluentPattern( fluentBundleProperty, 'a11y_outsideMembraneSpinnerHelpText' ),
    insideMembraneSpinnerAccessibleName: new FluentPattern( fluentBundleProperty, 'a11y_insideMembraneSpinnerAccessibleName' ),
    insideMembraneSpinnerHelpText: new FluentPattern( fluentBundleProperty, 'a11y_insideMembraneSpinnerHelpText' ),
    soluteSpinnerRoleDescription: new FluentPattern( fluentBundleProperty, 'a11y_soluteSpinnerRoleDescription' ),
    solute: new FluentPattern( fluentBundleProperty, 'a11y_solute' ),
    soluteSpinnerObjectResponsePattern: new FluentPattern( fluentBundleProperty, 'a11y_soluteSpinnerObjectResponsePattern' ),
    soluteSpinnerContextResponsePattern: new FluentPattern( fluentBundleProperty, 'a11y_soluteSpinnerContextResponsePattern' ),
    soluteBarChartsDescriptionParagraph: new FluentPattern( fluentBundleProperty, 'a11y_soluteBarChartsDescriptionParagraph' ),
    arrowSizeDescription: new FluentPattern( fluentBundleProperty, 'a11y_arrowSizeDescription' ),
    arrowDirectionDescription: new FluentPattern( fluentBundleProperty, 'a11y_arrowDirectionDescription' ),
    barSizeDescription: new FluentPattern( fluentBundleProperty, 'a11y_barSizeDescription' ),
    barChartPattern: new FluentPattern( fluentBundleProperty, 'a11y_barChartPattern' ),
    currentDetailsActivityLevel: new FluentPattern( fluentBundleProperty, 'a11y_currentDetailsActivityLevel' ),
    currentDetails: new FluentPattern( fluentBundleProperty, 'a11y_currentDetails' ),
    currentDetailsSoluteTypesOnOutside: new FluentPattern( fluentBundleProperty, 'a11y_currentDetailsSoluteTypesOnOutside' ),
    currentDetailsSoluteTypesOnInside: new FluentPattern( fluentBundleProperty, 'a11y_currentDetailsSoluteTypesOnInside' ),
    currentDetailsTransportProteins: new FluentPattern( fluentBundleProperty, 'a11y_currentDetailsTransportProteins' ),
    ligandsOnOutsideOnly: new FluentPattern( fluentBundleProperty, 'a11y_ligandsOnOutsideOnly' ),
    currentDetailsMembranePotential: new FluentPattern( fluentBundleProperty, 'a11y_currentDetailsMembranePotential' ),
    releasedBackInToolbox: new FluentPattern( fluentBundleProperty, 'a11y_releasedBackInToolbox' ),
    selectedTransportProteinInSlot: new FluentPattern( fluentBundleProperty, 'a11y_selectedTransportProteinInSlot' ),
    canceledBackInMembrane: new FluentPattern( fluentBundleProperty, 'a11y_canceledBackInMembrane' ),
    grabbedProteinResponsePattern: new FluentPattern( fluentBundleProperty, 'a11y_grabbedProteinResponsePattern' ),
    grabbedProteinResponseWithHintPattern: new FluentPattern( fluentBundleProperty, 'a11y_grabbedProteinResponseWithHintPattern' ),
    ligandToggleButtonAccessibleHelpText: new FluentPattern( fluentBundleProperty, 'a11y_ligandToggleButtonAccessibleHelpText' ),
    ligandToggleButtonAddedContextResponse: new FluentPattern( fluentBundleProperty, 'a11y_ligandToggleButtonAddedContextResponse' ),
    ligandToggleButtonRemovedContextResponse: new FluentPattern( fluentBundleProperty, 'a11y_ligandToggleButtonRemovedContextResponse' ),
    grabbedLigandResponsePattern: new FluentPattern( fluentBundleProperty, 'a11y_grabbedLigandResponsePattern' ),
    grabbedLigandResponseWithHintPattern: new FluentPattern( fluentBundleProperty, 'a11y_grabbedLigandResponseWithHintPattern' ),
    grabbedLigandResponseWithEmptyMembraneHintPattern: new FluentPattern( fluentBundleProperty, 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern' ),
    transportProteinBriefName: new FluentPattern( fluentBundleProperty, 'a11y_transportProteinBriefName' ),
    ligandMovedAboveLigandGatedChannelPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandMovedAboveLigandGatedChannelPattern' ),
    ligandMovedAboveLeakageChannelPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandMovedAboveLeakageChannelPattern' ),
    ligandMovedAboveOtherChannelPattern: new FluentPattern( fluentBundleProperty, 'a11y_ligandMovedAboveOtherChannelPattern' ),
    transportProtein: {
      accessibleNamePattern: new FluentPattern( fluentBundleProperty, 'a11y_transportProtein_accessibleNamePattern' )
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register('MembraneTransportFluent', MembraneTransportFluent);
