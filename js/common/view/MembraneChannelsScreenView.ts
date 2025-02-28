// Copyright 2024-2025, University of Colorado Boulder

/**
 * ScreenView for the Membrane Channels simulation. Note that this provides the full features of the Playground screen,
 * and the earlier screens opt-out of some of these features.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MoveToTrashButton from '../../../../scenery-phet/js/buttons/MoveToTrashButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import { getFeatureSetHasLigands, getFeatureSetHasVoltages, getFeatureSetSoluteTypes } from '../MembraneChannelsFeatureSet.js';
import ChannelType from '../model/ChannelType.js';
import MembraneChannelsModel, { Slot } from '../model/MembraneChannelsModel.js';
import { getSoluteSpinnerTandemName } from '../model/SoluteType.js';
import ChannelDragNode from './ChannelDragNode.js';
import ChannelToolNode from './ChannelToolNode.js';
import LigandControl from './LigandControl.js';
import MacroCellNode from './MacroCellNode.js';
import MembraneChannelsAccordionBoxGroup from './MembraneChannelsAccordionBoxGroup.js';
import MembraneChannelsScreenSummaryContent from './MembraneChannelsScreenSummaryContent.js';
import MembranePotentialPanel from './MembranePotentialPanel.js';
import ObservationWindow from './ObservationWindow.js';
import SoluteBarChartsAccordionBox from './SoluteBarChartsAccordionBox.js';
import SoluteControl from './SoluteControl.js';
import SolutesPanel from './SolutesPanel.js';
import ThumbnailNode from './ThumbnailNode.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class MembraneChannelsScreenView extends ScreenView {

  private readonly observationWindow: ObservationWindow;

  private readonly resetEmitter = new Emitter();
  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  private readonly observationWindowModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
    new Vector2( 0, 0 ),
    MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS.center,
    MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneChannelsConstants.MODEL_WIDTH
  );
  public readonly screenViewModelViewTransform: ModelViewTransform2;
  private afterRelease: ( () => void ) | null = null;
  private readonly membraneChannelsAccordionBoxGroup?: MembraneChannelsAccordionBoxGroup;

  public constructor(
    public readonly model: MembraneChannelsModel,
    providedOptions: MembraneChannelsScreenViewOptions ) {

    const options = optionize<MembraneChannelsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      screenSummaryContent: new MembraneChannelsScreenSummaryContent( model.featureSet, model )
    }, providedOptions );
    super( options );

    // A model to view transform that maps a model point to a position in the screen view. This transform includes the translation
    // of the observation window so that you can position view components relative to things within the observation window.
    const screenViewModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      new Vector2( 0, 0 ),
      MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS.center.plusXY( this.layoutBounds.width / 2 - MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN ),
      MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneChannelsConstants.MODEL_WIDTH
    );

    const macroCellNode = new MacroCellNode();
    this.addChild( macroCellNode );

    this.observationWindow = new ObservationWindow( model, this, this.observationWindowModelViewTransform, MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS, options.tandem.createTandem( 'observationWindow' ) );
    this.stepEmitter.addListener( dt => this.observationWindow.step( dt ) );
    this.resetEmitter.addListener( () => this.observationWindow.reset() );

    // Note: x/y to position to account for the stroke width (when the stroke rectangle moves into ObservationWindow).
    // Alignment can be tested with ?dev and by increasing the line width in the ObservationWindow frame line width
    this.observationWindow.x = this.layoutBounds.centerX - MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2;
    this.observationWindow.y = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( new ThumbnailNode( macroCellNode.thumbnailCenterX, macroCellNode.thumbnailCenterY, this.observationWindow.bounds ) );
    this.addChild( this.observationWindow );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( resetAllButton );

    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      timeSpeedProperty: model.timeSpeedProperty,
      playPauseStepButtonOptions: {
        includeStepForwardButton: false
      },
      tandem: options.tandem.createTandem( 'timeControlNode' )
    } );

    timeControlNode.left = this.observationWindow.right + MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;
    timeControlNode.bottom = this.layoutBounds.maxY - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( timeControlNode );

    const trashButton = new MoveToTrashButton( {
      baseColor: 'rgb(220,220,232)',
      arrowColor: PhetColorScheme.RED_COLORBLIND,
      tandem: options.tandem.createTandem( 'trashButton' ),
      left: this.observationWindow.right + MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.observationWindow.bottom
    } );
    trashButton.addListener( () => model.clear() );
    this.addChild( trashButton );

    // Solute bar charts
    const soluteBarChartsAccordionBox = new SoluteBarChartsAccordionBox( model, {
      tandem: options.tandem.createTandem( 'soluteBarChartsAccordionBox' )
    } );

    this.resetEmitter.addListener( () => soluteBarChartsAccordionBox.reset() );

    soluteBarChartsAccordionBox.left = this.layoutBounds.left + MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN;
    soluteBarChartsAccordionBox.bottom = this.layoutBounds.bottom - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( soluteBarChartsAccordionBox );
    this.stepEmitter.addListener( dt => soluteBarChartsAccordionBox.stepEmitter.emit( dt ) );

    const solutesPanel = new SolutesPanel( model.featureSet, model.selectedSoluteProperty, {
      tandem: options.tandem.createTandem( 'solutesPanel' ),
      left: this.layoutBounds.left + MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN,
      top: MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN
    } );

    this.addChild( solutesPanel );

    // For keyboard focus order
    const soluteControls: SoluteControl[] = [];

    const outsideSoluteControlsTandem = options.tandem.createTandem( 'outsideSoluteControls' );
    const insideSoluteControlsTandem = options.tandem.createTandem( 'insideSoluteControls' );

    // Make it possible to hide or show the entire outside or inside solute control panel
    const outsideSoluteControlNode = new Node( {
      tandem: outsideSoluteControlsTandem
    } );
    const insideSoluteControlNode = new Node( {
      tandem: insideSoluteControlsTandem
    } );

    // Number controls for the 'outside' solute concentrations
    // Loop through the outsideSoluteCountProperties record and create a FineCoarseSpinner for each one
    getFeatureSetSoluteTypes( model.featureSet ).forEach( soluteType => {

      // ATP can only be added inside the cell
      if ( soluteType !== 'atp' ) {
        const outsideSoluteControl = new SoluteControl( this.model, soluteType, 'outside', {
          centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
          bottom: screenViewModelViewTransform.modelToViewY( MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY ),
          tandem: outsideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) )
        } );
        outsideSoluteControlNode.addChild( outsideSoluteControl );
        soluteControls.push( outsideSoluteControl );
      }

      const insideSoluteControl = new SoluteControl( this.model, soluteType, 'inside', {
        centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
        top: screenViewModelViewTransform.modelToViewY( MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ),
        tandem: insideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) )
      } );
      insideSoluteControlNode.addChild( insideSoluteControl );
      soluteControls.push( insideSoluteControl );
    } );

    this.addChild( outsideSoluteControlNode );
    this.addChild( insideSoluteControlNode );

    const rightSideVBoxChildren: Node[] = [];
    if ( model.featureSet !== 'simpleDiffusion' ) {
      const membraneChannelsAccordionBoxGroup = new MembraneChannelsAccordionBoxGroup( model, options.tandem.createTandem( 'membraneChannelsAccordionBoxGroup' ), this );
      this.resetEmitter.addListener( () => membraneChannelsAccordionBoxGroup.reset() );

      rightSideVBoxChildren.push( membraneChannelsAccordionBoxGroup );

      this.membraneChannelsAccordionBoxGroup = membraneChannelsAccordionBoxGroup;
    }

    if ( getFeatureSetHasVoltages( model.featureSet ) ) {
      const membranePotentialPanel = new MembranePotentialPanel( model, options.tandem.createTandem( 'membranePotentialPanel' ) );
      rightSideVBoxChildren.push( membranePotentialPanel );
    }

    if ( getFeatureSetHasLigands( model.featureSet ) ) {
      const ligandControl = new LigandControl( model, options.tandem.createTandem( 'ligandControl' ) );

      rightSideVBoxChildren.push( ligandControl );
    }

    const rightSideVBox = new VBox( {
      spacing: MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN,
      children: rightSideVBoxChildren,
      top: MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN,
      centerX: ( this.layoutBounds.right + this.observationWindow.right ) / 2
    } );
    this.addChild( rightSideVBox );

    this.pdomPlayAreaNode.pdomOrder = [
      solutesPanel,
      ...soluteControls,
      soluteBarChartsAccordionBox,
      this.observationWindow,
      rightSideVBox,
      ...this.observationWindow.ligandNodes
    ];

    this.pdomControlAreaNode.pdomOrder = [
      trashButton,
      timeControlNode,
      resetAllButton
    ];

    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Circle( 5, { fill: 'red', opacity: 0.5, center: screenViewModelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) } ) );
      macroCellNode.moveToFront();
    }

    this.screenViewModelViewTransform = screenViewModelViewTransform;
  }

  /**
   * Creates a channel drag node with the given parameters
   * @param modelPosition - The model position to place the drag node
   * @param type - The type of channel to create
   * @param origin - Where the channel came from
   * @param channelToolNode - The channel tool node that the channel will animate to if dropped in the empty area
   * @returns The created channel drag node
   */
  private createChannelDragNode( modelPosition: Vector2, type: ChannelType, origin: Slot | ChannelToolNode ): ChannelDragNode {
    const channelDragNode = new ChannelDragNode(
      this.model,
      this,
      this.observationWindow,
      this.screenViewModelViewTransform,
      modelPosition,
      this.visibleBoundsProperty,
      type,
      origin
    );
    this.addChild( channelDragNode );
    
    return channelDragNode;
  }

  /**
   * Called when the user presses a membrane protein in the accordion box to create one with mouse drag.
   */
  public createFromMouseDrag( event: PressListenerEvent, type: ChannelType, origin: Slot | ChannelToolNode ): void {
    const viewPoint = this.globalToLocalPoint( event.pointer.point );
    const modelPosition = this.screenViewModelViewTransform.viewToModelPosition( viewPoint );

    const channelDragNode = this.createChannelDragNode( modelPosition, type, origin );
    channelDragNode.press( event );
  }

  public forwardFromKeyboard( type: ChannelType, channelToolNode: ChannelToolNode ): void {
    const slot = this.model.getLeftmostEmptySlot() || this.model.getMiddleSlot();
    this.observationWindow.membraneGroupSelectView.forwardFromKeyboard( slot, type, channelToolNode );
    this.afterRelease = () => channelToolNode.focus();
  }

  /**
   * Called when the user presses a membrane protein in the accordion box to create one via keyboard.
   */
  public createFromKeyboard( type: ChannelType, origin: Slot | ChannelToolNode ): ChannelDragNode {
    // Move over the first available slot
    const slot = this.model.getLeftmostEmptySlot() || this.model.getMiddleSlot();
    const slotX = this.model.getSlotPosition( slot );
    const y = 10;
    const modelPoint = new Vector2( slotX, y );

    const channelDragNode = this.createChannelDragNode( modelPoint, type, origin );

    // TODO: once keyboarded, prevent mouse+touch, or do this on init
    // channelDragNode.pickable = false; // keyboard only

    return channelDragNode;
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    this.resetEmitter.emit();
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    this.stepEmitter.emit( dt );
  }

  public keyboardDroppedMembraneChannel(): void {
    this.afterRelease && this.afterRelease();
    this.afterRelease = null;
  }

  public getChannelToolNode( type: ChannelType ): ChannelToolNode {
    return this.membraneChannelsAccordionBoxGroup!.getChannelToolNode( type );
  }
}

membraneChannels.register( 'MembraneChannelsScreenView', MembraneChannelsScreenView );
