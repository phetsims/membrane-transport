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

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import { getFeatureSetHasProteins, getFeatureSetHasVoltages } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembraneDescriber {

  // The state description of the membrane, describing presence of solutes, proteins, and membrane potential.
  public readonly accessibleStateDescriptionStringProperty: TReadOnlyProperty<string>;

  // The help text content for the membrane, with a hint about how to use it.
  public readonly accessibleHelpTextContentStringProperty: TReadOnlyProperty<string>;

  // The accessibleHelpText string Property, which is used for accessibleHelpText with Interactive Description.
  // It is composed with the two Properties above. For Voicing, each Property above is assigned to a unique
  // response type.
  public readonly accessibleHelpTextStringProperty: TReadOnlyProperty<string>;

  public constructor( model: MembraneTransportModel ) {

    this.accessibleStateDescriptionStringProperty = new DerivedProperty( [

      // model Properties
      model.hasAnySolutesProperty,
      model.transportProteinCountProperty,

      // string Properties
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsHidden.potentialHidden.noSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsHidden.potentialHidden.withSolutesStringProperty,

      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.noProteins.noSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.noProteins.withSolutesStringProperty,
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.withProteins.noSolutes.createProperty( {
        typeCount: model.transportProteinTypesCountProperty
      } ),
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialHidden.withProteins.withSolutes.createProperty( {
        typeCount: model.transportProteinTypesCountProperty
      } ),
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.noProteins.noSolutes.createProperty( {
        membranePotential: model.membranePotentialProperty
      } ),
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.noProteins.withSolutes.createProperty( {
        membranePotential: model.membranePotentialProperty
      } ),
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.withProteins.noSolutes.createProperty( {
        membranePotential: model.membranePotentialProperty,
        typeCount: model.transportProteinTypesCountProperty
      } ),
      MembraneTransportFluent.a11y.cellMembrane.accessibleStateDescription.proteinsShown.potentialShown.withProteins.withSolutes.createProperty( {
        membranePotential: model.membranePotentialProperty,
        typeCount: model.transportProteinTypesCountProperty
      } )
    ], (
      hasAnySolutes,
      transportProteinCount,
      proteinsHiddenPotentialHiddenNoSolutesString,
      proteinsHiddenPotentialHiddenWithSolutesString,
      proteinsShownPotentialHiddenNoProteinsNoSolutesString,
      proteinsShownPotentialHiddenNoProteinsWithSolutesString,
      proteinsShownPotentialHiddenWithProteinsNoSolutesString,
      proteinsShownPotentialHiddenWithProteinsWithSolutesString,
      proteinsShownPotentialShownNoProteinsNoSolutesString,
      proteinsShownPotentialShownNoProteinsWithSolutesString,
      proteinsShownPotentialShownWithProteinsNoSolutesString,
      proteinsShownPotentialShownWithProteinsWithSolutesString
    ) => {
      if ( getFeatureSetHasProteins( model.featureSet ) ) {
        if ( getFeatureSetHasVoltages( model.featureSet ) ) {
          if ( transportProteinCount === 0 ) {
            if ( hasAnySolutes ) {
              return proteinsShownPotentialShownNoProteinsWithSolutesString;
            }
            else {
              return proteinsShownPotentialShownNoProteinsNoSolutesString;
            }
          }
          else {
            if ( hasAnySolutes ) {
              return proteinsShownPotentialShownWithProteinsWithSolutesString;
            }
            else {
              return proteinsShownPotentialShownWithProteinsNoSolutesString;
            }
          }
        }
        else {
          if ( transportProteinCount === 0 ) {
            if ( hasAnySolutes ) {
              return proteinsShownPotentialHiddenNoProteinsWithSolutesString;
            }
            else {
              return proteinsShownPotentialHiddenNoProteinsNoSolutesString;
            }
          }
          else {
            if ( hasAnySolutes ) {
              return proteinsShownPotentialHiddenWithProteinsWithSolutesString;
            }
            else {
              return proteinsShownPotentialHiddenWithProteinsNoSolutesString;
            }
          }
        }
      }
      else {
        if ( transportProteinCount === 0 ) {
          if ( hasAnySolutes ) {
            return proteinsHiddenPotentialHiddenWithSolutesString;
          }
          else {
            return proteinsHiddenPotentialHiddenNoSolutesString;
          }
        }
        else {
          if ( hasAnySolutes ) {
            return proteinsShownPotentialHiddenWithProteinsWithSolutesString;
          }
          else {
            return proteinsShownPotentialHiddenWithProteinsNoSolutesString;
          }
        }
      }
    } );

    this.accessibleHelpTextContentStringProperty = new DerivedProperty( [
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

    this.accessibleHelpTextStringProperty = MembraneTransportFluent.a11y.cellMembrane.accessibleHelpTextPattern.createProperty( {
      accessibleStateDescription: this.accessibleStateDescriptionStringProperty,
      accessibleHelpText: this.accessibleHelpTextContentStringProperty
    } );
  }
}

membraneTransport.register( 'MembraneDescriber', MembraneDescriber );