// Copyright 2025-2026, University of Colorado Boulder

/**
 * A styled exclamation mark Text node used to draw attention to conditions in the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';

export default class ExclamationMarkNode extends Text {
  public constructor( options?: TextOptions ) {

    // Not internationalized since it is just used like an icon.
    super( '!', {
      font: new PhetFont( {
        size: 300,
        weight: 'bold'
      } ),
      fill: 'yellow',
      stroke: 'black',
      lineWidth: 10
    } );

    options && this.mutate( options );
  }
}
