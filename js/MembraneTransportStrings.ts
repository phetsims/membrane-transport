// Copyright 2024-2025, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import type TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import PatternMessageProperty from '../../chipper/js/browser/PatternMessageProperty.js';
import type IntentionalAny from '../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from './membraneTransport.js';
import DerivedProperty from '../../axon/js/DerivedProperty.js';

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
      'playAreaSummaryVoltagePotentialStringProperty': LocalizedStringProperty;
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
          'accessibleHeadingStringProperty': LocalizedStringProperty;
          'radioButtonGroup': {
            'accessibleNameStringProperty': LocalizedStringProperty;
            'accessibleHelpTextStringProperty': LocalizedStringProperty;
            'negative70RadioButton': {
              'accessibleNameStringProperty': LocalizedStringProperty;
              'accessibleContextResponseStringProperty': LocalizedStringProperty;
            };
            'negative50RadioButton': {
              'accessibleNameStringProperty': LocalizedStringProperty;
              'accessibleContextResponseStringProperty': LocalizedStringProperty;
            };
            'positive30RadioButton': {
              'accessibleNameStringProperty': LocalizedStringProperty;
              'accessibleContextResponseStringProperty': LocalizedStringProperty;
            }
          }
        };
        'signsCheckbox': {
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
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
}

const MembraneTransportStrings = getStringModule( 'MEMBRANE_TRANSPORT' ) as StringsType;


