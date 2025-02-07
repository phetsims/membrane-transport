// Copyright 2025, University of Colorado Boulder

/**
 * MembraneChannelsPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So MembraneChannelsPreferencesNode and its
 * subcomponents must implement dispose.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import { animateLipidsProperty } from '../MembraneChannelsPreferences.js';

type SelfOptions = EmptySelfOptions;

export type MembraneChannelsPreferencesNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MembraneChannelsPreferencesNode extends VBox {

  public constructor( tandem: Tandem ) {

    super( {
      children: [
        new PreferencesControl( {
          isDisposable: false,
          labelNode: new Text( MembraneChannelsStrings.animateLipidsStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
          descriptionNode: new RichText( MembraneChannelsStrings.animateLipidsDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS ),
          controlNode: new ToggleSwitch( animateLipidsProperty, false, true, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS ),
          tandem: tandem.createTandem( 'animateLipidsControl' ),
          phetioFeatured: true,
          visiblePropertyOptions: {
            phetioFeatured: true
          }
        } )
      ]
    } );
  }
}

membraneChannels.register( 'MembraneChannelsPreferencesNode', MembraneChannelsPreferencesNode );