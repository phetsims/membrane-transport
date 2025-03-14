// Copyright 2025, University of Colorado Boulder

/**
 * LigandControl.ts shows an Add Ligands or Remove Ligands button for screens that support ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsColors from '../MembraneChannelsColors.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

const TEXT_OPTIONS = {
  fontSize: 14,
  maxWidth: 160
} as const;

export default class LigandControl extends Node {
  public constructor( model: MembraneChannelsModel, tandem: Tandem ) {

    // Align so the buttons are the same size.
    const alignGroup = new AlignGroup();

    const addLigandsButton = new RectangularPushButton( {
      baseColor: MembraneChannelsColors.ligandButtonColorProperty,
      content: alignGroup.createBox( new Text( MembraneChannelsStrings.addLigandsStringProperty, TEXT_OPTIONS ) ),
      tandem: tandem.createTandem( 'addLigandsButton' ),
      visibleProperty: DerivedProperty.not( model.areLigandsAddedProperty ),
      listener: () => {
        model.areLigandsAddedProperty.value = true;
        removeLigandsButton.focus();
      }
    } );

    const removeLigandsButton = new RectangularPushButton( {
      baseColor: MembraneChannelsColors.ligandButtonColorProperty,
      content: alignGroup.createBox( new Text( MembraneChannelsStrings.removeLigandsStringProperty, TEXT_OPTIONS ) ),
      tandem: tandem.createTandem( 'removeLigandsButton' ),
      visibleProperty: model.areLigandsAddedProperty,
      listener: () => {
        model.areLigandsAddedProperty.value = false;
        addLigandsButton.focus();
      }
    } );

    // Separate buttons to make a11y navigation easier
    // TODO (JG): Confirm we don't want a BooleanRectangleToggleButton here, and document why
    const options = combineOptions<NodeOptions>( {
      children: [ addLigandsButton, removeLigandsButton ]
    } );
    super( options );
  }
}
membraneChannels.register( 'LigandControl', LigandControl );