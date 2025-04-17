// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for Membrane Transport.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import { getFeatureSetHasLigands, getFeatureSetHasVoltages } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - This class is responsible for describing the entire model so it takes the entire model and is coupled to it.
   */
  public constructor( model: MembraneTransportModel ) {

    // Keep in mind these are order-dependent
    const stringProperties = [
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsSoluteTypesOnOutsideMessageProperty, { outsideSoluteCount: model.outsideSoluteTypesCountProperty } ),
      new PatternMessageProperty( MembraneTransportMessages.currentDetailsSoluteTypesOnInsideMessageProperty, { insideSoluteCount: model.insideSoluteTypesCountProperty } )
    ];

    // No transport proteins for simple diffusion
    if ( model.featureSet !== 'simpleDiffusion' ) {
      stringProperties.push( new PatternMessageProperty( MembraneTransportMessages.currentDetailsTransportProteinsMessageProperty, { transportProteinCount: model.transportProteinCountProperty } ) );
    }

    if ( getFeatureSetHasLigands( model.featureSet ) ) {
      stringProperties.push( new PatternMessageProperty( MembraneTransportMessages.currentDetailsLigandsMessageProperty, { hasLigands: model.areLigandsAddedProperty } ) );
    }

    if ( getFeatureSetHasVoltages( model.featureSet ) ) {
      stringProperties.push( new PatternMessageProperty( MembraneTransportMessages.currentDetailsMembranePotentialMessageProperty, { membranePotential: model.membraneVoltagePotentialProperty } ) );
    }

    // A Property that describes that activity level of the particles and transport proteins in the model.
    const activityLevelProperty = new DerivedProperty( [
      model.outsideSoluteTypesCountProperty,
      model.insideSoluteTypesCountProperty,
      model.transportProteinCountProperty,
      model.areLigandsAddedProperty,
      model.isPlayingProperty
    ], ( outsideSoluteCount, insideSoluteCount, transportProteinCount, areLigandsAdded, isPlaying ) => {
      const isCalm = outsideSoluteCount === 0 && insideSoluteCount === 0 && transportProteinCount === 0 && !areLigandsAdded;
      return isCalm ? 'calm' :
             isPlaying ? 'active' :
             'activeAndPaused';
    } );

    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: new PatternMessageProperty( MembraneTransportMessages.currentDetailsMessageProperty, { activityLevel: activityLevelProperty } )
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