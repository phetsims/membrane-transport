// Copyright 2025, University of Colorado Boulder

/**
 * The types of membrane proteins in the simulation. Being a string simplifies PhET-iO serialization.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

type TransportProteinType =
  'sodiumIonLeakageChannel' |
  'potassiumIonLeakageChannel' |

  'sodiumIonVoltageGatedChannel' |
  'potassiumIonVoltageGatedChannel' |

  'sodiumIonLigandGatedChannel' |
  'potassiumIonLigandGatedChannel' |

  'sodiumPotassiumPump' |
  'sodiumGlucoseCotransporter';

export default TransportProteinType;