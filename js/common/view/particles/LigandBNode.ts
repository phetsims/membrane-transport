// Copyright 2025, University of Colorado Boulder

/**
 * LigandBNode is a 4-pointed star-shaped ligand representation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import Shape from '../../../../../kite/js/Shape.js';
import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import LinearGradient from '../../../../../scenery/js/util/LinearGradient.js';
import membraneChannels from '../../../membraneChannels.js';

export default class LigandBNode extends Node {
  public constructor( providedOptions?: NodeOptions ) {
    super( providedOptions );
    const innerRadius = 4;
    const outerRadius = 14;

    this.addChild( new Path( Shape.polygon( [
      Vector2.createPolar( innerRadius, 0 * Math.PI / 4 ),
      Vector2.createPolar( outerRadius, 1 * Math.PI / 4 ),
      Vector2.createPolar( innerRadius, 2 * Math.PI / 4 ),
      Vector2.createPolar( outerRadius, 3 * Math.PI / 4 ),
      Vector2.createPolar( innerRadius, 4 * Math.PI / 4 ),
      Vector2.createPolar( outerRadius, 5 * Math.PI / 4 ),
      Vector2.createPolar( innerRadius, 6 * Math.PI / 4 ),
      Vector2.createPolar( outerRadius, 7 * Math.PI / 4 )
    ] ), {
      fill: new LinearGradient( -10, 0, 10, 0 ).addColorStop( 0, 'rgb(192,209,231)' ).addColorStop( 1, 'rgb(72,114,176)' ),
      stroke: 'black'
    } ) );
  }
}

membraneChannels.register( 'LigandBNode', LigandBNode );