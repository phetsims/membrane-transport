// Copyright 2025, University of Colorado Boulder

/**
 * The canvas renderer for background content in the observation window. This is for rendering many particles that are
 * not interactive. NOTE: For flexibility, the front layer and back layer are coded here. This makes it easy to
 * adjust layering during maintenance.
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
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import { animateLipidsProperty } from '../MembraneTransportPreferences.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import SoluteType from '../model/SoluteType.js';
import getParticleNode from './particles/getParticleNode.js';
import Phospholipid from './Phospholipid.js';

export default class ObservationWindowCanvasNode extends CanvasNode {

  private readonly soluteTypeToImageMap = new Map<SoluteType, HTMLImageElement | HTMLCanvasElement>();
  private readonly phospholipids: Phospholipid[] = [];

  public constructor(
    private readonly model: MembraneTransportModel,
    private readonly modelViewTransform: ModelViewTransform2,
    canvasBounds: Bounds2,
    private readonly layer: 'back' | 'front'
  ) {
    super( {
      canvasBounds: canvasBounds
    } );

    getFeatureSetSoluteTypes( model.featureSet ).forEach( soluteType => {
      this.soluteTypeToImageMap.set( soluteType, this.createImage( soluteType ) );
    } );

    // Compute the exact number of phospholipids needed to fill the screen
    const A = Phospholipid.headRadius * 2;
    const left = -MembraneTransportConstants.MODEL_WIDTH / 2 / A;
    const right = MembraneTransportConstants.MODEL_WIDTH / 2 / A;
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

      // Skip oxygen and carbon dioxide in the front layer, or skip everything else in the back layer
      const isGasParticle = solute.type === 'oxygen' || solute.type === 'carbonDioxide';
      if ( ( this.layer === 'front' && isGasParticle ) || ( this.layer === 'back' && !isGasParticle ) ) {
        continue;
      }

      // Apply opacity
      if ( solute.opacity !== 1 ) {
        context.globalAlpha = solute.opacity;
      }

      // draw image scaled by a factor of 4 in each dimension
      const image = this.soluteTypeToImageMap.get( solute.type )!;

      const x = this.modelViewTransform.modelToViewX( solute.position.x );
      const y = this.modelViewTransform.modelToViewY( solute.position.y );

      const width = this.modelViewTransform.modelToViewDeltaX( solute.dimension.width );
      const height = this.modelViewTransform.modelToViewDeltaY( solute.dimension.height );

      // Draw the image centered at the position.
      context.drawImage( image, x - width / 2, y - height / 2, width, height );

      // Reset globalAlpha to prevent affecting other drawings
      if ( solute.opacity !== 1 ) {
        context.globalAlpha = 1.0;
      }

      if ( phet.chipper.queryParameters.dev ) {

        // Draw the solute's bounding box
        context.strokeStyle = 'gray';
        context.lineWidth = 0.5;
        this.strokeRect(
          context,
          ( solute.position.x - solute.dimension.width / 2 ),
          ( solute.position.y - solute.dimension.height / 2 ),
          ( solute.dimension.width ),
          ( solute.dimension.height )
        );
      }
    }

    // when debugging also show the bounding boxes around the ligands
    if ( phet.chipper.queryParameters.dev ) {
      this.model.ligands.forEach( ligand => {
        context.strokeStyle = 'gray';
        context.lineWidth = 0.5;
        this.strokeRect(
          context,
          ( ligand.position.x - ligand.dimension.width / 2 ),
          ( ligand.position.y - ligand.dimension.height / 2 ),
          ( ligand.dimension.width ),
          ( ligand.dimension.height )
        );
      } );
    }
  }


  private drawCharges( context: CanvasRenderingContext2D ): void {
    const potentialNumber = this.model.membraneVoltagePotentialProperty.value;

    const numberOfCharges = Utils.roundSymmetric( 18 * Math.abs( potentialNumber ) / 70 );
    const margin = 5;
    const separation = ( MembraneTransportConstants.MEMBRANE_BOUNDS.width - margin * 2 ) / ( numberOfCharges - 1 );

    for ( let i = 0; i < numberOfCharges; i++ ) {
      this.drawSign( context, potentialNumber < 0 ? '+' : '-', new Vector2( margin + i * separation + MembraneTransportConstants.MEMBRANE_BOUNDS.minX, 17 ) );
    }
    for ( let i = 0; i < numberOfCharges; i++ ) {
      this.drawSign( context, potentialNumber < 0 ? '-' : '+', new Vector2( margin + i * separation + MembraneTransportConstants.MEMBRANE_BOUNDS.minX, -17 ) );
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

  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    if ( this.layer === 'back' ) {
      // Draw the background: upper half for outside cell, lower half for inside cell.
      context.fillStyle = MembraneTransportColors.observationWindowOutsideCellColorProperty.value.toCSS();
      context.fillRect( 0, 0, MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT / 2 );
      context.fillStyle = MembraneTransportColors.observationWindowInsideCellColorProperty.value.toCSS();
      context.fillRect( 0, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT / 2, MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT / 2 );

      if ( this.model.isShowingSignsProperty.value ) {
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

      // Draw oxygen and carbon dioxide in the back layer, but in front of the phospholipids.
      this.drawSolutes( context );
    }

    if ( this.layer === 'front' ) {

      // Draw all solutes except oxygen and carbon dioxide
      this.drawSolutes( context );

      // --- Debugging code to check transforms and bounds ---
      if ( phet.chipper.queryParameters.dev ) {
        this.drawCrosshairsAt( context, new Vector2( 0, 0 ) );
        this.drawCrosshairsAt( context, new Vector2( 0, 10 ) );

        context.strokeStyle = 'red';
        context.lineWidth = 5;

        const outsideBounds = MembraneTransportConstants.OUTSIDE_CELL_BOUNDS;
        this.strokeRect( context, outsideBounds.minX, outsideBounds.minY, outsideBounds.width, outsideBounds.height );

        const insideBounds = MembraneTransportConstants.INSIDE_CELL_BOUNDS;
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
membraneTransport.register( 'ObservationWindowCanvasNode', ObservationWindowCanvasNode );