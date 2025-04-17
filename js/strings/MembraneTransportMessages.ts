// Copyright 2025, University of Colorado Boulder
    
/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getFluentModule from '../../../chipper/js/browser/getFluentModule.js';
import membraneTransport from '../../js/membraneTransport.js';
import LocalizedMessageProperty from '../../../chipper/js/browser/LocalizedMessageProperty.js';
import type TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';

type MembraneTransportFluentType = {
  'playAreaSummaryScreen1MessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen2and4MessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen3MessageProperty': LocalizedMessageProperty;
  'controlAreaSummaryMessageProperty': TReadOnlyProperty<string>;
  'interactionHintMessageProperty': TReadOnlyProperty<string>;
  'interactionHintWithTransportProteinsMessageProperty': TReadOnlyProperty<string>;
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
  'arrowSizeDescriptionMessageProperty': LocalizedMessageProperty;
  'arrowDirectionDescriptionMessageProperty': LocalizedMessageProperty;
  'barSizeDescriptionMessageProperty': LocalizedMessageProperty;
  'barChartPatternMessageProperty': LocalizedMessageProperty;
  'currentDetailsActivityLevelMessageProperty': LocalizedMessageProperty;
  'currentDetailsMessageProperty': LocalizedMessageProperty;
  'currentDetailsSoluteTypesOnOutsideMessageProperty': LocalizedMessageProperty;
  'currentDetailsSoluteTypesOnInsideMessageProperty': LocalizedMessageProperty;
  'currentDetailsTransportProteinsMessageProperty': LocalizedMessageProperty;
  'currentDetailsLigandsMessageProperty': LocalizedMessageProperty;
  'currentDetailsMembranePotentialMessageProperty': LocalizedMessageProperty;
  'releasedBackInToolboxMessageProperty': TReadOnlyProperty<string>;
  'selectedTransportProteinInSlotMessageProperty': LocalizedMessageProperty;
  'canceledBackInMembraneMessageProperty': TReadOnlyProperty<string>;
  'grabbedProteinResponsePatternMessageProperty': LocalizedMessageProperty;
  'grabbedProteinResponseWithHintPatternMessageProperty': LocalizedMessageProperty;
  'ligandToggleButtonAccessibleHelpTextMessageProperty': TReadOnlyProperty<string>;
  'ligandToggleButtonAddedContextResponseMessageProperty': TReadOnlyProperty<string>;
  'ligandToggleButtonRemovedContextResponseMessageProperty': TReadOnlyProperty<string>;
};

