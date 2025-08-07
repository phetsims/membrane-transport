/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="193.91" height="193.91" data-name="Layer 2" viewBox="0 0 193.91 193.91"><defs><linearGradient id="a" x1="851.11" x2="1026.14" y1="263.18" y2="304.55" gradientTransform="translate(-841.67 -186.91)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".1" stop-color="#d3ecde"/><stop offset=".23" stop-color="#9dd4b6"/><stop offset=".36" stop-color="#70c194"/><stop offset=".49" stop-color="#4ab078"/><stop offset=".62" stop-color="#2da462"/><stop offset=".75" stop-color="#189b53"/><stop offset=".88" stop-color="#0c954a"/><stop offset="1" stop-color="#089447"/></linearGradient></defs><path d="m82.01 177.09-8.05-33.97a31.21 31.21 0 0 0-23.17-23.17l-33.97-8.05c-15.76-3.73-15.76-26.16 0-29.89l33.97-8.05a31.21 31.21 0 0 0 23.17-23.17l8.05-33.97c3.73-15.76 26.16-15.76 29.89 0l8.05 33.97a31.21 31.21 0 0 0 23.17 23.17l33.97 8.05c15.76 3.73 15.76 26.16 0 29.89l-33.97 8.05a31.21 31.21 0 0 0-23.17 23.17l-8.05 33.97c-3.73 15.76-26.16 15.76-29.89 0Z" data-name="Layer 1" style="fill:url(#a);stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/></svg>')}`;
export default image;