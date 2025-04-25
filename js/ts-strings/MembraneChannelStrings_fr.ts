// Copyright 2025, University of Colorado Boulder

// @author Jean-Marc Reid
const MembraneChannelsStrings = {
  //  Title
  'membrane-channels.title': 'Les Canaux Membranaires',

  // Screen names
  'screen.simpleDiffusion': 'Diffusion Très Simple',
  'screen.facilitatedDiffusion': 'Diffusion Facilitée',
  'screen.activeTransport': 'Transport Actif',
  'screen.playground': 'Terrain de jeu',

  // Solutes
  solutes: 'Les Solutés',
  oxygen: 'O<sub>2</sub>',
  carbonDioxide: 'CO<sub>2</sub>',
  sodiumIon: 'Na<sup>+</sup>',
  potassiumIon: 'K<sup>+</sup>',
  glucose: 'Glucose',
  atp: 'ATP',

  // Described in the observation window.
  outside: 'Extérieur',
  inside: 'Intérieur',

  // Channel and Membrane Proteins
  membraneProteins: 'Protéines Membranaires',
  membranePotentialLabels: 'Étiquettes du Potentiel de Membrane',
  voltageGatedChannels: 'Canaux Voltage-Dépendants',
  ligandGatedChannels: 'Canaux Ligand-Dépendants',
  activeTransporters: 'Transporteurs Actifs',
  leakageChannels: 'Canaux de Fuite',

  // Transported targets
  sodiumIonNaPlus: 'Ion de Sodium<br>(Na<sup>+</sup>)',
  potassiumIonKPlus: 'Ion de Potassium<br>(K<sup>+</sup>)',

  // Active pumps
  NaPlusKPlusPump: 'Na<sup>+</sup>-K<sup>+</sup><br>Pompe',
  sodiumGlucoseCotransporter: 'Sodium-Glucose<br>Cotransporteur',

  // Additional Controls
  membraneVoltagePotentialmV: 'Potentiel de Membrane (mV)',
  addLigands: 'Ajouter des Ligands',
  removeLigands: 'Retirer des Ligands',

  // In the preferences
  animateLipids: 'Animer les Lipides',
  animateLipidsDescription: 'Indique si les phospholipides formant la membrane cellulaire doivent être animés',

  a11y: {

    observationWindow: {

      accessibleName: 'Saisissez une protéine pour réorganiser la vue agrandie de la membrane.'
    },

    accordionBoxGroup: {
      accessibleHelpText: 'Saisissez des protéines depuis les boîtes à outils. Ajoutez jusqu’à 7 sur la membrane. Utilisez les raccourcis clavier pour saisir, déplacer et relâcher les protéines sur la membrane.',

      ligandGatedAccordionBox: {
        sodiumIonNaPlusLigandGated: 'Ion de sodium NA plus, ligand-dépendant',
        potassiumIonKPlusLigandGated: 'Ion de potassium K plus, ligand-dépendant'
      },

      leakageChannelsAccordionBox: {
        sodiumIonNaPlusLeakage: 'Ion de sodium NA plus, fuite',
        potassiumIonKPlusLeakage: 'Ion de potassium K plus, fuite'
      },

      voltageGatedChannelsAccordionBox: {
        sodiumIonNaPlusVoltageGated: 'Ion de sodium NA plus, voltage-dépendant',
        potassiumIonKPlusVoltageGated: 'Ion de potassium K plus, voltage-dépendant'
      },

      activeTransportersAccordionBox: {
        sodiumPotassiumPump: 'Pompe sodium-potassium',
        sodiumGlucoseCotransporter: 'Cotransporteur sodium-glucose'
      },

      toolAccessibleHelpText: 'Saisissez pour déplacer la protéine vers la membrane.'
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
    const textAmount = amount === 'aLittle' ? 'Un peu' : 'Beaucoup';
    const textAction = addedOrRemoved === 'added' ? 'ajouté' : 'retiré';
    const textDiffSize = differenceSize === 'aLittle' ? 'un peu' : 'beaucoup';

    let textComparison = '';
    if ( moreOrLessOrSame === 'same' ) {
      textComparison = `la même quantité de ${solute} à l'intérieur et à l'extérieur.`;
    }
    else {
      const direction = directionality === 'insideThanOutside' ? 'à l\'intérieur que l\'extérieur'
                                                               : 'à l\'extérieur que l\'intérieur';
      const moreOrLess = moreOrLessOrSame === 'more' ? 'plus de' : 'moins de';
      textComparison = `${moreOrLess} ${solute} ${direction}.`;
    }

    return `${textAmount} ${textAction} ${textDiffSize} ${textComparison}`;
  }

};

export default MembraneChannelsStrings;