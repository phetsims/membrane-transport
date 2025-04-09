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