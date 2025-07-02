// Copyright 2025, University of Colorado Boulder

/**
 * The model for a ligand, which can bind to the ligand gated channels to open them.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import membraneTransport from '../../membraneTransport.js';
import Particle from './Particle.js';
import { LigandType } from './SoluteType.js';

export default class Ligand extends Particle {

  public constructor(
    position: Vector2,
    public readonly ligandType: LigandType,
    model: PhetioObject
  ) {
    super( position, ligandType, model );
  }
}

membraneTransport.register( 'Ligand', Ligand );