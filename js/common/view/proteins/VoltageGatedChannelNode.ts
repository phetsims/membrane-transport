// Copyright 2025, University of Colorado Boulder

/**
 * Artwork for the voltage gated channel protein.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumVoltageGatedMinus70and50mV_svg from '../../../../images/potassiumVoltageGatedMinus70and50mV_svg.js';
import potassiumVoltageGatedPlus30mV_svg from '../../../../images/potassiumVoltageGatedPlus30mV_svg.js';
import sodiumVoltageGatedMinus50mV_svg from '../../../../images/sodiumVoltageGatedMinus50mV_svg.js';

import sodiumVoltageGatedMinus70mV_svg from '../../../../images/sodiumVoltageGatedMinus70mV_svg.js';
import sodiumVoltageGatedPlus30mV_svg from '../../../../images/sodiumVoltageGatedPlus30mV_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import VoltageGatedChannel from '../../model/proteins/VoltageGatedChannel.js';
import ProteinNode from './ProteinNode.js';

export default class VoltageGatedChannelNode extends ProteinNode {

  public constructor( public readonly type: 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel', channel: VoltageGatedChannel | null ) {

    const image = new Image( type === 'sodiumIonVoltageGatedChannel' ? sodiumVoltageGatedMinus70mV_svg : potassiumVoltageGatedMinus70and50mV_svg );
    super( image );

    if ( channel ) {

      channel.model.membraneVoltagePotentialProperty.link( membraneVoltagePotential => {
        image.image = type === 'sodiumIonVoltageGatedChannel' ?
                           ( membraneVoltagePotential === -70 ? sodiumVoltageGatedMinus70mV_svg :
                             membraneVoltagePotential === -50 ? sodiumVoltageGatedMinus50mV_svg :
                             membraneVoltagePotential === 30 ? sodiumVoltageGatedPlus30mV_svg :
                             ( () => {throw new Error( 'unknown type of sodium voltage gated channel' );} )() ) :
                           type === 'potassiumIonVoltageGatedChannel' ?
                           ( membraneVoltagePotential === -70 || membraneVoltagePotential === -50 ? potassiumVoltageGatedMinus70and50mV_svg :
                             membraneVoltagePotential === 30 ? potassiumVoltageGatedPlus30mV_svg :
                             ( () => {throw new Error( 'unknown type of potassium voltage gated channel' );} )() ) :
                           ( () => {throw new Error( 'unknown type of voltage gated channel' );} )();
      }, { disposer: this } );

      // This link does not need to by disposed because the channel itself will be disposed when it is removed from the membrane.
      channel.stateProperty.lazyLink( state => {
        if ( state === 'open' ) {
          MembraneTransportSounds.channelOpened( type );
        }
        else {
          MembraneTransportSounds.channelClosed( type );
        }
      } );
    }
  }
}

membraneTransport.register( 'VoltageGatedChannelNode', VoltageGatedChannelNode );