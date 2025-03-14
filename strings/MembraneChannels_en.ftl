# ..................................................
# REUSABLE STRINGS
# Strings that may be used in multiple patterns below to assemble
# accessible descriptions for both State and Responsive Descriptions.
# ..................................................

# ..
# PlayAreaSummary strings vary based on screen.
-playAreaSummaryIntro = An observation window zooms in on a cross-section of a cell’s membrane. The membrane consists of a wiggling phospholipid bilayer, a double-layered sheet, that separates fluids inside and outside of cell. Added solute particles are suspended in fluid and randomly move with Brownian motion.

-playAreaSummarySolutes = You can choose from a list of solutes and add them to inside and outside.

-playAreaSummaryProteins = Transport proteins can be added directly to membrane.

-playAreaSummaryVoltagePotential = There are options to change membrane voltage potential and optionally hide visual charge labels.

-playAreaSummaryBarcharts = Solute barcharts provide a comparative summary for amount of each solute inside and outside membrane.


# END REUSABLE STRINGS .............................

# ..................................................
# State descriptions for SCREEN SUMMARY
# - Sim Overview
# - Current Details
# - Interaction Hint
# ..................................................
# ..........
# Sim Overview
# ..
# Play Area Summary - Screen 1
playAreaSummaryScreen1 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryBarcharts}

# ..
# Play Area Summary - Screen 2 and 4
playAreaSummaryScreen2and4 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryVoltagePotential } { -playAreaSummaryBarcharts }

# ..
# Play Area Summary - Screen 3
playAreaSummaryScreen3 =  { -playAreaSummaryIntro } {-playAreaSummarySolutes} { -playAreaSummaryProteins } { -playAreaSummaryBarcharts }

# ..
# Control Area Summary - All Screens
controlAreaSummary = There are options for how fast the action happens in the observation window, including a button to pause. Also, you can clear the solutes from both sides of the membrane or reset the sim.

# ..........
# Interaction Hint
interactionHint = Add or remove solute to inside or outside of membrane.
interactionHintWithChannels = Add or remove solutes to inside or outside of membrane, and play with transport channels.

# ..........
# Current Details
# Working on this in design doc!

# END SCREEN SUMMARY .............................

# ..................................................
# State descriptions for PLAY AREA
# ..................................................

# ..
# Solutes radio button group - group names and help text
soluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.

outsideMembraneSpinnerAccessibleName = Outside Membrane
outsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.

insideMembraneSpinnerAccessibleName = Inside Membrane
insideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.

soluteSpinnerRoleDescription = solute amount adjuster

solute = { $soluteType ->
  [oxygen] oxygen molecules
  [carbonDioxide] carbon dioxide molecules
  [sodiumIon] sodium ions
  [potassiumIon] potassium ions
  [glucose] glucose molecules
  *[atp] ATP molecules
}

soluteSpinnerObjectResponsePattern = { $amount ->
  [none] no
  [one] one
  [few] a few
  [some] some
  *[many] many
} { solute }

soluteSpinnerContextResponsePattern =
    { $amount ->
        [aLittle] A little
       *[aLot] A lot
    } { $addedOrRemoved ->
        [added] added
       *[removed] removed
    }. Now
    { $moreOrLessOrSame ->
      [same] same amount of solute inside and outside.
      *[other] { $differenceSize ->
        [aLittle] a little
       *[aLot] a lot
      }
      { $moreOrLessOrSame ->
          [more] more
         *[less] less
      }
      { solute }
      { $directionality ->
          [insideThanOutside] inside than outside
         *[outsideThanInside] outside than inside
      }.
    }

soluteBarChartsDescriptionParagraph = A barchart for each solute captures changing details. If needed, pause sim to freeze details for reading.

arrowSizeDescription = { $size ->
  [small] small
  [medium] medium
  *[large] large
}

arrowDirectionDescription = { $direction ->
  [upward] upward arrow indicates passage from outside to inside
  *[downward] downward arrow indicates passage from inside to outside
}

barSizeDescription = { $amount ->
  [aLittleMore] A little more
  [aLotMore] A lot more
  [aLittleLess] A little less
  *[aLotLess] A lot less
} outside than inside


barChartPattern = { barSizeDescription }; { arrowSizeDescription } { arrowDirectionDescription }.

# Show a sentence like Right now, membrane has
#                        {1-6} solute types outside;
#                        E.g., if Na+ is 0, do not count it
#                        {1-6} solute types inside;
#                        {1-7} transport channels
currentDetailsRightNow = Right now,
currentDetailsOutsideSoluteCount = membrane has { $outsideSoluteCount } solute types outside;
currentDetailsInsideSoluteCount = { $insideSoluteCount } solute types inside;
currentDetailsChannelCount = { $channelCount } transport channels;

releasedBackInToolbox = Released. Back in toolbox.

# Indicate the select channel, for alerter
selectedChannelInSlot = Selected { $channelName } in slot { $slotIndex } of { $slotCount }.