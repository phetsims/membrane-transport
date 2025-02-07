// Copyright 2025, University of Colorado Boulder
/**
 * LigandNode is a node that represents a ligand in the simulation.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

export default class LigandNode extends Node {
  public constructor( model: MembraneChannelsModel ) {
    super( {
      visibleProperty: model.areLigandsAddedProperty
    } );

    this.addChild( new Path( Shape.polygon( [
      new Vector2( 0, 0 ),
      new Vector2( 10, 15 ),
      new Vector2( -10, 15 )
    ] ), {
      fill: new LinearGradient( -10, 0, 10, 0 ).addColorStop( 0, 'rgb(254,241,227)' ).addColorStop( 1, 'rgb(246,148,72)' ),
      stroke: 'black'
    } ) );

  }
}
membraneChannels.register( 'LigandNode', LigandNode );