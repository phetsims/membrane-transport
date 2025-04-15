// Copyright 2025, University of Colorado Boulder

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import phetAudioContext from '../../../tambo/js/phetAudioContext.js';
import SoundClip, { SoundClipOptions } from '../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../tambo/js/soundManager.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import boundaryReached_mp3 from '../../../tambo/sounds/boundaryReached_mp3.js';
import brightMarimbaShort_mp3 from '../../../tambo/sounds/brightMarimbaShort_mp3.js';
import mtChannelCloseSet1_001_mp3 from '../../sounds/mtChannelCloseSet1_001_mp3.js';
import mtChannelCloseSet1_001_muffled_mp3 from '../../sounds/mtChannelCloseSet1_001_muffled_mp3.js';
import mtChannelCloseSet1_002_mp3 from '../../sounds/mtChannelCloseSet1_002_mp3.js';
import mtChannelCloseSet1_002_muffled_mp3 from '../../sounds/mtChannelCloseSet1_002_muffled_mp3.js';
import mtChannelCloseSet1_003_mp3 from '../../sounds/mtChannelCloseSet1_003_mp3.js';
import mtChannelCloseSet1_003_muffled_mp3 from '../../sounds/mtChannelCloseSet1_003_muffled_mp3.js';
import mtChannelCloseSet1_004_mp3 from '../../sounds/mtChannelCloseSet1_004_mp3.js';
import mtChannelCloseSet1_004_muffled_mp3 from '../../sounds/mtChannelCloseSet1_004_muffled_mp3.js';
import mtChannelCloseSet2_001_mp3 from '../../sounds/mtChannelCloseSet2_001_mp3.js';
import mtChannelCloseSet2_001_muffled_mp3 from '../../sounds/mtChannelCloseSet2_001_muffled_mp3.js';
import mtChannelCloseSet2_002_mp3 from '../../sounds/mtChannelCloseSet2_002_mp3.js';
import mtChannelCloseSet2_002_muffled_mp3 from '../../sounds/mtChannelCloseSet2_002_muffled_mp3.js';
import mtChannelCloseSet2_003_mp3 from '../../sounds/mtChannelCloseSet2_003_mp3.js';
import mtChannelCloseSet2_003_muffled_mp3 from '../../sounds/mtChannelCloseSet2_003_muffled_mp3.js';
import mtChannelCloseSet2_004_mp3 from '../../sounds/mtChannelCloseSet2_004_mp3.js';
import mtChannelCloseSet2_004_muffled_mp3 from '../../sounds/mtChannelCloseSet2_004_muffled_mp3.js';
import mtChannelOpenSet1_001_mp3 from '../../sounds/mtChannelOpenSet1_001_mp3.js';
import mtChannelOpenSet1_001_muffled_mp3 from '../../sounds/mtChannelOpenSet1_001_muffled_mp3.js';
import mtChannelOpenSet1_002_mp3 from '../../sounds/mtChannelOpenSet1_002_mp3.js';
import mtChannelOpenSet1_002_muffled_mp3 from '../../sounds/mtChannelOpenSet1_002_muffled_mp3.js';
import mtChannelOpenSet1_003_mp3 from '../../sounds/mtChannelOpenSet1_003_mp3.js';
import mtChannelOpenSet1_003_muffled_mp3 from '../../sounds/mtChannelOpenSet1_003_muffled_mp3.js';
import mtChannelOpenSet1_004_mp3 from '../../sounds/mtChannelOpenSet1_004_mp3.js';
import mtChannelOpenSet1_004_muffled_mp3 from '../../sounds/mtChannelOpenSet1_004_muffled_mp3.js';
import mtChannelOpenSet2_001_mp3 from '../../sounds/mtChannelOpenSet2_001_mp3.js';
import mtChannelOpenSet2_001_muffled_mp3 from '../../sounds/mtChannelOpenSet2_001_muffled_mp3.js';
import mtChannelOpenSet2_002_mp3 from '../../sounds/mtChannelOpenSet2_002_mp3.js';
import mtChannelOpenSet2_002_muffled_mp3 from '../../sounds/mtChannelOpenSet2_002_muffled_mp3.js';
import mtChannelOpenSet2_003_mp3 from '../../sounds/mtChannelOpenSet2_003_mp3.js';
import mtChannelOpenSet2_003_muffled_mp3 from '../../sounds/mtChannelOpenSet2_003_muffled_mp3.js';
import mtChannelOpenSet2_004_mp3 from '../../sounds/mtChannelOpenSet2_004_mp3.js';
import mtChannelOpenSet2_004_muffled_mp3 from '../../sounds/mtChannelOpenSet2_004_muffled_mp3.js';
import mtLigandsStickv1_mp3 from '../../sounds/mtLigandsStickv1_mp3.js';
import mtLigandsStickv2_mp3 from '../../sounds/mtLigandsStickv2_mp3.js';
import mtLigandsStickv3_mp3 from '../../sounds/mtLigandsStickv3_mp3.js';
import mtLigandsUnstickv1_mp3 from '../../sounds/mtLigandsUnstickv1_mp3.js';
import mtLigandsUnstickv2_mp3 from '../../sounds/mtLigandsUnstickv2_mp3.js';
import mtLigandsUnstickv3_mp3 from '../../sounds/mtLigandsUnstickv3_mp3.js';
import mtSoluteCrossing001_mp3 from '../../sounds/mtSoluteCrossing001_mp3.js';
import mtSoluteCrossing002_mp3 from '../../sounds/mtSoluteCrossing002_mp3.js';
import mtSoluteCrossing003_mp3 from '../../sounds/mtSoluteCrossing003_mp3.js';
import mtSoluteCrossing004_mp3 from '../../sounds/mtSoluteCrossing004_mp3.js';
import mtSoluteCrossing005_mp3 from '../../sounds/mtSoluteCrossing005_mp3.js';
import proteinReturnSound_mp3 from '../../sounds/proteinReturnSound_mp3.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportQueryParameters from './MembraneTransportQueryParameters.js';
import Particle from './model/Particle.js';

