// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for Membrane Transport.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import { getFeatureSetHasVoltages } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - This class is responsible for describing the entire model so it takes the entire model and is coupled to it.
   */
  public constructor( model: MembraneTransportModel ) {

    const currentDetailsNode = new AccessibleListNode( [
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.noAddedSolutesStringProperty,
        visibleProperty: DerivedProperty.not( model.hasAnySolutesProperty )
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.soluteTypesOnOutside.createProperty( {
          count: model.outsideSoluteTypesCountProperty
        } ),
        visibleProperty: model.hasAnySolutesProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.soluteTypesOnInside.createProperty( {
          count: model.insideSoluteTypesCountProperty
        } ),
        visibleProperty: model.hasAnySolutesProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.transportProteins.createProperty( {
          proteinCount: model.transportProteinCountProperty,
          proteinTypeCount: model.transportProteinTypesCountProperty
        } ),
        visibleProperty: new DerivedProperty( [ model.transportProteinCountProperty ], count => count > 0 )
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.ligandsStringProperty,
        visibleProperty: model.areLigandsAddedProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.atpReactingStringProperty,
        visibleProperty: model.hasAnyADPOrPhosphateProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.membranePotential.createProperty( {
          membranePotential: model.membranePotentialProperty
        } ),
        visibleProperty: new BooleanProperty( getFeatureSetHasVoltages( model.featureSet ) )
      },
      {
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.glucoseMetabolismStringProperty,
        visibleProperty: MembraneTransportPreferences.instance.glucoseMetabolismProperty
      }
    ], {
      leadingParagraphStringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.leadingParagraphStringProperty,
      punctuationStyle: 'semicolon'
    } );

    super( {
      playAreaContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportFluent.a11y.screenSummary.playArea.screen1StringProperty :
                       model.featureSet === 'facilitatedDiffusion' ? MembraneTransportFluent.a11y.screenSummary.playArea.screen2and4StringProperty :
                       model.featureSet === 'activeTransport' ? MembraneTransportFluent.a11y.screenSummary.playArea.screen3StringProperty :
                       MembraneTransportFluent.a11y.screenSummary.playArea.screen2and4StringProperty,
      controlAreaContent: MembraneTransportFluent.a11y.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsNode,

      interactionHintContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportFluent.a11y.screenSummary.interactionHintStringProperty :
                              MembraneTransportFluent.a11y.screenSummary.interactionHintWithTransportProteinsStringProperty
    } );
  }
}

membraneTransport.register( 'MembraneTransportScreenSummaryContent', MembraneTransportScreenSummaryContent );