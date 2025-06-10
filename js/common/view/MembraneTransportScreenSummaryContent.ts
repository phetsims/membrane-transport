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

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - This class is responsible for describing the entire model so it takes the entire model and is coupled to it.
   */
  public constructor( model: MembraneTransportModel ) {

    const currentDetailsNode = new AccessibleListNode( [
      {
        stringProperty: MembraneTransportFluent.a11y.currentDetailsNoAddedSolutesStringProperty,
        visibleProperty: DerivedProperty.not( model.hasAnySolutesProperty )
      },
      {
        stringProperty: MembraneTransportFluent.a11y.currentDetailsSoluteTypesOnOutside.createProperty( {
          count: model.outsideSoluteTypesCountProperty
        } ),
        visibleProperty: model.hasAnySolutesProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.currentDetailsSoluteTypesOnInside.createProperty( {
          count: model.insideSoluteTypesCountProperty
        } ),
        visibleProperty: model.hasAnySolutesProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.currentDetailsTransportProteins.createProperty( {
          proteinCount: model.transportProteinCountProperty,
          proteinTypeCount: model.transportProteinTypesCountProperty
        } ),
        visibleProperty: new DerivedProperty( [ model.transportProteinCountProperty ], count => count > 0 )
      },
      {
        stringProperty: MembraneTransportFluent.a11y.currentDetailsLigandsStringProperty,
        visibleProperty: model.areLigandsAddedProperty
      },
      {
        stringProperty: MembraneTransportFluent.a11y.currentDetailsMembranePotential.createProperty( {
          membranePotential: model.membranePotentialProperty
        } ),
        visibleProperty: new BooleanProperty( getFeatureSetHasVoltages( model.featureSet ) )
      }
    ], {
      leadingParagraphStringProperty: MembraneTransportFluent.a11y.currentDetailsLeadingParagraphStringProperty,
      punctuationStyle: 'semicolon'
    } );

    super( {
      playAreaContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportFluent.a11y.summary.playAreaSummaryScreen1StringProperty :
                       model.featureSet === 'facilitatedDiffusion' ? MembraneTransportFluent.a11y.summary.playAreaSummaryScreen2and4StringProperty :
                       model.featureSet === 'activeTransport' ? MembraneTransportFluent.a11y.summary.playAreaSummaryScreen3StringProperty :
                       MembraneTransportFluent.a11y.summary.playAreaSummaryScreen2and4StringProperty,
      controlAreaContent: MembraneTransportFluent.a11y.summary.controlAreaSummaryStringProperty,
      currentDetailsContent: currentDetailsNode,

      interactionHintContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportFluent.a11y.summary.interactionHintStringProperty :
                              MembraneTransportFluent.a11y.summary.interactionHintWithTransportProteinsStringProperty
    } );
  }
}

membraneTransport.register( 'MembraneTransportScreenSummaryContent', MembraneTransportScreenSummaryContent );