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
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class SodiumGlucoseCotransporterNode extends TransportProteinNode {
  public constructor( public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter | null ) {

    const image = new Image( sodiumGlucoseCotransporterState1_svg );
    super( image );

    if ( sodiumGlucoseCotransporter ) {

      // TODO (SR): We only need two states for this, design team said we can remove the
      //   sodiumGlucoseCotransporterState2_svg https://github.com/phetsims/membrane-transport/issues/86
      sodiumGlucoseCotransporter.stateProperty.link( state => {
        image.image = state === 'openToOutside' ? sodiumGlucoseCotransporterState1_svg :
                      state === 'openToInside' ? sodiumGlucoseCotransporterState3_svg :
                      sodiumGlucoseCotransporterState2_svg;
      }, { disposer: this } );
    }
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporterNode', SodiumGlucoseCotransporterNode );