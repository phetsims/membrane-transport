// Copyright 2025, University of Colorado Boulder

import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../../scenery-phet/js/ShadedSphereNode.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Color from '../../../../../scenery/js/util/Color.js';
import MembraneChannelsColors from '../../../common/MembraneChannelsColors.js';
import membraneChannels from '../../../membraneChannels.js';


/**
 * Carbon dioxide molecule node. Does not rotate.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class CarbonDioxideNode extends Node {

  public constructor() {

    const radius = 18;
    const options: ShadedSphereNodeOptions = {
      highlightColor: new Color( 255, 255, 255 ),
      lineWidth: 1,
      stroke: 'black'
    };
    const o1 = new ShadedSphereNode( radius, combineOptions<ShadedSphereNodeOptions>( {
      mainColor: MembraneChannelsColors.oxygenColorProperty
    }, options ) );
    const c = new ShadedSphereNode( radius * 1.18, combineOptions<ShadedSphereNodeOptions>( {
      mainColor: MembraneChannelsColors.carbonDioxideColorProperty,
      x: 10
    }, options ) );
    const o2 = new ShadedSphereNode( radius, combineOptions<ShadedSphereNodeOptions>( {
      mainColor: MembraneChannelsColors.oxygenColorProperty,
      x: 20
    }, options ) );

    super( { children: [ o1, c, o2 ] } );
  }
}

membraneChannels.register( 'CarbonDioxideNode', CarbonDioxideNode );