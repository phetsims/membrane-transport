// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumLeakage_svg from '../../../../images/potassiumLeakage_svg.js';

import sodiumLeakage_svg from '../../../../images/sodiumLeakage_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import ProteinNode from './ProteinNode.js';

export default class LeakageChannelNode extends ProteinNode {

  public constructor( type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' ) {

    const image = new Image( type === 'sodiumIonLeakageChannel' ? sodiumLeakage_svg : potassiumLeakage_svg );
    super( image );
  }
}

membraneTransport.register( 'LeakageChannelNode', LeakageChannelNode );