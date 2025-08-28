// Copyright 2025, University of Colorado Boulder

/**
 * Implements descriptions relating to the state of the membrane. Includes information about
 * the current solutes, proteins, and potential. Used for the accessibleHelpText and state
 * descriptions for the membrane.
 *
 * For each description, there is branching logic that will change the string. It usually breaks down into
 * nested if/else statements that check the following:
 * - are proteins present?
 *   - are membrane potentials present?
 *     - are there any proteins
 *       - are there any solutes?
 *
 * This produces a large combination of varying cases to be described (and therefore a large number of strings).
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import { getFeatureSetHasProteins, getFeatureSetHasVoltages } from '../MembraneTransportFeatureSet.js';
import MembraneTransportPreferences from '../MembraneTransportPreferences.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembraneDescriber {

  // The help text content for the membrane, with a hint about how to use it. There are many different values
  // this can take depending on the state of the model. It is designed to guide the user to further interaction.
  public readonly accessibleHelpTextStringProperty: TReadOnlyProperty<string>;

  public constructor( model: MembraneTransportModel ) {

    this.accessibleHelpTextStringProperty = new DerivedProperty( [
      // model Properties
      model.hasAnySolutesProperty,
      model.transportProteinCountProperty,

      // string Properties
      MembraneTransportFluent.a11y.cellMembrane.accessibleHelpText.proteinsHidden.noSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleHelpText.proteinsHidden.withSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleHelpText.proteinsShown.noProteins.noSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleHelpText.proteinsShown.noProteins.withSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleHelpText.proteinsShown.withProteins.noSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleHelpText.proteinsShown.withProteins.withSolutesStringProperty
    ], (
      hasAnySolutes,
      transportProteinCount,
      proteinsHiddenNoSolutesString,
      proteinsHiddenWithSolutesString,
      proteinsShownNoProteinsNoSolutesString,
      proteinsShownNoProteinsWithSolutesString,
      proteinsShownWithProteinsNoSolutesString,
      proteinsShownWithProteinsWithSolutesString
    ) => {

      if ( getFeatureSetHasProteins( model.featureSet ) ) {
        if ( transportProteinCount === 0 ) {
          if ( hasAnySolutes ) {
            return proteinsShownNoProteinsWithSolutesString;
          }
          else {
            return proteinsShownNoProteinsNoSolutesString;
          }
        }
        else {
          if ( hasAnySolutes ) {
            return proteinsShownWithProteinsWithSolutesString;
          }
          else {
            return proteinsShownWithProteinsNoSolutesString;
          }
        }
      }
      else {
        if ( hasAnySolutes ) {
          return proteinsHiddenWithSolutesString;
        }
        else {
          return proteinsHiddenNoSolutesString;
        }
      }
    } );
  }

  public static createAccessibleList( model: MembraneTransportModel, leadingParagraphStringProperty: TReadOnlyProperty<string> ): AccessibleListNode {
    return new AccessibleListNode( [
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
        stringProperty: MembraneTransportFluent.a11y.screenSummary.currentDetails.noAddedProteinsStringProperty,
        visibleProperty: new DerivedProperty( [ model.transportProteinTypesCountProperty ], count => count === 0 && model.featureSet !== 'simpleDiffusion' )
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
      leadingParagraphStringProperty: leadingParagraphStringProperty,
      punctuationStyle: 'semicolon'
    } );
  }

  public static createAccessibleHelpText( model: MembraneTransportModel ): TReadOnlyProperty<string> {
    return new MembraneDescriber( model ).accessibleHelpTextStringProperty;
  }
}

membraneTransport.register( 'MembraneDescriber', MembraneDescriber );