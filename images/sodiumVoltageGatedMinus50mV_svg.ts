/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="650" height="900" data-name="Layer 2" viewBox="0 0 650 900"><g data-name="Layer 1"><path d="M0 0h650v900H0z" style="fill:none"/><path d="M460.37 762.44c-33.71-8.52-76.24-16.09-125.61-17.56-65.19-1.94-120.12 7.4-160.39 17.56V130.31c39.65 8.78 90.9 16.31 150.73 15.61 52.93-.62 98.74-7.52 135.27-15.61v632.14Z" style="fill:#f26739;stroke:#010101;stroke-miterlimit:10;stroke-width:10px"/><path d="M213.98 125.88c-14.44-8.03-47.51-13.26-79.55 0 0 0-29.9 12.37-51.7 47.73-64.44 104.47-38.71 600.6 71.59 608.52 30.77 2.21 58.52-34.26 59.66-35.79 32.59-43.88-2.85-82.87 11.93-155.11 17.63-86.18-11.38-80.34 3.14-150.76 6.97-33.8-4.18-51.7-4.18-122.94 0-53.28 18.37-70.27 20.27-110.3 1.85-38.96-8.83-68.95-31.15-81.35Zm222.04 0c14.44-8.03 47.51-13.26 79.55 0 0 0 29.9 12.37 51.7 47.73 64.44 104.47 38.71 600.6-71.59 608.52-30.77 2.21-58.52-34.26-59.66-35.79-32.59-43.88 2.85-82.87-11.93-155.11-17.63-86.18 11.38-80.34-3.14-150.76-6.97-33.8 4.18-51.7 4.18-122.94 0-53.28-18.37-70.27-20.27-110.3-1.85-38.96 8.83-68.95 31.15-81.35Z" style="stroke:#010101;stroke-miterlimit:10;stroke-width:10px;fill:#fbb03c"/></g></svg>')}`;
export default image;