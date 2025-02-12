// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
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
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import LeakageChannelNode from './LeakageChannelNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';

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

    const contentAlignGroup = new AlignGroup();

    const accordionBoxes: AccordionBox[] = [];

    if ( model.featureSet === 'facilitatedDiffusion' || model.featureSet === 'playground' ) {

      const sodiumIonLeakageNode = new LeakageChannelNode( 'sodiumLeakage' );
      sodiumIonLeakageNode.addInputListener( DragListener.createForwardingListener( event => membraneChannelsScreenView.createLeakageNode( event, 'sodiumLeakage', [ sodiumIonLeakageNode, this ] ) ) );

      const potassiumIonLeakageNode = new LeakageChannelNode( 'potassiumLeakage' );
      potassiumIonLeakageNode.addInputListener( DragListener.createForwardingListener( event => membraneChannelsScreenView.createLeakageNode( event, 'potassiumLeakage', [ potassiumIonLeakageNode, this ] ) ) );

      const richTextOptions: RichTextOptions = { align: 'center', font: new PhetFont( 12 ) };

      // TODO: Perhaps add ToolIconNode, which renders with a LeakageChannelNode (maybe with Text)?
      const sodiumLeakageToolNode = new VBox( {
        spacing: 3,
        children: [ sodiumIonLeakageNode, new RichText( MembraneChannelsStrings.sodiumIonNaPlusStringProperty, richTextOptions ) ],
        tagName: 'button',
        descriptionTagName: 'p',
        descriptionContent: 'Press enter to add a sodium ion leakage channel to the membrane' // TODO i18n
      } );
      // Removing and Repositioning Proteins (on membrane)
      // Alternative Input for inside Accordion Boxes:
      //   Toolbox Pattern can be used for inside the expanded accordion https://phetsims.github.io/binder/#sun-ToolboxPattern
      //   Grabbing a Channel
      // Following the toolbox pattern, Space/Enter activates and adds to Membrane (LEFTMOST, first available spot).

      // However, do not move the focus to the newly created item. Keyboard focus should remain in the toolbox so the
      // user can add several channels. BF 2025/02/12
      sodiumLeakageToolNode.addInputListener( {
        click: () => {
          const emptyTarget = model.getLeftmostEmptyTarget();
          if ( emptyTarget !== undefined ) {
            model.targets.set( emptyTarget, 'sodiumLeakage' );
            model.targetChangedEmitter.emit();
          }
        }
      } );
      const potassiumLeakageToolNode = new VBox( {
        spacing: 3,
        children: [ potassiumIonLeakageNode, new RichText( MembraneChannelsStrings.potassiumIonKPlusStringProperty, richTextOptions ) ],
        tagName: 'button',
        descriptionTagName: 'p',
        descriptionContent: 'Press enter to add a sodium ion leakage channel to the membrane' // TODO i18n
      } );
      const leakageContent = new HBox( {
        spacing: 10,
        children: [ sodiumLeakageToolNode, potassiumLeakageToolNode ]
      } );

      accordionBoxes.push( new AccordionBox( contentAlignGroup.createBox( leakageContent ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: true,
          titleNode: new Text( MembraneChannelsStrings.leakageChannelsStringProperty, { fontSize: fontSize } ),
          tandem: tandem.createTandem( 'leakageAccordionBox' )
        }, accordionBoxOptions ) ),
        new AccordionBox( contentAlignGroup.createBox( new Text( 'placeholder-text placeholder-text' ) ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: false,
          titleNode: new Text( MembraneChannelsStrings.voltageGatedChannelsStringProperty, { fontSize: fontSize } ),
          tandem: tandem.createTandem( 'voltageAccordionBox' )
        }, accordionBoxOptions ) ),
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