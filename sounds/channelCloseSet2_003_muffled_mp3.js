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