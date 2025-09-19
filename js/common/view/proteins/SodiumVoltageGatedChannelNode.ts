// Copyright 2025, University of Colorado Boulder

/**
 * Artwork for the voltage-gated channel protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import sodiumVoltageGatedClosed_svg from '../../../../images/sodiumVoltageGatedClosed_svg.js';
import sodiumVoltageGatedOpen_svg from '../../../../images/sodiumVoltageGatedOpen_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import SodiumVoltageGatedChannel from '../../model/proteins/SodiumVoltageGatedChannel.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class SodiumVoltageGatedChannelNode extends TransportProteinNode {

  /**
   * @param channel - Use null for static icons. Provide a channel to update the view when the channel state changes.
   */
  public constructor( channel: SodiumVoltageGatedChannel | null ) {

    const image = new Image( sodiumVoltageGatedClosed_svg );
    super( image, channel );

    if ( channel ) {

      channel.stateProperty.link( state => {
        const newImage = ( state === 'closedNegative70mV' ? sodiumVoltageGatedClosed_svg :
                           state === 'openNegative50mV' ? sodiumVoltageGatedOpen_svg :
                           state === 'closed30mV' ? sodiumVoltageGatedClosed_svg :
                           ( () => {throw new Error( 'unknown type of sodium voltage gated channel' );} )() );

        image.setImage( newImage );

      }, { disposer: this } );

      channel.stateProperty.lazyLink( ( state, oldState ) => {

        // choose open or closing sound based on the voltage
        // Since the state is linked before the view is created, we can rely on it having the correct value during this callback.
        // NOTE: this is a listener order dependency
        if ( state === 'openNegative50mV' ) {
          MembraneTransportSounds.channelOpened( 'sodiumIonVoltageGatedChannel' );
        }
        else if ( oldState === 'openNegative50mV' ) {

          // Only play a sound on conformation change. The closed both have the same conformation.
          MembraneTransportSounds.channelClosed( 'sodiumIonVoltageGatedChannel' );
        }
      }, { disposer: this } );

    }
  }
}

membraneTransport.register( 'SodiumVoltageGatedChannelNode', SodiumVoltageGatedChannelNode );