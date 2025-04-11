/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//twxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAGAAAIkgAqKioqKioqKioqKioqKioqVVVVVVVVVVVVVVVVVVVVVVWAgICAgICAgICAgICAgICAqqqqqqqqqqqqqqqqqqqqqqrV1dXV1dXV1dXV1dXV1dXV1f////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABRgJAKHQgAAYAAACJI47G5tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7cMQAAAtIQxx1hgASrRjotzmiAgCHLv38aw1yGS55pec5ga6HA77PMQct/lMFBGIQ5Yve+EgEAAAoWiABwRBIMFjhGfBAEIYg+f/g+8HAQdg+D74kDHlwfD5QEHcHwfB9/QD/RKHMHw/1Ag7Lh8AAAAAAAKBwqtyNu0f80ijTQqNN8hYyoUgOZzORtMahQzU5jKxUMZHwzyXjGIQNxHoEhkz4JzQRCNPq0ycEzvOjNLDWMQ5segqNKzWAqS6ZsO3qjhiAquXtL4NKmbZgRZgBSgwYPc2US2HlM6OkgJ+C1ar1LF8zrLngguKX/7Sbz+ijDwNkdjUXvU0/JtYb7n//Z7veV36S1OUde3fb9+To0u5z/0ynq/oZfrUAJy0AwBQTEgnNuNkxVIii9Bc/gQJmNh2YGFgkD53/+3LEDwMT4PFEfcyAGgqf6M2kiuICBIABQzKkCKDkIoMMAUwwBirCRGiAJuCqLePIu+vNF4k36Jn0YiEhrSqVz0VopZLMH5fqKw3DdJeopZP7krO5By7hM01qzQXb0ull2NS7nyzOV0d2VtYiETmpNjh8o7q/vC/RxmniNFFqKV3I3hjYllJ+89YXsPpOysBTapZ0//oABOXc2Dk9AM23E7GUxRYw042I5qC3DFAhZGQkQMlQyMSQBzsRHy7hqDqaQ8gaq9yxJZBbZWRN/B1RgM1flbvxRbA9bIRGRMKQKBUNBwOEA+w1jApQoNUlXbpCRwUdCkvu3nTZMCo/JqFd6/qGY7bIbKXxVVRepAMACBsEqexbcjv/cgAU3LwIuBNkcUHpGGs5GlBqHhB2HFwopAUVAasgyBM4LP/7cMQQgw+U/UZtJLOSKSZnTZ0h4tSeNM/KplhoYvMoOLvgog3rIQLJpAHEhOwNGxdQUojI9M2hB00laF1S/l3q73pLvvoYSzH/LuEMtO5Qdc4Qr2uh6ByRD4Hnd87tOd/pkHBg+1JdknaUtaj/ev9YAJRcxj+BEQteAmTIOIVAEuZRwRk7Isan4VAFLWuoCTMPBBxsIphKBuypmAQGRGERggSYwgRBRGHdGS36NnTSXYm49D0Sd6Gn6f6VxQIRyiwsyqSzHC03rQwaHoyaOiK+V21lSUOzqum7YdF+qqq1Ndf//9TXHTx2nKx/tdTN1ZV3niRNfxwoLtZdWioAJyVN5IU1mSvYi5K7GfrkYddg93rDbSdmLxMjhKw/jILEKoJFonFRRAuhnLdBK2Jvea5c80ZLrNR/9Yv/+3LEHwAN2MFLVYYAMi+Wpfc1oAIbiq50/7zUc501W9vW+HK1+Zy73/q2ACnXwVEo4HXCUaoi0WLGQ0qS66mf+RCYodc4AEAAIgkxGOJuRtttyg2DwGBzLAGWiaVQQePlCx3BZ0FyBkkoNFMUMGfAIUaPgoMahSdaamqGAUekuDEmGCCw9mTIxUWmMsFD5lAiGDTX1ByiN3bJb1/f5Eph2mk2bV3HtS9HO3cNfvnP7ll//3eu8/89/f/9f+V8V0d4uzUNK5YuoKHULSvntmWHfMJsgBMlJsyz/WyiSuwYUEhIXITFAkhK0IQaMIAzOg4xgjOSCzCE4ygFCgWWfSAM7DzJQVRRzU93lDgE9FyETTMmqkIChM1IWBuUnnSxfgiKCF71CcTB/DGGajXFqB3IVDDPV+wZZnThHP/7cMQ0ABGMn0m5vIASORls9zWSQnAgcoAtAaLzXP/PV3//4HbeITkUp+5DlH7OoO8/9Rn1f5r//QlAClGqi4r79vsLRAMAOhRBARNEaCQjoUyZ00xselrKa9TGncGfNizJlCzm9FZDGJcKMv01QxBFYS2SiymsZtVuim4gVBWAku5PuzScr4w4CIjXeOZkzJwFwnTLHSpbMs7+Wh5IRhJhpwiANWSkoYdYbGqPv//+sex//jQTVn///////+5kCvkf8Nr//kjNbAKSikc0ts8tcKC1hYiyktyDirFYlA7WWss5fmljMtARwGQolW6XMzjJTnNRBSMtVUcdVEiW7zZ9MVQMhgaSi5L0jmfE9H0//t/Bo99Cw/DEEFieJ4giCJ5dJqq03A2nCcNQZJoTAuSzBBd0zCT54N//+3LEOIALOH1FvYMAMQUDpWgUMA4tERUNLO66wVLHlHv5H+C0FXA04GniU6L//nip0seU+Gp2esney2iIqZVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
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