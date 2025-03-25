/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="10.55" height="5.19" viewBox="0 0 10.55 5.19"><defs><linearGradient id="a" x1=".25" x2="4.27" y1="2.59" y2="2.59" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e90d00"/></linearGradient><linearGradient id="b" x1="2.88" x2="7.57" y1="2.59" y2="2.59" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1"/></linearGradient><linearGradient id="c" x1="6.28" x2="10.3" y1="2.59" y2="2.59" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#d40b00"/></linearGradient></defs><g data-name="Layer_2"><circle cx="2.26" cy="2.59" r="2.01" style="stroke:#000;stroke-miterlimit:10;stroke-width:.5px;fill:url(#a)"/><circle cx="5.23" cy="2.59" r="2.34" style="stroke:#000;stroke-miterlimit:10;stroke-width:.5px;fill:url(#b)"/><circle cx="8.29" cy="2.59" r="2.01" style="fill:url(#c);stroke:#000;stroke-miterlimit:10;stroke-width:.5px"/></g></svg>')}`;
export default image;