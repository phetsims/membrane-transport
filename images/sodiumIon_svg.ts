/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="11.82" height="13.01" data-name="Layer 2" viewBox="0 0 11.82 13.01"><defs><linearGradient id="a" x1=".5" x2="11.32" y1="6.51" y2="6.51" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#ffd12b"/></linearGradient></defs><g data-name="Layer 2"><circle cx="5.91" cy="6.51" r="5.41" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/><text style="font-family:MyriadPro-Regular,&quot;Myriad Pro&quot;;font-size:20.53px" transform="matrix(.58 0 0 .58 2.34 10.02)"><tspan x="0" y="0">+</tspan></text></g></svg>')}`;
export default image;