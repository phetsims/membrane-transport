// Copyright 2025, University of Colorado Boulder

/**
 * The model for a solute, which can be added by the user, and diffuse across the membrane or transport through the
 * transport proteins.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import membraneTransport from '../../membraneTransport.js';
import Particle from './Particle.js';
import SoluteType from './SoluteType.js';

export default class Solute extends Particle {

  public constructor(
    position: Vector2,
    public readonly soluteType: SoluteType,
    model: PhetioObject
  ) {
    super( position, soluteType, model );
  }
}

membraneTransport.register( 'Solute', Solute );