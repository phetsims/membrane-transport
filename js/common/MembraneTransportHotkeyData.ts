// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in MembraneTransport.
 *
 * TODO: i18n and finish content, see https://github.com/phetsims/membrane-transport/issues/46
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import StringProperty from '../../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';
import HotkeyData from '../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../scenery/js/input/KeyDescriptor.js';
import membraneTransport from '../membraneTransport.js';

function createHotkeyData( keys: OneKeyStroke[],
                           keyboardHelpDialogLabelStringProperty: TReadOnlyProperty<string> ): HotkeyData {
  return new HotkeyData( {
    keyStringProperties: keys.map( string => new Property( string ) ),
    repoName: membraneTransport.name,
    keyboardHelpDialogLabelStringProperty: keyboardHelpDialogLabelStringProperty
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
      new StringProperty( 'Select a slot' )
    ),
    releaseProtein: createHotkeyData(
      [ 'enter', 'space' ],
      new StringProperty( 'Release protein' )
    ),
    deleteProtein: createHotkeyData(
      [ 'backspace', 'delete' ],
      new StringProperty( 'Delete protein' )
    ),
    cancelInteraction: createHotkeyData(
      [ 'escape' ],
      new StringProperty( 'Cancel interaction' )
    )
  };

  public static readonly observationWindowTransportProteinLayer = {
    selection: createHotkeyData( [
        ...MembraneTransportHotkeyData.SELECT_LEFT,
        ...MembraneTransportHotkeyData.SELECT_RIGHT
      ],
      new StringProperty( 'Select a protein' )
    ),
    grabProtein: createHotkeyData(
      [ 'enter', 'space' ],
      new StringProperty( 'Grab protein' )
    )
  };

  public static readonly soluteControl = {
    coarseIncrement: createHotkeyData(
      [ 'arrowRight', 'arrowUp' ],
      new StringProperty( 'Coarse increment solute' )
    ),
    coarseDecrement: createHotkeyData(
      [ 'arrowLeft', 'arrowDown' ],
      new StringProperty( 'Coarse decrement solute' )
    ),
    fineIncrement: createHotkeyData(
      [ 'shift+arrowRight', 'shift+arrowUp' ],
      new StringProperty( 'Fine increment solute' )
    ),
    fineDecrement: createHotkeyData(
      [ 'shift+arrowLeft', 'shift+arrowDown' ],
      new StringProperty( 'Fine decrement solute' )
    )
  };
}

membraneTransport.register( 'MembraneTransportHotkeyData', MembraneTransportHotkeyData );