/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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hbe/+CMju+xWm/6/Z3OfsQ/QjYIIia3la6GFYdDuWBot6JNJkBJ2bos9aC9cDPamio1Vb+CWdKwJuk1wWwoHFi4EE6IQvYicEzrhm/qovOH/+3LEGABNHSlPrCRvkewmJuGEmhp9Rec+z89XXYKomSdJ07+f6xSmQGCIWgYZxnn/f/yJ5m2dm3+01822mVYExntDZuqoFkFJH3BL/yo3IqRI23EJ7lRlIESWW6aktxlKaLgJ1LxY6pdDMSbJftMvGHCn1C0RqkV2hIXbgLCYBRxE7Zlt7xpFnypfKoFGiiVktNa8O3DVf2b5j7LJeeDRpCnOsijrmo42y+fslL4UicsijWvk+nxu+bytmLREAUihc79XSEnyt9EampiUiinSKOTwussxvnAjTSnYgaC2CPjSAuqCCFoEwy1hEfJlVWkcgUAHghSjSZjBbVPZaXYwNWKvDCp3talpO0Cqqt/WMsTrf0tfLYa7v+Vx4TSjTaSbRTdFhPsX58JcOB+TZXkrKAkJmK03k/g4Ef/7cMQ4gApMjzVMJEzxWg0mNPSaBoiDpP8MOKvwkk7kRIZ00kmKtzqsHGGh2OKAghLgiOJEzDXEBy1EP8UAhMWa/6EQTWcPf1jav/fSBJBFfJeB/IuDXfVpCumHluXXXbEZY+zWpWsVsTi1ICjc7Erd2XIkSJEiYkXSJGAo/FgZcUWRw5f8ytH5pWyzX/zf/ddv//+iXqZWp//01////RVall29fpoC6AcRUUpJxtyZzVlkkZ1mpZ32PXavnRWtFWZ6Pp5Nj/uRp/dp////RUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUAIJSSSjDiRyxGcSxzLkpRXUxtX4t3uqWLdrPkHxqvc1Xur+j/7UaUW7tzOoVmpiW00nKsbXZwKkGNS22aqTGFar7/+3LEdgALiZMKbJiy0JWAI+gQib5oWUs30TsxqpVeNRP0mOl/rsdXYtmwowZuN6lG2Pq7NsdL2ON1eHw9SjdPq8bVqqwUaq1AURwLiaNimioTYqLkcCwXDYrBoViaEkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMSzgAWIAxTghEAxfqcgqDEOj6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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