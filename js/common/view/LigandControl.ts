// Copyright 2025, University of Colorado Boulder

/**
 * LigandControl.ts shows an Add Ligands or Remove Ligands button for screens that support ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Text from '../../../../scenery/js/nodes/Text.js';
import BooleanRectangularToggleButton from '../../../../sun/js/buttons/BooleanRectangularToggleButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import MembraneChannelsColors from '../MembraneChannelsColors.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

const TEXT_OPTIONS = {
  fontSize: 14,
  maxWidth: 160
} as const;

export default class LigandControl extends BooleanRectangularToggleButton {
  public constructor( model: MembraneChannelsModel, tandem: Tandem ) {

    const trueNode = new Text( MembraneChannelsStrings.removeLigandsStringProperty, TEXT_OPTIONS );
    const falseNode = new Text( MembraneChannelsStrings.addLigandsStringProperty, TEXT_OPTIONS );

    super( model.areLigandsAddedProperty, trueNode, falseNode, {
      baseColor: MembraneChannelsColors.ligandButtonColorProperty,
      tandem: tandem,

      // pdom
      accessibleHelpText: MembraneChannelsMessages.ligandControlAccessibleHelpTextMessageProperty
    } );

    // TODO: High level API for context responses?
    // TODO: What if you set areLigandsAddedProperty programmatically?
    model.areLigandsAddedProperty.link( areLigandsAdded => {
      if ( areLigandsAdded ) {
        this.alertDescriptionUtterance( MembraneChannelsMessages.ligandControlAddedContextResponseMessageProperty );
      }
      else {
        this.alertDescriptionUtterance( MembraneChannelsMessages.ligandControlRemovedContextResponseMessageProperty );
      }
    } );
  }
}
membraneChannels.register( 'LigandControl', LigandControl );