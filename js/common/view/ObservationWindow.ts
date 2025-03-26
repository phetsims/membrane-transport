// Copyright 2025, University of Colorado Boulder

import Emitter from '../../../../axon/js/Emitter.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Shape from '../../../../kite/js/Shape.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import { getFeatureSetHasLigands } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import LigandNode from './LigandNode.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
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

// TODO: Extending InteractiveHighlightingNode means all children activate the highlight,
//   even those that are not interactive. Either focus on interactive parts or make non-interactive children
//   pickable: false.
export default class ObservationWindow extends InteractiveHighlightingNode {

  public readonly ligandNodes: LigandNode[] = [];
  public readonly slotDragIndicatorNodes: SlotDragIndicatorNode[];

  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );
  public readonly membraneGroupSelectView: MembraneGroupSelectView;

  private readonly channelLayer: ObservationWindowChannelLayer;

  public constructor( private readonly model: MembraneTransportModel, view: MembraneTransportScreenView,
                      public readonly modelViewTransform: ModelViewTransform2, canvasBounds: Bounds2, tandem: Tandem ) {

    const frameNode = new Rectangle( 0, 0, MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT, {
      stroke: 'black',
      lineWidth: 2,
      pickable: false
    } );

    // Clipping region that contains the background canvas and the ligand node
    const clipNode = new Node( {
      clipArea: Shape.rectangle( 0, 0, MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH, MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT )
    } );

    super( {
      children: [ clipNode, frameNode ],
      accessibleName: MembraneTransportStrings.a11y.observationWindow.membrane.accessibleNameStringProperty
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    const backCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'back' );
    clipNode.addChild( backCanvas );
    this.stepEmitter.addListener( dt => backCanvas.step( dt ) );

    this.slotDragIndicatorNodes = model.slots.map( slot => new SlotDragIndicatorNode( slot, modelViewTransform ) );
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => this.addChild( slotDragIndicatorNode ) );

    this.channelLayer = new ObservationWindowChannelLayer( model, view, modelViewTransform );
    this.stepEmitter.addListener( dt => this.channelLayer.step( dt ) );
    clipNode.addChild( this.channelLayer );

    // ligand and membrane channel layer
    // On top, we will have a layer for the interactive parts of the simulation

    if ( getFeatureSetHasLigands( model.featureSet ) ) {

      // TODO (phet-io, design): Do we really need to instrument all ligand nodes? I hope not.
      //   See LigandNode where input listeners opt out of tandems.
      const groupTandem = tandem.createTandem( 'ligandNodes' ).createGroupTandem( 'ligandNode' );

      const ligandViewNodes = [ new LigandANode(), new LigandBNode() ];
      ligandViewNodes.forEach( ( ligandViewNode, j ) => {
        for ( let i = 0; i < MembraneTransportConstants.LIGAND_COUNT; i++ ) {
          const ligandNode = new LigandNode( model.areLigandsAddedProperty, model.ligands, i + j * MembraneTransportConstants.LIGAND_COUNT, modelViewTransform, ligandViewNode, groupTandem.createNextTandem(), i === 0 );
          this.ligandNodes.push( ligandNode );
        }
      } );

      // Put in random z-order
      const shuffledLigandNodes = dotRandom.shuffle( this.ligandNodes );
      shuffledLigandNodes.forEach( ligandNode => clipNode.addChild( ligandNode ) );
    }

    // NOTE: Duplication with SoluteConcentrationsAccordionBox
    const TEXT_MARGIN = 3;
    const textOptions = { fontSize: 13, maxWidth: 200 };
    const panelOptions = { stroke: null, fill: Color.WHITE.withAlpha( 0.3 ) };
    const outsideText = new Panel( new Text( MembraneTransportStrings.outsideStringProperty, textOptions ), panelOptions );
    const insideText = new Panel( new Text( MembraneTransportStrings.insideStringProperty, textOptions ), panelOptions );

    ManualConstraint.create( this, [ outsideText ], outsideTextProxy => {
      outsideTextProxy.top = TEXT_MARGIN;
      outsideTextProxy.right = MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH - TEXT_MARGIN;
    } );
    ManualConstraint.create( this, [ insideText ], insideTextProxy => {
      insideTextProxy.bottom = MembraneTransportConstants.OBSERVATION_WINDOW_HEIGHT - TEXT_MARGIN;
      insideTextProxy.right = MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH - TEXT_MARGIN;
    } );

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
membraneTransport.register( 'ObservationWindow', ObservationWindow );