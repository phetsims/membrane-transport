// Copyright 2025, University of Colorado Boulder

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, Node, Rectangle, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import SoluteType, { getSoluteBarChartColorProperty, getSoluteTypeString, SoluteTypes, soluteTypeToRadioButtonTandemName } from '../model/SoluteType.js';

/**
 * In the top left, show radio buttons to select a Solute which can be added to the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class SolutesPanel extends Node {
  public constructor( selectedSoluteProperty: PhetioProperty<SoluteType>, tandem: Tandem ) {
    super( {
      tandem: tandem
    } );

    const title = new Text( membraneChannelsStrings.solutesStringProperty, {
      fontSize: MembraneChannelsConstants.PANEL_TITLE_FONT_SIZE,
      maxWidth: 200
    } );

    const alignGroup = new AlignGroup();

    const soluteRadioButtonGroup = new RectangularRadioButtonGroup( selectedSoluteProperty, SoluteTypes.map( soluteType => {
      return {
        value: soluteType,
        tandemName: soluteTypeToRadioButtonTandemName( soluteType ),
        createNode: tandem => {
          return alignGroup.createBox( new VBox( {
            spacing: 2,
            children: [

              // TODO: Hack idea to center the icons in the buttons. Probably a bad idea.
              new RichText( getSoluteTypeString( soluteType ), {
                font: new PhetFont( 12 ),
                maxWidth: 100,
                opacity: 0
              } ),

              new Rectangle( 0, 0, 50, 25, {
              fill: soluteType === 'atp' ? 'black' : getSoluteBarChartColorProperty( soluteType )
            } ),

              // TODO: The texts will be different size and different y position. Maybe they should share a maxWidth sort of thing?
              new RichText( getSoluteTypeString( soluteType ), {
                font: new PhetFont( 12 ),
                maxWidth: 100
              } ) ]
          } ) );
        }
      };
    } ), {
      orientation: 'horizontal',
      wrap: true,
      justifyLines: 'top',
      preferredWidth: 200,
      lineSpacing: 5,
      spacing: 5,
      tandem: tandem.createTandem( 'soluteRadioButtonGroup' )
    } );

    const myNode = new Node( {
      children: [ soluteRadioButtonGroup ]
    } );
    const content = new VBox( {
      children: [ title,

        myNode
      ],
      spacing: 5
    } );
    const panel = new Panel( content );
    this.addChild( panel );
  }
}

membraneChannels.register( 'SolutesPanel', SolutesPanel );