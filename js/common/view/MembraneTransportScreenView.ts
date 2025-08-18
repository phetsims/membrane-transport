// Copyright 2024-2025, University of Colorado Boulder

/**
 * ScreenView for the Membrane Transport simulation. Note that this provides the full features of the Playground screen,
 * and the earlier screens opt-out of some of these features.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import cell_svg from '../../../images/cell_svg.js';
import MembraneTransportConstants from '../../common/MembraneTransportConstants.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportColors from '../MembraneTransportColors.js';
import { getFeatureSetSoluteTypes, getFeatureSetTransportProteins } from '../MembraneTransportFeatureSet.js';
import MembraneTransportSounds from '../MembraneTransportSounds.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import TransportProteinType from '../model/proteins/TransportProteinType.js';
import Slot from '../model/Slot.js';
import { getSoluteSpinnerTandemName } from '../model/SoluteType.js';
import MembranePotentialDescriber from './MembranePotentialDescriber.js';
import MembraneTransportDescriber from './MembraneTransportDescriber.js';
import MembraneTransportScreenSummaryContent from './MembraneTransportScreenSummaryContent.js';
import ObservationWindow from './ObservationWindow.js';
import SoluteConcentrationsAccordionBox from './SoluteConcentrationsAccordionBox.js';
import SoluteControl from './SoluteControl.js';
import SolutesPanel from './SolutesPanel.js';
import ThumbnailNode from './ThumbnailNode.js';
import TransportProteinDragNode from './TransportProteinDragNode.js';
import TransportProteinPanel from './TransportProteinPanel.js';
import TransportProteinToolboxGrabCueNode from './TransportProteinToolboxGrabCueNode.js';
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
  private readonly transportProteinToolboxGrabCueNode?: TransportProteinToolboxGrabCueNode;

  public constructor(
    public readonly model: MembraneTransportModel,
    providedOptions: MembraneTransportScreenViewOptions ) {

    const options = optionize<MembraneTransportScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      screenSummaryContent: new MembraneTransportScreenSummaryContent( model )
    }, providedOptions );
    super( options );

    const membraneTransportDescriber = new MembraneTransportDescriber( model, this );
    this.stepEmitter.addListener( dt => membraneTransportDescriber.step( dt ) );
    this.resetEmitter.addListener( () => membraneTransportDescriber.reset() );

    // A model to view transform that maps a model point to a position in the screen view. This transform allows you to position
    // elements in the overall screen space as if they are placed relative to the model. Use when positioning elements
    // in the entire screen. For example, when moving a protein from the toolbox to the membrane.
    const screenViewModelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      new Vector2( 0, 0 ),
      MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.center.plusXY( this.layoutBounds.width / 2 - MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH / 2, MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN ),
      MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS.width / MembraneTransportConstants.MODEL_WIDTH
    );

    this.observationWindow = new ObservationWindow( model, this, MembraneTransportConstants.OBSERVATION_WINDOW_MODEL_VIEW_TRANSFORM, MembraneTransportConstants.OBSERVATION_WINDOW_BOUNDS, options.tandem.createTandem( 'observationWindow' ) );
    this.stepEmitter.addListener( dt => this.observationWindow.step( dt ) );
    this.resetEmitter.addListener( () => this.observationWindow.reset() );

    // Note: x/y to position to account for the stroke width (when the stroke rectangle moves into ObservationWindow).
    // Alignment can be tested with ?dev and by increasing the line width in the ObservationWindow frame line width
    this.observationWindow.x = this.layoutBounds.centerX - MembraneTransportConstants.OBSERVATION_WINDOW_WIDTH / 2;
    this.observationWindow.y = MembraneTransportConstants.SCREEN_VIEW_Y_MARGIN;

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

    const CHECKBOX_TEXT_MAX_WIDTH = 120;
    const crossingHighlightsCheckbox = new Checkbox( this.model.crossingHighlightsEnabledProperty, new Text( MembraneTransportFluent.settings.crossingHighlightsStringProperty, {
      font: MembraneTransportConstants.FONT,
      maxWidth: CHECKBOX_TEXT_MAX_WIDTH
    } ), {
      touchAreaYDilation: 5,
      touchAreaXDilation: 5,
      accessibleHelpText: MembraneTransportFluent.a11y.settings.crossingHighlightsCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MembraneTransportFluent.a11y.settings.crossingHighlightsCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: MembraneTransportFluent.a11y.settings.crossingHighlightsCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: options.tandem.createTandem( 'crossingHighlightsCheckbox' )
    } );

    const crossingSoundsCheckbox = new Checkbox( this.model.crossingSoundsEnabledProperty, new Text( MembraneTransportFluent.settings.crossingSoundsStringProperty, {
      font: MembraneTransportConstants.FONT,
      maxWidth: CHECKBOX_TEXT_MAX_WIDTH
    } ), {
      touchAreaYDilation: 5,
      touchAreaXDilation: 5,
      accessibleHelpText: MembraneTransportFluent.a11y.settings.crossingSoundsCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MembraneTransportFluent.a11y.settings.crossingSoundsCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: MembraneTransportFluent.a11y.settings.crossingSoundsCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: options.tandem.createTandem( 'crossingSoundsCheckbox' )
    } );

    const checkboxVBox = new VBox( {
      children: [ crossingHighlightsCheckbox, crossingSoundsCheckbox ],
      spacing: 8,
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
      tandem: options.tandem.createTandem( 'eraseSolutesButton' ),
      right: this.observationWindow.left - 5,
      centerY: timeControlNode.centerY,
      accessibleName: MembraneTransportFluent.a11y.eraseSolutesButton.accessibleNameStringProperty,
      accessibleContextResponse: MembraneTransportFluent.a11y.eraseSolutesButton.accessibleContextResponseStringProperty,
      enabledProperty: model.hasAnySolutesProperty,
      accessibleHelpText: MembraneTransportFluent.a11y.eraseSolutesButton.accessibleHelpTextStringProperty,
      listener: () => {
        model.clearSolutes();
      }
    } );

    Multilink.multilink( [
      eraseSolutesButton.enabledProperty,
      MembraneTransportFluent.a11y.eraseSolutesButton.accessibleHelpTextStringProperty
    ], ( enabled, disabledMessage ) => {
      eraseSolutesButton.accessibleHelpText = enabled ? null : disabledMessage;
    } );

    soluteControlsNode.addChild( eraseSolutesButton );

    // Solute concentrations
    const soluteConcentrationsAccordionBox = new SoluteConcentrationsAccordionBox( model, membraneTransportDescriber.averageSoluteCrossingDirectionProperties, {
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
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
    ManualConstraint.create( this, [ solutesPanel ], solutesPanelProxy => {
      solutesPanelProxy.centerY = screenViewModelViewTransform.modelToViewY( MembraneTransportConstants.MEMBRANE_BOUNDS.centerY );
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

    const insideSoluteControlAlignGroup = new AlignGroup();
    const outsideSoluteControlAlignGroup = new AlignGroup();

    // Number controls for the 'outside' solute concentrations
    // Loop through the outsideSoluteCountProperties record and create a FineCoarseSpinner for each one
    getFeatureSetSoluteTypes( model.featureSet ).forEach( soluteType => {

      if ( soluteType === 'adp' || soluteType === 'phosphate' ) {
        return;
      }

      const soluteControlCenterX = solutesPanel.right + ( this.observationWindow.left - solutesPanel.right ) / 2;

      // ATP can only be added inside the cell
      if ( soluteType !== 'atp' ) {
        const outsideSoluteControl = new SoluteControl( this.model, soluteType, 'outside', outsideSoluteControlAlignGroup,
          outsideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) ), {
            centerX: soluteControlCenterX,
            top: this.observationWindow.top,

            // So it is very clear that this is associated with the outside of the cell
            fill: MembraneTransportColors.observationWindowOutsideCellColorProperty
          } );
        outsideSoluteControlNode.addChild( outsideSoluteControl );
        soluteControls.push( outsideSoluteControl );
      }

      const insideSoluteControl = new SoluteControl( this.model, soluteType, 'inside', insideSoluteControlAlignGroup,
        insideSoluteControlsTandem.createTandem( getSoluteSpinnerTandemName( soluteType ) ), {
          centerX: soluteControlCenterX,

          // So it is very clear that this is associated with the inside of the cell
          fill: MembraneTransportColors.observationWindowInsideCellColorProperty
        } );

      ManualConstraint.create( this, [ insideSoluteControl, this.observationWindow ], ( insideSoluteControlProxy, observationWindowProxy ) => {
        insideSoluteControlProxy.bottom = observationWindowProxy.bottom;
      } );

      insideSoluteControlNode.addChild( insideSoluteControl );
      soluteControls.push( insideSoluteControl );
    } );

    soluteControlsNode.addChild( outsideSoluteControlNode );
    soluteControlsNode.addChild( insideSoluteControlNode );

    const cellNode = new Image( cell_svg, {
      maxWidth: 120,
      top: this.observationWindow.centerY,
      centerX: soluteControlsNode.centerX + 30
    } );
    this.addChild( cellNode );

    this.addChild( new ThumbnailNode( cellNode.centerX - 3, cellNode.top + 1.5, this.observationWindow.bounds ) );

    // In front of the ThumbnailNode, so that it is not obscured by the thumbnail.
    soluteControlsNode.moveToFront();

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
      this.observationWindow, // Contains the interactive ligands and transport proteins
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
    }

    this.screenViewModelViewTransform = screenViewModelViewTransform;

    model.soluteCrossedMembraneEmitter.addListener( event => {
      if ( model.crossingSoundsEnabledProperty.value ) {
        MembraneTransportSounds.soluteCrossedMembrane( event.solute.type, event.direction );
      }
    } );

    this.model.membranePotentialProperty.lazyLink( MembranePotentialDescriber.createListener( model, this ) );

    // For screens with transport proteins, create the toolbox grab cue node. It is created and added after the panel because
    // this cue needs to be visually on top of most things in the view.
    if ( this.transportProteinPanel ) {
      const transportProteinToolNodes = getFeatureSetTransportProteins( model.featureSet ).map( type => this.transportProteinPanel!.getTransportProteinToolNode( type ) ).filter( node => !!node );
      this.transportProteinToolboxGrabCueNode = new TransportProteinToolboxGrabCueNode( transportProteinToolNodes );

      // Set the x-coordinate of the grab cue node to be to the right of the left edge of the transport protein panel (overlapping)
      // y-coordinate is set in TransportProteinToolboxGrabCueNode, so we only need to set the x-coordinate.
      ManualConstraint.create( this, [ this.transportProteinPanel, this.transportProteinToolboxGrabCueNode ], ( transportProteinPanelProxy, grabCueNodeProxy ) => {
        grabCueNodeProxy.right = transportProteinPanelProxy.left + MembraneTransportConstants.SCREEN_VIEW_X_MARGIN * 2;
      } );

      this.addChild( this.transportProteinToolboxGrabCueNode );

      this.resetEmitter.addListener( () => this.transportProteinToolboxGrabCueNode!.reset() );
    }
  }

  /**
   * Creates a draggable transport protein and adds it to the view.
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
  }

  /**
   * Creates a temporary transport protein drag node and adds it to the view. Useful for animations and keyboard input that
   * do not require a forwarded Pointer press.
   */
  public createTemporaryProteinNode( type: TransportProteinType, slot: Slot, toolNode?: TransportProteinToolNode ): TransportProteinDragNode {

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

    this.transportProteinToolboxGrabCueNode?.createdFromKeyboard();
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