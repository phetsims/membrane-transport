// Copyright 2025, University of Colorado Boulder

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
const TIME_CONSTANT = 0.015;

class AmbientSoundGeneratorFiltered extends SoundGenerator {
  private readonly lowPassFilter: BiquadFilterNode;
  private readonly baseSoundLoop: SoundClip;

  // private readonly temperatureToFilterFrequency: LinearFunction;

  public constructor(
    wrappedAudioBuffer: WrappedAudioBuffer,
    initialPlaybackRate = 1,
    filterType: 'lowpass' | 'bandpass' = 'lowpass',
    q = 10
  ) {

    super( {
      initialOutputLevel: 0.045
    } );

    // loop which will be filtered to produce the sounds
    const baseSoundLoop = new SoundClip( wrappedAudioBuffer, {
      loop: true,
      initialPlaybackRate: initialPlaybackRate
    } );

    // low pass filter
    const lowPassFilter = this.audioContext.createBiquadFilter();
    lowPassFilter.type = filterType;
    lowPassFilter.Q.value = q;
    lowPassFilter.connect( this.mainGainNode );

    this.lowPassFilter = lowPassFilter;

    // Send the loop into both filters.
    baseSoundLoop.connect( lowPassFilter );

    this.baseSoundLoop = baseSoundLoop;
  }

  public setPlaying( isPlaying: boolean ): void {
    if ( isPlaying && !this.baseSoundLoop.isPlaying ) {
      this.baseSoundLoop.play();
    }
    else if ( !isPlaying && this.baseSoundLoop.isPlaying ) {
      this.baseSoundLoop.stop();
    }
  }

  public setFrequency( frequency: number ): void {
    const now = this.audioContext.currentTime;
    this.lowPassFilter.frequency.setTargetAtTime( frequency, now, TIME_CONSTANT );
  }
}

membraneTransport.register( 'AmbientSoundGeneratorFiltered', AmbientSoundGeneratorFiltered );
export default AmbientSoundGeneratorFiltered;