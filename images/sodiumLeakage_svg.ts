/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="650" height="900" data-name="Layer 2" viewBox="0 0 650 900"><g data-name="Layer 1"><path d="M407.44 804.8c-32.51 26.99-82.87 30.35-121.44 20.52-31.71-8.41-57.69-26.79-69.44-66.3-11.08-37.4-10.92-84.16-11.53-126.03-.35-108.08-.06-233.5-.12-339.24.97-54.1-3.1-135.55 22.59-177.94 30.97-51.35 107.62-53.82 152.69-36.55 21.62 8.33 41.01 24.13 51.48 50.54 12.16 31.03 13.71 65.72 14.98 103.78 1.31 71.59.42 150.02.67 225.8-.09 63.56.19 120.96-.17 177.87-1.6 65.64.49 132.64-39.59 167.45l-.11.09Z" style="stroke:#231f20;stroke-miterlimit:10;stroke-width:10px;fill:#989936"/><path d="M233.34 293.56c.77 82.48-5.99 214.58-7.77 292.9-.32 14.43-.18 28.15 1.2 42.41 2.27 31.55 39.75 156.73 11.33 177.26-7.71 5.64-43.68-50.11-56.56-48.84-17.41 1.57-37.4 1.22-55.38.87-29.91-1.27-59.65-1.8-67.95-33.13-10.37-25.96-2.24-88.47.17-137.67 2.44-43.22 3.44-86.86 1.7-129.03-1.19-88.1-26.14-199.42 26.67-274.12 18.24-25.45 49.07-37.35 80.61-36 22.61 1.22 64.19-67.92 75.34-47.68 10.26 21.66-8.35 119.03-8.36 144.48-.46 16.06-.87 32.59-1 48.39v.15Zm183.32-.72c-.77 82.48 5.99 214.58 7.77 292.9.32 14.43.18 28.15-1.2 42.41-2.27 31.55-39.75 156.73-11.33 177.26 7.71 5.64 43.68-50.11 56.56-48.84 17.41 1.57 37.4 1.22 55.38.87 29.91-1.27 59.65-1.8 67.95-33.13 10.37-25.96 2.24-88.47-.17-137.67-2.44-43.22-3.44-86.86-1.7-129.03 1.19-88.1 26.14-199.42-26.67-274.12-18.24-25.45-49.07-37.35-80.61-36-22.61 1.22-64.19-67.92-75.34-47.68-10.26 21.66 8.35 119.03 8.36 144.48.46 16.06.87 32.59 1 48.39v.15Z" style="fill:#f7ec13;stroke:#231f20;stroke-miterlimit:10;stroke-width:10px"/><path d="M0 0h650v900H0z" style="fill:none"/></g></svg>')}`;
export default image;