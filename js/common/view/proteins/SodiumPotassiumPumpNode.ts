// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumPotassiumPump, used to represent the channel in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import Text from '../../../../../scenery/js/nodes/Text.js';

import naKPumpState1_svg from '../../../../images/naKPumpState1_svg.js';
import naKPumpState2_svg from '../../../../images/naKPumpState2_svg.js';
import naKPumpState3_svg from '../../../../images/naKPumpState3_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import ProteinNode from './ProteinNode.js';

export default class SodiumPotassiumPumpNode extends ProteinNode {

  private readonly text: Text | null = null;
  private image: Image;

  public constructor( public readonly channel: SodiumPotassiumPump | null ) {

    super();
    this.image = new Image( naKPumpState1_svg );
    this.addChild( this.image );

    if ( channel ) {
      channel.isOpenProperty.link( open => {
        this.image.image = open ? naKPumpState1_svg : naKPumpState2_svg;
      } );

      this.text = new Text( channel.conformation );
      this.addChild( this.text );
    }
  }

  public override step( dt: number ): void {
    if ( this.channel && this.text ) {
      this.text.string = this.channel.conformation;
      this.image.image = this.channel.conformation === 'awaiting-sodium' ? naKPumpState1_svg :
                         this.channel.conformation === 'awaiting-phosphate' ? naKPumpState2_svg :
                         naKPumpState3_svg;
    }
  }
}

membraneTransport.register( 'SodiumPotassiumPumpNode', SodiumPotassiumPumpNode );