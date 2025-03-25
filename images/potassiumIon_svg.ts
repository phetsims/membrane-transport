/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="17.09" height="22.81" data-name="Layer 2" viewBox="0 0 17.09 22.81"><defs><linearGradient id="a" x1=".5" x2="16.59" y1="11.41" y2="11.41" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#00a8d4"/></linearGradient></defs><g data-name="Layer 2"><circle cx="8.54" cy="11.41" r="8.04" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/><text style="font-family:MyriadPro-Regular,&quot;Myriad Pro&quot;;font-size:36px" transform="matrix(.58 0 0 .58 2.29 17.57)"><tspan x="0" y="0">+</tspan></text></g></svg>')}`;
export default image;