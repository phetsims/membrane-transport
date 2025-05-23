/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//s0xAAAAAABpBQAACDTCqXTPUAAAwXAgLCoC//qGNGYscA1z3/LH7Ptp6gykCwv/XDEGCuIgcNCBkAwGACd3gaYcAUTDb/3NE2QKgCUSEeEeHn4AAAAAAAAxjkheNHLJCWehQAFfRK83gfXpNuTFJjANgHYwCcADS6ZcYtQMbGD/gsYsARodEmpCaZymQsz//s0xCMADKhZb/n9khESimm3tvAGlOmiCsKYUOgUnL6RejxtU1VlqYrjs5lMqjdfG3XgagAAAFK23WsAOMVAMCBAQLRUEB5jB2bdJG5+AGHQMGrld2TfFrsMnawqC8GCsEhOWKwySzRoNXvr9RQ1Unyph6vyP63f1gAGfk2skAYaZho4hQCB6VpADGzkJh9A//s0xAuCByBHQUxtgvDchmVprmCOiqnY9xZH7hiMWT46PiUfLka77TZdttW2qxF+p6/yP/v/6WUKkicARSAIk1No0JIGDCsAYPBZxY0GKT0TXs8XmVi0kPuPADdH95Q1d8s5XT0iX9VH/+/f6vRVDlAUABQLMJAMaJiP6yQgAihSOJ000rKSu4mGwYRBp5Yk//s0xBCABmQrIHXBADFuiqY3O5AA3lPOUYsKxtWrnW7X/u///+v0AAAAAOBsJgAcDAAAAAQctkyHBswgEwzTKA/fcEwqBkBCeYxCeewx2f3/8e7vkwSNmh4sg4KzCoNzCUO8/NNkDZjWxjdf/s4LttPOAVIhTv//6TBrL+1vuf7//nFAAK5cBBAFSs6HgMDI//s0xAaAB/hlTV20gDDqB+h1njCWRkokYQYhLoeyKH1DZCPNLi8MstqSrV4KHIj4l3swZ3V1Umkpa6siy35Y1G2b///5r/+wAAAEKR0MKAMOCz5s0BQcZPAHxvfmGMTKcME4MCT0oDAjCVpwll5T0gqsf5p6NrYklSfT/+3//9X1+hUAAB/MIAwiOjDhjNGq//s0xAaACDRLOy5lKLDVBym1jbxOIycywdKjl8jOfPo1RJQ7GgJOnPMgwHClwplqDxToJFYCaMTQKgoTMtrGHx9rwJ/5P//5P1gAFN6W2wWICaTGAD0RCz4V2z3gMhA9k+IoFETVUMSKJy2ISxpuK+/le6SUyV3r+//1//Z/1CADQADFsQjSmdjM1EDMovDD//s0xAiCCAArHm77YkDTBKYpnvBGjEXNCDg06VA4jBzEdN1dwGLk26Y+oGmBI0OqlVsCC9rL3yqLLdAS///+36f//+wWpJJIgAYmdhBiunYUECOZGQKdyWpkoXgYVqBpiJhO7S42IepQZFCVkj1/U/3+sPer/53/qgAALslljAIBwBkdWYqMECIyJ9zlStMC//s0xAuCBuTFJUzwQzD1hWHpv3BGBUWPaQ7muNN410AXv1p7H/r/9P+gv/5//T/4M7/7OoaAzcSjAAkAHfuRi5Gb0jCweZhpJWnKWQYpLAGnRgUChBBS/SJhm5Zd6vllfaGqlXOt+HPT8j8gmrBLyu3+igAisGggGd4Gv+HEjnuuEwdZi2JTmkCEKIQTjxVN//s0xA6CBsglAu17ImClA2K1jOwOV0yjjLVBRrDrtFFaYicWR+y/1/+r93//+oBSbWuxgDpgebNWcqhHAefSMKa0EZ2wGTPSiZrW46vJ/b5b7Pt+31f+igABvckEkAYwUpABssYMldjhzBHEnGpaCVAPH0oLorU55kMEyCS6v0//b7m2fTrLwQUUACah8Mgs//s0xBwCBcgbDUftgnBcAuEoFJgWRjoCgkSj1uf/V/Z/+upMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//s0xDaDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//s0xHQDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//s0xLGDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
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