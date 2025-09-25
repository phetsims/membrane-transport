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

  // When true, the phospholipid bilayer (circles with tails in that create the membrane) will animate, showing
  // the tails moving in a fluid-like manner. Some may find this disturbing or distracting, so it can be turned off.
  public readonly animateLipidsProperty = new BooleanProperty( MembraneTransportQueryParameters.animateLipids, {
    tandem: Tandem.PREFERENCES.createTandem( 'animateLipidsProperty' ),
    phetioFeatured: true
  } );

  // When true, glucose in the intracellular area will quickly fade out and be removed from the model.
  public readonly glucoseMetabolismProperty = new BooleanProperty( MembraneTransportQueryParameters.glucoseMetabolism, {
    tandem: Tandem.PREFERENCES.createTandem( 'glucoseMetabolismProperty' ),
    phetioFeatured: true
  } );

  // When true, sound effects that use stereo panning will be played.
  public readonly stereoCrossingSoundsEnabledProperty = new BooleanProperty( false, {
    tandem: Tandem.PREFERENCES.createTandem( 'stereoCrossingSoundsEnabledProperty' ),
    phetioFeatured: true,
    phetioState: false // Even though it is a sim-specific preference, this setting appears in the "Audio" tab of the preferences dialog, and is hence not phet-io stateful. See https://github.com/phetsims/membrane-transport/issues/494
  } );

  public static readonly instance = new MembraneTransportPreferences();

  private constructor() {

    // This is a singleton, so prevent instantiation.
  }
}

membraneTransport.register( 'MembraneTransportPreferences', MembraneTransportPreferences );