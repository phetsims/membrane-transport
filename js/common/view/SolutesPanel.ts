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
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportFeatureSet, { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import SoluteType, { getSoluteAccessibleName, getSoluteTypeString, soluteTypeToRadioButtonTandemName } from '../model/SoluteType.js';
import createParticleIconNode from './particles/createParticleIconNode.js';

export default class SolutesPanel extends Node {
  public constructor( featureSet: MembraneTransportFeatureSet, soluteProperty: PhetioProperty<SoluteType>, providedOptions: WithRequired<NodeOptions, 'tandem'> ) {
    super();

    const title = new VoicingText( MembraneTransportFluent.solutesStringProperty, {
      fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE,
      maxWidth: 60,

      // pdom - remove, this content will come from the accessibleName of the radio button group instead
      accessibleParagraph: null,

      // The Voicing Hint Response for this reading block is the same as the accessibleHelpText
      // for the entire panel.
      readingBlockHintResponse: MembraneTransportFluent.a11y.soluteControls.accessibleHelpTextStringProperty
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

          const icon = createParticleIconNode( soluteType );

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
      orientation: 'vertical',
      spacing: 5,
      tandem: providedOptions.tandem.createTandem( 'soluteRadioButtonGroup' ),
      phetioVisiblePropertyInstrumented: false,
      accessibleName: MembraneTransportFluent.solutesStringProperty,
      accessibleHelpText: MembraneTransportFluent.a11y.solutesPanel.accessibleHelpTextStringProperty,

      // Not supposed to be read on focus, see https://github.com/phetsims/membrane-transport/issues/240#issuecomment-2992343983
      speakVoicingNameResponseOnFocus: false
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
    const panel = new Panel( content, {
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS
    } );
    this.addChild( panel );

    this.mutate( providedOptions );
  }
}

membraneTransport.register( 'SolutesPanel', SolutesPanel );