// Copyright 2025, University of Colorado Boulder

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MembraneTransportQueryParameters from './MembraneTransportQueryParameters.js';

/**
 * Sim-specific preferences for Membrane Transport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const animateLipidsProperty = new BooleanProperty( MembraneTransportQueryParameters.animateLipids, {
  tandem: Tandem.PREFERENCES.createTandem( 'animateLipidsProperty' ),
  phetioFeatured: true
} );