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