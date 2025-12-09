// Copyright 2025, University of Colorado Boulder

/**
 * TransportProteinsAndLigandsKeyboardHelpSection describes the keyboard controls for interacting with
 * transport proteins and ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

export default class TransportProteinsAndLigandsKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const navigateRow = MembraneTransportConstants.createKeyboardHelpSectionRow( MembraneTransportHotkeyData.proteinsOrLigands.navigate );
    const grabOrReleaseRow = MembraneTransportConstants.createKeyboardHelpSectionRow( MembraneTransportHotkeyData.proteinsOrLigands.grabOrRelease );
    const moveGrabbedItemRow = MembraneTransportConstants.createKeyboardHelpSectionRow( MembraneTransportHotkeyData.proteinsOrLigands.move );
    const cancelGrabRow = MembraneTransportConstants.createKeyboardHelpSectionRow( MembraneTransportHotkeyData.proteinsOrLigands.cancel );

    super( MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.titleStringProperty, [
      navigateRow,
      grabOrReleaseRow,
      moveGrabbedItemRow,
      cancelGrabRow
    ], {
      textMaxWidth: 300
    } );
  }
}

membraneTransport.register( 'TransportProteinsAndLigandsKeyboardHelpSection', TransportProteinsAndLigandsKeyboardHelpSection );