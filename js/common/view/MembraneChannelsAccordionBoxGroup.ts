// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
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
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import ChannelToolNode from './ChannelToolNode.js';
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

  public constructor( model: MembraneChannelsModel, transform: ModelViewTransform2, tandem: Tandem, view: MembraneChannelsScreenView ) {

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

      const createLeakageAccordionBox = ( () => {

        const leakageContent = new HBox( {
          spacing: 10,
          children: [
            new ChannelToolNode( 'sodiumIonLeakageChannel', MembraneChannelsStrings.sodiumIonNaPlusStringProperty, model, view ),
            new ChannelToolNode( 'potassiumIonLeakageChannel', MembraneChannelsStrings.potassiumIonKPlusStringProperty, model, view )
          ]
        } );

        return new AccordionBox( contentAlignGroup.createBox( leakageContent ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: true,
          titleNode: new Text( MembraneChannelsStrings.leakageChannelsStringProperty, { fontSize: fontSize } ),
          tandem: tandem.createTandem( 'leakageAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      const createVoltageGatedAccordionBox = ( () => {
        const leakageContent = new HBox( {
          spacing: 10,
          children: [
            new ChannelToolNode( 'sodiumIonVoltageGatedChannel', MembraneChannelsStrings.sodiumIonNaPlusStringProperty, model, view ),
            new ChannelToolNode( 'sodiumIonVoltageGatedChannel', MembraneChannelsStrings.potassiumIonKPlusStringProperty, model, view ) ]
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