// Helper function to create SoundClip instances and register them with the sound manager.
const newSoundClip = ( sound: WrappedAudioBuffer, options?: SoundClipOptions ): SoundClip => {
  const soundClip = new SoundClip( sound, options );
  soundManager.addSoundGenerator( soundClip );
  return soundClip;
};

// Define constant options for consistency
const DEFAULT_OPTIONS: SoundClipOptions = { initialOutputLevel: 0.6 };
const MUFFLED_OPTIONS: SoundClipOptions = { initialOutputLevel: 0.6 }; // May adjust later if needed

// Define specific types for channel identifiers and sound sets
type ChannelType = 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel';
type SoundSetKey = '1' | '2' | '1muffled' | '2muffled';
type ChannelAction = 'open' | 'close';

// Define the structure for the channel sounds object
type ChannelSoundMap = Record<SoundSetKey, Record<ChannelAction, Record<ChannelType, SoundClip>>>;

// Create the channel sounds object literal
const channelSounds: ChannelSoundMap = {
  1: {
    open: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet1_001_mp3, DEFAULT_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet1_002_mp3, DEFAULT_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet1_003_mp3, DEFAULT_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet1_004_mp3, DEFAULT_OPTIONS )
    },
    close: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet1_001_mp3, DEFAULT_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet1_002_mp3, DEFAULT_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet1_003_mp3, DEFAULT_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet1_004_mp3, DEFAULT_OPTIONS )
    }
  },
  2: {
    open: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet2_001_mp3, DEFAULT_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet2_002_mp3, DEFAULT_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet2_003_mp3, DEFAULT_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet2_004_mp3, DEFAULT_OPTIONS )
    },
    close: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet2_001_mp3, DEFAULT_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet2_002_mp3, DEFAULT_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet2_003_mp3, DEFAULT_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet2_004_mp3, DEFAULT_OPTIONS )
    }
  },
  '1muffled': {
    open: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet1_001_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet1_002_muffled_mp3, MUFFLED_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet1_003_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet1_004_muffled_mp3, MUFFLED_OPTIONS )
    },
    close: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet1_001_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet1_002_muffled_mp3, MUFFLED_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet1_003_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet1_004_muffled_mp3, MUFFLED_OPTIONS )
    }
  },
  '2muffled': {
    open: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet2_001_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelOpenSet2_002_muffled_mp3, MUFFLED_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet2_003_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelOpenSet2_004_muffled_mp3, MUFFLED_OPTIONS )
    },
    close: {
      sodiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet2_001_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonLigandGatedChannel: newSoundClip( mtChannelCloseSet2_002_muffled_mp3, MUFFLED_OPTIONS ),
      sodiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet2_003_muffled_mp3, MUFFLED_OPTIONS ),
      potassiumIonVoltageGatedChannel: newSoundClip( mtChannelCloseSet2_004_muffled_mp3, MUFFLED_OPTIONS )
    }
  }
};

// Other sound definitions remain the same
const brightMarimbaShortSound = newSoundClip( brightMarimbaShort_mp3, { initialOutputLevel: 0.6 } );
const proteinReturnSound = newSoundClip( proteinReturnSound_mp3, { initialOutputLevel: 0.75 } );
const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );

