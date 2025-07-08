/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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eCn7fKJtZt6fWYxt4X4zDT9f/nquh4sLrIpFa0OgQBHaC3K3JtdxA9PWkMwvS9SAVEcpabyO4CCvdGgsmh8CQMRLYBfcqQBN0KY8XWUBCbT2RN1QArONAT9ujJi5omUI3BA3JjIbLatYmY08MBm6UQKEDIYwCUDHFP+oyWBUQ1VE6zITWcjMRDuGtRIQIOQXlC1oZa4472KYgwFVVdCfVMnUyxCUCBQcE09Uidrur/U8glcVoxdJuEbVyxeHnbhLmrlTRL9r1VSb99mqSl/F9278RdFoMBSN7Z+R0kTbJC6ELhPgmGyZbyOD+Q6/sFrqZwEHBgCNqfDI3ue2+tlq0ifZbDaigLMFKZNYgF1UBUtw13Wu8qVa/8y5bkH///j/e8/colEC9lRWErvizC//9apUiZmDIAQAAI/Ao8Z2oGhoxoJkcSeARFOQoTmIU2xrNRaDd4I42UNrXDQxAxRbMUJTMj80A/M0CFiMY3bjZcNtIaKBhZpLg4ZoqRKxUiWIs5UxLUlnkhi7xcpH5TswkTclOaczyE+oaUyQDKXMJAA5mImOMBgi8SYT9Z6fZDIEBv/7ssRAACwqDx39vIADNysRNJemPWMSZRJjCgYFACiqmK01mIIBMYszDzOPMocFAsluXpU7TDmJQpgJZ0wBS8S6p6IsNUBRVQCltWnPCsKxF3X9VtLggAFMKRwzDtmtGn+l00ypnTOnep3BWFVK71d2XJiseUyLZFkl0vUoEkUoM16emYZMcgDDKXPWX9Lar9VWLPIBVBVSsRnGBAkIyTDNOMIFNWUK3ISkAym0+7Muu0tLS2cf/KtTU1Na3KYZjVreOOEqhp/pbzLu6V2Wcs5i0zjjz//X//5ZZf+8ccef+8cssv/8ccf/eP/lll+WXd0tLS0trIEklJuONxlJSjK6uGuQoipY6UIyQfAoAoDAqmEmfiHmIP0W4YI7iMkAJGQgh4dQDqBJAoQdwMsGYEfCUC0ibDBHcRkgA5x8E7QtojZxnDCni3E9J8UIUwS8JIGrCIAlQFoCRAmgSIMgGeCkCDjqFxH0O0jRAyQErJYfSFJ1FJlIKdSEa6SaSaU4PRISxU4dKLoITq6utZFIWEI0HxgRigTiYUkQyHi5ARkh5EqsmkugbaQrFTh1RGwZRFSx0ougR67/qCStIGIbpppqqqqXTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==';
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