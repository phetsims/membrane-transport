// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import sodiumIon_svg from '../../../../images/sodiumIon_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * Sodium ion node. Does not rotate. TODO: Revise the size of all provided artwork.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SodiumIonNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( sodiumIon_svg ) ]
    } );
  }
}

membraneTransport.register( 'SodiumIonNode', SodiumIonNode );