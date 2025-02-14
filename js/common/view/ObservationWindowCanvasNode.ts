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
import Phospholipid from './Phospholipid.js';
import { getInterpolatedPathSodiumVoltageGatedChannelBounds, getInterpolatedPathSodiumVoltageGatedChannelNode } from './SodiumVoltageGatedChannelNode.js';
import getParticleNode from './solutes/getParticleNode.js';

export default class ObservationWindowCanvasNode extends CanvasNode {

  private readonly soluteTypeToImageMap = new Map<SoluteType, HTMLImageElement | HTMLCanvasElement>();
  private readonly phospholipids: Phospholipid[] = [];

  public constructor( private readonly model: MembraneChannelsModel, private readonly modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2 ) {
    super( {
      canvasBounds: canvasBounds
    } );

    getFeatureSetSoluteTypes( model.featureSet ).forEach( soluteType => {
      this.soluteTypeToImageMap.set( soluteType, this.createImage( soluteType ) );
    } );

    const phospholipids: Phospholipid[] = [];
    // TODO: Make sure not too many tails, you can see they go out of bounds if you remove the clip area
    for ( let i = -40; i <= 40; i++ ) {

      const anchorX = i * Phospholipid.headRadius * 2;
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

    if ( this.model.isPlayingProperty.value && animateLipidsProperty.value ) {

      // Update the phospholipids
      for ( let i = 0; i < this.phospholipids.length; i++ ) {
        this.phospholipids[ i ].step( dt );
      }
    }
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

  // Static so it can be reused to create a scenery node for the toolbox
  public static drawLeakageChannel( context: CanvasRenderingContext2D,
                                    type: 'sodiumIonLeakageChannel' | 'potassiumIonLeakageChannel', modelViewTransform: ModelViewTransform2, x: number ): void {

    const modelWidth = 20;
    const modelHeight = 25;

    // For the leakage channels, the sodium pore should be smaller than the potassium pore
    const poreSize = type === 'sodiumIonLeakageChannel' ? 4 : 6;

    // add a rounded rectangle
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.fillStyle = 'rgb(191,191,191)';
    ObservationWindowCanvasNode.drawRoundedRectangle( context, modelViewTransform, x - modelWidth / 2, 0, 20, modelHeight, 2 );
    context.fill();
    context.stroke();

    const semiWidth = 10 - poreSize / 2;

    ObservationWindowCanvasNode.drawRoundedRectangle( context, modelViewTransform, x - modelWidth / 2, 0, semiWidth, modelHeight, 2 );
    context.fillStyle = 'rgb(254,254,254)';
    context.fill();
    context.stroke();

    ObservationWindowCanvasNode.drawRoundedRectangle( context, modelViewTransform, x + modelWidth / 2 - semiWidth, 0, semiWidth, modelHeight, 2 );
    context.fillStyle = 'rgb(254,254,254)';
    context.fill();
    context.stroke();
  }

  private drawMembraneChannels( context: CanvasRenderingContext2D ): void {
    Array.from( this.model.getTargetKeys() ).forEach( targetKey => {
      const target = this.model.getTarget( targetKey );
      if ( target === 'sodiumIonLeakageChannel' || target === 'potassiumIonLeakageChannel' ) {
        ObservationWindowCanvasNode.drawLeakageChannel( context, target, this.modelViewTransform, MembraneChannelsModel.getPositionForTargetKey( targetKey ) );
      }
      else if ( target === 'sodiumIonVoltageGatedChannel' ) {
        // TODO: Bounds and fix positioning, use the modelViewTransform, draw more parts of the shape

        const t = Math.sin( Date.now() / 1000 * 3 ) * 0.5 + 0.5;

        // TODO: Check performance on iPad and chromebook
        const m = getInterpolatedPathSodiumVoltageGatedChannelNode( t );

        const myBounds = getInterpolatedPathSodiumVoltageGatedChannelBounds();

        context.save();

        context.translate( this.modelViewTransform.modelToViewX( MembraneChannelsModel.getPositionForTargetKey( targetKey ) ), this.modelViewTransform.modelToViewY( 0 ) );
        context.scale( 5, 5 );
        context.translate( -myBounds.width / 2 - 5, -myBounds.height / 2 - 2 ); // TODO: What's up with these offsets?

        context.lineWidth = 0.7;
        context.strokeStyle = 'black';
        context.fillStyle = 'white';

        for ( let i = 0; i < m.length; i++ ) {
          const path = new Path2D( m[ i ] );

          if ( i === 4 ) {
            context.lineWidth = 0.5;
          }
          context.stroke( path );
          if ( i !== 4 ) {
            context.fill( path );
          }

          if ( i === 4 ) {
            context.lineWidth = 1;
          }
        }

        context.restore();
      }
    } );
  }

  public override paintCanvas( context: CanvasRenderingContext2D ): void {

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

    this.drawMembraneChannels( context );

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