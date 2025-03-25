/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="25.69" height="17.87" viewBox="0 0 25.69 17.87"><defs><linearGradient id="a" x1=".98" x2="24.72" y1="9.11" y2="9.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#f89943"/></linearGradient></defs><path d="M24.72 17.37H.98L12.85.86z" data-name="Layer_2" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/></svg>')}`;
export default image;