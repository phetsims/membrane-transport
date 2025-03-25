// Copyright 2025, University of Colorado Boulder

/**
 * Utility functions that help exercise the MembraneTransportModel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from './MembraneTransportModel.js';

export default class MembraneTransportModelTester {

  /**
   * A function for debugging the sodium ligand channel. Creates ligands and sodium particles and moves them toward a channel
   * to test functionality.
   */
  public static testLigandChannel( model: MembraneTransportModel, type: 'sodium' | 'potassium', withLigand: boolean, side: 'outside' | 'inside' ): void {

    // Put a sodium in the first slot
    model.slots[ 0 ].channelType = type === 'sodium' ? 'sodiumIonLigandGatedChannel' : 'potassiumIonLigandGatedChannel';

    model.areLigandsAddedProperty.value = true;

    // Create a ligand
    const ligandType = type === 'sodium' ? 'ligandA' : 'ligandB';
    const firstLigand = model.ligands.find( ligand => ligand.type === ligandType )!;

    // Create a sodium ion
    const soluteType = type === 'sodium' ? 'sodiumIon' : 'potassiumIon';
    model.addSolutes( soluteType, 'outside', 1 );
    const sodiumIon = model.solutes.find( solute => solute.type === soluteType )!;

    // Farther away from the slot so that the ligand can get there first.
    sodiumIon.position.set( new Vector2( -30, side === 'outside' ? 50 : -50 ) );
    firstLigand.position.set( new Vector2( -40, 50 ) ); // ligands are always outside

    sodiumIon.moveToPosition( new Vector2( model.slots[ 0 ].position, side === 'outside' ? MembraneTransportConstants.MEMBRANE_BOUNDS.maxY
                                                                                         : MembraneTransportConstants.MEMBRANE_BOUNDS.minY ) );
    if ( withLigand ) {
      firstLigand.moveToPosition( new Vector2( model.slots[ 0 ].position, MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ) );
    }
  }
}

membraneTransport.register( 'MembraneTransportModelTester', MembraneTransportModelTester );