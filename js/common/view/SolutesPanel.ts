// Copyright 2025, University of Colorado Boulder

/**
 * In the top left, show radio buttons to select a Solute which can be added to the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import VoicingText from '../../../../scenery/js/accessibility/voicing/nodes/VoicingText.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings, { membrane_transportStringsNewInterface } from '../../MembraneTransportStrings.js';
import MembraneTransportFeatureSet, { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import SoluteType, { getSoluteAccessibleName, getSoluteTypeString, soluteTypeToRadioButtonTandemName } from '../model/SoluteType.js';
import createParticleNode from './particles/createParticleNode.js';

export default class SolutesPanel extends Node {
  public constructor( featureSet: MembraneTransportFeatureSet, soluteProperty: PhetioProperty<SoluteType>, providedOptions: WithRequired<NodeOptions, 'tandem'> ) {
    super();

    const title = new VoicingText( MembraneTransportStrings.solutesStringProperty, {
      fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE,
      maxWidth: 200
    } );

    const alignGroup = new AlignGroup();

    const soluteTypes = getFeatureSetSoluteTypes( featureSet ).filter( soluteType => {
      return soluteType !== 'phosphate' && soluteType !== 'adp';
    } );

    const soluteRadioButtonGroup = new RectangularRadioButtonGroup( soluteProperty, soluteTypes.map( soluteType => {
      return {
        value: soluteType,
        tandemName: soluteTypeToRadioButtonTandemName( soluteType ),
        options: {

          accessibleName: getSoluteAccessibleName( soluteType )
        },
        createNode: () => {

          const icon = createParticleNode( soluteType );

          // We want to keep the relative sizes correct for the gas solutes and the icons
          // but the ATP and Glucose are much larger, so we scale them down.
          icon.setScaleMagnitude( soluteType === 'atp' ? 0.045 :
                                  soluteType === 'glucose' ? 0.09 :
                                  0.1 );

          return alignGroup.createBox( new VBox( {
            spacing: 3,
            children: [
              new VStrut( 2 ),
              icon,
              new RichText( getSoluteTypeString( soluteType ), {
                font: MembraneTransportConstants.FONT,

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
      phetioVisiblePropertyInstrumented: false,
      accessibleName: MembraneTransportStrings.solutesStringProperty,

      // The Voicing hint for this component is the same as the help text for the entire solute controls panel.
      voicingHintResponse: membrane_transportStringsNewInterface.soluteControlsAccessibleHelpText
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