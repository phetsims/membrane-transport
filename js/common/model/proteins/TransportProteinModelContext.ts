// Copyright 2025, University of Colorado Boulder

/**
 * Defines a minimal context necessary for TransportProteins to function.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import MembraneTransportModel from '../MembraneTransportModel.js';

type TransportProteinModelContext = Pick<MembraneTransportModel,
  'isTransportProteinSoluteFree' |
  'getSlotForTransportProtein' |
  'solutes' |
  'membranePotentialProperty' |
  'ligandUnboundDueToNaturalCausesEmitter' |
  'isUserDraggingLigandProperty'
>;

export default TransportProteinModelContext;