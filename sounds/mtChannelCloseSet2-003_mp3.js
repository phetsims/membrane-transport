/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//twxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAHAAAJywAkJCQkJCQkJCQkJCQkJElJSUlJSUlJSUlJSUlJbW1tbW1tbW1tbW1tbW2SkpKSkpKSkpKSkpKSkpK2tra2tra2tra2tra2ttvb29vb29vb29vb29vb//////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABRgJALCQgAAYAAACcs3+8e/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7cMQAAAasA0G0AQATWi7t9zOCAkQSVJbbZbqoD4Pg/B8H3wTPlHYgd9R8o4u/D8H6gx0Qx/xBE//4ggh/+XP/KHChyqCHKZSCEqzFp9fi2uzud0exkTB6MK9OcMHQEhRhhoZCUbEwU+W0ZAFAkKDAUCHC38OkVk+DgZVVF1ajLwQBAY09QtdCVCczL4oxCKuOsVaqc7VA5qVMEO8mGqeFsPcdOJqbT0y2bSqIyiUSvVPWlk4+9lpLW2dtfhl34rqXSr3HkNHYZ2/fZbF4clMRg3F/L0jvfrL/wjdP3CkwtRqHsY3VnojDkekUd1Mamb13/////+pGMecy1aq2KbL+65hr//eXX4pn8nMOZ8zzsczjFitvHeWWWssvpqZn/9IBgAUgJUSS7FljYbDhIvJiAEyJVyL9UeT/+3LEDAININVbvZaAAYqWa3600ASOTSUGZc/S9nZZy5iSJKiagOljxqcMlSSSWytaKLNSSNT5om6SkkqqjMepdRr6S1oqXXqdX6CK0jjq7mVeqbdlCAsAw4AwC7/1elf/Syw16JEYQxbacU3Ch1AK13UpehsIUAgoS3WbWEEhaPCjprZg3AOrPASA/jBl+kTSipakZofMlrZO6KaCTIJN2WvbdtmVW7ZxJV2dWqhUbGRcaKr4NfzxY8KCQTGf2WqT1bH/pear/MUAIAAQMTKXQ1RyJOObXbMQDrpGjI+QjAsjdAaLNaLowWheljWT4hYkxjYVeuqpDy0pZSdxQoQcRy1RGQFUW3vMCg6XQiB5TL4KgWBmZV5t+KL4YzjzYqaUQyrhy3La5YicMSupV3JKHDP9Xr0ul3JXT//7cMQ4gBwFmUv5rIACjzJrt7DQBRumlkiqY454U2srUoeeG4u7lj6LPtPcp6nzNq1dy3hW3ZuRinlNNelMXhylqyjf8p+7uaz/WeH2v5r4MiM9PUsP2NxenmOY///////////////////uz3lFbpJRN0et9v3v////A7BYwDgcEQDBxokIDoBDiSSTELUZgqGpGV+QtHRE9U5peX0GOi41IIxpWN+Uy4Xy4dMCs2RKzYRgegwh1ZfdRNL4l4wY4xziXiTAT4SABLhRBsg1hcAScexsdHucHoaiXiZnDdEyHIXS+mPce4wgwg9DUvmBPLXKDU1pqRUcNFppuutaRcQQWpr9Kmpmd/RqU60Ue32WpP0P7f6dC/bvfqupkFugt0Fm51zSOI1IU3QlzKy1+IynhGo6Ei3DGO//+3LECIAMWPFxlPQAMw6oK/cxgALB7ltVJeENOVEo1tB0YWUxR30LCwsfMC3Vx/yKiMHUN3yr8rTeK6r/mhzcrSrS8kmp+65IrW0bYyIUdtf8+zRscUIDHLndzoiPvtc1SNf/s4+olJONW6yRiANCNaO2hxA+0Pa6qZ9YeBg3ULBmIq3qPQ8s22dkymcWjRod1HwsdR9cgoZl5ZhPB4BKrfdlLyptvwutNNk+OcPqofArhPNDDhrvkfMC7rYFfTsdhUPXpjLdgtgg4vynkjk01qAZVGv5RT2u3GmK7t0UodiKP/Hn6ma1NAKTzyxqalz9QXH7694AdRy43P0/dNKZdXy7EuU1qpUuVcrmOP/8P082yyWU8OUmu6f7WptlsZrRqerU3//089YDVXvGVNUgnHt+AUCoEdE1Af/7cMQHgAy01WG89AASNzNqNp5gAyRvk0H6yJk62ZTHUcwjUzmE4uYI40BQ7gGtWOj1FW7/KOYPe2aaKv7hvUlr/5HCYQSZG49rb/2ZmX//D4gofA02QlWCoCkTaxLrngV43ebaLqRbRZ6cyrEVK2kQUpdQB2DUFvV4wCsS5diEKM4VWkE+rjIUFNAyOMqAT7OLK8PGUjpY5Vmuzx53FpInGkjW3M3NUtSba25879qyso1ndrjcaRQMW25v+7MFoFlFmGJmJkUiLF30yDoMazLxI0kCkjTUNc5zjRRR6t9WxO1Lz8o859RqaNONNKfNyv9///z72di2vKqDNAGIiqhlVFWV3Pa/7SCsOyQSl1yAI7AB4BTF2EHAUeXfCGlaXKG4gUQEBqhKw5QPeKAHSIVEJxbyDEeRo5b/+3LEH4AYVZNR+ZmACfUoJxOwgAFYJ4gxBTMmCsPZ4iZGGJkQI2PIoEoXUyfNj7pKWovGR5JlmxDCsSxaKqJiWTyVTI0XNicK5cRU58nUGWY6Sjdzc9QOpHGdlm55MwME0ki8Xlosk1aFHrcwND5MEQHGbumpFGtExIcfWk///LhPnCcHGcJw2LhcSOkHJEg9aKOtbFJZdQgYAAgA9+UBO0UDVeqGshLOoBSUh1onulzNP9I39ohUVIBsJQ9QEgC03PDcsIIeizDRFFnv/hslx1jjoc2PKuY0H3xNcWs1wwq3uMFRYaM3YWFYeBpDjqyxlWsT/a/HIyahlptp5i/9YvXhL4miosx31f+QbChRZVa3f+WXywAFwBAAjXYTgBS4UDzVDEEekugaGEgVZ4YOi1WrZlT/U9ndyf/7cMQSApBxAx0tGRUBoIreLZYYWHrCyDChosmJJPIkMFAoomAUe21TyjJEtjgFeb3/ZISAUal0cOBgESrdYmm2FQdDwBYaKmlFg1JHNMaw0HA6AUZf///JpIrAdJSXzyQkEQEBRE2WCriLdvKgVW0JCURAUKgHMuAEljSCNQGT7ko9EA3Joq83u+ZX8tuy15UxtFoJETiwTHNNCpYkFTsKu4sFRg+08EjwVdKtkQ0FArt8UH1SoiJB0JuyxFwVAQuAiR52P7TwSMyREJhIKgL2nnx/2xgFYoeMHjRiTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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