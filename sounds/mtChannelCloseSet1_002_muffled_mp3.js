/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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jzQkpM7fzUQY5Ki+cS2ZkjPn1XSoVGmmkjrI///+H86hrZsNP/xNE9//8OQYjJeeboR9NYC1NNuSy7gNjW1dXHy55c7foC8skOeSJE3kigqZ8lnpW2mqAnIz+egRr9LG59RzpPQeOyS7M0D1XbdPOikwRtII7FjfhP/7cMTJgApMrTOnmTFx3i5hnaSK4lXXFoM3XV2Mb2kk8hO7qKy422togyJz48yyxMxZ5i9TljUuiIGC4nIk5/EZvMKJLvyD6gdhzVqJ5Uag0n6hGPTVZ3xqXj09decVTEEOzWRyKS3XblURoUyMPkFfEIK4fFCvxYhdmsT/mH8haMOEPhU0QYFeNw16goHdSgah2GvBWJSrpaVCT3PuqOnmnmw7SiqNXVWa7BbYWkaSjzA5RbVAUtljKeigaoEukiQqhOROCNFWZh3rhdpBJlUO4jZICXioCuBSgsgfIIyDKBxhJBDx0FeYqqVzerGlUp5Srze1tytQ45S7GCVBVmaYBvoYPjpMQrJLwn7kqsWOlEZ4mFIiGRk4XQGzKJVKrqKyqx04WOlEZ40hWVVSTUnCcLupuaQrFTj/+3LE6oANhWEAbRjx0jizIajDJb5w6o25pCsmnV1dWkmqkuw9CiKnCx1RG5pla06urq0k01EbBoUkQyHjhcgRnmkKyd1dXJVJNNQclK0VDn/+0RKuGJBqqaXf/rBMNUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMT+gAhcxxeghFHzerRNZYeluVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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