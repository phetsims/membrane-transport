/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="150" height="98" data-name="Layer 2" viewBox="0 0 150 98"><defs><linearGradient id="a" x1="5" x2="93" y1="49" y2="49" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".05" stop-color="#fce0df"/><stop offset=".13" stop-color="#f9b6b4"/><stop offset=".21" stop-color="#f6918e"/><stop offset=".3" stop-color="#f3716d"/><stop offset=".4" stop-color="#f15853"/><stop offset=".5" stop-color="#ef443f"/><stop offset=".62" stop-color="#ee3630"/><stop offset=".76" stop-color="#ee2e28"/><stop offset="1" stop-color="#ee2c26"/></linearGradient><linearGradient xlink:href="#a" id="b" x1="57" x2="145"/></defs><g data-name="Layer 1"><circle cx="49" cy="49" r="44" style="fill:url(#a);stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/><circle cx="101" cy="49" r="44" style="stroke:#010101;stroke-miterlimit:10;stroke-width:10px;fill:url(#b)"/></g></svg>')}`;
export default image;