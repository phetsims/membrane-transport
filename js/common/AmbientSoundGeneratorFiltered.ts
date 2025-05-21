// Copyright 2021-2025, University of Colorado Boulder

/**
 * AmbientSoundGeneratorFiltered is used to create a sound indicating the temperature, and uses a sound loop and an
 * adjustable filter to do it.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import SoundClip from '../../../tambo/js/sound-generators/SoundClip.js';
import SoundGenerator from '../../../tambo/js/sound-generators/SoundGenerator.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import membraneTransport from '../membraneTransport.js';

// constants
const FILTER_Q = 10; // empirically determined
const TIME_CONSTANT = 0.015;

class AmbientSoundGeneratorFiltered extends SoundGenerator {
  private readonly lowPassFilter: BiquadFilterNode;

  // private readonly temperatureToFilterFrequency: LinearFunction;

  public constructor(
    wrappedAudioBuffer: WrappedAudioBuffer
  ) {

    super( {
      initialOutputLevel: 0.045
    } );

    // loop which will be filtered to produce the sounds
    const baseSoundLoop = new SoundClip( wrappedAudioBuffer, {
      loop: true
    } );

    // low pass filter
    const lowPassFilter = this.audioContext.createBiquadFilter();
    lowPassFilter.type = 'lowpass';
    lowPassFilter.Q.value = FILTER_Q;
    lowPassFilter.connect( this.mainGainNode );

    this.lowPassFilter = lowPassFilter;

    // Send the loop into both filters.
    baseSoundLoop.connect( lowPassFilter );

    // TODO: Only start sound when there are > 0 solutes, see https://github.com/phetsims/membrane-transport/issues/153
    baseSoundLoop.play();

    // isSunShiningProperty.link( isSunShining => {
    //   if ( isSunShining ) {
    //     baseSoundLoop.play();
    //   }
    //   else {
    //     baseSoundLoop.stop();
    //   }
    // } );
  }

  public setFrequency( frequency: number ): void {
    const now = this.audioContext.currentTime;
    this.lowPassFilter.frequency.setTargetAtTime( frequency, now, TIME_CONSTANT );
  }
}

membraneTransport.register( 'AmbientSoundGeneratorFiltered', AmbientSoundGeneratorFiltered );
export default AmbientSoundGeneratorFiltered;