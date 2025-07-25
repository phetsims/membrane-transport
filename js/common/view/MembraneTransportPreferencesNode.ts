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

export default class MembraneTransportPreferencesNode extends VBox {

  public constructor( tandem: Tandem ) {

    const animateLipidsControl = new PreferencesControl( {
      isDisposable: false,
      labelNode: new Text( MembraneTransportFluent.preferencesDialog.animateLipids.labelStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new RichText( MembraneTransportFluent.preferencesDialog.animateLipids.descriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: new ToggleSwitch( MembraneTransportPreferences.instance.animateLipidsProperty, false, true, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS ),
      tandem: tandem.createTandem( 'animateLipidsControl' ),
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    animateLipidsControl.addLinkedElement( MembraneTransportPreferences.instance.animateLipidsProperty );

    const glucoseMetabolismControl = new PreferencesControl( {
      isDisposable: false,
      labelNode: new Text( MembraneTransportFluent.preferencesDialog.glucoseMetabolism.labelStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
      descriptionNode: new RichText( MembraneTransportFluent.preferencesDialog.glucoseMetabolism.descriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
      controlNode: new ToggleSwitch( MembraneTransportPreferences.instance.glucoseMetabolismProperty, false, true, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS ),
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