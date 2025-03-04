// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../membraneChannels.js';
import Slot from '../model/Slot.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

/**
 * A target zone where a membrane channel can be dropped. When the user drags a membrane channel toward this slot, it
 * shows a different highlight to indicate it will be dropped into.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SlotDragIndicatorNode extends Rectangle {

  // TODO: Can we remove the model argument? There may be several unused model arguments now that Slot is a dedicated class.
  public constructor( public readonly slot: Slot, model: MembraneChannelsModel, modelViewTransform: ModelViewTransform2 ) {

    // TODO: Model bounds? We decided proteins will have the same model width footprint, but that should be factored out.
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

membraneChannels.register( 'SlotDragIndicatorNode', SlotDragIndicatorNode );