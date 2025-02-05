// Copyright 2024, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import membraneChannels from '../membraneChannels.js';

const SCHEMA_MAP = {

  // A flag that populates the sim with a set of default solutes.
  defaultSolutes: {
    type: 'flag'
  }
} as const;

const MembraneChannelsQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
MembraneChannelsQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

membraneChannels.register( 'MembraneChannelsQueryParameters', MembraneChannelsQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.membraneChannels.MembraneChannelsQueryParameters' );

export default MembraneChannelsQueryParameters;