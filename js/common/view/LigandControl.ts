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


export default class LigandControl extends Node {
  public constructor( model: MembraneChannelsModel, tandem: Tandem, providedOptions: NodeOptions ) {

    // Align so the buttons are the same size.
    const alignGroup = new AlignGroup();

    // Separate buttons to make a11y navigation easier
    const options = combineOptions<NodeOptions>( {
      children: [

        // TODO: Should be combined into one button so that spacebar can toggle it on and off.
        new RectangularPushButton( {
          baseColor: MembraneChannelsColors.ligandButtonColorProperty,
          content: alignGroup.createBox( new Text( MembraneChannelsStrings.addLigandsStringProperty, {
            fontSize: 14
          } ) ),
          tandem: tandem.createTandem( 'addLigandsButton' ),
          visibleProperty: DerivedProperty.not( model.areLigandsAddedProperty ),
          listener: () => model.areLigandsAddedProperty.set( true )
        } ),
        new RectangularPushButton( {
          baseColor: MembraneChannelsColors.ligandButtonColorProperty,
          content: alignGroup.createBox( new Text( MembraneChannelsStrings.removeLigandsStringProperty, {
            fontSize: 14
          } ) ),
          tandem: tandem.createTandem( 'removeLigandsButton' ),
          visibleProperty: model.areLigandsAddedProperty,
          listener: () => model.areLigandsAddedProperty.set( false )
        } )
      ]
    }, providedOptions );
    super( options );
  }
}
membraneChannels.register( 'LigandControl', LigandControl );