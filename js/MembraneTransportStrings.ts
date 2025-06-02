// Copyright 2024-2025, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
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
  'chargesStringProperty': LocalizedStringProperty;
  'addLigandsStringProperty': LocalizedStringProperty;
  'removeLigandsStringProperty': LocalizedStringProperty;
  'animateLipidsStringProperty': LocalizedStringProperty;
  'animateLipidsDescriptionStringProperty': LocalizedStringProperty;
  'absorbGlucoseStringProperty': LocalizedStringProperty;
  'absorbGlucoseDescriptionStringProperty': LocalizedStringProperty;
  'soluteConcentrationsStringProperty': LocalizedStringProperty;
  'preferencesDialog': {
    'audio': {
      'sounds': {
        'stereoSoundsStringProperty': LocalizedStringProperty;
        'stereoSoundsDescriptionStringProperty': LocalizedStringProperty;
      }
    }
  };
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
        'chargesCheckbox': {
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
    'soluteAccessibleNames': {
      'oxygenStringProperty': LocalizedStringProperty;
      'carbonDioxideStringProperty': LocalizedStringProperty;
      'sodiumIonStringProperty': LocalizedStringProperty;
      'potassiumIonStringProperty': LocalizedStringProperty;
      'glucoseStringProperty': LocalizedStringProperty;
      'atpStringProperty': LocalizedStringProperty;
    };
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
      'grabbedPatternStringProperty': LocalizedStringProperty;
    }
  }
};

const MembraneTransportStrings = getStringModule( 'MEMBRANE_TRANSPORT' ) as StringsType;

membraneTransport.register( 'MembraneTransportStrings', MembraneTransportStrings );

export default MembraneTransportStrings;
