// Copyright 2025, University of Colorado Boulder

/**
 * In the bottom left of the screen view, the accordion box that contains the solute bar charts.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import SoluteType, { getSoluteBarChartTandemName } from '../model/SoluteType.js';
import InsideOutsideLabel from './InsideOutsideLabel.js';
import { AverageCrossingDirectionDescriptor } from './MembraneTransportDescriber.js';
import SoluteBarChartNode from './SoluteBarChartNode.js';

type SelfOptions = EmptySelfOptions;
type SoluteBarChartsAccordionBoxOptions = SelfOptions & AccordionBoxOptions;

export default class SoluteConcentrationsAccordionBox extends AccordionBox {

  public readonly stepEmitter: Emitter<[ number ]>;

  public constructor(
    model: MembraneTransportModel,
    averageSoluteCrossingDirectionProperties: Record<SoluteType, Property<AverageCrossingDirectionDescriptor>>,
    providedOptions: SoluteBarChartsAccordionBoxOptions ) {

    const options = optionize<SoluteBarChartsAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {
      titleNode: new Text( MembraneTransportFluent.soluteConcentrationsAccordionBox.titleStringProperty, {
        fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE,
        maxWidth: 400
      } ),

      // Makes it easy to position the collapsed accordion box so that when it expands it has the correct layout.
      useExpandedBoundsWhenCollapsed: true,

      contentXMargin: 5,
      contentYMargin: 5,
      titleXMargin: 5,
      titleYMargin: 5,
      contentYSpacing: 0,
      titleAlignX: 'left',
      fill: 'white',
      expandedDefaultValue: true,
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS,
      buttonXMargin: 8,

      accessibleContextResponseExpanded: MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.accessibleContextResponseExpandedStringProperty,
      accessibleContextResponseCollapsed: MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.accessibleContextResponseCollapsedStringProperty,
      voicingHintResponseCollapsed: MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.voicingHintResponseCollapsedStringProperty
    }, providedOptions );

    const contentWidth = 720;
    
    // Local closure arrow functions for shape creation
    const createContentShape = ( width: number ) => Shape.roundedRectangleWithRadii( 0, 0, width, 100, {
      bottomLeft: 5,
      bottomRight: 5,
      topLeft: 5,
      topRight: 5
    } );
    
    const createTopHalfShape = ( width: number ) => Shape.roundedRectangleWithRadii( 0, 0, width, 50, {
      topLeft: 5, topRight: 5,
      bottomLeft: 0, bottomRight: 0
    } );
    
    const createBottomHalfShape = ( width: number ) => Shape.roundedRectangleWithRadii( 0, 50, width, 50, {
      topLeft: 0, topRight: 0,
      bottomLeft: 5, bottomRight: 5
    } );

    const contentNode = new Path( createContentShape( contentWidth ), {
      stroke: 'black',
      lineWidth: 1
    } );

    const stepEmitter = new Emitter<[ number ]>( {
      parameters: [ { valueType: 'number' } ]
    } );

    // the top half is extracellular
    const topHalf = new Path( createTopHalfShape( contentWidth ), {
      fill: MembraneTransportColors.observationWindowOutsideCellColorProperty
    } );
    const bottomHalf = new Path( createBottomHalfShape( contentWidth ), {
      fill: MembraneTransportColors.observationWindowInsideCellColorProperty
    } );

    contentNode.addChild( topHalf );
    contentNode.addChild( bottomHalf );

    // NOTE: Duplication with ObservationWindow
    const TEXT_MARGIN = 27;
    const TEXT_MAX_WIDTH = 46;
    const outsideText = new InsideOutsideLabel( 'outside', TEXT_MAX_WIDTH, { top: contentNode.top + TEXT_MARGIN, scale: 0.85 } );
    const insideText = new InsideOutsideLabel( 'inside', TEXT_MAX_WIDTH, { bottom: contentNode.bottom - TEXT_MARGIN, scale: 0.85 } );

    contentNode.addChild( outsideText );
    contentNode.addChild( insideText );

    const iconAlignGroup = new AlignGroup();
    const hbox = new HBox( {
      children: getFeatureSetSoluteTypes( model.featureSet ).filter( solute => solute !== 'atp' && solute !== 'adp' && solute !== 'phosphate' ).map( soluteType => {
        const averageCrossingDirectionProperty = averageSoluteCrossingDirectionProperties[ soluteType ];
        const soluteBarChartNode = new SoluteBarChartNode(
          model,
          soluteType,
          averageCrossingDirectionProperty,
          iconAlignGroup,
          options.tandem.createTandem( getSoluteBarChartTandemName( soluteType ) )
        );
        stepEmitter.addListener( dt => soluteBarChartNode.stepEmitter.emit( dt ) );
        return soluteBarChartNode;
      } ),
      spacing: 10,
      left: 50,
      top: 5,

      tagName: 'ul',

      // Use descriptionContent because it should come before the list of solute bar charts in the PDOM.
      descriptionTagName: 'p',
      descriptionContent: MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.descriptionContentStringProperty
    } );
    contentNode.addChild( hbox );

    hbox.boundsProperty.link( () => {

      // Don't crash when hbox.width is NaN by recomputing the shapes like above.
      const rectWidth = hbox.width >= 0 ? hbox.width + 75 : 0;
      contentNode.setShape( createContentShape( rectWidth ) );
      topHalf.setShape( createTopHalfShape( rectWidth ) );
      bottomHalf.setShape( createBottomHalfShape( rectWidth ) );
    } );

    super( contentNode, options );
    this.stepEmitter = stepEmitter;
  }
}
membraneTransport.register( 'SoluteConcentrationsAccordionBox', SoluteConcentrationsAccordionBox );