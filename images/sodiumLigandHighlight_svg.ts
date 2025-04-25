/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="sodiumLigandHighlight" width="216.1" height="150.3" viewBox="0 0 216.1 150.3"><defs><linearGradient id="linear-gradient" x1="10209.98" x2="10396.83" y1="1348.24" y2="1348.24" gradientTransform="rotate(-180 5205.725 710.36)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0" stop-color="#fefaf5" stop-opacity=".02"/><stop offset=".07" stop-color="#fce0c6" stop-opacity=".15"/><stop offset=".14" stop-color="#fbc99d" stop-opacity=".26"/><stop offset=".21" stop-color="#fab77c" stop-opacity=".35"/><stop offset=".3" stop-color="#f9a962" stop-opacity=".42"/><stop offset=".41" stop-color="#f8a051" stop-opacity=".47"/><stop offset=".57" stop-color="#f89a46" stop-opacity=".49"/><stop offset="1" stop-color="#f89944" stop-opacity=".5"/></linearGradient><style>.cls-1{stroke-dasharray:26.01 26.01}.cls-1,.cls-2{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:15px}</style></defs><g id="Layer_1-2" data-name="Layer_1"><path d="M14.63 7.5h186.84l-93.42 129.95z" style="fill:url(#linear-gradient)"/><path d="M23.38 19.68 14.63 7.5h15" class="cls-2"/><path d="M61 7.5h109.79" style="fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:15px;stroke-dasharray:31.37 31.37"/><path d="M186.47 7.5h15l-8.75 12.18" class="cls-2"/><path d="m177.53 40.8-53.13 73.92" class="cls-1"/><path d="m116.81 125.28-8.76 12.17-8.76-12.17" class="cls-2"/><path d="M84.11 104.16 30.97 30.24" class="cls-1"/></g></svg>')}`;
export default image;