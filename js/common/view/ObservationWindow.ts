// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import GroupSelectModel from '../../../../scenery-phet/js/accessibility/group-sort/model/GroupSelectModel.js';
import GroupSelectView from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSelectView.js';
import GroupSortInteractionView from '../../../../scenery-phet/js/accessibility/group-sort/view/GroupSortInteractionView.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text, { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants, { LIGAND_COUNT, MODEL_HEIGHT } from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import { getFeatureSetHasLigands } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel, { Slot } from '../model/MembraneChannelsModel.js';
import LigandNode from './LigandNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';
import ObservationWindowChannelLayer from './ObservationWindowChannelLayer.js';
import LigandANode from './particles/LigandANode.js';
import LigandBNode from './particles/LigandBNode.js';
import SlotDragIndicatorNode from './SlotDragIndicatorNode.js';
import Range from '../../../../dot/js/Range.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

/**
 * Shows the rectangle with the cross section of the cell membrane where solutes, ligands, membrane channels are.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

export default class ObservationWindow extends InteractiveHighlightingNode {

  private readonly ligandNodes: LigandNode[] = [];
  public readonly slotDragIndicatorNodes: SlotDragIndicatorNode[];

  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );
  private readonly groupSelectView: GroupSelectView<IntentionalAny, Node>;

  public constructor( private readonly model: MembraneChannelsModel, view: MembraneChannelsScreenView, modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2, tandem: Tandem ) {

    const frameNode = new Rectangle( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT, {
      stroke: 'black',
      lineWidth: 2,
      pickable: false
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

    this.slotDragIndicatorNodes = Array.from( model.getSlotContentsKeys() ).map( slot => new SlotDragIndicatorNode( slot, model, modelViewTransform ) );
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => this.addChild( slotDragIndicatorNode ) );

    const channelLayer = new ObservationWindowChannelLayer( model, view, modelViewTransform );
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

    // Draw the particles in front
    const frontCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'front' );
    clipNode.addChild( frontCanvas );
    this.stepEmitter.addListener( dt => frontCanvas.step( dt ) );

    type SortItem = number;

    const sampleRectangle = new Rectangle( 100, 100, 10, 10, {
      fill: 'blue'
    } );
    this.addChild( sampleRectangle );

    const groupSelectModel = new GroupSelectModel<SortItem>( {
      getGroupItemValue: slot => 0,
      tandem: Tandem.OPT_OUT // TODO?
    } );


    // TODO: This is in progress. We hope to use GroupSortInteractionView to drive the drag and drop behavior
    //   with a keyboard.
    this.groupSelectView = new GroupSortInteractionView<SortItem, Node>( groupSelectModel, this, {
      getNextSelectedGroupItem: ( delta: number, currentlySelectedGroupItem: SortItem ) => {
        const slot = model.getNextFilledSlot( delta, currentlySelectedGroupItem.toString() as Slot );

        if ( slot === null ) {
          return currentlySelectedGroupItem;
        }
        else {
          return model.getSlotIndex( slot );
        }

        // return clamp( currentlySelectedGroupItem + delta, 0, 7 );
      },

      // Called when a selected item becomes "grabbed" for sorting
      onGrab: ( groupItem: SortItem ) => {

        // Make all the slots visible?
        this.setSlotIndicatorsVisible( true );

        const index = model.getSlotForIndex( groupItem );
        const channelType = model.getSlotContents( index );
        affirm( channelType, 'The grabbed item should have a channel type' );

        // Remove the channel from the model
        model.setSlotContents( model.getSlotForIndex( groupItem ), null );

        // Create a ChannelDragNode at the location of the selected item, in an offset position.
        view.createFromKeyboard( channelType, [ this ] ); // TODO: swapped with the mouse one, watch out!!!!

        // somehow, getNodeFromModelItem will need to work with this new ChannelDragNode instead of the

      },

      // Note that this range is not used by the implementation, but the min
      // must be negative so that we get a delta at the start.
      sortingRangeProperty: new Property( new Range( -10, 10 ) ),
      sortGroupItem: ( groupItem: SortItem, newValue: number ) => {
        console.log( 'sortGroupItem' );

        // Create a ChannelDragNode
        // view.createFromKeyboard( type, [ this, channelNode ] ); // TODO: swapped with the mouse one, watch out!!!!


      },
      getGroupItemToSelect: () => {
        const leftMostFilledSlot = model.getLeftmostFilledSlot();
        if ( leftMostFilledSlot ) {
          return model.getSlotIndex( leftMostFilledSlot );
        }
        else {
          return null;
        }
      },
      getNodeFromModelItem: model => {
        const indicatorNode = this.slotDragIndicatorNodes[ model ];

        if ( indicatorNode ) {
          return this.slotDragIndicatorNodes[ model ];
        }
        else {
          return sampleRectangle;
        }
      },
      grabReleaseCueOptions: {
        center: this.bounds.center.plusXY( 0, modelViewTransform.modelToViewDeltaY( MODEL_HEIGHT * 0.25 ) )
      }
    } );


    // TODO: Specify shape around the membrane
    this.groupSelectView.groupSortGroupFocusHighlightPath.shape = Shape.rect( 10, 10, 400, 400 );
  }

  /**
   * Sets slot indicators to be visible or invisible. Filled slots will always have
   * invisible indicators.
   */
  public setSlotIndicatorsVisible( visible: boolean ): void {
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => {
      slotDragIndicatorNode.visible = visible && !this.model.isSlotFilled( slotDragIndicatorNode.slot );
    } );
  }

  public step( dt: number ): void {
    this.stepEmitter.emit( dt );

    this.ligandNodes.forEach( ligandNode => ligandNode.step() );
  }

}
membraneChannels.register( 'ObservationWindow', ObservationWindow );