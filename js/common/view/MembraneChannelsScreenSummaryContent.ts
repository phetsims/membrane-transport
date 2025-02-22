// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for trig-tour.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import StringProperty from '../../../../axon/js/StringProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsFeatureSet from '../MembraneChannelsFeatureSet.js';

export default class MembraneChannelsScreenSummaryContent extends ScreenSummaryContent {
  public constructor( featureSet: MembraneChannelsFeatureSet ) {

    super( {

      // TODO: Why can't I pass in a fluent message property to the content?
      playAreaContent: new StringProperty( 'hello' )
      // featureSet === 'simpleDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen1MessageProperty :
      // featureSet === 'facilitatedDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty :
      // featureSet === 'activeTransport' ? MembraneChannelsMessages.playAreaSummaryScreen3MessageProperty :
      // MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty

      // controlAreaContent: TrigTourStrings.a11y.translatable.screenSummary.controlAreaStringProperty,
      // currentDetailsContent: [
      //   trigInfoStringProperty,
      //   quadrantInfoStringProperty,
      //   rotationDirectionStringProperty
      // ],
      // interactionHintContent: TrigTourStrings.a11y.translatable.screenSummary.interactionHintStringProperty
    } );
  }
}

membraneChannels.register( 'MembraneChannelsScreenSummaryContent', MembraneChannelsScreenSummaryContent );