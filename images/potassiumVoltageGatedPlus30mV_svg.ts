/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="75.2" height="84.71" data-name="Layer 2" viewBox="0 0 75.2 84.71"><g data-name="Layer 2"><path d="m23.88 5.3-3.32 77.49c11.93-2.51 23.23-2.45 35.17 1.08-5.53-18.69 6.65-60.47 1.12-79.15-7.6.85-25.29 1.45-32.97.58Z" style="stroke-miterlimit:10;fill:#2e3192;stroke:#000"/><path d="M27.32 26.11c.56 2.58-1.12 33.16-.89 37.15l1.02 17.49s-.39 1.26-.4 1.26C-7.39 91.39-1.61 63.03 7.43 36.83 13.88 18.17 4.44 7.22 13.03.99 16.05-1.2 27.9 4.77 27.9 8.5l-.57 17.62Zm19.41.64c-.56 2.58 1.21 33.57 1.02 36.89l-.13 17.49s.39 1.26.4 1.26c34.44 9.38 28.85-19.37 19.81-45.56-6.45-18.67 3-29.61-5.6-35.85-3.02-2.19-15.96 3.53-15.96 7.25l.45 18.51Z" style="fill:#0071bc;stroke:#231f20;stroke-miterlimit:10"/></g></svg>')}`;
export default image;