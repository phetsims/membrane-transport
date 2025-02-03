// Copyright 2025, University of Colorado Boulder
/**
 * LigandNode is a node that represents a ligand in the simulation.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
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