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
  'soluteSpinnerContextResponsePatternMessageProperty': LocalizedMessageProperty;
};

const MembraneChannelsMessages = getFluentModule( {
  "en": "soluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.\n\noutsideMembraneSpinnerAccessibleName = Outside Membrane\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\n\ninsideMembraneSpinnerAccessibleName = Inside Membrane\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\n\nsoluteSpinnerRoleDescription = solute amount adjuster\n\nsolute = { $soluteType ->\n  [oxygen] oxygen molecules\n  [carbonDioxide] carbon dioxide molecules\n  [sodiumIon] sodium ions\n  [potassiumIon] potassium ions\n  [glucose] glucose molecules\n  *[atp] ATP molecules\n}\n\nsoluteSpinnerObjectResponsePattern = { $amount ->\n  [none] no\n  [one] one\n  [few] a few\n  [some] some\n  *[many] many\n} { solute }\n\nsoluteSpinnerContextResponsePattern =\n    { $amount ->\n        [aLittle] a little\n       *[aLot] a lot\n    } { $addedOrRemoved ->\n        [added] added\n       *[removed] removed\n    }. Now\n    { $differenceSize ->\n        [aLittle] a little\n       *[aLot] a lot\n    }\n    { $moreOrLess ->\n        [more] more\n       *[less] less\n    }\n    { solute }\n    { $directionality ->\n        [insideThanOutside] inside than outside\n       *[outsideThanInside] outside than inside\n    }."
} ) as unknown as MembraneChannelsFluentType;

membraneChannels.register( 'MembraneChannelsMessages', MembraneChannelsMessages );

export default MembraneChannelsMessages;
