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