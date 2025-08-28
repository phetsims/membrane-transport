// Copyright 2025, University of Colorado Boulder

/**
 * Show a "Space to grab or release" cue when a transport protein toolbox tool has focus. Hide the cue after keyboard interaction.
 * Restore the cue on reset.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';

export default class TransportProteinToolboxGrabCueNode extends GrabReleaseCueNode {

  public readonly hasInteractedProperty = new BooleanProperty( false );
  private readonly anyToolNodeHasFocusProperty: TReadOnlyProperty<boolean>;

  public constructor( transportProteinToolNodes: Node[], tandem?: Tandem ) {

    super( {
      tandem: tandem
    } );

    // Create a property that tracks if any tool has focus
    this.anyToolNodeHasFocusProperty = DerivedProperty.or( transportProteinToolNodes.map( node => node.focusedProperty ) );

    // Visibility: only show if NOT interacted AND a tool has focus
    Multilink.multilink( [ this.hasInteractedProperty, this.anyToolNodeHasFocusProperty ], ( hasInteracted, anyNodeHasFocus ) => {
        this.visible = !hasInteracted && anyNodeHasFocus;
      }
    );

    // Listen to focus changes to update position when a tool gains focus
    transportProteinToolNodes.forEach( toolNode => {
      toolNode.focusedProperty.link( focused => {
        if ( focused && !this.hasInteractedProperty.value ) {
          this.updatePosition( toolNode );
        }
      } );
    } );
  }

  /**
   * For the y-coordinate, center the cue on the focused node. The x-coordinate is set in MembraneTransportScreenView.
   */
  private updatePosition( focusedNode: Node ): void {
    this.centerY = focusedNode.centerY;

    const globalBounds = focusedNode.globalBounds;
    const parentBounds = this.globalToParentBounds( globalBounds );

    this.centerY = parentBounds.centerY;
  }

  public createdFromKeyboard(): void {
    this.hasInteractedProperty.value = true;
  }

  public reset(): void {
    this.hasInteractedProperty.reset();
  }
}

membraneTransport.register( 'TransportProteinToolboxGrabCueNode', TransportProteinToolboxGrabCueNode );