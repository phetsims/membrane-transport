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

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import JoistStrings from '../../../../joist/js/JoistStrings.js';
import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import VoicingRichText, { VoicingRichTextOptions } from '../../../../scenery/js/accessibility/voicing/nodes/VoicingRichText.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../sun/js/ToggleSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';

export default class MembraneTransportSoundPreferencesNode extends VBox {

  public constructor( tandem: Tandem ) {

    const stereoCrossingSoundsControl = new PreferencesControl( {
      isDisposable: false,
      labelNode: new Text( MembraneTransportFluent.preferencesDialog.audio.sounds.stereoCrossingSounds.labelStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      controlNode: new ToggleSwitch( MembraneTransportPreferences.instance.stereoCrossingSoundsEnabledProperty, false, true, combineOptions<ToggleSwitchOptions>(
        {},
        PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS,
        {
          accessibleContextResponseLeftValue: 'Stereo Crossing Sounds Off.',
          accessibleContextResponseRightValue: 'Stereo Crossing Sounds On.'
        }
      ) ),
      descriptionNode: new VoicingRichText( MembraneTransportFluent.preferencesDialog.audio.sounds.stereoCrossingSounds.descriptionStringProperty, combineOptions<VoicingRichTextOptions>(
        {},
        PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS,
        {
          accessibleParagraph: null,
          readingBlockNameResponse: new PatternStringProperty( JoistStrings.a11y.preferences.tabs.labelledDescriptionPatternStringProperty, {
            label: MembraneTransportFluent.preferencesDialog.audio.sounds.stereoCrossingSounds.labelStringProperty,
            description: MembraneTransportFluent.preferencesDialog.audio.sounds.stereoCrossingSounds.descriptionStringProperty
          } )
        }
      ) ),
      tandem: tandem.createTandem( 'stereoCrossingSoundsControl' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    stereoCrossingSoundsControl.addLinkedElement( MembraneTransportPreferences.instance.stereoCrossingSoundsEnabledProperty );

    super( {
      children: [
        stereoCrossingSoundsControl
      ]
    } );
  }
}

membraneTransport.register( 'MembraneTransportSoundPreferencesNode', MembraneTransportSoundPreferencesNode );