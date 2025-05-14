// Copyright 2025, University of Colorado Boulder

/**
 * Artwork for the voltage-gated channel protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import sodiumVoltageGatedMinus50mV_svg from '../../../../images/sodiumVoltageGatedMinus50mV_svg.js';

import sodiumVoltageGatedMinus70mV_svg from '../../../../images/sodiumVoltageGatedMinus70mV_svg.js';
import sodiumVoltageGatedPlus30mV_svg from '../../../../images/sodiumVoltageGatedPlus30mV_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import SodiumVoltageGatedChannel from '../../model/proteins/SodiumVoltageGatedChannel.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class SodiumVoltageGatedChannelNode extends TransportProteinNode {

  /**
   * @param channel - Use null for static icons. Provide a channel to update the view when the channel state changes.
   */
  public constructor( channel: SodiumVoltageGatedChannel | null ) {

    const image = new Image( sodiumVoltageGatedMinus70mV_svg );
    super( image, channel, {
      viewOffset: new Vector2( 0, 15 )
    } );

    if ( channel ) {

      channel.stateProperty.link( state => {
        const newImage = ( state === 'closedNegative70mV' ? sodiumVoltageGatedMinus70mV_svg :
                           state === 'openNegative50mV' ? sodiumVoltageGatedMinus50mV_svg :
                           state === 'closed30mV' ? sodiumVoltageGatedPlus30mV_svg :
                           ( () => {throw new Error( 'unknown type of sodium voltage gated channel' );} )() );

        image.setImage( newImage );

      }, { disposer: this } );

      channel.stateProperty.lazyLink( state => {
        // choose open or closing sound based on the voltage
        // Since the state is linked before the view is created, we can rely on it having the correct value during this callback.
        // NOTE: this is a listener order dependency
        if ( state === 'openNegative50mV' ) {
          MembraneTransportSounds.channelOpened( 'sodiumIonVoltageGatedChannel' );
        }
        else {
          MembraneTransportSounds.channelClosed( 'sodiumIonVoltageGatedChannel' );
        }
      }, { disposer: this } );

    }
  }
}

membraneTransport.register( 'SodiumVoltageGatedChannelNode', SodiumVoltageGatedChannelNode );