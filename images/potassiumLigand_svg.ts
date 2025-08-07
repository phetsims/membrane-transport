/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="263.88" height="228.53" data-name="Layer 2" viewBox="0 0 263.88 228.53"><defs><linearGradient id="a" x1="-1969.88" x2="-1746.12" y1="444.67" y2="444.67" gradientTransform="rotate(10.31 967.446 11308.403)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#447abd"/></linearGradient></defs><path d="m188.8 212.75-56.86-55.05-56.86 55.05 19.24-76.77-76.1-21.72 76.1-21.71-19.24-76.77 56.86 55.05 56.86-55.05-19.24 76.77 76.1 21.71-76.1 21.72z" data-name="Layer 1" style="fill:url(#a);stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/></svg>')}`;
export default image;