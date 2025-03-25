/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="28.05" height="26.84" data-name="Layer 2" viewBox="0 0 28.05 26.84"><defs><linearGradient id="a" x1="1.79" x2="26.25" y1="13.42" y2="13.42" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#4379bd"/></linearGradient></defs><path d="m22.07 22.9-7.2-4.81-5.03 7.03.56-8.63-8.61-.84 7.76-3.83-3.57-7.88 7.19 4.81 5.04-7.03-.57 8.63 8.61.84-7.76 3.83z" data-name="Layer 2" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/></svg>')}`;
export default image;