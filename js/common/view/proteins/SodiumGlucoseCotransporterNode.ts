// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumGlucoseCotransporter, used to represent the transport protein in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';

import sodiumGlucoseCotransporterState1_svg from '../../../../images/sodiumGlucoseCotransporterState1_svg.js';
import sodiumGlucoseCotransporterState2_svg from '../../../../images/sodiumGlucoseCotransporterState2_svg.js';
import sodiumGlucoseCotransporterState3_svg from '../../../../images/sodiumGlucoseCotransporterState3_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import ProteinNode from './ProteinNode.js';

// TODO: It is unclear from the artwork how/when to show the different states
export default class SodiumGlucoseCotransporterNode extends ProteinNode {

  private readonly image: Image;

  public constructor( public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter | null ) {

    super();
    this.image = new Image( sodiumGlucoseCotransporterState1_svg );
    this.image.setScaleMagnitude( MembraneTransportConstants.TRANSPORT_PROTEIN_IMAGE_SCALE );

    this.addChild( this.image );
  }

  public override step( dt: number ): void {
    if ( this.sodiumGlucoseCotransporter ) {
      this.image.image = this.sodiumGlucoseCotransporter.stateProperty.value === 'openToOutside' ? sodiumGlucoseCotransporterState1_svg :
                         this.sodiumGlucoseCotransporter.stateProperty.value === 'openToInside' ? sodiumGlucoseCotransporterState3_svg :
                         sodiumGlucoseCotransporterState2_svg;
    }
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporterNode', SodiumGlucoseCotransporterNode );