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
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import { Circle, DragListener } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import MembraneChannelsAccordionBoxGroup from './MembraneChannelsAccordionBoxGroup.js';
import ObservationWindow from './ObservationWindow.js';
import SoluteBarChartsAccordionBox from './SoluteBarChartsAccordionBox.js';
import SolutesPanel from './SolutesPanel.js';

const OBSERVATION_WINDOW_BOUNDS = new Bounds2( 0, 0, MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, MembraneChannelsConstants.OBSERVATION_WINDOW_HEIGHT );

type SelfOptions = EmptySelfOptions;

type MembraneChannelsScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class MembraneChannelsScreenView extends ScreenView {
  private readonly observationWindow: ObservationWindow;

  private readonly observationWindowModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( new Vector2( 0, 0 ), OBSERVATION_WINDOW_BOUNDS.center, OBSERVATION_WINDOW_BOUNDS.width / MembraneChannelsModel.MODEL_WIDTH );
  private readonly resetEmitter = new Emitter();

  public constructor(
    public readonly model: MembraneChannelsModel, providedOptions: MembraneChannelsScreenViewOptions ) {

    const options = optionize<MembraneChannelsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {}, providedOptions );

    super( options );

    // A model to view transform that maps a model point to a positionin the screen view. This transform includes the translation
    // of the observation window so that you can position view components relative to things within the observation window.
    const screenViewModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      new Vector2( 0, 0 ),
      OBSERVATION_WINDOW_BOUNDS.center.plusXY( this.layoutBounds.width / 2 - MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN ),
      OBSERVATION_WINDOW_BOUNDS.width / MembraneChannelsModel.MODEL_WIDTH
    );

    this.observationWindow = new ObservationWindow( this.observationWindowModelViewTransform, OBSERVATION_WINDOW_BOUNDS );
    this.addChild( this.observationWindow );

    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      timeSpeedProperty: model.timeSpeedProperty,
      playPauseStepButtonOptions: {
        includeStepForwardButton: false
      },
      tandem: options.tandem.createTandem( 'timeControlNode' )
    } );

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


    const soluteBarChartsAccordionBox = new SoluteBarChartsAccordionBox( model, {
      tandem: options.tandem.createTandem( 'soluteBarChartsAccordionBox' )
    } );

    this.resetEmitter.addListener( () => soluteBarChartsAccordionBox.reset() );

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

    const solutesPanel = new SolutesPanel( model.selectedSoluteProperty, options.tandem.createTandem( 'solutesPanel' ) );

    const realCircleDragListener = new DragListener( {
      useParentOffset: true,
      dragBoundsProperty: modelBoundsProperty,
      positionProperty: myCirclePositionProperty,
      transform: screenViewModelViewTransform,
      tandem: Tandem.OPT_OUT
    } );
    realCircle.addInputListener( realCircleDragListener );

    const membraneChannelsAccordionBoxGroup = new MembraneChannelsAccordionBoxGroup( options.tandem.createTandem( 'membraneChannelsAccordionBoxGroup' ), event => {
      realCircle.visible = true;
      realCircle.moveToFront();
      const viewPoint = this.globalToLocalPoint( event.pointer.point );
      const modelPoint = screenViewModelViewTransform.viewToModelPosition( viewPoint );
      myCirclePositionProperty.value = modelPoint;

      realCircleDragListener.press( event );

    } );
    this.resetEmitter.addListener( () => membraneChannelsAccordionBoxGroup.reset() );

    // z-order = tab-traversal order
    this.addChild( solutesPanel );
    this.addChild( membraneChannelsAccordionBoxGroup );
    this.addChild( soluteBarChartsAccordionBox );
    this.addChild( timeControlNode );
    this.addChild( resetAllButton );

    // layout

    // Note: x/y to position to account for the stroke width (when the stroke rectangle moves into ObservationWindow).
    // Alignment can be tested with ?dev and by increasing the line width in the ObservationWindow frame line width
    this.observationWindow.x = this.layoutBounds.centerX - MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH / 2;
    this.observationWindow.y = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    solutesPanel.left = this.layoutBounds.left + MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN;
    solutesPanel.top = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    resetAllButton.rightBottom = new Vector2( this.layoutBounds.maxX - MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN, this.observationWindow.bottom );

    timeControlNode.left = this.observationWindow.right + MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;
    timeControlNode.bottom = resetAllButton.top - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    soluteBarChartsAccordionBox.left = this.layoutBounds.left + MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN;
    soluteBarChartsAccordionBox.bottom = this.layoutBounds.bottom - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    membraneChannelsAccordionBoxGroup.centerX = ( this.layoutBounds.right + this.observationWindow.right ) / 2;
    membraneChannelsAccordionBoxGroup.top = MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;

    if ( phet.chipper.queryParameters.dev ) {
      this.addChild( new Circle( 5, { fill: 'red', opacity: 0.5, center: screenViewModelViewTransform.modelToViewPosition( new Vector2( 0, 0 ) ) } ) );
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
    if ( this.model.isPlayingProperty.value ) {
      this.observationWindow.step( dt );
    }
  }
}

membraneChannels.register( 'MembraneChannelsScreenView', MembraneChannelsScreenView );