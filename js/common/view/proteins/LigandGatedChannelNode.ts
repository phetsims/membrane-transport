// Copyright 2025, University of Colorado Boulder

import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumLigandGatedClosed_svg from '../../../../images/potassiumLigandGatedClosed_svg.js';
import potassiumLigandGatedOpen_svg from '../../../../images/potassiumLigandGatedOpen_svg.js';
import sodiumLigandGatedClosed_svg from '../../../../images/sodiumLigandGatedClosed_svg.js';
import sodiumLigandGatedOpen_svg from '../../../../images/sodiumLigandGatedOpen_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import LigandGatedChannel from '../../model/proteins/LigandGatedChannel.js';
import ProteinNode from './ProteinNode.js';

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export default class LigandGatedChannelNode extends ProteinNode {

  private readonly image: Image;

  public constructor(
    public readonly type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel',
    public readonly channel: LigandGatedChannel | null
  ) {

    super();
    this.image = new Image( type === 'sodiumIonLigandGatedChannel' ? sodiumLigandGatedClosed_svg : potassiumLigandGatedClosed_svg );
    this.image.setScaleMagnitude( MembraneTransportConstants.TRANSPORT_PROTEIN_IMAGE_SCALE );

    this.addChild( this.image );
    if ( channel ) {
      channel.stateProperty.link( state => {
        this.image.image = type === 'sodiumIonLigandGatedChannel' ? ( state === 'ligandBoundOpen' || state === 'ligandUnboundOpen' ) ? sodiumLigandGatedOpen_svg : sodiumLigandGatedClosed_svg :
                           type === 'potassiumIonLigandGatedChannel' ? ( state === 'ligandBoundOpen' || state === 'ligandUnboundOpen' ) ? potassiumLigandGatedOpen_svg : potassiumLigandGatedClosed_svg :
                           ( () => { throw new Error( `Unrecognized ligand-gated channel type: ${type}` ); } )();
      } );

      channel.stateProperty.lazyLink( state => {
        if ( state === 'closed' ) {
          MembraneTransportSounds.channelClosed();
        }
        else if ( state === 'ligandBoundClosed' ) {
          MembraneTransportSounds.ligandBound();
        }
        else if ( state === 'ligandBoundOpen' ) {
          MembraneTransportSounds.channelOpened();
        }
        else if ( state === 'ligandUnboundOpen' ) {
          MembraneTransportSounds.ligandUnbound();
        }
      } );
    }
  }
}

membraneTransport.register( 'LigandGatedChannelNode', LigandGatedChannelNode );