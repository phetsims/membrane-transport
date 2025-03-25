// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../membraneTransport.js';
import Slot from '../model/Slot.js';

/**
 * A target zone where a membrane channel can be dropped. When the user drags a membrane channel toward this slot, it
 * shows a different highlight to indicate it will be dropped into.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SlotDragIndicatorNode extends Rectangle {

  public constructor( public readonly slot: Slot, modelViewTransform: ModelViewTransform2 ) {

    // In view coordinates, the area for a slot that can contain a membrane channel
    super( 0, 0, 65, 90, 15, 10, {
      center: modelViewTransform.modelToViewXY( slot.position, 0 ),
      stroke: 'blue',
      lineWidth: 2,
      lineDash: [ 4, 4 ],

      // Only shown when the user is dragging a membrane toward it
      visible: false
    } );
  }
}

membraneTransport.register( 'SlotDragIndicatorNode', SlotDragIndicatorNode );