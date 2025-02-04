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
  'soluteMessageProperty': LocalizedMessageProperty;
  'soluteSpinnerObjectResponsePatternMessageProperty': LocalizedMessageProperty;
};

const MembraneChannelsMessages = getFluentModule( {
  "en": "soluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.\r\n\r\noutsideMembraneSpinnerAccessibleName = Outside Membrane\r\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\r\n\r\ninsideMembraneSpinnerAccessibleName = Inside Membrane\r\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\r\n\r\nsoluteSpinnerRoleDescription = solute amount adjuster\r\n\r\nsolute = { $soluteType ->\r\n  [oxygen] oxygen\r\n  [carbonDioxide] carbon dioxide\r\n  [sodiumIon] sodium ion\r\n  [potassiumIon] potassium ion\r\n  [glucose] glucose\r\n  *[atp] ATP\r\n}\r\n\r\nsoluteSpinnerObjectResponsePattern = { $amount ->\r\n  [none] no\r\n  [one] one\r\n  [few] a few\r\n  [some] some\r\n  *[many] many\r\n} { solute } molecules"
} ) as unknown as MembraneChannelsFluentType;

membraneChannels.register( 'MembraneChannelsMessages', MembraneChannelsMessages );

export default MembraneChannelsMessages;
