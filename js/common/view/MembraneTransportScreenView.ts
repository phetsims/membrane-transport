// Copyright 2024-2025, University of Colorado Boulder

/**
 * ScreenView for the Membrane Transport simulation. Note that this provides the full features of the Playground screen,
 * and the earlier screens opt-out of some of these features.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import { getFeatureSetHasLigands, getFeatureSetHasVoltages, getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import MembraneTransportModelTester from '../model/MembraneTransportModelTester.js';
import { CAPTURE_RADIUS_PROPERTY } from '../model/Particle.js';
import ChannelType from '../model/proteins/ChannelType.js';
import Slot from '../model/Slot.js';
import { getSoluteSpinnerTandemName } from '../model/SoluteType.js';
import ChannelDragNode from './ChannelDragNode.js';
import ChannelToolNode from './ChannelToolNode.js';
import LigandControl from './LigandControl.js';
import MacroCellNode from './MacroCellNode.js';
import MembranePotentialPanel from './MembranePotentialPanel.js';
import MembraneTransportAccordionBoxGroup from './MembraneTransportAccordionBoxGroup.js';
import MembraneTransportScreenSummaryContent from './MembraneTransportScreenSummaryContent.js';
import ObservationWindow from './ObservationWindow.js';
import SoluteConcentrationsAccordionBox from './SoluteConcentrationsAccordionBox.js';
import SoluteControl from './SoluteControl.js';
import SolutesPanel from './SolutesPanel.js';
import ThumbnailNode from './ThumbnailNode.js';

type SelfOptions = EmptySelfOptions;

type MembraneTransportScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class MembraneTransportScreenView extends ScreenView {

  private readonly observationWindow: ObservationWindow;

  private readonly resetEmitter = new Emitter();
  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  private readonly observationWindowModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
    new Vector2( 0, 0 ),
    MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.center,
    MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneTransportConstants.MODEL_WIDTH
  );
  public readonly screenViewModelViewTransform: ModelViewTransform2;
  private afterRelease: ( () => void ) | null = null;
  private readonly membraneTransportAccordionBoxGroup?: MembraneTransportAccordionBoxGroup;

  public constructor(
    public readonly model: MembraneTransportModel,
    providedOptions: MembraneTransportScreenViewOptions ) {

    const options = optionize<MembraneTransportScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      screenSummaryContent: new MembraneTransportScreenSummaryContent( model.featureSet, model )
    }, providedOptions );
    super( options );

    // A model to view transform that maps a model point to a position in the screen view. This transform includes the translation
    // of the observation window so that you can position view components relative to things within the observation window.
    const screenViewModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      new Vector2( 0, 0 ),
      MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.center.plusXY( this.layoutBounds.width / 2 - MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN ),
      MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneTransportConstants.MODEL_WIDTH
    );

    const macroCellNode = new MacroCellNode();
    this.addChild( macroCellNode );

    this.observationWindow = new ObservationWindow( model, this, this.observationWindowModelViewTransform, MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS, options.tandem.createTandem( 'observationWindow' ) );
    this.stepEmitter.addListener( dt => this.observationWindow.step( dt ) );
    this.resetEmitter.addListener( () => this.observationWindow.reset() );

    // Note: x/y to position to account for the stroke width (when the stroke rectangle moves into ObservationWindow).
    // Alignment can be tested with ?dev and by increasing the line width in the ObservationWindow frame line width
    this.observationWindow.x = this.layoutBounds.centerX - MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH / 2;
    this.observationWindow.y = MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( new ThumbnailNode( macroCellNode.thumbnailCenterX, macroCellNode.thumbnailCenterY, this.observationWindow.bounds ) );
    this.addChild( this.observationWindow );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - MembraneTransportConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( resetAllButton );

    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      flowBoxSpacing: 12,
      timeSpeedProperty: model.timeSpeedProperty,
      playPauseStepButtonOptions: {
        includeStepForwardButton: false
      },
      speedRadioButtonGroupOptions: {
        labelOptions: {
          maxWidth: 90
        }
      },
      tandem: options.tandem.createTandem( 'timeControlNode' ),
      left: this.observationWindow.right + MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,
      bottom: this.layoutBounds.maxY - MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN
    } );

    this.addChild( timeControlNode );

    const hasAnySolutesProperty = new DerivedProperty( [ model.insideSoluteTypesCountProperty, model.outsideSoluteTypesCountProperty ], ( inside, outside ) => {
      return inside > 0 || outside > 0;
    } );

    const resetSolutesButton = new MoveToTrashButton( {
      baseColor: 'rgb(220,220,232)',
      arrowColor: PhetColorScheme.RED_COLORBLIND,
      tandem: options.tandem.createTandem( 'resetSolutesButton' ),
      left: this.observationWindow.right + MembraneTransportConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.observationWindow.bottom,
      accessibleName: MembraneTransportStrings.a11y.resetSolutesButton.accessibleNameStringProperty,
      enabledProperty: hasAnySolutesProperty
    } );

    resetSolutesButton.addListener( () => {
      this.alertDescriptionUtterance( MembraneTransportStrings.a11y.resetSolutesButton.accessibleContextResponseStringProperty );
      model.clear();
    } );
    this.addChild( resetSolutesButton );

    // Solute concentrations
    const soluteConcentrationsAccordionBox = new SoluteConcentrationsAccordionBox( model, {
      tandem: options.tandem.createTandem( 'soluteConcentrationsAccordionBox' )
    } );

    this.resetEmitter.addListener( () => soluteConcentrationsAccordionBox.reset() );

    soluteConcentrationsAccordionBox.left = this.layoutBounds.left + MembraneTransportConstants.SCREEN_VIEW_X_MARGIN;
    soluteConcentrationsAccordionBox.bottom = this.layoutBounds.bottom - MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( soluteConcentrationsAccordionBox );
    this.stepEmitter.addListener( dt => soluteConcentrationsAccordionBox.stepEmitter.emit( dt ) );

    const soluteControlsTandem = options.tandem.createTandem( 'soluteControls' );

    const solutesPanel = new SolutesPanel( model.featureSet, model.selectedSoluteProperty, {
      tandem: soluteControlsTandem.createTandem( 'solutesPanel' ),
      left: this.layoutBounds.left + MembraneTransportConstants.SCREEN_VIEW_X_MARGIN,
      top: MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN
    } );

    this.addChild( solutesPanel );

    // For keyboard focus order
    const soluteControls: SoluteControl[] = [];

    const outsideSoluteControlsTandem = soluteControlsTandem.createTandem( 'outsideSoluteControls' );
    const insideSoluteControlsTandem = soluteControlsTandem.createTandem( 'insideSoluteControls' );

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
          bottom: screenViewModelViewTransform.modelToViewY( MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ),
          tandem: outsideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) )
        } );
        outsideSoluteControlNode.addChild( outsideSoluteControl );
        soluteControls.push( outsideSoluteControl );
      }

      const insideSoluteControl = new SoluteControl( this.model, soluteType, 'inside', {
        centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
        top: screenViewModelViewTransform.modelToViewY( MembraneTransportConstants.MEMBRANE_BOUNDS.minY ),
        tandem: insideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) )
      } );
      insideSoluteControlNode.addChild( insideSoluteControl );
      soluteControls.push( insideSoluteControl );
    } );

    this.addChild( outsideSoluteControlNode );
    this.addChild( insideSoluteControlNode );

    const rightSideVBoxChildren: Node[] = [];
    if ( model.featureSet !== 'simpleDiffusion' ) {
      const membraneTransportAccordionBoxGroup = new MembraneTransportAccordionBoxGroup( model, options.tandem.createTandem( 'membraneProteinsAccordionBoxGroup' ), this );
      this.resetEmitter.addListener( () => membraneTransportAccordionBoxGroup.reset() );

      rightSideVBoxChildren.push( membraneTransportAccordionBoxGroup );

      this.membraneTransportAccordionBoxGroup = membraneTransportAccordionBoxGroup;
    }

    if ( getFeatureSetHasVoltages( model.featureSet ) ) {
      const membranePotentialPanel = new MembranePotentialPanel( model, options.tandem.createTandem( 'membranePotentialPanel' ) );
      rightSideVBoxChildren.push( membranePotentialPanel );
    }

    if ( getFeatureSetHasLigands( model.featureSet ) ) {
      // TODO: Choose a nice tandem
      // TODO: Rename LigandControl to match the tandem
      const ligandControl = new LigandControl( model, options.tandem.createTandem( 'addRemoveLigandsButton' ) );

      rightSideVBoxChildren.push( ligandControl );
    }

    const rightSideVBox = new VBox( {
      spacing: MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,
      children: rightSideVBoxChildren,
      top: MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,
      centerX: ( this.layoutBounds.right + this.observationWindow.right ) / 2
    } );
    this.addChild( rightSideVBox );

    this.pdomPlayAreaNode.pdomOrder = [
      solutesPanel,
      ...soluteControls,
      soluteConcentrationsAccordionBox,
      this.observationWindow,
      rightSideVBox,
      ...this.observationWindow.ligandNodes
    ];

    this.pdomControlAreaNode.pdomOrder = [
      resetSolutesButton,
      timeControlNode,
      resetAllButton
    ];

    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Circle( 5, { fill: 'red', opacity: 0.5, center: screenViewModelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) } ) );
      macroCellNode.moveToFront();
    }

    // TODO (dev): These are just for debugging, remove before publication.
    // Add hotkeys that let us easily test model behavior.
    KeyboardListener.createGlobal( this, { keys: [ 'q' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'sodium', true, 'outside' ) } );
    KeyboardListener.createGlobal( this, { keys: [ 'w' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'sodium', false, 'outside' ) } );
    KeyboardListener.createGlobal( this, { keys: [ 'e' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'potassium', true, 'outside' ) } );
    KeyboardListener.createGlobal( this, { keys: [ 'r' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'potassium', false, 'outside' ) } );

    // From inside the cell
    KeyboardListener.createGlobal( this, { keys: [ 'a' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'sodium', true, 'inside' ) } );
    KeyboardListener.createGlobal( this, { keys: [ 's' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'sodium', false, 'inside' ) } );
    KeyboardListener.createGlobal( this, { keys: [ 'd' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'potassium', true, 'inside' ) } );
    KeyboardListener.createGlobal( this, { keys: [ 'f' ], fire: () => MembraneTransportModelTester.testLigandChannel( model, 'potassium', false, 'inside' ) } );

    // Toggle the capture radius
    KeyboardListener.createGlobal( this, {
      keys: [ 'm' ], fire: () => {
        const initialValue = CAPTURE_RADIUS_PROPERTY.initialValue;
        CAPTURE_RADIUS_PROPERTY.value = CAPTURE_RADIUS_PROPERTY.value === initialValue ? initialValue * 100 : initialValue;
      }
    } );

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
    const slotX = slot.position;
    const y = 10;
    const modelPoint = new Vector2( slotX, y );

    const channelDragNode = this.createChannelDragNode( modelPoint, type, origin );
    channelDragNode.pickable = false; // keyboard only
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
    dt *= this.model.getTimeSpeedFactor();
    this.stepEmitter.emit( dt );
  }

  public keyboardDroppedMembraneChannel(): void {
    this.afterRelease && this.afterRelease();
    this.afterRelease = null;
  }

  public getChannelToolNode( type: ChannelType ): ChannelToolNode {
    return this.membraneTransportAccordionBoxGroup!.getChannelToolNode( type );
  }
}

membraneTransport.register( 'MembraneTransportScreenView', MembraneTransportScreenView );
