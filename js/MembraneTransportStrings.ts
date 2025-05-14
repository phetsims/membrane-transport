// Copyright 2024-2025, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import createFluentMessageProperty from '../../chipper/js/browser/createFluentMessageProperty.js';
import LocalizedString from '../../chipper/js/browser/LocalizedString.js';
import { FluentBundle } from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentUtils from '../../chipper/js/browser/FluentUtils.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import type IntentionalAny from '../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from './membraneTransport.js';

type StringsType = {
  'membrane-transport': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'simpleDiffusionStringProperty': LocalizedStringProperty;
    'facilitatedDiffusionStringProperty': LocalizedStringProperty;
    'activeTransportStringProperty': LocalizedStringProperty;
    'playgroundStringProperty': LocalizedStringProperty;
  };
  'solutesStringProperty': LocalizedStringProperty;
  'oxygenStringProperty': LocalizedStringProperty;
  'carbonDioxideStringProperty': LocalizedStringProperty;
  'sodiumIonStringProperty': LocalizedStringProperty;
  'potassiumIonStringProperty': LocalizedStringProperty;
  'glucoseStringProperty': LocalizedStringProperty;
  'atpStringProperty': LocalizedStringProperty;
  'outsideStringProperty': LocalizedStringProperty;
  'insideStringProperty': LocalizedStringProperty;
  'membranePotentialLabelsStringProperty': LocalizedStringProperty;
  'voltageGatedChannelsStringProperty': LocalizedStringProperty;
  'ligandGatedChannelsStringProperty': LocalizedStringProperty;
  'activeTransportersStringProperty': LocalizedStringProperty;
  'leakageChannelsStringProperty': LocalizedStringProperty;
  'sodiumIonNaPlusStringProperty': LocalizedStringProperty;
  'potassiumIonKPlusStringProperty': LocalizedStringProperty;
  'NaPlusKPlusPumpStringProperty': LocalizedStringProperty;
  'sodiumGlucoseCotransporterStringProperty': LocalizedStringProperty;
  'membranePotential_mVStringProperty': LocalizedStringProperty;
  'signsStringProperty': LocalizedStringProperty;
  'addLigandsStringProperty': LocalizedStringProperty;
  'removeLigandsStringProperty': LocalizedStringProperty;
  'animateLipidsStringProperty': LocalizedStringProperty;
  'animateLipidsDescriptionStringProperty': LocalizedStringProperty;
  'soluteConcentrationsStringProperty': LocalizedStringProperty;
  'a11y': {
    'summary': {
      'playAreaSummaryIntroStringProperty': LocalizedStringProperty;
      'playAreaSummarySolutesStringProperty': LocalizedStringProperty;
      'playAreaSummaryProteinsStringProperty': LocalizedStringProperty;
      'playAreaSummaryPotentialStringProperty': LocalizedStringProperty;
      'playAreaSummaryBarChartsStringProperty': LocalizedStringProperty;
      'playAreaSummaryScreen1StringProperty': LocalizedStringProperty;
      'playAreaSummaryScreen2and4StringProperty': LocalizedStringProperty;
      'playAreaSummaryScreen3StringProperty': LocalizedStringProperty;
      'controlAreaSummaryStringProperty': LocalizedStringProperty;
      'interactionHintStringProperty': LocalizedStringProperty;
      'interactionHintWithTransportProteinsStringProperty': LocalizedStringProperty;
    };
    'observationWindow': {
      'membrane': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      }
    };
    'soluteControls': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
    };
    'eraseSolutesButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'transportProteinPanel': {
      'transportProteinsStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'ligandGatedChannelPanel': {
        'sodiumIonNaPlusLigandGatedStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusLigandGatedStringProperty': LocalizedStringProperty;
      };
      'leakageChannelPanel': {
        'sodiumIonNaPlusLeakageStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusLeakageStringProperty': LocalizedStringProperty;
      };
      'voltageGatedChannelPanel': {
        'sodiumIonNaPlusVoltageGatedStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusVoltageGatedStringProperty': LocalizedStringProperty;
        'membranePotential': {
          'radioButtonGroup': {
            'accessibleNameStringProperty': LocalizedStringProperty;
            'accessibleHelpTextStringProperty': LocalizedStringProperty;
            'negative70RadioButton': {
              'accessibleNameStringProperty': LocalizedStringProperty;
            };
            'negative50RadioButton': {
              'accessibleNameStringProperty': LocalizedStringProperty;
            };
            'positive30RadioButton': {
              'accessibleNameStringProperty': LocalizedStringProperty;
            }
          }
        };
        'signsCheckbox': {
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
          'checkedContextResponseNegative70StringProperty': LocalizedStringProperty;
          'checkedContextResponseNegative50StringProperty': LocalizedStringProperty;
          'checkedContextResponsePositive30StringProperty': LocalizedStringProperty;
          'uncheckedContextResponseStringProperty': LocalizedStringProperty;
        }
      };
      'activeTransportProteinPanel': {
        'sodiumPotassiumPumpStringProperty': LocalizedStringProperty;
        'sodiumGlucoseCotransporterStringProperty': LocalizedStringProperty;
      };
      'toolAccessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'ligandNode': {
      'starLigandStringProperty': LocalizedStringProperty;
      'triangleLigandStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'releasedLigandStringProperty': LocalizedStringProperty;
      'grabbedLigandStringProperty': LocalizedStringProperty;
      'ligandReleasedOffMembranePatternStringProperty': LocalizedStringProperty;
      'ligandReleasedOnProteinPatternStringProperty': LocalizedStringProperty;
      'ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty': LocalizedStringProperty;
      'ligandMovedToSlotPatternStringProperty': LocalizedStringProperty;
      'ligandUnboundAlertStringProperty': LocalizedStringProperty;
      'thereIsNoProteinAtThisSlotStringProperty': LocalizedStringProperty;
      'thereIsProteinAtThisSlotPatternStringProperty': LocalizedStringProperty;
      'moveCancelledPatternStringProperty': LocalizedStringProperty;
      'cannotInteractWhileLigandIsBoundPatternStringProperty': LocalizedStringProperty;
    };
    'soluteControlsAccessibleHelpTextStringProperty': LocalizedStringProperty;
    'outsideMembraneSpinnerAccessibleNameStringProperty': LocalizedStringProperty;
    'outsideMembraneSpinnerHelpTextStringProperty': LocalizedStringProperty;
    'insideMembraneSpinnerAccessibleNameStringProperty': LocalizedStringProperty;
    'insideMembraneSpinnerHelpTextStringProperty': LocalizedStringProperty;
    'soluteSpinnerRoleDescriptionStringProperty': LocalizedStringProperty;
    'soluteStringProperty': LocalizedStringProperty;
    'soluteSpinnerObjectResponsePatternStringProperty': LocalizedStringProperty;
    'soluteSpinnerContextResponsePatternStringProperty': LocalizedStringProperty;
    'soluteBarChartsDescriptionParagraphStringProperty': LocalizedStringProperty;
    'arrowSizeDescriptionStringProperty': LocalizedStringProperty;
    'arrowDirectionDescriptionStringProperty': LocalizedStringProperty;
    'barSizeDescriptionStringProperty': LocalizedStringProperty;
    'barChartPatternStringProperty': LocalizedStringProperty;
    'currentDetailsActivityLevelStringProperty': LocalizedStringProperty;
    'currentDetailsStringProperty': LocalizedStringProperty;
    'currentDetailsSoluteTypesOnOutsideStringProperty': LocalizedStringProperty;
    'currentDetailsSoluteTypesOnInsideStringProperty': LocalizedStringProperty;
    'currentDetailsTransportProteinsStringProperty': LocalizedStringProperty;
    'ligandsOnOutsideOnlyStringProperty': LocalizedStringProperty;
    'currentDetailsMembranePotentialStringProperty': LocalizedStringProperty;
    'releasedBackInToolboxStringProperty': LocalizedStringProperty;
    'selectedTransportProteinInSlotStringProperty': LocalizedStringProperty;
    'canceledBackInMembraneStringProperty': LocalizedStringProperty;
    'grabbedProteinResponsePatternStringProperty': LocalizedStringProperty;
    'grabbedProteinResponseWithHintPatternStringProperty': LocalizedStringProperty;
    'ligandToggleButtonAccessibleHelpTextStringProperty': LocalizedStringProperty;
    'ligandToggleButtonAddedContextResponseStringProperty': LocalizedStringProperty;
    'ligandToggleButtonRemovedContextResponseStringProperty': LocalizedStringProperty;
    'grabbedLigandResponsePatternStringProperty': LocalizedStringProperty;
    'grabbedLigandResponseWithHintPatternStringProperty': LocalizedStringProperty;
    'grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty': LocalizedStringProperty;
    'transportProteinBriefNameStringProperty': LocalizedStringProperty;
    'ligandMovedAboveLigandGatedChannelPatternStringProperty': LocalizedStringProperty;
    'ligandMovedAboveLeakageChannelPatternStringProperty': LocalizedStringProperty;
    'ligandMovedAboveOtherChannelPatternStringProperty': LocalizedStringProperty;
    'transportProtein': {
      'accessibleNamePatternStringProperty': LocalizedStringProperty;
    }
  };
  'transportProteinBriefNameStringProperty': LocalizedStringProperty;
  'soluteControlsAccessibleHelpTextStringProperty': LocalizedStringProperty;
  'outsideMembraneSpinnerAccessibleNameStringProperty': LocalizedStringProperty;
  'outsideMembraneSpinnerHelpTextStringProperty': LocalizedStringProperty;
  'insideMembraneSpinnerAccessibleNameStringProperty': LocalizedStringProperty;
  'insideMembraneSpinnerHelpTextStringProperty': LocalizedStringProperty;
  'soluteSpinnerRoleDescriptionStringProperty': LocalizedStringProperty;
  'soluteStringProperty': LocalizedStringProperty;
  'soluteSpinnerObjectResponsePatternStringProperty': LocalizedStringProperty;
  'soluteSpinnerContextResponsePatternStringProperty': LocalizedStringProperty;
  'soluteBarChartsDescriptionParagraphStringProperty': LocalizedStringProperty;
  'arrowSizeDescriptionStringProperty': LocalizedStringProperty;
  'arrowDirectionDescriptionStringProperty': LocalizedStringProperty;
  'barSizeDescriptionStringProperty': LocalizedStringProperty;
  'barChartPatternStringProperty': LocalizedStringProperty;
  'currentDetailsActivityLevelStringProperty': LocalizedStringProperty;
  'currentDetailsStringProperty': LocalizedStringProperty;
  'currentDetailsSoluteTypesOnOutsideStringProperty': LocalizedStringProperty;
  'currentDetailsSoluteTypesOnInsideStringProperty': LocalizedStringProperty;
  'currentDetailsTransportProteinsStringProperty': LocalizedStringProperty;
  'ligandsOnOutsideOnlyStringProperty': LocalizedStringProperty;
  'currentDetailsMembranePotentialStringProperty': LocalizedStringProperty;
  'releasedBackInToolboxStringProperty': LocalizedStringProperty;
  'selectedTransportProteinInSlotStringProperty': LocalizedStringProperty;
  'canceledBackInMembraneStringProperty': LocalizedStringProperty;
  'grabbedProteinResponsePatternStringProperty': LocalizedStringProperty;
  'grabbedProteinResponseWithHintPatternStringProperty': LocalizedStringProperty;
  'ligandToggleButtonAccessibleHelpTextStringProperty': LocalizedStringProperty;
  'ligandToggleButtonAddedContextResponseStringProperty': LocalizedStringProperty;
  'ligandToggleButtonRemovedContextResponseStringProperty': LocalizedStringProperty;
  'grabbedLigandResponsePatternStringProperty': LocalizedStringProperty;
  'grabbedLigandResponseWithHintPatternStringProperty': LocalizedStringProperty;
  'grabbedLigandResponseWithEmptyMembraneHintPatternStringProperty': LocalizedStringProperty;
  'ligandMovedAboveLigandGatedChannelPatternStringProperty': LocalizedStringProperty;
  'ligandMovedAboveLeakageChannelPatternStringProperty': LocalizedStringProperty;
  'ligandMovedAboveOtherChannelPatternStringProperty': LocalizedStringProperty;
  'localizedStringMap': Record<string, LocalizedString>;
  'fluentBundleProperty': TReadOnlyProperty<FluentBundle>;
}

