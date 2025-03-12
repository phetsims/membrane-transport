// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for trig-tour.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import MembraneChannelsFeatureSet from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

export default class MembraneChannelsScreenSummaryContent extends ScreenSummaryContent {
  public constructor( featureSet: MembraneChannelsFeatureSet,
                      model: MembraneChannelsModel ) {

    const stringProperties = [
      new PatternMessageProperty( MembraneChannelsMessages.currentDetailsOutsideSoluteCountMessageProperty, { outsideSoluteCount: model.outsideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneChannelsMessages.currentDetailsInsideSoluteCountMessageProperty, { insideSoluteCount: model.insideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneChannelsMessages.currentDetailsChannelCountMessageProperty, { channelCount: model.channelCountProperty } )
    ];

    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: MembraneChannelsMessages.currentDetailsRightNowMessageProperty
        } ),
        new Node( {
          tagName: 'ul',
          children: stringProperties.map( string => new Node( { tagName: 'li', accessibleName: string } ) )
        } )
      ]
    } );

    super( {

      // TODO (JG): Am I forgetting a variable passed in to the options here? It is a FluentPattern with nothing to fill in.
      playAreaContent: new PatternMessageProperty( featureSet === 'simpleDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen1MessageProperty :
                                    featureSet === 'facilitatedDiffusion' ? MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty :
                                    featureSet === 'activeTransport' ? MembraneChannelsMessages.playAreaSummaryScreen3MessageProperty :
                                    MembraneChannelsMessages.playAreaSummaryScreen2and4MessageProperty, {}
        ),
      controlAreaContent: MembraneChannelsMessages.controlAreaSummaryMessageProperty,
      currentDetailsContent: {
        node: currentDetailsNode
      },

      interactionHintContent: featureSet === 'simpleDiffusion' ? MembraneChannelsMessages.interactionHintMessageProperty :
                              MembraneChannelsMessages.interactionHintWithChannelsMessageProperty
    } );
  }
}

membraneChannels.register( 'MembraneChannelsScreenSummaryContent', MembraneChannelsScreenSummaryContent );