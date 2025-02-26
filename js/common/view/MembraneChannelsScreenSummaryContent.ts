// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for trig-tour.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import MembraneChannelsFeatureSet from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

export default class MembraneChannelsScreenSummaryContent extends ScreenSummaryContent {
  public constructor( featureSet: MembraneChannelsFeatureSet,
                      model: MembraneChannelsModel ) {

    super( {

      playAreaContent:
        new PatternMessageProperty( featureSet === 'simpleDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen1MessageProperty :
                                    featureSet === 'facilitatedDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty :
                                    featureSet === 'activeTransport' ? MembraneChannelsMessages.playAreaSummaryScreen3MessageProperty :

                                    // TODO: Am I forgetting a variable passed in to the options here?
                                    MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty, {}
        ),
      controlAreaContent: MembraneChannelsMessages.controlAreaSummaryMessageProperty,

      // TODO (design): Is it ok that we didn't use a bullet list here, like the design doc told us to? This was way easier and has approximately the same info.
      currentDetailsContent: new PatternMessageProperty( MembraneChannelsMessages.currentDetailsMessageProperty, {
        outsideSoluteCount: model.outsideSoluteTypesCountProperty,
        insideSoluteCount: model.insideSoluteTypesCountProperty,
        channelCount: model.channelCountProperty
      } )
    } );
  }
}

membraneChannels.register( 'MembraneChannelsScreenSummaryContent', MembraneChannelsScreenSummaryContent );