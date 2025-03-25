// Copyright 2025, University of Colorado Boulder

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportFeatureSet, { getFeatureSetSoluteTypesForSolutesPanel } from '../MembraneTransportFeatureSet.js';
import SoluteType, { getSoluteAccessibleName, getSoluteTypeString, soluteTypeToRadioButtonTandemName } from '../model/SoluteType.js';
import getParticleNode from './particles/getParticleNode.js';

/**
 * In the top left, show radio buttons to select a Solute which can be added to the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SolutesPanel extends Node {
  public constructor( featureSet: MembraneTransportFeatureSet, selectedSoluteProperty: PhetioProperty<SoluteType>, providedOptions: WithRequired<NodeOptions, 'tandem'> ) {
    super();

    const title = new Text( MembraneTransportStrings.solutesStringProperty, {
      fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE,
      maxWidth: 200
    } );

    const alignGroup = new AlignGroup();

    const soluteTypes = getFeatureSetSoluteTypesForSolutesPanel( featureSet );

    const soluteRadioButtonGroup = new RectangularRadioButtonGroup( selectedSoluteProperty, soluteTypes.map( soluteType => {
      return {
        value: soluteType,
        tandemName: soluteTypeToRadioButtonTandemName( soluteType ),
        options: {

          accessibleName: getSoluteAccessibleName( soluteType )
        },
        createNode: () => {

          const icon = getParticleNode( soluteType );
          icon.setScaleMagnitude( MembraneTransportConstants.PARTICLE_NODE_ICON_SCALE );

          return alignGroup.createBox( new VBox( {
            spacing: 3,
            children: [
              new VStrut( 2 ),
              icon,
              new RichText( getSoluteTypeString( soluteType ), {
                font: new PhetFont( 14 ),

                // Reduced so that at max length, the radio buttons still take 2 rows x 3 columns
                maxWidth: 53
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
      accessibleName: MembraneTransportStrings.solutesStringProperty,
      accessibleHelpText: MembraneTransportMessages.soluteRadioButtonGroupHelpTextMessageProperty
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

membraneTransport.register( 'SolutesPanel', SolutesPanel );