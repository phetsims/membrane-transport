// Copyright 2025, University of Colorado Boulder

/**
 * A target zone where a membrane transport protein can be dropped. When the user drags a transport protein toward this slot, it
 * shows a different highlight to indicate it will be dropped into.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneTransport from '../../membraneTransport.js';
import Slot from '../model/Slot.js';

export default class SlotDragIndicatorNode extends Rectangle {

  public constructor( public readonly slot: Slot, modelViewTransform: ModelViewTransform2 ) {

    // In view coordinates, the area for a slot that can contain a transport protein
    super( 0, 0, 65, 105, 15, 10, {
      center: modelViewTransform.modelToViewXY( slot.position, 0 ),
      stroke: 'blue',
      lineWidth: 4,
      lineDash: [ 4, 4 ],
      fill: 'rgba( 0, 0, 255, 0.2 )', // Light blue fill

      // Only shown when the user is dragging a membrane toward it
      visible: false
    } );
  }
}

membraneTransport.register( 'SlotDragIndicatorNode', SlotDragIndicatorNode );