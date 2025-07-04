// Copyright 2025, University of Colorado Boulder

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import sharedSoundPlayers from '../../../tambo/js/sharedSoundPlayers.js';
import CardSounds from '../../../tambo/js/sound-generators/CardSounds.js';
import SoundClip, { SoundClipOptions } from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import boundaryReached_mp3 from '../../../tambo/sounds/boundaryReached_mp3.js';
import cardMovement1_mp3 from '../../../tambo/sounds/cardMovement1_mp3.js';
import cardMovement2_mp3 from '../../../tambo/sounds/cardMovement2_mp3.js';
import cardMovement3_mp3 from '../../../tambo/sounds/cardMovement3_mp3.js';
import cardMovement4_mp3 from '../../../tambo/sounds/cardMovement4_mp3.js';
import cardMovement5_mp3 from '../../../tambo/sounds/cardMovement5_mp3.js';
import cardMovement6_mp3 from '../../../tambo/sounds/cardMovement6_mp3.js';
import activeTransporterRockOrOpen_mp3 from '../../sounds/activeTransporterRockOrOpen_mp3.js';
import activeTransporterSuccessChord_mp3 from '../../sounds/activeTransporterSuccessChord_mp3.js';
import atpActivateTransporter_mp3 from '../../sounds/atpActivateTransporter_mp3.js';
import channelCloseSet1_001_mp3 from '../../sounds/channelCloseSet1_001_mp3.js';
import channelCloseSet1_002_mp3 from '../../sounds/channelCloseSet1_002_mp3.js';
import channelCloseSet2_001_mp3 from '../../sounds/channelCloseSet2_001_mp3.js';
import channelCloseSet2_003_mp3 from '../../sounds/channelCloseSet2_003_mp3.js';
import channelOpenSet1_001_mp3 from '../../sounds/channelOpenSet1_001_mp3.js';
import channelOpenSet1_002_mp3 from '../../sounds/channelOpenSet1_002_mp3.js';
import channelOpenSet2_002_mp3 from '../../sounds/channelOpenSet2_002_mp3.js';
import channelOpenSet2_003_mp3 from '../../sounds/channelOpenSet2_003_mp3.js';
import glucoseActivateTransporter_mp3 from '../../sounds/glucoseActivateTransporter_mp3.js';
import kPlusAttach_mp3 from '../../sounds/kPlusAttach_mp3.js';
import ligandsStickV3_mp3 from '../../sounds/ligandsStickV3_mp3.js';
import ligandsUnstickV3_mp3 from '../../sounds/ligandsUnstickV3_mp3.js';
import naPlusAttach_mp3 from '../../sounds/naPlusAttach_mp3.js';
import proteinReturnSound4_mp3 from '../../sounds/proteinReturnSound4_mp3.js';
import shareWhooshSound_mp3 from '../../sounds/shareWhooshSound_mp3.js';
import soluteCrossing001_mp3 from '../../sounds/soluteCrossing001_mp3.js';
import soluteCrossing002_mp3 from '../../sounds/soluteCrossing002_mp3.js';
import soluteCrossing003_mp3 from '../../sounds/soluteCrossing003_mp3.js';
import soluteCrossing004_V5_mp3 from '../../sounds/soluteCrossing004_V5_mp3.js';
import soluteCrossing005_V5_mp3 from '../../sounds/soluteCrossing005_V5_mp3.js';

import soluteCrossingOutward004_V5_mp3 from '../../sounds/soluteCrossingOutward004_V5_mp3.js';
import soluteCrossingOutward005_V5_mp3 from '../../sounds/soluteCrossingOutward005_V5_mp3.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportPreferences from './MembraneTransportPreferences.js';
import Particle from './model/Particle.js';

// Taken from CardSounds.ts
const cardMovementSounds = [
  cardMovement1_mp3,
  cardMovement2_mp3,
  cardMovement3_mp3,
  cardMovement4_mp3,
  cardMovement5_mp3,
  cardMovement6_mp3
];

const cardMovementSoundClips = cardMovementSounds.map( sound => new SoundClip( sound, { initialOutputLevel: 0.3 } ) );
cardMovementSoundClips.forEach( soundClip => soundManager.addSoundGenerator( soundClip ) );

