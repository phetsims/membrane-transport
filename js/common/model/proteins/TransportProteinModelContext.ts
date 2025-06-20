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
  'ligands' |
  'membranePotentialProperty' |
  'ligandUnboundDueToNaturalCausesEmitter' |
  'isUserDraggingLigandProperty' |
  'checkGradientForCrossing' |
  'membraneSlots'
>;

export default TransportProteinModelContext;