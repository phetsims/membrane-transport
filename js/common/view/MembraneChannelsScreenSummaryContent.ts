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

export default class MembraneChannelsScreenSummaryContent extends ScreenSummaryContent {
  public constructor( featureSet: MembraneChannelsFeatureSet ) {

    super( {

      playAreaContent:
        new PatternMessageProperty( featureSet === 'simpleDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen1MessageProperty :
                                    featureSet === 'facilitatedDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty :
                                    featureSet === 'activeTransport' ? MembraneChannelsMessages.playAreaSummaryScreen3MessageProperty :

                                    // TODO: Am I forgetting a variable passed in to the options here?
                                    MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty, {}
        ),
      controlAreaContent: MembraneChannelsMessages.controlAreaSummaryMessageProperty
    } );
  }
}

membraneChannels.register( 'MembraneChannelsScreenSummaryContent', MembraneChannelsScreenSummaryContent );