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
        [aLittle] a little
       *[aLot] a lot
    } { $addedOrRemoved ->
        [added] added
       *[removed] removed
    }. Now
    { $differenceSize ->
        [aLittle] a little
       *[aLot] a lot
    }
    { $moreOrLess ->
        [more] more
       *[less] less
    }
    { solute }
    { $directionality ->
        [insideThanOutside] inside than outside
       *[outsideThanInside] outside than inside
    }.

soluteBarChartsDescriptionParagraph = A barchart for each solute captures changing details. If needed, pause sim to freeze details for reading.

# {{a lot more outside than inside}}; {{large}} {{downward}} arrow indicates passage {{from outside to inside}}.
barChartPattern = { $amount ->
  [aLittleMore] A little more
  [aLotMore] A lot more
  [aLittleLess] A little less
  *[aLotLess] A lot less
} outside than inside; { $size ->
  [small] small
  [medium] medium
  *[large] large
} { $direction ->
  [upward] upward from outside to inside
  *[downward] downward from inside to outside
}.