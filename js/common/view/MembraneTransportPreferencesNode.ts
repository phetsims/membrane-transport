// Copyright 2025, University of Colorado Boulder

/**
 * MembraneTransportPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So MembraneTransportPreferencesNode and its
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

export default class MembraneTransportPreferencesNode extends VBox {

  public constructor( tandem: Tandem ) {

    const animateLipidsControl = new PreferencesControl( {
      isDisposable: false,
      labelNode: new Text( MembraneTransportFluent.preferencesDialog.simulation.animateLipids.labelStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new VoicingRichText( MembraneTransportFluent.preferencesDialog.simulation.animateLipids.descriptionStringProperty, combineOptions<VoicingRichTextOptions>(
        {},
        PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS,
        {
          accessibleParagraph: null,
          readingBlockNameResponse: new PatternStringProperty( JoistStrings.a11y.preferences.tabs.labelledDescriptionPatternStringProperty, {
            label: MembraneTransportFluent.preferencesDialog.simulation.animateLipids.labelStringProperty,
            description: MembraneTransportFluent.preferencesDialog.simulation.animateLipids.descriptionStringProperty
          } )
        }
      ) ),
      controlNode: new ToggleSwitch( MembraneTransportPreferences.instance.animateLipidsProperty, false, true, combineOptions<ToggleSwitchOptions>(
        {},
        PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS,
        {
          leftValueContextResponse: MembraneTransportFluent.a11y.preferencesDialog.simulation.animateLipids.accessibleContextResponseLeftValueStringProperty,
          rightValueContextResponse: MembraneTransportFluent.a11y.preferencesDialog.simulation.animateLipids.accessibleContextResponseRightValueStringProperty
        }
      ) ),
      tandem: tandem.createTandem( 'animateLipidsControl' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    animateLipidsControl.addLinkedElement( MembraneTransportPreferences.instance.animateLipidsProperty );

    const glucoseMetabolismControl = new PreferencesControl( {
      isDisposable: false,
      labelNode: new Text( MembraneTransportFluent.preferencesDialog.simulation.glucoseMetabolism.labelStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new VoicingRichText( MembraneTransportFluent.preferencesDialog.simulation.glucoseMetabolism.descriptionStringProperty, combineOptions<VoicingRichTextOptions>(
        {},
        PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS,
        {
          accessibleParagraph: null,
          readingBlockNameResponse: new PatternStringProperty( JoistStrings.a11y.preferences.tabs.labelledDescriptionPatternStringProperty, {
            label: MembraneTransportFluent.preferencesDialog.simulation.glucoseMetabolism.labelStringProperty,
            description: MembraneTransportFluent.preferencesDialog.simulation.glucoseMetabolism.descriptionStringProperty
          } )
        }
      ) ),
      controlNode: new ToggleSwitch( MembraneTransportPreferences.instance.glucoseMetabolismProperty, false, true, combineOptions<ToggleSwitchOptions>(
        {},
        PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS,
        {
          leftValueContextResponse: MembraneTransportFluent.a11y.preferencesDialog.simulation.glucoseMetabolism.accessibleContextResponseLeftValueStringProperty,
          rightValueContextResponse: MembraneTransportFluent.a11y.preferencesDialog.simulation.glucoseMetabolism.accessibleContextResponseRightValueStringProperty
        }
      ) ),
      tandem: tandem.createTandem( 'glucoseMetabolismControl' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    glucoseMetabolismControl.addLinkedElement( MembraneTransportPreferences.instance.glucoseMetabolismProperty );

    super( {
      spacing: PreferencesDialogConstants.VERTICAL_CONTENT_SPACING,
      children: [
        animateLipidsControl,
        glucoseMetabolismControl
      ]
    } );
  }
}

membraneTransport.register( 'MembraneTransportPreferencesNode', MembraneTransportPreferencesNode );