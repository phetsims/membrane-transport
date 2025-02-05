// Copyright 2024-2025, University of Colorado Boulder

/**
 * ScreenView for the Membrane Channels simulation. Note that this provides the full features of the Playgound screen,
 * and the earlier screens opt-out of some of these features.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MoveToTrashButton from '../../../../scenery-phet/js/buttons/MoveToTrashButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import { Circle, DragListener, Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import { getFeatureSetHasVoltages } from '../MembraneChannelsFeatureSet.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import { getSoluteSpinnerTandemName, SoluteTypes } from '../model/SoluteType.js';
import MacroCellNode from './MacroCellNode.js';
import MembraneChannelsAccordionBoxGroup from './MembraneChannelsAccordionBoxGroup.js';
import MembranePotentialPanel from './MembranePotentialPanel.js';
import ObservationWindow from './ObservationWindow.js';
import SoluteBarChartsAccordionBox from './SoluteBarChartsAccordionBox.js';
import SoluteControl from './SoluteControl.js';
import SolutesPanel from './SolutesPanel.js';

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

  public constructor(
    public readonly model: MembraneChannelsModel,
    providedOptions: MembraneChannelsScreenViewOptions ) {

    const options = optionize<MembraneChannelsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {}, providedOptions );
    super( options );

    // A model to view transform that maps a model point to a positionin the screen view. This transform includes the translation
    // of the observation window so that you can position view components relative to things within the observation window.
    const screenViewModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      new Vector2( 0, 0 ),
      MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS.center.plusXY( this.layoutBounds.width / 2 - MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN ),
      MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneChannelsConstants.MODEL_WIDTH
    );

    const macroCellNode = new MacroCellNode();
    this.addChild( macroCellNode );

    this.observationWindow = new ObservationWindow( model, this.observationWindowModelViewTransform, MembraneChannelsConstants.OBSERVATION_WINDOW_BOUNDS );
    this.stepEmitter.addListener( dt => this.observationWindow.step( dt ) );

    // Note: x/y to position to account for the stroke width (when the stroke rectangle moves into ObservationWindow).
    // Alignment can be tested with ?dev and by increasing the line width in the ObservationWindow frame line width
    this.observationWindow.x = this.layoutBounds.centerX - MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2;
    this.observationWindow.y = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

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

    resetAllButton.rightBottom = new Vector2( this.layoutBounds.maxX - MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN, this.observationWindow.bottom );

    this.addChild( resetAllButton );

    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      timeSpeedProperty: model.timeSpeedProperty,
      playPauseStepButtonOptions: {
        includeStepForwardButton: false
      },
      tandem: options.tandem.createTandem( 'timeControlNode' )
    } );

    timeControlNode.left = this.observationWindow.right + MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;
    timeControlNode.bottom = resetAllButton.top - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

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

    const realCircle = new Circle( 15, {
      fill: 'rgba( 0,0,255,0.5)',
      left: 0,
      top: 0,
      cursor: 'pointer',
      visible: false
    } );
    this.addChild( realCircle );

    const myCirclePositionProperty = new Vector2Property( new Vector2( 0, 0 ) );
    myCirclePositionProperty.link( position => {
      realCircle.center = screenViewModelViewTransform.modelToViewPosition( position );
    } );

    // TODO: If the model Bounds changes and leaves the object offscreen, move the object onscreen.
    // TODO: Keyboard support
    const modelBoundsProperty = new DerivedProperty( [ this.visibleBoundsProperty ], visibleBounds => {
      return screenViewModelViewTransform.viewToModelBounds( visibleBounds );
    } );

    const solutesPanel = new SolutesPanel( model.featureSet, model.selectedSoluteProperty, options.tandem.createTandem( 'solutesPanel' ) );

    // TODO: Move to options?
    solutesPanel.left = this.layoutBounds.left + MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN;
    solutesPanel.top = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( solutesPanel );

    const soluteControls: SoluteControl[] = [];

    // Number controls for the 'outside' solute concentrations
    // Loop through the outsideSoluteCountProperties record and create a FineCoarseSpinner for each one
    SoluteTypes.forEach( soluteType => {

      const outsideSoluteControlsTandem = options.tandem.createTandem( 'outsideSoluteControls' );

      const outsideSoluteControl = new SoluteControl( this.model, soluteType, 'outside', {
        centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
        bottom: screenViewModelViewTransform.modelToViewY( MembraneChannelsConstants.MEMBRANE_BOUNDS.maxY ),
        tandem: outsideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) )
      } );
      this.addChild( outsideSoluteControl );
      soluteControls.push( outsideSoluteControl );

      const insideSoluteControlsTandem = options.tandem.createTandem( 'insideSoluteControls' );
      const insideSoluteControl = new SoluteControl( this.model, soluteType, 'inside', {
        centerX: ( this.observationWindow.left - this.layoutBounds.left ) / 2,
        top: screenViewModelViewTransform.modelToViewY( MembraneChannelsConstants.MEMBRANE_BOUNDS.minY ),
        tandem: insideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) )
      } );
      this.addChild( insideSoluteControl );
      soluteControls.push( insideSoluteControl );
    } );

    const realCircleDragListener = new DragListener( {
      useParentOffset: true,
      dragBoundsProperty: modelBoundsProperty,
      positionProperty: myCirclePositionProperty,
      transform: screenViewModelViewTransform,
      tandem: Tandem.OPT_OUT
    } );
    realCircle.addInputListener( realCircleDragListener );

    const additionalPlayAreaOrder: Node[] = [];
    if ( model.featureSet !== 'simpleDiffusion' ) {
      const membraneChannelsAccordionBoxGroup = new MembraneChannelsAccordionBoxGroup( model, options.tandem.createTandem( 'membraneChannelsAccordionBoxGroup' ), event => {
        realCircle.visible = true;
        realCircle.moveToFront();
        const viewPoint = this.globalToLocalPoint( event.pointer.point );
        const modelPoint = screenViewModelViewTransform.viewToModelPosition( viewPoint );
        myCirclePositionProperty.value = modelPoint;

        realCircleDragListener.press( event );

      } );
      this.resetEmitter.addListener( () => membraneChannelsAccordionBoxGroup.reset() );

      membraneChannelsAccordionBoxGroup.centerX = ( this.layoutBounds.right + this.observationWindow.right ) / 2;
      membraneChannelsAccordionBoxGroup.top = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

      this.addChild( membraneChannelsAccordionBoxGroup );
      additionalPlayAreaOrder.push( membraneChannelsAccordionBoxGroup );
    }

    if ( getFeatureSetHasVoltages( model.featureSet ) ) {
      const membranePotentialPanel = new MembranePotentialPanel( model, options.tandem.createTandem( 'membranePotentialPanel' ) );
      membranePotentialPanel.bottom = this.layoutBounds.bottom - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;
      membranePotentialPanel.right = this.layoutBounds.right - MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN;
      this.addChild( membranePotentialPanel );
      additionalPlayAreaOrder.push( membranePotentialPanel );
    }

    // pdom order
    // TODO:Design - Identify which components go in each section.
    this.pdomPlayAreaNode.pdomOrder = [ solutesPanel, ...soluteControls, ...additionalPlayAreaOrder ];
    this.pdomControlAreaNode.pdomOrder = [ soluteBarChartsAccordionBox, timeControlNode, resetAllButton ];

    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Circle( 5, { fill: 'red', opacity: 0.5, center: screenViewModelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) } ) );
      macroCellNode.moveToFront();
    }
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
}

membraneChannels.register( 'MembraneChannelsScreenView', MembraneChannelsScreenView );