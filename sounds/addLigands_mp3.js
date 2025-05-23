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