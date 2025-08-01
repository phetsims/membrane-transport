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
import { getSoluteBarChartColorProperty, getSoluteTypeString, PlottableSoluteType } from '../model/SoluteType.js';
import MembraneTransportDescriber, { AverageCrossingDirectionDescriptor } from './MembraneTransportDescriber.js';
import createParticleNode from './particles/createParticleNode.js';

// For ease of layout and equal spacing, fit everything into a single box of fixed size.
const BOX_WIDTH = 124;
const BOX_HEIGHT = 92;

export default class SoluteBarChartNode extends Node {
  public readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  /**
   * @param model
   * @param soluteType
   * @param averageCrossingDirectionProperty - Property describing the average crossing direction in/out of the cell for the solute types
   * @param iconAlignGroup
   * @param tandem
   */
  public constructor( model: MembraneTransportModel,
                      soluteType: PlottableSoluteType,
                      averageCrossingDirectionProperty: TReadOnlyProperty<AverageCrossingDirectionDescriptor>,
                      iconAlignGroup: AlignGroup,
                      tandem: Tandem ) {

    const outsideSoluteCountProperty = model.outsideSoluteCountProperties[ soluteType ];
    const insideSoluteCountProperty = model.insideSoluteCountProperties[ soluteType ];

    const soluteDifferenceProperty = new DerivedProperty( [ outsideSoluteCountProperty, insideSoluteCountProperty ], ( outsideAmount, insideAmount ) => {
      return MembraneTransportDescriber.getSoluteComparisonDescriptor( outsideAmount, insideAmount );
    } );

    const accessibleNameWithParticlesProperty = MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithParticles.createProperty( {
      soluteType: soluteType,
      amount: soluteDifferenceProperty,
      direction: averageCrossingDirectionProperty,
      outsideAmount: MembraneTransportDescriber.createQualitativeAmountDescriptorProperty( outsideSoluteCountProperty ),
      insideAmount: MembraneTransportDescriber.createQualitativeAmountDescriptorProperty( insideSoluteCountProperty )
    } );
    const accessibleNameWithNoParticlesProperty = MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithNoParticles.createProperty( {
      soluteType: soluteType
    } );

    const accessibleNameWithParticlesAndGlucoseMetabolismProperty = MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithParticlesAndGlucoseMetabolism.createProperty( {
      soluteType: soluteType,
      amount: soluteDifferenceProperty,
      direction: averageCrossingDirectionProperty,
      outsideAmount: MembraneTransportDescriber.createQualitativeAmountDescriptorProperty( outsideSoluteCountProperty ),
      insideAmount: MembraneTransportDescriber.createQualitativeAmountDescriptorProperty( insideSoluteCountProperty )
    } );

    const accessibleNameWithNoParticlesAndGlucoseMetabolismProperty = MembraneTransportFluent.a11y.soluteConcentrationsAccordionBox.barChart.accessibleNameWithNoParticlesAndGlucoseMetabolism.createProperty( {
      soluteType: soluteType
    } );

    const accessibleNameProperty = new DerivedProperty( [ outsideSoluteCountProperty, insideSoluteCountProperty, accessibleNameWithParticlesProperty, accessibleNameWithNoParticlesProperty, accessibleNameWithParticlesAndGlucoseMetabolismProperty, accessibleNameWithNoParticlesAndGlucoseMetabolismProperty, MembraneTransportPreferences.instance.glucoseMetabolismProperty ],
      ( outsideSoluteCount, insideSoluteCount, accessibleNameWithParticles, accessibleNameNone, accessibleNameWithParticlesAndGlucoseMetabolism, accessibleNameWithNoParticlesAndGlucoseMetabolism, glucoseMetabolism ) => {
        const hasNoParticles = outsideSoluteCount === 0 && insideSoluteCount === 0;
        const isGlucoseWithMetabolism = soluteType === 'glucose' && glucoseMetabolism;

        if ( hasNoParticles && isGlucoseWithMetabolism ) {
          return accessibleNameWithNoParticlesAndGlucoseMetabolism;
        }
        else if ( hasNoParticles ) {
          return accessibleNameNone;
        }
        else if ( isGlucoseWithMetabolism ) {
          return accessibleNameWithParticlesAndGlucoseMetabolism;
        }
        else {
          return accessibleNameWithParticles;
        }
      }
    );

    super( {

      tandem: tandem,

      // Gracefully prevent anything from being drawn outside the box
      clipArea: Shape.rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT ),

      // pdom
      tagName: 'li',
      accessibleName: accessibleNameProperty,

      // phet-io
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // For layout, not just for debugging
    const layoutBox = new Rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT, 4, 4, { fill: 'white', opacity: 0.2, stroke: 'black', lineWidth: 1 } );

    const icon = createParticleNode( soluteType );

    // We want to keep the relative sizes correct for the gas solutes and the ions
    // but the ATP and Glucose are much larger, so we scale them down.
    icon.setScaleMagnitude( soluteType === 'glucose' ? 0.06 :
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

      // When the amounts change and the sim is paused, we must clear the highlight stripes so they don't remain stale
      if ( !model.isPlayingProperty.value ) {
        outsideStripe.setRectWidth( 0 );
        insideStripe.setRectWidth( 0 );
      }
    } );

    // Update inside bar width when count changes, but don't show stripe.
    insideSoluteCountProperty.link( soluteCount => {

      const width = countToWidth( soluteCount );

      insideBar.fill = fillColorProperty;

      insideBar.setRectWidth( width );
      insideBar.left = origin.centerX;

      insideBarStroke.setRectWidth( width );
      insideBarStroke.left = origin.centerX;

      // When the amounts change and the sim is paused, we must clear the highlight stripes so they don't remain stale
      if ( !model.isPlayingProperty.value ) {
        outsideStripe.setRectWidth( 0 );
        insideStripe.setRectWidth( 0 );
      }
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