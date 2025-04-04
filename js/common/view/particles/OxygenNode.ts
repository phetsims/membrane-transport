// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import oxygen_svg from '../../../../images/oxygen_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * Diatomic oxygen molecule. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class OxygenNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( oxygen_svg ) ]
    } );
  }
}

membraneTransport.register( 'OxygenNode', OxygenNode );