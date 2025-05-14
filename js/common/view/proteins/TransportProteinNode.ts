// Copyright 2025, University of Colorado Boulder

/**
 * Superclass for all protein Nodes on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import InteractiveHighlighting from '../../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import TransportProtein from '../../model/proteins/TransportProtein.js';


type SelfOptions = {

  // The offset in view coordinates, describing how the protein sits on the membrane.
  // This is to compensate for the fact that not all artwork has to be centered.
  viewOffset?: Vector2;
};

type ProteinNodeOptions = SelfOptions & NodeOptions;

export default class TransportProteinNode extends InteractiveHighlighting( Node ) {

  public readonly viewOffset: Vector2;

  protected constructor( image: Image, transportProtein: TransportProtein | null, providedOptions?: ProteinNodeOptions ) {
    const options = optionize<ProteinNodeOptions, SelfOptions, NodeOptions>()( {
      viewOffset: Vector2.ZERO
    }, providedOptions );
    super( options );

    this.viewOffset = options.viewOffset;

    // Scale down the SVG
    const modelWidth = MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH;
    const viewWidth = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.modelToViewDeltaX( modelWidth );

    assert && assert( image.width === 650, `By design, the images should be 650 pixels wide, this one was ${image.width}` );

    const viewScale = viewWidth / image.width;
    this.setScaleMagnitude( viewScale );

    this.addChild( image );

    // pdom - If there is a model representation this Node is in the membrane and is interactive.
    transportProtein && this.setTagName( 'div' );
  }

  public step( dt: number ): void {

    // override as needed
  }
}

membraneTransport.register( 'TransportProteinNode', TransportProteinNode );