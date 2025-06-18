// Copyright 2025, University of Colorado Boulder

/**
 * Shows the rectangle with the cross-section of the cell membrane where solutes, ligands, transport proteins are.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Shape from '../../../../kite/js/Shape.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import { getFeatureSetHasLigands } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import InsideOutsideLabel from './InsideOutsideLabel.js';
import LigandNode from './LigandNode.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';
import ObservationWindowTransportProteinLayer, { SlottedNode } from './ObservationWindowTransportProteinLayer.js';
import LigandParticleNode from './particles/LigandParticleNode.js';
import SlotDragIndicatorNode from './SlotDragIndicatorNode.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

export default class ObservationWindow extends Node {

  public readonly ligandNodes: LigandNode[] = [];
  public readonly slotDragIndicatorNodes: SlotDragIndicatorNode[];

  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );
  private readonly resetEmitter = new Emitter();

  private readonly transportProteinLayer: ObservationWindowTransportProteinLayer;

  public constructor(
    model: MembraneTransportModel,
    view: MembraneTransportScreenView,
    public readonly modelViewTransform: ModelViewTransform2,
    canvasBounds: Bounds2,
    tandem: Tandem
  ) {

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
      accessibleHeading: new StringProperty( 'Observation Window' ) // Possibly call this the observation window?
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    const backCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'back' );
    clipNode.addChild( backCanvas );
    this.stepEmitter.addListener( dt => backCanvas.step( dt ) );

    this.slotDragIndicatorNodes = model.membraneSlots.map( slot => new SlotDragIndicatorNode( slot, modelViewTransform ) );
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => this.addChild( slotDragIndicatorNode ) );

    this.transportProteinLayer = new ObservationWindowTransportProteinLayer( model, view, modelViewTransform );
    this.stepEmitter.addListener( dt => this.transportProteinLayer.step( dt ) );
    clipNode.addChild( this.transportProteinLayer );

    // ligand and membrane transport protein layer
    // On top, we will have a layer for the interactive parts of the simulation

    if ( getFeatureSetHasLigands( model.featureSet ) ) {

      const focusableLigandTypes = new Set<string>();
      let focusableTriangleLigandNode: LigandNode | null = null;
      let focusableStarLigandNode: LigandNode | null = null;

      model.ligands.forEach( ligand => {

        const ligandViewNode = new LigandParticleNode( ligand.type );

        // Make the first ligand of each type focusable
        const isFocusable = !focusableLigandTypes.has( ligand.type );
        if ( isFocusable ) {
          focusableLigandTypes.add( ligand.type );
        }

        const ligandNode = new LigandNode(
          model.membraneSlots,
          model.areLigandsAddedProperty,
          ligand, modelViewTransform,
          ligandViewNode,
          isFocusable,
          model.transportProteinCountProperty,
          model.ligandUnboundDueToNaturalCausesEmitter,

          // NOTE: In phet-io, we used to instrument all interactive objects, but in this case, that seems like overinstrumentation. Instead,
          // just instrument the one focusable ligand of each type. See https://github.com/phetsims/membrane-transport/issues/32
          isFocusable ? tandem.createTandem( ligand.type === 'triangleLigand' ? 'triangleLigandNode' : 'starLigandNode' ) : Tandem.OPT_OUT,

          this
        );

        // Track the focusable ligand nodes by type
        if ( isFocusable && ligand.type === 'triangleLigand' ) {
          focusableTriangleLigandNode = ligandNode;
        }
        else if ( isFocusable && ligand.type === 'starLigand' ) {
          focusableStarLigandNode = ligandNode;
        }

        this.ligandNodes.push( ligandNode );
        this.resetEmitter.addListener( () => ligandNode.resetEmitter.emit() );
      } );

      // Order ligand nodes with focusable ones at the front, triangle first, then star
      const orderedLigandNodes: LigandNode[] = [];

      focusableTriangleLigandNode && orderedLigandNodes.push( focusableTriangleLigandNode );
      focusableStarLigandNode && orderedLigandNodes.push( focusableStarLigandNode );

      // Add the remaining ligand nodes in random order
      const remainingNodes = this.ligandNodes.filter( node => node !== focusableTriangleLigandNode && node !== focusableStarLigandNode );
      const shuffledRemainingNodes = dotRandom.shuffle( remainingNodes );
      orderedLigandNodes.push( ...shuffledRemainingNodes );

      // Add all nodes to clipNode in the specified order
      orderedLigandNodes.forEach( ligandNode => clipNode.addChild( ligandNode ) );
    }

    // NOTE: Duplication with SoluteConcentrationsAccordionBox
    const TEXT_MARGIN = 3;
    const outsideText = new InsideOutsideLabel( 'outside' );
    const insideText = new InsideOutsideLabel( 'inside' );

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
  }

  public getTransportProteinNodes(): SlottedNode[] {
    return this.transportProteinLayer.getTransportProteinNodes();
  }

  /**
   * Sets slot indicators to be visible or invisible. Filled slots will always have invisible indicators.
   * NOTE: This is called from mouse and keyboard interaction, so those will compete and "fight", whichever happens more
   * recently takes precedence
   */
  public setSlotDragIndicatorsVisible( visible: boolean ): void {
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => {
      slotDragIndicatorNode.visible = visible;
    } );
  }

  public forwardFromKeyboard( slot: Slot, type: TransportProteinType, toolNode: TransportProteinToolNode ): void {
    this.transportProteinLayer.forwardFromKeyboard( slot, type, toolNode );
  }

  public step( dt: number ): void {
    this.stepEmitter.emit( dt );

    this.ligandNodes.forEach( ligandNode => ligandNode.step() );
  }

  public reset(): void {
    this.resetEmitter.emit();
  }

  public clearSlotDragIndicatorHighlights(): void {
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => {
      slotDragIndicatorNode.stroke = 'black';
    } );
  }
}
membraneTransport.register( 'ObservationWindow', ObservationWindow );