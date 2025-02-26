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
  'playAreaSummaryScreen1MessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen2and4MessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen3MessageProperty': LocalizedMessageProperty;
  'controlAreaSummaryMessageProperty': TReadOnlyProperty<string>;
  'interactionHintMessageProperty': TReadOnlyProperty<string>;
  'interactionHintScreens234MessageProperty': TReadOnlyProperty<string>;
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
  'currentDetailsMessageProperty': LocalizedMessageProperty;
};

const MembraneChannelsMessages = getFluentModule( {
  "en": "\n-playAreaSummaryIntro = An observation window zooms in on a cross-section of a cell’s membrane. The membrane consists of a wiggling phospholipid bilayer, a double-layered sheet, that separates fluids inside and outside of cell. Added solute particles are suspended in fluid and randomly move with Brownian motion.\n\n-playAreaSummarySolutes = You can choose from a list of solutes and add them to inside and outside.\n\n-playAreaSummaryProteins = Transport proteins can be added directly to membrane.\n\n-playAreaSummaryVoltagePotential = There are options to change membrane voltage potential and optionally hide visual charge labels.\n\n-playAreaSummaryBarcharts = Solute barcharts provide a comparative summary for amount of each solute inside and outside membrane.\n\n\n\nplayAreaSummaryScreen1 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryBarcharts}\n\nplayAreaSummaryScreen2and4 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryVoltagePotential } { -playAreaSummaryBarcharts }\n\nplayAreaSummaryScreen3 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryBarcharts }\n\ncontrolAreaSummary = There are options for how fast the action happens in the observation window, including a button to pause. Also, you can clear the solutes from both sides of the membrane or reset the sim.\n\ninteractionHint = Add or remove solute to inside or outside of membrane.\ninteractionHintScreens234 = Add or remove solutes to inside or outside of membrane, and play with transport channels.\n\n\n\n\nsoluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.\n\noutsideMembraneSpinnerAccessibleName = Outside Membrane\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\n\ninsideMembraneSpinnerAccessibleName = Inside Membrane\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\n\nsoluteSpinnerRoleDescription = solute amount adjuster\n\nsolute = { $soluteType ->\n  [oxygen] oxygen molecules\n  [carbonDioxide] carbon dioxide molecules\n  [sodiumIon] sodium ions\n  [potassiumIon] potassium ions\n  [glucose] glucose molecules\n  *[atp] ATP molecules\n}\n\nsoluteSpinnerObjectResponsePattern = { $amount ->\n  [none] no\n  [one] one\n  [few] a few\n  [some] some\n  *[many] many\n} { solute }\n\nsoluteSpinnerContextResponsePattern =\n    { $amount ->\n        [aLittle] a little\n       *[aLot] a lot\n    } { $addedOrRemoved ->\n        [added] added\n       *[removed] removed\n    }. Now\n    { $differenceSize ->\n        [aLittle] a little\n       *[aLot] a lot\n    }\n    { $moreOrLess ->\n        [more] more\n       *[less] less\n    }\n    { solute }\n    { $directionality ->\n        [insideThanOutside] inside than outside\n       *[outsideThanInside] outside than inside\n    }.\n\nsoluteBarChartsDescriptionParagraph = A barchart for each solute captures changing details. If needed, pause sim to freeze details for reading.\n\nbarChartPattern = { $amount ->\n  [aLittleMore] A little more\n  [aLotMore] A lot more\n  [aLittleLess] A little less\n  *[aLotLess] A lot less\n} outside than inside; { $size ->\n  [small] small\n  [medium] medium\n  *[large] large\n} { $direction ->\n  [upward] upward from outside to inside\n  *[downward] downward from inside to outside\n}.\n\ncurrentDetails = Right now, membrane has { $outsideSoluteCount } solute types outside; { $insideSoluteCount } solute types inside; { $channelCount } transport channels.\n"
} ) as unknown as MembraneChannelsFluentType;

membraneChannels.register( 'MembraneChannelsMessages', MembraneChannelsMessages );

export default MembraneChannelsMessages;
