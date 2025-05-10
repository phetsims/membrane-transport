// Copyright 2025, University of Colorado Boulder

/**
 * Get the brief name for a TransportProteinType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import { membrane_transportStringsNewInterface } from '../../../MembraneTransportStrings.js';
import TransportProteinType from '../../model/proteins/TransportProteinType.js';

export default function getBriefProteinName( type: TransportProteinType ): TReadOnlyProperty<string> {

  // Create a pattern message property with the transportProteinType value and return its value
  return membrane_transportStringsNewInterface.transportProteinBriefName.createProperty( { type: type } );
}