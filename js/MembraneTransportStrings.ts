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
  'preferencesDialog': {
    'audio': {
      'sounds': {
        'stereoSoundsStringProperty': LocalizedStringProperty;
        'stereoSoundsDescriptionStringProperty': LocalizedStringProperty;
      }
    }
  };
  'soluteConcentrationsStringProperty': LocalizedStringProperty;
  'crossingHighlightsStringProperty': LocalizedStringProperty;
  'crossingSoundsStringProperty': LocalizedStringProperty;
  'a11y': {
    'simpleDiffusionScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
    };
    'facilitatedDiffusionScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
    };
    'activeTransportScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
    };
    'playgroundScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
    };
    'screenSummary': {
      'playArea': {
        'introStringProperty': LocalizedStringProperty;
        'proteinsStringProperty': LocalizedStringProperty;
        'potentialStringProperty': LocalizedStringProperty;
        'barChartsStringProperty': LocalizedStringProperty;
        'screen1StringProperty': LocalizedStringProperty;
        'screen2and4StringProperty': LocalizedStringProperty;
        'screen3StringProperty': LocalizedStringProperty;
      };
      'controlAreaStringProperty': LocalizedStringProperty;
      'currentDetails': {
        'leadingParagraphStringProperty': LocalizedStringProperty;
        'noAddedSolutesStringProperty': LocalizedStringProperty;
        'soluteTypesOnOutsideStringProperty': LocalizedStringProperty;
        'soluteTypesOnInsideStringProperty': LocalizedStringProperty;
        'transportProteinsStringProperty': LocalizedStringProperty;
        'ligandsStringProperty': LocalizedStringProperty;
        'membranePotentialValueStringProperty': LocalizedStringProperty;
        'membranePotentialStringProperty': LocalizedStringProperty;
      };
      'interactionHintStringProperty': LocalizedStringProperty;
      'interactionHintWithTransportProteinsStringProperty': LocalizedStringProperty;
    };
    'soluteControls': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'eraseSolutesButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'crossingHighlightsCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleCheckedContextResponseStringProperty': LocalizedStringProperty;
      'accessibleUncheckedContextResponseStringProperty': LocalizedStringProperty;
    };
    'crossingSoundsCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleCheckedContextResponseStringProperty': LocalizedStringProperty;
      'accessibleUncheckedContextResponseStringProperty': LocalizedStringProperty;
    };
    'transportProteinPanel': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
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
          'voicingHelpTextStringProperty': LocalizedStringProperty;
          'negative70AccessibleCheckedContextResponseStringProperty': LocalizedStringProperty;
          'negative50AccessibleCheckedContextResponseStringProperty': LocalizedStringProperty;
          'positive30AccessibleCheckedContextResponseStringProperty': LocalizedStringProperty;
          'accessibleUncheckedContextResponseStringProperty': LocalizedStringProperty;
        }
      };
      'activeTransportProteinPanel': {
        'sodiumPotassiumPumpStringProperty': LocalizedStringProperty;
        'sodiumGlucoseCotransporterStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'ligandNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'releasedResponseStringProperty': LocalizedStringProperty;
      'releasedOffMembraneResponseStringProperty': LocalizedStringProperty;
      'releasedOnProteinResponseStringProperty': LocalizedStringProperty;
      'releasedOnBusyOrIncompatibleProteinResponseStringProperty': LocalizedStringProperty;
      'unboundResponseStringProperty': LocalizedStringProperty;
      'movedAboveLigandGatedChannelResponseStringProperty': LocalizedStringProperty;
      'movedAboveLeakageChannelResponseStringProperty': LocalizedStringProperty;
      'movedAboveOtherChannelResponseStringProperty': LocalizedStringProperty;
      'grabbedResponseStringProperty': LocalizedStringProperty;
      'grabbedResponseWithHintStringProperty': LocalizedStringProperty;
      'grabbedResponseWithEmptyMembraneHintStringProperty': LocalizedStringProperty;
    };
    'soluteAccessibleNames': {
      'oxygenStringProperty': LocalizedStringProperty;
      'carbonDioxideStringProperty': LocalizedStringProperty;
      'sodiumIonStringProperty': LocalizedStringProperty;
      'potassiumIonStringProperty': LocalizedStringProperty;
      'glucoseStringProperty': LocalizedStringProperty;
      'atpStringProperty': LocalizedStringProperty;
    };
    'soluteStringProperty': LocalizedStringProperty;
    'soluteCapitalizedStringProperty': LocalizedStringProperty;
    'soluteControl': {
      'outside': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'inside': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'voicingHintResponseStringProperty': LocalizedStringProperty;
      'accessibleRoleDescriptionStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'soluteConcentrationsAccordionBox': {
      'descriptionContentStringProperty': LocalizedStringProperty;
      'barChart': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'comparisonStringProperty': LocalizedStringProperty;
        'crossingStringProperty': LocalizedStringProperty;
      }
    };
    'ligandToggleButton': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'addedAccessibleContextResponseStringProperty': LocalizedStringProperty;
      'removedAccessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'cellMembrane': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
    };
    'transportProtein': {
      'grabbedResponseStringProperty': LocalizedStringProperty;
      'offMembraneStringProperty': LocalizedStringProperty;
      'releasedReplacedResponseStringProperty': LocalizedStringProperty;
      'deletedResponseStringProperty': LocalizedStringProperty;
      'cancelledResponseStringProperty': LocalizedStringProperty;
      'objectResponseStringProperty': LocalizedStringProperty;
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleNameReversedStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseStringProperty': LocalizedStringProperty;
      'emptyStringProperty': LocalizedStringProperty;
      'briefNameStringProperty': LocalizedStringProperty;
    };
    'membranePotential': {
      'sodiumVoltageGatedOpenedResponseStringProperty': LocalizedStringProperty;
      'sodiumVoltageGatedClosedResponseStringProperty': LocalizedStringProperty;
      'potassiumVoltageGatedOpenedResponseStringProperty': LocalizedStringProperty;
      'potassiumVoltageGatedClosedResponseStringProperty': LocalizedStringProperty;
      'sodiumOpenedPotassiumOpenedResponseStringProperty': LocalizedStringProperty;
      'sodiumOpenedPotassiumClosedResponseStringProperty': LocalizedStringProperty;
      'sodiumClosedPotassiumOpenedResponseStringProperty': LocalizedStringProperty;
      'sodiumClosedPotassiumClosedResponseStringProperty': LocalizedStringProperty;
      'noChangeResponseStringProperty': LocalizedStringProperty;
    }
  }
};

const MembraneTransportStrings = getStringModule( 'MEMBRANE_TRANSPORT' ) as StringsType;

membraneTransport.register( 'MembraneTransportStrings', MembraneTransportStrings );

export default MembraneTransportStrings;
