// Copyright 2025, University of Colorado Boulder

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import SoundClip from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import collect_mp3 from '../../../tambo/sounds/collect_mp3.js';
import membraneTransport from '../membraneTransport.js';
import Particle from './model/Particle.js';

const collectSound = new SoundClip( collect_mp3, { initialOutputLevel: 0.6 } );
soundManager.addSoundGenerator( collectSound );

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembraneTransportSounds {
  public static particleBounced( particle: Particle<IntentionalAny> ): void {
    // too annoying
  }

  public static gasMoleculeEnteredMembrane( particle: Particle<IntentionalAny>, direction: 'inward' | 'outward' ): void {
    collectSound.play();
  }
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );