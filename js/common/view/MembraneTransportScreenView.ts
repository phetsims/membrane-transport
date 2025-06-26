// Copyright 2024-2025, University of Colorado Boulder

/**
 * ScreenView for the Membrane Transport simulation. Note that this provides the full features of the Playground screen,
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
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportColors from '../MembraneTransportColors.js';
import { getFeatureSetSoluteTypes } from '../MembraneTransportFeatureSet.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { CAPTURE_RADIUS_PROPERTY } from '../model/Particle.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import { getSoluteSpinnerTandemName } from '../model/SoluteType.js';
import MacroCellNode from './MacroCellNode.js';
import MembranePotentialDescriber from './MembranePotentialDescriber.js';
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
      centerX: this.observationWindow.centerX,
      top: this.observationWindow.bottom + MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN
    } );

    this.addChild( timeControlNode );

    const crossingHighlightsCheckbox = new Checkbox( this.model.crossingHighlightsEnabledProperty, new Text( MembraneTransportFluent.crossingHighlightsStringProperty, {
      font: MembraneTransportConstants.FONT,
      maxWidth: 160
    } ), {
      accessibleHelpText: MembraneTransportFluent.a11y.crossingHighlightsCheckbox.accessibleHelpTextStringProperty,
      checkedContextResponse: MembraneTransportFluent.a11y.crossingHighlightsCheckbox.accessibleCheckedContextResponseStringProperty,
      uncheckedContextResponse: MembraneTransportFluent.a11y.crossingHighlightsCheckbox.accessibleUncheckedContextResponseStringProperty,
      tandem: options.tandem.createTandem( 'crossingHighlightsCheckbox' )
    } );

    const crossingSoundsCheckbox = new Checkbox( this.model.crossingSoundsEnabledProperty, new Text( MembraneTransportFluent.crossingSoundsStringProperty, {
      font: MembraneTransportConstants.FONT,
      maxWidth: 160
    } ), {
      accessibleHelpText: MembraneTransportFluent.a11y.crossingSoundsCheckbox.accessibleHelpTextStringProperty,
      checkedContextResponse: MembraneTransportFluent.a11y.crossingSoundsCheckbox.accessibleCheckedContextResponseStringProperty,
      uncheckedContextResponse: MembraneTransportFluent.a11y.crossingSoundsCheckbox.accessibleUncheckedContextResponseStringProperty,
      tandem: options.tandem.createTandem( 'crossingSoundsCheckbox' )
    } );

    const checkboxVBox = new VBox( {
      children: [ crossingHighlightsCheckbox, crossingSoundsCheckbox ],
      spacing: 5,
      align: 'left',
      right: this.observationWindow.right,
      centerY: timeControlNode.centerY
    } );
    this.addChild( checkboxVBox );

    // A parent Node for the controls related to selecting solutes, adding solutes, and removing solutes.
    const soluteControlsNode = new Node( {
      accessibleHeading: MembraneTransportFluent.a11y.soluteControls.accessibleHeadingStringProperty,
      accessibleHelpText: MembraneTransportFluent.a11y.soluteControls.accessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );
    this.addChild( soluteControlsNode );

    const eraseSolutesButton = new EraserButton( {
      scale: 1.2,
      baseColor: 'rgb(239,214,147)',
      tandem: options.tandem.createTandem( 'eraseSolutesButton' ),
      left: this.observationWindow.left,
      centerY: timeControlNode.centerY,
      accessibleName: MembraneTransportFluent.a11y.eraseSolutesButton.accessibleNameStringProperty,
      accessibleContextResponse: MembraneTransportFluent.a11y.eraseSolutesButton.accessibleContextResponseStringProperty,
      enabledProperty: model.hasAnySolutesProperty,
      accessibleHelpText: MembraneTransportFluent.a11y.eraseSolutesButton.accessibleHelpTextStringProperty
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

    // The design request was for the solute accordion box left edge to align with the solute panel left edge. However,
    // the solute panel is centered between the left edge and the observation window, and may not always be visible.
    // Therefore, we simplify by computing a magic number that satisfies the design request in the default case without
    // introducing additional complexity.
    const ADDITIONAL_OFFSET_SOLUTE_ACCORDION_BOX = 8;

    soluteConcentrationsAccordionBox.left = this.layoutBounds.left + MembraneTransportConstants.SCREEN_VIEW_X_MARGIN + ADDITIONAL_OFFSET_SOLUTE_ACCORDION_BOX;
    soluteConcentrationsAccordionBox.bottom = this.layoutBounds.bottom - MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN;

    this.addChild( soluteConcentrationsAccordionBox );
    this.stepEmitter.addListener( dt => soluteConcentrationsAccordionBox.stepEmitter.emit( dt ) );

    const soluteControlsTandem = options.tandem.createTandem( 'soluteControls' );

    const solutesPanel = new SolutesPanel( model.featureSet, model.soluteProperty, {
      tandem: soluteControlsTandem.createTandem( 'solutesPanel' ),
      left: soluteConcentrationsAccordionBox.left,
      centerY: screenViewModelViewTransform.modelToViewY( MembraneTransportConstants.MEMBRANE_BOUNDS.centerY )
    } );
    soluteControlsNode.addChild( solutesPanel );

    // For keyboard focus order
    const soluteControls: SoluteControl[] = [];

    const outsideSoluteControlsTandem = soluteControlsTandem.createTandem( 'outsideSoluteControls' );
    const insideSoluteControlsTandem = soluteControlsTandem.createTandem( 'insideSoluteControls' );

    // Make it possible to hide or show the entire outside or inside solute control panel
    const outsideSoluteControlNode = new Node( {
      tandem: outsideSoluteControlsTandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
    const insideSoluteControlNode = new Node( {
      tandem: insideSoluteControlsTandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // Number controls for the 'outside' solute concentrations
    // Loop through the outsideSoluteCountProperties record and create a FineCoarseSpinner for each one
    getFeatureSetSoluteTypes( model.featureSet ).forEach( soluteType => {

      if ( soluteType === 'adp' || soluteType === 'phosphate' ) {
        return;
      }

      const soluteControlCenterX = solutesPanel.right + ( this.observationWindow.left - solutesPanel.right ) / 2;

      // ATP can only be added inside the cell
      if ( soluteType !== 'atp' ) {
        const outsideSoluteControl = new SoluteControl( this.model, soluteType, 'outside',
          outsideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) ), {
            centerX: soluteControlCenterX,
            top: this.observationWindow.top + MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,

            // So it is very clear that this is associated with the outside of the cell
            fill: MembraneTransportColors.observationWindowOutsideCellColorProperty
          } );
        outsideSoluteControlNode.addChild( outsideSoluteControl );
        soluteControls.push( outsideSoluteControl );
      }

      const insideSoluteControl = new SoluteControl( this.model, soluteType, 'inside',
        insideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) ), {
          centerX: soluteControlCenterX,
          bottom: this.observationWindow.bottom - MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN,

          // So it is very clear that this is associated with the inside of the cell
          fill: MembraneTransportColors.observationWindowInsideCellColorProperty
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
      crossingHighlightsCheckbox,
      crossingSoundsCheckbox,
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
      // Calculate equilibrium ratio based on solute balance for this particle type
      const insideCount = model.countSolutes( particle.type, 'inside' );
      const outsideCount = model.countSolutes( particle.type, 'outside' );
      const totalCount = insideCount + outsideCount;

      // Calculate equilibrium ratio: 1 = full equilibrium, 0 = no equilibrium
      let equilibriumRatio = 0.5; // default to halfway
      if ( totalCount > 0 ) {
        // Calculate how balanced the concentrations are
        const balance = insideCount === 0 || outsideCount === 0 ? 0 :
                        insideCount < outsideCount ? insideCount / outsideCount : outsideCount / insideCount;
        equilibriumRatio = balance; // balance is 0 to 1, where 1 is perfect equilibrium
      }

      if ( this.model.crossingSoundsEnabledProperty.value ) {
        MembraneTransportSounds.soluteCrossedMembrane( particle.type, direction, equilibriumRatio );
      }
    } );

    this.model.membranePotentialProperty.lazyLink( MembranePotentialDescriber.createListener( model, this ) );
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
   * This just creates a drag node Icon and adds it to the view.
   */
  public createFromKeyboard( type: TransportProteinType, slot: Slot, toolNode?: TransportProteinToolNode ): TransportProteinDragNode {

    // Move over the first available slot
    const slotX = slot.position;
    const y = 10;
    const modelPoint = new Vector2( slotX, y );

    // There will always be a destination slot when creating with keyboard. But if it came from the toolbox, then
    // the origin will be set to indicate that to support return/swapping purposes.
    const origin = toolNode || slot;

    const dragNode = this.createTransportProteinDragNode( modelPoint, type, origin );
    dragNode.pickable = false; // keyboard only
    return dragNode;
  }

  /**
   * Called when forwarding keyboard interaction from the toolbox to the slots.
   */
  public forwardFromKeyboard( type: TransportProteinType, toolNode: TransportProteinToolNode ): void {

    // Creating from the toolbox, find the leftmost empty slot or the middle slot if all are filled.
    const slot = this.model.getLeftmostEmptySlot() || this.model.getMiddleSlot();
    this.observationWindow.forwardFromKeyboard( slot, type, toolNode );
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

  public getTransportProteinToolNode( type: TransportProteinType ): TransportProteinToolNode {
    return this.transportProteinPanel!.getTransportProteinToolNode( type );
  }
}

membraneTransport.register( 'MembraneTransportScreenView', MembraneTransportScreenView );