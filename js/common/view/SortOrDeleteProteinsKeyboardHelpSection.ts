// Copyright 2025, University of Colorado Boulder

/**
 * SortOrDeleteProteinsKeyboardHelpSection describes the keyboard controls for sorting and deleting
 * proteins in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

const LINE_WRAP_LABEL_OPTIONS = {
  lineWrap: MembraneTransportConstants.KEYBOARD_HELP_LABEL_LINE_WRAP
};

export default class SortOrDeleteProteinsKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const navigateProteinsRow = KeyboardHelpSectionRow.labelWithIcon(
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.navigateProteinsStringProperty,
      KeyboardHelpIconFactory.leftRightOrADKeysRowIcon(),
      {
        labelInnerContent: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.navigateProteinsDescriptionStringProperty
      }
    );

    const grabProteinRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.releaseProtein, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.grabProteinStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.grabProteinDescriptionStringProperty
    } );

    const moveGrabbedProteinRow = KeyboardHelpSectionRow.labelWithIcon(
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinStringProperty,
      KeyboardHelpIconFactory.leftRightOrADKeysRowIcon(),
      {
        labelInnerContent: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinDescriptionStringProperty,
        labelOptions: LINE_WRAP_LABEL_OPTIONS
      }
    );

    const releaseProteinRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.releaseProtein, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.releaseProteinStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.sortOrDeleteProteins.releaseProteinDescriptionStringProperty,
      labelWithIconOptions: {
        labelOptions: LINE_WRAP_LABEL_OPTIONS
      }
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