// Copyright 2025, University of Colorado Boulder

/**
 * Get the brief name for a TransportProteinType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import MembraneTransportFluent from '../../../MembraneTransportFluent.js';
import TransportProteinType from '../../model/proteins/TransportProteinType.js';

export default function getBriefProteinName( type: TransportProteinType ): TReadOnlyProperty<string> {

  // Create a pattern message property with the transportProteinType value and return its value
  return MembraneTransportFluent.a11y.transportProteinBriefName.createProperty( { type: type } );
}