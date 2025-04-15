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