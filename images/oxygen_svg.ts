/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="149.99" height="97.99" viewBox="0 0 149.99 97.99"><defs><linearGradient id="a" x1="4.99" x2="92.99" y1="48.99" y2="48.99" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".05" stop-color="#fce0df"/><stop offset=".13" stop-color="#f9b6b4"/><stop offset=".21" stop-color="#f6918e"/><stop offset=".3" stop-color="#f3716d"/><stop offset=".4" stop-color="#f15853"/><stop offset=".5" stop-color="#ef443f"/><stop offset=".62" stop-color="#ee3630"/><stop offset=".76" stop-color="#ee2e28"/><stop offset="1" stop-color="#ee2c26"/></linearGradient><linearGradient xlink:href="#a" id="b" x1="56.99" x2="144.99"/></defs><g data-name="Layer_1"><circle cx="48.99" cy="48.99" r="44" style="stroke:#010101;stroke-miterlimit:10;fill:url(#a);stroke-width:9.99px"/><circle cx="100.99" cy="48.99" r="44" style="fill:url(#b);stroke-width:9.99px;stroke:#010101;stroke-miterlimit:10"/></g></svg>')}`;
export default image;