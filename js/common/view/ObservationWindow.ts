// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSortInteractionView from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSortInteractionView.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants, { LIGAND_COUNT, MODEL_HEIGHT } from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import { getFeatureSetHasLigands } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel, { ChannelType, Slot } from '../model/MembraneChannelsModel.js';
import LigandNode from './LigandNode.js';
import MembraneProteinInteractionNode from './MembraneProteinInteractionNode.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';
import ObservationWindowChannelLayer from './ObservationWindowChannelLayer.js';
import LigandANode from './particles/LigandANode.js';
import LigandBNode from './particles/LigandBNode.js';
import TargetZoneNode from './TargetZoneNode.js';

/**
 * Shows the rectangle with the cross section of the cell membrane where solutes, ligands, membrane channels are.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

export default class ObservationWindow extends InteractiveHighlightingNode {

  private readonly ligandNodes: LigandNode[] = [];
  public readonly targetZoneNodes: TargetZoneNode[]; // TODO: Rename
  public readonly membraneProteinInteractionNodes: MembraneProteinInteractionNode[];

  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );
  private readonly groupSortInteractionView: GroupSortInteractionView<IntentionalAny, Node>;

  public constructor( model: MembraneChannelsModel, modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2, tandem: Tandem ) {

    const frameNode = new Rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT, {
      stroke: 'black',
      lineWidth: 2
    } );

    // Clipping region that contains the background canvas and the ligand node
    // TODO: The canvas node doesn't actually need to be clipped since it can only draw within its bounds. UPDATE: Removing the clip shows a lot of drawing out of the bounds.
    const clipNode = new Node( {
      clipArea: Shape.rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT )
    } );

    super( {
      children: [ clipNode, frameNode ],

      // innerContent: 'div',
      accessibleName: 'hello'
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    const backCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'back' );
    clipNode.addChild( backCanvas );
    this.stepEmitter.addListener( dt => backCanvas.step( dt ) );

    const channelLayer = new ObservationWindowChannelLayer( model, modelViewTransform );
    this.stepEmitter.addListener( dt => channelLayer.step( dt ) );
    clipNode.addChild( channelLayer );

    // ligand and membrane channel layer
    // On top, we will have a layer for the interactive parts of the simulation

    if ( getFeatureSetHasLigands( model.featureSet ) ) {
      const groupTandem = tandem.createGroupTandem( 'ligandNodes' );

      const ligandViewNodes = [ new LigandANode(), new LigandBNode() ];
      ligandViewNodes.forEach( ( ligandViewNode, j ) => {
        for ( let i = 0; i < LIGAND_COUNT; i++ ) {
          const ligandNode = new LigandNode( model.areLigandsAddedProperty, model.ligands, i + j * LIGAND_COUNT, modelViewTransform, ligandViewNode, groupTandem.createNextTandem(), i === 0 );
          this.ligandNodes.push( ligandNode );
        }
      } );

      // Put in random z-order
      const shuffledLigandNodes = dotRandom.shuffle( this.ligandNodes );
      shuffledLigandNodes.forEach( ligandNode => clipNode.addChild( ligandNode ) );
    }

    // NOTE: Duplication with SoluteBarChartsAccordionBox
    const TEXT_MARGIN = 3;
    const textOptions = { fontSize: 13, right: MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH - TEXT_MARGIN, maxWidth: 200 };
    const outsideText = new Text( membraneChannelsStrings.outsideStringProperty, combineOptions<TextOptions>( { top: TEXT_MARGIN }, textOptions ) );
    const insideText = new Text( membraneChannelsStrings.insideStringProperty, combineOptions<TextOptions>( { bottom: MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT - TEXT_MARGIN }, textOptions ) );

    this.addChild( outsideText );
    this.addChild( insideText );

    this.membraneProteinInteractionNodes = Array.from( model.getSlotContentsKeys() ).map( slot => new MembraneProteinInteractionNode( model, slot, modelViewTransform ) );
    this.membraneProteinInteractionNodes.forEach( membraneProteinInteractionNode => this.addChild( membraneProteinInteractionNode ) );

    this.targetZoneNodes = Array.from( model.getSlotContentsKeys() ).map( slot => new TargetZoneNode( slot, model, modelViewTransform ) );
    this.targetZoneNodes.forEach( targetZoneNode => this.addChild( targetZoneNode ) );

    // Draw the particles in front
    const frontCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'front' );
    clipNode.addChild( frontCanvas );
    this.stepEmitter.addListener( dt => frontCanvas.step( dt ) );

    const itemsToSort = model.slots.map( slot => {
      return {
        name: 'originally' + slot
      };
    } );

    type SortItem = { name: string };

    class MySortableNode extends Path {
      public constructor( shape: Shape, public readonly slot: SortItem ) {
        super( shape, {

          // TODO: eliminate debugging facets
          fill: 'blue',
          opacity: 0
        } );
      }
    }

    const movableNodes = this.targetZoneNodes.map( ( targetZoneNode, index ) => new MySortableNode( Shape.bounds( targetZoneNode.bounds ), itemsToSort[ index ] ) );
    movableNodes.forEach( movableNode => this.addChild( movableNode ) );

    const currentOrdering = [ ...itemsToSort ];

    let grabbedItem: ChannelType | null = null;
    let grabbedFromSlot: Slot | null = null;

    const groupSelectModel = new GroupSelectModel<SortItem>( {
      getGroupItemValue: slot => currentOrdering.indexOf( slot ),
      tandem: tandem.createTandem( 'groupSelectModel' )
    } );

    // TODO: A grabbed channel should not participate in the model, it should be offsetted.
    // TODO: Do not focus on empty slots.
    this.groupSortInteractionView = new GroupSortInteractionView<SortItem, Node>( groupSelectModel, this, {

      getNextSelectedGroupItem: ( delta, selectedModel ) => {

        // look through the currentOrdering. For each item, ask the model if that slot is filled.
        // TODO: initially make it possible to select empty zones, then rewrite to skip to filled zones.

        const index = currentOrdering.indexOf( selectedModel );
        const proposedIndex = index + delta;

        // get the next element out of the array, but without wrapping (clamp to start and end indices)
        const clampedProposedIndex = Math.max( 0, Math.min( currentOrdering.length - 1, proposedIndex ) );
        return currentOrdering[ clampedProposedIndex ];
      },
      onGrab: groupItem => {

        // Remove the item from the model
        const index = currentOrdering.indexOf( groupItem );
        const slot = model.slots[ index ];

        grabbedItem = model.getSlotContents( slot );
        grabbedFromSlot = slot;

        model.setSlotContents( slot, null );
      },
      onRelease: groupItem => {

        // Add the item back to the model
        const index = currentOrdering.indexOf( groupItem );

        // Also, in the model, swap the contents of the corresponding slots by index
        const destinationSlot = model.slots[ index ];
        const sourceSlot = grabbedFromSlot!;

        const swapWith = model.getSlotContents( destinationSlot );

        model.setSlotContents( sourceSlot, swapWith );
        model.setSlotContents( destinationSlot, grabbedItem );

        grabbedItem = null;
        grabbedFromSlot = null;
      },
      sortGroupItem: ( selectedModel, newValue ) => {

        if ( newValue <= 0 ) {
          newValue = 0;
        }
        if ( newValue >= currentOrdering.length - 1 ) { // TODO: Why is this necessary, but the <0 is not?
          newValue = currentOrdering.length - 1;
        }

        // change the order of currentOrdering so that the selectedModel is at the new index, swapping elements
        const index = currentOrdering.indexOf( selectedModel );
        const newIndex = newValue;
        const temp = currentOrdering[ index ];
        currentOrdering[ index ] = currentOrdering[ newIndex ];
        currentOrdering[ newIndex ] = temp;
      },
      onSort: () => {

        // Adjust the positions to match the array
        currentOrdering.forEach( ( modelItem, index ) => {
          const node = movableNodes.find( movableNode => movableNode.slot === modelItem )!;
          node.center = modelViewTransform.modelToViewXY( model.getSlotPosition( model.slots[ index ] ), 0 );
        } );
      },
      getGroupItemToSelect: () => {
        return currentOrdering[ 0 ]; // TODO: only return a filled slot.
        // return model.getLeftmostFilledSlot();
      },
      getNodeFromModelItem: model => {

        return movableNodes.find( movableNode => movableNode.slot === model )!;
      },
      grabReleaseCueOptions: {
        center: this.bounds.center.plusXY( 0, modelViewTransform.modelToViewDeltaY( MODEL_HEIGHT * 0.25 ) )
      },
      sortingRangeProperty: new Property( new Range( 0, 10 ) )
    } );
  }

  public step( dt: number ): void {
    this.stepEmitter.emit( dt );

    this.ligandNodes.forEach( ligandNode => ligandNode.step() );
  }

}
membraneChannels.register( 'ObservationWindow', ObservationWindow );