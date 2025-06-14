// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from membrane-transport-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
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
addToMapIfDefined( 'soluteConcentrations', 'soluteConcentrationsStringProperty' );
addToMapIfDefined( 'highlightCrossing', 'highlightCrossingStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSounds', 'preferencesDialog.audio.sounds.stereoSoundsStringProperty' );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSoundsDescription', 'preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty' );
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
addToMapIfDefined( 'a11y_soluteBarChartsDescriptionParagraph', 'a11y.soluteBarChartsDescriptionParagraphStringProperty' );
addToMapIfDefined( 'a11y_arrowSizeDescription', 'a11y.arrowSizeDescriptionStringProperty' );
addToMapIfDefined( 'a11y_arrowDirectionDescription', 'a11y.arrowDirectionDescriptionStringProperty' );
addToMapIfDefined( 'a11y_barSizeDescription', 'a11y.barSizeDescriptionStringProperty' );
addToMapIfDefined( 'a11y_barChartPattern', 'a11y.barChartPatternStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsLeadingParagraph', 'a11y.currentDetailsLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsNoAddedSolutes', 'a11y.currentDetailsNoAddedSolutesStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsSoluteTypesOnOutside', 'a11y.currentDetailsSoluteTypesOnOutsideStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsSoluteTypesOnInside', 'a11y.currentDetailsSoluteTypesOnInsideStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsTransportProteins', 'a11y.currentDetailsTransportProteinsStringProperty' );
addToMapIfDefined( 'a11y_currentDetailsLigands', 'a11y.currentDetailsLigandsStringProperty' );
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
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membrane_transport_title', _.get( MembraneTransportStrings, 'membrane-transport.titleStringProperty' )  )
  },
  screen: {
    simpleDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_simpleDiffusion', _.get( MembraneTransportStrings, 'screen.simpleDiffusionStringProperty' )  ),
    facilitatedDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_facilitatedDiffusion', _.get( MembraneTransportStrings, 'screen.facilitatedDiffusionStringProperty' )  ),
    activeTransportStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_activeTransport', _.get( MembraneTransportStrings, 'screen.activeTransportStringProperty' )  ),
    playgroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_playground', _.get( MembraneTransportStrings, 'screen.playgroundStringProperty' )  )
  },
  solutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'solutes', _.get( MembraneTransportStrings, 'solutesStringProperty' )  ),
  oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'oxygen', _.get( MembraneTransportStrings, 'oxygenStringProperty' )  ),
  carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'carbonDioxide', _.get( MembraneTransportStrings, 'carbonDioxideStringProperty' )  ),
  sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumIon', _.get( MembraneTransportStrings, 'sodiumIonStringProperty' )  ),
  potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'potassiumIon', _.get( MembraneTransportStrings, 'potassiumIonStringProperty' )  ),
  glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucose', _.get( MembraneTransportStrings, 'glucoseStringProperty' )  ),
  atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'atp', _.get( MembraneTransportStrings, 'atpStringProperty' )  ),
  outsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'outside', _.get( MembraneTransportStrings, 'outsideStringProperty' )  ),
  insideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'inside', _.get( MembraneTransportStrings, 'insideStringProperty' )  ),
  voltageGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'voltageGatedChannels', _.get( MembraneTransportStrings, 'voltageGatedChannelsStringProperty' )  ),
  ligandGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'ligandGatedChannels', _.get( MembraneTransportStrings, 'ligandGatedChannelsStringProperty' )  ),
  activeTransportersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'activeTransporters', _.get( MembraneTransportStrings, 'activeTransportersStringProperty' )  ),
  leakageChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'leakageChannels', _.get( MembraneTransportStrings, 'leakageChannelsStringProperty' )  ),
  NaPlusKPlusPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'NaPlusKPlusPump', _.get( MembraneTransportStrings, 'NaPlusKPlusPumpStringProperty' )  ),
  sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'sodiumGlucoseCotransporterStringProperty' )  ),
  membranePotential_mVStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membranePotential_mV', _.get( MembraneTransportStrings, 'membranePotential_mVStringProperty' )  ),
  chargesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'charges', _.get( MembraneTransportStrings, 'chargesStringProperty' )  ),
  addLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'addLigands', _.get( MembraneTransportStrings, 'addLigandsStringProperty' )  ),
  removeLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'removeLigands', _.get( MembraneTransportStrings, 'removeLigandsStringProperty' )  ),
  animateLipidsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipids', _.get( MembraneTransportStrings, 'animateLipidsStringProperty' )  ),
  animateLipidsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipidsDescription', _.get( MembraneTransportStrings, 'animateLipidsDescriptionStringProperty' )  ),
  glucoseDrainStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseDrain', _.get( MembraneTransportStrings, 'glucoseDrainStringProperty' )  ),
  glucoseDrainDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseDrainDescription', _.get( MembraneTransportStrings, 'glucoseDrainDescriptionStringProperty' )  ),
  soluteConcentrationsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteConcentrations', _.get( MembraneTransportStrings, 'soluteConcentrationsStringProperty' )  ),
  highlightCrossingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'highlightCrossing', _.get( MembraneTransportStrings, 'highlightCrossingStringProperty' )  ),
  preferencesDialog: {
    audio: {
      sounds: {
        stereoSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSounds', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoSoundsStringProperty' )  ),
        stereoSoundsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSoundsDescription', _.get( MembraneTransportStrings, 'preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty' )  )
      }
    }
  },
  a11y: {
    summary: {
      playAreaSummaryIntroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryIntro', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryIntroStringProperty' )  ),
      playAreaSummaryProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryProteins', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryProteinsStringProperty' )  ),
      playAreaSummaryPotentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryPotential', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryPotentialStringProperty' )  ),
      playAreaSummaryBarChartsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryBarCharts', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryBarChartsStringProperty' )  ),
      playAreaSummaryScreen1StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen1', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryScreen1StringProperty' )  ),
      playAreaSummaryScreen2and4StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen2and4', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryScreen2and4StringProperty' )  ),
      playAreaSummaryScreen3StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen3', _.get( MembraneTransportStrings, 'a11y.summary.playAreaSummaryScreen3StringProperty' )  ),
      controlAreaSummaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_controlAreaSummary', _.get( MembraneTransportStrings, 'a11y.summary.controlAreaSummaryStringProperty' )  ),
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHint', _.get( MembraneTransportStrings, 'a11y.summary.interactionHintStringProperty' )  ),
      interactionHintWithTransportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHintWithTransportProteins', _.get( MembraneTransportStrings, 'a11y.summary.interactionHintWithTransportProteinsStringProperty' )  )
    },
    soluteControls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHeading', _.get( MembraneTransportStrings, 'a11y.soluteControls.accessibleHeadingStringProperty' )  )
    },
    eraseSolutesButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleNameStringProperty' )  ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleContextResponse', _.get( MembraneTransportStrings, 'a11y.eraseSolutesButton.accessibleContextResponseStringProperty' )  )
    },
    transportProteinPanel: {
      transportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_transportProteins', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.transportProteinsStringProperty' )  ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.accessibleHelpTextStringProperty' )  ),
      ligandGatedChannelPanel: {
        sodiumIonNaPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty' )  ),
        potassiumIonKPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty' )  )
      },
      leakageChannelPanel: {
        sodiumIonNaPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty' )  ),
        potassiumIonKPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty' )  )
      },
      voltageGatedChannelPanel: {
        sodiumIonNaPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty' )  ),
        potassiumIonKPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty' )  ),
        membranePotential: {
          radioButtonGroup: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty' )  ),
            accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty' )  ),
            negative70RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleNameStringProperty' )  )
            },
            negative50RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleNameStringProperty' )  )
            },
            positive30RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleNameStringProperty' )  )
            }
          }
        },
        chargesCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleHelpTextStringProperty' )  ),
          uncheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_uncheckedContextResponse', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.uncheckedContextResponseStringProperty' )  )
        }
      },
      activeTransportProteinPanel: {
        sodiumPotassiumPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty' )  ),
        sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty' )  )
      },
      toolAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_toolAccessibleHelpText', _.get( MembraneTransportStrings, 'a11y.transportProteinPanel.toolAccessibleHelpTextStringProperty' )  )
    },
    ligandNode: {
      starLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_starLigand', _.get( MembraneTransportStrings, 'a11y.ligandNode.starLigandStringProperty' )  ),
      triangleLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_triangleLigand', _.get( MembraneTransportStrings, 'a11y.ligandNode.triangleLigandStringProperty' )  ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandNode.accessibleHelpTextStringProperty' )  ),
      releasedLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedLigand', _.get( MembraneTransportStrings, 'a11y.ligandNode.releasedLigandStringProperty' )  ),
      ligandReleasedOffMembranePatternStringProperty: _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandReleasedOffMembranePatternStringProperty' ),
      ligandReleasedOnProteinPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandReleasedOnProteinPattern', _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandReleasedOnProteinPatternStringProperty' )  ),
      ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern', _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty' )  ),
      ligandUnboundAlertStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandUnboundAlert', _.get( MembraneTransportStrings, 'a11y.ligandNode.ligandUnboundAlertStringProperty' )  )
    },
    soluteControlsAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControlsAccessibleHelpText', _.get( MembraneTransportStrings, 'a11y.soluteControlsAccessibleHelpTextStringProperty' )  ),
    soluteAccessibleNames: {
      oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_oxygen', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.oxygenStringProperty' )  ),
      carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_carbonDioxide', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.carbonDioxideStringProperty' )  ),
      sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_sodiumIon', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.sodiumIonStringProperty' )  ),
      potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_potassiumIon', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.potassiumIonStringProperty' )  ),
      glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_glucose', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.glucoseStringProperty' )  ),
      atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_atp', _.get( MembraneTransportStrings, 'a11y.soluteAccessibleNames.atpStringProperty' )  )
    },
    outsideMembraneSpinnerAccessibleNamePattern: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_outsideMembraneSpinnerAccessibleNamePattern' ),
    outsideMembraneSpinnerHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_outsideMembraneSpinnerHelpText', _.get( MembraneTransportStrings, 'a11y.outsideMembraneSpinnerHelpTextStringProperty' )  ),
    soluteSpinnerVoicingHintResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteSpinnerVoicingHintResponse', _.get( MembraneTransportStrings, 'a11y.soluteSpinnerVoicingHintResponseStringProperty' )  ),
    insideMembraneSpinnerAccessibleNamePattern: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_insideMembraneSpinnerAccessibleNamePattern' ),
    insideMembraneSpinnerHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_insideMembraneSpinnerHelpText', _.get( MembraneTransportStrings, 'a11y.insideMembraneSpinnerHelpTextStringProperty' )  ),
    soluteSpinnerRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteSpinnerRoleDescription', _.get( MembraneTransportStrings, 'a11y.soluteSpinnerRoleDescriptionStringProperty' )  ),
    solute: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solute' ),
    soluteCapitalized: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCapitalized' ),
    soluteSpinnerObjectResponsePattern: new FluentPattern<{ amount: 'none' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteSpinnerObjectResponsePattern' ),
    soluteSpinnerContextResponsePattern: new FluentPattern<{ addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | number | 'other' | 'more' | 'less' | TReadOnlyProperty<'same' | number | 'other' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteSpinnerContextResponsePattern' ),
    soluteBarChartsDescriptionParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteBarChartsDescriptionParagraph', _.get( MembraneTransportStrings, 'a11y.soluteBarChartsDescriptionParagraphStringProperty' )  ),
    arrowSizeDescription: new FluentPattern<{ size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_arrowSizeDescription' ),
    arrowDirectionDescription: new FluentPattern<{ direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'> }>( fluentSupport.bundleProperty, 'a11y_arrowDirectionDescription' ),
    barSizeDescription: new FluentPattern<{ amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'> }>( fluentSupport.bundleProperty, 'a11y_barSizeDescription' ),
    barChartPattern: new FluentPattern<{ amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'>, direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'>, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_barChartPattern' ),
    currentDetailsLeadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsLeadingParagraph', _.get( MembraneTransportStrings, 'a11y.currentDetailsLeadingParagraphStringProperty' )  ),
    currentDetailsNoAddedSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsNoAddedSolutes', _.get( MembraneTransportStrings, 'a11y.currentDetailsNoAddedSolutesStringProperty' )  ),
    currentDetailsSoluteTypesOnOutside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsSoluteTypesOnOutside' ),
    currentDetailsSoluteTypesOnInside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsSoluteTypesOnInside' ),
    currentDetailsTransportProteins: new FluentPattern<{ proteinCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, proteinTypeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsTransportProteins' ),
    currentDetailsLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsLigands', _.get( MembraneTransportStrings, 'a11y.currentDetailsLigandsStringProperty' )  ),
    currentDetailsMembranePotential: new FluentPattern<{ membranePotential: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_currentDetailsMembranePotential' ),
    ligandToggleButtonAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonAccessibleHelpText', _.get( MembraneTransportStrings, 'a11y.ligandToggleButtonAccessibleHelpTextStringProperty' )  ),
    ligandToggleButtonAddedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonAddedContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButtonAddedContextResponseStringProperty' )  ),
    ligandToggleButtonRemovedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonRemovedContextResponse', _.get( MembraneTransportStrings, 'a11y.ligandToggleButtonRemovedContextResponseStringProperty' )  ),
    grabbedLigandResponsePattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponsePattern' ),
    grabbedLigandResponseWithHintPattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponseWithHintPattern' ),
    grabbedLigandResponseWithEmptyMembraneHintPattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern' ),
    transportProteinBriefName: new FluentPattern<{ type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_transportProteinBriefName' ),
    ligandMovedAboveLigandGatedChannelPattern: new FluentPattern<{ index: FluentVariable, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveLigandGatedChannelPattern' ),
    ligandMovedAboveLeakageChannelPattern: new FluentPattern<{ index: FluentVariable, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveLeakageChannelPattern' ),
    ligandMovedAboveOtherChannelPattern: new FluentPattern<{ index: FluentVariable, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveOtherChannelPattern' ),
    transportProtein: {
      grabbedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_grabbed', _.get( MembraneTransportStrings, 'a11y.transportProtein.grabbedStringProperty' )  )
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register('MembraneTransportFluent', MembraneTransportFluent);
