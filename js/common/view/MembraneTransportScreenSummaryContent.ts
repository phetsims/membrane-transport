// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for Membrane Transport.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import MembraneDescriber from './MembraneDescriber.js';

export default class MembraneTransportScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - This class is responsible for describing the entire model so it takes the entire model and is coupled to it.
   */
  public constructor( model: MembraneTransportModel ) {
    const currentDetailsNode = MembraneDescriber.createAccessibleList( model, MembraneTransportFluent.a11y.screenSummary.currentDetails.leadingParagraphStringProperty );
    super( {
      playAreaContent: model.featureSet === 'simpleDiffusion' ? MembraneTransportFluent.a11y.screenSummary.playArea.screen1StringProperty :
                       model.featureSet === 'facilitatedDiffusion' ? MembraneTransportFluent.a11y.screenSummary.playArea.screen2and4StringProperty :
                       model.featureSet === 'activeTransport' ? MembraneTransportFluent.a11y.screenSummary.playArea.screen3StringProperty :
                       MembraneTransportFluent.a11y.screenSummary.playArea.screen2and4StringProperty,
      controlAreaContent: MembraneTransportFluent.a11y.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsNode,
      interactionHintContent: [
        model.featureSet === 'simpleDiffusion' ? MembraneTransportFluent.a11y.screenSummary.interactionHintStringProperty :
        MembraneTransportFluent.a11y.screenSummary.interactionHintWithTransportProteinsStringProperty
      ]
    } );
  }
}

membraneTransport.register( 'MembraneTransportScreenSummaryContent', MembraneTransportScreenSummaryContent );