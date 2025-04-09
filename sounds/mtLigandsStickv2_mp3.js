/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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YaYt0PZXoZ7ONP3+ip2MnJfSqJIZRiOWQEDL2skiVlAAAADlYYDgYBgAALZGUHpkN4Bto+hnOCFzECMwUKMwC2JOSVmQ5nOgmJl0isirvlX/+3LET4AN3Utzp6RPsjgkZ823oXizvKs0JnUnYEdmZXPmE9kIJOAcng5ZgM0eASU5DgOC4ih6UctMSjetX/oQYYWg+alzxKDwqYUMsYNpSrJN/9vsyqr2NQatT8GafbxR9Eg0REgdqNNrZqi1jXpNtf/U0ZDut+10jl1SDBmkoNYYJyFyQxAAYmUfKKLeap+GOpmcjjeQ9lTe1QnVM/r+DFjTUEv/RZOCa37NRLBwRBDdv/brPRJcaDcwkboOoNnFxGprnP/+rjAkzXoDxxATKDg+UHU3OOOm5qrReYjfmXRvpONKGtclQMru8tkTmyUA4nTkdSXKFSKBCsHSqXiHvmVRIqSpmmnMu/5hdd1/+sUJHFgJlP1kpUuJhKi3//+c5mh0VTatCiRK1K1orViAkNaXX/Repnrf0P/7cMRjgA59YW+nmPSxhqAs9PSV/mgCCw7I/iw+Sxdr/y7+uq0QXTPXJInBIK8niVQyCkpPAtyIKaGcpOVlsU5uMLVG25MMWqYVMK9odLTjAMYUdDS+AoFZ9cwiK1DpHOPKm/lzKUOtssxv9WqUwsUFQVxZ/UeGB31NW8Giv0i6EAKpvP32rv/ySkcK6J0xmiwk+Jc/LzOrYDMpbgBLDEq2sbZZSzIZwwE/aXzGTzSlR9eVW//6FZH6GL9ShTPO9i//Ye/zv+hMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+3LEioALVONZp4y0cSGbZzzzCdSqqqqqqqqqE0VjICaM5D0yztMJNKZNTIumpmmfZn+ZEf//MyMtmRf//+pgopgUKixo1FEDxXmRYX/lhdn/8VEZkXpAQSImTISF2UxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMSPA8hcxPfghE/gAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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