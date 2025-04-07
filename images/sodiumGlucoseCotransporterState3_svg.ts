/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="580.11" height="643.09" data-name="Layer 2" viewBox="0 0 580.11 643.09"><g data-name="Layer 1"><path d="M403.7 618.41c-65.27-6.37-128.03-22.13-193.12-18.69-39.1.17-110.42 18.44-147.06 16.34-48.17-2.76-32.04-144.08-36.26-208.34-.26-60.63-11.45-123.25-11.22-183.68.5-38.54-.18-77.82 8.24-115.53C54.86-9.45 133.45 29.09 231.51 38.78 318.37 46.08 421.89 1 504.5 31.89c72.12 32.28 61.13 116.16 63.43 183.81-.41 96.38 2.24 191.97-2.55 287.77-5.96 115.43-56.87 127.41-161.48 114.96z" style="fill:#864c9e;stroke:#231f20;stroke-miterlimit:10;stroke-width:10px"/><path d="M294.68 393.42C221.3 401.08 74.24 747.29 22.41 602.91c-36.72-102.28-3.5-304.1-6.35-411.92 1.18-39.91-9.67-84.28 11.03-119.08 83.94-141.12 129.01-9.05 277.49-47.24C341.31 7.12 509.42 4.73 535.36 37.32c23.68 22.87 30.41 60.66 31.48 94.19 2.57 106.24 8.11 269.06 7.93 375.36-.24 79.38 10.05 141.15-67.51 125.79-68.19-13.5-116-249.32-212.58-239.23Z" style="stroke:#231f20;stroke-miterlimit:10;stroke-width:10px;fill:#c69"/></g></svg>')}`;
export default image;