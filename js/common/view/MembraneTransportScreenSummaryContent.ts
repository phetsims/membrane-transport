// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for Membrane Transport.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings, { MembraneTransportFluent } from '../../MembraneTransportStrings.js';
import { getFeatureSetHasLigands, getFeatureSetHasVoltages } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - This class is responsible for describing the entire model so it takes the entire model and is coupled to it.
   */
  public constructor( model: MembraneTransportModel ) {

    const createListItemNode = ( stringProperty: TReadOnlyProperty<string> ) => new Node( {
      tagName: 'li',
      accessibleName: stringProperty
    } );

    // // Keep in mind these are order-dependent
    const listItemNodes = [
      createListItemNode( ( MembraneTransportFluent.currentDetailsSoluteTypesOnOutside.createProperty( { outsideSoluteCount: model.outsideSoluteTypesCountProperty } ) ) ),
      createListItemNode( ( MembraneTransportFluent.currentDetailsSoluteTypesOnInside.createProperty( { insideSoluteCount: model.insideSoluteTypesCountProperty } ) ) )
    ];

    if ( getFeatureSetHasLigands( model.featureSet ) ) {
      const node = createListItemNode( MembraneTransportFluent.ligandsOnOutsideOnly );
      model.areLigandsAddedProperty.link( areLigandsAdded => node.setPDOMVisible( areLigandsAdded ) );
      listItemNodes.push( node );
    }

    // No transport proteins for simple diffusion
    if ( model.featureSet !== 'simpleDiffusion' ) {
      listItemNodes.push( createListItemNode( MembraneTransportFluent.currentDetailsTransportProteins.createProperty( { transportProteinCount: model.transportProteinCountProperty } ) ) );
    }

    if ( getFeatureSetHasVoltages( model.featureSet ) ) {
      listItemNodes.push( createListItemNode( MembraneTransportFluent.currentDetailsMembranePotential.createProperty( { membranePotential: model.membraneVoltagePotentialProperty } ) ) );
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
          accessibleName: MembraneTransportFluent.currentDetails.createProperty( { activityLevel: activityLevelProperty } )
        } ),
        new Node( {
          tagName: 'ul',
          children: listItemNodes
        } )
      ]
    } );

    super( {

      // TODO (JG): Am I forgetting a variable passed in to the options here? It is a FluentPattern with nothing to fill in. See https://github.com/phetsims/membrane-transport/issues/91 and https://github.com/phetsims/chipper/issues/1588
      playAreaContent: new PatternStringProperty( model.featureSet === 'simpleDiffusion' ? MembraneTransportStrings.a11y.summary.playAreaSummaryScreen1StringProperty :
                                                  model.featureSet === 'facilitatedDiffusion' ? MembraneTransportStrings.a11y.summary.playAreaSummaryScreen2and4StringProperty :
                                                  model.featureSet === 'activeTransport' ? MembraneTransportStrings.a11y.summary.playAreaSummaryScreen3StringProperty :
                                                  MembraneTransportStrings.a11y.summary.playAreaSummaryScreen2and4StringProperty, {
          playAreaSummaryIntro: MembraneTransportStrings.a11y.summary.playAreaSummaryIntroStringProperty,
          playAreaSummarySolutes: MembraneTransportStrings.a11y.summary.playAreaSummarySolutesStringProperty,
          playAreaSummaryProteins: MembraneTransportStrings.a11y.summary.playAreaSummaryProteinsStringProperty,
          playAreaSummaryVoltagePotential: MembraneTransportStrings.a11y.summary.playAreaSummaryVoltagePotentialStringProperty,
          playAreaSummaryBarCharts: MembraneTransportStrings.a11y.summary.playAreaSummaryBarChartsStringProperty
        }
      ),
      controlAreaContent: MembraneTransportStrings.a11y.summary.controlAreaSummaryStringProperty,
      currentDetailsContent: {
        node: currentDetailsNode
      },

      interactionHintContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportStrings.a11y.summary.interactionHintStringProperty :
                              MembraneTransportStrings.a11y.summary.interactionHintWithTransportProteinsStringProperty
    } );
  }
}

membraneTransport.register( 'MembraneTransportScreenSummaryContent', MembraneTransportScreenSummaryContent );