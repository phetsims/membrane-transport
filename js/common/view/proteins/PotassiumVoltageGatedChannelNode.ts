// Copyright 2025, University of Colorado Boulder

/**
 * Artwork for the voltage-gated channel protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumVoltageGatedMinus70and50mV_svg from '../../../../images/potassiumVoltageGatedMinus70and50mV_svg.js';
import potassiumVoltageGatedPlus30mV_svg from '../../../../images/potassiumVoltageGatedPlus30mV_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import PotassiumVoltageGatedChannel from '../../model/proteins/PotassiumVoltageGatedChannel.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class PotassiumVoltageGatedChannelNode extends TransportProteinNode {

  /**
   * @param channel - Use null for static icons. Provide a channel to update the view when the channel state changes.
   */
  public constructor( channel: PotassiumVoltageGatedChannel | null ) {

    const image = new Image( potassiumVoltageGatedMinus70and50mV_svg );
    super( image );

    if ( channel ) {

      channel.stateProperty.link( state => {
        const newImage = ( state === 'closedNegative70mV' ? potassiumVoltageGatedMinus70and50mV_svg :
                           state === 'closedNegative50mV' ? potassiumVoltageGatedMinus70and50mV_svg :
                           state === 'open30mV' ? potassiumVoltageGatedPlus30mV_svg :
                           ( () => {throw new Error( 'unknown type of sodium voltage gated channel' );} )() );

        image.setImage( newImage );
      }, { disposer: this } );

      channel.stateProperty.lazyLink( ( state, oldState ) => {

        // choose open or closing sound based on the voltage
        // Since the state is linked before the view is created, we can rely on it having the correct value during this callback.
        // NOTE: this is a listener order dependency
        if ( state === 'open30mV' ) {
          MembraneTransportSounds.channelOpened( 'potassiumIonVoltageGatedChannel' );
        }
        else if ( oldState === 'open30mV' ) {

          // Only play a sound on conformation change. The closed both have the same conformation.
          MembraneTransportSounds.channelClosed( 'potassiumIonVoltageGatedChannel' );
        }
      }, { disposer: this } );
    }
  }
}

membraneTransport.register( 'PotassiumVoltageGatedChannelNode', PotassiumVoltageGatedChannelNode );