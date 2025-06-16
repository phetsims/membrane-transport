// Copyright 2025, University of Colorado Boulder

/**
 * Base class for all particle modes in membrane transport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';

type ParticleModeType = 'randomWalk' |
  'ligandBound' |
  'moveToCenterOfChannel' |
  'moveToSodiumGlucoseCotransporter' |
  'moveToSodiumPotassiumPump' |
  'waitingInSodiumGlucoseCotransporter' |
  'waitingInSodiumPotassiumPump' |
  'moveToLigandBindingLocation' |
  'enteringTransportProtein' |
  'sheddingCagedWaterMolecules' |
  'passiveDiffusion' |
  'movingThroughTransportProtein' |
  'userControlled' |
  'userOver';

export type { ParticleModeType };

export default abstract class BaseParticleMode {
  protected constructor( public readonly type: ParticleModeType ) {}

  protected baseToStateObject(): IntentionalAny {
    return {
      type: this.type
    };
  }

  public abstract toStateObject(): IntentionalAny;

  public static fromStateObject( stateObject: IntentionalAny, ...args: IntentionalAny[] ): BaseParticleMode {
    throw new Error( 'fromStateObject must be implemented by subclasses' );
  }
}

membraneTransport.register( 'BaseParticleMode', BaseParticleMode );