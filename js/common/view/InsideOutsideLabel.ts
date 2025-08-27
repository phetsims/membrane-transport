// Copyright 2025, University of Colorado Boulder

/**
 * Shows the inside and outside labels for the solute bar chart and in the observation window.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { LayoutNodeOptions } from '../../../../scenery/js/layout/nodes/LayoutNode.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';

export default class InsideOutsideLabel extends Panel {
  public constructor( side: 'inside' | 'outside', textMaxWidth: number, options?: LayoutNodeOptions ) {
    super( new Text( side === 'outside' ? MembraneTransportFluent.cellRegions.outsideStringProperty : MembraneTransportFluent.cellRegions.insideStringProperty, {
        fontSize: 13,
        maxWidth: textMaxWidth
      } ),

      // invisible panel just provides margins
      { stroke: null, fill: null } );

    options && this.mutate( options );
  }
}

membraneTransport.register( 'InsideOutsideLabel', InsideOutsideLabel );