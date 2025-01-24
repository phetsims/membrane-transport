// Copyright 2025, University of Colorado Boulder

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Circle, DragListener, Node, Path } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannelsColors from '../../common/MembraneChannelsColors.js';
import membraneChannels from '../../membraneChannels.js';

/**
 * MacroCellNode shows the "zoomed out" view of the cell, with the cell membrane and inside coloring.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class MacroCellNode extends Node {
  public constructor() {
    super( {
      opacity: phet.chipper.queryParameters.dev ? 0.5 : 1
    } );

    // When running in ?dev, you can adjust the control points and the data block below will be outputted to the console
    // START_DATA
    const point1Property = new Vector2Property( new Vector2( 100, 375 ) );
    const point2Property = new Vector2Property( new Vector2( 150, 375 ) );

    // First cubicCurveTo control points and endpoint
    const cubic1Control1Property = new Vector2Property( new Vector2( 304, 368 ) );
    const cubic1Control2Property = new Vector2Property( new Vector2( 220, 480 ) );
    const cubic1EndProperty = new Vector2Property( new Vector2( 341, 430 ) );

    // Second cubicCurveTo control points and endpoint
    const cubic2Control1Property = new Vector2Property( new Vector2( 686, 377 ) );
    const cubic2Control2Property = new Vector2Property( new Vector2( 509, 493 ) );
    const cubic2EndProperty = new Vector2Property( new Vector2( 1104, 555 ) );

    // LineTo endpoints
    const line1EndProperty = new Vector2Property( new Vector2( 1500, 2000 ) );
    const line2EndProperty = new Vector2Property( new Vector2( -1500, 2000 ) );
    const line3EndProperty = new Vector2Property( new Vector2( -1500, 300 ) );
    // END_DATA

    const shapeProperty = new Property( new Shape().rect( 0, 0, 10, 10 ) );

    Multilink.multilink( [
      point1Property,
      point2Property,
      cubic1Control1Property,
      cubic1Control2Property,
      cubic1EndProperty,
      cubic2Control1Property,
      cubic2Control2Property,
      cubic2EndProperty,
      line1EndProperty,
      line2EndProperty,
      line3EndProperty
    ], () => {
      const shape = new Shape()
        .moveToPoint( point1Property.value )
        .lineToPoint( point2Property.value )
        .cubicCurveToPoint( cubic1Control1Property.value, cubic1Control2Property.value, cubic1EndProperty.value )
        .cubicCurveToPoint( cubic2Control1Property.value, cubic2Control2Property.value, cubic2EndProperty.value )
        .lineToPoint( line1EndProperty.value )
        .lineToPoint( line2EndProperty.value )
        .lineToPoint( line3EndProperty.value )
        .close();
      shapeProperty.value = shape;

      if ( phet.chipper.queryParameters.dev ) {

        // Output the current values as code
        const str = `
// START_DATA
const point1Property = new Vector2Property( new Vector2( ${Utils.roundSymmetric( point1Property.value.x )}, ${Utils.roundSymmetric( point1Property.value.y )} ) );
const point2Property = new Vector2Property( new Vector2( ${Utils.roundSymmetric( point2Property.value.x )}, ${Utils.roundSymmetric( point2Property.value.y )} ) );

// First cubicCurveTo control points and endpoint
const cubic1Control1Property = new Vector2Property( new Vector2( ${Utils.roundSymmetric( cubic1Control1Property.value.x )}, ${Utils.roundSymmetric( cubic1Control1Property.value.y )} ) );
const cubic1Control2Property = new Vector2Property( new Vector2( ${Utils.roundSymmetric( cubic1Control2Property.value.x )}, ${Utils.roundSymmetric( cubic1Control2Property.value.y )} ) );
const cubic1EndProperty = new Vector2Property( new Vector2( ${Utils.roundSymmetric( cubic1EndProperty.value.x )}, ${Utils.roundSymmetric( cubic1EndProperty.value.y )} ) );

// Second cubicCurveTo control points and endpoint
const cubic2Control1Property = new Vector2Property( new Vector2( ${Utils.roundSymmetric( cubic2Control1Property.value.x )}, ${Utils.roundSymmetric( cubic2Control1Property.value.y )} ) );
const cubic2Control2Property = new Vector2Property( new Vector2( ${Utils.roundSymmetric( cubic2Control2Property.value.x )}, ${Utils.roundSymmetric( cubic2Control2Property.value.y )} ) );
const cubic2EndProperty = new Vector2Property( new Vector2( ${Utils.roundSymmetric( cubic2EndProperty.value.x )}, ${Utils.roundSymmetric( cubic2EndProperty.value.y )} ) );

// LineTo endpoints
const line1EndProperty = new Vector2Property( new Vector2( ${Utils.roundSymmetric( line1EndProperty.value.x )}, ${Utils.roundSymmetric( line1EndProperty.value.y )} ) );
const line2EndProperty = new Vector2Property( new Vector2( ${Utils.roundSymmetric( line2EndProperty.value.x )}, ${Utils.roundSymmetric( line2EndProperty.value.y )} ) );
const line3EndProperty = new Vector2Property( new Vector2( ${Utils.roundSymmetric( line3EndProperty.value.x )}, ${Utils.roundSymmetric( line3EndProperty.value.y )} ) );
// END_DATA
`;
        console.log( str );
      }
    } );

    // Solid blue shape at the bottom
    this.addChild( new Path( shapeProperty, {
      fill: membraneChannelsColors.insideCellColorProperty,
      stroke: null
    } ) );

    // Orange outer heads
    this.addChild( new Path( shapeProperty, {
      lineWidth: 13,
      stroke: 'rgb(220,120,39)' // outer heads TODO: Move to color file
    } ) );

    // Pink inner tails
    this.addChild( new Path( shapeProperty, {
      lineWidth: 4,
      stroke: 'rgb(234,144,255)' // inner tails TODO: Move to color file
    } ) );

    if ( phet.chipper.queryParameters.dev ) {

      const addControl = ( pointProperty: Vector2Property ) => {
        const pointNode = new Circle( 25, { fill: 'black', opacity: 0.5 } );
        pointProperty.link( pt => { pointNode.center = pt; } );
        pointNode.addInputListener( new DragListener( {
          positionProperty: pointProperty,
          tandem: Tandem.OPT_OUT
        } ) );

        this.addChild( pointNode );
      };

      addControl( point1Property );
      addControl( point2Property );
      addControl( cubic1Control1Property );
      addControl( cubic1Control2Property );
      addControl( cubic1EndProperty );
      addControl( cubic2Control1Property );
      addControl( cubic2Control2Property );
      addControl( cubic2EndProperty );
      addControl( line1EndProperty );
      addControl( line2EndProperty );
      addControl( line3EndProperty );
    }
  }
}

membraneChannels.register( 'MacroCellNode', MacroCellNode );