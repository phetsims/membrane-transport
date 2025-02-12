// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

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
  public constructor( model: MembraneChannelsModel, public readonly modelX: number, modelViewTransform: ModelViewTransform2 ) {
    super( 0, 0, 60, 80, 15, 10, {
      center: modelViewTransform.modelToViewXY( modelX, 0 ),
      stroke: 'blue',
      lineWidth: 2,
      lineDash: [ 4, 4 ],
      cursor: 'pointer',

      // Only focus if it has a membrane channel.
      focusable: false,
      tagName: 'div' // arrow keys move it, escape moves it back to toolbox.
    } );

    model.targetChangedEmitter.addListener( () => {
      this.focusable = model.targets.get( modelX ) !== null;
    } );

    // pdom - When the "down" arrow is pressed on the group of tabs, move focus to the selected panel
    this.addInputListener( new KeyboardListener( {
      keys: [ 'arrowRight' ],
      fire: () => {

        // TODO: Move this node or focus a different node? Does it matter?
        console.log( 'right' );


        const m = model.getLeftmostEmptyTarget();
        if ( m !== undefined ) {
          model.targets.set( m, model.targets.get( modelX ) || null );
          model.targets.set( modelX, null );

          model.targetChangedEmitter.emit();
        }
      }
    } ) );
  }
}

membraneChannels.register( 'MembraneProteinInteractionNode', MembraneProteinInteractionNode );