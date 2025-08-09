// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in MembraneTransport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../scenery/js/input/KeyDescriptor.js';
import membraneTransport from '../membraneTransport.js';

function createHotkeyData( keys: OneKeyStroke[], binderName: string ): HotkeyData {
  return new HotkeyData( {
    keys: keys,
    repoName: membraneTransport.name,

    // Keyboard Help content does not use HotkeyData directly because it needs
    // to rearrange the keys in a specific order. So a name for binder is specified
    // instead of a label for the keyboard help dialog.
    binderName: binderName
  } );
}

export default class MembraneTransportHotkeyData {
  public static readonly SELECT_LEFT: OneKeyStroke[] = [ 'arrowLeft', 'a' ];
  public static readonly SELECT_RIGHT: OneKeyStroke[] = [ 'arrowRight', 'd' ];

  public static readonly interactiveSlotsNode = {
    selection: createHotkeyData( [
        ...MembraneTransportHotkeyData.SELECT_LEFT,
        ...MembraneTransportHotkeyData.SELECT_RIGHT
      ],
      'Select a slot in the membrane'
    ),
    releaseProtein: createHotkeyData(
      [ 'enter', 'space' ],
      'Release protein'
    ),
    deleteProtein: createHotkeyData(
      [ 'backspace', 'delete' ],
      'Delete protein'
    ),
    cancelInteraction: createHotkeyData(
      [ 'escape' ],
      'Cancel interaction'
    )
  };

  public static readonly observationWindowTransportProteinLayer = {
    selection: createHotkeyData( [
        ...MembraneTransportHotkeyData.SELECT_LEFT,
        ...MembraneTransportHotkeyData.SELECT_RIGHT
      ],
      'Select a protein'
    ),
    grabProtein: createHotkeyData(
      [ 'enter', 'space' ],
      'Grab protein'
    )
  };

  public static readonly soluteControl = {
    coarseIncrement: createHotkeyData(
      [ 'arrowRight', 'arrowUp', 'w', 'd' ],
      'Coarse increment solute'
    ),
    coarseDecrement: createHotkeyData(
      [ 'arrowLeft', 'arrowDown', 's', 'a' ],
      'Coarse decrement solute'
    ),
    fineIncrement: createHotkeyData(
      [ 'shift+arrowRight', 'shift+arrowUp', 'shift+w', 'shift+d' ],
      'Fine increment solute'
    ),
    fineDecrement: createHotkeyData(
      [ 'shift+arrowLeft', 'shift+arrowDown', 'shift+s', 'shift+a' ],
      'Fine decrement solute'
    )
  };
}

membraneTransport.register( 'MembraneTransportHotkeyData', MembraneTransportHotkeyData );