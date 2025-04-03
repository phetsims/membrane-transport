// Copyright 2025, University of Colorado Boulder

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import SoundClip from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import brightMarimbaShort_mp3 from '../../../tambo/sounds/brightMarimbaShort_mp3.js';
import collect_mp3 from '../../../tambo/sounds/collect_mp3.js';
import proteinReturnSound_mp3 from '../../sounds/proteinReturnSound_mp3.js';
import membraneTransport from '../membraneTransport.js';
import Particle from './model/Particle.js';

const collectSound = new SoundClip( collect_mp3, { initialOutputLevel: 0.6 } );
soundManager.addSoundGenerator( collectSound );

const brightMarimbaShortSound = new SoundClip( brightMarimbaShort_mp3, { initialOutputLevel: 0.6 } );
soundManager.addSoundGenerator( brightMarimbaShortSound );

const proteinReturnSound = new SoundClip( proteinReturnSound_mp3 );
soundManager.addSoundGenerator( proteinReturnSound );

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
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );