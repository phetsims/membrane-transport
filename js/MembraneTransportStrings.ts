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
  'voltageGatedChannelsStringProperty': LocalizedStringProperty;
  'ligandGatedChannelsStringProperty': LocalizedStringProperty;
  'activeTransportersStringProperty': LocalizedStringProperty;
  'leakageChannelsStringProperty': LocalizedStringProperty;
  'NaPlusKPlusPumpStringProperty': LocalizedStringProperty;
  'sodiumGlucoseCotransporterStringProperty': LocalizedStringProperty;
  'membranePotential_mVStringProperty': LocalizedStringProperty;
  'chargesStringProperty': LocalizedStringProperty;
  'addLigandsStringProperty': LocalizedStringProperty;
  'removeLigandsStringProperty': LocalizedStringProperty;
  'animateLipidsStringProperty': LocalizedStringProperty;
  'animateLipidsDescriptionStringProperty': LocalizedStringProperty;
  'glucoseDrainStringProperty': LocalizedStringProperty;
  'glucoseDrainDescriptionStringProperty': LocalizedStringProperty;
  'soluteConcentrationsStringProperty': LocalizedStringProperty;
  'highlightCrossingStringProperty': LocalizedStringProperty;
  'crossingSoundsStringProperty': LocalizedStringProperty;
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
      'ligandReleasedOffMembranePatternStringProperty': LocalizedStringProperty;
      'ligandReleasedOnProteinPatternStringProperty': LocalizedStringProperty;
      'ligandReleasedOnBusyOrIncompatibleProteinPatternStringProperty': LocalizedStringProperty;
      'ligandUnboundAlertStringProperty': LocalizedStringProperty;
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
    'outsideMembraneSpinnerAccessibleNamePatternStringProperty': LocalizedStringProperty;
    'outsideMembraneSpinnerHelpTextStringProperty': LocalizedStringProperty;
    'soluteSpinnerVoicingHintResponseStringProperty': LocalizedStringProperty;
    'insideMembraneSpinnerAccessibleNamePatternStringProperty': LocalizedStringProperty;
    'insideMembraneSpinnerHelpTextStringProperty': LocalizedStringProperty;
    'soluteSpinnerRoleDescriptionStringProperty': LocalizedStringProperty;
    'soluteStringProperty': LocalizedStringProperty;
    'soluteCapitalizedStringProperty': LocalizedStringProperty;
    'soluteSpinnerObjectResponsePatternStringProperty': LocalizedStringProperty;
    'soluteSpinnerContextResponsePatternStringProperty': LocalizedStringProperty;
    'soluteBarChartsDescriptionParagraphStringProperty': LocalizedStringProperty;
    'arrowSizeDescriptionStringProperty': LocalizedStringProperty;
    'arrowDirectionDescriptionStringProperty': LocalizedStringProperty;
    'barSizeDescriptionStringProperty': LocalizedStringProperty;
    'barChartPatternStringProperty': LocalizedStringProperty;
    'currentDetailsLeadingParagraphStringProperty': LocalizedStringProperty;
    'currentDetailsNoAddedSolutesStringProperty': LocalizedStringProperty;
    'currentDetailsSoluteTypesOnOutsideStringProperty': LocalizedStringProperty;
    'currentDetailsSoluteTypesOnInsideStringProperty': LocalizedStringProperty;
    'currentDetailsTransportProteinsStringProperty': LocalizedStringProperty;
    'currentDetailsLigandsStringProperty': LocalizedStringProperty;
    'membranePotentialValueStringProperty': LocalizedStringProperty;
    'currentDetailsMembranePotentialStringProperty': LocalizedStringProperty;
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
      'grabbedStringProperty': LocalizedStringProperty;
    }
  }
};

const MembraneTransportStrings = getStringModule( 'MEMBRANE_TRANSPORT' ) as StringsType;

membraneTransport.register( 'MembraneTransportStrings', MembraneTransportStrings );

export default MembraneTransportStrings;
