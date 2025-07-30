// Copyright 2025, University of Colorado Boulder

/**
 * The model for a ligand, which can bind to the ligand gated channels to open them.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportModel from './MembraneTransportModel.js';
import Particle from './Particle.js';
import LigandBoundMode from './particleModes/LigandBoundMode.js';
import { LigandType } from './SoluteType.js';

export default class Ligand extends Particle {

  // True when the ligand is manually bound to the channel because the user placed it there.
  public manuallyBound = false;

  // Indicates whether the ligand has keyboard focus -- this causes a different random walk behavior.
  public focused = false;

  public constructor(
    position: Vector2,
    public readonly ligandType: LigandType,
    model: MembraneTransportModel
  ) {
    super( position, ligandType, model );

    // When ligands are removed from the model, make sure that they are unbound from any channel.
    model.areLigandsAddedProperty.lazyLink( areLigandsAdded => {
      if ( !areLigandsAdded ) {
        this.unbindFromChannel();
      }
    } );
  }

  /**
   * Unbinds the ligand from the channel, if it is bound.
   */
  public unbindFromChannel(): void {
    if ( this.mode instanceof LigandBoundMode ) {
      this.mode.ligandGatedChannel.unbindLigand( false );
    }
  }
}

membraneTransport.register( 'Ligand', Ligand );