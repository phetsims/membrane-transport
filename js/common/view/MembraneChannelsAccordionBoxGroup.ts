// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsStrings from '../../MembraneChannelsStrings.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsModel, { ChannelType } from '../model/MembraneChannelsModel.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import SodiumVoltageGatedChannelNode from './SodiumVoltageGatedChannelNode.js';

/**
 * Shows the title and group of accordion boxes for the membrane channels, which can be dragged into the play area.
 *
 * TODO:
 * - maxWidth
 * - dynamic layout
 * - PhET-iO
 * - keyboard
 * - description
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembraneChannelsAccordionBoxGroup extends Node {
  public readonly resetEmitter = new Emitter();

  public constructor( model: MembraneChannelsModel, transform: ModelViewTransform2, tandem: Tandem, membraneChannelsScreenView: MembraneChannelsScreenView ) {

    const fontSize = 16;
    const accordionBoxOptions: AccordionBoxOptions = {
      useExpandedBoundsWhenCollapsed: false,
      cornerRadius: 0,
      lineWidth: 0,
      titleAlignX: 'left',
      fill: 'white'
    };

    const richTextOptions: RichTextOptions = { align: 'center', font: new PhetFont( 12 ) };
    const vboxOptions: VBoxOptions = {
      spacing: 3,
      tagName: 'button',
      descriptionTagName: 'p',
      descriptionContent: 'Press enter to add the protein to the membrane' // TODO: i18n
    };

    const contentAlignGroup = new AlignGroup();
    const accordionBoxes: AccordionBox[] = [];

    // Space/Enter activates and adds to Membrane (LEFTMOST, first available spot).
    // However, do not move the focus to the newly created item. Keyboard focus should remain in the toolbox so the
    // user can add several channels. BF 2025/02/12
    const clickToAdd = ( channelType: ChannelType ) => {
      return {
        click: () => {
          const emptyTarget = model.getLeftmostEmptyTarget();
          // TODO: response if there is no available spot?
          if ( emptyTarget !== null ) {
            model.setTarget( emptyTarget, channelType );
            model.targetChangedEmitter.emit();
          }
        }
      };
    };

    if ( model.featureSet === 'facilitatedDiffusion' || model.featureSet === 'playground' ) {

      const createLeakageAccordionBox = ( () => {
        const sodiumIonLeakageNode = new LeakageChannelNode( 'sodiumIonLeakageChannel' );
        sodiumIonLeakageNode.addInputListener( DragListener.createForwardingListener( event => membraneChannelsScreenView.createMembraneChannelNode( event, 'sodiumIonLeakageChannel', [ sodiumIonLeakageNode, this ] ) ) );

        const potassiumIonLeakageNode = new LeakageChannelNode( 'potassiumIonLeakageChannel' );
        potassiumIonLeakageNode.addInputListener( DragListener.createForwardingListener( event => membraneChannelsScreenView.createMembraneChannelNode( event, 'potassiumIonLeakageChannel', [ potassiumIonLeakageNode, this ] ) ) );

        const sodiumLeakageToolNode = new VBox( combineOptions<VBoxOptions>( {}, vboxOptions, {
          children: [ sodiumIonLeakageNode, new RichText( MembraneChannelsStrings.sodiumIonNaPlusStringProperty, richTextOptions ) ]
        } ) );
        sodiumLeakageToolNode.addInputListener( clickToAdd( 'sodiumIonLeakageChannel' ) );

        const potassiumLeakageToolNode = new VBox( combineOptions<VBoxOptions>( {}, vboxOptions, {
          children: [ potassiumIonLeakageNode, new RichText( MembraneChannelsStrings.potassiumIonKPlusStringProperty, richTextOptions ) ]
        } ) );
        potassiumLeakageToolNode.addInputListener( clickToAdd( 'potassiumIonLeakageChannel' ) );

        const leakageContent = new HBox( {
          spacing: 10,
          children: [ sodiumLeakageToolNode, potassiumLeakageToolNode ]
        } );

        return new AccordionBox( contentAlignGroup.createBox( leakageContent ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: true,
          titleNode: new Text( MembraneChannelsStrings.leakageChannelsStringProperty, { fontSize: fontSize } ),
          tandem: tandem.createTandem( 'leakageAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      const createVoltageGatedAccordionBox = ( () => {
        const sodiumIonLeakageNode = new SodiumVoltageGatedChannelNode();
        sodiumIonLeakageNode.addInputListener( DragListener.createForwardingListener( event => membraneChannelsScreenView.createMembraneChannelNode( event, 'sodiumIonVoltageGatedChannel', [ sodiumIonLeakageNode, this ] ) ) );

        const potassiumIonLeakageNode = new LeakageChannelNode( 'potassiumIonLeakageChannel' );
        potassiumIonLeakageNode.addInputListener( DragListener.createForwardingListener( event => membraneChannelsScreenView.createMembraneChannelNode( event, 'potassiumIonLeakageChannel', [ potassiumIonLeakageNode, this ] ) ) );

        const sodiumLeakageToolNode = new VBox( combineOptions<VBoxOptions>( {}, vboxOptions, {
          children: [ sodiumIonLeakageNode, new RichText( MembraneChannelsStrings.sodiumIonNaPlusStringProperty, richTextOptions ) ]
        } ) );
        sodiumLeakageToolNode.addInputListener( clickToAdd( 'sodiumIonLeakageChannel' ) );

        const potassiumLeakageToolNode = new VBox( combineOptions<VBoxOptions>( {}, vboxOptions, {
          children: [ potassiumIonLeakageNode, new RichText( MembraneChannelsStrings.potassiumIonKPlusStringProperty, richTextOptions ) ]
        } ) );
        potassiumLeakageToolNode.addInputListener( clickToAdd( 'potassiumIonLeakageChannel' ) );

        const leakageContent = new HBox( {
          spacing: 10,
          children: [ sodiumLeakageToolNode, potassiumLeakageToolNode ]
        } );

        return new AccordionBox( contentAlignGroup.createBox( leakageContent ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: false,
          titleNode: new Text( MembraneChannelsStrings.voltageGatedChannelsStringProperty, { fontSize: fontSize } ),
          tandem: tandem.createTandem( 'voltageAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      accordionBoxes.push(
        createLeakageAccordionBox(),
        createVoltageGatedAccordionBox(),
        new AccordionBox( contentAlignGroup.createBox( new Text( 'placeholder-text placeholder-text' ) ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: false,
          titleNode: new Text( MembraneChannelsStrings.ligandGatedChannelsStringProperty, { fontSize: fontSize } ),
          tandem: tandem.createTandem( 'ligandAccordionBox' )
        }, accordionBoxOptions ) ) );
    }

    if ( model.featureSet === 'activeTransport' || model.featureSet === 'playground' ) {
      accordionBoxes.push( new AccordionBox( contentAlignGroup.createBox( new Text( 'placeholder-text placeholder-text and more' ) ), combineOptions<AccordionBoxOptions>( {
        expandedDefaultValue: model.featureSet === 'activeTransport',
        titleNode: new Text( MembraneChannelsStrings.activeTransportersStringProperty, { fontSize: fontSize } ),
        tandem: tandem.createTandem( 'activeAccordionBox' )
      }, accordionBoxOptions ) ) );
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
        new Text( membraneChannelsStrings.membraneProteinsStringProperty, {
          fontSize: MembraneChannelsConstants.PANEL_TITLE_FONT_SIZE
        } ),

        ...interleaveHSeparators( accordionBoxes )
      ]
    } );
    super( {
      children: [ vbox ]
    } );

    this.resetEmitter.addListener( () => accordionBoxes.forEach( box => box.reset() ) );

    this.mutate( { left: 20, top: 20 } );
  }

  public reset(): void {
    this.resetEmitter.emit();
  }
}

membraneChannels.register( 'MembraneChannelsAccordionBoxGroup', MembraneChannelsAccordionBoxGroup );