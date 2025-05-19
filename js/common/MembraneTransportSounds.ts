// Copyright 2025, University of Colorado Boulder

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import sharedSoundPlayers from '../../../tambo/js/sharedSoundPlayers.js';
import CardSounds from '../../../tambo/js/sound-generators/CardSounds.js';
import SoundClip, { SoundClipOptions } from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import boundaryReached_mp3 from '../../../tambo/sounds/boundaryReached_mp3.js';
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
import GeneralButtonAddingMany_mp3 from '../../sounds/GeneralButtonAddingMany_mp3.js';
import GeneralButtonRemovingManyv1_mp3 from '../../sounds/GeneralButtonRemovingManyv1_mp3.js';
import GeneralButtonRemovingManyv2_mp3 from '../../sounds/GeneralButtonRemovingManyv2_mp3.js';
import GeneralButtonRemovingOnev1_mp3 from '../../sounds/GeneralButtonRemovingOnev1_mp3.js';
import GeneralButtonRemovingOnev2_mp3 from '../../sounds/GeneralButtonRemovingOnev2_mp3.js';
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
import Particle from './model/Particle.js';

const grabSoundPlayer = sharedSoundPlayers.get( 'grab' );
const releaseSoundPlayer = sharedSoundPlayers.get( 'release' );

// Helper function to create SoundClip instances and register them with the sound manager.
const newSoundClip = ( sound: WrappedAudioBuffer, options?: SoundClipOptions ): SoundClip => {
  const soundClip = new SoundClip( sound, options );
  soundManager.addSoundGenerator( soundClip );
  return soundClip;
};

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

// TODO: unused? See https://github.com/phetsims/membrane-transport/issues/111
export const GeneralButtonAddingManySoundClip = newSoundClip( GeneralButtonAddingMany_mp3, { initialOutputLevel: 0.3 } );
export const GeneralButtonAddingOneSoundClip = newSoundClip( GeneralButtonRemovingOnev1_mp3, { initialOutputLevel: 0.3 } );
export const GeneralButtonRemovingManyv1SoundClip = newSoundClip( GeneralButtonRemovingManyv1_mp3, { initialOutputLevel: 0.3 } );
export const GeneralButtonRemovingManyv2SoundClip = newSoundClip( GeneralButtonRemovingManyv2_mp3, { initialOutputLevel: 0.3 } );
export const GeneralButtonRemovingOnev1SoundClip = newSoundClip( GeneralButtonRemovingOnev1_mp3, { initialOutputLevel: 0.3 } );
export const GeneralButtonRemovingOnev2SoundClip = newSoundClip( GeneralButtonRemovingOnev2_mp3, { initialOutputLevel: 0.3 } );

const proteinReturnSound = newSoundClip( proteinReturnSound4_mp3, {
  initialOutputLevel: 0.2
} );

const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );

const shareWhooshSound = newSoundClip( shareWhooshSound_mp3, { initialOutputLevel: 0.6 } );

const mtLigandsStickv3 = newSoundClip( ligandsStickV3_mp3, { initialOutputLevel: 0.3 } );
const mtLigandsUnstickv3 = newSoundClip( ligandsUnstickV3_mp3, { initialOutputLevel: 0.3 } );

const mtNAPlusAttachSound = newSoundClip( naPlusAttach_mp3, { initialOutputLevel: 0.3 } );
const mtKPlusAttachSound = newSoundClip( kPlusAttach_mp3, { initialOutputLevel: 0.3 } );
const mtGlucoseActivateTransporterSound = newSoundClip( glucoseActivateTransporter_mp3, { initialOutputLevel: 0.3 } ); // TODO: Rename transporter https://github.com/phetsims/membrane-transport/issues/93

const mtATPActivateTransporter = newSoundClip( atpActivateTransporter_mp3, { initialOutputLevel: 0.3 } );

const mtActiveTransportersRockOrOpenSound = newSoundClip( activeTransporterRockOrOpen_mp3, { initialOutputLevel: 0.3 } );
const mtActiveTransportersSuccessChord = newSoundClip( activeTransporterSuccessChord_mp3, { initialOutputLevel: 0.3 } );

const G_NOTE = 1;
const C_NOTE = Math.pow( 2, 5 / 12 );
const E_NOTE = Math.pow( 2, 9 / 12 );

const sound1 = soluteCrossing001_mp3;
const sound2 = soluteCrossing002_mp3;
const sound3 = soluteCrossing003_mp3;

const soluteCrossing001 = newSoundClip( sound1, { initialOutputLevel: 0.6 } );
const soluteCrossing002 = newSoundClip( sound2, { initialOutputLevel: 0.6 } );
const soluteCrossing003 = newSoundClip( sound3, { initialOutputLevel: 0.6 } );
const soluteCrossing004 = newSoundClip( soluteCrossing004_V5_mp3, { initialOutputLevel: 0.6 } );
const soluteCrossing005 = newSoundClip( soluteCrossing005_V5_mp3, { initialOutputLevel: 0.6 } );

const soluteCrossing001High = newSoundClip( sound1, { initialOutputLevel: 0.6 } );
const soluteCrossing002High = newSoundClip( sound2, { initialOutputLevel: 0.6 } );
const soluteCrossing003High = newSoundClip( sound3, { initialOutputLevel: 0.6 } );
const soluteCrossing004High = newSoundClip( soluteCrossingOutward004_V5_mp3, { initialOutputLevel: 0.6 } );
const soluteCrossing005High = newSoundClip( soluteCrossingOutward005_V5_mp3, { initialOutputLevel: 0.6 } );

// Higher pitch by one octave when leaving the cell. Separate audio sound so an inward one and outward one can be played at the same time, without pitch bending.
// The gas molecules have a different sound file, since changing the playback rate on the "ringing" makes it sound too fast
soluteCrossing001High.setPlaybackRate( 2 );
soluteCrossing002High.setPlaybackRate( 2 );
soluteCrossing003High.setPlaybackRate( 2 );

export default class MembraneTransportSounds {

  public static soluteCrossedMembrane(
    type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | 'adp' | 'phosphate' | 'triangleLigand' | 'starLigand',
    direction: 'inward' | 'outward' ): void {

    const sound = direction === 'inward' ?
                  ( type === 'oxygen' ? soluteCrossing005 :
                    type === 'carbonDioxide' ? soluteCrossing004 :
                    type === 'sodiumIon' ? soluteCrossing003 :
                    type === 'potassiumIon' ? soluteCrossing002 :
                    soluteCrossing001 ) :
                  ( type === 'oxygen' ? soluteCrossing005High :
                    type === 'carbonDioxide' ? soluteCrossing004High :
                    type === 'sodiumIon' ? soluteCrossing003High :
                    type === 'potassiumIon' ? soluteCrossing002High :
                    soluteCrossing001High );

    sound.play();
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