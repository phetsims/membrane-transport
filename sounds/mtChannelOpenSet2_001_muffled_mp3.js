/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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yoi4+Au641V+fQA3JN4JIAhGiWMNBGMCxjMbCDM5I3MYa9N3m4IjDDjVJRTMOAArg0RoMEMQdmBoqoe2SHJG3Ru89A87L6GtcjViHdz1HFb/+3LEIwMRbN06buVr0hSgpk3cnXoLdWOwY7LgVVjz/Pw5w1NiYxIkgDkrpW2oKSmH85p3X///8qI6iJOJRKpBQ4rZIN5WpChz0AFX/4WXIoEj13B1a5f20f1AAlNvYGCQvGIgEGRQMBCvmA5KmxxfmNKXmz3cnqqYmOYRGXQ/G5C6pyogOYWJSJaQzBXZEkYQRfxY7QkxNbcCB41GH6pp6NxSldbslpJV2HsY4l9Ad79d+YCwqgPh4HQmPEkbHY87//6lSRJPYVCOCStKGHx063+W+qFmJM/qb/6v7mf5BSimiVqQEgAWI5hoTmFgAYzHRlclGVGyb8Mpw5GnO1EUGkOTKd4UBjOi+MZaeu2lTSYuuVtXaBsG0TrDxFJdDUUwyzLJJZnaohJ028u8fn+RPqO/+OFBocDitP/7cMQtAA7BBT5uJLMxYRrpaYYdnu40OmDQKaXKYehg8qf//6REzfx7v/qd8nbAX5mUAAXVHG6KYcSkinSjE5ygRBIyqOwTxY3uACnQZOTxUw87Yr1DlEiQ7rK4VEjoaXEUoxyePjxUXFH3y3HhsEwt/+YWGoikR000dNJHEWd/XXoXb/t3/XKkVQg05L55DiLCJMBGJBYCATQj0qNR0uQdZLhi0LCpCvmeBhsZEQwmIiii/LXXJHBTMZOKk2ES+DF8ok/VkoxuBOR5i9wEBEiWMxgYCjih9wEMK/6GDOHdbOrh33/DIiCp0Kje2RPf/+7SVACzkbabkF6PSISJqWFPAzSUibLYswKoFMDeCo+uuaMo3dJKnQZLnAIBLbeRKttIsXYBIyzwSL1ISRa8qkaKuagZNL9X/mT/+3LEV4AM/KMobeRM0Z6N5ej2GZYk02LGgqRArEhImMaaFUD2GRdIxppSB7DDEjGuahd7EqWAAAAVXLNaNWWWAi43EiIMJEiD4tnKLLMsMrFRZtQuz5oVFG4sK6xQWqFhXin9QvxUW1C7NYt/8VFOLCusUbqVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cMSCA8foPN9AjMDAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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