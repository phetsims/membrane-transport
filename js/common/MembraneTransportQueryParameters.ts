// Copyright 2024-2026, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';

const MembraneTransportQueryParameters = QueryStringMachine.getAll( {

  // Causes the lipids in the membrane to randomly wiggle, can be shut off in query parameter or preferences.
  animateLipids: {
    type: 'boolean',
    defaultValue: true,
    public: true
  },

  // Causes glucose in the intracellular area to be metabolized - they will automatically be removed from the sim
  // after a while.
  glucoseMetabolism: {
    type: 'boolean',
    defaultValue: false,
    public: true
  }
} );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
phet.log && phet.log( `MembraneTransportQueryParameters: ${JSON.stringify( MembraneTransportQueryParameters, null, 2 )}` );

export default MembraneTransportQueryParameters;
