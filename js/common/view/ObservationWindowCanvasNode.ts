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
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import CanvasNode from '../../../../scenery/js/nodes/CanvasNode.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import MembraneTransportColors from '../../common/MembraneTransportColors.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import Particle from '../model/Particle.js';
import MoveToTargetMode from '../model/particleModes/MoveToTargetMode.js';
import WaitingInSodiumPotassiumPumpMode from '../model/particleModes/WaitingInSodiumPotassiumPumpMode.js';
import SoluteType from '../model/SoluteType.js';
import createParticleNode from './particles/createParticleNode.js';
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
    const iconNode = createParticleNode( soluteType );
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

    if ( this.model.isPlayingProperty.value && MembraneTransportPreferences.instance.animateLipidsProperty.value && this.layer === 'back' ) {

      // Update the phospholipids
      for ( let i = 0; i < this.phospholipids.length; i++ ) {
        this.phospholipids[ i ].step( dt );
      }
    }
    this.invalidatePaint();
  }

  private drawSolutes( context: CanvasRenderingContext2D ): void {

    // -------- 1. Decide which solutes belong in this pass
    const backLayerTypes = [ 'oxygen', 'carbonDioxide' ];
    const visibleSolutes = this.model.solutes.filter( solute => {
      const isBack = backLayerTypes.includes( solute.type );
      return ( this.layer === 'back' && isBack ) ||
             ( this.layer === 'front' && !isBack );
    } );

    // -------- 2. For the front pass, draw phosphates first
    if ( this.layer === 'front' ) {
      const zIndex = ( s: Particle ) => s.type === 'phosphate' ? 0 : 1; // 0 → farthest back
      visibleSolutes.sort( ( a, b ) => zIndex( a ) - zIndex( b ) );
    }

    // Draw the particles as images
    for ( const solute of visibleSolutes ) {

      // Apply opacity
      if ( solute.opacity !== 1 ) {
        context.globalAlpha = solute.opacity;
      }

      // draw image scaled by a factor of 4 in each dimension
      const image = this.soluteTypeToImageMap.get( solute.soluteType );
      affirm( image, 'image should exist' );

      const x = this.modelViewTransform.modelToViewX( solute.position.x );
      const y = this.modelViewTransform.modelToViewY( solute.position.y );

      const width = this.modelViewTransform.modelToViewDeltaX( solute.dimension.width );
      const height = this.modelViewTransform.modelToViewDeltaY( solute.dimension.height );

      if ( this.model.crossingHighlightsEnabledProperty.value ) {
        if ( solute.timeSinceCrossedMembrane > 0 && solute.timeSinceCrossedMembrane < 0.2 ) {

          // draw a highlight
          context.fillStyle = MembraneTransportColors.crossingHighlightColorProperty.value.toCSS();
          context.globalAlpha = 0.5;
          context.beginPath();
          context.arc( x, y, width / 2 * 1.2, 0, Math.PI * 2 );
          context.fill();
          context.globalAlpha = 1.0;
        }
      }

      // Potassium rotates 20 degrees when it is in the sodium potassium pump, and the pump is open to the outside.
      const rotate = solute.type === 'phosphate' && solute.mode instanceof WaitingInSodiumPotassiumPumpMode &&
                     ( solute.mode.sodiumPotassiumPump.stateProperty.value === 'openToOutsideAwaitingPotassium' ||
                       solute.mode.sodiumPotassiumPump.stateProperty.value === 'openToOutsidePotassiumBound' );

      // Draw the image centered at the position.
      if ( rotate ) {
        context.save();

        context.translate( x, y );
        context.rotate( 20 * Math.PI / 180 ); // Rotate 20 degrees (convert to radians)
        context.drawImage( image, -width / 2, -height / 2, width, height ); // Draw image at origin (since we've translated to center)

        context.restore();
      }
      else {
        context.drawImage( image, x - width / 2, y - height / 2, width, height );
      }

      // Reset globalAlpha to prevent affecting other drawings
      if ( solute.opacity !== 1 ) {
        context.globalAlpha = 1.0;
      }
    }

    if ( phet.chipper.queryParameters.dev ) {

      // when debugging also show the bounding boxes around the ligands
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

      // and draw a grid for measurements, every 10 model units in x and y
      context.strokeStyle = 'lightgray';
      context.lineWidth = 0.5;

      for ( let i = 0; i < 20; i++ ) {
        for ( let j = 0; j < 20; j++ ) {
          this.drawCrosshairsAt( context, new Vector2( i * 10, j * 10 ) );
        }
      }

      context.stroke();

      // Draw MoveToTargetMode waypoints for debugging
      this.drawMoveToTargetWaypoints( context );
    }
  }

  /**
   * Draw waypoints for particles in MoveToTargetMode for debugging visualization
   */
  private drawMoveToTargetWaypoints( context: CanvasRenderingContext2D ): void {
    this.model.solutes.forEach( solute => {
      if ( solute.mode instanceof MoveToTargetMode ) {
        const mode = solute.mode;
        
        // Draw start position in red
        if ( mode.startPosition ) {
          this.drawWaypoint( context, mode.startPosition, 'red', 3 );
        }
        
        // Draw checkpoints with different colors/sizes
        if ( mode.checkpoints && mode.checkpoints.length > 0 ) {
          // First checkpoint in green
          if ( mode.checkpoints[ 0 ] ) {
            this.drawWaypoint( context, mode.checkpoints[ 0 ], 'green', 3 );
          }
          // Second checkpoint in orange
          if ( mode.checkpoints[ 1 ] ) {
            this.drawWaypoint( context, mode.checkpoints[ 1 ], 'orange', 3 );
          }
          // Third checkpoint in purple (just outside protein mouth)
          if ( mode.checkpoints[ 2 ] ) {
            this.drawWaypoint( context, mode.checkpoints[ 2 ], 'purple', 4 );
          }
        }
        
        // Draw target position in blue
        if ( mode.targetPosition ) {
          this.drawWaypoint( context, mode.targetPosition, 'blue', 3 );
        }
        
        // Draw a line from particle current position to what it's currently targeting
        if ( mode.startPosition && mode.checkpoints && mode.targetPosition ) {
          // Get the current target from the mode
          const currentTarget = mode.currentTargetPublic;
          
          // Draw thick yellow line from particle to its current target
          this.drawWaypointLine( context, solute.position, currentTarget, 'rgba(255, 255, 0, 0.8)' );
          
          // Draw connecting lines for the planned path
          // From start to first checkpoint
          if ( mode.checkpoints[ 0 ] ) {
            this.drawWaypointLine( context, mode.startPosition, mode.checkpoints[ 0 ], 'rgba(255, 0, 0, 0.3)' );
          }
          // Between checkpoints
          for ( let i = 0; i < mode.checkpoints.length - 1; i++ ) {
            if ( mode.checkpoints[ i ] && mode.checkpoints[ i + 1 ] ) {
              this.drawWaypointLine( context, mode.checkpoints[ i ], mode.checkpoints[ i + 1 ], 'rgba(128, 0, 255, 0.3)' );
            }
          }
          // From last checkpoint to target
          if ( mode.checkpoints.length > 0 && mode.checkpoints[ mode.checkpoints.length - 1 ] ) {
            this.drawWaypointLine( context, mode.checkpoints[ mode.checkpoints.length - 1 ], mode.targetPosition, 'rgba(0, 0, 255, 0.3)' );
          }
        }
      }
    } );
  }

  /**
   * Draw a single waypoint marker
   */
  private drawWaypoint( context: CanvasRenderingContext2D, position: Vector2, color: string, radius: number ): void {
    const viewX = this.modelViewTransform.modelToViewX( position.x );
    const viewY = this.modelViewTransform.modelToViewY( position.y );
    
    context.fillStyle = color;
    context.beginPath();
    context.arc( viewX, viewY, radius, 0, 2 * Math.PI );
    context.fill();
  }

  /**
   * Draw a line between two waypoints
   */
  private drawWaypointLine( context: CanvasRenderingContext2D, start: Vector2, end: Vector2, color: string ): void {
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    this.moveTo( context, start.x, start.y );
    this.lineTo( context, end.x, end.y );
    context.stroke();
  }


  private drawCharges( context: CanvasRenderingContext2D ): void {
    const potentialNumber = this.model.membranePotentialProperty.value;

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
      // Create a vertical gradient from top to bottom
      const gradient = context.createLinearGradient(
        0, 0, 0, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT
      );

      gradient.addColorStop( 0, MembraneTransportColors.observationWindowOutsideCellColorProperty.value.toCSS() );
      gradient.addColorStop( 0.49, MembraneTransportColors.observationWindowOutsideCellColorProperty.value.toCSS() );
      gradient.addColorStop( 0.51, MembraneTransportColors.observationWindowInsideCellColorProperty.value.toCSS() );
      gradient.addColorStop( 1, MembraneTransportColors.observationWindowInsideCellColorProperty.value.toCSS() );

      // Apply the gradient as fill style and fill the rectangle
      context.fillStyle = gradient;
      context.fillRect(
        0, 0,
        MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH,
        MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT
      );

      if ( this.model.chargesVisibleProperty.value ) {
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