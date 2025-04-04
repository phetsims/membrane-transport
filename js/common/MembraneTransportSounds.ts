// Copyright 2025, University of Colorado Boulder

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import SoundClip, { SoundClipOptions } from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import boundaryReached_mp3 from '../../../tambo/sounds/boundaryReached_mp3.js';
import brightMarimbaShort_mp3 from '../../../tambo/sounds/brightMarimbaShort_mp3.js';
import collect_mp3 from '../../../tambo/sounds/collect_mp3.js';
import proteinReturnSound_mp3 from '../../sounds/proteinReturnSound_mp3.js';
import membraneTransport from '../membraneTransport.js';
import Particle from './model/Particle.js';

const newSoundClip = ( sound: WrappedAudioBuffer, options?: SoundClipOptions ) => {
  const soundClip = new SoundClip( sound, options );
  soundManager.addSoundGenerator( soundClip );
  return soundClip;
};

const collectSound = newSoundClip( collect_mp3, { initialOutputLevel: 0.6 } );
const brightMarimbaShortSound = newSoundClip( brightMarimbaShort_mp3, { initialOutputLevel: 0.6 } );
const proteinReturnSound = newSoundClip( proteinReturnSound_mp3 );
const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembraneTransportSounds {
  public static sodiumLockedInToSodiumPotassiumPump( site: string, numberSodiumsFilled: number ): void {

    brightMarimbaShortSound.setPlaybackRate( numberSodiumsFilled === 1 ? 1 :
                                             numberSodiumsFilled === 2 ? 1.1 :
                                             1.2 );
    brightMarimbaShortSound.play();
  }

  public static potassiumLockedInToSodiumPotassiumPump( site: string, numberPotassiumsFilled: number ): void {
    brightMarimbaShortSound.setPlaybackRate( numberPotassiumsFilled === 1 ? 0.5 : 0.7 );
    brightMarimbaShortSound.play();
  }

  public static phosphateLockedInToSodiumPotassiumPump(): void {
    brightMarimbaShortSound.setPlaybackRate( 2 );
    brightMarimbaShortSound.play();
  }

  public static particleBounced( particle: Particle<IntentionalAny> ): void {
    // too annoying
  }

  public static gasMoleculeEnteredMembrane( particle: Particle<IntentionalAny>, direction: 'inward' | 'outward' ): void {
    collectSound.setPlaybackRate( direction === 'inward' ? 1 : 1.2 );
    collectSound.play();
  }

  public static proteinReturnedToToolbox(): void {
    proteinReturnSound.play();
  }

  public static boundaryReached(): void {
    boundaryReachedSound.play();
  }
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );