// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for Membrane Transport.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - This class is responsible for describing the entire model so it takes the entire model and is coupled to it.
   */
  public constructor( model: MembraneTransportModel ) {

    const stringProperties = [
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsSoluteTypesOnOutsideMessageProperty, { outsideSoluteCount: model.outsideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsSoluteTypesOnInsideMessageProperty, { insideSoluteCount: model.insideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsTransportProteinsMessageProperty, { transportProteinCount: model.transportProteinCountProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsLigandsMessageProperty, { hasLigands: model.areLigandsAddedProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsMembranePotentialMessageProperty, { membranePotential: model.membraneVoltagePotentialProperty } )
    ];

    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: new PatternMessageProperty( MembraneTransportMessages.currentDetailsMessageProperty, { amount: 123 } )
        } ),
        new Node( {
          tagName: 'ul',
          children: stringProperties.map( string => new Node( { tagName: 'li', accessibleName: string } ) )
        } )
      ]
    } );

    super( {

      // TODO (JG): Am I forgetting a variable passed in to the options here? It is a FluentPattern with nothing to fill in.
      playAreaContent: new PatternMessageProperty( model.featureSet === 'simpleDiffusion' ? MembraneTransportMessages.playAreaSummaryScreen1MessageProperty :
                                                   model.featureSet === 'facilitatedDiffusion' ? MembraneTransportMessages.playAreaSummaryScreen2and4MessageProperty :
                                                   model.featureSet === 'activeTransport' ? MembraneTransportMessages.playAreaSummaryScreen3MessageProperty :
                                                   MembraneTransportMessages.playAreaSummaryScreen2and4MessageProperty, {}
      ),
      controlAreaContent: MembraneTransportMessages.controlAreaSummaryMessageProperty,
      currentDetailsContent: {
        node: currentDetailsNode
      },

      interactionHintContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportMessages.interactionHintMessageProperty :
                              MembraneTransportMessages.interactionHintWithTransportProteinsMessageProperty
    } );
  }
}

membraneTransport.register( 'MembraneTransportScreenSummaryContent', MembraneTransportScreenSummaryContent );