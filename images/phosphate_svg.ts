/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="17.35" height="17.35" data-name="Layer 2" viewBox="0 0 17.35 17.35"><defs><radialGradient id="a" cx="-610.49" cy="16.03" r="14.21" fx="-610.49" fy="16.03" gradientTransform="rotate(24.9 -283.093 1417.849)scale(1 1.05)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#558444"/><stop offset=".28" stop-color="#568545"/><stop offset=".38" stop-color="#5c894c"/><stop offset=".45" stop-color="#679158"/><stop offset=".5" stop-color="#769c69"/><stop offset=".55" stop-color="#8bab7f"/><stop offset=".6" stop-color="#a3bc9a"/><stop offset=".64" stop-color="#c1d2ba"/><stop offset=".67" stop-color="#e2eadf"/><stop offset=".7" stop-color="#fff"/></radialGradient></defs><path d="m10.81 16.57-2.35-3.68a3.13 3.13 0 0 0-2.96-1.43l-4.35.45c-.62.06-.91-.75-.38-1.09l3.68-2.35c1-.64 1.55-1.78 1.43-2.96l-.45-4.35C5.37.54 6.18.25 6.52.78l2.35 3.68c.64 1 1.78 1.55 2.96 1.43l4.35-.45c.62-.06.91.75.38 1.09l-3.68 2.35a3.13 3.13 0 0 0-1.43 2.96l.45 4.35c.06.62-.75.91-1.09.38Z" data-name="Layer 2" style="fill:url(#a);stroke:#000;stroke-miterlimit:10"/></svg>')}`;
export default image;