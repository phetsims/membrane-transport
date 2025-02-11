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
  'oxygenStringProperty': LocalizedStringProperty;
  'carbonDioxideStringProperty': LocalizedStringProperty;
  'sodiumIonStringProperty': LocalizedStringProperty;
  'potassiumIonStringProperty': LocalizedStringProperty;
  'glucoseStringProperty': LocalizedStringProperty;
  'atpStringProperty': LocalizedStringProperty;
  'outsideStringProperty': LocalizedStringProperty;
  'insideStringProperty': LocalizedStringProperty;
  'solutesStringProperty': LocalizedStringProperty;
  'membraneProteinsStringProperty': LocalizedStringProperty;
  'membranePotentialLabelsStringProperty': LocalizedStringProperty;
  'membraneVoltagePotentialmVStringProperty': LocalizedStringProperty;
  'animateLipidsStringProperty': LocalizedStringProperty;
  'animateLipidsDescriptionStringProperty': LocalizedStringProperty;
  'addLigandsStringProperty': LocalizedStringProperty;
  'removeLigandsStringProperty': LocalizedStringProperty;
};

const MembraneChannelsStrings = getStringModule( 'MEMBRANE_CHANNELS' ) as StringsType;

membraneChannels.register( 'MembraneChannelsStrings', MembraneChannelsStrings );

export default MembraneChannelsStrings;
