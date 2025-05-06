/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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JGUP5WsBxGaPUexmnSoWUlgAthlR5KS2zc2Wcr9lDychHZKkKU37xZXfGhAwIot335nZtDSmFPlKhcsM5SCSLYpBp5ihAQiLbSgZtom1f6j/+3LEXQAMCPdbrKRssXSZKqj0ia53xv1qmmjaJQSSbbhWQkJDjFxVEAIwph/C2nC1HKQlsX2GOvJ86DzOFPHaLIXQ40Zt6I3OFejYbkQtCTmz3AQWQF/IzNdpmx/nxmYNyATRszYv/jAiFQy6J/cKsJtv+5T8X7f6Pc/6k3EkSQAU5ZIMW6F5VcxUCowHoflsRJcVE0jEhuEpFuxfPIlacxj3VqUhrDIMZc/P26TAwAWJDR+FAkb1YlUjDo7OrDqN3nuv9X/+v9EJxPRgAua77gt7mEIK6dSKyYtnuqTMKRJnFouBHkcUSqtRLpyKvVVtf/e8zzUyB5gWC8VuPKiRfR/+61TaNbPmP//Yb7t28AAJA2247IrNmC2IdHspkNOmLjMGLaCxCTFilVQhUgAEoTIps2SiINMpbv/7cMSQgAxo4VGnsHRxMpJntMMN2moYbH7K7qSsVmwqgPs1sGfvj5EROWylCuXHLJ+esZf2VmfMSvibJSsYv/I88l9irbN5scoEpll1DhkPFuvz4ZHwythwvXLuKLTyXUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUJAQk2d4K4iPhMoikiJiJKqdE7TUjVJHybANBKzYprI2RZKc/9WjVzWmvOHaR7EjkjUTtNwlhJ8r/9rlv/+3LEyoAI0HktorDBgdYyIej0jil74SKSNyv8b9tluz0bCRaiR6LolJGo1s06LJWRglBKyJSWaRLUdrzCRq5z1psEm2nytn+WqfNO7OpJ43+YJGqJLBS1VRaiTzzUqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMSwg9ClovGEmMAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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