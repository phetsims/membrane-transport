// Copyright 2025, University of Colorado Boulder
/**
 * LigandNode is a node that represents a ligand in the simulation.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TProperty from '../../../../axon/js/TProperty.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import membraneChannels from '../../membraneChannels.js';
import Particle from '../model/Particle.js';
import { LigandType } from '../model/SoluteType.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Shape from '../../../../kite/js/Shape.js';
import Vector2 from '../../../../dot/js/Vector2.js';

class LigandNodeView extends Node {
  public constructor( providedOptions?: NodeOptions ) {
    super( providedOptions );

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

export default class LigandNode extends LigandNodeView {
  public constructor(
    areLigandsAddedProperty: TProperty<boolean>,
    private readonly ligands: Particle<LigandType>[],
    private readonly ligandIndex: number,
    private readonly modelViewTransform: ModelViewTransform2
  ) {
    super( {
      visibleProperty: areLigandsAddedProperty
    } );
  }

  public step( dt: number ): void {
    const ligand = this.ligands[ this.ligandIndex ];
    if ( ligand ) {
      this.center = this.modelViewTransform.modelToViewPosition( ligand.position );
    }
  }
}
membraneChannels.register( 'LigandNode', LigandNode );

export { LigandNodeView };