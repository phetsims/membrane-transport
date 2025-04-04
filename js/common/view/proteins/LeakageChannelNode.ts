// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumLeakage_svg from '../../../../images/potassiumLeakage_svg.js';

import sodiumLeakage_svg from '../../../../images/sodiumLeakage_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import ProteinNode from './ProteinNode.js';

/**
 * Scenery Node for a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LeakageChannelNode extends ProteinNode {

  public constructor( type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel' ) {

    super();
    const image = new Image( type === 'sodiumIonLeakageChannel' ? sodiumLeakage_svg : potassiumLeakage_svg );

    // Scale down the SVG
    //TODO: @jessegreenberg: We are confused why we cannot use the same scale as in the canvas. The svgs are relatively sized correctly, so the same scale should work, but there must be some other scale at play.
    image.setScaleMagnitude( MembraneTransportConstants.TRANSPORT_PROTEIN_IMAGE_SCALE );

    this.addChild( image );
  }
}

membraneTransport.register( 'LeakageChannelNode', LeakageChannelNode );