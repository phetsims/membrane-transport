// Copyright 2025, University of Colorado Boulder

/**
 * The types of membrane proteins in the simulation. Being a string simplifies PhET-iO serialization.
 *
 * There are more types of transport proteins than there are classes. Some classes have identical behavior
 * except for the ion they transport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const TransportProteinTypeValues = [
  'sodiumIonLeakageChannel',
  'potassiumIonLeakageChannel',

  'sodiumIonVoltageGatedChannel',
  'potassiumIonVoltageGatedChannel',

  'sodiumIonLigandGatedChannel',
  'potassiumIonLigandGatedChannel',

  'sodiumPotassiumPump',
  'sodiumGlucoseCotransporter'
] as const;

type TransportProteinType = typeof TransportProteinTypeValues[number];

export default TransportProteinType;