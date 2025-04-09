/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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eHSpEJPGySpo0dJEwEo6YAW1387en//Z9QKTYORoglLYL0fijWtZHDEfGI9FcmFAGwKggblkyKpSQl7lywTjk6Q2zSNQ+teWsMRs0XQrI1r/+3LExwAQFLND5+WSYYEQanz2DWyVMjuWUxJvFj0nBDLM9frLIYnqy55lkcm9VTzWgnIwfKapVjsLYlk0WE+YXoa1rBZMsCOJhc2Of3NTjZXaDSn19hGt+zL7395lCaGlF4WSSWgV2aio5aB5nMGlmtiFdEiKt3sohRUGIjVwStnkg59JARHKIJG02PWGoARayWnl6a1UWLPQJnEsc89TmWgyOJRfPxMon9UXEDUg7y9ekUkkUTXI2QkD4yjSBaaHRp+o5xuT61NxPMLwyiZWE2RhQ4cQkdeDebJiuTJEwLIOcI0LawEWE0L9fl4jupJ3dvM9U/Wjacs05vDrMNNDtlryNbbRwU9mOsUDSsEBhRhVkDCrkYqqquaRxqrXOsi1kVVp2zMkUf+aRn/1pJZqJxLfU/zM4ckUSf/7cMTbgAtkp0mnsElSA7RiaMGbbOWS1zdk0jn7Heqokk+HI48toKAQk3NNI/zneZYGCqJIz6s0ii0tXecOARFiWu1OiaAUW7zW1VaxJ0Tkf5avn7zlV3IkkrI555xGK2cb+UZanlqytNIyxxKZnyRz9q/c3KfXlHK31OSRUDJcYkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoUW/WWWWWyyyy2WWUEDByyyggYMEDCPKCBhQQOOllCopHZ/+hSglIdn+zqip2MUMDKKLaTjQIDAiiyi2cospn/+3LE/4AVbgr7AxjNym1BHmAxGMHZ2k4so40404sCAwICAyiyiwIDAgIDMJobnY4sxNSRE4ssouLi2d2epo0os0ouLz93a1JEQYSBAQGIJoLx4r//9SAKFRQWFhYSGUxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMSyA9EhmppBiNqAAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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