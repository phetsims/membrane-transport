/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//twxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAPAAATlwAREREREREiIiIiIiIiMzMzMzMzRERERERERFVVVVVVVVVmZmZmZmZ3d3d3d3d3iIiIiIiIiJmZmZmZmaqqqqqqqqq7u7u7u7u7zMzMzMzM3d3d3d3d3e7u7u7u7u7///////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABRgJANoQgAAYAAAE5d1uf/qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7cMQAAAAAAaQUAAAiBZ8ndz1QAgIBgKBQKBgMBQGAgEAP//MGgAswCQtP//M3whQ4Hi2P//MeUOkx0hbvA+g2gMkkP8DJBAACOoGHRV/gbUPgHfjoBoMHgaqO3/ga0IwGFwiBhAGAiQgGFwB/+BhoEAZKBQCgXAwUAgBhYGX//9x4LZBBBhFzD//80Wbs80D//1n402rg8Dp4q+9rtVyt1NsMAyHAnWM31uCcmy5uAf7vRkm3BExa8LQ0AI0JinpYIYSEOfzuFu8B5qYaByDPyLQkHWGwBgyAIFv4NSSjKl4L0k+sagH0e0IHI5FYGOtLwGEo1YoA3yNbA0kFDAzOjjAxbiLAw+g9AxfCZJQt8sPwMbosQMRQLQaA8AJBSBggAWBgHAuXE9R8g6HJcDBWA8FAZgMBJAz/+3LEUQAeHV95ufswEfmx7DO1MAYxhJAaDaAQAIGw/Q/S5AAKANAKBuBYDwFgSgYKwLgMAoElEnv/v1cgQxot4yQ0RO4uAmS8QIgN///8eyJEiRMZgmS8RYipJmx43IoXf//RGASmDHv5duKKqmKhjhBUQaG4ElS0q6kGniYNGrUNO1FjhAgFzjmjhRU6lozJJRNgu4ZoujpNKVIvOcHKBDAb1L/JkXKAFAWUTpdRbbl0MGgKiFxF5/6JdCFIsJeV/mJMhdYnv/SFqFal42/8myr/+T3/5kZ//oFVv/k1/+dN6voIth+3bbEqYoBmAg4o1AwcEcU5m4jeI+mKijqGyGIawzgltaTf+gg6xSRzluxy5NwBXjg78/mhunIiSz1KzYeAMukBUQNstO36ygBsSZOIDLeedExI4P/7cMQrgBFNj2Os4omyZjHp9c1Q/micDGBCCmS/1oE2AhWFmyBk63+cAYXK/9YakCxc1K3/i9R//HN//US//5YKv/4pH/8xGFoA3aNik1ESzCosMBEshDBVHKjRYDY79zGgrMBEATA6JQSKB7EeTJQGjMODFvwMW9oh4exSB5ZNzMSfVlWMSFE4C6QLcGQFtNmUgikZDpAS1As9J5F/6iHgbYgT6YyrdexsGQQdZJZ2/c8RICxQFvYcWMqZLr+WQCmK//QHLAkiJ1D/xPI9//UIWV/8skG//GsSf/4np//kYTWXQFN2GIlu3suLWHG6YwxuuoSDPdAFY1efThkJCEtkJmCKnhxQGUV/9BB1bkLnL/OW7EX5baiGnXklAs4zVmrOofYEH41TBf+soAasKXECBPzdqimCAYD/+3LEK4ARSZFn7OqNMyE/pJnt0jBqAZFE/6jo1gQSgJNh/MzZqvnADjSv/UHlGMlr/yGDf//Fmr/+PkWxv/mxC//jO//lghGgGBSgGAwAmYEoCRgUAHmCWBMYSAMpiti4G71t8f+Yyxi9AIGBgFUYMRLpgDBnmBKBMAABUbjAPAOh+494GAIMdE+MOBgSDeSLzlvt2YeNuAyCmBcx3T6FABYgQJEwfJr8y+sxdnW3MqXQ7LaBI7GeH/+s6jMzoC5r8rQxsd/KexypoBFTwzkLcaly//UmQwBdgIIEwTz6/UWQMoDR/9xPIUOl41/6gww7v/qD0v/2Elb/41yS//G4//0x2//plr/7FD/9Zt/+meWAAAgA0AAAFhcBwgAVLAGRKDyMjCGAZ7QZT4/Rg09mNwaaQHoOIY0Skv/7cMQUgBKtqS0vcofBUKfuPPg13oXPAwBlVmWKDm5vQPBuBJ+xnhrGtSypwQSYDS4RWdHxcYn41SMTNJEujlAEMALTidSb+soAMMzRAmv9iBAsePt/ueDAQOIDoLy/9QXNf/kYJxd//GeNP/x0//nEf/yV//ln/9af/513y/5L8lDoCGzjESzf22qMXATcBYOcEwA9CgCvLeSBiOt5cv0OmQ+SZ527oZuC8brMVf1B+S/+sHJr9uoFGA0k//WBvDKcV/4mP/5Ub//ue//J3/6j/6/1fpXVBm0bN22xuGQjRmA2ZGFGgD4KCjKi82XLAfqHZ4FIxGVJLGeQgkAnKYAHFN/mAC19IBv4pL7HLlDBE29AzHNGcfeXtNbN39Vt/faYavoEtGbyC3hn/UdGcAVVkUQFeflVJEv/+3LEMYATrY9LreqL8l2x6n29UX6jlAOagcwELCXm/WYDrAWkiuk+Tp56vWWAMyUNv/YWcCJ0TqX/WHfFt//EY//lMWL/8mCR//IH/+cLzsQIjOURLtfZKYaQAA7HS4sLaBAqGJY6zFgcKGQOHDPxgWBBMaPFlGDPmmUyL8DFq5wSJq8deHJXQzUZf7GNCBaD2DmzDuM1yxuVMco0wExtEPWutO5c//UPsFPhfTHS3X3HaBKiSD/0zQiYGKVgSpiEYuVS6/lEDFDTX/1B/wtkanv+sP6v/8X3/5Kk5/+Pxr/+RT/84Wl2MDJWB4lv/tljCx1SFy3YQThS48tKxrDI5S7lPg+tTPJiVHa2ydy4Ckmii8n/WGckR/+cCpKmXvzoEYCEq/9QOAIY6v/xGv/ysgf/mJ//8r//nv/7cMQpgArVP2XsSa+yVa5pNbpPjv1f/0aoI3DeTe6xwxgTMnEjGAUzUWLWmQkhqVIC6oeTBECChCm6YuMFwVbjAQZ7+fgFwO8veBJ+xL7+NBH6B6yBEMMGYIsNs2fn7x19hr5kj+DottJ+xnh//rcwtsBlsB06it7ulpF0EIoC0skkX/UdHwBV8F9jU+fb9RRA2ZKv/ploCaSeX/1C0DC//FCf/nC7/+5//80/FzAKAEcwBEBwBAFmVASwRhI5gAY0oYFP96GbdkNhgOYSeYJyBDmVMNeYZoHJh4gFA4KEmA+MDACtQJsyghgKgPmUIhYYK4AosAA0+BJfSXKtNLX+UBMBkLoxWwEysA1ea50RqXKZm6alIqI6AyT4CboWErGr/UsagB4I4gPp+roC5wGJRXQ/3QAiED7/+3LERYPXEeEOD/qJwzC/oQH+UiCEwXv+kDbx//4uiAz//UIkVv/xX1f/KQ9v/8jyt/+V6v/Okv/+57/82//mujkDAGQA0wFoBSMCnAozBGARowfEIZMRAFojWte7Q5foheMT/DXTCMwrMwr4YaMGzCcjAxQJMwDwA0MARADTAEQEgwAUALLgScwBwAoMMDE0zAbAAwOB69HXikvp6SnjDX0AhicantTIYTAKCcwEA10U+G5FR2Yin8DWAYvAUAzV3W/6zg1wOYDLKY3T3POyJYCI8L9GKv+Yhs4UEkYZN/nQEAz3/xag09E2/8T0PD//FIL/9kxbn/+NVX/5LVe/0Ct/+WT3/5d//OL+36zyjIQmG8d1rTjXmWuMrl3i7pqbIn1Ijawad0SRVdqUgCmV+ApYgD7LZXKizv/7cMQVgAqg60utLkzyXjHhQf7Q+ARsOKOuanv6AD6D6G//nAG6VOf8WkLiHv/WIiSP/5Dv/1lb9H7fr/W76TAIQDwwAoBhCoE4OghYUCCCqLzmC8cHJm1w8SYtQcaKDocutUZUBMZrAOEEURBiYNgkul513mAwIGyMwgYYFY34l9JX3rG1LXeMAhXFl8SgfQdAsKSzhxFIvEBABDgtNJI1f+olQDlqMpt/WOgCwk0/9MOJImmj/0RNrf/JUuW/8fyr/+RT/9Za//QPf/mtf/z35P87+/66SAAUEqbjRBjuIPmAwCGDoNmAgDGFogmsnlnII4m2OGIIGTjmCGmKBKnfwYFqAM7+uYYtPtMi9jOkwzwp8KdWwBbYcpBZRPtszqJUGiUEQEyX/rJQAJsZSg/frDJhW6X/zQj/+3LEMQAPaY8truqH8iIx5z3M0PZV//HU//zpLf/nf/6f/81//OHv/yJV+3zq0QgIVcnjX/RS4uKDgMAgyYhBhggAmMx8ZwZxyEAC+gWOEGogBOmgACpVI9JrQz9IYqM4km6kXlkP27NaSkoJaE9wAqkVsWhxDabR0BlwMx3AOVjgL6Cbes4N0DbESdcdbd90QvUC0Il2X/qF0SX/5R//Ua//olv/8nF//LBX//I5//yd3/50t6pDEDI3J4v/jbnaSvpqqUinZUEhD1GWgwrUv2BkwtWqQ3wcV1op+1MOvxL7GaCl2ohaoHyK6ZRIkutaqJNBlgHeLT/8sAKKSmD/6ye//Of/zn/6n//U//7//3//n//y9V/82CAALDqUZICduHDHDNxYxRTs2Nb+yOCBsMNQbMCQRMEBAP/7cMRBgAw5j0Ht4mdxb5nktZ7MrsCQOQfdynYw7cY/AuvYJ9BOmmgtCgQMBrRfTLrfrJQGugUMir/rEEWr/500//dv/zv6f2f/rPfW/5VVJCAgRTWNdW5b6aWo/AYqRRs2ZWvh46TEah6SztF4XKjOVnX5peWzR9BtSzgSkNWGtE9/QDCRg//yDf/z3/6//5z/9b//pN/+//62//X//MrvRrCAILT7jSTk0qjpAAwqDo4BAXE8x26U1MGkETA5AzzoZQJPnROtRW85QXXlhu2XzNC9xGIKpoo2R/rPkt/+Xf/1I//nf/2LP/1nT3/509+3zX/7zX/9bW/8uyy2s9261UxBTUUzLjEwMFVVVQ0EY5Q85fR/cCMnZIJDzVYwxODhici010sAldReeEAe+Vnvb+/6n/Kv+r//+3LEdIAKUXM57G5FcXswZDXcwOZH///9X+sEAhNSSTW3boVC+0OsCM3Q9RELXAHKYp1Ms5RrVjgGmfOD1e7kD4REgESQa5z/q+40n1ZA+ER4ELkGizBxdKGnL6PqUkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqAVW2BFuhCWHYHekc24B8MOs2YBDgCNGgKxADcDqYyTKltHoet//7cMSoAAYgKzOg6OFxDoPk9By8Htt7PZhTiirCXGW9nIkss120SWSUUVRIsZZihVhLlKKKkmsZZiraJLLOaVYS4yzDSZJKiizDSTbOU0ppJtFjJKacxklymsca2iyqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+3LEpIPNyELyTOGGeAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7cMRtg8AAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
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