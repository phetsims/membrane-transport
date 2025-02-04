soluteRadioButtonGroupHelpText = Choose solute then add or remove to inside or outside of membrane.

outsideMembraneSpinnerAccessibleName = Outside Membrane
outsideMembraneSpinnerHelpText = Add or remove chosen solute to outside of membrane.

insideMembraneSpinnerAccessibleName = Inside Membrane
insideMembraneSpinnerHelpText = Add or remove chosen solute to inside of membrane.

soluteSpinnerRoleDescription = solute amount adjuster

solute = { $soluteType ->
  [oxygen] oxygen
  [carbonDioxide] carbon dioxide
  [sodiumIon] sodium ion
  [potassiumIon] potassium ion
  [glucose] glucose
  *[atp] ATP
}

## TODO You cannot use selectors in placeables with terms. Catch that during modulify.
## TODO Can we catch if you forget a default * case during modulify?
soluteSpinnerObjectResponsePattern = { $amount ->
  [none] no
  [one] one
  [few] a few
  [some] some
  *[many] many
} { solute } molecules