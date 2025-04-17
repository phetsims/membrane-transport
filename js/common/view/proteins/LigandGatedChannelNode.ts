// Copyright 2025, University of Colorado Boulder

/**
 * Uses canvas to render a leakage channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumLigandGatedClosed_svg from '../../../../images/potassiumLigandGatedClosed_svg.js';
import potassiumLigandGatedOpen_svg from '../../../../images/potassiumLigandGatedOpen_svg.js';
import sodiumLigandGatedClosed_svg from '../../../../images/sodiumLigandGatedClosed_svg.js';
import sodiumLigandGatedOpen_svg from '../../../../images/sodiumLigandGatedOpen_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import LigandGatedChannel from '../../model/proteins/LigandGatedChannel.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class LigandGatedChannelNode extends TransportProteinNode {
  public constructor(
    public readonly type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel',
    public readonly channel: LigandGatedChannel | null
  ) {

    const image = new Image( type === 'sodiumIonLigandGatedChannel' ? sodiumLigandGatedClosed_svg : potassiumLigandGatedClosed_svg );
    super( image );

    if ( channel ) {
      channel.stateProperty.link( state => {
        image.image = type === 'sodiumIonLigandGatedChannel' ? ( state === 'ligandBoundOpen' || state === 'ligandUnboundOpen' ) ? sodiumLigandGatedOpen_svg : sodiumLigandGatedClosed_svg :
                      type === 'potassiumIonLigandGatedChannel' ? ( state === 'ligandBoundOpen' || state === 'ligandUnboundOpen' ) ? potassiumLigandGatedOpen_svg : potassiumLigandGatedClosed_svg :
                      ( () => { throw new Error( `Unrecognized ligand-gated channel type: ${type}` ); } )();
      }, { disposer: this } );

      channel.stateProperty.lazyLink( state => {
        if ( state === 'closed' ) {
          MembraneTransportSounds.channelClosed( type );
        }
        else if ( state === 'ligandBoundClosed' ) {
          MembraneTransportSounds.ligandBound();
        }
        else if ( state === 'ligandBoundOpen' ) {
          MembraneTransportSounds.channelOpened( type );
        }
        else if ( state === 'ligandUnboundOpen' ) {
          MembraneTransportSounds.ligandUnbound();
        }
      }, { disposer: this } );
    }
  }
}

membraneTransport.register( 'LigandGatedChannelNode', LigandGatedChannelNode );