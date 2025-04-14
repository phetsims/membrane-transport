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
  fontSize: 12,
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
    // TODO: What if you set areLigandsAddedProperty programmatically? Should it speak when changed with phet-io? - lets discuss with design.
    //   We could have a shut-off valve for all responses when something is set by PhET-iO.
    //   OR The high level API could speak the response from user input (like sound implementation, see produceSoundEmitter)
    //   Consensus: We should not speak when the model changes, only when the user interacts with the UI. The screen summary "current details" will mention whether ligands are here or not.
    model.areLigandsAddedProperty.lazyLink( areLigandsAdded => {
      if ( areLigandsAdded ) {
        this.addAccessibleResponse( MembraneTransportMessages.ligandControlAddedContextResponseMessageProperty );
      }
      else {
        this.addAccessibleResponse( MembraneTransportMessages.ligandControlRemovedContextResponseMessageProperty );
      }
    } );
  }
}
membraneTransport.register( 'LigandControl', LigandControl );