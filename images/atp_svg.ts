/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="97.29" height="43.31" data-name="Layer 2" viewBox="0 0 97.29 43.31"><defs><radialGradient id="a" cx="58.31" cy="21.65" r="72.56" fx="58.31" fy="21.65" gradientTransform="matrix(1 0 0 .44 0 12.08)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0f0"/><stop offset=".09" stop-color="#0aff0a"/><stop offset=".23" stop-color="#26ff26"/><stop offset=".43" stop-color="#53ff53"/><stop offset=".65" stop-color="#92ff92"/><stop offset=".91" stop-color="#e2ffe2"/><stop offset="1" stop-color="#fff"/></radialGradient></defs><path d="m96.36 30.96-4.01-.95a2.94 2.94 0 0 1-2.19-2.19l-.95-4.01c-.14-.57-.95-.57-1.09 0l-.95 4.01a2.94 2.94 0 0 1-2.19 2.19l-2.86.68-2.86-.68a2.94 2.94 0 0 1-2.19-2.19l-.95-4.01c-.14-.57-.95-.57-1.09 0l-.95 4.01a2.94 2.94 0 0 1-2.19 2.19l-2.48.59-2.48-.59a2.94 2.94 0 0 1-2.19-2.19l-.95-4.01c-.14-.57-.95-.57-1.09 0l-.95 4.01a2.94 2.94 0 0 1-2.19 2.19l-3.37.8-7.64-10.52-10.95 3.56 6.97-9.54-8.12-11.24-12.68 4.08L12.42.58.54 7.4.5 21.1l11.85 6.88 11.48-6.59 11.51 3.78v13.27l13.18 4.28 7.64-10.52 3.37.8c1.09.26 1.94 1.11 2.19 2.19l.95 4.01c.14.57.95.57 1.09 0l.95-4.01A2.94 2.94 0 0 1 66.9 33l2.48-.59 2.48.59c1.09.26 1.94 1.11 2.19 2.19L75 39.2c.14.57.95.57 1.09 0l.95-4.01A2.94 2.94 0 0 1 79.23 33l2.86-.68 2.86.68c1.09.26 1.94 1.11 2.19 2.19l.95 4.01c.14.57.95.57 1.09 0l.95-4.01A2.94 2.94 0 0 1 92.32 33l4.01-.95c.57-.14.57-.95 0-1.09Z" data-name="Layer 2" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/></svg>')}`;
export default image;