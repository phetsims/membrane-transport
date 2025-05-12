/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><defs><linearGradient id="a" x1="175" x2="5" y1="90" y2="90" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00a8d4"/><stop offset=".23" stop-color="#02a8d4"/><stop offset=".36" stop-color="#0aabd5"/><stop offset=".47" stop-color="#19b0d8"/><stop offset=".57" stop-color="#2db7db"/><stop offset=".67" stop-color="#47c0e0"/><stop offset=".75" stop-color="#68cbe5"/><stop offset=".83" stop-color="#8ed8ec"/><stop offset=".91" stop-color="#bbe7f3"/><stop offset=".98" stop-color="#ecf8fb"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><g data-name="Layer_1"><circle cx="90" cy="90" r="85" style="stroke-miterlimit:10;stroke-width:10px;fill:url(#a);stroke:#010101"/><path d="M90 31v118M33 90h114" style="fill:#231f20;stroke:#231f20;stroke-miterlimit:10;stroke-width:10px"/></g></svg>')}`;
export default image;