/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="73.56" height="84.64" data-name="Layer 2" viewBox="0 0 73.56 84.64"><g data-name="Layer 2"><path d="m25.24 4.57-3.47 78.3c11.93-2.51 21.15-2.56 33.1.97-5.53-18.69 6.65-60.47 1.12-79.15-7.6.85-23.07.74-30.75-.12Z" style="stroke-miterlimit:10;fill:#2e3192;stroke:#000"/><path d="M35.83 26.23c.56 2.58-.85 33.93-1.8 37.47l-4.99 17.36s-.39 1.26-.4 1.26C-5.8 91.7-2.47 63 6.58 36.81c6.45-18.67-3-29.61 5.59-35.85 3.02-2.19 19.82 3.93 19.82 7.66zm1.89 0c-.56 2.58.85 33.93 1.8 37.47l4.99 17.36s.39 1.26.4 1.26C79.35 91.7 76.02 63 66.97 36.81c-6.45-18.67 3-29.61-5.6-35.85-3.02-2.19-19.82 3.93-19.82 7.66l-3.84 17.61Z" style="fill:#29abe2;stroke:#231f20;stroke-miterlimit:10"/></g></svg>')}`;
export default image;