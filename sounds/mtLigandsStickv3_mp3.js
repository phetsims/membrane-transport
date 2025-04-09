/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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auJLZg2i61jL68XMH18KuvrWZFP7LzYVqZvJzLvKZmZXszcsu3+zADdOsxXyVlVjAiEVvRohVMyjfv2UOapO8YRYGqPpxjLW7wiDiZEtKr3/+3LEHAARdQ9N+PeAATkZZveKUAJw+xrGDCN8cAsIh2PJbdodaWTo3Uwf62alv61+Pi+cE3IUsx06cxwS5xfzNV8TS23zaUbghKWaFLbxt0+/bVY0R9FjS4zr3vEfRcxIyQSFvcSYR1hxhuSOxpFOQu6mr12EwBcGAo8CqHQBFRFxhg84GM5kEgCDz3NL1ZymLWVHlzP2lRWoLLQz9W/yiIeFgKARgMjA6JTq3NZnv/Wj5oqKkjQXbeNSyJuMqEaeSuYWULsS5bQKxORS3ztwKnSOAgm55UaOexR7DsqdDSgq6HeJXcRf1A0eU+j6sOrOyOW8qbUdTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMRBg8e0AxWghEAgCABAAZAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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