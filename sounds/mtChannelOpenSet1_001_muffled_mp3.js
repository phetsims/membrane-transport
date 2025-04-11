/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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FEAAAlubkTX1i5ZlJhmE22Fuxc1xXZeVyWageLaQhFpQDbgSPxUOxVU7/PRLjJaerYrWy19Wra1r3zvMnrpJEkmmLVJnmoohNVVdq9F5yJf/+3LEWQAMCKdVrDzG8asY5rWGGbrLURJEjqKO0ooeCoKuDaw07iX/1u/To2IoKgAAAhNy8+slvOucaZXiQCYFzhi3uaQTUJqHBEIO9MwZYkxbSfAdFt0+qzuO7iZhhxhhifIaEAIcJRrIplKXOg4Wa3ZmQB4nhixAXDoPHREHQMdMPR3b0frKDTSC+/0PQ4ACmm8+VxLBvjCFdYOOnEle9qghfEaE7yx1GQAp0cJoE0bo/0ac7kG8wocrVAaDOaJjJ9S2U6KN2R6yq0Wihl0nWacYD4elORm6CwtItYx8bwqk4dDPGD/IGjvxs8drWw7wrZ/3Oe7/0PdSZaUEFpNy/UIT0HKTknJonSEpaiAUJQhDtQyEpatOSSAUcdHZ5xLZmdJbPuZxGzfaM8pQoHREJT2DR4Fan/bWY//7cMSGAQwUtS1HsFKRrRhk3Yehqv/Lf/lf/UAQXJOUpgCFQ1YhQuwAeDCqO4coOUXE3AEoFseSZVpIhCk2JMCqS56FheQ294wnKnYqRMlqVGzyUxEVITpKJQRIXDQqRS2S2wzf6sZ0f/BAuD6tzGf5f/gMEBf//1amUv///4MEaN6maFvWrXVMQU1FMy4xMDBVCNQUEpNuUKNLEnknyr2rco8iJVjAq48n5X+1tev+9M7UmlnM/7VoF1N6q96dj6lgIABUk1AjS/iLSdIFjM9ofEopmBaJKRGtWGI5CsWAaASJg7gyVPBoKh4nMy1ZNyJNxMQnEBpVhEqwaIUzwqOsIlXIll3IlWGrxCsu5EnjSs0KTyE4TiULFDRCo0hSPkKZ5EVYJirCJZdyJNhEqo5EueRHWDRCuZT/+3LEsgAIzG83R7DHMbArIAz0itJLsok2UST0KTbK02SFQ+QnD5KsjaQqGiFQ+hLMEx08KiqATBVcyRJuRJuFRZslIl2USbkKTbKy7KJPUKT0KzZKRKGr1//pa7GEVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMTmAAXsARFAiEAzA7SZHYYkeFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = asyncLoader.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();

// safe way to unlock
let unlocked = false;
const safeUnlock = () => {
  if ( !unlocked ) {
    unlock();
    unlocked = true;
  }
};

const onDecodeSuccess = decodedAudio => {
  if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
    wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
    safeUnlock();
  }
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 1, phetAudioContext.sampleRate ) );
  safeUnlock();
};
const decodePromise = phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
if ( decodePromise ) {
  decodePromise
    .then( decodedAudio => {
      if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
        wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
        safeUnlock();
      }
    } )
    .catch( e => {
      console.warn( 'promise rejection caught for audio decode, error = ' + e );
      safeUnlock();
    } );
}
export default wrappedAudioBuffer;