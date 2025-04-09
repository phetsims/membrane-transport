/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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dTOpNgrt7WEzrk1m1h4ZxKsbmonHoIgxcBRGj1BLGmBwU49AiKuGNe2OTmA5E5ajwo8acXJOTfqgY9BaJFS5aaLURMTVRqCRswlOmxuSYtH/+3LENwAS/XllxgzRAZmnLfj2DSpnxI1/5b/fhXRKuftTnavV1JS55eHtblkQkxLSpGDZkWfbuttCkKwkZx8vDOysiHygCleCdGKLw8DnLaPt+GgDpLBcQy+KiUO5nq9iKhNhyLl0NgUIO7L2lRyLtzPA4UnJGhpxJ5z6fnn0kkkS1XzNjr5JC2iF/+yIWhpOT+n/+RkRQ/qIMqkgY1VOxZ1SuYrViXZmZmQ+5RVDMitIayGsoSRGUSoTJTsJ8DiMNOyq1QKZ85VbTyUFFo5TZ/VfnJHXKqSKOJ7WYzy1kH+MxQz8zVp94x/qzXv//e7N/qfsYCJhsK8b8YbFdF/nXRkpOKbib/f/2Xdv0FzKvImHdqykCU451FQSM3kStl4LGYZMHMQC6HRz5ZRK1B2eLV0OZyu9LpCcov/7cMRKAAzxAXHHmHEZkxQr/PYNKC/J/kcMUJaXuJqIOVQU0gpjUcmtiwsHDQkVHuBkqW8VrFSxYsZMKNC1j2zqjTUOCLhVxK2tBrtm1Yy9q8qGbRAppKvFmEOPM5gzTkygTKLqUrIcZAEKInpGcCNoYIISibSacrmjEX47iCSfbyEUM7zSGeeVCd++Fp+cBAzp0xSE+3TBCM0p9figptsTcNQlCqbaRQa3cLpecN9dLrEVNO6nIAAFihPeoDYVDtsAlCeepjJacnqYV6kokmZjpfsxrnGYMBGFICWMBNlAyxmbWARBm/WAUAj8sJRETUVAQ+VAQVdDXzoMltR3UOPFhL6ZYSljwNLCQdLDw0DRX4lLPdd3PyWdPEZIRFnlSyrMj+R/iJETjSizCaCqlnZ2NBQYSKAxAsT/+3LEdYAMTONV56RsQb8VJ/gWDHALAyiyjzLi7zZo0q4Rp2drjd7f/9qmnZ4uM2WdnYs0404so8w+8//Z/////k1LOzlGkRQkUBgQsQeWUWVEDFwYlVEppt//2mmqqqqu3//8qqrppppMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMSeg81xXooABNKIAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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