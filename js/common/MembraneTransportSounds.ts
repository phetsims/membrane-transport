// Copyright 2025, University of Colorado Boulder

/**
 * Play sound effects on certain events.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
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
import mtSoluteCrossing_Set2_001_mp3 from '../../sounds/mtSoluteCrossing_Set2_001_mp3.js';
import mtSoluteCrossing_Set2_002_mp3 from '../../sounds/mtSoluteCrossing_Set2_002_mp3.js';
import mtSoluteCrossing_Set2_003_mp3 from '../../sounds/mtSoluteCrossing_Set2_003_mp3.js';
import mtSoluteCrossing_Set2_004_mp3 from '../../sounds/mtSoluteCrossing_Set2_004_mp3.js';
import mtSoluteCrossing_Set2_005_mp3 from '../../sounds/mtSoluteCrossing_Set2_005_mp3.js';
import mtSoluteCrossing_Set2_006_mp3 from '../../sounds/mtSoluteCrossing_Set2_006_mp3.js';
import mtSoluteCrossing_Set3_001_mp3 from '../../sounds/mtSoluteCrossing_Set3_001_mp3.js';
import mtSoluteCrossing_Set3_002_mp3 from '../../sounds/mtSoluteCrossing_Set3_002_mp3.js';
import mtSoluteCrossing_Set3_003_mp3 from '../../sounds/mtSoluteCrossing_Set3_003_mp3.js';
import mtSoluteCrossing_Set3_004_mp3 from '../../sounds/mtSoluteCrossing_Set3_004_mp3.js';
import mtSoluteCrossing_Set3_005_mp3 from '../../sounds/mtSoluteCrossing_Set3_005_mp3.js';
import mtSoluteCrossing_Set3_006_mp3 from '../../sounds/mtSoluteCrossing_Set3_006_mp3.js';
import proteinReturnSound2_mp3 from '../../sounds/proteinReturnSound2_mp3.js';
import proteinReturnSound3_mp3 from '../../sounds/proteinReturnSound3_mp3.js';
import proteinReturnSound4_mp3 from '../../sounds/proteinReturnSound4_mp3.js';
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


const proteinReturnSound = newSoundClip(
  MembraneTransportQueryParameters.soundProteinReturn === 1 ? proteinReturnSound_mp3 :
  MembraneTransportQueryParameters.soundProteinReturn === 2 ? proteinReturnSound2_mp3 :
  MembraneTransportQueryParameters.soundProteinReturn === 3 ? proteinReturnSound3_mp3 :
  MembraneTransportQueryParameters.soundProteinReturn === 4 ? proteinReturnSound4_mp3 :
    // IIFE throw error
  ( () => { throw new Error( 'Invalid protein return sound option' ); } )(), {
    initialOutputLevel: 0.75
  } );

const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );

const mtSoluteCrossing001 = newSoundClip(
  MembraneTransportQueryParameters.soundSoluteCrossing === 1 ? mtSoluteCrossing001_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 2 ? mtSoluteCrossing_Set2_001_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 3 ? mtSoluteCrossing_Set3_001_mp3 :
  ( () => { throw new Error( 'Invalid solute crossing sound option' ); } )(), { initialOutputLevel: 0.6 }
);

const mtSoluteCrossing002 = newSoundClip(
  MembraneTransportQueryParameters.soundSoluteCrossing === 1 ? mtSoluteCrossing002_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 2 ? mtSoluteCrossing_Set2_002_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 3 ? mtSoluteCrossing_Set3_002_mp3 :
  ( () => { throw new Error( 'Invalid solute crossing sound option' ); } )(), { initialOutputLevel: 0.6 }
);

const mtSoluteCrossing003 = newSoundClip(
  MembraneTransportQueryParameters.soundSoluteCrossing === 1 ? mtSoluteCrossing003_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 2 ? mtSoluteCrossing_Set2_003_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 3 ? mtSoluteCrossing_Set3_003_mp3 :
  ( () => { throw new Error( 'Invalid solute crossing sound option' ); } )(), { initialOutputLevel: 0.6 }
);

const mtSoluteCrossing004 = newSoundClip(
  MembraneTransportQueryParameters.soundSoluteCrossing === 1 ? mtSoluteCrossing004_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 2 ? mtSoluteCrossing_Set2_004_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 3 ? mtSoluteCrossing_Set3_004_mp3 :
  ( () => { throw new Error( 'Invalid solute crossing sound option' ); } )(), { initialOutputLevel: 0.6 }
);

const mtSoluteCrossing005 = newSoundClip(
  MembraneTransportQueryParameters.soundSoluteCrossing === 1 ? mtSoluteCrossing005_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 2 ? mtSoluteCrossing_Set2_005_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 3 ? mtSoluteCrossing_Set3_005_mp3 :
  ( () => { throw new Error( 'Invalid solute crossing sound option' ); } )(), { initialOutputLevel: 0.6 }
);

const mtSoluteCrossing006 = newSoundClip(
  MembraneTransportQueryParameters.soundSoluteCrossing === 1 ? mtSoluteCrossing005_mp3 : // NOTE: this series only had 5 sounds
  MembraneTransportQueryParameters.soundSoluteCrossing === 2 ? mtSoluteCrossing_Set2_006_mp3 :
  MembraneTransportQueryParameters.soundSoluteCrossing === 3 ? mtSoluteCrossing_Set3_006_mp3 :
  ( () => { throw new Error( 'Invalid solute crossing sound option' ); } )(), { initialOutputLevel: 0.6 }
);

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

  public static soluteCrossedMembrane(
    type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' | 'adp' | 'phosphate' | 'ligandA' | 'ligandB',
    direction: 'inward' | 'outward' ): void {

    const sound = type === 'oxygen' ? mtSoluteCrossing001 :
                  type === 'carbonDioxide' ? mtSoluteCrossing002 :
                  type === 'sodiumIon' ? mtSoluteCrossing003 :
                  type === 'potassiumIon' ? mtSoluteCrossing004 :
                  mtSoluteCrossing005;
    sound.play();
  }

  // TODO: Sync with soluteCrossedMembrane
  // TODO: If the same sound used for crossing and adding, rename the sound files to be more general
  public static soluteAdded( type: 'oxygen' | 'carbonDioxide' | 'sodiumIon' | 'potassiumIon' | 'glucose' | 'atp' ): void {

    const sound = type === 'oxygen' ? mtSoluteCrossing001 :
                  type === 'carbonDioxide' ? mtSoluteCrossing002 :
                  type === 'sodiumIon' ? mtSoluteCrossing003 :
                  type === 'potassiumIon' ? mtSoluteCrossing004 :
                  type === 'glucose' ? mtSoluteCrossing005 :
                  mtSoluteCrossing006;
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