/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="193.84" height="193.84" viewBox="0 0 193.84 193.84"><defs><linearGradient id="a" x1="859.25" x2="1034.28" y1="371.64" y2="413" gradientTransform="rotate(1.7 10479.326 -28394.979)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".1" stop-color="#d3ecde"/><stop offset=".23" stop-color="#9dd4b6"/><stop offset=".36" stop-color="#70c194"/><stop offset=".49" stop-color="#4ab078"/><stop offset=".62" stop-color="#2da462"/><stop offset=".75" stop-color="#189b53"/><stop offset=".88" stop-color="#0c954a"/><stop offset="1" stop-color="#089447"/></linearGradient></defs><path d="m79.6 176.58-7.04-34.2a31.2 31.2 0 0 0-22.47-23.85l-33.72-9.06c-15.64-4.2-14.97-26.61.89-29.88l34.2-7.04a31.2 31.2 0 0 0 23.85-22.47l9.06-33.72c4.2-15.64 26.61-14.97 29.88.89l7.04 34.2a31.2 31.2 0 0 0 22.47 23.85l33.72 9.06c15.64 4.2 14.97 26.61-.89 29.88l-34.2 7.04a31.2 31.2 0 0 0-23.85 22.47l-9.06 33.72c-4.2 15.64-26.61 14.97-29.88-.89Z" data-name="Layer_1" style="fill:url(#a);stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/></svg>')}`;
export default image;