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
import MembraneGroupSelectView from './MembraneGroupSelectView.js';
import MembraneTransportScreenView from './MembraneTransportScreenView.js';
import ObservationWindowCanvasNode from './ObservationWindowCanvasNode.js';
import ObservationWindowTransportProteinLayer, { SlottedNode } from './ObservationWindowTransportProteinLayer.js';
import LigandParticleNode from './particles/LigandParticleNode.js';
import getBriefProteinName from './proteins/getBriefProteinName.js';
import SlotDragIndicatorNode from './SlotDragIndicatorNode.js';

// TODO (SR): Extending InteractiveHighlightingNode means all children activate the highlight, https://github.com/phetsims/membrane-transport/issues/45
//   even those that are not interactive. Either focus on interactive parts or make non-interactive children
//   pickable: false.
export default class ObservationWindow extends InteractiveHighlightingNode {

  public readonly ligandNodes: LigandNode[] = [];
  public readonly slotDragIndicatorNodes: SlotDragIndicatorNode[];

  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );
  public readonly membraneGroupSelectView: MembraneGroupSelectView;

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

    // TODO (SR): This is not production worthy, needs refinement, see the design doc. Add i18n. etc. https://github.com/phetsims/membrane-transport/issues/82
    const accessibleParagraphProperty = new StringProperty( 'Zoomed-in Membrane, no proteins in membrane' );

    model.transportProteinCountProperty.link( transportProteinCount => {

      const phrases = model.slots.map( ( slot, index ) => {

        if ( slot.isFilled() ) {

          const transportProtein = slot.transportProteinProperty.value!;
          return `The ${index + 1} slot contains a ${getBriefProteinName( transportProtein.type ).value} transport protein.`;
        }
        else {
          return null;
        }
      } );

      const paragraph = phrases.filter( phrase => phrase !== null ).join( ' ' ); // TODO: https://github.com/phetsims/membrane-transport/issues/102

      accessibleParagraphProperty.set( transportProteinCount === 0 ? 'Zoomed-in Membrane, no proteins in membrane' : 'Zoomed-in Membrane. ' + paragraph );
    } );

    super( {
      children: [ clipNode, frameNode ],
      accessibleHeading: new StringProperty( 'Observation Window' ) // Possibly call this the observation window?
    } );

    // first, we will have a background canvas layer for the performance intensive parts
    const backCanvas = new ObservationWindowCanvasNode( model, modelViewTransform, canvasBounds, 'back' );
    clipNode.addChild( backCanvas );
    this.stepEmitter.addListener( dt => backCanvas.step( dt ) );

    this.slotDragIndicatorNodes = model.slots.map( slot => new SlotDragIndicatorNode( slot, modelViewTransform ) );
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => this.addChild( slotDragIndicatorNode ) );

    this.transportProteinLayer = new ObservationWindowTransportProteinLayer( model, view, modelViewTransform );
    this.stepEmitter.addListener( dt => this.transportProteinLayer.step( dt ) );
    clipNode.addChild( this.transportProteinLayer );

    // ligand and membrane transport protein layer
    // On top, we will have a layer for the interactive parts of the simulation

    if ( getFeatureSetHasLigands( model.featureSet ) ) {

      const focusableLigandTypes = new Set<string>();

      model.ligands.forEach( ligand => {

        const ligandViewNode = new LigandParticleNode( ligand.type );

        // Make the first ligand of each type focusable
        const isFocusable = !focusableLigandTypes.has( ligand.type );
        if ( isFocusable ) {
          focusableLigandTypes.add( ligand.type );
        }

        const ligandNode = new LigandNode(
          model.slots,
          model.areLigandsAddedProperty,
          ligand, modelViewTransform,
          ligandViewNode,
          isFocusable,

          // TODO (phet-io/design) instrument all LigandNodes, since they can all be dragged with mouse? See https://github.com/phetsims/membrane-transport/issues/32
          isFocusable ? tandem.createTandem( ligand.type === 'ligandA' ? 'ligandANode' : 'ligandBNode' ) : Tandem.OPT_OUT
        );
        this.ligandNodes.push( ligandNode );
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

    const groupSelectContainer = new Node( {
      accessibleHeading: 'Cell Membrane',

      // TODO (JG): Make sure that mutating the accessibleName works on all browsers + screen readers https://github.com/phetsims/membrane-transport/issues/97
      accessibleName: new StringProperty( 'hello' ), // TODO (JG): Should be initialized blank, but the group select view is responsible for setting the accessibleName https://github.com/phetsims/membrane-transport/issues/97
      accessibleHelpText: new StringProperty( 'Look for transport proteins.' ),
      accessibleParagraph: accessibleParagraphProperty
    } );
    this.addChild( groupSelectContainer );

    this.membraneGroupSelectView = new MembraneGroupSelectView( model.slots, model.featureSet !== 'simpleDiffusion', view, this, groupSelectContainer );
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

  public step( dt: number ): void {
    this.stepEmitter.emit( dt );

    this.ligandNodes.forEach( ligandNode => ligandNode.step() );
  }

  public reset(): void {
    this.membraneGroupSelectView.reset();
  }

  public clearSlotDragIndicatorHighlights(): void {
    this.slotDragIndicatorNodes.forEach( slotDragIndicatorNode => {
      slotDragIndicatorNode.stroke = 'black';
    } );
  }
}
membraneTransport.register( 'ObservationWindow', ObservationWindow );