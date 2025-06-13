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
import membraneTransport from './membraneTransport.js';
import MembraneTransportStrings from './MembraneTransportStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, sp: TReadOnlyProperty<string> | undefined ) => {
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'membrane_transport_title', MembraneTransportStrings?.["membrane-transport"]?.["titleStringProperty"] );
addToMapIfDefined( 'screen_simpleDiffusion', MembraneTransportStrings?.["screen"]?.["simpleDiffusionStringProperty"] );
addToMapIfDefined( 'screen_facilitatedDiffusion', MembraneTransportStrings?.["screen"]?.["facilitatedDiffusionStringProperty"] );
addToMapIfDefined( 'screen_activeTransport', MembraneTransportStrings?.["screen"]?.["activeTransportStringProperty"] );
addToMapIfDefined( 'screen_playground', MembraneTransportStrings?.["screen"]?.["playgroundStringProperty"] );
addToMapIfDefined( 'solutes', MembraneTransportStrings?.["solutesStringProperty"] );
addToMapIfDefined( 'oxygen', MembraneTransportStrings?.["oxygenStringProperty"] );
addToMapIfDefined( 'carbonDioxide', MembraneTransportStrings?.["carbonDioxideStringProperty"] );
addToMapIfDefined( 'sodiumIon', MembraneTransportStrings?.["sodiumIonStringProperty"] );
addToMapIfDefined( 'potassiumIon', MembraneTransportStrings?.["potassiumIonStringProperty"] );
addToMapIfDefined( 'glucose', MembraneTransportStrings?.["glucoseStringProperty"] );
addToMapIfDefined( 'atp', MembraneTransportStrings?.["atpStringProperty"] );
addToMapIfDefined( 'outside', MembraneTransportStrings?.["outsideStringProperty"] );
addToMapIfDefined( 'inside', MembraneTransportStrings?.["insideStringProperty"] );
addToMapIfDefined( 'voltageGatedChannels', MembraneTransportStrings?.["voltageGatedChannelsStringProperty"] );
addToMapIfDefined( 'ligandGatedChannels', MembraneTransportStrings?.["ligandGatedChannelsStringProperty"] );
addToMapIfDefined( 'activeTransporters', MembraneTransportStrings?.["activeTransportersStringProperty"] );
addToMapIfDefined( 'leakageChannels', MembraneTransportStrings?.["leakageChannelsStringProperty"] );
addToMapIfDefined( 'NaPlusKPlusPump', MembraneTransportStrings?.["NaPlusKPlusPumpStringProperty"] );
addToMapIfDefined( 'sodiumGlucoseCotransporter', MembraneTransportStrings?.["sodiumGlucoseCotransporterStringProperty"] );
addToMapIfDefined( 'membranePotential_mV', MembraneTransportStrings?.["membranePotential_mVStringProperty"] );
addToMapIfDefined( 'charges', MembraneTransportStrings?.["chargesStringProperty"] );
addToMapIfDefined( 'addLigands', MembraneTransportStrings?.["addLigandsStringProperty"] );
addToMapIfDefined( 'removeLigands', MembraneTransportStrings?.["removeLigandsStringProperty"] );
addToMapIfDefined( 'animateLipids', MembraneTransportStrings?.["animateLipidsStringProperty"] );
addToMapIfDefined( 'animateLipidsDescription', MembraneTransportStrings?.["animateLipidsDescriptionStringProperty"] );
addToMapIfDefined( 'glucoseDrain', MembraneTransportStrings?.["glucoseDrainStringProperty"] );
addToMapIfDefined( 'glucoseDrainDescription', MembraneTransportStrings?.["glucoseDrainDescriptionStringProperty"] );
addToMapIfDefined( 'soluteConcentrations', MembraneTransportStrings?.["soluteConcentrationsStringProperty"] );
addToMapIfDefined( 'highlightCrossing', MembraneTransportStrings?.["highlightCrossingStringProperty"] );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSounds', MembraneTransportStrings?.["preferencesDialog"]?.["audio"]?.["sounds"]?.["stereoSoundsStringProperty"] );
addToMapIfDefined( 'preferencesDialog_audio_sounds_stereoSoundsDescription', MembraneTransportStrings?.["preferencesDialog"]?.["audio"]?.["sounds"]?.["stereoSoundsDescriptionStringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryIntro', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryIntroStringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryProteins', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryProteinsStringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryPotential', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryPotentialStringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryBarCharts', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryBarChartsStringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryScreen1', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryScreen1StringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryScreen2and4', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryScreen2and4StringProperty"] );
addToMapIfDefined( 'a11y_summary_playAreaSummaryScreen3', MembraneTransportStrings?.["a11y"]?.["summary"]?.["playAreaSummaryScreen3StringProperty"] );
addToMapIfDefined( 'a11y_summary_controlAreaSummary', MembraneTransportStrings?.["a11y"]?.["summary"]?.["controlAreaSummaryStringProperty"] );
addToMapIfDefined( 'a11y_summary_interactionHint', MembraneTransportStrings?.["a11y"]?.["summary"]?.["interactionHintStringProperty"] );
addToMapIfDefined( 'a11y_summary_interactionHintWithTransportProteins', MembraneTransportStrings?.["a11y"]?.["summary"]?.["interactionHintWithTransportProteinsStringProperty"] );
addToMapIfDefined( 'a11y_soluteControls_accessibleHeading', MembraneTransportStrings?.["a11y"]?.["soluteControls"]?.["accessibleHeadingStringProperty"] );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleName', MembraneTransportStrings?.["a11y"]?.["eraseSolutesButton"]?.["accessibleNameStringProperty"] );
addToMapIfDefined( 'a11y_eraseSolutesButton_accessibleContextResponse', MembraneTransportStrings?.["a11y"]?.["eraseSolutesButton"]?.["accessibleContextResponseStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_transportProteins', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["transportProteinsStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_accessibleHelpText', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["accessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["ligandGatedChannelPanel"]?.["sodiumIonNaPlusLigandGatedStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["ligandGatedChannelPanel"]?.["potassiumIonKPlusLigandGatedStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["leakageChannelPanel"]?.["sodiumIonNaPlusLeakageStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["leakageChannelPanel"]?.["potassiumIonKPlusLeakageStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["sodiumIonNaPlusVoltageGatedStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["potassiumIonKPlusVoltageGatedStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["membranePotential"]?.["radioButtonGroup"]?.["accessibleNameStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["membranePotential"]?.["radioButtonGroup"]?.["accessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["membranePotential"]?.["radioButtonGroup"]?.["negative70RadioButton"]?.["accessibleNameStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["membranePotential"]?.["radioButtonGroup"]?.["negative50RadioButton"]?.["accessibleNameStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["membranePotential"]?.["radioButtonGroup"]?.["positive30RadioButton"]?.["accessibleNameStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleHelpText', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["chargesCheckbox"]?.["accessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_uncheckedContextResponse', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["voltageGatedChannelPanel"]?.["chargesCheckbox"]?.["uncheckedContextResponseStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["activeTransportProteinPanel"]?.["sodiumPotassiumPumpStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["activeTransportProteinPanel"]?.["sodiumGlucoseCotransporterStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinPanel_toolAccessibleHelpText', MembraneTransportStrings?.["a11y"]?.["transportProteinPanel"]?.["toolAccessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_starLigand', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["starLigandStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_triangleLigand', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["triangleLigandStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_accessibleHelpText', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["accessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_releasedLigand', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["releasedLigandStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_ligandReleasedOnProteinPattern', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["ligandReleasedOnProteinPatternStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty"] );
addToMapIfDefined( 'a11y_ligandNode_ligandUnboundAlert', MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["ligandUnboundAlertStringProperty"] );
addToMapIfDefined( 'a11y_soluteControlsAccessibleHelpText', MembraneTransportStrings?.["a11y"]?.["soluteControlsAccessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_soluteAccessibleNames_oxygen', MembraneTransportStrings?.["a11y"]?.["soluteAccessibleNames"]?.["oxygenStringProperty"] );
addToMapIfDefined( 'a11y_soluteAccessibleNames_carbonDioxide', MembraneTransportStrings?.["a11y"]?.["soluteAccessibleNames"]?.["carbonDioxideStringProperty"] );
addToMapIfDefined( 'a11y_soluteAccessibleNames_sodiumIon', MembraneTransportStrings?.["a11y"]?.["soluteAccessibleNames"]?.["sodiumIonStringProperty"] );
addToMapIfDefined( 'a11y_soluteAccessibleNames_potassiumIon', MembraneTransportStrings?.["a11y"]?.["soluteAccessibleNames"]?.["potassiumIonStringProperty"] );
addToMapIfDefined( 'a11y_soluteAccessibleNames_glucose', MembraneTransportStrings?.["a11y"]?.["soluteAccessibleNames"]?.["glucoseStringProperty"] );
addToMapIfDefined( 'a11y_soluteAccessibleNames_atp', MembraneTransportStrings?.["a11y"]?.["soluteAccessibleNames"]?.["atpStringProperty"] );
addToMapIfDefined( 'a11y_outsideMembraneSpinnerAccessibleNamePattern', MembraneTransportStrings?.["a11y"]?.["outsideMembraneSpinnerAccessibleNamePatternStringProperty"] );
addToMapIfDefined( 'a11y_outsideMembraneSpinnerHelpText', MembraneTransportStrings?.["a11y"]?.["outsideMembraneSpinnerHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_soluteSpinnerVoicingHintResponse', MembraneTransportStrings?.["a11y"]?.["soluteSpinnerVoicingHintResponseStringProperty"] );
addToMapIfDefined( 'a11y_insideMembraneSpinnerAccessibleNamePattern', MembraneTransportStrings?.["a11y"]?.["insideMembraneSpinnerAccessibleNamePatternStringProperty"] );
addToMapIfDefined( 'a11y_insideMembraneSpinnerHelpText', MembraneTransportStrings?.["a11y"]?.["insideMembraneSpinnerHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_soluteSpinnerRoleDescription', MembraneTransportStrings?.["a11y"]?.["soluteSpinnerRoleDescriptionStringProperty"] );
addToMapIfDefined( 'a11y_solute', MembraneTransportStrings?.["a11y"]?.["soluteStringProperty"] );
addToMapIfDefined( 'a11y_soluteCapitalized', MembraneTransportStrings?.["a11y"]?.["soluteCapitalizedStringProperty"] );
addToMapIfDefined( 'a11y_soluteSpinnerObjectResponsePattern', MembraneTransportStrings?.["a11y"]?.["soluteSpinnerObjectResponsePatternStringProperty"] );
addToMapIfDefined( 'a11y_soluteSpinnerContextResponsePattern', MembraneTransportStrings?.["a11y"]?.["soluteSpinnerContextResponsePatternStringProperty"] );
addToMapIfDefined( 'a11y_soluteBarChartsDescriptionParagraph', MembraneTransportStrings?.["a11y"]?.["soluteBarChartsDescriptionParagraphStringProperty"] );
addToMapIfDefined( 'a11y_arrowSizeDescription', MembraneTransportStrings?.["a11y"]?.["arrowSizeDescriptionStringProperty"] );
addToMapIfDefined( 'a11y_arrowDirectionDescription', MembraneTransportStrings?.["a11y"]?.["arrowDirectionDescriptionStringProperty"] );
addToMapIfDefined( 'a11y_barSizeDescription', MembraneTransportStrings?.["a11y"]?.["barSizeDescriptionStringProperty"] );
addToMapIfDefined( 'a11y_barChartPattern', MembraneTransportStrings?.["a11y"]?.["barChartPatternStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsLeadingParagraph', MembraneTransportStrings?.["a11y"]?.["currentDetailsLeadingParagraphStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsNoAddedSolutes', MembraneTransportStrings?.["a11y"]?.["currentDetailsNoAddedSolutesStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsSoluteTypesOnOutside', MembraneTransportStrings?.["a11y"]?.["currentDetailsSoluteTypesOnOutsideStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsSoluteTypesOnInside', MembraneTransportStrings?.["a11y"]?.["currentDetailsSoluteTypesOnInsideStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsTransportProteins', MembraneTransportStrings?.["a11y"]?.["currentDetailsTransportProteinsStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsLigands', MembraneTransportStrings?.["a11y"]?.["currentDetailsLigandsStringProperty"] );
addToMapIfDefined( 'a11y_currentDetailsMembranePotential', MembraneTransportStrings?.["a11y"]?.["currentDetailsMembranePotentialStringProperty"] );
addToMapIfDefined( 'a11y_ligandToggleButtonAccessibleHelpText', MembraneTransportStrings?.["a11y"]?.["ligandToggleButtonAccessibleHelpTextStringProperty"] );
addToMapIfDefined( 'a11y_ligandToggleButtonAddedContextResponse', MembraneTransportStrings?.["a11y"]?.["ligandToggleButtonAddedContextResponseStringProperty"] );
addToMapIfDefined( 'a11y_ligandToggleButtonRemovedContextResponse', MembraneTransportStrings?.["a11y"]?.["ligandToggleButtonRemovedContextResponseStringProperty"] );
addToMapIfDefined( 'a11y_grabbedLigandResponsePattern', MembraneTransportStrings?.["a11y"]?.["grabbedLigandResponsePatternStringProperty"] );
addToMapIfDefined( 'a11y_grabbedLigandResponseWithHintPattern', MembraneTransportStrings?.["a11y"]?.["grabbedLigandResponseWithHintPatternStringProperty"] );
addToMapIfDefined( 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern', MembraneTransportStrings?.["a11y"]?.["grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty"] );
addToMapIfDefined( 'a11y_transportProteinBriefName', MembraneTransportStrings?.["a11y"]?.["transportProteinBriefNameStringProperty"] );
addToMapIfDefined( 'a11y_ligandMovedAboveLigandGatedChannelPattern', MembraneTransportStrings?.["a11y"]?.["ligandMovedAboveLigandGatedChannelPatternStringProperty"] );
addToMapIfDefined( 'a11y_ligandMovedAboveLeakageChannelPattern', MembraneTransportStrings?.["a11y"]?.["ligandMovedAboveLeakageChannelPatternStringProperty"] );
addToMapIfDefined( 'a11y_ligandMovedAboveOtherChannelPattern', MembraneTransportStrings?.["a11y"]?.["ligandMovedAboveOtherChannelPatternStringProperty"] );
addToMapIfDefined( 'a11y_transportProtein_grabbed', MembraneTransportStrings?.["a11y"]?.["transportProtein"]?.["grabbedStringProperty"] );

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
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membrane_transport_title' )
  },
  screen: {
    simpleDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_simpleDiffusion' ),
    facilitatedDiffusionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_facilitatedDiffusion' ),
    activeTransportStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_activeTransport' ),
    playgroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'screen_playground' )
  },
  solutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'solutes' ),
  oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'oxygen' ),
  carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'carbonDioxide' ),
  sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumIon' ),
  potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'potassiumIon' ),
  glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucose' ),
  atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'atp' ),
  outsideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'outside' ),
  insideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'inside' ),
  voltageGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'voltageGatedChannels' ),
  ligandGatedChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'ligandGatedChannels' ),
  activeTransportersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'activeTransporters' ),
  leakageChannelsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'leakageChannels' ),
  NaPlusKPlusPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'NaPlusKPlusPump' ),
  sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sodiumGlucoseCotransporter' ),
  membranePotential_mVStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'membranePotential_mV' ),
  chargesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'charges' ),
  addLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'addLigands' ),
  removeLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'removeLigands' ),
  animateLipidsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipids' ),
  animateLipidsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'animateLipidsDescription' ),
  glucoseDrainStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseDrain' ),
  glucoseDrainDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'glucoseDrainDescription' ),
  soluteConcentrationsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'soluteConcentrations' ),
  highlightCrossingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'highlightCrossing' ),
  preferencesDialog: {
    audio: {
      sounds: {
        stereoSoundsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSounds' ),
        stereoSoundsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'preferencesDialog_audio_sounds_stereoSoundsDescription' )
      }
    }
  },
  a11y: {
    summary: {
      playAreaSummaryIntroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryIntro' ),
      playAreaSummaryProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryProteins' ),
      playAreaSummaryPotentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryPotential' ),
      playAreaSummaryBarChartsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryBarCharts' ),
      playAreaSummaryScreen1StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen1' ),
      playAreaSummaryScreen2and4StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen2and4' ),
      playAreaSummaryScreen3StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_playAreaSummaryScreen3' ),
      controlAreaSummaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_controlAreaSummary' ),
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHint' ),
      interactionHintWithTransportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHintWithTransportProteins' )
    },
    soluteControls: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControls_accessibleHeading' )
    },
    eraseSolutesButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleName' ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseSolutesButton_accessibleContextResponse' )
    },
    transportProteinPanel: {
      transportProteinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_transportProteins' ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_accessibleHelpText' ),
      ligandGatedChannelPanel: {
        sodiumIonNaPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_sodiumIonNaPlusLigandGated' ),
        potassiumIonKPlusLigandGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_ligandGatedChannelPanel_potassiumIonKPlusLigandGated' )
      },
      leakageChannelPanel: {
        sodiumIonNaPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_sodiumIonNaPlusLeakage' ),
        potassiumIonKPlusLeakageStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_leakageChannelPanel_potassiumIonKPlusLeakage' )
      },
      voltageGatedChannelPanel: {
        sodiumIonNaPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_sodiumIonNaPlusVoltageGated' ),
        potassiumIonKPlusVoltageGatedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_potassiumIonKPlusVoltageGated' ),
        membranePotential: {
          radioButtonGroup: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleName' ),
            accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_accessibleHelpText' ),
            negative70RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative70RadioButton_accessibleName' )
            },
            negative50RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_negative50RadioButton_accessibleName' )
            },
            positive30RadioButton: {
              accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_membranePotential_radioButtonGroup_positive30RadioButton_accessibleName' )
            }
          }
        },
        chargesCheckbox: {
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_accessibleHelpText' ),
          uncheckedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_voltageGatedChannelPanel_chargesCheckbox_uncheckedContextResponse' )
        }
      },
      activeTransportProteinPanel: {
        sodiumPotassiumPumpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumPotassiumPump' ),
        sodiumGlucoseCotransporterStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_activeTransportProteinPanel_sodiumGlucoseCotransporter' )
      },
      toolAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProteinPanel_toolAccessibleHelpText' )
    },
    ligandNode: {
      starLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_starLigand' ),
      triangleLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_triangleLigand' ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_accessibleHelpText' ),
      releasedLigandStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_releasedLigand' ),
      ligandReleasedOffMembranePatternStringProperty: MembraneTransportStrings?.["a11y"]?.["ligandNode"]?.["ligandReleasedOffMembranePatternStringProperty"],
      ligandReleasedOnProteinPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandReleasedOnProteinPattern' ),
      ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandReleasedOnBusyOrIncompatibleProteinPattern' ),
      ligandUnboundAlertStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandNode_ligandUnboundAlert' )
    },
    soluteControlsAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteControlsAccessibleHelpText' ),
    soluteAccessibleNames: {
      oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_oxygen' ),
      carbonDioxideStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_carbonDioxide' ),
      sodiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_sodiumIon' ),
      potassiumIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_potassiumIon' ),
      glucoseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_glucose' ),
      atpStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteAccessibleNames_atp' )
    },
    outsideMembraneSpinnerAccessibleNamePattern: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_outsideMembraneSpinnerAccessibleNamePattern' ),
    outsideMembraneSpinnerHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_outsideMembraneSpinnerHelpText' ),
    soluteSpinnerVoicingHintResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteSpinnerVoicingHintResponse' ),
    insideMembraneSpinnerAccessibleNamePattern: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_insideMembraneSpinnerAccessibleNamePattern' ),
    insideMembraneSpinnerHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_insideMembraneSpinnerHelpText' ),
    soluteSpinnerRoleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteSpinnerRoleDescription' ),
    solute: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_solute' ),
    soluteCapitalized: new FluentPattern<{ soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteCapitalized' ),
    soluteSpinnerObjectResponsePattern: new FluentPattern<{ amount: 'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount' | TReadOnlyProperty<'none' | number | 'few' | 'some' | 'smallAmount' | 'several' | number | 'many' | 'largeAmount' | 'hugeAmount' | 'maxAmount'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteSpinnerObjectResponsePattern' ),
    soluteSpinnerContextResponsePattern: new FluentPattern<{ addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | number | 'other' | 'more' | 'less' | TReadOnlyProperty<'same' | number | 'other' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_soluteSpinnerContextResponsePattern' ),
    soluteBarChartsDescriptionParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_soluteBarChartsDescriptionParagraph' ),
    arrowSizeDescription: new FluentPattern<{ size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_arrowSizeDescription' ),
    arrowDirectionDescription: new FluentPattern<{ direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'> }>( fluentSupport.bundleProperty, 'a11y_arrowDirectionDescription' ),
    barSizeDescription: new FluentPattern<{ amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'> }>( fluentSupport.bundleProperty, 'a11y_barSizeDescription' ),
    barChartPattern: new FluentPattern<{ amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'>, direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'>, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }>( fluentSupport.bundleProperty, 'a11y_barChartPattern' ),
    currentDetailsLeadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsLeadingParagraph' ),
    currentDetailsNoAddedSolutesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsNoAddedSolutes' ),
    currentDetailsSoluteTypesOnOutside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsSoluteTypesOnOutside' ),
    currentDetailsSoluteTypesOnInside: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsSoluteTypesOnInside' ),
    currentDetailsTransportProteins: new FluentPattern<{ proteinCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, proteinTypeCount: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_currentDetailsTransportProteins' ),
    currentDetailsLigandsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_currentDetailsLigands' ),
    currentDetailsMembranePotential: new FluentPattern<{ membranePotential: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_currentDetailsMembranePotential' ),
    ligandToggleButtonAccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonAccessibleHelpText' ),
    ligandToggleButtonAddedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonAddedContextResponse' ),
    ligandToggleButtonRemovedContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_ligandToggleButtonRemovedContextResponse' ),
    grabbedLigandResponsePattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponsePattern' ),
    grabbedLigandResponseWithHintPattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponseWithHintPattern' ),
    grabbedLigandResponseWithEmptyMembraneHintPattern: new FluentPattern<{ proteinCount: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern' ),
    transportProteinBriefName: new FluentPattern<{ type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_transportProteinBriefName' ),
    ligandMovedAboveLigandGatedChannelPattern: new FluentPattern<{ index: FluentVariable, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveLigandGatedChannelPattern' ),
    ligandMovedAboveLeakageChannelPattern: new FluentPattern<{ index: FluentVariable, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveLeakageChannelPattern' ),
    ligandMovedAboveOtherChannelPattern: new FluentPattern<{ index: FluentVariable, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: FluentVariable, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }>( fluentSupport.bundleProperty, 'a11y_ligandMovedAboveOtherChannelPattern' ),
    transportProtein: {
      grabbedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_transportProtein_grabbed' )
    }
  }
};

export default MembraneTransportFluent;

membraneTransport.register('MembraneTransportFluent', MembraneTransportFluent);
