// Copyright 2024-2025, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import membraneChannels from './membraneChannels.js';

type StringsType = {
  'membrane-channels': {
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
  'membraneProteinsStringProperty': LocalizedStringProperty;
  'membranePotentialLabelsStringProperty': LocalizedStringProperty;
  'voltageGatedChannelsStringProperty': LocalizedStringProperty;
  'ligandGatedChannelsStringProperty': LocalizedStringProperty;
  'activeTransportersStringProperty': LocalizedStringProperty;
  'leakageChannelsStringProperty': LocalizedStringProperty;
  'sodiumIonNaPlusStringProperty': LocalizedStringProperty;
  'potassiumIonKPlusStringProperty': LocalizedStringProperty;
  'NaPlusKPlusPumpStringProperty': LocalizedStringProperty;
  'glucoseSodiumCoTransporterStringProperty': LocalizedStringProperty;
  'membraneVoltagePotentialmVStringProperty': LocalizedStringProperty;
  'addLigandsStringProperty': LocalizedStringProperty;
  'removeLigandsStringProperty': LocalizedStringProperty;
  'animateLipidsStringProperty': LocalizedStringProperty;
  'animateLipidsDescriptionStringProperty': LocalizedStringProperty;
  'a11y': {
    'accordionBoxGroup': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'ligandGatedAccordionBox': {
        'sodiumIonNaPlusLigandGatedStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusLigandGatedStringProperty': LocalizedStringProperty;
      };
      'leakageChannelsAccordionBox': {
        'sodiumIonNaPlusLeakageStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusLeakageStringProperty': LocalizedStringProperty;
      };
      'voltageGatedChannelsAccordionBox': {
        'sodiumIonNaPlusVoltageGatedStringProperty': LocalizedStringProperty;
        'potassiumIonKPlusVoltageGatedStringProperty': LocalizedStringProperty;
      };
      'activeTransportersAccordionBox': {
        'sodiumPotassiumPumpStringProperty': LocalizedStringProperty;
        'sodiumGlucoseCotransporterStringProperty': LocalizedStringProperty;
      };
      'toolAccessibleHelpTextStringProperty': LocalizedStringProperty;
    }
  }
};

const MembraneChannelsStrings = getStringModule( 'MEMBRANE_CHANNELS' ) as StringsType;

membraneChannels.register( 'MembraneChannelsStrings', MembraneChannelsStrings );

export default MembraneChannelsStrings;
