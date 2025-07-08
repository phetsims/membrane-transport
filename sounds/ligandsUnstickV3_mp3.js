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