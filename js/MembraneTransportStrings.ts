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
  'soluteNames': {
    'oxygenStringProperty': LocalizedStringProperty;
    'carbonDioxideStringProperty': LocalizedStringProperty;
    'sodiumIonStringProperty': LocalizedStringProperty;
    'potassiumIonStringProperty': LocalizedStringProperty;
    'glucoseStringProperty': LocalizedStringProperty;
    'atpStringProperty': LocalizedStringProperty;
  };
  'cellRegions': {
    'outsideStringProperty': LocalizedStringProperty;
    'insideStringProperty': LocalizedStringProperty;
  };
  'transportProteinPanel': {
    'voltageGatedChannelsStringProperty': LocalizedStringProperty;
    'ligandGatedChannelsStringProperty': LocalizedStringProperty;
    'activeTransportersStringProperty': LocalizedStringProperty;
    'leakageChannelsStringProperty': LocalizedStringProperty;
    'naPlusKPlusPumpStringProperty': LocalizedStringProperty;
    'sodiumGlucoseCotransporterStringProperty': LocalizedStringProperty;
    'membranePotentialMVStringProperty': LocalizedStringProperty;
    'chargesStringProperty': LocalizedStringProperty;
    'addLigandsStringProperty': LocalizedStringProperty;
    'removeLigandsStringProperty': LocalizedStringProperty;
  };
  'preferencesDialog': {
    'animateLipids': {
      'labelStringProperty': LocalizedStringProperty;
      'descriptionStringProperty': LocalizedStringProperty;
    };
    'glucoseMetabolism': {
      'labelStringProperty': LocalizedStringProperty;
      'descriptionStringProperty': LocalizedStringProperty;
    };
    'audio': {
      'sounds': {
        'stereoCrossingSounds': {
          'labelStringProperty': LocalizedStringProperty;
          'descriptionStringProperty': LocalizedStringProperty;
        }
      }
    }
  };
  'barChart': {
    'soluteConcentrationsStringProperty': LocalizedStringProperty;
  };
  'settings': {
    'crossingHighlightsStringProperty': LocalizedStringProperty;
    'crossingSoundsStringProperty': LocalizedStringProperty;
  };
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
        'atpReactingStringProperty': LocalizedStringProperty;
        'membranePotentialStringProperty': LocalizedStringProperty;
        'glucoseMetabolismStringProperty': LocalizedStringProperty;
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
    'settings': {
      'crossingHighlightsCheckbox': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
        'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
        'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
      };
      'crossingSoundsCheckbox': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
        'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
        'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
      }
    };
    'transportProteinPanel': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'ligandGatedChannelPanel': {
        'sodiumIonNaPlusLigandGatedStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusLigandGatedStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'leakageChannelPanel': {
        'sodiumIonNaPlusLeakageStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusLeakageStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'voltageGatedChannelPanel': {
        'sodiumIonNaPlusVoltageGatedStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusVoltageGatedStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
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
          'accessibleContextResponseCheckedNegative70StringProperty': LocalizedStringProperty;
          'accessibleContextResponseCheckedNegative50StringProperty': LocalizedStringProperty;
          'accessibleContextResponseCheckedPositive30StringProperty': LocalizedStringProperty;
          'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
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
    'membranePotentialValueStringProperty': LocalizedStringProperty;
    'solutes': {
      'lowercaseNameStringProperty': LocalizedStringProperty;
      'uppercaseNameStringProperty': LocalizedStringProperty;
      'briefNameStringProperty': LocalizedStringProperty;
      'amountComparisonStringProperty': LocalizedStringProperty;
      'averageCrossingDirectionStringProperty': LocalizedStringProperty;
    };
    'solutesPanel': {
      'oxygenRadioButtonStringProperty': LocalizedStringProperty;
      'carbonDioxideRadioButtonStringProperty': LocalizedStringProperty;
      'sodiumIonRadioButtonStringProperty': LocalizedStringProperty;
      'potassiumIonRadioButtonStringProperty': LocalizedStringProperty;
      'glucoseRadioButtonStringProperty': LocalizedStringProperty;
      'atpRadioButtonStringProperty': LocalizedStringProperty;
    };
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
        'accessibleNameWithNoParticlesStringProperty': LocalizedStringProperty;
        'accessibleNameWithParticlesStringProperty': LocalizedStringProperty;
        'glucoseMetabolismStringProperty': LocalizedStringProperty;
        'accessibleNameWithParticlesAndGlucoseMetabolismStringProperty': LocalizedStringProperty;
        'accessibleNameWithNoParticlesAndGlucoseMetabolismStringProperty': LocalizedStringProperty;
        'crossingStringProperty': LocalizedStringProperty;
      }
    };
    'soluteCrossing': {
      'initialResponseStringProperty': LocalizedStringProperty;
      'subsequentResponseStringProperty': LocalizedStringProperty;
      'inBalanceResponseStringProperty': LocalizedStringProperty;
      'manyTypesResponseStringProperty': LocalizedStringProperty;
      'manyTypesInBalanceResponseStringProperty': LocalizedStringProperty;
    };
    'ligandToggleButton': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'addedAccessibleContextResponseStringProperty': LocalizedStringProperty;
      'removedAccessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'cellMembrane': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpTextNoSolutesProteinsHiddenStringProperty': LocalizedStringProperty;
      'accessibleHelpTextWithSolutesProteinsHiddenStringProperty': LocalizedStringProperty;
      'accessibleHelpTextNoSolutesOrProteinsStringProperty': LocalizedStringProperty;
      'accessibleHelpTextWithSolutesNoProteinsStringProperty': LocalizedStringProperty;
      'accessibleHelpTextWithProteinsNoSolutesStringProperty': LocalizedStringProperty;
      'accessibleHelpTextWithSolutesAndProteinsStringProperty': LocalizedStringProperty;
    };
    'transportProtein': {
      'grabbedResponseStringProperty': LocalizedStringProperty;
      'offMembraneResponseStringProperty': LocalizedStringProperty;
      'releasedReplacedResponseStringProperty': LocalizedStringProperty;
      'deletedResponseStringProperty': LocalizedStringProperty;
      'cancelledResponseStringProperty': LocalizedStringProperty;
      'proteinLocationStringProperty': LocalizedStringProperty;
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseOpenCloseStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
      'accessibleNameMovingStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseMovingStringProperty': LocalizedStringProperty;
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
