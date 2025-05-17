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
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
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

    const outsideAmountProperty = model.outsideSoluteCountProperties[ soluteType ];
    const insideAmountProperty = model.insideSoluteCountProperties[ soluteType ];

    // If time passes, the flux will change.
    // TODO (JG): This as a Property is a workaround so that it is observable. Do we need a timeProperty to drive the description? https://github.com/phetsims/membrane-transport/issues/90
    // const fluxValueProperty = new Property( model.getRecentSoluteFluxWithSmoothing( soluteType ) );

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

      // Gracefully prevent anything from being drawn outside of the box
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
    const originExtent = 50;
    const origin = new Path( Shape.lineSegment( 20, BOX_HEIGHT / 2 + originExtent / 2, 20, BOX_HEIGHT / 2 - originExtent / 2 ), {
      stroke: 'black', lineWidth: 2
    } );
    const fillColorProperty = getSoluteBarChartColorProperty( soluteType );

    const barLineWidth = 1;
    const BAR_WIDTH = 15;
    const outsideBar = new Rectangle( 0, 0, 1, BAR_WIDTH, {
      fill: fillColorProperty,
      stroke: 'black',
      lineWidth: barLineWidth,
      left: origin.centerX,
      centerY: BOX_HEIGHT / 2 - BAR_WIDTH / 2 - 5
    } );
    const insideBar = new Rectangle( 0, 0, 1, BAR_WIDTH, {
      fill: fillColorProperty,
      stroke: 'black',
      lineWidth: barLineWidth,
      left: origin.centerX,
      centerY: BOX_HEIGHT / 2 + BAR_WIDTH / 2 + 5
    } );

    // TODO (JG/SR): Use or remove this code https://github.com/phetsims/membrane-transport/issues/90
    // // Update the arrow when the passage history changes - Discrete version
    // this.stepEmitter.addListener( dt => {
    //   // Net positive is into the cell
    //   const historyAccumulation = model.getNetPassageHistory( soluteType );
    //   arrow.setTailAndTip( 80, 0, 80, historyAccumulation * 20 );
    //   arrow.centerY = BOX_HEIGHT / 2;
    // } );

    this.stepEmitter.addListener( dt => {

      // decrement highlight stripe timers and hide when expired
      if ( outsideStripeTimeRemaining > 0 ) {
        outsideStripeTimeRemaining -= dt;
        if ( outsideStripeTimeRemaining <= 0 ) {
          outsideStripe.visible = false;
        }
      }
      if ( insideStripeTimeRemaining > 0 ) {
        insideStripeTimeRemaining -= dt;
        if ( insideStripeTimeRemaining <= 0 ) {
          insideStripe.visible = false;
        }
      }
    } );

    const PADDING_FACTOR = 0.95;
    const BAR_MULTIPLIER = 2;

    // Highlight stripes appear for a short duration based on aggregate flux
    const HIGHLIGHT_DURATION = 0.2; // seconds

    // Remaining time (in seconds) for which stripes remain visible
    let outsideStripeTimeRemaining = 0;
    let insideStripeTimeRemaining = 0;

    // Create highlight stripes on top of the bars (higher z-index)
    const outsideStripe = new Rectangle( 0, 0, 0, BAR_WIDTH, {
      fill: 'yellow',
      visible: false,
      left: origin.centerX,
      centerY: outsideBar.centerY
    } );
    const insideStripe = new Rectangle( 0, 0, 0, BAR_WIDTH, {
      fill: 'yellow',
      visible: false,
      left: origin.centerX,
      centerY: insideBar.centerY
    } );

    // Update outside bar width when count changes, but don't show stripe
    model.outsideSoluteCountProperties[ soluteType ].link( soluteCount => {
      const newWidth = BAR_MULTIPLIER * soluteCount / MembraneTransportConstants.MAX_SOLUTE_COUNT * ( BOX_HEIGHT / 2 ) * PADDING_FACTOR;
      outsideBar.setRectWidth( newWidth );
      outsideBar.left = origin.centerX;
    } );

    // Update inside bar width when count changes, but don't show stripe
    model.insideSoluteCountProperties[ soluteType ].link( soluteCount => {
      const newWidth = BAR_MULTIPLIER * soluteCount / MembraneTransportConstants.MAX_SOLUTE_COUNT * ( BOX_HEIGHT / 2 ) * PADDING_FACTOR;
      insideBar.setRectWidth( newWidth );
      insideBar.left = origin.centerX;
    } );

    // Keep track of which flux entries we've already processed
    let lastProcessedTime = 0;

    // Update flux highlights based on direct flux entries from the model
    this.stepEmitter.addListener( dt => {
      // Directly access model's fluxEntries property (not using getRecentSoluteFluxWithSmoothing)
      // Look for new entries in the last 1 second time window only
      const currentTime = model.time;
      const timeWindowStart = Math.max( currentTime - 1.0, lastProcessedTime );

      // Get all new entries for this solute type within the time window
      const newFluxEntries = model.fluxEntries.filter( entry =>
        entry.soluteType === soluteType &&
        entry.time > timeWindowStart &&
        entry.time <= currentTime
      );

      // Count entries by direction
      let inwardCount = 0;
      let outwardCount = 0;

      newFluxEntries.forEach( entry => {
        if ( entry.direction === 'inward' ) {
          inwardCount++;
        }
        else {
          outwardCount++;
        }
      } );

      // If we have any new entries, update highlights
      if ( inwardCount > 0 ) {
        // Calculate highlight width for exact particle count - one-to-one correspondence
        const highlightWidth = BAR_MULTIPLIER * inwardCount / MembraneTransportConstants.MAX_SOLUTE_COUNT * ( BOX_HEIGHT / 2 ) * PADDING_FACTOR;

        // Position the stripe to overlay the bar (at the end of the bar)
        insideStripe.setRectWidth( highlightWidth );
        insideStripe.left = origin.centerX + insideBar.width - highlightWidth;
        insideStripe.visible = true;
        insideStripeTimeRemaining = HIGHLIGHT_DURATION;
      }

      if ( outwardCount > 0 ) {
        // Calculate highlight width for exact particle count - one-to-one correspondence
        const highlightWidth = BAR_MULTIPLIER * outwardCount / MembraneTransportConstants.MAX_SOLUTE_COUNT * ( BOX_HEIGHT / 2 ) * PADDING_FACTOR;

        // Position the stripe to overlay the bar (at the end of the bar)
        outsideStripe.setRectWidth( highlightWidth );
        outsideStripe.left = origin.centerX + outsideBar.width - highlightWidth;
        outsideStripe.visible = true;
        outsideStripeTimeRemaining = HIGHLIGHT_DURATION;
      }

      // Update the last processed time
      if ( newFluxEntries.length > 0 ) {
        lastProcessedTime = currentTime;
      }
    } );

    this.children = [
      layoutBox,
      iconWithText,
      outsideBar,
      insideBar,
      outsideStripe,
      insideStripe,
      origin
    ];
  }
}

membraneTransport.register( 'SoluteBarChartNode', SoluteBarChartNode );