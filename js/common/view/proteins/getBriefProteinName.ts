// Copyright 2025, University of Colorado Boulder

/**
 * Get the brief name for a TransportProteinType
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TransportProteinType from '../../model/proteins/TransportProteinType.js';
import MembraneTransportMessages from '../../../strings/MembraneTransportMessages.js';
import PatternMessageProperty from '../../../../../chipper/js/browser/PatternMessageProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';

export default function getBriefProteinName( type: TransportProteinType ): TReadOnlyProperty<string> {

  // Create a pattern message property with the transportProteinType value and return its value
  return new PatternMessageProperty( MembraneTransportMessages.transportProteinBriefNameMessageProperty, { type: type } );
}