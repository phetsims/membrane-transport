// Copyright 2025, University of Colorado Boulder

/**
 * The canvas renderer for background content in the observation window. This is for rendering
 * many particles that are not interactive.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import CanvasNode from '../../../../scenery/js/nodes/CanvasNode.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import MembraneChannelsColors from '../../common/MembraneChannelsColors.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import { getFeatureSetSoluteTypes } from '../MembraneChannelsFeatureSet.js';
import { animateLipidsProperty } from '../MembraneChannelsPreferences.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import SoluteType from '../model/SoluteType.js';
import getParticleNode from './particles/getParticleNode.js';
import Phospholipid from './Phospholipid.js';

export default class ObservationWindowCanvasNode extends CanvasNode {

  private readonly soluteTypeToImageMap = new Map<SoluteType, HTMLImageElement | HTMLCanvasElement>();
  private readonly phospholipids: Phospholipid[] = [];

  public constructor( private readonly model: MembraneChannelsModel, private readonly modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2,
                      // TODO: We haven't decided on the layering for this sim, so keep the code in this file until we know if performance considerations dictate a certain strategy
                      private readonly layer: 'back' | 'front' ) {
    super( {
      canvasBounds: canvasBounds
    } );

    getFeatureSetSoluteTypes( model.featureSet ).forEach( soluteType => {
      this.soluteTypeToImageMap.set( soluteType, this.createImage( soluteType ) );
    } );

    // Compute the exact number of phospholipids needed to fill the screen
    const A = Phospholipid.headRadius * 2;
    const left = -MembraneChannelsConstants.MODEL_WIDTH / 2 / A;
    const right = MembraneChannelsConstants.MODEL_WIDTH / 2 / A;
    const iMin = Number.isInteger( left ) ? left - 1 : Math.floor( left );
    const iMax = Number.isInteger( right ) ? right + 1 : Math.ceil( right );

    const phospholipids: Phospholipid[] = [];
    for ( let i = iMin; i <= iMax; i++ ) {
      const anchorX = i * A;
      phospholipids.push( new Phospholipid( 'inner', anchorX, modelViewTransform ) );
      phospholipids.push( new Phospholipid( 'outer', anchorX, modelViewTransform ) );
    }

    // Randomize z-ordering
    this.phospholipids = dotRandom.shuffle( phospholipids );
  }

  private createImage( soluteType: SoluteType ): HTMLImageElement | HTMLCanvasElement {
    const iconNode = getParticleNode( soluteType );
    return rasterizeNode( iconNode, { wrap: false, resolution: 4 } ).image;
  }

  // Convenience functions to move and line in model coordinates
  private moveTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.moveTo( this.modelViewTransform.modelToViewX( x ), this.modelViewTransform.modelToViewY( y ) );
  }

  private lineTo( context: CanvasRenderingContext2D, x: number, y: number ): void {
    context.lineTo( this.modelViewTransform.modelToViewX( x ), this.modelViewTransform.modelToViewY( y ) );
  }

  private strokeRect( context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number ): void {
    context.strokeRect( this.modelViewTransform.modelToViewX( x ), this.modelViewTransform.modelToViewY( y ), this.modelViewTransform.modelToViewDeltaX( width ), this.modelViewTransform.modelToViewDeltaY( height ) );
  }

  public step( dt: number ): void {

    if ( this.model.isPlayingProperty.value && animateLipidsProperty.value && this.layer === 'back' ) {

      // Update the phospholipids
      for ( let i = 0; i < this.phospholipids.length; i++ ) {
        this.phospholipids[ i ].step( dt );
      }
    }
    this.invalidatePaint();
  }

  private drawSolutes( context: CanvasRenderingContext2D ): void {

    // Draw the particles as images
    for ( const solute of this.model.solutes ) {

      // Apply opacity
      if ( solute.opacity !== 1 ) {
        context.globalAlpha = solute.opacity;
      }

      // draw image scaled by a factor of 4 in each dimension
      const image = this.soluteTypeToImageMap.get( solute.type )!;
      const x = this.modelViewTransform.modelToViewX( solute.position.x );
      const y = this.modelViewTransform.modelToViewY( solute.position.y );

      // A scale from model to view coordinates.
      const scale = this.modelViewTransform.modelToViewDeltaX( solute.dimension.width ) / image.width;

      const width = image.width * scale;
      const height = image.height * scale;

      // Draw the image centered at the position.
      context.drawImage( image, x - width / 2, y - height / 2, width, height );

      // Reset globalAlpha to prevent affecting other drawings
      if ( solute.opacity !== 1 ) {
        context.globalAlpha = 1.0;
      }

      if ( phet.chipper.queryParameters.dev ) {

        // Draw the solute's bounding box
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        this.strokeRect(
          context,
          ( solute.position.x - solute.dimension.width / 2 ),
          ( solute.position.y - solute.dimension.height / 2 ),
          ( solute.dimension.width ),
          ( solute.dimension.height )
        );
      }
    }
  }


  private drawCharges( context: CanvasRenderingContext2D ): void {
    const potentialString = this.model.membraneVoltagePotentialProperty.value;
    const potentialNumber = potentialString === '-70' ? -70 :
                            potentialString === '-50' ? -50 :
                            30;

    const numberOfCharges = Utils.roundSymmetric( 18 * Math.abs( potentialNumber ) / 70 );
    const margin = 5;
    const separation = ( MembraneChannelsConstants.MEMBRANE_BOUNDS.width - margin * 2 ) / ( numberOfCharges - 1 );

    for ( let i = 0; i < numberOfCharges; i++ ) {
      this.drawSign( context, potentialNumber < 0 ? '+' : '-', new Vector2( margin + i * separation + MembraneChannelsConstants.MEMBRANE_BOUNDS.minX, 15 ) );
    }
    for ( let i = 0; i < numberOfCharges; i++ ) {
      this.drawSign( context, potentialNumber < 0 ? '-' : '+', new Vector2( margin + i * separation + MembraneChannelsConstants.MEMBRANE_BOUNDS.minX, -15 ) );
    }
  }

  /**
   * Draw a + or - to show the charges
   * @param context
   * @param sign - '+' or '-'
   * @param point - in model coordinates
   */
  private drawSign( context: CanvasRenderingContext2D, sign: '+' | '-', point: Vector2 ): void {
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    const radius = 2;
    context.beginPath();
    if ( sign === '+' ) {
      this.moveTo( context, point.x, point.y - radius );
      this.lineTo( context, point.x, point.y + radius );
    }
    this.moveTo( context, point.x - radius, point.y );
    this.lineTo( context, point.x + radius, point.y );
    context.stroke();
  }

  public static drawRoundedRectangle( context: CanvasRenderingContext2D, modelViewTransform: ModelViewTransform2, x: number, y: number, width: number, height: number, radius: number ): void {
    const xView = modelViewTransform.modelToViewX( x );
    const yView = modelViewTransform.modelToViewY( y );
    const widthView = modelViewTransform.modelToViewDeltaX( width );
    const heightView = modelViewTransform.modelToViewDeltaY( height );
    const radiusView = modelViewTransform.modelToViewDeltaX( radius );

    context.beginPath();
    context.moveTo( xView + radiusView, yView - heightView / 2 );
    context.arcTo( xView + widthView, yView - heightView / 2, xView + widthView, yView + heightView / 2, radiusView );
    context.arcTo( xView + widthView, yView + heightView / 2, xView, yView + heightView / 2, radiusView );
    context.arcTo( xView, yView + heightView / 2, xView, yView - heightView / 2, radiusView );
    context.arcTo( xView, yView - heightView / 2, xView + widthView, yView - heightView / 2, radiusView );
  }

  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    if ( this.layer === 'back' ) {
      // Draw the background: upper half for outside cell, lower half for inside cell.
      context.fillStyle = MembraneChannelsColors.outsideCellColorProperty.value.toCSS();
      context.fillRect( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT / 2 );
      context.fillStyle = MembraneChannelsColors.insideCellColorProperty.value.toCSS();
      context.fillRect( 0, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT / 2, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT / 2 );

      if ( this.model.isShowingMembranePotentialLabelsProperty.value ) {
        this.drawCharges( context );
      }

      Phospholipid.initTails( context );
      for ( let i = 0; i < this.phospholipids.length; i++ ) {
        this.phospholipids[ i ].drawTails( context );
      }

      Phospholipid.initHeads( context );
      for ( let i = 0; i < this.phospholipids.length; i++ ) {
        this.phospholipids[ i ].drawHead( context );
      }
    }

    if ( this.layer === 'front' ) {


      this.drawSolutes( context );

      // --- Debugging code to check transforms and bounds ---
      if ( phet.chipper.queryParameters.dev ) {
        this.drawCrosshairsAt( context, new Vector2( 0, 0 ) );
        this.drawCrosshairsAt( context, new Vector2( 0, 10 ) );

        context.strokeStyle = 'red';
        context.lineWidth = 5;

        const outsideBounds = MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS;
        this.strokeRect( context, outsideBounds.minX, outsideBounds.minY, outsideBounds.width, outsideBounds.height );

        const insideBounds = MembraneChannelsConstants.INSIDE_CELL_BOUNDS;
        this.strokeRect( context, insideBounds.minX, insideBounds.minY, insideBounds.width, insideBounds.height );
      }
    }
  }

  /**
   * For debugging, to see where model points are on the canvas.
   * @param context
   * @param point - in model coordinates
   */
  private drawCrosshairsAt( context: CanvasRenderingContext2D, point: Vector2 ): void {
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.beginPath();
    this.moveTo( context, point.x, point.y - 5 );
    this.lineTo( context, point.x, point.y + 5 );
    this.moveTo( context, point.x - 5, point.y );
    this.lineTo( context, point.x + 5, point.y );
    context.stroke();
  }
}
membraneChannels.register( 'ObservationWindowCanvasNode', ObservationWindowCanvasNode );