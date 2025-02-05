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