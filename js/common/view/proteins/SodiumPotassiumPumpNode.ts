// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumPotassiumPump, used to represent the transport protein in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import Text from '../../../../../scenery/js/nodes/Text.js';

import naKPumpState1_svg from '../../../../images/naKPumpState1_svg.js';
import naKPumpState2_svg from '../../../../images/naKPumpState2_svg.js';
import naKPumpState3_svg from '../../../../images/naKPumpState3_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import ProteinNode from './ProteinNode.js';

export default class SodiumPotassiumPumpNode extends ProteinNode {

  private readonly text: Text | null = null;
  private readonly image: Image;

  public constructor( public readonly sodiumPotassiumPump: SodiumPotassiumPump | null ) {

    super();
    this.image = new Image( naKPumpState1_svg );
    this.image.setScaleMagnitude( MembraneTransportConstants.TRANSPORT_PROTEIN_IMAGE_SCALE );

    this.addChild( this.image );

    if ( sodiumPotassiumPump ) {
      sodiumPotassiumPump.isOpenProperty.link( open => {
        this.image.image = open ? naKPumpState1_svg : naKPumpState2_svg;
      } );

      this.text = new Text( sodiumPotassiumPump.conformation );
      this.addChild( this.text );
    }
  }

  public override step( dt: number ): void {
    if ( this.sodiumPotassiumPump && this.text ) {
      this.text.string = this.sodiumPotassiumPump.conformation;
      this.image.image = this.sodiumPotassiumPump.conformation === 'awaiting-sodium' ? naKPumpState1_svg :
                         this.sodiumPotassiumPump.conformation === 'awaiting-phosphate' ? naKPumpState2_svg :
                         naKPumpState3_svg;
    }
  }
}

membraneTransport.register( 'SodiumPotassiumPumpNode', SodiumPotassiumPumpNode );