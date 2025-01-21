// Copyright 2025, University of Colorado Boulder

/**
 * In the SoluteBarChartsAccordionBox, the node that shows an icon, bar chart and arrow for one solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Rectangle, RichText } from '../../../../scenery/js/imports.js';
import membraneChannels from '../../membraneChannels.js';
import SoluteType, { getSoluteBarChartColorProperty, getSoluteTypeString } from '../model/SoluteType.js';

// For ease of layout and equal spacing, fit everything into a single box of fixed size.
const BOX_WIDTH = 100;
const BOX_HEIGHT = 100;

export default class SoluteBarChartNode extends Node {
  public constructor( soluteType: SoluteType ) {
    super( {

      // TODO: Eliminate the clip area once we are sure everything remains in bounds.
      clipArea: Shape.rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT )
    } );

    // For layout, not just for debugging
    const layoutBox = new Rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT, { fill: 'red', opacity: 0 } );

    const icon = new Path( Shape.circle( 0, 0, 5 ), {
      fill: 'blue',
      left: 5,
      bottom: BOX_HEIGHT / 2 - 3
    } );
    const text = new RichText( getSoluteTypeString( soluteType ), {
      font: new PhetFont( 10 ),
      left: 5,
      top: BOX_HEIGHT / 2 + 3
    } );
    const origin = new Path( Shape.lineSegment( 40, BOX_HEIGHT / 2, BOX_WIDTH, BOX_HEIGHT / 2 ), {
      stroke: 'black', lineWidth: 2
    } );
    const fillColorProperty = getSoluteBarChartColorProperty( soluteType );

    const barLineWidth = 1;
    const BAR_WIDTH = 15;
    const outsideBar = new Rectangle( 50, BOX_HEIGHT / 2, BAR_WIDTH, 25, {
      fill: fillColorProperty,
      stroke: 'black',
      lineWidth: barLineWidth,
      bottom: BOX_HEIGHT / 2 + barLineWidth // Adjust for the line width so it doesn't double up with the origin line
    } );
    const insideBar = new Rectangle( 50, BOX_HEIGHT / 2, BAR_WIDTH, 35, {
      fill: fillColorProperty,
      stroke: 'black',
      lineWidth: barLineWidth,
      top: BOX_HEIGHT / 2 - barLineWidth
    } );
    const arrow = new ArrowNode( 80, BOX_HEIGHT / 2, 80, 20, {
      fill: fillColorProperty,
      stroke: 'black',
      centerY: BOX_HEIGHT / 2
    } );

    this.children = [ layoutBox, icon, text, outsideBar, insideBar, origin, arrow ];
  }
}

membraneChannels.register( 'SoluteBarChartNode', SoluteBarChartNode );