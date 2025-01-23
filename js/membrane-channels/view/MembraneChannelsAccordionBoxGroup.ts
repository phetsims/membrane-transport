// Copyright 2025, University of Colorado Boulder

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { AlignGroup, Circle, DragListener, HSeparator, Node, PressListenerEvent, Text, VBox } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import membraneChannels from '../../membraneChannels.js';

/**
 * Shows the title and group of accordion boxes for the membrane channels, which can be dragged into the play area.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export default class MembraneChannelsAccordionBoxGroup extends Node {
  public constructor( createCircle: ( event: PressListenerEvent ) => void ) {

    const fontSize = 14;
    const ag = new AlignGroup();
    const options: AccordionBoxOptions = {
      useExpandedBoundsWhenCollapsed: false,
      cornerRadius: 0,
      lineWidth: 0,
      titleAlignX: 'left'
    };

    const circleIcon = new Circle( 15, { fill: 'rgba( 255,0,0,0.5)' } );

    circleIcon.addInputListener( DragListener.createForwardingListener( event => {
      createCircle( event );
    } ) );

    const accordionBoxes = [
      new AccordionBox( circleIcon, combineOptions<AccordionBoxOptions>( { titleNode: ag.createBox( new Text( 'Leakage', { fontSize: fontSize } ) ) }, options ) ),
      new AccordionBox( new Text( 'hellanosteuhasontehuo' ), combineOptions<AccordionBoxOptions>( { titleNode: ag.createBox( new Text( 'Voltage', { fontSize: fontSize } ) ) }, options ) ),
      new AccordionBox( new Text( 'hellanosteuhasontehuo' ), combineOptions<AccordionBoxOptions>( { titleNode: ag.createBox( new Text( 'Ligand', { fontSize: fontSize } ) ) }, options ) ),
      new AccordionBox( new Text( 'hellanosteuhasontehuo' ), combineOptions<AccordionBoxOptions>( { titleNode: ag.createBox( new Text( 'Active', { fontSize: fontSize } ) ) }, options ) )
    ];
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
        new Text( 'Membrane Channels', {
          fontSize: fontSize
        } ),

        ...interleaveHSeparators( accordionBoxes )
      ]
    } );
    super( {
      children: [ vbox ]
    } );

    this.mutate( { left: 20, top: 20 } );
  }
}

membraneChannels.register( 'MembraneChannelsAccordionBoxGroup', MembraneChannelsAccordionBoxGroup );