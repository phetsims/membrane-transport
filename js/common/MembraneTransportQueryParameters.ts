// Copyright 2024-2025, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import membraneTransport from '../membraneTransport.js';

const SCHEMA_MAP = {

  // A flag that populates the sim with a set of default solutes.
  defaultSolutes: {
    type: 'flag'
  },

  animateLipids: {
    type: 'boolean',
    defaultValue: true,
    public: true
  },

  // Max solutes per solute type
  maxSolutes: {
    type: 'number',
    defaultValue: 50
  }
} as const;

const MembraneTransportQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
MembraneTransportQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

membraneTransport.register( 'MembraneTransportQueryParameters', MembraneTransportQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.membraneTransport.MembraneTransportQueryParameters' );

export default MembraneTransportQueryParameters;