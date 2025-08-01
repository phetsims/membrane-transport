// Copyright 2025, University of Colorado Boulder

/**
 * Plays the "bubbling" sound when solutes are added via the Solute Spinners. This was adapted from the ConcentrationSliderSoundGenerator
 * in the Greenhouse Effect simulation. See https://github.com/phetsims/greenhouse-effect/issues/28.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import SoundGenerator, { SoundGeneratorOptions } from '../../../../tambo/js/sound-generators/SoundGenerator.js';
import ValueChangeSoundPlayer from '../../../../tambo/js/sound-generators/ValueChangeSoundPlayer.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import TSoundPlayer from '../../../../tambo/js/TSoundPlayer.js';
import sliderMovement_mp3 from '../../../sounds/sliderMovement_mp3.js';
import membraneTransport from '../../membraneTransport.js';

export default class SoluteSpinnerSoundGenerator extends ValueChangeSoundPlayer {

  /**
   * @param coarseDelta - The amount of change in solutes when the 'coarse' button is pressed. This is used to
   *                      normalize the number of 'add solute' sounds that are played every event.
   * @param range
   */
  public constructor( coarseDelta: number, range: Range ) {

    const sliderMiddleSoundGenerator = new SliderMiddleRangeSoundGenerator( coarseDelta, {
      initialOutputLevel: 0.2
    } );
    soundManager.addSoundGenerator( sliderMiddleSoundGenerator );

    super( range, {

      numberOfMiddleThresholds: 9,
      middleMovingUpSoundPlayer: sliderMiddleSoundGenerator,
      middleMovingDownSoundPlayer: sliderMiddleSoundGenerator
    } );
  }
}

/**
 * Sound generator to be used for the middle portion of the concentration slider range.
 */
class SliderMiddleRangeSoundGenerator extends SoundGenerator implements TSoundPlayer {
  private readonly baseSoundClip: SoundClip;
  private readonly coarseDelta: number;

  public constructor( coarseDelta: number, options?: Partial<SoundGeneratorOptions> ) {

    super( options );
    this.coarseDelta = coarseDelta;

    // Create a dynamics compressor so that the output of this sound generator doesn't go too high when lots of sounds
    // are being played.
    const dynamicsCompressorNode = this.audioContext.createDynamicsCompressor();

    // The following values were empirically determined through informed experimentation.
    const now = this.audioContext.currentTime;
    dynamicsCompressorNode.threshold.setValueAtTime( -3, now );
    dynamicsCompressorNode.knee.setValueAtTime( 0, now ); // hard knee
    dynamicsCompressorNode.ratio.setValueAtTime( 12, now );
    dynamicsCompressorNode.attack.setValueAtTime( 0, now );
    dynamicsCompressorNode.release.setValueAtTime( 0.25, now );
    dynamicsCompressorNode.connect( this.mainGainNode );

    // the sound clip that forms the basis of all sounds that are produced
    this.baseSoundClip = new SoundClip( sliderMovement_mp3, {
      rateChangesAffectPlayingSounds: false
    } );
    this.baseSoundClip.connect( dynamicsCompressorNode );
  }

  public play( newValue?: number, oldValue?: number ): void {

    affirm( newValue !== undefined && oldValue !== undefined, 'newValue and oldValue should be defined' );

    // Play 5 sounds for coarse changes, and 2 sounds for fine changes.
    const delta = Math.abs( newValue - oldValue );
    const desiredAmount = delta > 25 ? 5 : 2;

    // Set a value for the number of playing instances of the clip at which we limit additional plays.  This helps to
    // prevent too many instances of the clip from playing simultaneously, which can sound a bit chaotic.
    const playingInstancesLimitThreshold = 5;
    const available = playingInstancesLimitThreshold - this.baseSoundClip.getNumberOfPlayingInstances();
    const timesToPlay = Math.min( available, desiredAmount );

    // Calculate the minimum playback rate based on the current concentration.
    // Dividing the newValue reduces the playback rate and creates more subtle changes across the range.
    const minPlaybackRate = 1 + ( newValue / this.coarseDelta );

    // parameters the bound the randomization, empirically determined
    const minimumInterSoundTime = 0.06;
    const maximumInterSoundTime = minimumInterSoundTime * 1.5;

    let delayAmount = 0;
    _.times( timesToPlay, () => {

      // Set the playback rate with some randomization.
      this.baseSoundClip.setPlaybackRate( minPlaybackRate + ( dotRandom.nextDouble() * 0.2 ), 0 );

      // Put some spacing between each playing of the clip.  The parameters of the calculation are broken out to make
      // experimentation and adjustment easier.
      this.baseSoundClip.play( delayAmount );
      delayAmount = delayAmount + minimumInterSoundTime + dotRandom.nextDouble() * ( maximumInterSoundTime - minimumInterSoundTime );
    } );
    this.baseSoundClip.setPlaybackRate( 1, 0 );
  }

  public stop(): void {
    // does nothing in this class, but is needed for the TSoundPlayer interface
  }
}

membraneTransport.register( 'SoluteSpinnerSoundGenerator', SoluteSpinnerSoundGenerator );