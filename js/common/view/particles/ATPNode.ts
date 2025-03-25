// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import atp_svg from '../../../../images/atp_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * ATP molecule. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ATPNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( atp_svg, {
        scale: 0.75
      } ) ]
    } );
  }
}

membraneTransport.register( 'ATPNode', ATPNode );