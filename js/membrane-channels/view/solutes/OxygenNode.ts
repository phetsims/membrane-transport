// Copyright 2025, University of Colorado Boulder

import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../../scenery-phet/js/ShadedSphereNode.js';
import { Color, Node } from '../../../../../scenery/js/imports.js';
import MembraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';


/**
 * Diatomic oxygen molecule.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class OxygenNode extends Node {

  public constructor() {

    const radius = 18;
    const options: ShadedSphereNodeOptions = {
      mainColor: MembraneChannelsColors.oxygenColorProperty,
      highlightColor: new Color( 255, 255, 255 ),
      lineWidth: 1,
      stroke: 'black'
    };
    const o1 = new ShadedSphereNode( radius, options );
    const o2 = new ShadedSphereNode( radius, combineOptions<ShadedSphereNodeOptions>( {
      x: 8
    }, options ) );

    super( { children: [ o1, o2 ] } );
  }
}

membraneChannels.register( 'OxygenNode', OxygenNode );