// Copyright 2025, University of Colorado Boulder

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import membraneChannels from '../../membraneChannels.js';

/**
 * A target zone where a membrane channel can be dropped.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class TargetZoneNode extends Rectangle {
  public constructor( public readonly modelX: number, modelViewTransform: ModelViewTransform2 ) {
    super( 0, 0, 60, 80, 15, 10, {
      center: modelViewTransform.modelToViewXY( modelX, 0 ),
      stroke: 'blue',
      lineWidth: 2,
      lineDash: [ 4, 4 ],
      visible: false
    } );
  }
}

membraneChannels.register( 'TargetZoneNode', TargetZoneNode );