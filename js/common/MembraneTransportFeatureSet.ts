// Copyright 2025, University of Colorado Boulder

/**
 * MembraneTransportFeatureSet allows us to identify which features are used in each screen.
 *
 * There are 4 screens - they are very similar in structure and capabilities. Screen 4 (Playground) is the most complex
 * and each preceding screen is a simplified variation. I’ll begin at screen 1 and build to screen 4.
 *
 * Screen 1 Simple Diffusion: Can add and remove solutes, clear solutes, time control, view barcharts
 *
 * Screen 2 Facilitated Diffusion: Screen 1 + Add leakage, voltage, and ligand gated channels, enable/disable membrane
 * potential labels, change membrane voltage potential, add ligands
 *
 * Screen 3 Active Transport: Screen 1 + Add active transport channels, add ATP
 *
 * Screen 4 Playground: Screen 1 + Screen 2 + Screen 3
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SoluteType, { SoluteControlSolute, SoluteTypeValues } from './model/SoluteType.js';

type MembraneTransportFeatureSet = 'simpleDiffusion' | 'facilitatedDiffusion' | 'activeTransport' | 'playground';

export default MembraneTransportFeatureSet;

export const getFeatureSetSoluteTypes = ( featureSet: MembraneTransportFeatureSet ): readonly SoluteType[] => {
  return ( featureSet === 'activeTransport' || featureSet === 'playground' ) ? SoluteTypeValues : SoluteTypeValues.filter( type => type !== 'atp' );
};

export const getFeatureSetSelectableSoluteTypes = ( featureSet: MembraneTransportFeatureSet ): readonly SoluteControlSolute[] => {
  return getFeatureSetSoluteTypes( featureSet ).filter( type => type !== 'adp' && type !== 'phosphate' );
};

export const getFeatureSetHasVoltages = ( featureSet: MembraneTransportFeatureSet ): boolean => {
  return featureSet === 'facilitatedDiffusion' || featureSet === 'playground';
};

export const getFeatureSetHasLigands = ( featureSet: MembraneTransportFeatureSet ): boolean => {
  return featureSet === 'facilitatedDiffusion' || featureSet === 'playground';
};

export const getFeatureSetHasProteins = ( featureSet: MembraneTransportFeatureSet ): boolean => {
  return featureSet !== 'simpleDiffusion';
};