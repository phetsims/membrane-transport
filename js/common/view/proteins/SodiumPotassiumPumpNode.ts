// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumPotassiumPump, used to represent the channel in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';

import naKPumpState1_svg from '../../../../images/naKPumpState1_svg.js';
import naKPumpState2_svg from '../../../../images/naKPumpState2_svg.js';
import membraneChannels from '../../../membraneChannels.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import ProteinNode from './ProteinNode.js';

export default class SodiumPotassiumPumpNode extends ProteinNode {
  public constructor( channel: SodiumPotassiumPump | null ) {

    super();
    const image = new Image( naKPumpState1_svg );
    this.addChild( image );

    if ( channel ) {
      channel.isOpenProperty.link( open => {
        image.image = open ? naKPumpState1_svg : naKPumpState2_svg;
      } );
    }
  }
}

membraneChannels.register( 'SodiumPotassiumPumpNode', SodiumPotassiumPumpNode );