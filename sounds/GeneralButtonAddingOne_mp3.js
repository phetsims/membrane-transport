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