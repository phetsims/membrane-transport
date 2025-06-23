/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="b" width="650" height="900" data-name="Layer 2" viewBox="0 0 650 900"><defs><style>.e{stroke:#010101;stroke-miterlimit:10;stroke-width:10px;fill:#fbb03c}</style></defs><g id="c" data-name="Layer 1"><path d="M0 0h650v900H0z" style="fill:none"/><path d="M459.33 759.52c-33.71-8.54-76.24-16.12-125.61-17.59-65.19-1.95-120.12 7.41-160.39 17.59V126.29c39.65 8.79 90.9 16.34 150.73 15.64 52.93-.62 98.74-7.53 135.27-15.64v633.24Z" style="fill:#f26739;stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/><path d="M416.33 125.01c15.64-5.25 47.43-13.23 79.41 0 0 0 29.84 12.35 51.61 47.64 64.33 104.29 38.64 599.55-71.47 607.46-30.71 2.21-58.42-34.2-59.55-35.73-32.53-43.8 2.85-82.73-11.91-154.84-17.6-86.03-80.3-91.02-79.41-162.78.56-44.61 24.8-44.43 31.76-111.17 5.52-52.9-7.75-71.88 3.97-111.17 11.13-37.31 35.93-63.17 55.58-79.41Z" class="e"/><path d="M233.67 125.01c-15.64-5.25-47.43-13.23-79.41 0 0 0-29.84 12.35-51.61 47.64-64.33 104.29-38.64 599.55 71.47 607.46 30.71 2.21 58.42-34.2 59.55-35.73 32.53-43.8-2.85-82.73 11.91-154.84 17.6-86.03 80.3-91.02 79.41-162.78-.56-44.61-24.8-44.43-31.76-111.17-5.52-52.9 7.75-71.88-3.97-111.17-11.13-37.31-35.93-63.17-55.58-79.41Z" class="e"/></g></svg>')}`;
export default image;