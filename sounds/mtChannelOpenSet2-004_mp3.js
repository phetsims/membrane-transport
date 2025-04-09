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