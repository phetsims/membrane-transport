/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="650" height="900" data-name="Layer 2" viewBox="0 0 650 900"><g data-name="Layer 1"><path d="M407.35 781.61c-32.51 25.42-82.87 28.58-121.44 19.32-31.71-7.92-57.69-25.23-69.44-62.43-11.08-35.22-10.92-79.25-11.53-118.67-.35-101.77-.06-219.88-.12-319.44.97-50.95-13.61-135.67 22.59-167.56 47.39-41.75 125.52-46.65 170.33-14.71 18.47 13.17 24.03 12.11 36.25 32.15 16.6 27.21 11.3 57.63 12.57 93.47 1.31 67.42.42 141.27.67 212.62-.09 59.85.19 113.9-.17 167.49-1.6 61.81.49 124.9-39.59 157.68l-.11.08Z" style="stroke:#231f20;stroke-miterlimit:10;stroke-width:10px;fill:#989936"/><path d="M242.88 292.72c.77 82.48-5.99 214.58-7.77 292.9-.32 14.43-.18 28.15 1.2 42.41 2.27 31.55 39.75 156.73 11.33 177.26-7.71 5.64-43.68-50.11-56.56-48.84-17.41 1.57-37.4 1.22-55.38.87-29.91-1.27-59.65-1.8-67.95-33.13-10.37-25.96-10.96-89.69.17-137.67 10.03-43.24 46.13-53.27 1.7-129.03-44.57-76-28.71-246.03 24.09-320.72 18.24-25.45 51.65 9.26 83.19 10.6 22.61 1.22 64.19-67.92 75.34-47.68 10.26 21.66-8.35 119.03-8.36 144.48-.46 16.06-.87 32.59-1 48.39v.15Zm164.24-1.68c-.77 82.48 5.99 214.58 7.77 292.9.32 14.43.18 28.15-1.2 42.41-2.27 31.55-39.75 156.73-11.33 177.26 7.71 5.64 43.68-50.11 56.56-48.84 17.41 1.57 37.4 1.22 55.38.87 29.91-1.27 59.65-1.8 67.95-33.13 10.37-25.96 10.96-89.69-.17-137.67-10.03-43.24-46.13-53.27-1.7-129.03 44.57-76 28.71-246.03-24.09-320.72-18.24-25.45-51.65 9.26-83.19 10.6-22.61 1.22-64.19-67.92-75.34-47.68-10.26 21.66 8.35 119.03 8.36 144.48.46 16.06.87 32.59 1 48.39v.15Z" style="fill:#f7ec13;stroke:#231f20;stroke-miterlimit:10;stroke-width:10px"/><path d="M0 0h650v900H0z" style="fill:none"/></g></svg>')}`;
export default image;