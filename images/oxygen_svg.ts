/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="6.89" height="4.52" viewBox="0 0 6.89 4.52"><defs><linearGradient id="a" x1=".25" x2="4.27" y1="2.26" y2="2.26" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#ee2724"/></linearGradient><linearGradient xlink:href="#a" id="b" x1="2.62" x2="6.64"/></defs><g data-name="Layer_2"><circle cx="2.26" cy="2.26" r="2.01" style="fill:url(#a);stroke:#000;stroke-miterlimit:10;stroke-width:.5px"/><circle cx="4.63" cy="2.26" r="2.01" style="stroke:#000;stroke-miterlimit:10;stroke-width:.5px;fill:url(#b)"/></g></svg>')}`;
export default image;