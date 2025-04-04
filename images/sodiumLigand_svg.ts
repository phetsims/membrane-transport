/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="206.35" height="143.52" data-name="Layer 2" viewBox="0 0 206.35 143.52"><defs><linearGradient id="a" x1="-5.43" x2="181.41" y1="-6326.44" y2="-6326.44" gradientTransform="rotate(-180 95.58 -3128.23)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#f89944"/></linearGradient></defs><path d="M9.75 5H196.6l-93.43 129.95z" data-name="Layer 1" style="fill:url(#a);stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/></svg>')}`;
export default image;