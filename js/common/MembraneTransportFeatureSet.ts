// Copyright 2025, University of Colorado Boulder

/**
 * MembraneTransportFeatureSet allows us to identify which features are used in each screen.
 *
 * There are 4 screens - they are very similar in structure and capabilities. Screen 4 (Playground) is the most complex
 * and each preceding screen is a simplified variation.
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