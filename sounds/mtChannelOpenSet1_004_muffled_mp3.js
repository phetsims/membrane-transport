/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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rtAapkjOayKAIQHHGionVnGRRnMUsGIigEBhkXHOlytJ06NJAh1qAkCfTKmHYB2ELN8ks9KCkPZgGxh2MJQ7HwNBqMZr7/hv+CgaHo1uR/7/+3LEoQAN0LNHrDEWscCVJimEjtJk8n//565H/+36wAC5bzRPZXqBLo1CmElSYW2LIcQn4GCBDg6oUWAuqrKNroLxAkxxkcXGIaGsYhQIlQfnQ6BqeummAqBQEJQVBZ56VfzvnT0ssz3a29y3DPhrv1e7T2zxFLWiuWQj6oKRaSbTcmLWPGPyVp6nJ1+mgWvZ1/zS/3bnJpRyEdqTf039n6DO/+gx7o4LAeVGSXmwIhUsZ9EatobNQAiIWBmaTkTEx5Iu+ZBGbZ6bBOZVEZ8gguYoiAiqgJgB5khpdwxRMiCGBDA4Eps2Mtig6nSjKYQKDgLgFwi8SRS6pO+zOmdKZJhOtHVMWaqUoovwsM/aXqmtFNuVL4dqLiUIwngFRiSoEI3BEfR6ACWHw5ASLTNFzb0JJMSSDVSdL//7cMTEAw2opxhtYRCRdwngjPwxmiUqqme1MCQfFZWewH16HT1vlp8kk3kpk9C7b4DJ97VtLfMpTJ8xitCtgeaXbS21mbatp7PWhAjWMpM3VjVWNqsFUmrVc1VjDGvqTHKsarKxrBSwWVFFWI0wVcaVJBKKdUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVCVrBhATE6SpoUJDQiGQS4drFalczA0yuWnRVIQnhYFw1jwSwAWjyWOTLL/kyy1vskhIoDEgQGYfFmHuz//+3LE8IAFAAERQIRN89I5mAGmD6F6kos0osososossosososCAxJRZRZRZQGJKLMtiyiyynZ2cos0p2dnKLLKdnZyiyynZ2dnLaqqqummmmqqqqummmmqqqqummmmpUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMSxA9DRNoEmDNSoAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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