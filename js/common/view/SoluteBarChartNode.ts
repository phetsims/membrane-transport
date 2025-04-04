// Copyright 2025, University of Colorado Boulder

/**
 * In the SoluteConcentrationsAccordionBox, the node that shows an icon, bar chart and arrow for one solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Shape from '../../../../kite/js/Shape.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { getSoluteBarChartColorProperty, getSoluteTypeString, PlottableSoluteTypes } from '../model/SoluteType.js';
import getParticleNode from './particles/getParticleNode.js';

// For ease of layout and equal spacing, fit everything into a single box of fixed size.
const BOX_WIDTH = 124;
const BOX_HEIGHT = 92;

const MAX_ARROW_HEIGHT = BOX_HEIGHT * 0.9;

export default class SoluteBarChartNode extends Node {
  public readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  public constructor( model: MembraneTransportModel, soluteType: PlottableSoluteTypes, tandem: Tandem ) {

    const outsideAmountProperty = model.outsideSoluteCountProperties[ soluteType ];
    const insideAmountProperty = model.insideSoluteCountProperties[ soluteType ];

    // If time passes, the flux will change.
    // TODO (JG): This as a Property is a workaround so that it is observable. Do we need a timeProperty to drive the description?
    // const fluxValueProperty = new Property( model.getRecentSoluteFluxWithSmoothing( soluteType ) );

    // TODO (design): The visual only shows the magnitude of particles inside and outside. The description directly calls out the difference.
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

    // TODO (design): i18n
    const sizeDescriptionProperty = new StringProperty( 'small' );
    const directionDescriptionProperty = new StringProperty( 'upward' );

    const descriptionProperty = new PatternMessageProperty( MembraneTransportMessages.barChartPatternMessageProperty, {
      soluteType: soluteType,
      amount: soluteDifferenceProperty,
      size: sizeDescriptionProperty,
      direction: 'upward' // TODO (design): This is a placeholder, but we need a design for equal amounts before finishing this up
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

    const icon = getParticleNode( soluteType );

    // We want to keep the relative sizes correct for the gas solutes and the ions
    // but the ATP and Glucose are much larger, so we scale them down.
    icon.setScaleMagnitude( soluteType === 'glucose' ? 0.075 :
                            soluteType === 'potassiumIon' ? 0.08 :
                            0.1 );

    icon.centerX = BOX_WIDTH / 2;
    icon.top = 2;

    const text = new RichText( getSoluteTypeString( soluteType ), {
      font: new PhetFont( 14 ),
      centerX: BOX_WIDTH / 2,
      bottom: BOX_HEIGHT - 2,
      maxWidth: BOX_WIDTH * 0.8
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
    const arrow = new ArrowNode( 80, 0, 80, 0, {
      fill: fillColorProperty,
      stroke: 'black',
      centerY: BOX_HEIGHT / 2
    } );

    // TODO (JG/SR): Use or remove this code
    // // Update the arrow when the passage history changes - Discrete version
    // this.stepEmitter.addListener( dt => {
    //   // Net positive is into the cell
    //   const historyAccumulation = model.getNetPassageHistory( soluteType );
    //   arrow.setTailAndTip( 80, 0, 80, historyAccumulation * 20 );
    //   arrow.centerY = BOX_HEIGHT / 2;
    // } );

    this.stepEmitter.addListener( dt => {

      // Net positive is into the cell
      // TODO (design): How to normalize? When done, replace MAX_ARROW_HEIGHT with the normalized value.
      const smoothedNet = model.getRecentSoluteFluxWithSmoothing( soluteType );
      if ( Math.abs( smoothedNet ) > 0.01 ) {
        arrow.visible = true;
        const constrainedArrowHeight = clamp( smoothedNet * 50, -MAX_ARROW_HEIGHT, MAX_ARROW_HEIGHT );
        arrow.setTailAndTip( 10, 0, 10, constrainedArrowHeight );
        arrow.centerY = BOX_HEIGHT / 2;

        sizeDescriptionProperty.value = Math.abs( constrainedArrowHeight ) > MAX_ARROW_HEIGHT / 2 ? 'large' :
                                        Math.abs( constrainedArrowHeight ) > MAX_ARROW_HEIGHT / 4 ? 'medium' :
                                        'small';

        directionDescriptionProperty.value = constrainedArrowHeight > 0 ? 'upward' : 'downward';
      }
      else {
        arrow.visible = false;
      }
    } );

    const PADDING_FACTOR = 0.95;
    const BAR_MULTIPLIER = 2;
    model.outsideSoluteCountProperties[ soluteType ].link( soluteCount => {
      outsideBar.setRectWidth( BAR_MULTIPLIER * soluteCount / MembraneTransportConstants.MAX_SOLUTE_COUNT * BOX_HEIGHT / 2 * PADDING_FACTOR );
      outsideBar.left = origin.centerX;
    } );

    model.insideSoluteCountProperties[ soluteType ].link( soluteCount => {
      insideBar.setRectWidth( BAR_MULTIPLIER * soluteCount / MembraneTransportConstants.MAX_SOLUTE_COUNT * BOX_HEIGHT / 2 * PADDING_FACTOR );
      insideBar.left = origin.centerX;
    } );

    this.children = [ layoutBox, icon, text, outsideBar, insideBar, origin, arrow ];
  }
}

membraneTransport.register( 'SoluteBarChartNode', SoluteBarChartNode );