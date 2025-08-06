// Copyright 2025, University of Colorado Boulder

/**
 * Scenery Node for a SodiumGlucoseCotransporter, used to represent the transport protein in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import Text from '../../../../../scenery/js/nodes/Text.js';

import sodiumGlucoseCotransporterState1_svg from '../../../../images/sodiumGlucoseCotransporterState1_svg.js';
import sodiumGlucoseCotransporterState3_svg from '../../../../images/sodiumGlucoseCotransporterState3_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import SodiumGlucoseCotransporter from '../../model/proteins/SodiumGlucoseCotransporter.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class SodiumGlucoseCotransporterNode extends TransportProteinNode {

  /**
   * @param sodiumGlucoseCotransporter - Use null for static icons. Provide a channel to update the view when the channel state changes.
   */
  public constructor( public readonly sodiumGlucoseCotransporter: SodiumGlucoseCotransporter | null ) {

    const image = new Image( sodiumGlucoseCotransporterState1_svg );
    super( image, sodiumGlucoseCotransporter );

    if ( sodiumGlucoseCotransporter ) {

      sodiumGlucoseCotransporter.stateProperty.link( state => {
        image.image = state === 'openToOutsideAwaitingParticles' ? sodiumGlucoseCotransporterState1_svg :
                      state === 'openToOutsideAllParticlesBound' ? sodiumGlucoseCotransporterState1_svg :
                      state === 'openToInside' ? sodiumGlucoseCotransporterState3_svg :
                      ( () => { throw new Error( 'Invalid state: ' + state ); } )();
      }, { disposer: this } );

      sodiumGlucoseCotransporter.stateProperty.lazyLink( ( state, oldState ) => {
        if ( state === 'openToInside' ) {
          MembraneTransportSounds.coTransporterChangedShape();
        }
      }, { disposer: this } );

      // Binding sounds
      sodiumGlucoseCotransporter.soluteBoundEmitter.addListener( particleType => {
        MembraneTransportSounds.particleBoundToSodiumGlucoseTransporter( particleType, sodiumGlucoseCotransporter.getFilledSodiumSiteCount() );
      } );

      const exclamationMark = new Text( '!', {
        font: new PhetFont( {
          size: 300,
          weight: 'bold'
        } ),
        fill: 'yellow',
        stroke: 'black',
        lineWidth: 10,
        centerX: image.centerX,
        bottom: image.height - 95, // Adjusted to position the exclamation mark correctly
        visibleProperty: sodiumGlucoseCotransporter.model.lessSodiumOutsideThanInsideProperty
      } );
      this.addChild( exclamationMark );

      this.disposeEmitter.addListener( () => {
        exclamationMark.dispose();
      } );
    }
  }
}

membraneTransport.register( 'SodiumGlucoseCotransporterNode', SodiumGlucoseCotransporterNode );