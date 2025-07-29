// Copyright 2025, University of Colorado Boulder

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import phetAudioContext from '../../../tambo/js/phetAudioContext.js';
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
import shareWhooshSound_mp3 from '../../../tambo/sounds/shareWhooshSound_mp3.js';
import activeTransporterRockOrOpen_mp3 from '../../sounds/activeTransporterRockOrOpen_mp3.js';
import activeTransporterSuccessChord_mp3 from '../../sounds/activeTransporterSuccessChord_mp3.js';
import atpActivateTransporter_mp3 from '../../sounds/atpActivateTransporter_mp3.js';
import glucoseActivateTransporter_mp3 from '../../sounds/glucoseActivateTransporter_mp3.js';
import kPlusAttach_mp3 from '../../sounds/kPlusAttach_mp3.js';
import ligandsStickV3_mp3 from '../../sounds/ligandsStickV3_mp3.js';
import ligandsUnstickV3_mp3 from '../../sounds/ligandsUnstickV3_mp3.js';
import naPlusAttach_mp3 from '../../sounds/naPlusAttach_mp3.js';
import potassiumLigandGatedChannelClose_mp3 from '../../sounds/potassiumLigandGatedChannelClose_mp3.js';
import potassiumLigandGatedChannelOpen_mp3 from '../../sounds/potassiumLigandGatedChannelOpen_mp3.js';
import potassiumVoltageGatedChannelClose_mp3 from '../../sounds/potassiumVoltageGatedChannelClose_mp3.js';
import potassiumVoltageGatedChannelOpen_mp3 from '../../sounds/potassiumVoltageGatedChannelOpen_mp3.js';
import proteinReturnToToolbox_mp3 from '../../sounds/proteinReturnToToolbox_mp3.js';
import sodiumLigandGatedChannelClose_mp3 from '../../sounds/sodiumLigandGatedChannelClose_mp3.js';
import sodiumLigandGatedChannelOpen_mp3 from '../../sounds/sodiumLigandGatedChannelOpen_mp3.js';
import sodiumVoltageGatedChannelClose_mp3 from '../../sounds/sodiumVoltageGatedChannelClose_mp3.js';
import sodiumVoltageGatedChannelOpen_mp3 from '../../sounds/sodiumVoltageGatedChannelOpen_mp3.js';
import soluteCrossingCarbonDioxide_mp3 from '../../sounds/soluteCrossingCarbonDioxide_mp3.js';

import soluteCrossingCarbonDioxideOutward_mp3 from '../../sounds/soluteCrossingCarbonDioxideOutward_mp3.js';
import soluteCrossingGeneric_mp3 from '../../sounds/soluteCrossingGeneric_mp3.js';
import soluteCrossingOxygen_mp3 from '../../sounds/soluteCrossingOxygen_mp3.js';
import soluteCrossingOxygenOutward_mp3 from '../../sounds/soluteCrossingOxygenOutward_mp3.js';
import soluteCrossingPotassium_mp3 from '../../sounds/soluteCrossingPotassium_mp3.js';
import soluteCrossingSodium_mp3 from '../../sounds/soluteCrossingSodium_mp3.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportPreferences from './MembraneTransportPreferences.js';

// Taken from CardSounds.ts
const cardMovementSounds = [
  cardMovement1_mp3,
  cardMovement2_mp3,
  cardMovement3_mp3,
  cardMovement4_mp3,
  cardMovement5_mp3,
  cardMovement6_mp3
];

const lowpassFilter = new BiquadFilterNode( phetAudioContext, {
  type: 'lowpass',
  frequency: 420,
  Q: 1.7
} );

const cardMovementSoundClips = cardMovementSounds.map( sound => new SoundClip( sound, { initialOutputLevel: 0.3 } ) );
cardMovementSoundClips.forEach( soundClip => soundManager.addSoundGenerator( soundClip ) );

