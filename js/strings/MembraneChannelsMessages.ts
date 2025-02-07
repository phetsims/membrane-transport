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
  'soluteBarChartsDescriptionParagraphMessageProperty': TReadOnlyProperty<string>;
  'barChartPatternMessageProperty': LocalizedMessageProperty;
};

const MembraneChannelsMessages = getFluentModule( {
  "en": "soluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.\r\n\r\noutsideMembraneSpinnerAccessibleName = Outside Membrane\r\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\r\n\r\ninsideMembraneSpinnerAccessibleName = Inside Membrane\r\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\r\n\r\nsoluteSpinnerRoleDescription = solute amount adjuster\r\n\r\nsolute = { $soluteType ->\r\n  [oxygen] oxygen molecules\r\n  [carbonDioxide] carbon dioxide molecules\r\n  [sodiumIon] sodium ions\r\n  [potassiumIon] potassium ions\r\n  [glucose] glucose molecules\r\n  *[atp] ATP molecules\r\n}\r\n\r\nsoluteSpinnerObjectResponsePattern = { $amount ->\r\n  [none] no\r\n  [one] one\r\n  [few] a few\r\n  [some] some\r\n  *[many] many\r\n} { solute }\r\n\r\nsoluteSpinnerContextResponsePattern =\r\n    { $amount ->\r\n        [aLittle] a little\r\n       *[aLot] a lot\r\n    } { $addedOrRemoved ->\r\n        [added] added\r\n       *[removed] removed\r\n    }. Now\r\n    { $differenceSize ->\r\n        [aLittle] a little\r\n       *[aLot] a lot\r\n    }\r\n    { $moreOrLess ->\r\n        [more] more\r\n       *[less] less\r\n    }\r\n    { solute }\r\n    { $directionality ->\r\n        [insideThanOutside] inside than outside\r\n       *[outsideThanInside] outside than inside\r\n    }.\r\n\r\nsoluteBarChartsDescriptionParagraph = A barchart for each solute captures changing details. If needed, pause sim to freeze details for reading.\r\n\r\nbarChartPattern = { $amount ->\r\n  [aLittle] A little\r\n  *[aLot] A lot\r\n} more outside than inside; { $size ->\r\n  [small] small\r\n  [medium] medium\r\n  *[large] large\r\n} { $direction ->\r\n  [upward] upward\r\n  *[downward] downward\r\n} arrow indicates passage { $fromTo ->\r\n  [fromOutsideToInside] from outside to inside\r\n  *[fromInsideToOutside] from inside to outside\r\n}."
} ) as unknown as MembraneChannelsFluentType;

membraneChannels.register( 'MembraneChannelsMessages', MembraneChannelsMessages );

export default MembraneChannelsMessages;
