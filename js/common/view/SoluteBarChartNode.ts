// Copyright 2025, University of Colorado Boulder

/**
 * In the SoluteConcentrationsAccordionBox, the node that shows an icon and bar chart representing the
 * solute concentrations inside and outside the cell.
 *
 * The design of this chart is simple enough that we decided not to use bamboo (PhET's charting library).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportColors from '../MembraneTransportColors.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { getSoluteBarChartColorProperty, getSoluteTypeString, PlottableSoluteTypes } from '../model/SoluteType.js';
import createParticleNode from './particles/createParticleNode.js';

// For ease of layout and equal spacing, fit everything into a single box of fixed size.
const BOX_WIDTH = 124;
const BOX_HEIGHT = 92;

export default class SoluteBarChartNode extends Node {
  public readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  public constructor( model: MembraneTransportModel, soluteType: PlottableSoluteTypes, iconAlignGroup: AlignGroup, tandem: Tandem ) {

    const outsideSoluteCountProperty = model.outsideSoluteCountProperties[ soluteType ];
    const outsideAmountProperty = outsideSoluteCountProperty;
    const insideSoluteCountProperty = model.insideSoluteCountProperties[ soluteType ];
    const insideAmountProperty = insideSoluteCountProperty;

    // TODO (design): The visual only shows the magnitude of particles inside and outside. The description directly calls out the difference. https://github.com/phetsims/membrane-transport/issues/90
    //   What if the description simply described the magnitude of the outside bar and the inside bar?
    //   "A lot of CO2 outside, a little inside"
    //   "A little CO2 outside, a lot inside"
    //   "A little CO2 outside, a little inside"
    //   In the original design, we need special cases for when there is no solute on one side. If the descriptions always directly described that,

    const soluteDifferenceProperty = new DerivedProperty( [ outsideAmountProperty, insideAmountProperty ], ( outsideAmount, insideAmount ) => {
      const difference = outsideAmount - insideAmount;
      return difference > 10 ? 'aLotMore' :
             difference > 5 ? 'aLittleMore' :
             difference > -5 ? 'aLittleLess' :
             'aLotLess';
    } );

    // TODO (design): i18n https://github.com/phetsims/membrane-transport/issues/90
    const sizeDescriptionProperty = new StringUnionProperty( 'small', {
      validValues: [ 'small', 'medium', 'large' ]
    } );

    const descriptionProperty = MembraneTransportFluent.a11y.barChartPattern.createProperty( {
      soluteType: soluteType,
      amount: soluteDifferenceProperty,
      size: sizeDescriptionProperty,
      direction: 'upward' // TODO (design): This is a placeholder, but we need a design for equal amounts before finishing this up https://github.com/phetsims/membrane-transport/issues/90
    } );

    super( {

      tandem: tandem,

      // Gracefully prevent anything from being drawn outside the box
      clipArea: Shape.rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT ),

      // pdom
      tagName: 'li',
      accessibleName: descriptionProperty
    } );

    // For layout, not just for debugging
    const layoutBox = new Rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT, 4, 4, { fill: 'white', opacity: 0.2, stroke: 'black', lineWidth: 1 } );

    const icon = createParticleNode( soluteType );

    // We want to keep the relative sizes correct for the gas solutes and the ions
    // but the ATP and Glucose are much larger, so we scale them down.
    icon.setScaleMagnitude( soluteType === 'glucose' ? 0.075 :
                            soluteType === 'potassiumIon' ? 0.08 :
                            0.1 );

    const text = new RichText( getSoluteTypeString( soluteType ), {
      font: MembraneTransportConstants.FONT,
      maxWidth: BOX_WIDTH * 0.5
    } );

    const iconWithText = new HBox( {

      // Put in an alignGroup box so that we can align all text baselines and icons
      children: [ iconAlignGroup.createBox( icon ), text ],
      spacing: 3,
      align: 'bottom',

      centerX: BOX_WIDTH / 2,

      // Use y instead of bottom so the text baselines will align
      y: BOX_HEIGHT - 20
    } );
    const originExtent = 54;
    const origin = new Path( Shape.lineSegment( 20, BOX_HEIGHT / 2 + originExtent / 2, 20, BOX_HEIGHT / 2 - originExtent / 2 ), {
      stroke: 'black', lineWidth: 2
    } );
    const fillColorProperty = getSoluteBarChartColorProperty( soluteType );

    const barLineWidth = 1;
    const BAR_WIDTH = 15;

    // Helper function to create bar rectangles with consistent parameters
    const createBarRectangle = ( fill: TColor | null, isOutside: boolean, isStroke = false ) => {
      return new Rectangle( 0, 0, 1, BAR_WIDTH, {
        fill: isStroke ? null : fill,
        stroke: 'black',
        lineWidth: barLineWidth,
        left: origin.centerX,
        centerY: BOX_HEIGHT / 2 + ( isOutside ? -1 : 1 ) * ( BAR_WIDTH / 2 + 7 )
      } );
    };

    // Create the bars with fills
    const outsideBar = createBarRectangle( fillColorProperty, true );
    const insideBar = createBarRectangle( fillColorProperty, false );

    // Render the strokes afterward as well, so they will cover the yellow highlight stripes
    const outsideBarStroke = createBarRectangle( fillColorProperty, true, true );
    const insideBarStroke = createBarRectangle( fillColorProperty, false, true );

    const PADDING_FACTOR = 0.95;
    const BAR_MULTIPLIER = 2;

    // Create highlight stripes on top of the bars (higher z-index)
    const outsideStripe = new Rectangle( 0, 0, 0, BAR_WIDTH, {
      fill: MembraneTransportColors.fluxHighlightColorProperty,
      left: origin.centerX,
      centerY: outsideBar.centerY
    } );
    const insideStripe = new Rectangle( 0, 0, 0, BAR_WIDTH, {
      fill: MembraneTransportColors.fluxHighlightColorProperty,
      left: origin.centerX,
      centerY: insideBar.centerY
    } );

    // linear function that maps a number of solutes to a width extent of the bar chart
    const countToWidth = ( count: number ) => {
      return BAR_MULTIPLIER * count / MembraneTransportConstants.MAX_SOLUTE_COUNT * ( BOX_HEIGHT / 2 ) * PADDING_FACTOR;
    };

    // Update outside bar width when count changes, but don't show stripe
    outsideSoluteCountProperty.link( soluteCount => {
      const width = countToWidth( soluteCount );

      outsideBar.setRectWidth( width );
      outsideBar.left = origin.centerX;

      outsideBarStroke.setRectWidth( width );
      outsideBarStroke.left = origin.centerX;
    } );

    // Update inside bar width when count changes, but don't show stripe. If absorbing glucose, then it was requested to show the maximum solute count
    // and adjust the bar color and stroke. See https://github.com/phetsims/membrane-transport/issues/187
    Multilink.multilink( [ insideSoluteCountProperty, MembraneTransportPreferences.instance.absorbGlucoseProperty ], ( soluteCount, absorbGlucose ) => {
      const glucoseAndAbsorbing = soluteType === 'glucose' && absorbGlucose;

      const countToUse = glucoseAndAbsorbing ? MembraneTransportConstants.MAX_SOLUTE_COUNT : soluteCount;
      const width = countToWidth( countToUse );

      insideBar.fill = glucoseAndAbsorbing ? MembraneTransportColors.absorbingGlucoseColorProperty : fillColorProperty;

      insideBar.setRectWidth( width );
      insideBar.left = origin.centerX;

      insideBarStroke.setRectWidth( width );
      insideBarStroke.left = origin.centerX;
    } );

    // Helper function to update a highlight stripe
    const updateStripe = ( count: number, stripe: Rectangle, bar: Rectangle, totalAmountProperty: TReadOnlyProperty<number> ) => {

      // Calculate highlight width for exact particle count - one-to-one correspondence
      const highlightWidth = countToWidth( count );

      // Position the stripe to overlay the bar (at the end of the bar)
      stripe.setRectWidth( highlightWidth );

      // stripe.right = countToWidth( totalAmountProperty.value );
      stripe.right = bar.right - bar.lineWidth / 2;
    };

    // Update flux highlights based on direct flux entries from the model
    this.stepEmitter.addListener( dt => {

      if ( model.isPlayingProperty.value ) {

        // Get all new entries for this solute type within the time window
        const fluxEntries = model.fluxEntries.filter( entry => entry.soluteType === soluteType );

        const inwardCount = fluxEntries.filter( entry => entry.direction === 'inward' ).length;
        const outwardCount = fluxEntries.filter( entry => entry.direction === 'outward' ).length;

        updateStripe( inwardCount, insideStripe, insideBar, insideSoluteCountProperty );
        updateStripe( outwardCount, outsideStripe, outsideBar, outsideSoluteCountProperty );
      }
    } );

    // NOTE: Duplicated with MacroCellNode
    const scale = 0.5;
    const orangeOuterHeads = new Path( Shape.lineSegment( 0, BOX_HEIGHT / 2, BOX_WIDTH, BOX_HEIGHT / 2 ), {
      lineWidth: 13 * scale,
      stroke: MembraneTransportColors.phospholipidHeadColorProperty
    } );
    this.addChild( orangeOuterHeads );

    const pinkInnerTails = new Path( Shape.lineSegment( 0, BOX_HEIGHT / 2, BOX_WIDTH, BOX_HEIGHT / 2 ), {
      lineWidth: 4 * scale,
      stroke: MembraneTransportColors.phospholipidTailColorProperty
    } );
    this.addChild( pinkInnerTails );

    this.children = [
      layoutBox,
      iconWithText,

      orangeOuterHeads,
      pinkInnerTails,

      outsideBar,
      insideBar,
      outsideStripe,
      insideStripe,
      outsideBarStroke,
      insideBarStroke,
      origin
    ];
  }
}

membraneTransport.register( 'SoluteBarChartNode', SoluteBarChartNode );