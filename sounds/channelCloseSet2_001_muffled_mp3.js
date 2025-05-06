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