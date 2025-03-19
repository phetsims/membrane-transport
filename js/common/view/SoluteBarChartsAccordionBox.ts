// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MembraneChannelsColors from '../../common/MembraneChannelsColors.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import { getFeatureSetSoluteTypes } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import { getSoluteBarChartTandemName } from '../model/SoluteType.js';
import SoluteBarChartNode from './SoluteBarChartNode.js';

type SelfOptions = EmptySelfOptions;
type SoluteBarChartsAccordionBoxOptions = SelfOptions & AccordionBoxOptions;

/**
 * In the bottom left of the screen view, the accordion box that contains the solute bar charts.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SoluteBarChartsAccordionBox extends AccordionBox {

  public readonly stepEmitter: Emitter<[ number ]>;

  public constructor( model: MembraneChannelsModel, providedOptions: SoluteBarChartsAccordionBoxOptions ) {

    const options = optionize<SoluteBarChartsAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {
      titleNode: new Text( 'Solute Bar Charts', { fontSize: 20 } ),

      // Makes it easy to position the collapsed accordion box so that when it expands it has the correct layout.
      useExpandedBoundsWhenCollapsed: true,

      titleAlignX: 'left',
      fill: 'white',
      expandedDefaultValue: true
    }, providedOptions );

    const contentWidth = 720;
    const contentNode = new Rectangle( 0, 0, contentWidth, 100, {
      stroke: 'black',
      lineWidth: 1
    } );

    const stepEmitter = new Emitter<[ number ]>( {
      parameters: [ { valueType: 'number' } ]
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

    // NOTE: Duplication with ObservationWindow
    const TEXT_MARGIN = 30;
    const textOptions = { fontSize: 13, left: 3, maxWidth: 200 };
    const outsideText = new Text( MembraneChannelsStrings.outsideStringProperty, combineOptions<TextOptions>( { top: contentNode.top + TEXT_MARGIN }, textOptions ) );
    const insideText = new Text( MembraneChannelsStrings.insideStringProperty, combineOptions<TextOptions>( { bottom: contentNode.bottom - TEXT_MARGIN }, textOptions ) );

    contentNode.addChild( outsideText );
    contentNode.addChild( insideText );

    const hbox = new HBox( {
      children: getFeatureSetSoluteTypes( model.featureSet ).filter( solute => solute !== 'atp' && solute !== 'adp' && solute !== 'phosphate' ).map( soluteType => {
        const soluteBarChartNode = new SoluteBarChartNode( model, soluteType, options.tandem.createTandem( getSoluteBarChartTandemName( soluteType ) ) );
        stepEmitter.addListener( dt => soluteBarChartNode.stepEmitter.emit( dt ) );
        return soluteBarChartNode;
      } ),
      spacing: 12,
      left: 50,
      top: 5,

      tagName: 'ul',

      descriptionTagName: 'p',
      descriptionContent: MembraneChannelsMessages.soluteBarChartsDescriptionParagraphMessageProperty
    } );
    contentNode.addChild( hbox );

    hbox.boundsProperty.link( () => {

      // Don't crash when hbox.width is NaN
      const rectWidth = hbox.width >= 0 ? hbox.width + 75 : 0;
      contentNode.setRectWidth( rectWidth );
      topHalf.setRectWidth( rectWidth );
      bottomHalf.setRectWidth( rectWidth );
    } );

    super( contentNode, options );
    this.stepEmitter = stepEmitter;
  }
}
membraneChannels.register( 'SoluteBarChartsAccordionBox', SoluteBarChartsAccordionBox );