// create lowpass filtered sounds
const cardMovementLowpassSoundClips = cardMovementSounds.map( sound => new SoundClip( sound, {
  initialOutputLevel: 0.3,
  additionalAudioNodes: [ lowpassFilter ]
} ) );
cardMovementLowpassSoundClips.forEach( soundClip => soundManager.addSoundGenerator( soundClip ) );

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
      sodiumIonLigandGatedChannel: newSoundClip( sodiumLigandGatedChannelOpen_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( potassiumLigandGatedChannelOpen_mp3, CHANNEL_SOUND_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( sodiumVoltageGatedChannelOpen_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( potassiumVoltageGatedChannelOpen_mp3, CHANNEL_SOUND_OPTIONS )
    },
    close: {
      sodiumIonLigandGatedChannel: newSoundClip( sodiumLigandGatedChannelClose_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( potassiumLigandGatedChannelClose_mp3, CHANNEL_SOUND_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( sodiumVoltageGatedChannelClose_mp3, CHANNEL_SOUND_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( potassiumVoltageGatedChannelClose_mp3, CHANNEL_SOUND_OPTIONS )
    }
  }
};

const proteinReturnToToolboxSound = newSoundClip( proteinReturnToToolbox_mp3, {
  initialOutputLevel: 0.2
} );

const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );

const shareWhooshSound = newSoundClip( shareWhooshSound_mp3, { initialOutputLevel: 0.6 } );

const ligandBindSoundClip = newSoundClip( ligandsStickV3_mp3, { initialOutputLevel: 0.3 } );
const ligandUnbindSoundClip = newSoundClip( ligandsUnstickV3_mp3, { initialOutputLevel: 0.3 } );

const sodiumLowpassFilter = new BiquadFilterNode( phetAudioContext, {
  type: 'lowpass',
  frequency: 230,
  Q: 1.7
} );

const sodiumBindingSoundClip = newSoundClip( naPlusAttach_mp3, {
  initialOutputLevel: 0.5,
  additionalAudioNodes: [
    sodiumLowpassFilter
  ]
} );
const potassiumBindingSoundClip = newSoundClip( kPlusAttach_mp3, { initialOutputLevel: 0.25 } );
const glucoseActivateTransporterSoundClip = newSoundClip( glucoseActivateTransporter_mp3, { initialOutputLevel: 0.3 } );

const phosphateBindingSoundClip = newSoundClip( atpActivateTransporter_mp3, { initialOutputLevel: 0.3 } );

const activeTransportersRockOrOpenSound = newSoundClip( activeTransporterRockOrOpen_mp3, { initialOutputLevel: 0.2 } );
const activeTransportersSuccessChord = newSoundClip( activeTransporterSuccessChord_mp3, { initialOutputLevel: 0.2 } );

const G_NOTE = 1;
const C_NOTE = Math.pow( 2, 5 / 12 );
const E_NOTE = Math.pow( 2, 9 / 12 );

const genericCrossingSound = soluteCrossingGeneric_mp3;
const potassiumCrossingSound = soluteCrossingPotassium_mp3;
const sodiumCrossingSound = soluteCrossingSodium_mp3;

const baseSoundClipOptions: SoundClipOptions = { initialOutputLevel: 0.2 };
const gasCrossingSoundOptions: SoundClipOptions = { initialOutputLevel: 0.02 };

const soluteCrossingGenericSounds = createPannedSoundSet( genericCrossingSound, baseSoundClipOptions );
const soluteCrossingPotassiumSounds = createPannedSoundSet( potassiumCrossingSound, baseSoundClipOptions );
const soluteCrossingSodiumSounds = createPannedSoundSet( sodiumCrossingSound, baseSoundClipOptions );
const soluteCrossingCarbonDioxideSounds = createPannedSoundSet( soluteCrossingCarbonDioxide_mp3, gasCrossingSoundOptions );
const soluteCrossingOxygenSounds = createPannedSoundSet( soluteCrossingOxygen_mp3, gasCrossingSoundOptions );

const soluteCrossingGenericHighSounds = createPannedSoundSet( genericCrossingSound, baseSoundClipOptions, 2 );
const soluteCrossingPotassiumHighSounds = createPannedSoundSet( potassiumCrossingSound, baseSoundClipOptions, 2 );
const soluteCrossingSodiumHighSounds = createPannedSoundSet( sodiumCrossingSound, baseSoundClipOptions, 2 );
const soluteCrossingCarbonDioxideHighSounds = createPannedSoundSet( soluteCrossingCarbonDioxideOutward_mp3, gasCrossingSoundOptions );
const soluteCrossingOxygenHighSounds = createPannedSoundSet( soluteCrossingOxygenOutward_mp3, gasCrossingSoundOptions );

export default class MembraneTransportSounds {

  public static soluteCrossedMembrane(
    type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | 'adp' | 'phosphate' | 'triangleLigand' | 'starLigand',
    direction: 'inward' | 'outward' ): void {

    const stereoEnabled = MembraneTransportPreferences.instance.stereoCrossingSoundsEnabledProperty.value;

    // Determine which side to play (right, center, left) based on direction and stereo settings
    const side = stereoEnabled ? ( direction === 'inward' ? 'right' : 'left' ) : 'center';

    // Choose the sound set based on particle type and direction
    const soundSet = direction === 'inward' ?
                     ( type === 'oxygen' ? soluteCrossingOxygenSounds :
                       type === 'carbonDioxide' ? soluteCrossingCarbonDioxideSounds :
                       type === 'sodiumIon' ? soluteCrossingSodiumSounds :
                       type === 'potassiumIon' ? soluteCrossingPotassiumSounds :
                       soluteCrossingGenericSounds ) :
                     ( type === 'oxygen' ? soluteCrossingOxygenHighSounds :
                       type === 'carbonDioxide' ? soluteCrossingCarbonDioxideHighSounds :
                       type === 'sodiumIon' ? soluteCrossingSodiumHighSounds :
                       type === 'potassiumIon' ? soluteCrossingPotassiumHighSounds :
                       soluteCrossingGenericHighSounds );

    const soundToPlay = soundSet[ side ];
    soundToPlay.play();
  }

  public static sodiumLockedInToSodiumPotassiumPump( site: string, numberSodiumsFilled: number ): void {
    sodiumBindingSoundClip.setPlaybackRate( numberSodiumsFilled === 1 ? G_NOTE :
                                            numberSodiumsFilled === 2 ? C_NOTE :
                                            E_NOTE );

    // Boost the volume of the most filtered sound, to normalize
    sodiumBindingSoundClip.setOutputLevel( numberSodiumsFilled === 3 ? 1.6 : 0.5 );

    sodiumBindingSoundClip.play();
  }

  public static potassiumLockedInToSodiumPotassiumPump( site: string, numberPotassiumsFilled: number ): void {
    potassiumBindingSoundClip.setPlaybackRate( numberPotassiumsFilled === 1 ? G_NOTE : C_NOTE );
    potassiumBindingSoundClip.play();
  }

  public static phosphateLockedInToSodiumPotassiumPump(): void {
    phosphateBindingSoundClip.play();
  }

  public static proteinReturnedToToolbox(): void {
    proteinReturnToToolboxSound.play();
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
    ligandBindSoundClip.play();
  }

  public static ligandUnbound(): void {
    ligandUnbindSoundClip.play();
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

  public static slotHover( slotIndex: number, isOccupied: boolean ): void {

    // Use the lowpass filter for occupied slots
    const soundClips = isOccupied ? cardMovementLowpassSoundClips : cardMovementSoundClips;

    // Sort in order of naturally occurring pitches, so that the first sound is the lowest pitch.
    const clip = slotIndex === 0 ? soundClips[ 0 ] :
                 slotIndex === 1 ? soundClips[ 2 ] :
                 slotIndex === 2 ? soundClips[ 4 ] :
                 slotIndex === 3 ? soundClips[ 1 ] :
                 slotIndex === 4 ? soundClips[ 3 ] :
                 slotIndex === 5 ? soundClips[ 5 ] :
                 slotIndex === 6 ? soundClips[ 5 ] :
                 soundClips[ 5 ];

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
      sodiumBindingSoundClip.setPlaybackRate( filledSodiumSiteCount === 1 ? G_NOTE : C_NOTE );

      sodiumBindingSoundClip.setOutputLevel( 0.5 );

      sodiumBindingSoundClip.play();
    }
    else {
      glucoseActivateTransporterSoundClip.play();
    }
  }

  public static activeTransporterRockedAndSuccess(): void {
    activeTransportersRockOrOpenSound.play();
    activeTransportersSuccessChord.play();
  }
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );