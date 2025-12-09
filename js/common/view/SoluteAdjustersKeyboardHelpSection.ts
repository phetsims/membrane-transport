// Copyright 2025, University of Colorado Boulder

/**
 * SoluteAdjustersKeyboardHelpSection describes the keyboard controls for adjusting solute amounts.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';

export default class SoluteAdjustersKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {
    const coarseAdjustmentRow = MembraneTransportConstants.createKeyboardHelpSectionRow( MembraneTransportHotkeyData.soluteControl.coarse );
    const fineAdjustmentRow = MembraneTransportConstants.createKeyboardHelpSectionRow( MembraneTransportHotkeyData.soluteControl.fine );
    super( MembraneTransportFluent.keyboardHelp.soluteAdjusters.titleStringProperty, [
      coarseAdjustmentRow,
      fineAdjustmentRow
    ] );
  }
}

membraneTransport.register( 'SoluteAdjustersKeyboardHelpSection', SoluteAdjustersKeyboardHelpSection );