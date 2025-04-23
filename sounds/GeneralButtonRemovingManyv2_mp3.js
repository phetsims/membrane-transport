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