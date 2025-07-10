/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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+ouNQfitN71m2cnA9htB/s6jvAg1TTWoewqmL83hRmKz7YmfsFXOIAgYRRWqh6lWd2dXiHIwUwwBA6B2Fs5MwjomQBQJ1WeVVEur6VUQAAD/+3LEEYAUoVdN2aYAAdoe5vOesABkLIVGYwBUExKEQax6EovB2CgiAMBZstnBWVKWiREVZgXAkBZsxQnR3QDkcAMQuruTc9jLXqH9fqIa7XVrWFQhN5WZH8sL36/L023LbNc2a4ytvPzNuv8zP7WcbqJKwkoBKaen5WOWYp27OzZntr29WZ3534I5liCii5cPYV+sNdwlC3tfRIAAyFyqTvgF+JyScnxrHCkWYtpkq1Omg6OJF5xU7lxdw+202rSJxtyamqg7jWqg2PQ6DswbXJNg8VLmpkCERwOgmj0OmDazU7VOi7iIc6/5r6/n2w64c6/+P5NXERMoWUefPKNQ6Si7Vi4JSPt1eeRv/ooSW22KTqooedkxOpKI5KOcJgOJjK1C0NTJ4MrUhyHMKDwApHJFHKw4ttBiY//7cMQWAAv0ly+HmHCBVw0mvJCORMc4olsczEe3cqQaGaeYWhhVraw8SYHLASWWAs9jCJqofajU7oY6Vw7GXud/LYzp/ZR/o1giq7RDKkkiSRJK82o0gbJmgLPRBwLkpOAA6ZZLwZ2bKCqgZzTJa0WoCcxGoMalRMakgljyY1SxOj6gsCoJhwKiBzRg87SmDij53X6h1drmKel+6j/9VQm25JJHI0AVDX4dWrxtYBQCdSZov4aouxqXyGFGZqXDWNRm1JmpARgJnQKMBkr8keM////XZ///+mOfX++rpBOhhpxWOW3ReMHrlc/kJU3YuGpCiVv4Tmcs8jL+keaRJ5kxqMpkXxLS+/TyOjpttrSZjOfC0xzTPVnLVJlYmld9L6PRmk7WeX7OOh4WEAcEX8UR2/t2XKVNuCH/+3LETQAHKJM3oYRwcXUxYaQRiriNLVVxstZkMeGRsxNdhyBbmlJLLsUhCyqwsOFSkcgtUyTaRIzIQcU4iMRTh04WnBEM+1bMhYewkVtBiFMwoOvBZFc0UGNiXU6WOgUoxRvQyX/jXVjXTzMGQRmBvXaxH6o0tqQ/Uk3K2iF8lU0TMJM2EoYsphiZhh4jCJSEYdoTXivCARqzQmFCROvkwomEiYdCqaoak2rVf2qmq7HV78aqjeTGqwMR1JJLMVFHOuEoot////XO9dcaLBYWKKVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMSUAAz1kwuBhHeBYaRfsBCOPVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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