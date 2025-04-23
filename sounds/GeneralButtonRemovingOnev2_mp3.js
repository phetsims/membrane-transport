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