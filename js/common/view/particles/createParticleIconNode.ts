// Copyright 2025, University of Colorado Boulder

/**
 * Creates an icon node for a particle with consistent scaling and rotation for use in UI elements.
 * This is a sibling to createParticleNode that creates appropriately scaled and rotated particles
 * for display in icons, buttons, and other UI components.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Node, { NodeOptions } from '../../../../../scenery/js/nodes/Node.js';
import { ParticleType } from '../../model/SoluteType.js';
import createParticleNode from './createParticleNode.js';

export default function createParticleIconNode( particleType: ParticleType, options?: NodeOptions ): Node {
  const icon = createParticleNode( particleType );

  // We want to keep the relative sizes correct for the gas solutes and the icons
  // but the ATP and Glucose are much larger, so we scale them down.
  icon.setScaleMagnitude( particleType === 'atp' ? 0.045 :
                          particleType === 'glucose' ? 0.09 :
                          0.1 );

  // ATP is vertical in the play area but horizontal in the radio button icon
  icon.setRotation( particleType === 'atp' ? Math.PI / 2 : 0 );

  options && icon.mutate( options );
  return icon;
}