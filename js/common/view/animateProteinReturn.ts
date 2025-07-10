// Copyright 2025, University of Colorado Boulder

/**
 * Utility for animating a transport protein node moving back to the toolbox, often
 * when a slot is replaced or canceled. Disposes the node upon completion.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import membraneTransport from '../../membraneTransport.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';

/**
 * Animates a protein node returning from its current model position
 * to a designated destination position, disposing the node upon completion.
 *
 * @param proteinNode - The protein node to animate.
 * @param toPosition - The destination model position (often the toolbox).
 * @param onComplete - Optional callback fired after animation and dispose.
 * @returns animation - The animation instance in case you need to cancel it.
 */
export default function animateProteinReturn(
  proteinNode: TransportProteinDragNode,
  toPosition: Vector2,
  onComplete?: () => void
): Animation {
  const animation = new Animation( {
    setValue: function( value: Vector2 ) {
      proteinNode.setModelPosition( value );
    },
    from: proteinNode.getModelPosition().copy(),
    to: toPosition,
    duration: 0.4,
    easing: Easing.CUBIC_IN_OUT
  } );

  // No sounds should be played as the Node returns to the toolbox.
  proteinNode.canPlaySounds = false;

  animation.endedEmitter.addListener( () => {
    proteinNode.dispose();
    onComplete && onComplete();
  } );

  animation.start();

  return animation;
}

membraneTransport.register( 'animateProteinReturn', animateProteinReturn );