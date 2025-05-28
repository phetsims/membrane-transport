// Copyright 2025, University of Colorado Boulder

/**
 * Shows the transport proteins which can be dragged into the play area, along with their respective controls, if any.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
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
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import LigandToggleButton from './LigandToggleButton.js';
import MembranePotentialPanel from './MembranePotentialPanel.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

// Type definition for transport protein configuration
type TransportProteinConfig = {
  transportProteinType: TransportProteinType;
  labelProperty: TReadOnlyProperty<string>;
  accessibleNameProperty: TReadOnlyProperty<string>;
};

// Type definition for Panel configuration
type PanelConfig = {
  titleProperty: TReadOnlyProperty<string>;
  tandemName: string;
  expanded: boolean;
  transportProteins: TransportProteinConfig[];
};

export default class TransportProteinPanel extends Panel {
  public readonly resetEmitter = new Emitter();

  // So we can return TransportProteinDragNode instances to their corresponding TransportProteinToolNode icons
  private readonly transportProteinToolNodes: Map<TransportProteinType, TransportProteinToolNode>;

  public constructor( model: Pick<MembraneTransportModel, 'featureSet' | 'isShowingSignsProperty' | 'membranePotentialProperty' | 'areLigandsAddedProperty'>, tandem: Tandem, view: MembraneTransportScreenView ) {

    const panels: Panel[] = [];

    // put all titles in an align box so they take up the same amount of space
    const titleAlignGroup = new AlignGroup();

    const transportProteinToolNodes = new Map<TransportProteinType, TransportProteinToolNode>();

    /**
     * Creates a Panel based on the provided configuration
     */
    const createPanel = ( config: PanelConfig, ...additionalControls: Node[] ): Panel => {
      const content = new HBox( {
        spacing: 20,
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

      return new Panel( new VBox( {
        spacing: 5, // spacing between the title and the content
        children: [
          titleAlignGroup.createBox( new Text( config.titleProperty, { fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE, maxWidth: 175 } ), { xAlign: 'center' } ),
          content,
          ...additionalControls
        ]
      } ), {
        cornerRadius: 0,
        stroke: null,

        // Expand the width of these panels so that they are about the same width as the solutes controls.
        minWidth: 200,

        // pdom
        accessibleHeading: config.titleProperty
      } );
    };

    if ( model.featureSet === 'facilitatedDiffusion' || model.featureSet === 'playground' ) {

      // Leakage channels
      const leakageChannelPanel = createPanel( {
        titleProperty: MembraneTransportStrings.leakageChannelsStringProperty,
        tandemName: 'leakageChannelPanel',
        expanded: true,
        transportProteins: [
          {
            transportProteinType: 'sodiumIonLeakageChannel',
            labelProperty: MembraneTransportStrings.sodiumIonStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty
          },
          {
            transportProteinType: 'potassiumIonLeakageChannel',
            labelProperty: MembraneTransportStrings.potassiumIonStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty
          }
        ]
      } );

      // Voltage-gated channels
      const voltageGatedChannelPanel = createPanel( {
          titleProperty: MembraneTransportStrings.voltageGatedChannelsStringProperty,
          tandemName: 'voltageGatedChannelPanel',
          expanded: true,
          transportProteins: [
            {
              transportProteinType: 'sodiumIonVoltageGatedChannel',
              labelProperty: MembraneTransportStrings.sodiumIonStringProperty,
              accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty
            },
            {
              transportProteinType: 'potassiumIonVoltageGatedChannel',
              labelProperty: MembraneTransportStrings.potassiumIonStringProperty,
              accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty
            }
          ]
        },
        new MembranePotentialPanel( model, tandem.createTandem( 'membranePotentialPanel' ) )
      );

      // Ligand-gated channels
      const ligandGatedChannelPanel = createPanel( {
        titleProperty: MembraneTransportStrings.ligandGatedChannelsStringProperty,
        tandemName: 'ligandGatedChannelPanel',
        expanded: true,
        transportProteins: [
          {
            transportProteinType: 'sodiumIonLigandGatedChannel',
            labelProperty: MembraneTransportStrings.sodiumIonStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty
          },
          {
            transportProteinType: 'potassiumIonLigandGatedChannel',
            labelProperty: MembraneTransportStrings.potassiumIonStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty
          }
        ]
      }, new LigandToggleButton( model, tandem.createTandem( 'ligandToggleButton' ) ) );

      panels.push(
        leakageChannelPanel,
        voltageGatedChannelPanel,
        ligandGatedChannelPanel
      );
    }

    if ( model.featureSet === 'activeTransport' || model.featureSet === 'playground' ) {

      // Active transport proteins
      const activeTransportProteinPanel = createPanel( {
        titleProperty: MembraneTransportStrings.activeTransportersStringProperty,
        tandemName: 'activeTransportProteinPanel',
        expanded: true,
        transportProteins: [
          {
            transportProteinType: 'sodiumPotassiumPump',
            labelProperty: MembraneTransportStrings.NaPlusKPlusPumpStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty
          },
          {
            transportProteinType: 'sodiumGlucoseCotransporter',
            labelProperty: MembraneTransportStrings.sodiumGlucoseCotransporterStringProperty,
            accessibleNameProperty: MembraneTransportStrings.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty
          }
        ]
      } );

      panels.push( activeTransportProteinPanel );
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
      accessibleHeading: MembraneTransportStrings.a11y.transportProteinPanel.transportProteinsStringProperty,
      accessibleHelpText: MembraneTransportStrings.a11y.transportProteinPanel.accessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );

    this.mutate( { left: 20, top: 20 } );
    this.transportProteinToolNodes = transportProteinToolNodes;
  }

  public reset(): void {
    this.resetEmitter.emit();
  }

  public getTransportProteinToolNode( transportProteinType: TransportProteinType ): TransportProteinToolNode {
    const transportProteinToolNode = this.transportProteinToolNodes.get( transportProteinType );
    affirm( transportProteinToolNode, `TransportProteinToolNode not found for type: ${transportProteinType}` );
    return transportProteinToolNode;
  }
}

membraneTransport.register( 'TransportProteinPanel', TransportProteinPanel );