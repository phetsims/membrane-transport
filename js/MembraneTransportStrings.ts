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
};

const MembraneTransportStrings = getStringModule( 'MEMBRANE_TRANSPORT' ) as StringsType;

membraneTransport.register( 'MembraneTransportStrings', MembraneTransportStrings );

export default MembraneTransportStrings;
