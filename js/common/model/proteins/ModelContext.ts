// Copyright 2025, University of Colorado Boulder

/**
 * Defines a minimal context necessary for TransportProteins to function.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import MembraneTransportModel from '../MembraneTransportModel.js';

type ModelContext = Pick<MembraneTransportModel, 'isTransportProteinSoluteFree' | 'getSlotForTransportProtein' | 'solutes' | 'membraneVoltagePotentialProperty'>;

export default ModelContext;