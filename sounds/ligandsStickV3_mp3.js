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