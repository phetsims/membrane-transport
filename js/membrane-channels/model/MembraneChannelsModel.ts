// Copyright 2024-2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import TModel from '../../../../joist/js/TModel.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import Solute from './Solute.js';
import SoluteType, { SoluteTypes } from './SoluteType.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MembraneChannelsModel implements TModel {

  public readonly timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  public readonly isPlayingProperty: BooleanProperty;

  // TODO: group these together?
  // TODO: naming?
  // Mock proxies for testing the bar charts. Ultimately these values will be derived from the particle locations
  public readonly outsideSoluteCountProperties!: Record<SoluteType, NumberProperty>;
  public readonly insideSoluteCountProperties!: Record<SoluteType, NumberProperty>;
  public readonly selectedSoluteProperty: StringUnionProperty<SoluteType>;

  public readonly solutes: Solute[] = [];

  private readonly resetEmitter = new Emitter();

  public constructor( providedOptions: MembraneChannelsModelOptions ) {

    this.selectedSoluteProperty = new StringUnionProperty<SoluteType>( 'oxygen', {
      validValues: SoluteTypes,
      tandem: providedOptions.tandem.createTandem( 'selectedSoluteProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.selectedSoluteProperty.reset() );

    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL, {
      tandem: providedOptions.tandem.createTandem( 'timeSpeedProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.timeSpeedProperty.reset() );
    this.isPlayingProperty = new BooleanProperty( false, {
      tandem: providedOptions.tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );
    this.resetEmitter.addListener( () => this.isPlayingProperty.reset() );

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.outsideSoluteCountProperties = {};

    // TODO
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.insideSoluteCountProperties = {};
    SoluteTypes.forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
      this.insideSoluteCountProperties[ soluteType ] = new NumberProperty( 0 );
    } );

    // A random sample of solutes in the solutes array
    for ( let i = 0; i < 30; i++ ) {
      this.solutes.push( new Solute( new Vector2( dotRandom.nextDoubleBetween( -100, 100 ), dotRandom.nextDoubleBetween( -100, 100 ) ), dotRandom.sample( SoluteTypes ) ) );
    }
  }

  public addSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    const cellBounds = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS;
    for ( let i = 0; i < count; i++ ) {
      this.solutes.push( new Solute( dotRandom.nextPointInBounds( cellBounds ), soluteType ) );
    }
  }

  public removeSolutes( soluteType: SoluteType, location: 'inside' | 'outside', count: number ): void {
    const cellBounds = location === 'inside' ? MembraneChannelsConstants.INSIDE_CELL_BOUNDS : MembraneChannelsConstants.OUTSIDE_CELL_BOUNDS;

    // TODO: The design calls for removing the randomly (not the most recent ones)
    for ( let i = 0; i < count; i++ ) {
      const index = this.solutes.findIndex( solute => {
        return solute.type === soluteType && cellBounds.containsPoint( solute.position );
      } );
      if ( index !== -1 ) {
        this.solutes.splice( index, 1 );
      }
    }
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.resetEmitter.emit();
  }

  /**
   * Steps the simulation forward by dt seconds.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {

    /**
     * Helper function: Interpolate between two vectors and normalize the result.
     */
    function interpolateAndNormalize( start: Vector2, end: Vector2, alpha: number ): Vector2 {
      // LERP: newVector = (1-alpha)*start + alpha*end
      const x = ( 1 - alpha ) * start.x + alpha * end.x;
      const y = ( 1 - alpha ) * start.y + alpha * end.y;

      // Normalize to get a unit vector
      const length = Math.sqrt( x * x + y * y );
      if ( length === 0 ) {
        // fallback if both directions are zero or near-zero
        return new Vector2( 1, 0 );
      }
      return new Vector2( x / length, y / length );
    }

    /**
     * Helper function: gets the "current" interpolated direction based on how
     * far we’ve turned so far, so we can store or use it if we choose a new target.
     */
    function getInterpolatedDirection( solute: Solute ): Vector2 {
      const alpha = Utils.clamp( solute.turnElapsed / solute.turnDuration, 0, 1 );
      return interpolateAndNormalize( solute.currentDirection, solute.targetDirection, alpha );
    }

    if ( this.isPlayingProperty.value ) {
      const speed = dt * 3;

      // We'll use a base "random walk speed" for solutes
      const randomWalkSpeed = 10;

      this.solutes.forEach( solute => {
        if ( solute.mode === 'randomWalk' ) {
          // Simple random walk: changes direction every frame
          solute.position.x += ( dotRandom.nextDouble() - 0.5 ) * speed * randomWalkSpeed;
          solute.position.y += ( dotRandom.nextDouble() - 0.5 ) * speed * randomWalkSpeed;
        }
        else if ( solute.mode === 'delayedWalk' ) {
          // Delayed walk: direction updates only every few seconds, but changes *instantly*.
          solute.timeUntilNextDirection -= dt;
          if ( solute.timeUntilNextDirection <= 0 ) {
            // choose a brand new direction and reset the timer
            solute.currentDirection = Solute.createRandomUnitVector();
            solute.timeUntilNextDirection = dotRandom.nextDoubleBetween( 1, 4 );
          }
          // move in the chosen direction (assuming length=1) times speed
          solute.position.x += solute.currentDirection.x * speed * randomWalkSpeed;
          solute.position.y += solute.currentDirection.y * speed * randomWalkSpeed;
        }
        else if ( solute.mode === 'smoothDelayedWalk' ) {
          // =============================================================
          // SMOOTH (CURVED) DELAYED RANDOM WALK
          // =============================================================

          // 1) Decrement the time until we pick a NEW target direction
          solute.timeUntilNextDirection -= dt;

          // If it's time for a new direction, store the final "currentDirection"
          // (so we don't lose any partial turn) and pick a new random direction.
          if ( solute.timeUntilNextDirection <= 0 ) {

            // Set currentDirection to the "latest" direction from the end of the last turn
            // to avoid small rounding errors during interpolation.
            const lastDir = getInterpolatedDirection( solute );
            solute.currentDirection = lastDir; // store it

            // Choose a new target direction
            solute.targetDirection = Solute.createRandomUnitVector();

            // Decide how long it will take to turn to this new target
            solute.turnDuration = dotRandom.nextDoubleBetween( 0.5, 1.5 );
            solute.turnElapsed = 0;

            // Reset the time until next direction change (in 1–4 seconds again)
            solute.timeUntilNextDirection = dotRandom.nextDoubleBetween( 1, 4 );
          }

          // 2) Accumulate turn time
          solute.turnElapsed += dt;
          // We clamp in case we exceed the turn duration
          const alpha = Utils.clamp( solute.turnElapsed / solute.turnDuration, 0, 1 );

          // 3) Interpolate from currentDirection to targetDirection by alpha
          // Then normalize for a unit vector
          const direction = interpolateAndNormalize(
            solute.currentDirection,
            solute.targetDirection,
            alpha
          );

          const soluteBounds = solute.dimension.toBounds(
            solute.position.x - solute.dimension.width / 2,
            solute.position.y - solute.dimension.height / 2
          );

          const outsideOfCell = solute.position.y > 0;

          if ( MembraneChannelsConstants.MEMBRANE_BOUNDS.intersectsBounds( soluteBounds ) ) {
            if ( outsideOfCell ) {
              const overlap = MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY - soluteBounds.minY;

              // push the solute back out of the membrane
              solute.position.y += overlap;

              // Make it move up.
              direction.y = Math.abs( direction.y );

              // Also make the current and target direction go up (for smooth walking algorithms)
              solute.currentDirection.y = Math.abs( solute.currentDirection.y );
              solute.targetDirection.y = Math.abs( solute.targetDirection.y );
            }
            else {
              const overlap = soluteBounds.maxY - MembraneChannelsConstants.MEMBRANE_BOUNDS.minY;

              // push the solute back out of the membrane
              solute.position.y -= overlap;

              // Make it move down.
              direction.y = -Math.abs( direction.y );

              // Also make the current and target direction go down (for smooth walking algorithms)
              solute.currentDirection.y = -Math.abs( solute.currentDirection.y );
              solute.targetDirection.y = -Math.abs( solute.targetDirection.y );
            }
          }

          // 4) Move the solute along this direction
          solute.position.x += direction.x * speed * randomWalkSpeed;
          solute.position.y += direction.y * speed * randomWalkSpeed;
        }
        else if ( solute.mode === 'bound' ) {
          // Mode where solute doesn’t move, or does something special
        }
      } );
    }

    // Update the solute counts after the solutes have moved
    SoluteTypes.forEach( soluteType => {
      this.outsideSoluteCountProperties[ soluteType ].value = this.countSolutes( soluteType, 'outside' );
      this.insideSoluteCountProperties[ soluteType ].value = this.countSolutes( soluteType, 'inside' );
    } );
  }

  /**
   * Count the number of solutes inside or outside of the cell membrane.
   */
  public countSolutes( soluteType: SoluteType, location: 'inside' | 'outside' ): number {
    return this.solutes.filter( solute => {

      // Compare against the y value becase a solute is still considered 'inside' until it full passes through
      // the middle of the membrane.
      return solute.type === soluteType && ( location === 'inside' ? solute.position.y < 0 : solute.position.y > 0 );
    } ).length;
  }
}

membraneChannels.register( 'MembraneChannelsModel', MembraneChannelsModel );