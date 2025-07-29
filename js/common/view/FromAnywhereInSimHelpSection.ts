// Copyright 2025, University of Colorado Boulder

/**
 * FromAnywhereInSimHelpSection describes keyboard controls that can be used from anywhere in the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PlayControlButton from '../../../../scenery-phet/js/buttons/PlayControlButton.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';

export default class FromAnywhereInSimHelpSection extends KeyboardHelpSection {
  public constructor() {
    const playPauseRow = KeyboardHelpSectionRow.fromHotkeyData( PlayControlButton.TOGGLE_PLAY_HOTKEY_DATA, {
      labelStringProperty: MembraneTransportFluent.keyboardHelp.fromAnywhereInSim.pauseOrPlayStringProperty,
      pdomLabelStringProperty: MembraneTransportFluent.a11y.keyboardHelp.fromAnywhereInSim.pauseOrPlayDescriptionStringProperty
    } );

    super( MembraneTransportFluent.keyboardHelp.fromAnywhereInSim.titleStringProperty, [
      playPauseRow
    ] );
  }
}

membraneTransport.register( 'FromAnywhereInSimHelpSection', FromAnywhereInSimHelpSection );