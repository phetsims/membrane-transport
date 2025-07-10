// Copyright 2025, University of Colorado Boulder

/**
 * Shows the inside and outside labels for the solute bar chart and in the observation window.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { LayoutNodeOptions } from '../../../../scenery/js/layout/nodes/LayoutNode.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import Panel from '../../../../sun/js/Panel.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';

const panelOptions = { cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS, stroke: null, fill: Color.WHITE.withAlpha( 0.4 ) };

export default class InsideOutsideLabel extends Panel {
  public constructor( side: 'inside' | 'outside', textMaxWidth: number, options?: LayoutNodeOptions ) {
    super( new Text( side === 'outside' ? MembraneTransportFluent.outsideStringProperty : MembraneTransportFluent.insideStringProperty, {
      fontSize: 13,
      maxWidth: textMaxWidth
    } ), panelOptions );

    options && this.mutate( options );
  }
}

membraneTransport.register( 'InsideOutsideLabel', InsideOutsideLabel );