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
  'transportProteinBriefNameMessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen1MessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen2and4MessageProperty': LocalizedMessageProperty;
  'playAreaSummaryScreen3MessageProperty': LocalizedMessageProperty;
  'controlAreaSummaryMessageProperty': TReadOnlyProperty<string>;
  'interactionHintMessageProperty': TReadOnlyProperty<string>;
  'interactionHintWithTransportProteinsMessageProperty': TReadOnlyProperty<string>;
  'soluteControlsAccessibleHelpTextMessageProperty': TReadOnlyProperty<string>;
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
  "en": "\r\n-playAreaSummaryIntro = An observation window zooms in on a cross-section of a cell's membrane. The membrane consists of a wiggling phospholipid bilayer, a double-layered sheet, that separates fluids inside and outside of cell. Added solute particles are suspended in fluid and randomly move with Brownian motion.\r\n\r\n-playAreaSummarySolutes = You can choose from a list of solutes and add them to inside and outside.\r\n\r\n-playAreaSummaryProteins = Transport proteins can be added directly to membrane.\r\n\r\n-playAreaSummaryVoltagePotential = There are options to change membrane voltage potential and optionally hide visual charge labels.\r\n\r\n-playAreaSummaryBarCharts = Solute bar charts provide a comparative summary for amount of each solute inside and outside membrane.\r\n\r\ntransportProteinBriefName = { $type ->\r\n  [sodiumIonLeakageChannel] Sodium Ion, Leakage\r\n  [potassiumIonLeakageChannel] Potassium Ion, Leakage\r\n  [sodiumIonVoltageGatedChannel] Sodium Ion, Voltage-Gated\r\n  [potassiumIonVoltageGatedChannel] Potassium Ion, Voltage-Gated\r\n  [sodiumIonLigandGatedChannel] Sodium Ion, Ligand-Gated\r\n  [potassiumIonLigandGatedChannel] Potassium Ion, Ligand-Gated\r\n  [sodiumPotassiumPump] Sodium Potassium Pump\r\n  *[sodiumGlucoseCotransporter] Sodium-Glucose Cotransporter\r\n}\r\n\r\n\r\n\r\nplayAreaSummaryScreen1 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryBarCharts}\r\n\r\nplayAreaSummaryScreen2and4 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryVoltagePotential } { -playAreaSummaryBarCharts }\r\n\r\nplayAreaSummaryScreen3 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryBarCharts }\r\n\r\ncontrolAreaSummary = There are options for how fast the action happens in the observation window, including a button to pause. Also, you can clear the solutes from both sides of the membrane or reset the sim.\r\n\r\ninteractionHint = Add or remove solute to inside or outside of membrane.\r\ninteractionHintWithTransportProteins = Add or remove solutes to inside or outside of membrane, and play with transport channels.\r\n\r\n\r\n\r\n\r\nsoluteControlsAccessibleHelpText = Choose solute then add or remove to inside or outside of membrane.\r\n\r\noutsideMembraneSpinnerAccessibleName = Outside Membrane\r\noutsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.\r\n\r\ninsideMembraneSpinnerAccessibleName = Inside Membrane\r\ninsideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.\r\n\r\nsoluteSpinnerRoleDescription = solute amount adjuster\r\n\r\nsolute = { $soluteType ->\r\n  [oxygen] oxygen molecules\r\n  [carbonDioxide] carbon dioxide molecules\r\n  [sodiumIon] sodium ions\r\n  [potassiumIon] potassium ions\r\n  [glucose] glucose molecules\r\n  *[atp] ATP molecules\r\n}\r\n\r\nsoluteSpinnerObjectResponsePattern = { $amount ->\r\n  [none] no\r\n  [one] one\r\n  [few] a few\r\n  [some] some\r\n  *[many] many\r\n} { solute }\r\n\r\nsoluteSpinnerContextResponsePattern =\r\n    { $amount ->\r\n        [aLittle] A little\r\n       *[aLot] A lot\r\n    } { $addedOrRemoved ->\r\n        [added] added\r\n       *[removed] removed\r\n    }. Now\r\n    { $moreOrLessOrSame ->\r\n      [same] same amount of solute inside and outside.\r\n      *[other] { $differenceSize ->\r\n        [aLittle] a little\r\n       *[aLot] a lot\r\n      }\r\n      { $moreOrLessOrSame ->\r\n          [more] more\r\n         *[less] less\r\n      }\r\n      { solute }\r\n      { $directionality ->\r\n          [insideThanOutside] inside than outside\r\n         *[outsideThanInside] outside than inside\r\n      }.\r\n    }\r\n\r\nsoluteBarChartsDescriptionParagraph = A barchart for each solute captures changing details. If needed, pause sim to freeze details for reading.\r\n\r\narrowSizeDescription = { $size ->\r\n  [small] small\r\n  [medium] medium\r\n  *[large] large\r\n}\r\n\r\narrowDirectionDescription = { $direction ->\r\n  [upward] upward arrow indicates passage from outside to inside\r\n  *[downward] downward arrow indicates passage from inside to outside\r\n}\r\n\r\nbarSizeDescription = { $amount ->\r\n  [aLittleMore] A little more\r\n  [aLotMore] A lot more\r\n  [aLittleLess] A little less\r\n  *[aLotLess] A lot less\r\n} outside than inside\r\n\r\nbarChartPattern = { solute }: { barSizeDescription }; { arrowSizeDescription } { arrowDirectionDescription }.\r\n\r\ncurrentDetailsActivityLevel = { $activityLevel ->\r\n  *[calm] relatively calm\r\n  [active] active\r\n  [activeAndPaused] active and paused\r\n}\r\n\r\ncurrentDetails = Right now, zoomed-in cross-section of cell's membrane is { currentDetailsActivityLevel } with:\r\n\r\ncurrentDetailsSoluteTypesOnOutside = { $outsideSoluteCount } solute types on outside;\r\ncurrentDetailsSoluteTypesOnInside = { $insideSoluteCount} solute types on inside;\r\ncurrentDetailsTransportProteins = { $transportProteinCount } transport proteins in membrane;\r\ncurrentDetailsLigands = { $hasLigands ->\r\n  *[false] No ligands on outside; and\r\n  [true] 2 types of ligands on outside; and\r\n}\r\ncurrentDetailsMembranePotential = { $membranePotential } millivolts.\r\n\r\nreleasedBackInToolbox = Released. Back in toolbox.\r\n\r\nselectedTransportProteinInSlot = Selected { $channelName } in slot { $slotIndex } of { $slotCount }.\r\n\r\ncanceledBackInMembrane = Cancelled. Back in membrane.\r\n\r\ngrabbedProteinResponsePattern = Grabbed. Above membrane. Slot {$slotIndex} of { $slotCount }.\r\n\r\ngrabbedProteinResponseWithHintPattern = { grabbedProteinResponsePattern } Move protein with W, A, S, or D key. Space to release.\r\n\r\nligandToggleButtonAccessibleHelpText = Add two types of ligands to outside of membrane.\r\nligandToggleButtonAddedContextResponse = Several ligands added to outside.\r\nligandToggleButtonRemovedContextResponse = Ligands removed."
} ) as unknown as MembraneTransportFluentType;

membraneTransport.register( 'MembraneTransportMessages', MembraneTransportMessages );

export default MembraneTransportMessages;
