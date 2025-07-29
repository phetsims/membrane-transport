// Copyright 2025, University of Colorado Boulder

/**
 * SoluteAdjustersKeyboardHelpSection describes the keyboard controls for adjusting solute amounts.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

export default class SoluteAdjustersKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const coarseAdjustmentRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.soluteControl.coarseIncrement, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.soluteAdjusters.addOrRemoveALotStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.soluteAdjusters.addOrRemoveALotDescriptionStringProperty
    } );

    const fineAdjustmentRow = KeyboardHelpSectionRow.fromHotkeyData( MembraneTransportHotkeyData.soluteControl.fineIncrement, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.soluteAdjusters.addOrRemoveALittleStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.soluteAdjusters.addOrRemoveALittleDescriptionStringProperty
    } );

    super( MembraneTransportFluent.keyboardHelp.soluteAdjusters.titleStringProperty, [
      coarseAdjustmentRow,
      fineAdjustmentRow
    ] );
  }
}

membraneTransport.register( 'SoluteAdjustersKeyboardHelpSection', SoluteAdjustersKeyboardHelpSection );