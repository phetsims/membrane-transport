// Copyright 2025, University of Colorado Boulder

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, Node, NodeOptions, RichText, Text, VBox, VStrut } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import MembraneChannelsFeatureSet, { getFeatureSetSoluteTypes } from '../MembraneChannelsFeatureSet.js';
import SoluteType, { getSoluteAccessibleName, getSoluteTypeString, soluteTypeToRadioButtonTandemName } from '../model/SoluteType.js';
import getSoluteNode from './solutes/getSoluteNode.js';

/**
 * In the top left, show radio buttons to select a Solute which can be added to the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SolutesPanel extends Node {
  public constructor( featureSet: MembraneChannelsFeatureSet, selectedSoluteProperty: PhetioProperty<SoluteType>, providedOptions: WithRequired<NodeOptions, 'tandem'> ) {
    super();

    const title = new Text( membraneChannelsStrings.solutesStringProperty, {
      fontSize: MembraneChannelsConstants.PANEL_TITLE_FONT_SIZE,
      maxWidth: 200
    } );

    const alignGroup = new AlignGroup();

    const soluteTypes = getFeatureSetSoluteTypes( featureSet );

    const soluteRadioButtonGroup = new RectangularRadioButtonGroup( selectedSoluteProperty, soluteTypes.map( soluteType => {
      return {
        value: soluteType,
        tandemName: soluteTypeToRadioButtonTandemName( soluteType ),
        options: {

          accessibleName: getSoluteAccessibleName( soluteType )
        },
        createNode: () => {

          const icon = getSoluteNode( soluteType );
          icon.setScaleMagnitude( 0.65 ); // TODO: Match with SoluteBarChartNode?

          return alignGroup.createBox( new VBox( {
            spacing: 3,
            children: [
              new VStrut( 2 ),
              icon,
              // TODO: The texts will be different size and different y position. Maybe they should share a maxWidth sort of thing?
              new RichText( getSoluteTypeString( soluteType ), {
                font: new PhetFont( 14 ),
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
      justify: 'left',
      lineSpacing: 5,
      spacing: 5,
      tandem: providedOptions.tandem.createTandem( 'soluteRadioButtonGroup' ),
      accessibleName: MembraneChannelsStrings.solutesStringProperty,
      helpText: MembraneChannelsMessages.soluteRadioButtonGroupHelpTextMessageProperty
    } );

    // Must be wrapped in an intermediate node to allow the wrap: true to work. Otherwise, the vbox squeezes it horizontally
    // and we end up with one column.
    const wrapperNode = new Node( {
      children: [ soluteRadioButtonGroup ]
    } );
    const content = new VBox( {
      children: [ title,

        wrapperNode
      ],
      spacing: 5
    } );
    const panel = new Panel( content );
    this.addChild( panel );

    this.mutate( providedOptions );
  }
}

membraneChannels.register( 'SolutesPanel', SolutesPanel );