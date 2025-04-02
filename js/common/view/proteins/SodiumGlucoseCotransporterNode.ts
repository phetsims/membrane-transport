// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumGlucoseCotransporter, used to represent the transport protein in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import membraneTransport from '../../../membraneTransport.js';
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import ProteinNode from './ProteinNode.js';

export default class SodiumGlucoseCotransporterNode extends ProteinNode {
  public constructor( sodiumGlucoseCotransporter: SodiumGlucoseCotransporter | null ) {

    super();

    const rectangle = new Rectangle( 0, 0, 30, 60, { fill: 'rgba(0,255,0,0.2)', stroke: 'black', lineWidth: 1 } );
    this.addChild( rectangle );

    const text = new Text( 'closed', {
      center: rectangle.center
    } );
    this.addChild( text );

    if ( sodiumGlucoseCotransporter ) {
      sodiumGlucoseCotransporter.isOpenProperty.link( open => {
        text.string = open ? 'open' : 'closed';
      } );
    }
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporterNode', SodiumGlucoseCotransporterNode );