# ..................................................
# REUSABLE STRINGS
# Strings that may be used in multiple patterns below to assemble
# accessible descriptions for both State and Responsive Descriptions.
# ..................................................

# Transport protein brief names
transportProteinBriefName = { $type ->
  [sodiumIonLeakageChannel] Sodium Ion, Leakage
  [potassiumIonLeakageChannel] Potassium Ion, Leakage
  [sodiumIonVoltageGatedChannel] Sodium Ion, Voltage-Gated
  [potassiumIonVoltageGatedChannel] Potassium Ion, Voltage-Gated
  [sodiumIonLigandGatedChannel] Sodium Ion, Ligand-Gated
  [potassiumIonLigandGatedChannel] Potassium Ion, Ligand-Gated
  [sodiumPotassiumPump] Sodium Potassium Pump
  *[sodiumGlucoseCotransporter] Sodium-Glucose Cotransporter
}


# END REUSABLE STRINGS .............................

# ..................................................
# State descriptions for PLAY AREA
# ..................................................

# ..
# Solutes radio button group - group names and help text
soluteControlsAccessibleHelpText = Choose solute then add or remove to inside or outside of membrane.

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

barChartPattern = { solute }: { barSizeDescription }; { arrowSizeDescription } { arrowDirectionDescription }.

currentDetailsActivityLevel = { $activityLevel ->
  *[calm] relatively calm
  [active] active
  [activeAndPaused] active and paused
}

currentDetails = Right now, zoomed-in cross-section of cell's membrane is { currentDetailsActivityLevel } with:

currentDetailsSoluteTypesOnOutside = { $outsideSoluteCount } solute types on outside;
currentDetailsSoluteTypesOnInside = { $insideSoluteCount} solute types on inside;
currentDetailsTransportProteins = { $transportProteinCount } transport proteins in membrane;

ligandsOnOutsideOnly = Ligands on outside only.

currentDetailsMembranePotential = { $membranePotential } millivolts.

releasedBackInToolbox = Released. Back in toolbox.

# Indicate the selected membrane protein, for alerter
selectedTransportProteinInSlot = Selected { $channelName } in slot { $slotIndex } of { $slotCount }.

canceledBackInMembrane = Cancelled. Back in membrane.

# Spoken when the protein is grabbed.
grabbedProteinResponsePattern = Grabbed. Above membrane. Slot {$slotIndex} of { $slotCount }.

# The first time the protein is grabbed, provide a hint about how to use it.
grabbedProteinResponseWithHintPattern = { grabbedProteinResponsePattern } Move protein with W, A, S, or D key. Space to release.

# accessibleHelpText for the ligand control
ligandToggleButtonAccessibleHelpText = Add or remove triangle- and star-shaped ligands to outside area of cell.
ligandToggleButtonAddedContextResponse = Ligands flood outside area.
ligandToggleButtonRemovedContextResponse = Ligands removed.