// Copyright 2025, University of Colorado Boulder

/**
 * Sim-specific preferences for Membrane Transport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Tandem from '../../../tandem/js/Tandem.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportQueryParameters from './MembraneTransportQueryParameters.js';

export default class MembraneTransportPreferences {

  public readonly animateLipidsProperty = new BooleanProperty( MembraneTransportQueryParameters.animateLipids, {
    tandem: Tandem.PREFERENCES.createTandem( 'animateLipidsProperty' ),
    phetioFeatured: true
  } );

  // When true, glucose in the intracellular area will quickly fade out and be removed from the model.
  public readonly glucoseMetabolismProperty = new BooleanProperty( MembraneTransportQueryParameters.glucoseMetabolism, {
    tandem: Tandem.PREFERENCES.createTandem( 'glucoseMetabolismProperty' ),
    phetioFeatured: true
  } );

  public readonly stereoCrossingSoundsEnabledProperty = new BooleanProperty( MembraneTransportQueryParameters.stereoCrossings, {
    tandem: Tandem.PREFERENCES.createTandem( 'stereoCrossingSoundsEnabledProperty' ),
    phetioFeatured: true
  } );

  public static readonly instance = new MembraneTransportPreferences();

  private constructor() {

    // This is a singleton, so prevent instantiation.
  }
}

membraneTransport.register( 'MembraneTransportPreferences', MembraneTransportPreferences );