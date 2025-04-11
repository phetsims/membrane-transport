// Copyright 2025, University of Colorado Boulder

// TODO: Better way to streamline creation and/or clustering of all the sounds
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

const brightMarimbaShortSound = newSoundClip( brightMarimbaShort_mp3, { initialOutputLevel: 0.6 } );
const proteinReturnSound = newSoundClip( proteinReturnSound_mp3, { initialOutputLevel: 0.75 } );
const boundaryReachedSound = newSoundClip( boundaryReached_mp3 );
const mtSoluteCrossing001 = newSoundClip( mtSoluteCrossing001_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing002 = newSoundClip( mtSoluteCrossing002_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing003 = newSoundClip( mtSoluteCrossing003_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing004 = newSoundClip( mtSoluteCrossing004_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones
const mtSoluteCrossing005 = newSoundClip( mtSoluteCrossing005_mp3, { initialOutputLevel: 0.6 } ); // quieter to match the bandpassed ones

const mtChannelCloseSet1_001 = newSoundClip( mtChannelCloseSet1_001_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet1_002 = newSoundClip( mtChannelCloseSet1_002_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet1_003 = newSoundClip( mtChannelCloseSet1_003_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet1_004 = newSoundClip( mtChannelCloseSet1_004_mp3, { initialOutputLevel: 0.6 } );

const mtChannelCloseSet2_001 = newSoundClip( mtChannelCloseSet2_001_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet2_002 = newSoundClip( mtChannelCloseSet2_002_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet2_003 = newSoundClip( mtChannelCloseSet2_003_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet2_004 = newSoundClip( mtChannelCloseSet2_004_mp3, { initialOutputLevel: 0.6 } );

const mtChannelCloseSet1_001_muffled = newSoundClip( mtChannelCloseSet1_001_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet1_002_muffled = newSoundClip( mtChannelCloseSet1_002_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet1_003_muffled = newSoundClip( mtChannelCloseSet1_003_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet1_004_muffled = newSoundClip( mtChannelCloseSet1_004_muffled_mp3, { initialOutputLevel: 0.6 } );

const mtChannelCloseSet2_001_muffled = newSoundClip( mtChannelCloseSet2_001_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet2_002_muffled = newSoundClip( mtChannelCloseSet2_002_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet2_003_muffled = newSoundClip( mtChannelCloseSet2_003_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelCloseSet2_004_muffled = newSoundClip( mtChannelCloseSet2_004_muffled_mp3, { initialOutputLevel: 0.6 } );

const mtChannelOpenSet1_001 = newSoundClip( mtChannelOpenSet1_001_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet1_002 = newSoundClip( mtChannelOpenSet1_002_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet1_003 = newSoundClip( mtChannelOpenSet1_003_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet1_004 = newSoundClip( mtChannelOpenSet1_004_mp3, { initialOutputLevel: 0.6 } );

const mtChannelOpenSet2_001 = newSoundClip( mtChannelOpenSet2_001_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet2_002 = newSoundClip( mtChannelOpenSet2_002_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet2_003 = newSoundClip( mtChannelOpenSet2_003_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet2_004 = newSoundClip( mtChannelOpenSet2_004_mp3, { initialOutputLevel: 0.6 } );

const mtChannelOpenSet1_001_muffled = newSoundClip( mtChannelOpenSet1_001_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet1_002_muffled = newSoundClip( mtChannelOpenSet1_002_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet1_003_muffled = newSoundClip( mtChannelOpenSet1_003_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet1_004_muffled = newSoundClip( mtChannelOpenSet1_004_muffled_mp3, { initialOutputLevel: 0.6 } );

const mtChannelOpenSet2_001_muffled = newSoundClip( mtChannelOpenSet2_001_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet2_002_muffled = newSoundClip( mtChannelOpenSet2_002_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet2_003_muffled = newSoundClip( mtChannelOpenSet2_003_muffled_mp3, { initialOutputLevel: 0.6 } );
const mtChannelOpenSet2_004_muffled = newSoundClip( mtChannelOpenSet2_004_muffled_mp3, { initialOutputLevel: 0.6 } );


const mtSoluteCrossing001Outward = newSoundClip( mtSoluteCrossing001_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing002Outward = newSoundClip( mtSoluteCrossing002_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing003Outward = newSoundClip( mtSoluteCrossing003_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing004Outward = newSoundClip( mtSoluteCrossing004_mp3, { additionalAudioNodes: [ bandpassFilter ] } );
const mtSoluteCrossing005Outward = newSoundClip( mtSoluteCrossing005_mp3, { additionalAudioNodes: [ bandpassFilter ] } );

// Additional options for the ligand binding sounds, commented out for lint.
const mtLigandsStickv1 = newSoundClip( mtLigandsStickv1_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsStickv2 = newSoundClip( mtLigandsStickv2_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsStickv3 = newSoundClip( mtLigandsStickv3_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsUnstickv1 = newSoundClip( mtLigandsUnstickv1_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsUnstickv2 = newSoundClip( mtLigandsUnstickv2_mp3, { initialOutputLevel: 0.6 } );
const mtLigandsUnstickv3 = newSoundClip( mtLigandsUnstickv3_mp3, { initialOutputLevel: 0.6 } );

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

  /**
   * Map to a set.
   *
   * mtChannelOpenSet1-001.mp3 : NA LGC
   * mtChannelOpenSet1-002.mp3 : K LGC
   * mtChannelOpenSet1-003.mp3 : NA VGC
   * mtChannelOpenSet1-004.mp3: K VGC
   */
  private static getOpenSoundSet1( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelOpenSet1_001 :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelOpenSet1_002 :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelOpenSet1_003 :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelOpenSet1_004 :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getOpenSoundSet2( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelOpenSet2_001 :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelOpenSet2_002 :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelOpenSet2_003 :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelOpenSet2_004 :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getOpenSoundSet1Muffled( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelOpenSet1_001_muffled :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelOpenSet1_002_muffled :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelOpenSet1_003_muffled :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelOpenSet1_004_muffled :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getOpenSoundSet2Muffled( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelOpenSet2_001_muffled :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelOpenSet2_002_muffled :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelOpenSet2_003_muffled :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelOpenSet2_004_muffled :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getCloseSoundSet1( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelCloseSet1_001 :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelCloseSet1_002 :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelCloseSet1_003 :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelCloseSet1_004 :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getCloseSoundSet2( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelCloseSet2_001 :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelCloseSet2_002 :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelCloseSet2_003 :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelCloseSet2_004 :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getCloseSoundSet1Muffled( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelCloseSet1_001_muffled :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelCloseSet1_002_muffled :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelCloseSet1_003_muffled :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelCloseSet1_004_muffled :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  private static getCloseSoundSet2Muffled( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): SoundClip {
    return type === 'sodiumIonLigandGatedChannel' ? mtChannelCloseSet2_001_muffled :
           type === 'potassiumIonLigandGatedChannel' ? mtChannelCloseSet2_002_muffled :
           type === 'sodiumIonVoltageGatedChannel' ? mtChannelCloseSet2_003_muffled :
           type === 'potassiumIonVoltageGatedChannel' ? mtChannelCloseSet2_004_muffled :
           ( () => { throw new Error( `Unrecognized channel type: ${type}` ); } )();
  }

  public static channelOpened( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): void {

    const set = MembraneTransportQueryParameters.soundChannelOpenCloseSet;

    const sound = set === '1' ? this.getOpenSoundSet1( type ) :
                  set === '2' ? this.getOpenSoundSet2( type ) :
                  set === '1muffled' ? this.getOpenSoundSet1Muffled( type ) :
                  set === '2muffled' ? this.getOpenSoundSet2Muffled( type ) :
                  ( () => { throw new Error( `Unrecognized soundChannelOpenCloseSet: ${set}` ); } )();

    sound.play();
  }

  public static channelClosed( type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel' | 'sodiumIonVoltageGatedChannel' | 'potassiumIonVoltageGatedChannel' ): void {

    const set = MembraneTransportQueryParameters.soundChannelOpenCloseSet;

    const sound = set === '1' ? this.getCloseSoundSet1( type ) :
                  set === '2' ? this.getCloseSoundSet2( type ) :
                  set === '1muffled' ? this.getCloseSoundSet1Muffled( type ) :
                  set === '2muffled' ? this.getCloseSoundSet2Muffled( type ) :
                  ( () => { throw new Error( `Unrecognized soundChannelOpenCloseSet: ${set}` ); } )();

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