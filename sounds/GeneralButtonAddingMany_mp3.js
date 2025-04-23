/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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';
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