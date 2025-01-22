// Copyright 2025, University of Colorado Boulder

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Rectangle, Text } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MembraneChannelsColors from '../../common/MembraneChannelsColors.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import { SoluteTypes } from '../model/SoluteType.js';
import SoluteBarChartNode from './SoluteBarChartNode.js';

type SelfOptions = EmptySelfOptions;
type SoluteBarChartsAccordionBoxOptions = SelfOptions & AccordionBoxOptions;

/**
 * In the bottom left of the screen view, the accordion box that contains the solute bar charts.
 * TODO: Description?
 * TODO: PhET-iO?
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SoluteBarChartsAccordionBox extends AccordionBox {

  // TODO: Just pass the part of the model needed here?
  public constructor( model: MembraneChannelsModel, providedOptions: SoluteBarChartsAccordionBoxOptions ) {

    const options = optionize<SoluteBarChartsAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {
      titleNode: new Text( 'Solute Bar Charts', { fontSize: 20 } ),

      // Makes it easy to position the collapsed accordion box so that when it expands it has the correct layout.
      useExpandedBoundsWhenCollapsed: true,

      titleAlignX: 'left',
      fill: 'white',
      expandedDefaultValue: true // TODO: This is just for development
    }, providedOptions );

    const contentWidth = 720;
    const contentNode = new Rectangle( 0, 0, contentWidth, 100, {
      stroke: 'black',
      lineWidth: 1
    } );

    // the top half is extracelluar
    const topHalf = new Rectangle( 0, 0, contentWidth, 50, {
      fill: MembraneChannelsColors.outsideCellColorProperty
    } );
    const bottomHalf = new Rectangle( 0, 50, contentWidth, 50, {
      fill: MembraneChannelsColors.insideCellColorProperty
    } );

    contentNode.addChild( topHalf );
    contentNode.addChild( bottomHalf );

    const TEXT_MARGIN = 3;

    // TODO: i18n
    const outsideText = new Text( 'Outside', { fontSize: 13, top: contentNode.top + TEXT_MARGIN, left: TEXT_MARGIN } );
    const insideText = new Text( 'Inside', { fontSize: 13, bottom: contentNode.bottom - TEXT_MARGIN, left: TEXT_MARGIN } );

    contentNode.addChild( outsideText );
    contentNode.addChild( insideText );

    const hbox = new HBox( {
      children: SoluteTypes.filter( solute => solute !== 'atp' ).map( soluteType => new SoluteBarChartNode( model, soluteType ) ),
      spacing: 30,
      left: 50
    } );
    contentNode.addChild( hbox );

    // TODO: Fit contentNode to the hbox, so that removal of solutes will shrink the box horizontally. Like a Panel.
    super( contentNode, options );
  }
}
membraneChannels.register( 'SoluteBarChartsAccordionBox', SoluteBarChartsAccordionBox );