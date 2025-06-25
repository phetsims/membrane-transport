// Copyright 2025, University of Colorado Boulder

/**
 * Superclass for all protein Nodes on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import { ParallelDOMOptions } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import InteractiveHighlighting from '../../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import TransportProtein from '../../model/proteins/TransportProtein.js';

type SelfOptions = EmptySelfOptions;

type ProteinNodeOptions = SelfOptions & NodeOptions;

export default class TransportProteinNode extends InteractiveHighlighting( Node ) {

  protected constructor( image: Image, transportProtein: TransportProtein | null, providedOptions?: ProteinNodeOptions ) {
    const options = optionize<ProteinNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );
    super( options );

    // Scale down the SVG
    const modelWidth = MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH;
    const viewWidth = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.modelToViewDeltaX( modelWidth );

    assert && assert( image.width === 650, `By design, the images should be 650 pixels wide, this one was ${image.width}` );

    const viewScale = viewWidth / image.width;
    this.setScaleMagnitude( viewScale );

    this.addChild( image );

    // pdom - If there is a model representation this Node is in the membrane and is interactive.
    // It was found that the interactive protein should have the application role so that the
    // roledescription and accessible name are read.
    if ( transportProtein ) {
      this.mutate( combineOptions<ParallelDOMOptions>( {}, AccessibleDraggableOptions, {
        accessibleRoleDescription: 'navigable'
      } ) );
    }
  }

  public step( dt: number ): void {

    // override as needed
  }
}

membraneTransport.register( 'TransportProteinNode', TransportProteinNode );