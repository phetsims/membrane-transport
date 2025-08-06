// Copyright 2025, University of Colorado Boulder

/**
 * MembraneTransportKeyboardHelpNode is the keyboard help for all screens. The majority of elements are relevant to all screens.
 * Elements that are not relevant to all screens may be omitted via the featureSet.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFeatureSet, { getFeatureSetHasProteins } from '../MembraneTransportFeatureSet.js';
import SoluteAdjustersKeyboardHelpSection from './SoluteAdjustersKeyboardHelpSection.js';
import SortOrDeleteProteinsKeyboardHelpSection from './SortOrDeleteProteinsKeyboardHelpSection.js';
import TransportProteinsAndLigandsKeyboardHelpSection from './TransportProteinsAndLigandsKeyboardHelpSection.js';

export default class MembraneTransportKeyboardHelpNode extends TwoColumnKeyboardHelpContent {

  public constructor( featureSet: MembraneTransportFeatureSet ) {

    const leftColumn = [];
    const rightColumn = [];

    // Note that not all screens that have proteins also have ligands. But the section combines the
    // contents, so we just add it all if the feature set indicates there are proteins.
    if ( getFeatureSetHasProteins( featureSet ) ) {

      // sim specific content on the left
      leftColumn.push( new SoluteAdjustersKeyboardHelpSection() );
      leftColumn.push( new TransportProteinsAndLigandsKeyboardHelpSection() );
      leftColumn.push( new SortOrDeleteProteinsKeyboardHelpSection() );

      // general content on the right
      rightColumn.push( new TimeControlsKeyboardHelpSection() );
      rightColumn.push( new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } ) );
    }
    else {

      // sim specific content on the left, and put the time controls on the left too to
      // balance the columns when there is less to display
      leftColumn.push( new SoluteAdjustersKeyboardHelpSection() );
      leftColumn.push( new TimeControlsKeyboardHelpSection() );

      rightColumn.push( new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } ) );
    }

    super( leftColumn, rightColumn );
  }
}

membraneTransport.register( 'MembraneTransportKeyboardHelpNode', MembraneTransportKeyboardHelpNode );