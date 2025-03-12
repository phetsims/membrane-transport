// Copyright 2023-2024, University of Colorado Boulder

/**
 * MembraneChannelsKeyboardHelpNode is the keyboard help for all screens. The majority of elements are relevant to all screens.
 * Elements that are not relevant to all screens may be omitted via the featureSet.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsFeatureSet from '../MembraneChannelsFeatureSet.js';

export default class MembraneChannelsKeyboardHelpNode extends TwoColumnKeyboardHelpContent {

  public constructor( featureSet: MembraneChannelsFeatureSet ) {

    // TODO: Add sections like:
    // MoveDraggableItemsKeyboardHelpSection for ligands
    // TimeControlsKeyboardHelpSection for time controls
    // GrabReleaseKeyboardHelpSection for select
    // CAVKeyboardHelpMoveGrabbedBallAndOrCardSection to move grabbed channel protein

    const leftColumn = [
      new FromAnywhereInSimHelpSection()
    ];

    const rightColumn = [
      new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } )
    ];

    super( leftColumn, rightColumn );
  }
}

class FromAnywhereInSimHelpSection extends KeyboardHelpSection {

  public constructor() {

    super( 'To Do: implement me', [], {
      textMaxWidth: 250,
      isDisposable: false
    } );
  }
}

membraneChannels.register( 'MembraneChannelsKeyboardHelpNode', MembraneChannelsKeyboardHelpNode );