// Copyright 2025, University of Colorado Boulder

/**
 * Membrane potential panel for the membrane transport simulation, shown in the bottom right, only in certain screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembranePotentialPanel extends Panel {
  public constructor( model: Pick<MembraneTransportModel, 'membraneVoltagePotentialProperty' | 'isShowingSignsProperty'>, tandem: Tandem ) {

    const membraneVoltagePotentialRadioButtonGroup = new RectangularRadioButtonGroup( model.membraneVoltagePotentialProperty, [ {
      value: -70,
      createNode: tandem => new Text( '-70' ),
      tandemName: 'minus70RadioButton',
      options: {
        accessibleName: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.minus70RadioButton.accessibleNameStringProperty
      }
    },
      {
        value: -50,
        createNode: tandem => new Text( '-50' ),
        tandemName: 'minus50RadioButton',
        options: {
          accessibleName: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.minus50RadioButton.accessibleNameStringProperty
        }
      },
      {
        value: 30,
        createNode: tandem => new Text( '+30' ),
        tandemName: 'plus30RadioButton',
        options: {
          accessibleName: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.plus30RadioButton.accessibleNameStringProperty
        }
      } ], {
      orientation: 'horizontal',
      accessibleName: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty,
      tandem: tandem.createTandem( 'membraneVoltagePotentialRadioButtonGroup' )
    } );

    const content = new VBox( {
      spacing: 4,
      align: 'left',
      children: [

        new Text( MembraneTransportStrings.membranePotential_mVStringProperty, {
          maxWidth: 160,
          fontSize: 14
        } ),

        membraneVoltagePotentialRadioButtonGroup,

        new Checkbox( model.isShowingSignsProperty, new Text( MembraneTransportStrings.signsStringProperty, {
          maxWidth: 140,
          fontSize: 14
        } ), {
          tandem: tandem.createTandem( 'signsCheckbox' ),
          accessibleHelpText: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.accessibleHelpTextStringProperty,
          uncheckedContextResponse: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.signsCheckbox.uncheckedContextResponseStringProperty
        } )
      ]
    } );
    super( content, {
      cornerRadius: 4,
      stroke: null,
      fill: 'rgb(230,229,229)',
      tandem: tandem,

      // pdom
      accessibleHeading: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.accessibleHeadingStringProperty
    } );
  }
}

membraneTransport.register( 'MembranePotentialPanel', MembranePotentialPanel );