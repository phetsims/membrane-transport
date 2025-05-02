// Copyright 2025, University of Colorado Boulder

/**
 * Artwork for the voltage-gated channel protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumVoltageGatedMinus70and50mV_svg from '../../../../images/potassiumVoltageGatedMinus70and50mV_svg.js';
import potassiumVoltageGatedPlus30mV_svg from '../../../../images/potassiumVoltageGatedPlus30mV_svg.js';
import sodiumVoltageGatedMinus50mV_svg from '../../../../images/sodiumVoltageGatedMinus50mV_svg.js';

import sodiumVoltageGatedMinus70mV_svg from '../../../../images/sodiumVoltageGatedMinus70mV_svg.js';
import sodiumVoltageGatedPlus30mV_svg from '../../../../images/sodiumVoltageGatedPlus30mV_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import VoltageGatedChannel from '../../model/proteins/VoltageGatedChannel.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class VoltageGatedChannelNode extends TransportProteinNode {

  /**
   * @param type
   * @param channel - Use null for static icons. Provide a channel to update the view when the channel state changes.
   */
  public constructor( public readonly type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', channel: VoltageGatedChannel | null ) {

    const image = new Image( type === 'sodiumIonVoltageGatedChannel' ? sodiumVoltageGatedMinus70mV_svg : potassiumVoltageGatedMinus70and50mV_svg );
    super( image, {
      viewOffset: type === 'sodiumIonVoltageGatedChannel' ? new Vector2( 0, 15 ) : Vector2.ZERO
    } );

    if ( channel ) {

      channel.model.membraneVoltagePotentialProperty.link( membraneVoltagePotential => {
        const newImage = type === 'sodiumIonVoltageGatedChannel' ?
                         ( membraneVoltagePotential === -70 ? sodiumVoltageGatedMinus70mV_svg :
                           membraneVoltagePotential === -50 ? sodiumVoltageGatedMinus50mV_svg :
                           membraneVoltagePotential === 30 ? sodiumVoltageGatedPlus30mV_svg :
                           ( () => {throw new Error( 'unknown type of sodium voltage gated channel' );} )() ) :
                         type === 'potassiumIonVoltageGatedChannel' ?
                         ( membraneVoltagePotential === -70 || membraneVoltagePotential === -50 ? potassiumVoltageGatedMinus70and50mV_svg :
                           membraneVoltagePotential === 30 ? potassiumVoltageGatedPlus30mV_svg :
                           ( () => {throw new Error( 'unknown type of potassium voltage gated channel' );} )() ) :
                         ( () => {throw new Error( 'unknown type of voltage gated channel' );} )();

        // If the image changed, that means there was a conformation change. In that case, we play a sound, even if
        // the state changed from closed => closed.
        if ( image.image !== newImage ) {
          image.setImage( newImage );

          // choose open or closing sound based on the voltage
          // Since the state is linked before the view is created, we can rely on it having the correct value during this callback.
          // NOTE: this is a listener order dependency
          const state = channel.stateProperty.value;
          if ( state === 'open' ) {
            MembraneTransportSounds.channelOpened( type );
          }
          else {
            MembraneTransportSounds.channelClosed( type );
          }
        }

      }, { disposer: this } );
    }
  }
}

membraneTransport.register( 'VoltageGatedChannelNode', VoltageGatedChannelNode );