// Copyright 2025, University of Colorado Boulder

import { Shape } from '../../../../../kite/js/imports.js';
import { Node, Path, RadialGradient } from '../../../../../scenery/js/imports.js';
import membraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';


/**
 * ATP molecule. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class ATPNode extends Node {

  public constructor() {

    // Shape from an AI file SVG path declaration
    const shape = new Shape( 'M41.98,4.9c-1.67,0-3.11,1.03-3.71,2.49-.6-1.46-2.03-2.49-3.71-2.49-1.58,0-2.94.91-3.59,2.24-.65-1.33-2.02-2.24-3.59-2.24-2.21,0-4.01,1.8-4.01,4.01,0,.29.03.56.09.83l-2.2-1.84c-.64-.54-1.56-.6-2.28-.16l-1.98,1.24,1.23-1.7c.45-.62.45-1.46,0-2.08l-2.3-3.19c-.45-.63-1.26-.89-1.99-.65l-3.72,1.21s-.06.03-.1.04c-.06-.04-.12-.08-.18-.11l-3.36-1.79c-.61-.33-1.35-.3-1.94.07L1.41,2.81c-.59.37-.93,1.02-.91,1.71l.13,3.8c.02.69.42,1.32,1.03,1.65l3.36,1.79c.61.33,1.35.3,1.94-.07l3.02-1.89c.07.04.15.07.23.1l3.72,1.21c.18.06.37.09.56.09-.07.3-.07.61,0,.92l1.04,4.16c.2.82.91,1.41,1.75,1.47l4.28.3c.84.06,1.62-.43,1.93-1.21l1.61-3.98c.08-.19.12-.38.13-.58.62.4,1.36.63,2.15.63,1.58,0,2.94-.91,3.59-2.24.65,1.33,2.02,2.24,3.59,2.24,1.67,0,3.11-1.03,3.71-2.49.6,1.46,2.03,2.49,3.71,2.49,2.21,0,4.01-1.8,4.01-4.01s-1.8-4.01-4.01-4.01Z' );

    const gradient = new RadialGradient(
      20, 15, 2,
      20, 15, 24 )
      .addColorStop( 0, membraneChannelsColors.atpColorProperty.value.colorUtilsDarker( 0 ).toCSS() )
      .addColorStop( 0.7, membraneChannelsColors.atpColorProperty.value.colorUtilsBrighter( 0.9 ).toCSS() );
    super( {
      children: [
        new Path( shape, {
          stroke: 'black',
          lineWidth: 1,
          fill: gradient
        } )
      ]
    } );
  }
}

membraneChannels.register( 'ATPNode', ATPNode );