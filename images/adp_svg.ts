/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="89.22" height="45.85" data-name="Layer 2" viewBox="0 0 89.22 45.85"><defs><radialGradient id="a" cx="53.47" cy="22.92" r="78.95" fx="53.47" fy="22.92" gradientTransform="matrix(1 0 0 .39 0 13.91)" gradientUnits="userSpaceOnUse"><stop offset=".24" stop-color="#558444"/><stop offset=".34" stop-color="#598648"/><stop offset=".45" stop-color="#648f55"/><stop offset=".56" stop-color="#789d6b"/><stop offset=".68" stop-color="#94b189"/><stop offset=".8" stop-color="#b7cbb0"/><stop offset=".92" stop-color="#e2eadf"/><stop offset=".99" stop-color="#fff"/></radialGradient></defs><path d="m88.26 32.79-4.25-1.01a3.14 3.14 0 0 1-2.33-2.33l-1.01-4.25c-.14-.61-1.01-.61-1.16 0l-1.01 4.25a3.14 3.14 0 0 1-2.33 2.33l-2.63.62-2.63-.62a3.14 3.14 0 0 1-2.33-2.33l-1.01-4.25c-.14-.61-1.01-.61-1.16 0l-1.01 4.25a3.14 3.14 0 0 1-2.33 2.33l-3.57.85-8.1-11.15-11.61 3.77 7.39-10.11-8.61-11.91-13.45 4.33L13.14.58.54 7.81.5 22.34l12.56 7.3 12.18-6.99 12.21 4v14.07l13.98 4.54 8.1-11.15 3.57.85c1.15.27 2.05 1.17 2.33 2.33l1.01 4.25c.14.61 1.01.61 1.16 0l1.01-4.25a3.14 3.14 0 0 1 2.33-2.33l2.63-.62 2.63.62c1.15.27 2.05 1.17 2.33 2.33l1.01 4.25c.14.61 1.01.61 1.16 0l1.01-4.25a3.14 3.14 0 0 1 2.33-2.33l4.25-1.01c.61-.14.61-1.01 0-1.16Z" data-name="Layer 2" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/></svg>')}`;
export default image;