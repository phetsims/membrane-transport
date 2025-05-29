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
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';

const textOptions = { fontSize: 13, maxWidth: 200 };
const panelOptions = { cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS, stroke: null, fill: Color.WHITE.withAlpha( 0.3 ) };

export default class InsideOutsideLabel extends Panel {
  public constructor( side: 'inside' | 'outside', options?: LayoutNodeOptions ) {
    super( new Text( side === 'outside' ? MembraneTransportStrings.outsideStringProperty : MembraneTransportStrings.insideStringProperty, textOptions ), panelOptions );

    options && this.mutate( options );
  }
}

membraneTransport.register( 'InsideOutsideLabel', InsideOutsideLabel );