const mtSoluteCrossing001 = newSoundClip( mtSoluteCrossing001_mp3, { initialOutputLevel: 0.6 } );
const mtSoluteCrossing002 = newSoundClip( mtSoluteCrossing002_mp3, { initialOutputLevel: 0.6 } );
const mtSoluteCrossing003 = newSoundClip( mtSoluteCrossing003_mp3, { initialOutputLevel: 0.6 } );
const mtSoluteCrossing004 = newSoundClip( mtSoluteCrossing004_mp3, { initialOutputLevel: 0.6 } );
const mtSoluteCrossing005 = newSoundClip( mtSoluteCrossing005_mp3, { initialOutputLevel: 0.6 } );

// TODO (SR): We decided to get rid of this, and Ashton will provide different sounds
const bandpassFilter = new BiquadFilterNode( phetAudioContext, {
  type: 'bandpass',
  Q: 10,
  frequency: 1600
} );

const mtSoluteCrossing001Outward = newSoundClip( mtSoluteCrossing001_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing002Outward = newSoundClip( mtSoluteCrossing002_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing003Outward = newSoundClip( mtSoluteCrossing003_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing004Outward = newSoundClip( mtSoluteCrossing004_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing005Outward = newSoundClip( mtSoluteCrossing005_mp3, { additionalAudioNodes: [ bandpassFilter ] } );

const mtLigandsStickv1 = newSoundClip( mtLigandsStickv1_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsStickv2 = newSoundClip( mtLigandsStickv2_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsStickv3 = newSoundClip( mtLigandsStickv3_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsUnstickv1 = newSoundClip( mtLigandsUnstickv1_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsUnstickv2 = newSoundClip( mtLigandsUnstickv2_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsUnstickv3 = newSoundClip( mtLigandsUnstickv3_mp3, { initialOutputLevel: 0.6 } );

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

  public static soluteCrossingSound(
    type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | 'adp' | 'phosphate' | 'ligandA' | 'ligandB',
    direction: 'inward' | 'outward' ): void {

    const sound: SoundClip =
      ( direction === 'inward' ) ? ( type === 'oxygen' ? mtSoluteCrossing001 :
                                     type === 'carbonDioxide' ? mtSoluteCrossing002 :
                                     type === 'sodiumIon' ? mtSoluteCrossing003 :
                                     type === 'potassiumIon' ? mtSoluteCrossing004 :
                                     mtSoluteCrossing005 ) // Default inward sound for other types
                                 : ( type === 'oxygen' ? mtSoluteCrossing001Outward :
                                     type === 'carbonDioxide' ? mtSoluteCrossing002Outward :
                                     type === 'sodiumIon' ? mtSoluteCrossing003Outward :
                                     type === 'potassiumIon' ? mtSoluteCrossing004Outward :
                                     mtSoluteCrossing005Outward ); // Default outward sound for other types
    sound.play();
  }

  /**
   * Plays the sound for a channel opening.
   * The specific sound depends on the channel type and the `soundChannelOpenCloseSet` query parameter.
   */
  public static channelOpened( type: ChannelType ): void {

    const set = MembraneTransportQueryParameters.soundChannelOpenCloseSet as SoundSetKey;
    const sound = channelSounds[ set ].open[ type ];

    if ( !sound ) {
      // Should not happen if the channelSounds object is correctly defined and types match
      throw new Error( `Sound not found for opening channel type: ${type} with set: ${set}` );
    }
    sound.play();
  }

  /**
   * Plays the sound for a channel closing.
   * The specific sound depends on the channel type and the `soundChannelOpenCloseSet` query parameter.
   */
  public static channelClosed( type: ChannelType ): void {

    const set = MembraneTransportQueryParameters.soundChannelOpenCloseSet as SoundSetKey;
    const sound = channelSounds[ set ].close[ type ];

    if ( !sound ) {

      // Should not happen if the channelSounds object is correctly defined and types match
      throw new Error( `Sound not found for closing channel type: ${type} with set: ${set}` );
    }
    sound.play();
  }

  public static ligandBound(): void {
    const sound = MembraneTransportQueryParameters.soundLigandBind === 1 ? mtLigandsStickv1 :
                  MembraneTransportQueryParameters.soundLigandBind === 2 ? mtLigandsStickv2 :
                  mtLigandsStickv3;
    sound.play();
  }

  public static ligandUnbound(): void {
    const sound = MembraneTransportQueryParameters.soundLigandBind === 1 ? mtLigandsUnstickv1 :
                  MembraneTransportQueryParameters.soundLigandBind === 2 ? mtLigandsUnstickv2 :
                  mtLigandsUnstickv3;
    sound.play();
  }
}

membraneTransport.register( 'MembraneTransportSounds', MembraneTransportSounds );