const MembraneTransportMessages = getFluentModule( {
  "en": "\n-playAreaSummaryIntro = An observation window zooms in on a cross-section of a cell’s membrane. The membrane consists of a wiggling phospholipid bilayer, a double-layered sheet, that separates fluids inside and outside of cell. Added solute particles are suspended in fluid and randomly move with Brownian motion.\n\n-playAreaSummarySolutes = You can choose from a list of solutes and add them to inside and outside.\n\n-playAreaSummaryProteins = Transport proteins can be added directly to membrane.\n\n-playAreaSummaryVoltagePotential = There are options to change membrane voltage potential and optionally hide visual charge labels.\n\n-playAreaSummaryBarCharts = Solute bar charts provide a comparative summary for amount of each solute inside and outside membrane.\n\n\n\nplayAreaSummaryScreen1 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryBarCharts}\n\nplayAreaSummaryScreen2and4 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryVoltagePotential } { -playAreaSummaryBarCharts }\n\nplayAreaSummaryScreen3 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryBarCharts }\n\ncontrolAreaSummary = There are options for how fast the action happens in the observation window, including a button to pause. Also, you can clear the solutes from both sides of the membrane or reset the sim.\n\ninteractionHint = Add or remove solute to inside or outside of membrane.\ninteractionHintWithTransportProteins = Add or remove solutes to inside or outside of membrane, and play with transport channels.\n\n\n\n\nsoluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.\n\noutsideMembraneSpinnerAccessibleName = Outside Membrane\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\n\ninsideMembraneSpinnerAccessibleName = Inside Membrane\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\n\nsoluteSpinnerRoleDescription = solute amount adjuster\n\nsolute = { $soluteType ->\n  [oxygen] oxygen molecules\n  [carbonDioxide] carbon dioxide molecules\n  [sodiumIon] sodium ions\n  [potassiumIon] potassium ions\n  [glucose] glucose molecules\n  *[atp] ATP molecules\n}\n\nsoluteSpinnerObjectResponsePattern = { $amount ->\n  [none] no\n  [one] one\n  [few] a few\n  [some] some\n  *[many] many\n} { solute }\n\nsoluteSpinnerContextResponsePattern =\n    { $amount ->\n        [aLittle] A little\n       *[aLot] A lot\n    } { $addedOrRemoved ->\n        [added] added\n       *[removed] removed\n    }. Now\n    { $moreOrLessOrSame ->\n      [same] same amount of solute inside and outside.\n      *[other] { $differenceSize ->\n        [aLittle] a little\n       *[aLot] a lot\n      }\n      { $moreOrLessOrSame ->\n          [more] more\n         *[less] less\n      }\n      { solute }\n      { $directionality ->\n          [insideThanOutside] inside than outside\n         *[outsideThanInside] outside than inside\n      }.\n    }\n\nsoluteBarChartsDescriptionParagraph = A barchart for each solute captures changing details. If needed, pause sim to freeze details for reading.\n\narrowSizeDescription = { $size ->\n  [small] small\n  [medium] medium\n  *[large] large\n}\n\narrowDirectionDescription = { $direction ->\n  [upward] upward arrow indicates passage from outside to inside\n  *[downward] downward arrow indicates passage from inside to outside\n}\n\nbarSizeDescription = { $amount ->\n  [aLittleMore] A little more\n  [aLotMore] A lot more\n  [aLittleLess] A little less\n  *[aLotLess] A lot less\n} outside than inside\n\nbarChartPattern = { solute }: { barSizeDescription }; { arrowSizeDescription } { arrowDirectionDescription }.\n\ncurrentDetailsActivityLevel = { $amount ->\n  *[relativelyCalm] relatively calm\n  [active] active\n  [activeAndPaused] active and paused\n}\n\ncurrentDetails = Right now, zoomed-in cross-section of cell's membrane is { currentDetailsActivityLevel } with:\n\ncurrentDetailsSoluteTypesOnOutside = { $outsideSoluteCount } solute types on outside;\ncurrentDetailsSoluteTypesOnInside = { $insideSoluteCount} solute types on inside;\ncurrentDetailsTransportProteins = { $transportProteinCount } transport proteins in membrane;\ncurrentDetailsLigands = { $hasLigands ->\n  *[false] No ligands on outside; and\n  [true] 2 types of ligands on outside; and\n}\ncurrentDetailsMembranePotential = { $membranePotential } millivolts.\n\nreleasedBackInToolbox = Released. Back in toolbox.\n\nselectedTransportProteinInSlot = Selected { $channelName } in slot { $slotIndex } of { $slotCount }.\n\ncanceledBackInMembrane = Cancelled. Back in membrane.\n\ngrabbedProteinResponsePattern = Grabbed. Above membrane. Slot {$slotIndex} of { $slotCount }.\n\ngrabbedProteinResponseWithHintPattern = { grabbedProteinResponsePattern } Move protein with W, A, S, or D key. Space to release.\n\nligandToggleButtonAccessibleHelpText = Add two types of ligands to outside of membrane.\nligandToggleButtonAddedContextResponse = Several ligands added to outside.\nligandToggleButtonRemovedContextResponse = Ligands removed."
} ) as unknown as MembraneTransportFluentType;

membraneTransport.register( 'MembraneTransportMessages', MembraneTransportMessages );

export default MembraneTransportMessages;
