// Copyright 2025, University of Colorado Boulder

/**
 * A map of solute type to the dimension of the artwork so that we can create bounds in the model that accurately
 * match the artwork.
 * NOTE: When loading SVG files (and maybe PNG files?) you have to wait for the simLauncher to complete before you get the dimensions.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import { ParticleType, ParticleTypeValues } from '../../model/SoluteType.js';
import createParticleNode from './createParticleNode.js';

// Cache the result to avoid repeatedly creating the particle node and getting its bounds.
let particleDimensionMap: Record<ParticleType, Dimension2> | null = null;

// Assets cannot be loaded until the simLauncher is complete. So, this is a method so it can be looked up lazily.
export default function getParticleViewDimensions(): Record<ParticleType, Dimension2> {

  if ( !particleDimensionMap ) {
    const record = {} as Record<ParticleType, Dimension2>;
    ParticleTypeValues.forEach( soluteType => {
      const myParticleNode = createParticleNode( soluteType );
      const soluteNodeBounds = myParticleNode.bounds;

      assert && assert( soluteNodeBounds.height > 0, `soluteNodeBounds.height is ${soluteNodeBounds.height}` );

      record[ soluteType ] = new Dimension2( soluteNodeBounds.width, soluteNodeBounds.height );
    } );
    particleDimensionMap = record;
  }
  return particleDimensionMap;
}