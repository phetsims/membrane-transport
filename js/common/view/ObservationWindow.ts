// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import membraneChannelsStrings from '../../MembraneChannelsStrings.js';
import { getFeatureSetHasLigands } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import LigandNode from './LigandNode.js';
import MembraneChannelsScreenView from './MembraneChannelsScreenView.js';
import MembraneGroupSelectView from './MembraneGroupSelectView.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';
import ObservationWindowChannelLayer, { SlottedNode } from './ObservationWindowChannelLayer.js';
import LigandANode from './particles/LigandANode.js';
import LigandBNode from './particles/LigandBNode.js';
import SlotDragIndicatorNode from './SlotDragIndicatorNode.js';

/**
 * Shows the rectangle with the cross section of the cell membrane where solutes, ligands, membrane channels are.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

export default class ObservationWindow extends InteractiveHighlightingNode {

  public readonly ligandNodes: LigandNode[] = [];
  public readonly slotDragIndicatorNodes: SlotDragIndicatorNode[];

  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );
  public readonly membraneGroupSelectView: MembraneGroupSelectView;

  private readonly channelLayer: ObservationWindowChannelLayer;

  public constructor( private readonly model: MembraneChannelsModel, view: MembraneChannelsScreenView,
                      public readonly modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2, tandem: Tandem ) {

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
      accessibleName: 'Grab a protein to re-order along zoomed-in view of membrane.' // TODO
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    const backCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'back' );
    clipNode.addChild( backCanvas );
    this.stepEmitter.addListener( dt => backCanvas.step( dt ) );

    this.slotDragIndicatorNodes = model.slots.map( slot => new SlotDragIndicatorNode( slot, model, modelViewTransform ) );
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => this.addChild( slotDragIndicatorNode ) );

    this.channelLayer = new ObservationWindowChannelLayer( model, view, modelViewTransform );
    this.stepEmitter.addListener( dt => this.channelLayer.step( dt ) );
    clipNode.addChild( this.channelLayer );

    // ligand and membrane channel layer
    // On top, we will have a layer for the interactive parts of the simulation

    if ( getFeatureSetHasLigands( model.featureSet ) ) {
      const groupTandem = tandem.createTandem( 'ligandNodes' ).createGroupTandem( 'ligandNode' );

      const ligandViewNodes = [ new LigandANode(), new LigandBNode() ];
      ligandViewNodes.forEach( ( ligandViewNode, j ) => {
        for ( let i = 0; i < MembraneChannelsConstants.LIGAND_COUNT; i++ ) {
          const ligandNode = new LigandNode( model.areLigandsAddedProperty, model.ligands, i + j * MembraneChannelsConstants.LIGAND_COUNT, modelViewTransform, ligandViewNode, groupTandem.createNextTandem(), i === 0 );
          this.ligandNodes.push( ligandNode );
        }
      } );

      // Put in random z-order
      const shuffledLigandNodes = dotRandom.shuffle( this.ligandNodes );
      shuffledLigandNodes.forEach( ligandNode => clipNode.addChild( ligandNode ) );
    }

    // NOTE: Duplication with SoluteBarChartsAccordionBox
    const TEXT_MARGIN = 3;
    const textOptions = { fontSize: 13, maxWidth: 200 };
    const panelOptions = { right: MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH - TEXT_MARGIN, stroke: null, fill: Color.WHITE.withAlpha( 0.3 ) };
    const outsideText = new Panel( new Text( membraneChannelsStrings.outsideStringProperty, textOptions ), combineOptions<PanelOptions>( {}, panelOptions, { top: TEXT_MARGIN } ) );
    const insideText = new Panel( new Text( membraneChannelsStrings.insideStringProperty, textOptions ), combineOptions<PanelOptions>( {}, panelOptions, { bottom: MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT - TEXT_MARGIN } ) );

    // TODO: Manual Constraint to keep text aligned when it changes length

    this.addChild( outsideText );
    this.addChild( insideText );

    // Draw the particles in front
    const frontCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'front' );
    clipNode.addChild( frontCanvas );
    this.stepEmitter.addListener( dt => frontCanvas.step( dt ) );

    this.membraneGroupSelectView = new MembraneGroupSelectView( model, view, this );
  }

  public getChannelNodes(): SlottedNode[] {
    return this.channelLayer.getChannelNodes();
  }

  /**
   * Sets slot indicators to be visible or invisible. Filled slots will always have
   * invisible indicators.
   */
  public setSlotDragIndicatorsVisible( visible: boolean ): void {
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => {
      slotDragIndicatorNode.visible = visible;
    } );
  }

  public step( dt: number ): void {
    this.stepEmitter.emit( dt );

    this.ligandNodes.forEach( ligandNode => ligandNode.step() );
  }

  public reset(): void {
    this.membraneGroupSelectView.reset();
  }

}
membraneChannels.register( 'ObservationWindow', ObservationWindow );