/**
 * AudioContextSoundClip is a subclass of SoundClip that makes the audioContext property public
 * so it can be accessed for creating panned sound clips.
 */
class AudioContextSoundClip extends SoundClip {

  // Make audioContext public by overriding it. Used to create the pan node for stereo
  public override readonly audioContext!: AudioContext;

  public constructor( wrappedAudioBuffer: WrappedAudioBuffer, providedOptions?: SoundClipOptions ) {
    super( wrappedAudioBuffer, providedOptions );
  }
}

type PannedSoundSet = {
  center: SoundClip;
  left: SoundClip;
  right: SoundClip;
};

const grabSoundPlayer = sharedSoundPlayers.get( 'grab' );
const releaseSoundPlayer = sharedSoundPlayers.get( 'release' );

// Helper function to create SoundClip instances and register them with the sound manager.
const newSoundClip = ( sound: WrappedAudioBuffer, options?: SoundClipOptions ): SoundClip => {
  const soundClip = new SoundClip( sound, options );
  soundManager.addSoundGenerator( soundClip );
  return soundClip;
};

// Helper function to create AudioContextSoundClip instances and register them with the sound manager.
const newAudioContextSoundClip = ( sound: WrappedAudioBuffer, options?: SoundClipOptions ): AudioContextSoundClip => {
  const soundClip = new AudioContextSoundClip( sound, options );
  soundManager.addSoundGenerator( soundClip );
  return soundClip;
};

function createPannedSoundSet(
  soundBuffer: WrappedAudioBuffer,
  baseOptions: SoundClipOptions,
  playbackRate?: number
): PannedSoundSet {
  const centerSound = newAudioContextSoundClip( soundBuffer, baseOptions );

  const leftPanner = centerSound.audioContext.createStereoPanner();
  leftPanner.pan.value = -0.8;

  // Create a new options object instead of using spread operator on non-literals
  const leftOptions: SoundClipOptions = {
    initialOutputLevel: baseOptions.initialOutputLevel,
    additionalAudioNodes: [ leftPanner ]
  };
  // Copy any other properties from baseOptions if they exist
  if ( baseOptions.loop !== undefined ) {leftOptions.loop = baseOptions.loop;}

  const leftSound = newSoundClip( soundBuffer, leftOptions );

  const rightPanner = centerSound.audioContext.createStereoPanner();
  rightPanner.pan.value = 0.8;

  // Create a new options object instead of using spread operator on non-literals
  const rightOptions: SoundClipOptions = {
    initialOutputLevel: baseOptions.initialOutputLevel,
    additionalAudioNodes: [ rightPanner ]
  };
  // Copy any other properties from baseOptions if they exist
  if ( baseOptions.loop !== undefined ) {rightOptions.loop = baseOptions.loop;}

  const rightSound = newSoundClip( soundBuffer, rightOptions );

  if ( playbackRate ) {
    centerSound.setPlaybackRate( playbackRate );
    leftSound.setPlaybackRate( playbackRate );
    rightSound.setPlaybackRate( playbackRate );
  }

  return {
    center: centerSound,
    left: leftSound,
    right: rightSound
  };
}

// Define constant options for consistency
const CHANNEL_SOUND_OPTIONS: SoundClipOptions = { initialOutputLevel: 0.18 };

// Define specific types for channel identifiers and sound sets
type ChannelType = 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel';

