/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="193.91" height="193.91" viewBox="0 0 193.91 193.91"><defs><linearGradient id="a" x1="5" x2="188.91" y1="96.95" y2="96.95" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".01" stop-color="#f4faf7"/><stop offset=".09" stop-color="#c3e5d2"/><stop offset=".16" stop-color="#96d1b1"/><stop offset=".24" stop-color="#70c194"/><stop offset=".33" stop-color="#4fb37c"/><stop offset=".42" stop-color="#35a768"/><stop offset=".52" stop-color="#219e59"/><stop offset=".63" stop-color="#12984f"/><stop offset=".77" stop-color="#0a9548"/><stop offset="1" stop-color="#089447"/></linearGradient></defs><g data-name="Layer_1"><path d="m82.01 177.09-8.05-33.97a31.21 31.21 0 0 0-23.17-23.17l-33.97-8.05c-15.76-3.73-15.76-26.16 0-29.89l33.97-8.05a31.21 31.21 0 0 0 23.17-23.17l8.05-33.97c3.73-15.76 26.16-15.76 29.89 0l8.05 33.97a31.21 31.21 0 0 0 23.17 23.17l33.97 8.05c15.76 3.73 15.76 26.16 0 29.89l-33.97 8.05a31.21 31.21 0 0 0-23.17 23.17l-8.05 33.97c-3.73 15.76-26.16 15.76-29.89 0Z" style="fill:url(#a);stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/><text style="font-family:MyriadPro-Regular,&quot;Myriad Pro&quot;;font-size:86.63px" transform="translate(76.59 125.89)"><tspan x="0" y="0">P</tspan></text></g></svg>')}`;
export default image;