// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in MembraneTransport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../axon/js/TReadOnlyProperty.js';
import HotkeyData from '../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../scenery/js/input/KeyDescriptor.js';
import membraneTransport from '../membraneTransport.js';
import MembraneTransportFluent from '../MembraneTransportFluent.js';

function createHotkeyData( keys: OneKeyStroke[], labelStringProperty: TReadOnlyProperty<string> ): HotkeyData {
  return new HotkeyData( {
    keys: keys,
    repoName: membraneTransport.name,
    keyboardHelpDialogLabelStringProperty: labelStringProperty
  } );
}

export default class MembraneTransportHotkeyData {
  public static readonly SELECT_LEFT: OneKeyStroke[] = [ 'arrowLeft', 'a' ];
  public static readonly SELECT_RIGHT: OneKeyStroke[] = [ 'arrowRight', 'd' ];

  // Keys used for interacting with the solute control. For the keyboard help HotkeyData,
  // only left and right keys are shown. The listener will also respond to up and down keys.
  // The keys are pulled out and then recombined into the various arrays for clarity and usage.
  private static readonly COARSE_INCREMENT_LEFT: OneKeyStroke[] = [ 'arrowLeft', 'a' ];
  private static readonly COARSE_INCREMENT_RIGHT: OneKeyStroke[] = [ 'arrowRight', 'd' ];
  private static readonly COARSE_INCREMENT_UP: OneKeyStroke[] = [ 'arrowUp', 'w' ];
  private static readonly COARSE_INCREMENT_DOWN: OneKeyStroke[] = [ 'arrowDown', 's' ];

  private static readonly FINE_INCREMENT_LEFT: OneKeyStroke[] = [ 'shift+arrowLeft', 'shift+a' ];
  private static readonly FINE_INCREMENT_RIGHT: OneKeyStroke[] = [ 'shift+arrowRight', 'shift+d' ];
  private static readonly FINE_INCREMENT_UP: OneKeyStroke[] = [ 'shift+arrowUp', 'shift+w' ];
  private static readonly FINE_INCREMENT_DOWN: OneKeyStroke[] = [ 'shift+arrowDown', 'shift+s' ];

  public static readonly COARSE_INCREMENT_KEYS: OneKeyStroke[] = [
    ...MembraneTransportHotkeyData.COARSE_INCREMENT_RIGHT,
    ...MembraneTransportHotkeyData.COARSE_INCREMENT_UP
  ];
  public static readonly COARSE_DECREMENT_KEYS: OneKeyStroke[] = [
    ...MembraneTransportHotkeyData.COARSE_INCREMENT_LEFT,
    ...MembraneTransportHotkeyData.COARSE_INCREMENT_DOWN
  ];

  public static readonly FINE_INCREMENT_KEYS: OneKeyStroke[] = [
    ...MembraneTransportHotkeyData.FINE_INCREMENT_RIGHT,
    ...MembraneTransportHotkeyData.FINE_INCREMENT_UP
  ];

  public static readonly FINE_DECREMENT_KEYS: OneKeyStroke[] = [
    ...MembraneTransportHotkeyData.FINE_INCREMENT_LEFT,
    ...MembraneTransportHotkeyData.FINE_INCREMENT_DOWN
  ];

  public static readonly proteinsOrLigands = {
    navigate: createHotkeyData(
      [ 'tab' ],
      MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.navigateStringProperty
    ),
    grabOrRelease: createHotkeyData(
      [ 'space', 'enter' ],
      MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.grabOrReleaseStringProperty
    ),
    move: createHotkeyData(
      [
        ...MembraneTransportHotkeyData.SELECT_LEFT,
        ...MembraneTransportHotkeyData.SELECT_RIGHT
      ],
      MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.moveGrabbedItemStringProperty
    ),
    cancel: createHotkeyData(
      [ 'escape' ],
      MembraneTransportFluent.keyboardHelp.transportProteinsAndLigands.cancelGrabStringProperty
    )
  };

  public static readonly observationWindowTransportProteinLayer = {
    navigateProteins: createHotkeyData(
      [
        ...MembraneTransportHotkeyData.SELECT_LEFT,
        ...MembraneTransportHotkeyData.SELECT_RIGHT
      ],
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.navigateProteinsStringProperty
    ),
    moveProteins: createHotkeyData(
      [
        ...MembraneTransportHotkeyData.SELECT_LEFT,
        ...MembraneTransportHotkeyData.SELECT_RIGHT
      ],
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.moveGrabbedProteinStringProperty
    ),
    grabProtein: createHotkeyData(
      [ 'space', 'enter' ],
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.grabProteinStringProperty
    ),
    releaseProtein: createHotkeyData(
      [ 'space', 'enter' ],
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.releaseProteinStringProperty
    ),
    deleteProtein: createHotkeyData(
      [ 'backspace', 'delete' ],
      MembraneTransportFluent.keyboardHelp.sortOrDeleteProteins.deleteProteinStringProperty
    )
  };

  public static readonly soluteControl = {

    /**
     * The HotkeyData used by the keyboard help dialog only uses the left and right keys to keep the
     * layout simple. The listener also responds to up and down keys.
     */
    coarse: createHotkeyData(
      [
        ...MembraneTransportHotkeyData.COARSE_INCREMENT_RIGHT,
        ...MembraneTransportHotkeyData.COARSE_INCREMENT_LEFT
      ],
      MembraneTransportFluent.keyboardHelp.soluteAdjusters.addOrRemoveALotStringProperty
    ),
    fine: createHotkeyData(
      [
        ...MembraneTransportHotkeyData.FINE_INCREMENT_RIGHT,
        ...MembraneTransportHotkeyData.FINE_INCREMENT_LEFT
      ],
      MembraneTransportFluent.keyboardHelp.soluteAdjusters.addOrRemoveALittleStringProperty
    )
  };
}

membraneTransport.register( 'MembraneTransportHotkeyData', MembraneTransportHotkeyData );