// Create the channel sounds object literal
const channelSounds = {
  1: {
    open: {
      sodiumIonLigandGatedChannel: newSoundClip( channelCloseSet1_001_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( channelOpenSet2_003_mp3, CHANNEL_SOUND_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( channelOpenSet1_002_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( channelOpenSet2_002_mp3, CHANNEL_SOUND_OPTIONS )
    },
    close: {
      sodiumIonLigandGatedChannel: newSoundClip( channelOpenSet1_001_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( channelCloseSet2_003_mp3, CHANNEL_SOUND_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( channelCloseSet1_002_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( channelCloseSet2_001_mp3, CHANNEL_SOUND_OPTIONS )
    }
  }
};

const proteinReturnSound = newSoundClip( proteinReturnSound4_mp3, {
  initialOutputLevel: 0.2
} );

const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );

const shareWhooshSound = newSoundClip( shareWhooshSound_mp3, { initialOutputLevel: 0.6 } );

const mtLigandsStickv3 = newSoundClip( ligandsStickV3_mp3, { initialOutputLevel: 0.3 } );
const mtLigandsUnstickv3 = newSoundClip( ligandsUnstickV3_mp3, { initialOutputLevel: 0.3 } );

const mtNAPlusAttachSound = newSoundClip( naPlusAttach_mp3, { initialOutputLevel: 0.3 } );
const mtKPlusAttachSound = newSoundClip( kPlusAttach_mp3, { initialOutputLevel: 0.3 } );
const mtGlucoseActivateTransporterSound = newSoundClip( glucoseActivateTransporter_mp3, { initialOutputLevel: 0.3 } );

const mtATPActivateTransporter = newSoundClip( atpActivateTransporter_mp3, { initialOutputLevel: 0.3 } );

const mtActiveTransportersRockOrOpenSound = newSoundClip( activeTransporterRockOrOpen_mp3, { initialOutputLevel: 0.3 } );
const mtActiveTransportersSuccessChord = newSoundClip( activeTransporterSuccessChord_mp3, { initialOutputLevel: 0.3 } );

const G_NOTE = 1;
const C_NOTE = Math.pow( 2, 5 / 12 );
const E_NOTE = Math.pow( 2, 9 / 12 );

const sound1 = soluteCrossing001_mp3;
const sound2 = soluteCrossing002_mp3;
const sound3 = soluteCrossing003_mp3;

const baseSoundClipOptions: SoundClipOptions = { initialOutputLevel: 0.6 };

const soluteCrossing001Sounds = createPannedSoundSet( sound1, baseSoundClipOptions );
const soluteCrossing002Sounds = createPannedSoundSet( sound2, baseSoundClipOptions );
const soluteCrossing003Sounds = createPannedSoundSet( sound3, baseSoundClipOptions );
const soluteCrossing004Sounds = createPannedSoundSet( soluteCrossing004_V5_mp3, baseSoundClipOptions );
const soluteCrossing005Sounds = createPannedSoundSet( soluteCrossing005_V5_mp3, baseSoundClipOptions );

const soluteCrossing001HighSounds = createPannedSoundSet( sound1, baseSoundClipOptions, 2 );
const soluteCrossing002HighSounds = createPannedSoundSet( sound2, baseSoundClipOptions, 2 );
const soluteCrossing003HighSounds = createPannedSoundSet( sound3, baseSoundClipOptions, 2 );
const soluteCrossing004HighSounds = createPannedSoundSet( soluteCrossingOutward004_V5_mp3, baseSoundClipOptions );
const soluteCrossing005HighSounds = createPannedSoundSet( soluteCrossingOutward005_V5_mp3, baseSoundClipOptions );

export default class MembraneTransportSounds {

  public static soluteCrossedMembrane(
    type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | 'adp' | 'phosphate' | 'triangleLigand' | 'starLigand',
    direction: 'inward' | 'outward' ): void {

    const stereoEnabled = MembraneTransportPreferences.instance.stereoCrossingSoundsEnabledProperty.value;

    // Determine which side to play (right, center, left) based on direction and stereo settings
    const side = stereoEnabled ? ( direction === 'inward' ? 'right' : 'left' ) : 'center';

    // Choose the sound set based on particle type and direction
    const soundSet = direction === 'inward' ?
                     ( type === 'oxygen' ? soluteCrossing005Sounds :
                       type === 'carbonDioxide' ? soluteCrossing004Sounds :
                       type === 'sodiumIon' ? soluteCrossing003Sounds :
                       type === 'potassiumIon' ? soluteCrossing002Sounds :
                       soluteCrossing001Sounds ) :
                     ( type === 'oxygen' ? soluteCrossing005HighSounds :
                       type === 'carbonDioxide' ? soluteCrossing004HighSounds :
                       type === 'sodiumIon' ? soluteCrossing003HighSounds :
                       type === 'potassiumIon' ? soluteCrossing002HighSounds :
                       soluteCrossing001HighSounds );

    const soundToPlay = soundSet[ side ];
    soundToPlay.play();
  }

  public static sodiumLockedInToSodiumPotassiumPump( site: string, numberSodiumsFilled: number ): void {
    mtNAPlusAttachSound.setPlaybackRate( numberSodiumsFilled === 1 ? G_NOTE :
                                         numberSodiumsFilled === 2 ? C_NOTE :
                                         E_NOTE );
    mtNAPlusAttachSound.play();
  }

  public static potassiumLockedInToSodiumPotassiumPump( site: string, numberPotassiumsFilled: number ): void {
    mtKPlusAttachSound.setPlaybackRate( numberPotassiumsFilled === 1 ? G_NOTE : C_NOTE );
    mtKPlusAttachSound.play();
  }

  public static phosphateLockedInToSodiumPotassiumPump(): void {
    mtATPActivateTransporter.play();
  }

  public static particleBounced( particle: Particle ): void {
    // too annoying
  }

  public static gasMoleculeEnteredMembrane( particle: Particle, direction: 'inward' | 'outward' ): void {
    // collectSound.setPlaybackRate( direction === 'inward' ? 1 : 1.2 );
    // collectSound.play();
  }

  public static proteinReturnedToToolbox(): void {
    proteinReturnSound.play();
  }

  public static boundaryReached(): void {
    boundaryReachedSound.play();
  }

  /**
   * Plays the sound for a channel opening.
   */
  public static channelOpened( type: ChannelType ): void {

    const sound = channelSounds[ '1' ].open[ type ];

    if ( !sound ) {
      // Should not happen if the channelSounds object is correctly defined and types match
      throw new Error( `Sound not found for opening channel type: ${type} with set: ${1}` );
    }
    sound.play();
  }

  /**
   * Plays the sound for a channel closing.
   */
  public static channelClosed( type: ChannelType ): void {

    const sound = channelSounds[ '1' ].close[ type ];

    if ( !sound ) {

      // Should not happen if the channelSounds object is correctly defined and types match
      throw new Error( `Sound not found for closing channel type: ${type} with set: ${1}` );
    }
    sound.play();
  }

  public static ligandBound(): void {
    mtLigandsStickv3.play();
  }

  public static ligandUnbound(): void {
    mtLigandsUnstickv3.play();
  }

  public static transportProteinGrabbed(): void {
    grabSoundPlayer.play();
  }

  public static transportProteinReleased(): void {
    releaseSoundPlayer.play();
  }

  public static transportProteinSwapped(): void {
    shareWhooshSound.play();
  }

  public static itemMoved( directionToPlay: 'left' | 'right' | 'both' ): void {
    CardSounds.playCardMovementSound( directionToPlay );
  }

  public static slotHover( slotIndex: number ): void {

    // Sort in order of naturally occurring pitches, so that the first sound is the lowest pitch.
    const clip = slotIndex === 0 ? cardMovementSoundClips[ 0 ] :
                 slotIndex === 1 ? cardMovementSoundClips[ 2 ] :
                 slotIndex === 2 ? cardMovementSoundClips[ 4 ] :
                 slotIndex === 3 ? cardMovementSoundClips[ 1 ] :
                 slotIndex === 4 ? cardMovementSoundClips[ 3 ] :
                 slotIndex === 5 ? cardMovementSoundClips[ 5 ] :
                 cardMovementSoundClips[ 5 ];

    // choose a pitch proportional to the slotIndex, in addition to the natural pitch of the clip
    const playbackRate = Math.pow( 2, slotIndex / 12 );

    // Moving to the right, go up in pitch by 4 semitones
    clip.setPlaybackRate( CardSounds.PLAYBACK_RATE * playbackRate );
    clip.play();
  }

  public static ligandGrabbed(): void {
    grabSoundPlayer.play();
  }

  public static ligandReleased(): void {
    releaseSoundPlayer.play();
  }

  public static particleBoundToSodiumGlucoseTransporter( type: 'sodiumIon' | 'glucose', filledSodiumSiteCount: number ): void {
    if ( type === 'sodiumIon' ) {
      mtNAPlusAttachSound.setPlaybackRate( filledSodiumSiteCount === 1 ? G_NOTE : C_NOTE );
      mtNAPlusAttachSound.play();
    }
    else {
      mtGlucoseActivateTransporterSound.play();
    }
  }

  public static activeTransporterRockedAndSuccess(): void {
    mtActiveTransportersRockOrOpenSound.play();
    mtActiveTransportersSuccessChord.play();
  }
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );