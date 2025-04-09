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