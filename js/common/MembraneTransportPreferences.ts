// Copyright 2025, University of Colorado Boulder

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MembraneChannelsQueryParameters from './MembraneChannelsQueryParameters.js';

/**
 * Sim-specific preferences for Membrane Channels.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const animateLipidsProperty = new BooleanProperty( MembraneChannelsQueryParameters.animateLipids, {
  tandem: Tandem.PREFERENCES.createTandem( 'animateLipidsProperty' ),
  phetioFeatured: true
} );