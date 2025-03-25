/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="35.71" height="27.56" data-name="Layer 2" viewBox="0 0 35.71 27.56"><defs><radialGradient id="a" cx="17.86" cy="13.44" r="25.7" fx="17.86" fy="13.44" gradientTransform="matrix(1 0 0 1.08 0 -1.14)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5e489d"/><stop offset=".21" stop-color="#604a9e"/><stop offset=".36" stop-color="#6854a3"/><stop offset=".49" stop-color="#7664ac"/><stop offset=".61" stop-color="#8a7ab8"/><stop offset=".73" stop-color="#a497c7"/><stop offset=".84" stop-color="#c3bbda"/><stop offset=".94" stop-color="#e8e5f1"/><stop offset="1" stop-color="#fff"/></radialGradient></defs><g data-name="Layer 2"><path d="m24.36.45 10.75 12.86-8.53 12.99-17.25.13L.61 13.56 11.15.55z" style="fill:url(#a)"/><path d="M24.57 0c3.56 4.44 7.2 8.7 10.91 13l.23.27-.19.3c-2.87 4.56-5.68 9.16-8.24 13.91h-.69c-4.91-.09-12.28-.02-17.25.08h-.66l-.28-.5C5.8 22.42 2.94 17.95 0 13.53l.23-.28 5.32-6.46C7.36 4.59 9.18 2.4 10.96.17 15.48.14 19.99.1 24.57 0m-.42.91c-4.3-.04-8.65-.01-13 .02l.29-.14C8.36 4.53 4.07 10.04.99 13.87l.02-.58c1.47 2.13 2.97 4.25 4.5 6.34 1.55 2.08 3.1 4.16 4.75 6.17l-.94-.49c3.04-.04 10 .05 12.94-.07l4.31-.11-.98.53c3.2-4.09 6.18-8.33 9.11-12.61l.03.57C31.27 9.35 27.74 5.04 24.14.92Z"/></g></svg>')}`;
export default image;