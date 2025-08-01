// Copyright 2025, University of Colorado Boulder

/**
 * TransportProteinsAndLigandsKeyboardHelpSection describes the keyboard controls for interacting with
 * transport proteins and ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

export default class TransportProteinsAndLigandsKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const navigateRow = KeyboardHelpSectionRow.labelWithIcon(
      MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.navigateStringProperty,
      TextKeyNode.tab(),
      {
        labelInnerContent: MembraneTransportFluent.a11y.keyboardHelp.transportProteinsAndLigands.navigateDescriptionStringProperty
      }
    );

    const grabOrReleaseRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.observationWindowTransportProteinLayer.grabProtein, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.grabOrReleaseStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.transportProteinsAndLigands.grabOrReleaseDescriptionStringProperty
    } );

    const moveGrabbedItemRow = KeyboardHelpSectionRow.labelWithIcon(
      MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.moveGrabbedItemStringProperty,
      KeyboardHelpIconFactory.leftRightOrADKeysRowIcon(),
      {
        labelInnerContent: MembraneTransportFluent.a11y.keyboardHelp.transportProteinsAndLigands.moveGrabbedItemDescriptionStringProperty,
        labelOptions: {
          lineWrap: MembraneTransportConstants.KEYBOARD_HELP_LABEL_LINE_WRAP
        }
      }
    );

    const cancelGrabRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.interactiveSlotsNode.cancelInteraction, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.cancelGrabStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.transportProteinsAndLigands.cancelGrabDescriptionStringProperty
    } );

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