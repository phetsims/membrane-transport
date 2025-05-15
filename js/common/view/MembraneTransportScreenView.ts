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
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportStrings from '../../MembraneTransportStrings.js';
import { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { CAPTURE_RADIUS_PROPERTY } from '../model/Particle.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import { getSoluteSpinnerTandemName } from '../model/SoluteType.js';
import MacroCellNode from './MacroCellNode.js';
import MembraneTransportScreenSummaryContent from './MembraneTransportScreenSummaryContent.js';
import ObservationWindow from './ObservationWindow.js';
import SoluteConcentrationsAccordionBox from './SoluteConcentrationsAccordionBox.js';
import SoluteControl from './SoluteControl.js';
import SolutesPanel from './SolutesPanel.js';
import ThumbnailNode from './ThumbnailNode.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';
import TransportProteinPanel from './TransportProteinPanel.js';
import TransportProteinToolNode from './TransportProteinToolNode.js';

type SelfOptions = EmptySelfOptions;

type MembraneTransportScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class MembraneTransportScreenView extends ScreenView {

  private readonly observationWindow: ObservationWindow;

  private readonly resetEmitter = new Emitter();
  private readonly stepEmitter = new Emitter<[ number ]>( {
    parameters: [ { valueType: 'number' } ]
  } );

  public readonly screenViewModelViewTransform: ModelViewTransform2;
  private afterRelease: ( () => void ) | null = null;
  private readonly transportProteinPanel?: TransportProteinPanel;

  public constructor(
    public readonly model: MembraneTransportModel,
    providedOptions: MembraneTransportScreenViewOptions ) {

    const options = optionize<MembraneTransportScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      screenSummaryContent: new MembraneTransportScreenSummaryContent( model )
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

    this.observationWindow = new ObservationWindow( model, this, MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM, MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS, options.tandem.createTandem( 'observationWindow' ) );
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
      left: this.observationWindow.right + 36,
      bottom: this.layoutBounds.maxY - MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN
    } );

    this.addChild( timeControlNode );

    const hasAnySolutesProperty = new DerivedProperty( [ model.insideSoluteTypesCountProperty, model.outsideSoluteTypesCountProperty ], ( inside, outside ) => {
      return inside > 0 || outside > 0;
    } );

    // A parent Node for the controls related to selecting solutes, adding solutes, and removing solutes.
    const soluteControlsNode = new Node( {
      accessibleHeading: MembraneTransportStrings.a11y.soluteControls.accessibleHeadingStringProperty,
      accessibleHelpText: MembraneTransportStrings.a11y.soluteControlsAccessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );
    this.addChild( soluteControlsNode );

    const eraseSolutesButton = new EraserButton( {
      baseColor: 'rgb(239,214,147)',
      tandem: options.tandem.createTandem( 'eraseSolutesButton' ),
      right: this.observationWindow.left - MembraneTransportConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.observationWindow.bottom,
      accessibleName: MembraneTransportStrings.a11y.eraseSolutesButton.accessibleNameStringProperty,
      accessibleContextResponse: MembraneTransportStrings.a11y.eraseSolutesButton.accessibleContextResponseStringProperty,
      enabledProperty: hasAnySolutesProperty
    } );

    eraseSolutesButton.addListener( () => {
      model.clear();
    } );
    soluteControlsNode.addChild( eraseSolutesButton );

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

    const solutesPanel = new SolutesPanel( model.featureSet, model.soluteProperty, {
      tandem: soluteControlsTandem.createTandem( 'solutesPanel' ),
      centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
      top: MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN
    } );
    soluteControlsNode.addChild( solutesPanel );

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

      if ( soluteType === 'adp' || soluteType === 'phosphate' ) {
        return;
      }

      // ATP can only be added inside the cell
      if ( soluteType !== 'atp' ) {
        const outsideSoluteControl = new SoluteControl( this.model, soluteType, 'outside',
          outsideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) ), {
            centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
            bottom: screenViewModelViewTransform.modelToViewY( MembraneTransportConstants.MEMBRANE_BOUNDS.maxY ),
            preferredWidth: solutesPanel.width // Match the width with the solutesPanel above
          } );
        outsideSoluteControlNode.addChild( outsideSoluteControl );
        soluteControls.push( outsideSoluteControl );
      }

      const insideSoluteControl = new SoluteControl( this.model, soluteType, 'inside',
        insideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) ), {
          centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
          top: screenViewModelViewTransform.modelToViewY( MembraneTransportConstants.MEMBRANE_BOUNDS.minY ),
          preferredWidth: solutesPanel.width // Match the width with the solutesPanel above
        } );
      insideSoluteControlNode.addChild( insideSoluteControl );
      soluteControls.push( insideSoluteControl );
    } );

    soluteControlsNode.addChild( outsideSoluteControlNode );
    soluteControlsNode.addChild( insideSoluteControlNode );

    const rightSideVBoxChildren: Node[] = [];
    if ( model.featureSet !== 'simpleDiffusion' ) {
      const transportProteinPanel = new TransportProteinPanel( model, options.tandem.createTandem( 'transportProteinPanel' ), this );
      this.resetEmitter.addListener( () => transportProteinPanel.reset() );
      rightSideVBoxChildren.push( transportProteinPanel );
      this.transportProteinPanel = transportProteinPanel;
    }

    const rightSideVBox = new VBox( {
      spacing: MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,
      children: rightSideVBoxChildren,
      top: MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,
      centerX: ( this.layoutBounds.right + this.observationWindow.right ) / 2
    } );
    this.addChild( rightSideVBox );

    soluteControlsNode.pdomOrder = [
      solutesPanel,
      ...soluteControls,
      eraseSolutesButton
    ];

    this.pdomPlayAreaNode.pdomOrder = [
      soluteControlsNode,
      soluteConcentrationsAccordionBox,
      this.observationWindow, // Contains the ligands.
      rightSideVBox
    ];

    this.pdomControlAreaNode.pdomOrder = [
      timeControlNode,
      resetAllButton
    ];

    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Circle( 5, { fill: 'red', opacity: 0.5, center: screenViewModelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) } ) );
      macroCellNode.moveToFront();
    }

    // Toggle the capture radius
    KeyboardListener.createGlobal( this, {
      keys: [ 'm' ], fire: () => {
        const initialValue = CAPTURE_RADIUS_PROPERTY.initialValue;
        CAPTURE_RADIUS_PROPERTY.value = CAPTURE_RADIUS_PROPERTY.value === initialValue ? initialValue * 100 : initialValue;
        console.log( 'Capture radius: ', CAPTURE_RADIUS_PROPERTY.value );
      }
    } );

    this.screenViewModelViewTransform = screenViewModelViewTransform;

    model.soluteCrossedMembraneEmitter.addListener( ( particle, direction ) => {
      MembraneTransportSounds.soluteCrossedMembrane( particle.type, direction );
    } );
  }

  /**
   * Creates a transport protein drag node with the given parameters
   * @param modelPosition - The model position to place the drag node
   * @param type - The type to create
   * @param origin - Where the transport protein came from
   * @returns The created transport protein drag node
   */
  private createTransportProteinDragNode( modelPosition: Vector2, type: TransportProteinType, origin: Slot | TransportProteinToolNode ): TransportProteinDragNode {
    const transportProteinDragNode = new TransportProteinDragNode(
      this,
      this.observationWindow,
      this.screenViewModelViewTransform,
      modelPosition,
      this.visibleBoundsProperty,
      type,
      origin
    );
    this.addChild( transportProteinDragNode );

    return transportProteinDragNode;
  }

  /**
   * Called when the user presses a membrane protein in the toolbox to create one with mouse drag.
   */
  public createFromMouseDrag( event: PressListenerEvent, type: TransportProteinType, origin: Slot | TransportProteinToolNode ): void {
    const viewPoint = this.globalToLocalPoint( event.pointer.point );
    const modelPosition = this.screenViewModelViewTransform.viewToModelPosition( viewPoint );

    const channelDragNode = this.createTransportProteinDragNode( modelPosition, type, origin );
    channelDragNode.press( event );
    MembraneTransportSounds.transportProteinGrabbed();
  }

  /**
   * Called when the user presses a membrane protein in the toolbox to create one via keyboard.
   */
  public createFromKeyboard( type: TransportProteinType, origin: Slot ): TransportProteinDragNode {

    // Move over the first available slot
    const slotX = origin.position;
    const y = 10;
    const modelPoint = new Vector2( slotX, y );

    const dragNode = this.createTransportProteinDragNode( modelPoint, type, origin );
    dragNode.pickable = false; // keyboard only
    return dragNode;
  }

  public forwardFromKeyboard( type: TransportProteinType ): void {
    const slot = this.model.getLeftmostEmptySlot() || this.model.getMiddleSlot();
    this.observationWindow.forwardFromKeyboard( slot, type );
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
    super.step( dt );
    dt *= this.model.getTimeSpeedFactor();
    this.stepEmitter.emit( dt );
  }

  public keyboardDroppedOrDeletedTransportProtein(): void {
    this.afterRelease && this.afterRelease();
    this.afterRelease = null;
  }

  public getTransportProteinToolNode( type: TransportProteinType ): TransportProteinToolNode {
    return this.transportProteinPanel!.getTransportProteinToolNode( type );
  }
}

membraneTransport.register( 'MembraneTransportScreenView', MembraneTransportScreenView );