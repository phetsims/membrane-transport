// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumPotassiumPump, used to represent the transport protein in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';

import naKPumpState1_svg from '../../../../images/naKPumpState1_svg.js';
import naKPumpState2_svg from '../../../../images/naKPumpState2_svg.js';
import naKPumpState3_svg from '../../../../images/naKPumpState3_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import SodiumPotassiumPump from '../../model/proteins/SodiumPotassiumPump.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class SodiumPotassiumPumpNode extends TransportProteinNode {

  public constructor( public readonly sodiumPotassiumPump: SodiumPotassiumPump | null ) {

    const image = new Image( naKPumpState1_svg );
    super( image );

    if ( sodiumPotassiumPump ) {
      sodiumPotassiumPump.stateProperty.link( state => {
        image.image = state === 'openToInsideEmpty' ? naKPumpState1_svg :
                      state === 'openToInsideSodiumBound' ? naKPumpState2_svg :
                      state === 'openToOutside' ? naKPumpState3_svg :
                      ( () => { throw new Error( 'Invalid state' ); } )();
      } );
    }
  }
}

membraneTransport.register( 'SodiumPotassiumPumpNode', SodiumPotassiumPumpNode );