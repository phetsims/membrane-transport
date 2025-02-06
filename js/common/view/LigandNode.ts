// Copyright 2025, University of Colorado Boulder
/**
 * LigandNode is a node that represents a ligand in the simulation.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import membraneChannels from '../../membraneChannels.js';

export default class LigandNode extends Node {
  public constructor() {
    super();

    this.addChild( new Path( Shape.circle( 20 ), {
      fill: 'blue',
      stroke: 'black'
    } ) );
  }
}
membraneChannels.register( 'LigandNode', LigandNode );