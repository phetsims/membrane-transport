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