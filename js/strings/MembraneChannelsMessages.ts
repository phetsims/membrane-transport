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
  'soluteRadioButtonGroupHelpTextMessageProperty': TReadOnlyProperty<string>;
  'outsideMembraneSpinnerAccessibleNameMessageProperty': TReadOnlyProperty<string>;
  'outsideMembraneSpinnerHelpTextMessageProperty': TReadOnlyProperty<string>;
  'insideMembraneSpinnerAccessibleNameMessageProperty': TReadOnlyProperty<string>;
  'insideMembraneSpinnerHelpTextMessageProperty': TReadOnlyProperty<string>;
  'soluteSpinnerRoleDescriptionMessageProperty': TReadOnlyProperty<string>;
};

const MembraneChannelsMessages = getFluentModule( {
  "en": "soluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.\n\noutsideMembraneSpinnerAccessibleName = Outside Membrane\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\n\ninsideMembraneSpinnerAccessibleName = Inside Membrane\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\n\nsoluteSpinnerRoleDescription = solute amount adjuster"
} ) as unknown as MembraneChannelsFluentType;

membraneChannels.register( 'MembraneChannelsMessages', MembraneChannelsMessages );

export default MembraneChannelsMessages;
