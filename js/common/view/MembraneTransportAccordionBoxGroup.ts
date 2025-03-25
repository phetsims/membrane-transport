// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import ChannelType from '../model/proteins/ChannelType.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import ChannelToolNode from './ChannelToolNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';

// Type definition for channel configuration
type ChannelConfig = {
  channelType: ChannelType;
  labelProperty: TReadOnlyProperty<string>;
  accessibleNameProperty: TReadOnlyProperty<string>;
};

// Type definition for accordion box configuration
type AccordionBoxConfig = {
  titleProperty: TReadOnlyProperty<string>;
  tandemName: string;
  expanded: boolean;
  channels: ChannelConfig[];
};

/**
 * Shows the title and group of accordion boxes for the membrane channels, which can be dragged into the play area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembraneChannelsAccordionBoxGroup extends Node {
  public readonly resetEmitter = new Emitter();

  // So we can return ChannelDragNode instances to their corresponding ChannelToolNode icons
  private readonly channelToolNodes: Map<ChannelType, ChannelToolNode>;

  public constructor( model: MembraneChannelsModel, tandem: Tandem, view: MembraneChannelsScreenView ) {

    const fontSize = 16;
    const accordionBoxOptions: AccordionBoxOptions = {
      useExpandedBoundsWhenCollapsed: false,
      cornerRadius: 0,
      lineWidth: 0,
      titleAlignX: 'left',
      fill: 'white',
      headingTagName: 'h4'
    };

    const contentAlignGroup = new AlignGroup();
    const accordionBoxes: AccordionBox[] = [];

    // put all titles in an align box so they take up the same amount of space
    const titleAlignGroup = new AlignGroup();

    const channelToolNodes = new Map<ChannelType, ChannelToolNode>();

    /**
     * Creates an accordion box based on the provided configuration
     */
    const createAccordionBox = ( config: AccordionBoxConfig ): AccordionBox => {
      const content = new HBox( {
        spacing: 10,
        children: config.channels.map( channel => {
            const channelToolNode = new ChannelToolNode(
              channel.channelType,
              channel.labelProperty,
              channel.accessibleNameProperty,
              view
            );
            channelToolNodes.set( channel.channelType, channelToolNode );
            return channelToolNode;
          }
        )
      } );

      return new AccordionBox( contentAlignGroup.createBox( content ), combineOptions<AccordionBoxOptions>( {
        expandedDefaultValue: config.expanded,
        titleNode: titleAlignGroup.createBox( new Text( config.titleProperty, { fontSize: fontSize, maxWidth: 150 } ), { xAlign: 'left' } ),
        tandem: tandem.createTandem( config.tandemName )
      }, accordionBoxOptions ) );
    };

    if ( model.featureSet === 'facilitatedDiffusion' || model.featureSet === 'playground' ) {
      // Leakage channels
      const leakageAccordionBox = createAccordionBox( {
        titleProperty: MembraneChannelsStrings.leakageChannelsStringProperty,
        tandemName: 'leakageChannelsAccordionBox',
        expanded: true,
        channels: [
          {
            channelType: 'sodiumIonLeakageChannel',
            labelProperty: MembraneChannelsStrings.sodiumIonNaPlusStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.leakageChannelsAccordionBox.sodiumIonNaPlusLeakageStringProperty
          },
          {
            channelType: 'potassiumIonLeakageChannel',
            labelProperty: MembraneChannelsStrings.potassiumIonKPlusStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.leakageChannelsAccordionBox.potassiumIonKPlusLeakageStringProperty
          }
        ]
      } );

      // Voltage-gated channels
      const voltageGatedAccordionBox = createAccordionBox( {
        titleProperty: MembraneChannelsStrings.voltageGatedChannelsStringProperty,
        tandemName: 'voltageGatedChannelsAccordionBox',
        expanded: false,
        channels: [
          {
            channelType: 'sodiumIonVoltageGatedChannel',
            labelProperty: MembraneChannelsStrings.sodiumIonNaPlusStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.voltageGatedChannelsAccordionBox.sodiumIonNaPlusVoltageGatedStringProperty
          },
          {
            channelType: 'potassiumIonVoltageGatedChannel',
            labelProperty: MembraneChannelsStrings.potassiumIonKPlusStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.voltageGatedChannelsAccordionBox.potassiumIonKPlusVoltageGatedStringProperty
          }
        ]
      } );

      // Ligand-gated channels
      const ligandGatedAccordionBox = createAccordionBox( {
        titleProperty: MembraneChannelsStrings.ligandGatedChannelsStringProperty,
        tandemName: 'ligandGatedChannelsAccordionBox',
        expanded: false,
        channels: [
          {
            channelType: 'sodiumIonLigandGatedChannel',
            labelProperty: MembraneChannelsStrings.sodiumIonNaPlusStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.ligandGatedAccordionBox.sodiumIonNaPlusLigandGatedStringProperty
          },
          {
            channelType: 'potassiumIonLigandGatedChannel',
            labelProperty: MembraneChannelsStrings.potassiumIonKPlusStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.ligandGatedAccordionBox.potassiumIonKPlusLigandGatedStringProperty
          }
        ]
      } );

      accordionBoxes.push(
        leakageAccordionBox,
        voltageGatedAccordionBox,
        ligandGatedAccordionBox
      );
    }

    if ( model.featureSet === 'activeTransport' || model.featureSet === 'playground' ) {
      // Active transport channels
      const activeTransportAccordionBox = createAccordionBox( {
        titleProperty: MembraneChannelsStrings.activeTransportersStringProperty,
        tandemName: 'activeTransportersAccordionBox',
        expanded: false,
        channels: [
          {
            channelType: 'sodiumPotassiumPump',
            labelProperty: MembraneChannelsStrings.NaPlusKPlusPumpStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.activeTransportersAccordionBox.sodiumPotassiumPumpStringProperty
          },
          {
            channelType: 'sodiumGlucoseCotransporter',
            labelProperty: MembraneChannelsStrings.sodiumGlucoseCotransporterStringProperty,
            accessibleNameProperty: MembraneChannelsStrings.a11y.accordionBoxGroup.activeTransportersAccordionBox.sodiumGlucoseCotransporterStringProperty
          }
        ]
      } );

      accordionBoxes.push( activeTransportAccordionBox );
    }

    accordionBoxes.forEach( box => {
      box.expandedProperty.link( expanded => {
        if ( expanded ) {

          // collapse the other ones
          accordionBoxes.forEach( otherBox => {
            if ( otherBox !== box ) {
              otherBox.expandedProperty.value = false;
            }
          } );
        }
      } );
    } );
    const interleaveHSeparators = ( nodes: Node[] ) => {
      const result: Node[] = [];
      for ( let i = 0; i < nodes.length; i++ ) {
        if ( i > 0 ) {
          result.push( new HSeparator( { stroke: 'black', lineWidth: 1 } ) );
        }
        result.push( nodes[ i ] );
      }
      return result;
    };
    const vbox = new VBox( {
      spacing: 0,
      children: [
        new Text( MembraneChannelsStrings.membraneProteinsStringProperty, {
          fontSize: MembraneChannelsConstants.PANEL_TITLE_FONT_SIZE,
          maxWidth: 150
        } ),

        ...interleaveHSeparators( accordionBoxes )
      ]
    } );
    super( {
      children: [ vbox ],

      // pdom
      tagName: 'div',
      labelTagName: 'h3',
      accessibleName: MembraneChannelsStrings.membraneProteinsStringProperty,
      accessibleHelpText: MembraneChannelsStrings.a11y.accordionBoxGroup.accessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );

    this.resetEmitter.addListener( () => accordionBoxes.forEach( box => box.reset() ) );

    this.mutate( { left: 20, top: 20 } );
    this.channelToolNodes = channelToolNodes;
  }

  public reset(): void {
    this.resetEmitter.emit();
  }

  public getChannelToolNode( channelType: ChannelType ): ChannelToolNode {
    return this.channelToolNodes.get( channelType )!;
  }
}

membraneChannels.register( 'MembraneChannelsAccordionBoxGroup', MembraneChannelsAccordionBoxGroup );