// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import LigandControl from './LigandControl.js';
import MembranePotentialPanel from './MembranePotentialPanel.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

// Type definition for transport protein configuration
type TransportProteinConfig = {
  transportProteinType: TransportProteinType;
  labelProperty: TReadOnlyProperty<string>;
  accessibleNameProperty: TReadOnlyProperty<string>;
};

// Type definition for accordion box configuration
type AccordionBoxConfig = {
  titleProperty: TReadOnlyProperty<string>;
  tandemName: string;
  expanded: boolean;
  transportProteins: TransportProteinConfig[];
};

/**
 * Shows the transport proteins which can be dragged into the play area, along with their respective controls, if any.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class TransportProteinPanel extends Panel {
  public readonly resetEmitter = new Emitter();

  // So we can return TransportProteinDragNode instances to their corresponding TransportProteinToolNode icons
  private readonly transportProteinToolNodes: Map<TransportProteinType, TransportProteinToolNode>;

  public constructor( model: MembraneTransportModel, tandem: Tandem, view: MembraneTransportScreenView ) {

    const fontSize = 14;

    const panels: Panel[] = [];

    // put all titles in an align box so they take up the same amount of space
    const titleAlignGroup = new AlignGroup();

    const transportProteinToolNodes = new Map<TransportProteinType, TransportProteinToolNode>();

    /**
     * Creates an accordion box based on the provided configuration
     */
    const createPanel = ( config: AccordionBoxConfig, ...additionalControls: Node[] ): Panel => {
      const content = new HBox( {
        spacing: 10,
        children: config.transportProteins.map( transportProtein => {
            const transportProteinToolNode = new TransportProteinToolNode(
              transportProtein.transportProteinType,
              transportProtein.labelProperty,
              transportProtein.accessibleNameProperty,
              view
            );
            transportProteinToolNodes.set( transportProtein.transportProteinType, transportProteinToolNode );
            return transportProteinToolNode;
          }
        )
      } );

      // TODO: Get rid of the accordion boxes, they will just be labels and always open.
      return new Panel( new VBox( {
        spacing: 5, // spacing between the title and the content
        children: [
          titleAlignGroup.createBox( new Text( config.titleProperty, { fontSize: fontSize, maxWidth: 150 } ), { xAlign: 'left' } ),
          // contentAlignGroup.createBox( content ),
          content,
          ...additionalControls
        ]
      } ), {
        cornerRadius: 0,
        stroke: null
      } );
    };

    if ( model.featureSet === 'facilitatedDiffusion' || model.featureSet === 'playground' ) {

      // Leakage channels
      const leakageAccordionBox = createPanel( {
        titleProperty: MembraneTransportStrings.leakageChannelsStringProperty,
        tandemName: 'leakageChannelsAccordionBox',
        expanded: true,
        transportProteins: [
          {
            transportProteinType: 'sodiumIonLeakageChannel',
            labelProperty: new StringProperty( 'Na+' ), // TODO: i18n
            accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.leakageChannelsAccordionBox.sodiumIonNaPlusLeakageStringProperty
          },
          {
            transportProteinType: 'potassiumIonLeakageChannel',
            labelProperty: new StringProperty( 'K+' ), // TODO: i18n
            accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.leakageChannelsAccordionBox.potassiumIonKPlusLeakageStringProperty
          }
        ]
      } );

      // Voltage-gated channels
      const voltageGatedAccordionBox = createPanel( {
          titleProperty: MembraneTransportStrings.voltageGatedChannelsStringProperty,
          tandemName: 'voltageGatedChannelsAccordionBox',
          expanded: true,
          transportProteins: [
            {
              transportProteinType: 'sodiumIonVoltageGatedChannel',
              labelProperty: new StringProperty( 'Na+' ), // TODO: i18n
              accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.voltageGatedChannelsAccordionBox.sodiumIonNaPlusVoltageGatedStringProperty
            },
            {
              transportProteinType: 'potassiumIonVoltageGatedChannel',
              labelProperty: new StringProperty( 'K+' ), // TODO: i18n
              accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.voltageGatedChannelsAccordionBox.potassiumIonKPlusVoltageGatedStringProperty
            }
          ]
        },
        new MembranePotentialPanel( model, tandem.createTandem( 'membranePotentialPanel' ) )
      );

      // Ligand-gated channels
      const ligandGatedAccordionBox = createPanel( {
        titleProperty: MembraneTransportStrings.ligandGatedChannelsStringProperty,
        tandemName: 'ligandGatedChannelsAccordionBox',
        expanded: true,
        transportProteins: [
          {
            transportProteinType: 'sodiumIonLigandGatedChannel',
            labelProperty: new StringProperty( 'Na+' ), // TODO: i18n
            accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.ligandGatedAccordionBox.sodiumIonNaPlusLigandGatedStringProperty
          },
          {
            transportProteinType: 'potassiumIonLigandGatedChannel',
            labelProperty: new StringProperty( 'K+' ), // TODO: i18n
            accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.ligandGatedAccordionBox.potassiumIonKPlusLigandGatedStringProperty
          }
        ]
      }, new LigandControl( model, tandem.createTandem( 'myLigandToggleButton' ) ) ); // TODO: fix tandem

      panels.push(
        leakageAccordionBox,
        voltageGatedAccordionBox,
        ligandGatedAccordionBox
      );
    }

    if ( model.featureSet === 'activeTransport' || model.featureSet === 'playground' ) {
      // Active transport proteins
      const activeTransportAccordionBox = createPanel( {
        titleProperty: MembraneTransportStrings.activeTransportersStringProperty,
        tandemName: 'activeTransportersAccordionBox',
        expanded: true,
        transportProteins: [
          {
            transportProteinType: 'sodiumPotassiumPump',
            labelProperty: MembraneTransportStrings.NaPlusKPlusPumpStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.activeTransportersAccordionBox.sodiumPotassiumPumpStringProperty
          },
          {
            transportProteinType: 'sodiumGlucoseCotransporter',
            labelProperty: MembraneTransportStrings.sodiumGlucoseCotransporterStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.accordionBoxGroup.activeTransportersAccordionBox.sodiumGlucoseCotransporterStringProperty
          }
        ]
      } );

      panels.push( activeTransportAccordionBox );
    }

    const interleaveHSeparators = ( nodes: Node[] ) => {
      const result: Node[] = [];
      for ( let i = 0; i < nodes.length; i++ ) {
        if ( i > 0 ) {
          result.push( new HSeparator( { stroke: 'lightGray', lineWidth: 1 } ) );
        }
        result.push( nodes[ i ] );
      }
      return result;
    };
    const vbox = new VBox( {
      spacing: 0,
      children: interleaveHSeparators( panels )
    } );
    super( vbox, {
      tagName: 'div',
      labelTagName: 'h3',
      accessibleName: MembraneTransportStrings.a11y.accordionBoxGroup.transportProteinsStringProperty,
      accessibleHelpText: MembraneTransportStrings.a11y.accordionBoxGroup.accessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );

    this.mutate( { left: 20, top: 20 } );
    this.transportProteinToolNodes = transportProteinToolNodes;
  }

  public reset(): void {
    this.resetEmitter.emit();
  }

  public getTransportProteinToolNode( transportProteinType: TransportProteinType ): TransportProteinToolNode {
    return this.transportProteinToolNodes.get( transportProteinType )!;
  }
}

membraneTransport.register( 'TransportProteinPanel', TransportProteinPanel );