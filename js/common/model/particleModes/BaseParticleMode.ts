// Copyright 2025, University of Colorado Boulder

/**
 * Base class for all particle modes in membrane transport.
 *
 * BaseParticleModes are generally immutable so as state changes, new instances are created.
 *
 * The following describes the order of modes that particles go through in the membrane transport simulation
 * for different scenarios.
 *
 * As particles move through a protein, they go through the modes in this order:
 *  - randomWalk
 *  - moveToCenterOfChannel
 *  - enteringTransportProtein
 *  - sheddingCagedWaterMolecules
 *  - movingThroughTransportProtein
 *  - randomWalk
 *
 * As particles cross the membrane from passive diffusion (oxygen and carbon dioxide):
 *  - randomWalk
 *  - passiveDiffusion
 *  - randomWalk
 *
 * As particles bind to the sodium glucose cotransporter or sodium potassium pump, they go through these modes:
 *  - randomWalk
 *  - moveToSodiumGlucoseCotransporter | moveToSodiumPotassiumPump
 *  - waitingInSodiumGlucoseCotransporter | waitingInSodiumPotassiumPump
 *  - movingThroughTransportProtein
 *  - randomWalk
 *
 * Ligand particles will go through these modes:
 *  - randomWalk | userControlled | userOver
 *  - moveToLigandBindingLocation
 *  - ligandBound
 *  - randomWalk
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../../phet-core/js/types/IntentionalAny.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportModel from '../MembraneTransportModel.js';
import Particle from '../Particle.js';

// These are redundant with the BaseParticleMode subclasses, but we do need this data to store for PhET-iO.
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

  public abstract toStateObject(): IntentionalAny;

  public abstract step( dt: number, particle: Particle, model: MembraneTransportModel ): void;

  public static fromStateObject( stateObject: IntentionalAny, ...args: IntentionalAny[] ): BaseParticleMode {
    throw new Error( 'fromStateObject must be implemented by subclasses' );
  }
}

membraneTransport.register( 'BaseParticleMode', BaseParticleMode );