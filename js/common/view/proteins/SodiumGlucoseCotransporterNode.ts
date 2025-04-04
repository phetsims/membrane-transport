// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumGlucoseCotransporter, used to represent the transport protein in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';

// TODO: @Brett At a meeting, we decided to call it "sodiumGlucoseCotransporter" but the artwork came in as "glucoseSodiumCotransporter", which should we go with?
import glucoseSodiumCotransporterState1_svg from '../../../../images/glucoseSodiumCotransporterState1_svg.js';
import glucoseSodiumCotransporterState2_svg from '../../../../images/glucoseSodiumCotransporterState2_svg.js';
import glucoseSodiumCotransporterState3_svg from '../../../../images/glucoseSodiumCotransporterState3_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import ProteinNode from './ProteinNode.js';

export default class SodiumGlucoseCotransporterNode extends ProteinNode {

  private readonly image: Image;

  public constructor( public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter | null ) {

    super();
    this.image = new Image( glucoseSodiumCotransporterState1_svg );
    this.image.setScaleMagnitude( MembraneTransportConstants.TRANSPORT_PROTEIN_IMAGE_SCALE );

    this.addChild( this.image );
  }

  public override step( dt: number ): void {
    if ( this.sodiumGlucoseCotransporter ) {
      console.log( this.sodiumGlucoseCotransporter.conformation );
      this.image.image = this.sodiumGlucoseCotransporter.conformation === 'awaiting-sodium' ? glucoseSodiumCotransporterState1_svg :
                         this.sodiumGlucoseCotransporter.conformation === 'awaiting-glucose' ? glucoseSodiumCotransporterState2_svg :
                         glucoseSodiumCotransporterState3_svg;
    }
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporterNode', SodiumGlucoseCotransporterNode );