// Interface for all strings, with special handling for parameterized patterns
export const membrane_transportStringsNewInterface = {
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
      'playAreaSummaryVoltagePotential': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryVoltagePotential'].property,
      'playAreaSummaryBarCharts': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryBarCharts'].property,
      'playAreaSummaryScreen1': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryScreen1'].property,
      'playAreaSummaryScreen2and4': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryScreen2and4'].property,
      'playAreaSummaryScreen3': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.summary.playAreaSummaryScreen3'].property,
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
          'accessibleHeading': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.accessibleHeading'].property,
          'radioButtonGroup':           {
            'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleName'].property,
            'accessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpText'].property,
            'negative70RadioButton':             {
              'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleName'].property,
              'accessibleContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleContextResponse'].property
            },
            'negative50RadioButton':             {
              'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleName'].property,
              'accessibleContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleContextResponse'].property
            },
            'positive30RadioButton':             {
              'accessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleName'].property,
              'accessibleContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleContextResponse'].property
            }
          }
        },
        'signsCheckbox':         {
          'accessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.accessibleHelpText'].property,
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
  'transportProteinBriefName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/transportProteinBriefName'].property,
  'soluteControlsAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteControlsAccessibleHelpText'].property,
  'outsideMembraneSpinnerAccessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/outsideMembraneSpinnerAccessibleName'].property,
  'outsideMembraneSpinnerHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/outsideMembraneSpinnerHelpText'].property,
  'insideMembraneSpinnerAccessibleName': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/insideMembraneSpinnerAccessibleName'].property,
  'insideMembraneSpinnerHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/insideMembraneSpinnerHelpText'].property,
  'soluteSpinnerRoleDescription': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteSpinnerRoleDescription'].property,
  'solute': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/solute'].property,
  'soluteSpinnerObjectResponsePattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteSpinnerObjectResponsePattern'].property,
  'soluteSpinnerContextResponsePattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteSpinnerContextResponsePattern'].property,
  'soluteBarChartsDescriptionParagraph': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/soluteBarChartsDescriptionParagraph'].property,
  'arrowSizeDescription': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/arrowSizeDescription'].property,
  'arrowDirectionDescription': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/arrowDirectionDescription'].property,
  'barSizeDescription': {
    format: (args: { amount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('barSizeDescription').value,
      args
    ),
    toProperty: (args: { amount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/barSizeDescription'].property,
      args
    )
  },
  'barChartPattern': {
    format: (args: { amount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('barChartPattern').value,
      args
    ),
    toProperty: (args: { amount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/barChartPattern'].property,
      args
    )
  },
  'currentDetailsActivityLevel': {
    format: (args: { activityLevel: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsActivityLevel').value,
      args
    ),
    toProperty: (args: { activityLevel: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/currentDetailsActivityLevel'].property,
      args
    )
  },
  'currentDetails': {
    format: (args: { activityLevel: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetails').value,
      args
    ),
    toProperty: (args: { activityLevel: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/currentDetails'].property,
      args
    )
  },
  'currentDetailsSoluteTypesOnOutside': {
    format: (args: { outsideSoluteCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsSoluteTypesOnOutside').value,
      args
    ),
    toProperty: (args: { outsideSoluteCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/currentDetailsSoluteTypesOnOutside'].property,
      args
    )
  },
  'currentDetailsSoluteTypesOnInside': {
    format: (args: { insideSoluteCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsSoluteTypesOnInside').value,
      args
    ),
    toProperty: (args: { insideSoluteCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/currentDetailsSoluteTypesOnInside'].property,
      args
    )
  },
  'currentDetailsTransportProteins': {
    format: (args: { transportProteinCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsTransportProteins').value,
      args
    ),
    toProperty: (args: { transportProteinCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/currentDetailsTransportProteins'].property,
      args
    )
  },
  'ligandsOnOutsideOnly': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandsOnOutsideOnly'].property,
  'currentDetailsMembranePotential': {
    format: (args: { membranePotential: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('currentDetailsMembranePotential').value,
      args
    ),
    toProperty: (args: { membranePotential: IntentionalAny }) => {

      const p = new DerivedProperty([MembraneTransportStrings.fluentBundleProperty], bundle =>{
        return bundle.getMessage('currentDetailsMembranePotential').value
      });

      p.bundleProperty = MembraneTransportStrings.fluentBundleProperty;

      return new PatternMessageProperty(
        p,
        args
      );
    }  },
  'releasedBackInToolbox': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/releasedBackInToolbox'].property,
  'selectedTransportProteinInSlot': {
    format: (args: { channelName: IntentionalAny, slotCount: IntentionalAny, slotIndex: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('selectedTransportProteinInSlot').value,
      args
    ),
    toProperty: (args: { channelName: IntentionalAny, slotCount: IntentionalAny, slotIndex: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/selectedTransportProteinInSlot'].property,
      args
    )
  },
  'canceledBackInMembrane': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/canceledBackInMembrane'].property,
  'grabbedProteinResponsePattern': {
    format: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedProteinResponsePattern').value,
      args
    ),
    toProperty: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/grabbedProteinResponsePattern'].property,
      args
    )
  },
  'grabbedProteinResponseWithHintPattern': {
    format: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedProteinResponseWithHintPattern').value,
      args
    ),
    toProperty: (args: { slotCount: IntentionalAny, slotIndex: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/grabbedProteinResponseWithHintPattern'].property,
      args
    )
  },
  'ligandToggleButtonAccessibleHelpText': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandToggleButtonAccessibleHelpText'].property,
  'ligandToggleButtonAddedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandToggleButtonAddedContextResponse'].property,
  'ligandToggleButtonRemovedContextResponse': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandToggleButtonRemovedContextResponse'].property,
  'grabbedLigandResponsePattern': {
    format: (args: { proteinCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedLigandResponsePattern').value,
      args
    ),
    toProperty: (args: { proteinCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/grabbedLigandResponsePattern'].property,
      args
    )
  },
  'grabbedLigandResponseWithHintPattern': {
    format: (args: { proteinCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedLigandResponseWithHintPattern').value,
      args
    ),
    toProperty: (args: { proteinCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/grabbedLigandResponseWithHintPattern'].property,
      args
    )
  },
  'grabbedLigandResponseWithEmptyMembraneHintPattern': {
    format: (args: { proteinCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('grabbedLigandResponseWithEmptyMembraneHintPattern').value,
      args
    ),
    toProperty: (args: { proteinCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/grabbedLigandResponseWithEmptyMembraneHintPattern'].property,
      args
    )
  },
  'ligandMovedAboveLigandGatedChannelPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandMovedAboveLigandGatedChannelPattern'].property,
  'ligandMovedAboveLeakageChannelPattern': {
    format: (args: { index: IntentionalAny, transportProteinCount: IntentionalAny }) => MembraneTransportStrings.fluentBundleProperty.value.formatPattern(
      MembraneTransportStrings.fluentBundleProperty.value.getMessage('ligandMovedAboveLeakageChannelPattern').value,
      args
    ),
    toProperty: (args: { index: IntentionalAny, transportProteinCount: IntentionalAny }) => new PatternMessageProperty(
      MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandMovedAboveLeakageChannelPattern'].property,
      args
    )
  },
  'ligandMovedAboveOtherChannelPattern': MembraneTransportStrings.localizedStringMap['MEMBRANE_TRANSPORT/ligandMovedAboveOtherChannelPattern'].property
};

membraneTransport.register( 'MembraneTransportStrings', MembraneTransportStrings );

export default MembraneTransportStrings;
