// Copyright 2025, University of Colorado Boulder

/**
 * SortOrDeleteProteinsKeyboardHelpSection describes the keyboard controls for sorting and deleting
 * proteins in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

export default class SortOrDeleteProteinsKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const navigateProteinsRow = MembraneTransportConstants.createKeyboardHelpSectionRow(
      MembraneTransportHotkeyData.observationWindowTransportProteinLayer.navigateProteins
    );
    const grabProteinRow = MembraneTransportConstants.createKeyboardHelpSectionRow(
      MembraneTransportHotkeyData.observationWindowTransportProteinLayer.grabProtein
    );
    const moveGrabbedProteinRow = MembraneTransportConstants.createKeyboardHelpSectionRow(
      MembraneTransportHotkeyData.observationWindowTransportProteinLayer.moveProteins
    );
    const releaseProteinRow = MembraneTransportConstants.createKeyboardHelpSectionRow(
      MembraneTransportHotkeyData.observationWindowTransportProteinLayer.releaseProtein
    );
    const deleteProteinRow = MembraneTransportConstants.createKeyboardHelpSectionRow(
      MembraneTransportHotkeyData.observationWindowTransportProteinLayer.deleteProtein
    );

    super( MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.titleStringProperty, [
      navigateProteinsRow,
      grabProteinRow,
      moveGrabbedProteinRow,
      releaseProteinRow,
      deleteProteinRow
    ] );
  }
}

membraneTransport.register( 'SortOrDeleteProteinsKeyboardHelpSection', SortOrDeleteProteinsKeyboardHelpSection );