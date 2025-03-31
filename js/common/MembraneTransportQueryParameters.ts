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

const MembraneTransportQueryParameters = QueryStringMachine.getAll( {

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
} );

membraneTransport.register( 'MembraneTransportQueryParameters', MembraneTransportQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.membraneTransport.MembraneTransportQueryParameters' );

export default MembraneTransportQueryParameters;