const MembraneTransportStrings = getStringModule( 'MEMBRANE_TRANSPORT' ) as StringsType;


// Interface for all strings, with special handling for parameterized patterns
export const MembraneTransportFluent = {
  'membrane-transport.title': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/membrane-transport.title'].property,
  'screen.simpleDiffusion': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/screen.simpleDiffusion'].property,
  'screen.facilitatedDiffusion': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/screen.facilitatedDiffusion'].property,
  'screen.activeTransport': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/screen.activeTransport'].property,
  'screen.playground': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/screen.playground'].property,
  'solutes': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/solutes'].property,
  'oxygen': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/oxygen'].property,
  'carbonDioxide': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/carbonDioxide'].property,
  'sodiumIon': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/sodiumIon'].property,
  'potassiumIon': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/potassiumIon'].property,
  'glucose': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/glucose'].property,
  'atp': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/atp'].property,
  'outside': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/outside'].property,
  'inside': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/inside'].property,
  'membranePotentialLabels': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/membranePotentialLabels'].property,
  'voltageGatedChannels': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/voltageGatedChannels'].property,
  'ligandGatedChannels': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandGatedChannels'].property,
  'activeTransporters': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/activeTransporters'].property,
  'leakageChannels': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/leakageChannels'].property,
  'sodiumIonNaPlus': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/sodiumIonNaPlus'].property,
  'potassiumIonKPlus': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/potassiumIonKPlus'].property,
  'NaPlusKPlusPump': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/NaPlusKPlusPump'].property,
  'sodiumGlucoseCotransporter': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/sodiumGlucoseCotransporter'].property,
  'membranePotential_mV': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/membranePotential_mV'].property,
  'signs': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/signs'].property,
  'addLigands': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/addLigands'].property,
  'removeLigands': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/removeLigands'].property,
  'animateLipids': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/animateLipids'].property,
  'animateLipidsDescription': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/animateLipidsDescription'].property,
  'soluteConcentrations': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteConcentrations'].property,
  'a11y':   {
    'summary':     {
      'playAreaSummaryIntro': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryIntro'].property,
      'playAreaSummarySolutes': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummarySolutes'].property,
      'playAreaSummaryProteins': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryProteins'].property,
      'playAreaSummaryPotential': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryPotential'].property,
      'playAreaSummaryBarCharts': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryBarCharts'].property,
      'playAreaSummaryScreen1': createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_summary_playAreaSummaryScreen1' ),
      'playAreaSummaryScreen2and4': createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_summary_playAreaSummaryScreen2and4' ),
      'playAreaSummaryScreen3': createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_summary_playAreaSummaryScreen3' ),
      'controlAreaSummary': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.controlAreaSummary'].property,
      'interactionHint': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.interactionHint'].property,
      'interactionHintWithTransportProteins': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.interactionHintWithTransportProteins'].property
    },
    'observationWindow':     {
      'membrane':       {
        'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.observationWindow.membrane.accessibleName'].property
      }
    },
    'soluteControls':     {
      'accessibleHeading': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.soluteControls.accessibleHeading'].property
    },
    'eraseSolutesButton':     {
      'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.eraseSolutesButton.accessibleName'].property,
      'accessibleContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.eraseSolutesButton.accessibleContextResponse'].property
    },
    'transportProteinPanel':     {
      'transportProteins': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.transportProteins'].property,
      'accessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.accessibleHelpText'].property,
      'ligandGatedChannelPanel':       {
        'sodiumIonNaPlusLigandGated': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGated'].property,
        'potassiumIonKPlusLigandGated': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGated'].property
      },
      'leakageChannelPanel':       {
        'sodiumIonNaPlusLeakage': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakage'].property,
        'potassiumIonKPlusLeakage': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakage'].property
      },
      'voltageGatedChannelPanel':       {
        'sodiumIonNaPlusVoltageGated': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGated'].property,
        'potassiumIonKPlusVoltageGated': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGated'].property,
        'membranePotential':         {
          'radioButtonGroup':           {
            'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleName'].property,
            'accessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpText'].property,
            'negative70RadioButton':             {
              'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleName'].property
            },
            'negative50RadioButton':             {
              'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleName'].property
            },
            'positive30RadioButton':             {
              'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleName'].property
            }
          }
        },
        'signsCheckbox':         {
          'accessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.accessibleHelpText'].property,
          'checkedContextResponseNegative70': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponseNegative70'].property,
          'checkedContextResponseNegative50': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponseNegative50'].property,
          'checkedContextResponsePositive30': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.checkedContextResponsePositive30'].property,
          'uncheckedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.uncheckedContextResponse'].property
        }
      },
      'activeTransportProteinPanel':       {
        'sodiumPotassiumPump': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPump'].property,
        'sodiumGlucoseCotransporter': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporter'].property
      },
      'toolAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.toolAccessibleHelpText'].property
    },
    'ligandNode':     {
      'starLigand': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.starLigand'].property,
      'triangleLigand': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.triangleLigand'].property,
      'accessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.accessibleHelpText'].property,
      'releasedLigand': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.releasedLigand'].property,
      'grabbedLigand': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.grabbedLigand'].property,
      'ligandReleasedOffMembranePattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.ligandReleasedOffMembranePattern'].property,
      'ligandReleasedOnProteinPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.ligandReleasedOnProteinPattern'].property,
      'ligandReleasedOnBusyOrIncompatibleProteinPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.ligandReleasedOnBusyOrIncompatibleProteinPattern'].property,
      'ligandMovedToSlotPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.ligandMovedToSlotPattern'].property,
      'ligandUnboundAlert': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.ligandUnboundAlert'].property,
      'thereIsNoProteinAtThisSlot': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.thereIsNoProteinAtThisSlot'].property,
      'thereIsProteinAtThisSlotPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.thereIsProteinAtThisSlotPattern'].property,
      'moveCancelledPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.moveCancelledPattern'].property,
      'cannotInteractWhileLigandIsBoundPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandNode.cannotInteractWhileLigandIsBoundPattern'].property
    }
  },
  'transportProteinBriefName': {
    format: (args: { type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('transportProteinBriefName')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'transportProteinBriefName', args )
  },
  'soluteControlsAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteControlsAccessibleHelpText'].property,
  'outsideMembraneSpinnerAccessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/outsideMembraneSpinnerAccessibleName'].property,
  'outsideMembraneSpinnerHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/outsideMembraneSpinnerHelpText'].property,
  'insideMembraneSpinnerAccessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/insideMembraneSpinnerAccessibleName'].property,
  'insideMembraneSpinnerHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/insideMembraneSpinnerHelpText'].property,
  'soluteSpinnerRoleDescription': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteSpinnerRoleDescription'].property,
  'solute': {
    format: (args: { soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('solute')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'solute', args )
  },
  'soluteSpinnerObjectResponsePattern': {
    format: (args: { amount: 'none' | 'one' | 'few' | 'some' | 'many' | TReadOnlyProperty<'none' | 'one' | 'few' | 'some' | 'many'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('soluteSpinnerObjectResponsePattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { amount: 'none' | 'one' | 'few' | 'some' | 'many' | TReadOnlyProperty<'none' | 'one' | 'few' | 'some' | 'many'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'soluteSpinnerObjectResponsePattern', args )
  },
  'soluteSpinnerContextResponsePattern': {
    format: (args: { addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | 'more' | 'less' | TReadOnlyProperty<'same' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('soluteSpinnerContextResponsePattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | 'more' | 'less' | TReadOnlyProperty<'same' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'soluteSpinnerContextResponsePattern', args )
  },
  'soluteBarChartsDescriptionParagraph': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteBarChartsDescriptionParagraph'].property,
  'arrowSizeDescription': {
    format: (args: { size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('arrowSizeDescription')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'arrowSizeDescription', args )
  },
  'arrowDirectionDescription': {
    format: (args: { direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('arrowDirectionDescription')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'arrowDirectionDescription', args )
  },
  'barSizeDescription': {
    format: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('barSizeDescription')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'barSizeDescription', args )
  },
  'barChartPattern': {
    format: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'>, direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'>, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('barChartPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'>, direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'>, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'barChartPattern', args )
  },
  'currentDetailsActivityLevel': {
    format: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsActivityLevel')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'currentDetailsActivityLevel', args )
  },
  'currentDetails': {
    format: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetails')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'currentDetails', args )
  },
  'currentDetailsSoluteTypesOnOutside': {
    format: (args: { outsideSoluteCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsSoluteTypesOnOutside')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { outsideSoluteCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'currentDetailsSoluteTypesOnOutside', args )
  },
  'currentDetailsSoluteTypesOnInside': {
    format: (args: { insideSoluteCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsSoluteTypesOnInside')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { insideSoluteCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'currentDetailsSoluteTypesOnInside', args )
  },
  'currentDetailsTransportProteins': {
    format: (args: { transportProteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsTransportProteins')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { transportProteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'currentDetailsTransportProteins', args )
  },
  'ligandsOnOutsideOnly': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandsOnOutsideOnly'].property,
  'currentDetailsMembranePotential': {
    format: (args: { membranePotential: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsMembranePotential')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { membranePotential: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'currentDetailsMembranePotential', args )
  },
  'releasedBackInToolbox': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/releasedBackInToolbox'].property,
  'selectedTransportProteinInSlot': {
    format: (args: { channelName: IntentionalAny, slotCount: IntentionalAny, slotIndex: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('selectedTransportProteinInSlot')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { channelName: IntentionalAny, slotCount: IntentionalAny, slotIndex: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'selectedTransportProteinInSlot', args )
  },
  'canceledBackInMembrane': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/canceledBackInMembrane'].property,
  'grabbedProteinResponsePattern': {
    format: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedProteinResponsePattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'grabbedProteinResponsePattern', args )
  },
  'grabbedProteinResponseWithHintPattern': {
    format: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedProteinResponseWithHintPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'grabbedProteinResponseWithHintPattern', args )
  },
  'ligandToggleButtonAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandToggleButtonAccessibleHelpText'].property,
  'ligandToggleButtonAddedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandToggleButtonAddedContextResponse'].property,
  'ligandToggleButtonRemovedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandToggleButtonRemovedContextResponse'].property,
  'grabbedLigandResponsePattern': {
    format: (args: { proteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedLigandResponsePattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { proteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'grabbedLigandResponsePattern', args )
  },
  'grabbedLigandResponseWithHintPattern': {
    format: (args: { proteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedLigandResponseWithHintPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { proteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'grabbedLigandResponseWithHintPattern', args )
  },
  'grabbedLigandResponseWithEmptyMembraneHintPattern': {
    format: (args: { proteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedLigandResponseWithEmptyMembraneHintPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { proteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'grabbedLigandResponseWithEmptyMembraneHintPattern', args )
  },
  'ligandMovedAboveLigandGatedChannelPattern': {
    format: (args: { index: IntentionalAny, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('ligandMovedAboveLigandGatedChannelPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { index: IntentionalAny, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'ligandMovedAboveLigandGatedChannelPattern', args )
  },
  'ligandMovedAboveLeakageChannelPattern': {
    format: (args: { index: IntentionalAny, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('ligandMovedAboveLeakageChannelPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { index: IntentionalAny, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'ligandMovedAboveLeakageChannelPattern', args )
  },
  'ligandMovedAboveOtherChannelPattern': {
    format: (args: { index: IntentionalAny, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('ligandMovedAboveOtherChannelPattern')!.value!,
      MembraneTransportStrings.fluentBundleProperty.value,
      args
    ),
    createProperty: (args: { index: IntentionalAny, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'ligandMovedAboveOtherChannelPattern', args )
    },
    'soluteControlsAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.soluteControlsAccessibleHelpText'].property,
    'outsideMembraneSpinnerAccessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.outsideMembraneSpinnerAccessibleName'].property,
    'outsideMembraneSpinnerHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.outsideMembraneSpinnerHelpText'].property,
    'insideMembraneSpinnerAccessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.insideMembraneSpinnerAccessibleName'].property,
    'insideMembraneSpinnerHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.insideMembraneSpinnerHelpText'].property,
    'soluteSpinnerRoleDescription': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.soluteSpinnerRoleDescription'].property,
    'solute': {
      format: (args: { soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_solute')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_solute', args )
    },
    'soluteSpinnerObjectResponsePattern': {
      format: (args: { amount: 'none' | 'one' | 'few' | 'some' | 'many' | TReadOnlyProperty<'none' | 'one' | 'few' | 'some' | 'many'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_soluteSpinnerObjectResponsePattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { amount: 'none' | 'one' | 'few' | 'some' | 'many' | TReadOnlyProperty<'none' | 'one' | 'few' | 'some' | 'many'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_soluteSpinnerObjectResponsePattern', args )
    },
    'soluteSpinnerContextResponsePattern': {
      format: (args: { addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | 'more' | 'less' | TReadOnlyProperty<'same' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_soluteSpinnerContextResponsePattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { addedOrRemoved: 'added' | 'removed' | TReadOnlyProperty<'added' | 'removed'>, amount: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, differenceSize: 'aLittle' | 'aLot' | TReadOnlyProperty<'aLittle' | 'aLot'>, directionality: 'insideThanOutside' | 'outsideThanInside' | TReadOnlyProperty<'insideThanOutside' | 'outsideThanInside'>, moreOrLessOrSame: 'same' | 'more' | 'less' | TReadOnlyProperty<'same' | 'more' | 'less'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_soluteSpinnerContextResponsePattern', args )
    },
    'soluteBarChartsDescriptionParagraph': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.soluteBarChartsDescriptionParagraph'].property,
    'arrowSizeDescription': {
      format: (args: { size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_arrowSizeDescription')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_arrowSizeDescription', args )
    },
    'arrowDirectionDescription': {
      format: (args: { direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_arrowDirectionDescription')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_arrowDirectionDescription', args )
    },
    'barSizeDescription': {
      format: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_barSizeDescription')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_barSizeDescription', args )
    },
    'barChartPattern': {
      format: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'>, direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'>, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_barChartPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { amount: 'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess' | TReadOnlyProperty<'aLittleMore' | 'aLotMore' | 'aLittleLess' | 'aLotLess'>, direction: 'upward' | 'downward' | TReadOnlyProperty<'upward' | 'downward'>, size: 'small' | 'medium' | 'large' | TReadOnlyProperty<'small' | 'medium' | 'large'>, soluteType: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | TReadOnlyProperty<'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_barChartPattern', args )
    },
    'currentDetailsActivityLevel': {
      format: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_currentDetailsActivityLevel')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_currentDetailsActivityLevel', args )
    },
    'currentDetails': {
      format: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_currentDetails')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { activityLevel: 'calm' | 'active' | 'activeAndPaused' | TReadOnlyProperty<'calm' | 'active' | 'activeAndPaused'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_currentDetails', args )
    },
    'currentDetailsSoluteTypesOnOutside': {
      format: (args: { outsideSoluteCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_currentDetailsSoluteTypesOnOutside')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { outsideSoluteCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_currentDetailsSoluteTypesOnOutside', args )
    },
    'currentDetailsSoluteTypesOnInside': {
      format: (args: { insideSoluteCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_currentDetailsSoluteTypesOnInside')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { insideSoluteCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_currentDetailsSoluteTypesOnInside', args )
    },
    'currentDetailsTransportProteins': {
      format: (args: { transportProteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_currentDetailsTransportProteins')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { transportProteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_currentDetailsTransportProteins', args )
    },
    'ligandsOnOutsideOnly': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandsOnOutsideOnly'].property,
    'currentDetailsMembranePotential': {
      format: (args: { membranePotential: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_currentDetailsMembranePotential')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { membranePotential: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_currentDetailsMembranePotential', args )
    },
    'releasedBackInToolbox': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.releasedBackInToolbox'].property,
    'selectedTransportProteinInSlot': {
      format: (args: { channelName: IntentionalAny, slotCount: IntentionalAny, slotIndex: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_selectedTransportProteinInSlot')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { channelName: IntentionalAny, slotCount: IntentionalAny, slotIndex: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_selectedTransportProteinInSlot', args )
    },
    'canceledBackInMembrane': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.canceledBackInMembrane'].property,
    'grabbedProteinResponsePattern': {
      format: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_grabbedProteinResponsePattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_grabbedProteinResponsePattern', args )
    },
    'grabbedProteinResponseWithHintPattern': {
      format: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_grabbedProteinResponseWithHintPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_grabbedProteinResponseWithHintPattern', args )
    },
    'ligandToggleButtonAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandToggleButtonAccessibleHelpText'].property,
    'ligandToggleButtonAddedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandToggleButtonAddedContextResponse'].property,
    'ligandToggleButtonRemovedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.ligandToggleButtonRemovedContextResponse'].property,
    'grabbedLigandResponsePattern': {
      format: (args: { proteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_grabbedLigandResponsePattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { proteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_grabbedLigandResponsePattern', args )
    },
    'grabbedLigandResponseWithHintPattern': {
      format: (args: { proteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_grabbedLigandResponseWithHintPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { proteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_grabbedLigandResponseWithHintPattern', args )
    },
    'grabbedLigandResponseWithEmptyMembraneHintPattern': {
      format: (args: { proteinCount: IntentionalAny }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_grabbedLigandResponseWithEmptyMembraneHintPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { proteinCount: IntentionalAny }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_grabbedLigandResponseWithEmptyMembraneHintPattern', args )
    },
    'transportProteinBriefName': {
      format: (args: { type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_transportProteinBriefName')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_transportProteinBriefName', args )
    },
    'ligandMovedAboveLigandGatedChannelPattern': {
      format: (args: { index: IntentionalAny, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_ligandMovedAboveLigandGatedChannelPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { index: IntentionalAny, ligandType: 'triangleLigand' | 'starLigand' | TReadOnlyProperty<'triangleLigand' | 'starLigand'>, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_ligandMovedAboveLigandGatedChannelPattern', args )
    },
    'ligandMovedAboveLeakageChannelPattern': {
      format: (args: { index: IntentionalAny, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_ligandMovedAboveLeakageChannelPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { index: IntentionalAny, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_ligandMovedAboveLeakageChannelPattern', args )
    },
    'ligandMovedAboveOtherChannelPattern': {
      format: (args: { index: IntentionalAny, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
        MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_ligandMovedAboveOtherChannelPattern')!.value!,
        MembraneTransportStrings.fluentBundleProperty.value,
        args
      ),
      createProperty: (args: { index: IntentionalAny, openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, transportProteinCount: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_ligandMovedAboveOtherChannelPattern', args )
    },
    'transportProtein':     {
      'accessibleNamePattern': {
        format: (args: { openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, proteinCount: IntentionalAny, proteinIndex: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => FluentUtils.formatMessageWithBundle(
          MembraneTransportStrings.fluentBundleProperty.value.getMessage('a11y_transportProtein_accessibleNamePattern')!.value!,
          MembraneTransportStrings.fluentBundleProperty.value,
          args
        ),
        createProperty: (args: { openOrClosed: 'open' | 'closed' | TReadOnlyProperty<'open' | 'closed'>, proteinCount: IntentionalAny, proteinIndex: IntentionalAny, type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter' | TReadOnlyProperty<'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' | 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumPotassiumPump' | 'sodiumGlucoseCotransporter'> }) => createFluentMessageProperty( MembraneTransportStrings.fluentBundleProperty, 'a11y_transportProtein_accessibleNamePattern', args )
      }
    }
  }
};

membraneTransport.register( 'MembraneTransportStrings', MembraneTransportStrings );

export default MembraneTransportStrings;
