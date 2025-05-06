/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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aju7/pVkaq0nHHLzneynWT57ynM3N7/v7W84PlAug+d2MMtOvsddTR/T+zUYuF/t7kxxdfZK1EhRklJNtxy4AklA0cZaLOYzaqgrsc9a9Hr/+3LEJYAGPHshQIRr8LcAI/QQiXbus0sTEpRi1epn74r/tBKfmY76GVqERZC021JiNyB7LSyGv85VoN9qmbHKYpBIUS9//7vSg+lP/Q7/+fbRUAASxKSSUznCrouTGlbG54lrfpQTCH6aP6f/261Uf/roZbR6xY6Rb3II7KYqUa03HHLzSZNWdm3GCfas4HgoKmHEusPKPqudqsF5x3Sikx3kjyrNfRoaxVm35d6m0+KaplKADAioKIXsNRHQiChgK0boQ6gEWBmzur9HBD1IPKcxXjPCCxB0hGIiCrUEaMgYCXTWAMsoszQw6naCABIt2UgC6o8YXjdRXAqCyhfqy3eVMzaGIBcaiqPu0UKajwP58VDdaBU6CnGzk0PgHFcwh1UgMk4lAkdRn5MfjeWMOo+Qm2jpo8HmFf/7cMSIAAUUAR1AhGJwrIAi6BCJvoem0WFVa/ygvuQanffIFpwimkmYRq0DbESg6ZhF+QIQLZA9wKVHnoIkzIJ4TZA9aBqy0iunCKdHwo9jHJmJELTiCdIFKPZA/TJQLuMTgBpYDSR5yJZGnkHkQxJHEFiCOBOITEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoCAQCJZLtrDVnUmBGsNQ1kpNRgzhDdYawmdYb/+3LE8AAG0AMfQARAM541WwWWG1mw21QUpNTqwwsNTWHrDC0mNY1JYak1KbZZ0mgoUVYTRRpJtKBTDSaJLCmNKoosg0klRQpipJNjKSKpcphpMklymuVRJZBpJKihVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMSgA8yEyulBhHIIAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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