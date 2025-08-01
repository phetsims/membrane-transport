// Copyright 2025, University of Colorado Boulder

/**
 * SoluteAdjustersKeyboardHelpSection describes the keyboard controls for adjusting solute amounts.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';

export default class SoluteAdjustersKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {

    const coarseAdjustmentRow = KeyboardHelpSectionRow.labelWithIcon(
      MembraneTransportFluent.keyboardHelp.soluteAdjusters.addOrRemoveALotStringProperty,
      KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon(),
      {
        labelInnerContent: MembraneTransportFluent.a11y.keyboardHelp.soluteAdjusters.addOrRemoveALotDescriptionStringProperty
      }
    );

    const fineAdjustmentRow = KeyboardHelpSectionRow.labelWithIcon(
      MembraneTransportFluent.keyboardHelp.soluteAdjusters.addOrRemoveALittleStringProperty,
      KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon() ),
      {
        labelInnerContent: MembraneTransportFluent.a11y.keyboardHelp.soluteAdjusters.addOrRemoveALittleDescriptionStringProperty
      }
    );

    super( MembraneTransportFluent.keyboardHelp.soluteAdjusters.titleStringProperty, [
      coarseAdjustmentRow,
      fineAdjustmentRow
    ] );
  }
}

membraneTransport.register( 'SoluteAdjustersKeyboardHelpSection', SoluteAdjustersKeyboardHelpSection );