// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel, { TargetKey } from '../model/MembraneChannelsModel.js';

/**
 * Provides scenery interoperability for membrane channels on the membrane, even though they are rendered in the canvas.
 *
 * This provides the following functionality:
 * 1. Acts like a tool icon node, so that when the user drags off of it, it pulls off the membrane channel, and creates
 *    the forwarded drag node.
 * 2. Provides keyboard focus and navigability.
 *
 * TODO: Combine with TargetZoneNode or explain why separate
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class MembraneProteinInteractionNode extends Rectangle {
  public constructor( model: MembraneChannelsModel, public readonly targetKey: TargetKey, modelViewTransform: ModelViewTransform2 ) {
    super( 0, 0, 60, 80, 15, 10, {
      center: modelViewTransform.modelToViewXY( MembraneChannelsModel.getPositionForTargetKey( targetKey ), 0 ),

      // TODO: Turn off these debugging display properties
      stroke: 'blue',
      lineWidth: 2,
      opacity: 0,
      lineDash: [ 4, 4 ],
      cursor: 'pointer',

      // Only focus if it has a membrane channel.
      focusable: false,
      pickable: false,
      tagName: 'div' // arrow keys move it, escape moves it back to toolbox.
    } );

    model.targetChangedEmitter.addListener( () => {
      this.focusable = model.isTargetFilled( targetKey );
      this.pickable = this.focusable;
    } );

    // pdom - When the "down" arrow is pressed on the group of tabs, move focus to the selected panel
    // TODO: Move this node or focus a different node? Does it matter?
    // TODO: There is discussion about switching to the GroupSortInteraction
    this.addInputListener( new KeyboardListener( {
      keys: [ 'arrowRight' ],
      fire: () => {

        const m = model.getLeftmostEmptyTarget();
        if ( m !== null ) {
          model.setTarget( m, model.getTarget( targetKey ) );
          model.setTarget( targetKey, null );
        }
      }
    } ) );
  }
}

membraneChannels.register( 'MembraneProteinInteractionNode', MembraneProteinInteractionNode );