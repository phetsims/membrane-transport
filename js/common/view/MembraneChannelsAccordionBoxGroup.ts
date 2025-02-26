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

    // put all titles in an align box so they take up the same amount of space
    const titleAlignGroup = new AlignGroup();

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
          titleNode: titleAlignGroup.createBox( new Text( MembraneChannelsStrings.leakageChannelsStringProperty, { fontSize: fontSize } ), { xAlign: 'left' } ),
          tandem: tandem.createTandem( 'leakageAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      const createVoltageGatedAccordionBox = ( () => {
        const hbox = new HBox( {
          spacing: 10,
          children: [
            new ChannelToolNode( 'sodiumIonVoltageGatedChannel', MembraneChannelsStrings.sodiumIonNaPlusStringProperty, model, view ),
            new ChannelToolNode( 'sodiumIonVoltageGatedChannel', MembraneChannelsStrings.potassiumIonKPlusStringProperty, model, view ) ]
        } );

        return new AccordionBox( contentAlignGroup.createBox( hbox ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: false,
          titleNode: titleAlignGroup.createBox( new Text( MembraneChannelsStrings.voltageGatedChannelsStringProperty, { fontSize: fontSize } ), { xAlign: 'left' } ),
          tandem: tandem.createTandem( 'voltageGatedAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      // TODO: Duplicated code in the createLeakageAccordionBox and createVoltageGatedAccordionBox
      const createLigandGatedAccordionBox = ( () => {
        const hbox = new HBox( {
          spacing: 10,
          children: [
            new ChannelToolNode( 'sodiumIonLigandGatedChannel', MembraneChannelsStrings.sodiumIonNaPlusStringProperty, model, view ),
            new ChannelToolNode( 'potassiumIonLigandGatedChannel', MembraneChannelsStrings.potassiumIonKPlusStringProperty, model, view ) ]
        } );

        return new AccordionBox( contentAlignGroup.createBox( hbox ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: false,
          titleNode: titleAlignGroup.createBox( new Text( MembraneChannelsStrings.ligandGatedChannelsStringProperty, { fontSize: fontSize } ), { xAlign: 'left' } ),
          tandem: tandem.createTandem( 'ligandGatedAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      accordionBoxes.push(
        createLeakageAccordionBox(),
        createVoltageGatedAccordionBox(),
        createLigandGatedAccordionBox()
      );
    }

    if ( model.featureSet === 'activeTransport' || model.featureSet === 'playground' ) {

      // TODO: Duplicated code in the createLeakageAccordionBox and createVoltageGatedAccordionBox
      const createActiveTransportAccordionBox = ( () => {
        const hbox = new HBox( {
          spacing: 10,
          children: [
            new ChannelToolNode( 'sodiumIonActiveGatedChannel', MembraneChannelsStrings.sodiumIonNaPlusStringProperty, model, view ),
            new ChannelToolNode( 'potassiumIonActiveGatedChannel', MembraneChannelsStrings.potassiumIonKPlusStringProperty, model, view ) ]
        } );

        return new AccordionBox( contentAlignGroup.createBox( hbox ), combineOptions<AccordionBoxOptions>( {
          expandedDefaultValue: false,
          titleNode: titleAlignGroup.createBox( new Text( MembraneChannelsStrings.activeTransportersStringProperty, { fontSize: fontSize } ), { xAlign: 'left' } ),
          tandem: tandem.createTandem( 'activeTransportAccordionBox' )
        }, accordionBoxOptions ) );
      } );

      accordionBoxes.push( createActiveTransportAccordionBox() );
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