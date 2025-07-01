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

  // Causes the lipids in the membrane to randomly wiggle, can be shut off in query parameter or preferences.
  animateLipids: {
    type: 'boolean',
    defaultValue: true,
    public: true
  },

  // Causes glucose in the intracellular area to be "absorbed" - they will automatically be removed from the sim
  // after a while.
  absorbGlucose: {
    type: 'boolean',
    defaultValue: false,
    public: true
  },

  // Max solutes per solute type
  maxSolutes: {
    type: 'number',
    defaultValue: 300
  },

  // Sound design for channel crossings uses stereo panning
  stereoCrossings: {
    type: 'boolean',
    defaultValue: false
  },

  gasCrossingSound: {
    type: 'string',
    validValues: [ 'fm', 'dist' ],
    defaultValue: 'fm'
  }
} );

membraneTransport.register( 'MembraneTransportQueryParameters', MembraneTransportQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.membraneTransport.MembraneTransportQueryParameters' );

export default MembraneTransportQueryParameters;