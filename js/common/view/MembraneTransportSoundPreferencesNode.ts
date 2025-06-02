// Copyright 2025, University of Colorado Boulder

/**
 * MembraneTransportSoundPreferencesNode is the user interface for sound-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So MembraneTransportSoundPreferencesNode and its
 * subcomponents must implement dispose.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';

export default class MembraneTransportSoundPreferencesNode extends VBox {

  public constructor( tandem: Tandem ) {

    super( {
      children: [
        new PreferencesControl( {
          isDisposable: false,
          labelNode: new Text( MembraneTransportFluent.preferencesDialog.audio.sounds.stereoSoundsStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          controlNode: new ToggleSwitch( MembraneTransportPreferences.instance.stereoCrossingSoundsEnabledProperty, false, true, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS ),
          descriptionNode: new RichText( MembraneTransportFluent.preferencesDialog.audio.sounds.stereoSoundsDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
          tandem: tandem.createTandem( 'stereoCrossingSoundsEnabledControl' ),
          phetioFeatured: true,
          visiblePropertyOptions: {
            phetioFeatured: true
          }
        } )
      ]
    } );
  }
}

membraneTransport.register( 'MembraneTransportSoundPreferencesNode', MembraneTransportSoundPreferencesNode );