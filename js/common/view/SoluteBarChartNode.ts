// Copyright 2025, University of Colorado Boulder

/**
 * In the SoluteBarChartsAccordionBox, the node that shows an icon, bar chart and arrow for one solute.
 *
 * TODO: Description, keyboard, sonification
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

// import Property from '../../../../axon/js/Property.js';
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
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import { MAX_SOLUTE_COUNT } from '../MembraneChannelsConstants.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import { getSoluteBarChartColorProperty, getSoluteTypeString, PlottableSoluteTypes } from '../model/SoluteType.js';
import getParticleNode from './particles/getParticleNode.js';

// For ease of layout and equal spacing, fit everything into a single box of fixed size.
const BOX_WIDTH = 100;
const BOX_HEIGHT = 100;

const MAX_ARROW_HEIGHT = 13 * 20;

export default class SoluteBarChartNode extends Node {
  public readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  public constructor( model: MembraneChannelsModel, soluteType: PlottableSoluteTypes, tandem: Tandem ) {

    const outsideAmountProperty = model.outsideSoluteCountProperties[ soluteType ];
    const insideAmountProperty = model.insideSoluteCountProperties[ soluteType ];

    // If time passes, the flux will change.
    // TODO: This as a Property is a workaround so that it is observable. Do we need a timeProperty to drive the description?
    // const fluxValueProperty = new Property( model.getRecentSoluteFluxWithSmoothing( soluteType ) );

    // TODO: Consider creating a utility function for thresholding.
    // TODO: Consider building that into Fluent directly???


    // TODO (design): The visual only shows the magnitude of particles inside and outside. The description directly calls out the difference.
    //   What if the description simply described the mmagnitude of the outside bar and the inside bar?
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

    const sizeDescriptionProperty = new StringProperty( 'small' );
    const directionDescriptionProperty = new StringProperty( 'upward' );

    const descriptionProperty = new PatternMessageProperty( MembraneChannelsMessages.barChartPatternMessageProperty, {
      amount: soluteDifferenceProperty,
      size: sizeDescriptionProperty,
      direction: 'upward' // TODO: This is a placeholder
    } );

    super( {

      // TODO: Eliminate the clip area once we are sure everything remains in bounds?
      clipArea: Shape.rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT ),

      // TODO: Pass through options?
      tandem: tandem,

      // pdom
      tagName: 'li',
      accessibleName: descriptionProperty
    } );

    // For layout, not just for debugging
    const layoutBox = new Rectangle( 0, 0, BOX_WIDTH, BOX_HEIGHT, { fill: 'red', opacity: 0 } );

    const icon = getParticleNode( soluteType );
    icon.setScaleMagnitude( 0.65 ); // TODO: Same scale used in SolutesPanel (duplication)?
    icon.left = 8;
    icon.bottom = BOX_HEIGHT / 2 - 3;

    const text = new RichText( getSoluteTypeString( soluteType ), {
      font: new PhetFont( 10 ),
      centerX: icon.centerX,
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
    const arrow = new ArrowNode( 80, 0, 80, 0, {
      fill: fillColorProperty,
      stroke: 'black',
      centerY: BOX_HEIGHT / 2
    } );

    // // Update the arrow when the passage history changes - Discrete version
    // this.stepEmitter.addListener( dt => {
    //   // Net positive is into the cell
    //   const historyAccumulation = model.getNetPassageHistory( soluteType );
    //   arrow.setTailAndTip( 80, 0, 80, historyAccumulation * 20 );
    //   arrow.centerY = BOX_HEIGHT / 2;
    // } );

    this.stepEmitter.addListener( dt => {

      // Net positive is into the cell
      // TODO: Should this be smoothed out?
      // TODO: How to normalize? When done, replace MAX_ARROW_HEIGHT with the normalized value.
      const smoothedNet = model.getRecentSoluteFluxWithSmoothing( soluteType );
      if ( Math.abs( smoothedNet ) > 0.01 ) {
        arrow.visible = true;
        const constrainedArrowHeight = clamp( smoothedNet * 20, -MAX_ARROW_HEIGHT, MAX_ARROW_HEIGHT );
        arrow.setTailAndTip( 80, 0, 80, constrainedArrowHeight );
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
    model.outsideSoluteCountProperties[ soluteType ].link( soluteCount => {
      outsideBar.setRectHeight( soluteCount / MAX_SOLUTE_COUNT * BOX_HEIGHT / 2 * PADDING_FACTOR );
      outsideBar.bottom = BOX_HEIGHT / 2 + barLineWidth;
    } );

    model.insideSoluteCountProperties[ soluteType ].link( soluteCount => {
      insideBar.setRectHeight( soluteCount / MAX_SOLUTE_COUNT * BOX_HEIGHT / 2 * PADDING_FACTOR );
      insideBar.top = BOX_HEIGHT / 2 - barLineWidth;
    } );

    this.children = [ layoutBox, icon, text, outsideBar, insideBar, origin, arrow ];
  }
}

membraneChannels.register( 'SoluteBarChartNode', SoluteBarChartNode );