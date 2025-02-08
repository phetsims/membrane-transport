// Copyright 2025, University of Colorado Boulder

import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

/**
 * Membrane potential panel for the membrane channels simulation, shown in the bottom right, only in certain screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembranePotentialPanel extends Panel {
  public constructor( model: MembraneChannelsModel, tandem: Tandem ) {

    const membraneVoltagePotentialRadioButtonGroup = new RectangularRadioButtonGroup( model.membraneVoltagePotentialProperty, [ {
      value: '-70',
      createNode: tandem => new Text( '-70' ),
      tandemName: 'minus70RadioButton'
    },
      {
        value: '-50',
        createNode: tandem => new Text( '-50' ),
        tandemName: 'minus50RadioButton'
      },
      {
        value: '30',
        createNode: tandem => new Text( '+30' ),
        tandemName: 'plus30RadioButton'
      } ], {
      orientation: 'horizontal',
      tandem: tandem.createTandem( 'membraneVoltagePotentialRadioButtonGroup' )
    } );

    const content = new VBox( {
      spacing: 10,
      align: 'left',
      children: [
        new Checkbox( model.isShowingMembranePotentialLabelsProperty, new Text( MembraneChannelsStrings.membranePotentialLabelsStringProperty ), {
          tandem: tandem.createTandem( 'membranePotentialLabelsCheckbox' )
        } ),
        new Text( MembraneChannelsStrings.membraneVoltagePotentialmVStringProperty ),

        membraneVoltagePotentialRadioButtonGroup

        // new NumberControl( MembraneChannelsStrings.membraneVoltagePotentialmVStringProperty, model.membraneVoltagePotentialProperty, new Range( -70, 30 ), {
        //   delta: 50,
        //   sliderOptions: {
        //
        //     majorTicks: [
        //       { value: -70, label: new Text( '-70' ) },
        //       { value: -50, label: new Text( '-50' ) },
        //       { value: +30, label: new Text( '+30' ) }
        //     ]
        //   },
        //   tandem: tandem.createTandem( 'membraneVoltagePotentialNumberControl' )
        // } )
      ]
    } );
    super( content, {
      tandem: tandem
    } );
  }
}

membraneChannels.register( 'MembranePotentialPanel', MembranePotentialPanel );