// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in MembraneTransport.
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
  public static readonly interactiveSlotsNode = {
    selection: createHotkeyData(
      [ 'arrowLeft', 'arrowRight', 'a', 'd' ],
      new StringProperty( 'Select a slot' )
    )
  };
}

membraneTransport.register( 'MembraneTransportHotkeyData', MembraneTransportHotkeyData );