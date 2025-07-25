// Copyright 2025, University of Colorado Boulder

/**
 * Shows the transport proteins which can be dragged into the play area, along with their respective controls, if any.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import VoicingText from '../../../../scenery/js/accessibility/voicing/nodes/VoicingText.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
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
  accessibleNameStringProperty: TReadOnlyProperty<string>;
};

// Type definition for Panel configuration
type PanelConfig = {
  titleProperty: TReadOnlyProperty<string>;
  tandemName: string;
  expanded: boolean;
  transportProteins: TransportProteinConfig[];
  accessibleHelpTextStringProperty?: TReadOnlyProperty<string>;
};

export default class TransportProteinPanel extends Panel {
  public readonly resetEmitter = new Emitter();

  // So we can return TransportProteinDragNode instances to their corresponding TransportProteinToolNode icons
  private readonly transportProteinToolNodes: Map<TransportProteinType, TransportProteinToolNode>;

  public constructor( model: MembraneTransportModel, tandem: Tandem, view: MembraneTransportScreenView ) {

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
              transportProtein.accessibleNameStringProperty,
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
          titleAlignGroup.createBox( new VoicingText( config.titleProperty, {
            fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE,
            maxWidth: 175,

            // Setting this removes it from the tab focus order
            readingBlockTagName: null,

            // Setting this removes an unnecessary duplicate from the PDOM
            accessibleParagraph: null

          } ), { xAlign: 'center' } ),
          content,
          ...additionalControls
        ]
      } ), {
        cornerRadius: 0,
        stroke: null,

        // Expand the width of these panels so that they are about the same width as the solutes controls.
        minWidth: 200,

        // pdom
        accessibleHeading: config.titleProperty,
        accessibleHelpText: config.accessibleHelpTextStringProperty,

        // phet-io
        tandem: tandem.createTandem( config.tandemName ),
        visiblePropertyOptions: {
          phetioFeatured: true
        }
      } );
    };

    if ( model.featureSet === 'facilitatedDiffusion' || model.featureSet === 'playground' ) {

      // Leakage channels
      const leakageChannelPanel = createPanel( {
        titleProperty: MembraneTransportFluent.transportProteinPanel.leakageChannelsStringProperty,
        tandemName: 'leakageChannelPanel',
        expanded: true,
        accessibleHelpTextStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.leakageChannelPanel.accessibleHelpTextStringProperty,
        transportProteins: [
          {
            transportProteinType: 'sodiumIonLeakageChannel',
            labelProperty: MembraneTransportFluent.soluteNames.sodiumIonStringProperty,
            accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.leakageChannelPanel.sodiumIonNaPlusLeakageStringProperty
          },
          {
            transportProteinType: 'potassiumIonLeakageChannel',
            labelProperty: MembraneTransportFluent.soluteNames.potassiumIonStringProperty,
            accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.leakageChannelPanel.potassiumIonKPlusLeakageStringProperty
          }
        ]
      } );

      // Voltage-gated channels
      const voltageGatedChannelPanel = createPanel( {
          titleProperty: MembraneTransportFluent.transportProteinPanel.voltageGatedChannelsStringProperty,
          tandemName: 'voltageGatedChannelPanel',
          expanded: true,
          accessibleHelpTextStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.accessibleHelpTextStringProperty,
          transportProteins: [
            {
              transportProteinType: 'sodiumIonVoltageGatedChannel',
              labelProperty: MembraneTransportFluent.soluteNames.sodiumIonStringProperty,
              accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.sodiumIonNaPlusVoltageGatedStringProperty
            },
            {
              transportProteinType: 'potassiumIonVoltageGatedChannel',
              labelProperty: MembraneTransportFluent.soluteNames.potassiumIonStringProperty,
              accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.voltageGatedChannelPanel.potassiumIonKPlusVoltageGatedStringProperty
            }
          ]
        },
        new MembranePotentialPanel( model, tandem.createTandem( 'membranePotentialPanel' ) )
      );

      // Ligand-gated channels
      const ligandGatedChannelPanel = createPanel( {
        titleProperty: MembraneTransportFluent.transportProteinPanel.ligandGatedChannelsStringProperty,
        tandemName: 'ligandGatedChannelPanel',
        expanded: true,
        accessibleHelpTextStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.ligandGatedChannelPanel.accessibleHelpTextStringProperty,
        transportProteins: [
          {
            transportProteinType: 'sodiumIonLigandGatedChannel',
            labelProperty: MembraneTransportFluent.soluteNames.sodiumIonStringProperty,
            accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.ligandGatedChannelPanel.sodiumIonNaPlusLigandGatedStringProperty
          },
          {
            transportProteinType: 'potassiumIonLigandGatedChannel',
            labelProperty: MembraneTransportFluent.soluteNames.potassiumIonStringProperty,
            accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.ligandGatedChannelPanel.potassiumIonKPlusLigandGatedStringProperty
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
        titleProperty: MembraneTransportFluent.transportProteinPanel.activeTransportersStringProperty,
        tandemName: 'activeTransportProteinPanel',
        expanded: true,
        accessibleHelpTextStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.activeTransportProteinPanel.accessibleHelpTextStringProperty,
        transportProteins: [
          {
            transportProteinType: 'sodiumPotassiumPump',
            labelProperty: MembraneTransportFluent.transportProteinPanel.naPlusKPlusPumpStringProperty,
            accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumPotassiumPumpStringProperty
          },
          {
            transportProteinType: 'sodiumGlucoseCotransporter',
            labelProperty: MembraneTransportFluent.transportProteinPanel.sodiumGlucoseCotransporterStringProperty,
            accessibleNameStringProperty: MembraneTransportFluent.a11y.transportProteinPanel.activeTransportProteinPanel.sodiumGlucoseCotransporterStringProperty
          }
        ]
      } );

      panels.push( activeTransportProteinPanel );
    }

    const interleaveHSeparators = ( nodes: Node[] ) => {
      const result: Node[] = [];
      for ( let i = 0; i < nodes.length; i++ ) {
        if ( i > 0 ) {
          result.push( new HSeparator( { stroke: 'black', lineWidth: 2 } ) );
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
      accessibleHeading: MembraneTransportFluent.a11y.transportProteinPanel.accessibleHeadingStringProperty,
      accessibleHelpText: MembraneTransportFluent.a11y.transportProteinPanel.accessibleHelpTextStringProperty,
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS,

      // phet-io
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
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