/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//twxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAALAAAOsQAXFxcXFxcXFxcuLi4uLi4uLi5FRUVFRUVFRUVdXV1dXV1dXV10dHR0dHR0dHSLi4uLi4uLi4uioqKioqKioqK6urq6urq6urrR0dHR0dHR0dHo6Ojo6Ojo6Oj///////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABRgJATdQgAAYAAADrHhCSuEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7cMQAAAdAARW0EQATCierdzWkQiAkSRGkEnHOfKHHLLg/KA/eHy+Jw+5YPqBMP/yhzUD78uD/lAQ/BAEMocy4IAgcg4CHOLB//ygIfh+WymQxmUSqVSN5q1zdiuqc6hoCryeKCQ1pUZxSJqh0OIsqkjYWbHmaJNrnWu/ZljhoECvV7X1MGoHoPGYVnhc7bi3aH1N5qoZ5Ibo0YMKpgi7GHrnlfxCzN1jNCi27XDSFh023sWl9y7eeS3SYXwMbRZQTpXln2HRiUSehjXcMP/urAYcY4FwaQax3WZnnSyy1Tf/P////9KCXzDjtikNLDENwn+sAv9//5/Of/P//s1K87c/tjPDOinvwu/d/7uiv3vVGhBISIQBRKSdFhCFQOZ/SZo00m/EKcFPpmcsmZziAQSkwWwVQasv/+3LEE4ARiO9n/ceAMciarjWEif61ZhgMIL8LUnEEPay3zM7vFbZzqM/+YsaNKpXNRO5W14xvYrFIyLyEoyauP/nP//tf5994+fvy33aJBlvvd/utMV17bixvNjeWqOwwGLVdxdDhVTh90r4xHa9J9rL05hC24u/vcqtFpIJpFtpzFFTcuAitIkIu6iCngqgvF+H8k9pr1K7zlFULLIIkpQHQJNEgmJtqbeJfECfouoh9ulOSrPTc9Dtb7jfSTg0048i6rEpXwYCEBfguZopY4WY+kJFWoCpYmLIYwUShbCpbebu/h0zASJd9c6rrL50k25NnyTTEZzyt81iI9um/EKR8ia656QwtqEeGw2FyNUNj7ZONRZNpk6q0hMVCk0JqMPTByKj9tP5w/ovYzQWW5O9r+8TzufMhbP/7cMQmgA3BPXVMJG8yTyntKYSadrncytxQkNdiI8yBflTnlnwgOFfAA456gqtRgqCpMu2AqE9rXJTTbukIgKqrNCr2xIrJWQaqqsxAMmSyhTueXYj3A0bgR051YRlz9gKTiAGgD8UgkJhmpWqQ4p1hOAEQCZdQKsFmBWKEImPCYgRuNJSS6J9SxNP+4dkNKDbFJ5hEvCNstKrLUTKrgJEgEJXy4Ov6zlV2P7VmftWv+k//5RpHQCV3KCpgS2loNjyckN9omkTxVaZBx2VFpONuXrI2SYoAQHjdFBIZyrRiHrSYKxXD5vO8UahivrSGUx5YCMwtOGNLuK5ZHMv76zY2O8mEQa5Eo92vG347WZ8xszGqtwYkoxnZH135pnEqGPYCSVMrZdhlDBigu4SlgzoK7902CUpJMGz/+3LEN4AM5P1rp5hTckOjqumEmn5NF2anjZrSmEoscJshS3auqkxwgGXHHDGRQOA6S7HQX6rAtadlAiBiYKnxJEuaTkOgWbLDMabAQEGE7blDOxK2lek56BhMDZwUCMnOvUZtKDrcVKEEsgZIFgTUW3oniAo5ChaXkJFWbHGCj5G4lkRKjRQ13NGvPRnHbfewYFLmnR4uWIWdelfirQAk3byIQkNC4pjPhaoRgg4NNd7i7xQeXsEgAQGAFTGrFlXjSkW4lMWuYk2R5VY4ewUrL/qtbu7keaw8spidtiNmSwLO6gOQV5bEa0zJIo6AwCLJMQV3Lc+Q1Ow7lRpUAYF2BAZYoTZ8mBwUYErufOo6Seb92ulQMDF2JSTf+CYXBwYCDgh0Ht71f8pZSt06OauiJiShXOxcuAAFzf/7cMROAxMdZURspFxaGSPozYMnGno0pCIns2aaRRZEHaFggbIqAeUCFshGhETyiCIBawKQZA9sTU0lksVpZo461nBb5K541bVbncYdHLMB089b0PotZQEKXoMPRVSdQxBBD+y51ab/ya8xTAwUkveb+cSWvVAmPr3+zCry9974131h/po+9/T7kHS6SBD+m8+4gTHLk/nHVYQSAAAAS5vud4EZ41GAEQMyPWFVE86Fiq4yJgJgqgbUmctIcQeCxRj7A11w8+comJDE5awN5qR+n4iUDuLICziytAJMg9h1FgqwcaF1J2lZ6caNiysIO5f8c//9uZrq4b8rtKR+dLxsVWG4LE8dRyJZFMieiVjiOAlhCTqbEhuZUqnmbUputNxLnmUTNHmXF2xNTGSSq/js2Rv9QAAt2Tj/+3LEUAETZTdPrRmXGhAdaB2GJsK9A8R4WFeHUhnEYXH9xjkDkF6wtUEHBgxIYclrABkkSMDO0S0LQF7IhKXSNi0bVtLoyhvlFU0ZyYOQVSLQ5KDaTxUVJnzZWikiiGtTAn//lgHiAUlLjvZVJm8j/39pdCh6f/d385fMnTKQqp+cu9yT6kbU+MIr7INb/ywvoGuHKgAAlLwW1KFFw26RuGQoHrZDmIVskBrwYJeoUKFoiCK6BEohQIjPyvAkRkrlEVaSihCRhSeI0ASADmIGF/xcRgrD8ln5+OJ29Fton240RM5pxZanbr0zq+Xb3SDPJ3BYaCQ5JH8yhoCfcCv+JXyIdPeS2vAATk/IqZkkEBDI8SInxhYKqGSA4zKg4YuyxwW2AMxigAopPldwiCMhUEuAY5LwOWHg1P/7cMRSgw5QqzZsMFaR7BsmjZSPEky7KCpIS1F7XTLqrJa9TspZy0FMVSldLkgkDUpjJCCIEsqMJylJKWeMbTMiBtHJHdf3qQOJT+ZdI/6bPzhBydlmv/4rkmbKMXoAJy7geZH1Kr6FrOVVS2w6UM2ZnC0weloCMyom0a4XJ8mHa7ADoGF2apCpU6S1CUSjT5PG8BnUKA0tvWwjbnYZt1CyJpxISYObCSwC1Mt18j1lqdbg6SuIohtNRGlpXBsJdSf9F4lQABbu3F0WzoqpFmAmbZh7EhyxkGmwWKEILMCDBkkhoZzX/izrxphr4r0UlG1mP8zV5YmDw/SOITH4UtMPh6678BadKqldb8lIUtjwlpzf+oiy6pk8CRw20jISCTfuatAw2Wk6HrEdxtri3jtibPp/bUEAFt3/+3LEbYEMyKU0bDzPEcGUpR2WGpK/lembF/RYiayaIyYdAgQlQXMBvQaAEu4X6cdDFk8OsonW4KkjjuubJ2R0U2SkYCgmNsEubjaJL2Sup+77ejUQGkzyv+qPoN0ILggp45C7G+jstYilxK16f1nI1P+Z/UACTPsBxK97BjjSqTpxgClhAlWaPETAJwAGN6cDh6lTG0rkEAhAp2DJBQQukYsM1CB5TEWfOVPzkkcZqbhOkuZk0ER2A/0SymICImcGGd12toc6EtPJtb//2p4Z+z+j/X7+SrIqAAKc/K6F/CFIG8o4rnQAJ1KcO8xIAhDJKOhfUSFBwoFMYgIxW9S/KohngCh48YjcmUoeqR7kgVD0P4IiSQDKM3OFy0rna7EM1sdFYSlodpL+iGKUkxlKQy6PKZysjl17///7cMSUgAxspyTsJFTRkBrijaMLAv////1/9f/uGf8b+r6kJBKcu/ieHIPhgmqro6dTxKgcxOwFk1FFZ8RROLCWLAKJxKq2Zz1pyzUSIbKln8O+O/566672/89Wz7BZ+QfNyvRdVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUAEqbUCwIjpquUzFqyJzhsFttZlCo5iJS8mrk4ER4AchiSiJTh8cpB2Lo6oROgem29a62E9gPrrXcXcxv/+3LEwoMN+VsIbLC0kQeKoYzHmGoYCsDKGFLKX6hjX/sP9qtExtYYDS+CqAkFI+NVheqBjUBOqUY6Jq9KMYWkYUSx7RjoCQEK2YwonYCMK8FhJjgVgbk8VkcFdNhZKkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMSwg9ClVtRsMGvIAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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