/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//twxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAGAAAIkgAqKioqKioqKioqKioqKioqVVVVVVVVVVVVVVVVVVVVVVWAgICAgICAgICAgICAgICAqqqqqqqqqqqqqqqqqqqqqqrV1dXV1dXV1dXV1dXV1dXV1f////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABRgJAZqQgAAYAAACJLe7W57AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7cMQAAAxsTP51p4ASyCaudzGUQgCAQHVTpDpFv0FAhjjBnjgQkMKdOJEN0iCAJkT5oz5kwbAgAALeD/Q9zThoKCsfCvZ90p73w/fjjgnWfWH5/lAxB94P9b/qDHEDgxhgoGFg+OB95z8Mf/lAxKODHKBjn1Ag4uJQWi9d/LXpJZNY4rwBpmYQwDJUiVPKXsEPQmRmRYcAAASQBR64LinmlsjgER2COslJgQOHeBmQOEU5XWTABUOWP3csQ4g+lfmrG09aaOcvr26TkghujZfNAY9u0MJnp6fzfYfvwJL5mNNo/a9HzZQ9reXcLf/Y31t45hyESC3Y3huGdWPw5hhyxhYp5fnh+6eaiiQiRH7sy5CWuOZz//////+T5clk53///L9xaMjoNJOKUgABduKYAISbdiCrYAf/+3LEBwASCR1nuZmAAjIip8+4wAIMuJDayaOQhw6bcSdFZtwvWXMMZMs6DYn+BUwtYpVEkybIoIVDIpPIFczNz4nodJUEBqDrZ3cxELCxC5hZSKKKJi3TWLOLYyq5dOmhserdB25u2b1jkp1lbLD1mhBhQLmZNihhjSWdZk506jc6tGdRWlk+O8nyAG60/MC2Q0sOTw6HAAAAB0LG4mFRiYxC6JxgMEGNTcaOAZeFp6aDaFujKcVMsEUxwETAABmBJJgAxa4ggdWmMMBdHE642EVz1YkqFyVYqrK55mvNX+syZXgXXk5RIZZqmPpKZO2ZmZmZmbVa2ZmZmbF0da2/RxClz+mVsBypTKpSmVySTelpDEldCJKm06SSbYlE4PSJX/+6AADknHgKX7Cx7McvQWIq1TDoaOAB5f/7cMQLABAc5T5uYO3Sch4pXbw2mvQGBYoCgMBGJiTBAxnTMZyYRgKCfCnZlSZQgI7QkTGmlkGut+yiHXfoIZkcMPw4b945funch1KkFvOzhMtAfKLj+TrdlqMDWUDgQ7OUWehoDg//9N1/++x2ew8UJkRsVQ1/gImEjTKkf//UCEsA/bcZCwgmMqIDgDUw43NZOzE8MzNzAo4BlYwQUEQUIxECoggCTASoygZBS+YmAgosMTJTJCYKkIhHA4FMdBA59MwBjDRkxxAMHETY4YaaSAbpxKEXJmqCu7VfV12GQmrZmH1esSkEwXvnMQhdiQAOeBsEXmSS93ZdekgIQHGVSQHm//WgskCSQa6k0FqR/Wh/+d08y7/FM10dFQABrNzEjTlWQMLJo6OxjCHxi8R5kdHplwjJocX/+3LEDgORqJM8bXcg0dmSZs3NYMIIQCRlJogGs+Zx4gEWsdOgMVIhh6UVTAgAsUm4aqCYZgpLCNbAwLXXtMkZfaAhJ9VFeu8fqlgMoJs/qPJjo6mUaDYAUdC40DohVQBDF6xgRStFUQnI+gJmGX3ASJjGurx8Hc/sPa+Vd//qf4Kqd1f/ev+XpeKyAwGnWDIEIQxuADVF7O0ikNYJSAS6vR4YMOTADrNySARVLSMTIkrSWu7z4QTI2ll/bs2hKeZXbwkwp7+/XRBRFsYZQGW6vs9LMUtKxkxDbu0FJFSlM6hQ0nUAj5pKppIryfB4muu9opqr+hFf/3/u//9aAAFt2AREBAzHZD4wznDDOrzCOwJ7jIgB2DAhFSABg7AyFI/AFEIdni6ibdZWvCCsewJkGJOTv750vG3TJP/7cMQegg08kThtbYSRShFl6YSJ5hALFWi7UMRRxNBKMo2ly2l1q20y0GekyAxVgbMjRViTK2Xf/putpCbKXM3f01ekSZLcxJMUEsQHgAJmGIbBsjEta6Gr7Nu/smd50YYGCd2u1Dn+xWTdLUJ1hqMla3NjK2UKCOz/MrAQU4KGu3+trSRXb2kirGkiWdaSzva3tR21TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+3LEUgPAAAAAAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
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