// Copyright 2025, University of Colorado Boulder

import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import membraneChannels from '../../../membraneChannels.js';
import SodiumGlucoseCotransporter from '../../model/channels/SodiumGlucoseCotransporter.js';

/**
 * Scenery Node for a SodiumGlucoseCotransporter, used to represent the channel in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SodiumGlucoseCotransporterNode extends Node {
  public constructor( channel: SodiumGlucoseCotransporter | null ) {

    super();

    const rectangle = new Rectangle( 0, 0, 30, 80, { fill: 'rgba(0,255,0,0.2)', stroke: 'black', lineWidth: 1 } );
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

membraneChannels.register( 'SodiumGlucoseCotransporterNode', SodiumGlucoseCotransporterNode );