// Copyright 2025, University of Colorado Boulder

/**
 * LigandControl.ts shows an Add Ligands or Remove Ligands button for screens that support ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Text from '../../../../scenery/js/nodes/Text.js';
import BooleanRectangularToggleButton from '../../../../sun/js/buttons/BooleanRectangularToggleButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportColors from '../MembraneTransportColors.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

const TEXT_OPTIONS = {
  fontSize: 14,
  maxWidth: 160
} as const;

export default class LigandControl extends BooleanRectangularToggleButton {
  public constructor( model: MembraneTransportModel, tandem: Tandem ) {

    const trueNode = new Text( MembraneTransportStrings.removeLigandsStringProperty, TEXT_OPTIONS );
    const falseNode = new Text( MembraneTransportStrings.addLigandsStringProperty, TEXT_OPTIONS );

    super( model.areLigandsAddedProperty, trueNode, falseNode, {
      baseColor: MembraneTransportColors.ligandButtonColorProperty,
      tandem: tandem,

      // pdom
      accessibleHelpText: MembraneTransportMessages.ligandControlAccessibleHelpTextMessageProperty
    } );

    // TODO: High level API for context responses?
    // TODO: What if you set areLigandsAddedProperty programmatically?
    model.areLigandsAddedProperty.link( areLigandsAdded => {
      if ( areLigandsAdded ) {
        this.alertDescriptionUtterance( MembraneTransportMessages.ligandControlAddedContextResponseMessageProperty );
      }
      else {
        this.alertDescriptionUtterance( MembraneTransportMessages.ligandControlRemovedContextResponseMessageProperty );
      }
    } );
  }
}
membraneTransport.register( 'LigandControl', LigandControl );