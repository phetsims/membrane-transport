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
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import membraneChannels from '../../../membraneChannels.js';


type SelfOptions = {

  // The offset in view coordinates, describing how the protein sits on the membrane.
  // This is to compensate for the fact that not all artwork has to be centered.
  viewOffset?: Vector2;
};

type ParentOptions = NodeOptions;

type ProteinNodeOptions = SelfOptions & ParentOptions;

export default class ProteinNode extends InteractiveHighlighting( Node ) {

  public readonly viewOffset: Vector2;

  public constructor( providedOptions?: ProteinNodeOptions ) {
    const options = optionize<ProteinNodeOptions, SelfOptions, ParentOptions>()( {
      viewOffset: Vector2.ZERO
    }, providedOptions );
    super( options );

    this.viewOffset = options.viewOffset;
  }
}

membraneChannels.register( 'ProteinNode', ProteinNode );