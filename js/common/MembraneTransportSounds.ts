// Copyright 2025, University of Colorado Boulder

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import phetAudioContext from '../../../tambo/js/phetAudioContext.js';
import SoundClip, { SoundClipOptions } from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import boundaryReached_mp3 from '../../../tambo/sounds/boundaryReached_mp3.js';
import brightMarimbaShort_mp3 from '../../../tambo/sounds/brightMarimbaShort_mp3.js';

// eslint-disable-next-line phet/default-import-match-filename
import mtChannelCloseSet1001_mp3 from '../../sounds/mtChannelCloseSet1-001_mp3.js';
// eslint-disable-next-line phet/default-import-match-filename
import mtChannelOpenSet1001_mp3 from '../../sounds/mtChannelOpenSet1-001_mp3.js';
// import collect_mp3 from '../../../tambo/sounds/collect_mp3.js';
import mtSoluteCrossing001_mp3 from '../../sounds/mtSoluteCrossing001_mp3.js';
import mtSoluteCrossing002_mp3 from '../../sounds/mtSoluteCrossing002_mp3.js';
import mtSoluteCrossing003_mp3 from '../../sounds/mtSoluteCrossing003_mp3.js';
import mtSoluteCrossing004_mp3 from '../../sounds/mtSoluteCrossing004_mp3.js';
import mtSoluteCrossing005_mp3 from '../../sounds/mtSoluteCrossing005_mp3.js';
import proteinReturnSound_mp3 from '../../sounds/proteinReturnSound_mp3.js';
import membraneTransport from '../membraneTransport.js';
import Particle from './model/Particle.js';

const newSoundClip = ( sound: WrappedAudioBuffer, options?: SoundClipOptions ) => {
  const soundClip = new SoundClip( sound, options );
  soundManager.addSoundGenerator( soundClip );
  return soundClip;
};

// TODO (design): Brett, want to tune these numbers?
const bandpassFilter = new BiquadFilterNode( phetAudioContext, {
  type: 'bandpass',
  Q: 10,
  frequency: 1600
} );

// const collectSound = newSoundClip( collect_mp3, { initialOutputLevel: 0.6 } );
const brightMarimbaShortSound = newSoundClip( brightMarimbaShort_mp3, { initialOutputLevel: 0.6 } );
const proteinReturnSound = newSoundClip( proteinReturnSound_mp3 );
const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );
const mtSoluteCrossing001 = newSoundClip( mtSoluteCrossing001_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing002 = newSoundClip( mtSoluteCrossing002_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing003 = newSoundClip( mtSoluteCrossing003_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing004 = newSoundClip( mtSoluteCrossing004_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing005 = newSoundClip( mtSoluteCrossing005_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones

const mtChannelOpenSet1001 = newSoundClip( mtChannelOpenSet1001_mp3 );
const mtChannelCloseSet1001 = newSoundClip( mtChannelCloseSet1001_mp3 );

const mtSoluteCrossing001Outward = newSoundClip( mtSoluteCrossing001_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing002Outward = newSoundClip( mtSoluteCrossing002_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing003Outward = newSoundClip( mtSoluteCrossing003_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing004Outward = newSoundClip( mtSoluteCrossing004_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing005Outward = newSoundClip( mtSoluteCrossing005_mp3, { additionalAudioNodes: [ bandpassFilter ] } );

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
    // collectSound.setPlaybackRate( direction === 'inward' ? 1 : 1.2 );
    // collectSound.play();
  }

  public static proteinReturnedToToolbox(): void {
    proteinReturnSound.play();
  }

  public static boundaryReached(): void {
    boundaryReachedSound.play();
  }

  public static soluteCrossingSound( type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | 'adp' | 'phosphate' | 'ligandA' | 'ligandB', direction: 'inward' | 'outward' ): void {

    if ( direction === 'inward' ) {
      if ( type === 'oxygen' ) {
        mtSoluteCrossing001.play();
      }
      else if ( type === 'carbonDioxide' ) {
        mtSoluteCrossing002.play();
      }
      else if ( type === 'sodiumIon' ) {
        mtSoluteCrossing003.play();
      }
      else if ( type === 'potassiumIon' ) {
        mtSoluteCrossing004.play();
      }
      else {
        mtSoluteCrossing005.play();
      }
    }
    else {
      if ( type === 'oxygen' ) {
        mtSoluteCrossing001Outward.play();
      }
      else if ( type === 'carbonDioxide' ) {
        mtSoluteCrossing002Outward.play();
      }
      else if ( type === 'sodiumIon' ) {
        mtSoluteCrossing003Outward.play();
      }
      else if ( type === 'potassiumIon' ) {
        mtSoluteCrossing004Outward.play();
      }
      else {
        mtSoluteCrossing005Outward.play();
      }
    }

  }

  public static channelOpened(): void {
    mtChannelOpenSet1001.play();
  }

  public static channelClosed(): void {
    mtChannelCloseSet1001.play();
  }
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );