// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import carbonDioxide_svg from '../../../../images/carbonDioxide_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * Carbon dioxide molecule node. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class CarbonDioxideNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( carbonDioxide_svg, {
        scale: 4 // TODO: This number should probably sync with OxygenNode scale?
      } ) ]
    } );
  }
}

membraneTransport.register( 'CarbonDioxideNode', CarbonDioxideNode );