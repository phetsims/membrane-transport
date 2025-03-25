// Copyright 2025, University of Colorado Boulder

/**
 * MembraneTransportKeyboardHelpNode is the keyboard help for all screens. The majority of elements are relevant to all screens.
 * Elements that are not relevant to all screens may be omitted via the featureSet.
 *
 * TODO (design): Let's request a design here, and work on that that before spending much time i18n
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StringProperty from '../../../../axon/js/StringProperty.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import GrabReleaseKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFeatureSet from '../MembraneTransportFeatureSet.js';
import MoveGrabbedChannelProteinKeyboardHelpSection from './MoveGrabbedChannelProteinKeyboardHelpSection.js';

export default class MembraneTransportKeyboardHelpNode extends TwoColumnKeyboardHelpContent {

  public constructor( featureSet: MembraneTransportFeatureSet ) {

    const leftColumn = [
      new FromAnywhereInSimHelpSection(),
      new GrabReleaseKeyboardHelpSection( new StringProperty( 'thing as title' ), new StringProperty( 'thing as content' ) ),
      new MoveGrabbedChannelProteinKeyboardHelpSection(
        new StringProperty( 'title' ),
        new StringProperty( 'move' ),
        new StringProperty( 'jump start' ),
        new StringProperty( 'jump end' )
      )
    ];

    const rightColumn = [
      new TimeControlsKeyboardHelpSection(),
      new MoveDraggableItemsKeyboardHelpSection(),
      new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } )
    ];

    super( leftColumn, rightColumn );
  }
}

class FromAnywhereInSimHelpSection extends KeyboardHelpSection {

  public constructor() {

    super( 'From anywhere in the sim', [], {
      textMaxWidth: 250,
      isDisposable: false
    } );
  }
}

membraneTransport.register( 'MembraneTransportKeyboardHelpNode', MembraneTransportKeyboardHelpNode );