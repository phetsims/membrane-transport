/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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VbWJZx40weKjhYabJgsULiYOhoiBCMP7RplVtlVrMslIGjmskS/qt3eFZ1I0gUpfhGWsQQAQCmoTDsTQqORFUEotWOhGOHOJmkiyOTByzTf/+3LEFIAKwElf57DBgZESabzEjaAJBI80XeYlh5QUUKRgUFENhqt2gXF0vHZ0iyElZJfvQSpkQq3jZJYAddXERG56vHdmQiJABU3DFlcYlA8MyOHQApF91kQUAacyRJnG8aQ0teJNLPihRCmPzZvZmY42sZgICAgJb+zMKUFTolKsLMIgyE1tFxgNA08OKDr+InzcjlkoU/2lirjpaCrSMyn/llSyqmqseJZBFIAEpZoyn1HGLuTcLQWB+qTLSaHG/NIuSI49FYxNQXfbMKQ9o3abvbIH1PRd70KjmSRWN37u6m78trohWCAssFTALJAiX5ltDg+QFIomwPkHvOKR80ZNVnFQhIQgIRBKcs2BULoAbOE8x3HE9UClUP4R/o/LDEqMHkWVWRxfCny6iB6TpSI1DJcuLOw7Dv/7cMRJgAucx0nnmE8huadoPPYNOBk4I1lz6q69nPZm1v0vsP+ZLG/2rLiqsM2ometntlzXUmNVgoEKCiQw4CQaNRKSoBGAW9Ln0aP6akdFVqZjBlFOSTUIdoOU0TRJyTk5UOUTNMchLhDJEoTNDKFCqhL6ASgIkoCAhIDRsRKBpY8SgqEgZyoKg0ehr1g1h0DbFBLnazoaUoO9YK9R6sSgqCv2hgXemm2m6UbhxvlJgxoQhkBLRnlc5e3pX2jhSJl2eMy7ffDJJHa+ecRIgu8WiUaATDgVW2z/+WWd/5FcGv/yJ6/+8hZZFSkkciQUiAiIeRoUULBMNFNS5qvPqSiVkVbwVZoTlUbjFnQaySZ1QGA0iRipb5JbiyZ1ywCMDyxGAzM7Iqeg09oqEjTVEzMtHAXKkiyAmAz/+3LEdYAKxE1B56RMoRePY+g0mYBoVaRInf///t0gPfRlyJyNokJFRUiPMixpjxUzFjT4pewBETLTTAKRGaArqJAUVQKmW4qkZioCCZHrSEiT4qRCXtc3ixICigFIu/GEnxURmQkLu//8U4wiZFjQUJGhWkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMS6AAsMaw+AhMXhVIBdtBCMAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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