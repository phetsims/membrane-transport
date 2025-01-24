// Copyright 2025, University of Colorado Boulder
    
/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getFluentModule from '../../../chipper/js/browser/getFluentModule.js';
import membraneChannels from '../../js/membraneChannels.js';
import LocalizedMessageProperty from '../../../chipper/js/browser/LocalizedMessageProperty.js';
import type TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';

type MembraneChannelsFluentType = {
  'membraneChannelsMessageProperty': TReadOnlyProperty<string>;
  'soluteRadioButtonGroupHelpTextMessageProperty': TReadOnlyProperty<string>;
};

const MembraneChannelsMessages = getFluentModule( {
  "en": "membraneChannels = Membrane Channels\r\n\r\nsoluteRadioButtonGroupHelpText = Choose solute then add or remove ((to inside or outside of membrane))."
} ) as unknown as MembraneChannelsFluentType;

membraneChannels.register( 'MembraneChannelsMessages', MembraneChannelsMessages );

export default MembraneChannelsMessages;
