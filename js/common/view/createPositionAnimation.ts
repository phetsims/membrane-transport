// Copyright 2025, University of Colorado Boulder

/**
 * Creates an animation for moving transport proteins back to the toolbox when dropped via keyboard or mouse.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import membraneTransport from '../../membraneTransport.js';

/**
 * Creates an animation that moves an object from a starting position to a destination position.
 * @param setPositionFunction - Function to update the position value during animation
 * @param fromPosition - Starting position
 * @param toPosition - Destination position
 * @param onComplete - Optional callback to execute when the animation completes
 */
export default function createPositionAnimation(
  setPositionFunction: ( position: Vector2 ) => void,
  fromPosition: Vector2,
  toPosition: Vector2,
  onComplete?: () => void
): Animation {
  const animation = new Animation( {
    setValue: function( value: Vector2 ) {
      setPositionFunction( value );
    },
    from: fromPosition.copy(),
    to: toPosition,
    duration: 0.4,
    easing: Easing.CUBIC_IN_OUT
  } );

  if ( onComplete ) {
    animation.endedEmitter.addListener( onComplete );
  }

  return animation;
}

membraneTransport.register( 'createPositionAnimation', createPositionAnimation );