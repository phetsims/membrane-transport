// Copyright 2025, University of Colorado Boulder

/**
 * SortOrDeleteProteinsKeyboardHelpSection describes the keyboard controls for sorting and deleting
 * proteins in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

export default class SortOrDeleteProteinsKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const navigateProteinsRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.selection, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.navigateProteinsStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.navigateProteinsDescriptionStringProperty
    } );

    const grabProteinRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.releaseProtein, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.grabProteinStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.grabProteinDescriptionStringProperty
    } );

    const moveGrabbedProteinRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.selection, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinDescriptionStringProperty
    } );

    const releaseProteinRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.releaseProtein, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.releaseProteinStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.releaseProteinDescriptionStringProperty
    } );

    const deleteProteinRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.deleteProtein, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.deleteProteinStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.deleteProteinDescriptionStringProperty
    } );

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