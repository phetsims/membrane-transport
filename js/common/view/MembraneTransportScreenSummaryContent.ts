// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for trig-tour.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportFeatureSet from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {
  public constructor( featureSet: MembraneTransportFeatureSet,
                      model: MembraneTransportModel ) {

    const stringProperties = [
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsOutsideSoluteCountMessageProperty, { outsideSoluteCount: model.outsideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsInsideSoluteCountMessageProperty, { insideSoluteCount: model.insideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsChannelCountMessageProperty, { channelCount: model.transportProteinCountProperty } )
    ];

    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: MembraneTransportMessages.currentDetailsRightNowMessageProperty
        } ),
        new Node( {
          tagName: 'ul',
          children: stringProperties.map( string => new Node( { tagName: 'li', accessibleName: string } ) )
        } )
      ]
    } );

    super( {

      // TODO (JG): Am I forgetting a variable passed in to the options here? It is a FluentPattern with nothing to fill in.
      playAreaContent: new PatternMessageProperty( featureSet === 'simpleDiffusion' ? MembraneTransportMessages.playAreaSummaryScreen1MessageProperty :
                                    featureSet === 'facilitatedDiffusion' ? MembraneTransportMessages.playAreaSummaryScreen2and4MessageProperty :
                                    featureSet === 'activeTransport' ? MembraneTransportMessages.playAreaSummaryScreen3MessageProperty :
                                    MembraneTransportMessages.playAreaSummaryScreen2and4MessageProperty, {}
        ),
      controlAreaContent: MembraneTransportMessages.controlAreaSummaryMessageProperty,
      currentDetailsContent: {
        node: currentDetailsNode
      },

      interactionHintContent: featureSet === 'simpleDiffusion' ? MembraneTransportMessages.interactionHintMessageProperty :
                              MembraneTransportMessages.interactionHintWithChannelsMessageProperty
    } );
  }
}

membraneTransport.register( 'MembraneTransportScreenSummaryContent', MembraneTransportScreenSummaryContent );