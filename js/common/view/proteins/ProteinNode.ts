// Copyright 2025, University of Colorado Boulder

/**
 * Superclass for all protein Nodes on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { equalsEpsilon } from '../../../../../dot/js/util/equalsEpsilon.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import InteractiveHighlighting from '../../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';


type SelfOptions = {

  // The offset in view coordinates, describing how the protein sits on the membrane.
  // This is to compensate for the fact that not all artwork has to be centered.
  viewOffset?: Vector2;
};

type ProteinNodeOptions = SelfOptions & NodeOptions;

// TODO: Rename TransportProteinNode
export default class ProteinNode extends InteractiveHighlighting( Node ) {

  public readonly viewOffset: Vector2;

  protected constructor( image: Image, providedOptions?: ProteinNodeOptions ) {
    const options = optionize<ProteinNodeOptions, SelfOptions, NodeOptions>()( {
      viewOffset: Vector2.ZERO
    }, providedOptions );
    super( options );

    this.viewOffset = options.viewOffset;

    // Scale down the SVG
    const modelWidth = MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH;
    const viewWidth = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.modelToViewDeltaX( modelWidth );

    // TODO: Can all images be the same width? We found one that is one pixel wider than the others.
    assert && assert( equalsEpsilon( image.width, 650, 1 ),
      'We are assuming that all images have the same width so they are all scaled about the same amount. The image should be 650 pixels wide.'
    );

    const viewScale = viewWidth / image.width;
    this.setScaleMagnitude( viewScale );

    this.addChild( image );
  }

  public step( dt: number ): void {

    // override as needed
  }
}

membraneTransport.register( 'ProteinNode', ProteinNode );