// Copyright 2025, University of Colorado Boulder

import Range from '../../../../dot/js/Range.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
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
    const content = new VBox( {
      align: 'left',
      children: [
        new Checkbox( model.isShowingMembranePotentialLabelsProperty, new Text( MembraneChannelsStrings.membranePotentialLabelsStringProperty ), {
          tandem: tandem.createTandem( 'membranePotentialLabelsCheckbox' )
        } ),

        new NumberControl( MembraneChannelsStrings.membraneVoltagePotentialmVStringProperty, model.membraneVoltagePotentialProperty, new Range( -70, 30 ), {
          delta: 50,
          sliderOptions: {

            majorTicks: [
              { value: -70, label: new Text( '-70' ) },
              { value: -50, label: new Text( '-50' ) },
              { value: +30, label: new Text( '+30' ) }
            ]
          },
          tandem: tandem.createTandem( 'membraneVoltagePotentialNumberControl' )
        } )
      ]
    } );
    super( content, {
      tandem: tandem
    } );
  }
}

membraneChannels.register( 'MembranePotentialPanel', MembranePotentialPanel );