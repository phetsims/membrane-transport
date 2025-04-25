// Copyright 2025, University of Colorado Boulder

// @author Sam Reid (PhET Interactive Simulations)
const MembraneChannelsStrings = {
  //  Title
  'membrane-channels.title': 'Membrane Channels',

  // Screen names
  'screen.simpleDiffusion': 'Simple Diffusion',
  'screen.facilitatedDiffusion': 'Facilitated Diffusion',
  'screen.activeTransport': 'Active Transport',
  'screen.playground': 'Playground',

  // Solutes
  solutes: 'Solutes',
  oxygen: 'O<sub>2</sub>',
  carbonDioxide: 'CO<sub>2</sub>',
  sodiumIon: 'Na<sup>+</sup>',
  potassiumIon: 'K<sup>+</sup>',
  glucose: 'Glucose',
  atp: 'ATP',

  // Described in the observation window.
  outside: 'Outside',
  inside: 'Inside',

  // Channel and Membrane Proteins
  membraneProteins: 'Membrane Proteins',
  membranePotentialLabels: 'Membrane Potential Labels',
  voltageGatedChannels: 'Voltage-gated Channels',
  ligandGatedChannels: 'Ligand-gated Channels',
  activeTransporters: 'Active Transporters',
  leakageChannels: 'Leakage Channels',

  // Transported targets
  sodiumIonNaPlus: 'Sodium Ion<br>(Na<sup>+</sup>)',
  potassiumIonKPlus: 'Potassium Ion<br>(K<sup>+</sup>)',

  // Active pumps
  NaPlusKPlusPump: 'Na<sup>+</sup>-K<sup>+</sup><br>Pump',
  sodiumGlucoseCotransporter: 'Sodium-Glucose<br>Cotransporter',

  // Additional Controls
  membraneVoltagePotentialmV: 'Membrane Voltage Potential (mV)',
  addLigands: 'Add Ligands',
  removeLigands: 'Remove Ligands',

  // In the preferences
  animateLipids: 'Animate Lipids',
  animateLipidsDescription: 'Whether the phospholipids forming the cell membrane should be animated',

  a11y: {

    observationWindow: {

      accessibleName: 'Grab a protein to re-order along zoomed-in view of membrane.'
    },

    accordionBoxGroup: {
      accessibleHelpText: 'Grab proteins from toolboxes. Add up to 7 to membrane. Use keyboard shortcuts to grab, move, and release proteins in membrane.',

      ligandGatedAccordionBox: {
        sodiumIonNaPlusLigandGated: 'Sodium Ion NA plus, Ligand-gated',
        potassiumIonKPlusLigandGated: 'Potassium Ion K plus, Ligand-gated'
      },

      leakageChannelsAccordionBox: {
        sodiumIonNaPlusLeakage: 'Sodium Ion NA plus, Leakage',
        potassiumIonKPlusLeakage: 'Potassium Ion K plus, Leakage'
      },

      voltageGatedChannelsAccordionBox: {
        sodiumIonNaPlusVoltageGated: 'Sodium Ion NA plus, Voltage-gated',
        potassiumIonKPlusVoltageGated: 'Potassium Ion K plus, Voltage-gated'
      },

      activeTransportersAccordionBox: {
        sodiumPotassiumPump: 'Sodium-Potassium Pump',
        sodiumGlucoseCotransporter: 'Sodium-Glucose Cotransporter'
      },

      toolAccessibleHelpText: 'Grab to pull protein to the membrane.'
    }
  },

  getAmountMessage(
    amount: 'aLittle' | 'aLot',
    addedOrRemoved: 'added' | 'removed',
    differenceSize: 'aLittle' | 'aLot',
    moreOrLessOrSame: 'more' | 'less' | 'same',
    solute: string,
    directionality: 'insideThanOutside' | 'outsideThanInside'
  ): string {
    const textAmount = amount === 'aLittle' ? 'A little' : 'A lot';
    const textAction = addedOrRemoved === 'added' ? 'added' : 'removed';
    const textDiffSize = differenceSize === 'aLittle' ? 'a little' : 'a lot';

    let textComparison = '';
    if ( moreOrLessOrSame === 'same' ) {
      textComparison = `same amount of ${solute} inside and outside.`;
    }
    else {
      const direction = directionality === 'insideThanOutside' ? 'inside than outside'
                                                               : 'outside than inside';
      textComparison = `${moreOrLessOrSame} ${solute} ${direction}.`;
    }

    return `${textAmount} ${textAction} ${textDiffSize} ${textComparison}`;
  }

};

export default MembraneChannelsStrings;