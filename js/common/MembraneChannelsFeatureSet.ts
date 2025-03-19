// Copyright 2025, University of Colorado Boulder

import SoluteType, { SoluteTypes } from './model/SoluteType.js';

/**
 * MembraneChannelsFeatureSet allows us to identify which features are used in each screen.
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
type MembraneChannelsFeatureSet = 'simpleDiffusion' | 'facilitatedDiffusion' | 'activeTransport' | 'playground';

export default MembraneChannelsFeatureSet;

export const getFeatureSetSoluteTypes = ( featureSet: MembraneChannelsFeatureSet ): readonly SoluteType[] => {
  return ( featureSet === 'activeTransport' || featureSet === 'playground' ) ? SoluteTypes : SoluteTypes.filter( type => type !== 'atp' );
};

// TODO: Duplicated with above
export const getFeatureSetSoluteTypesForSolutesPanel = ( featureSet: MembraneChannelsFeatureSet ): readonly SoluteType[] => {
  return ( featureSet === 'activeTransport' || featureSet === 'playground' ) ? SoluteTypes.filter( type => type !== 'adp' && type !== 'phosphate' ) : SoluteTypes.filter( type => type !== 'atp' && type !== 'adp' && type !== 'phosphate' );
};

export const getFeatureSetHasVoltages = ( featureSet: MembraneChannelsFeatureSet ): boolean => {
  return featureSet === 'facilitatedDiffusion' || featureSet === 'playground';
};

export const getFeatureSetHasLigands = ( featureSet: MembraneChannelsFeatureSet ): boolean => {
  return featureSet === 'facilitatedDiffusion' || featureSet === 'playground';
};