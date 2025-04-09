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