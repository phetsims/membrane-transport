// Copyright 2025, University of Colorado Boulder

/**
 * Superclass for all protein Nodes on the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import AccessibleInteractiveOptions from '../../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import { ParallelDOMOptions } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import InteractiveHighlighting from '../../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportFluent from '../../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import TransportProtein from '../../model/proteins/TransportProtein.js';

type SelfOptions = EmptySelfOptions;

type ProteinNodeOptions = SelfOptions & NodeOptions;

export default class TransportProteinNode extends InteractiveHighlighting( Node ) {

  /**
   * @param image
   * @param transportProtein - If null, this will be a static icon.
   * @param providedOptions
   */
  protected constructor( image: Image, transportProtein: TransportProtein<IntentionalAny> | null, providedOptions?: ProteinNodeOptions ) {
    const options = optionize<ProteinNodeOptions, SelfOptions, NodeOptions>()( {}, providedOptions );
    super( options );

    // Scale down the SVG
    const modelWidth = MembraneTransportConstants.TRANSPORT_PROTEIN_WIDTH;
    const viewWidth = MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM.modelToViewDeltaX( modelWidth );

    // All protein artwork must have the same width to ensure consistent scaling of transport proteins and correct relative sizing within each artwork
    affirm( image.width === 650, `By design, the images should be 650 view units wide, this one was ${image.width}` );

    const viewScale = viewWidth / image.width;
    this.setScaleMagnitude( viewScale );

    this.addChild( image );

    // pdom - If there is a model representation this Node is in the membrane and is interactive.
    if ( transportProtein ) {

      const showWarningProperty = new DerivedProperty( [ transportProtein.model.lessSodiumOutsideThanInsideProperty ], lessInside => {
        return lessInside ? 'shown' : 'hidden';
      } );
      const accessibleParagraphStringProperty = MembraneTransportFluent.a11y.transportProtein.accessibleParagraph.createProperty( {
        state: transportProtein.stateProperty,

        // This is only used in the pattern for ligand gated channels.
        proteinType: transportProtein.type === 'sodiumIonLigandGatedChannel' ? 'sodiumIonLigandGatedChannel' :
                     'potassiumIonLigandGatedChannel',

        // Only used for the sodium-glucose cotransporter. A warning is shown if there is less sodium outside than inside.
        warning: showWarningProperty
      } );

      this.addDisposable( accessibleParagraphStringProperty, showWarningProperty );

      this.mutate( combineOptions<ParallelDOMOptions>( {}, AccessibleInteractiveOptions, {
        accessibleRoleDescription: MembraneTransportFluent.a11y.navigableStringProperty,
        accessibleParagraph: accessibleParagraphStringProperty
      } ) );
    }
  }

  public step( dt: number ): void {

    // override as needed
  }
}

membraneTransport.register( 'TransportProteinNode', TransportProteinNode );