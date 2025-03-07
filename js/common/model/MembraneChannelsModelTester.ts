// Copyright 2025, University of Colorado Boulder

/**
 * Utility functions that help exercise the MembraneChannelsModel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsConstants from '../MembraneChannelsConstants.js';
import MembraneChannelsModel from './MembraneChannelsModel.js';

export default class MembraneChannelsModelTester {

  public constructor( private readonly model: MembraneChannelsModel ) {

  }

  /**
   * A function for debugging the sodium ligand channel. Creates ligands and sodium particles and moves them toward a channel
   * to test functionality.
   */
  public testSodiumLigandChannel(): void {

    // Put a sodium in the first slot
    this.model.slots[ 0 ].channelType = 'sodiumIonLigandGatedChannel';

    this.model.areLigandsAddedProperty.value = true;

    const slotPosition = new Vector2( this.model.slots[ 0 ].position, MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY );

    // Create a ligand
    const firstLigandA = this.model.ligands.find( ligand => ligand.type === 'ligandA' )!;

    // Create a sodium ion
    this.model.addSolutes( 'sodiumIon', 'outside', 1 );
    const sodiumIon = this.model.solutes.find( solute => solute.type === 'sodiumIon' )!;

    // Farther away from the slot so that the ligand can get there first.
    sodiumIon.position.set( new Vector2( 50, 50 ) );
    firstLigandA.position.set( new Vector2( 0, 50 ) );

    sodiumIon.moveToPosition( slotPosition );
    firstLigandA.moveToPosition( slotPosition );
  }
}

membraneChannels.register( 'MembraneChannelsModelTester', MembraneChannelsModelTester );