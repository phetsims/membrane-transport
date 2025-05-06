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