// Copyright 2025, University of Colorado Boulder

/**
 * Membrane potential panel for the membrane transport simulation, shown in the bottom right, only in certain screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { linear } from '../../../../dot/js/util/linear.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import VoicingText from '../../../../scenery/js/accessibility/voicing/nodes/VoicingText.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Line, { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

export default class MembranePotentialPanel extends Panel {
  public constructor( model: MembraneTransportModel, tandem: Tandem ) {

    const membranePotentialControlTandem = tandem.createTandem( 'membranePotentialControl' );

    const membranePotentialRadioButtonGroup = new RectangularRadioButtonGroup( model.membranePotentialProperty, [ {
      value: -70,
      createNode: tandem => new Text( '-70', MembraneTransportConstants.TEXT_OPTIONS ),
      tandemName: 'negative70RadioButton',
      options: {
        accessibleName: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative70RadioButton.accessibleNameStringProperty,
        phetioVisiblePropertyInstrumented: false
      }
    },
      {
        value: -50,
        createNode: tandem => new Text( '-50', MembraneTransportConstants.TEXT_OPTIONS ),
        tandemName: 'negative50RadioButton',
        options: {
          accessibleName: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.negative50RadioButton.accessibleNameStringProperty,
          phetioVisiblePropertyInstrumented: false
        }
      },
      {
        value: 30,
        createNode: tandem => new Text( '+30', MembraneTransportConstants.TEXT_OPTIONS ),
        tandemName: 'positive30RadioButton',
        options: {
          accessibleName: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.positive30RadioButton.accessibleNameStringProperty,
          phetioVisiblePropertyInstrumented: false
        }
      } ], {
      orientation: 'horizontal',
      accessibleName: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty,
      tandem: membranePotentialControlTandem.createTandem( 'membranePotentialRadioButtonGroup' ),
      phetioVisiblePropertyInstrumented: false,
      spacing: 25,
      layoutOptions: {

        // A margin so that there is extra space between the radio button group and the arrow line
        topMargin: 6
      }
    } );

    const arrowNode = new ArrowNode( 0, 0, 160, 0, {
      fill: 'black',
      stroke: null,
      tailWidth: 2,
      doubleHead: true
    } );

    const membranePotentialControlVBox = new VBox( {
      spacing: 4,
      align: 'center',
      children: [
        new VoicingText( MembraneTransportFluent.membranePotentialMVStringProperty, {
          maxWidth: 160,
          font: MembraneTransportConstants.FONT,

          // This is a "mouse only" reading block. It is clickable but not in the traversal order. See
          // https://github.com/phetsims/membrane-transport/issues/240.
          readingBlockTagName: null,

          // The PDOM content for this text is covered by the accessibleName of the radio button group.
          accessibleParagraph: null,

          // This reading block uses a different name response that does not include the units.
          readingBlockNameResponse: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleNameStringProperty,
          readingBlockHintResponse: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.membranePotential.radioButtonGroup.accessibleHelpTextStringProperty
        } ),

        arrowNode,

        membranePotentialRadioButtonGroup
      ]
    } );

    // Connect lines from the radio buttons to their corresponding positions on the arrow
    const lineOptions: LineOptions = {
      stroke: 'black',
      lineWidth: 1
    };

    const lineNegative70 = new Line( 0, 0, 0, 0, lineOptions );
    const tickNegative70 = new Line( 0, 0, 0, 0, lineOptions );
    const lineNegative50 = new Line( 0, 0, 0, 0, lineOptions );
    const tickNegative50 = new Line( 0, 0, 0, 0, lineOptions );
    const linePositive30 = new Line( 0, 0, 0, 0, lineOptions );
    const tickPositive30 = new Line( 0, 0, 0, 0, lineOptions );

    // The zero tick mark has a lineWidth of 2 so that it does not look like it is pointing to the -50 mV button.
    const tickZero = new Line( 0, 0, 0, 0, combineOptions<LineOptions>( {}, lineOptions, { lineWidth: 2 } ) );

    const membranePotentialControl = new Node( {
      tandem: membranePotentialControlTandem,
      children: [
        membranePotentialControlVBox,
        lineNegative70,
        lineNegative50,
        linePositive30,
        tickNegative70,
        tickNegative50,
        tickPositive30,
        tickZero
      ]
    } );

    const vbox = new VBox( {
      spacing: 4,
      align: 'center',
      children: [

        membranePotentialControl,

        new Checkbox( model.chargesVisibleProperty, new Text( MembraneTransportFluent.chargesStringProperty, {
          maxWidth: 140,
          font: MembraneTransportConstants.FONT
        } ), {
          layoutOptions: {
            align: 'left',
            topMargin: 6
          },
          touchAreaXDilation: 5,
          touchAreaYDilation: 5,
          tandem: tandem.createTandem( 'chargesCheckbox' ),
          accessibleHelpText: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseUnchecked: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseUncheckedStringProperty,
          accessibleContextResponseChecked: DerivedProperty.fromRecord( model.membranePotentialProperty, {
            [ -70 ]: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedNegative70StringProperty,
            [ -50 ]: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedNegative50StringProperty,
            30: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.accessibleContextResponseCheckedPositive30StringProperty
          } ),

          // The Voicing hint response is requested to be less verbose than the accessibleHelpText, see https://github.com/phetsims/membrane-transport/issues/254.
          voicingHintResponse: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.chargesCheckbox.voicingHelpTextStringProperty,
          boxWidth: MembraneTransportConstants.FONT.getNumericSize()
        } )
      ]
    } );

    const content = new Node( {
      children: [
        vbox
      ]
    } );

    super( content, {
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS,
      stroke: null,
      fill: null,
      tandem: tandem
    } );

    const button1 = membranePotentialRadioButtonGroup.getButtonForValue( -70 );
    const button2 = membranePotentialRadioButtonGroup.getButtonForValue( -50 );
    const button3 = membranePotentialRadioButtonGroup.getButtonForValue( 30 );
    ManualConstraint.create( this, [ arrowNode, button1, button2, button3, lineNegative70 ], ( arrowNodeProxy, button1Proxy, line1Proxy ) => {

      const INSET = 30;

      // linear map to find positions along the arrow, extending range to -70 to +70
      const a = linear( -70, 70, arrowNode.globalBounds.left + INSET, arrowNode.globalBounds.right - INSET, -70 );
      const b = linear( -70, 70, arrowNode.globalBounds.left + INSET, arrowNode.globalBounds.right - INSET, -50 );
      const c = linear( -70, 70, arrowNode.globalBounds.left + INSET, arrowNode.globalBounds.right - INSET, 30 );
      const zeroPosition = linear( -70, 70, arrowNode.globalBounds.left + INSET, arrowNode.globalBounds.right - INSET, 0 );

      lineNegative70.setPoint1( lineNegative70.globalToParentPoint( button1.globalBounds.centerTop ) );
      lineNegative70.setPoint2( lineNegative70.globalToParentPoint( new Vector2( a, arrowNode.globalBounds.centerY ) ) );

      lineNegative50.setPoint1( lineNegative50.globalToParentPoint( button2.globalBounds.centerTop ) );
      lineNegative50.setPoint2( lineNegative50.globalToParentPoint( new Vector2( b, arrowNode.globalBounds.centerY ) ) );

      linePositive30.setPoint1( linePositive30.globalToParentPoint( button3.globalBounds.centerTop ) );
      linePositive30.setPoint2( linePositive30.globalToParentPoint( new Vector2( c, arrowNode.globalBounds.centerY ) ) );

      tickNegative70.setPoint1( lineNegative70.p2 );
      tickNegative70.setPoint2( lineNegative70.p2.plusXY( 0, -5 ) );

      tickNegative50.setPoint1( lineNegative50.p2 );
      tickNegative50.setPoint2( lineNegative50.p2.plusXY( 0, -5 ) );

      tickPositive30.setPoint1( linePositive30.p2 );
      tickPositive30.setPoint2( linePositive30.p2.plusXY( 0, -5 ) );

      // Add zero tickmark at center without text label
      const zeroPoint = tickZero.globalToParentPoint( new Vector2( zeroPosition, arrowNode.globalBounds.centerY ) );
      tickZero.setPoint1( zeroPoint.plusXY( 0, 5 ) );
      tickZero.setPoint2( zeroPoint.plusXY( 0, -5 ) );
    } );
  }
}

membraneTransport.register( 'MembranePotentialPanel', MembranePotentialPanel );