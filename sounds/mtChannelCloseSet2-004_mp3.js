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