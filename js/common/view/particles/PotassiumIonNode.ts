// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import potassiumIon_svg from '../../../../images/potassiumIon_svg.js';
import membraneTransport from '../../../membraneTransport.js';

/**
 * Potassium ion node. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class PotassiumIonNode extends Node {

  public constructor() {

    super( {
      children: [ new Image( potassiumIon_svg, {
        scale: 1.25
      } ) ]
    } );
  }
}

membraneTransport.register( 'PotassiumIonNode', PotassiumIonNode );