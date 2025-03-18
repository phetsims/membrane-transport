// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumPotassiumPump, used to represent the channel in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import membraneChannels from '../../../membraneChannels.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import ProteinNode from './ProteinNode.js';

export default class SodiumPotassiumPumpNode extends ProteinNode {
  public constructor( channel: SodiumPotassiumPump | null ) {

    super();

    const rectangle = new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,0,255,0.2)', stroke: 'black', lineWidth: 1 } );
    this.addChild( rectangle );

    const text = new Text( 'closed', {
      center: rectangle.center
    } );
    this.addChild( text );

    if ( channel ) {
      channel.isOpenProperty.link( open => {
        text.string = open ? 'open' : 'closed';
      } );
    }
  }
}

membraneChannels.register( 'SodiumPotassiumPumpNode', SodiumPotassiumPumpNode );