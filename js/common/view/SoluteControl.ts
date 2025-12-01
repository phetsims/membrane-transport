// Copyright 2025, University of Colorado Boulder

/**
 * Shows the panel and spinner that allows the user to add and remove a particular type of Solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Range from '../../../../dot/js/Range.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import VoicingNode, { VoicingNodeOptions } from '../../../../scenery/js/accessibility/voicing/nodes/VoicingNode.js';
import ReadingBlock, { ReadingBlockOptions } from '../../../../scenery/js/accessibility/voicing/ReadingBlock.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ArrowButton, { ArrowButtonOptions } from '../../../../sun/js/buttons/ArrowButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import nullSoundPlayer from '../../../../tambo/js/nullSoundPlayer.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ResponsePatternCollection from '../../../../utterance-queue/js/ResponsePatternCollection.js';
import ValueChangeUtterance from '../../../../utterance-queue/js/ValueChangeUtterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { SoluteControlSolute } from '../model/SoluteType.js';
import MembraneTransportDescriber from './MembraneTransportDescriber.js';
import createParticleIconNode from './particles/createParticleIconNode.js';
import SoluteSpinnerSoundGenerator from './SoluteSpinnerSoundGenerator.js';

type SelfOptions = EmptySelfOptions;
type ParentOptions = PanelOptions & ReadingBlockOptions;
type SoluteControlOptions = SelfOptions & StrictOmit<ParentOptions, 'tandem'>;

const fineDelta = 10;
const coarseDelta = 50;

export default class SoluteControl extends ReadingBlock( Panel ) {
  private readonly voicingButtonsBox: VoicingNode;

  public constructor( model: MembraneTransportModel,
                      soluteType: SoluteControlSolute,
                      side: 'outside' | 'inside',
                      alignGroup: AlignGroup,
                      tandem: Tandem,
                      providedOptions: SoluteControlOptions
  ) {

    // PhET-iO clients can hide individual solute controls.
    const simControlledVisibleProperty = new DerivedProperty( [ model.soluteProperty ], selectedSolute => {
      return soluteType === selectedSolute;
    } );
    const gatedVisibleProperty = new GatedVisibleProperty( simControlledVisibleProperty, tandem );

    const sideCountProperty = side === 'inside' ? model.insideSoluteCountProperties[ soluteType ] : model.outsideSoluteCountProperties[ soluteType ];

    const accessibleName = side === 'inside' ? MembraneTransportFluent.a11y.soluteControl.inside.accessibleName.format( { soluteType: soluteType } ) :
                           MembraneTransportFluent.a11y.soluteControl.outside.accessibleName.format( { soluteType: soluteType } );
    const readingBlockNameResponsePattern = side === 'outside' ? MembraneTransportFluent.a11y.soluteControl.outside.readingBlockNameResponse :
                                            MembraneTransportFluent.a11y.soluteControl.inside.readingBlockNameResponse;

    const options = optionize<SoluteControlOptions, SelfOptions, ParentOptions>()( {
      yMargin: 10,
      align: 'center',
      visibleProperty: gatedVisibleProperty,
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS,

      readingBlockNameResponse: readingBlockNameResponsePattern.createProperty( {
        soluteType: soluteType,
        amount: MembraneTransportDescriber.createQualitativeAmountDescriptorProperty( sideCountProperty )
      } ),
      readingBlockHintResponse: MembraneTransportFluent.a11y.soluteControl.voicingHintResponseStringProperty,
      readingBlockTagName: null,

      // phet-io
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false
    }, providedOptions );

    // The total count of solutes of this type on both sides of the membrane.
    const totalCountProperty = new DerivedProperty( [ model.insideSoluteCountProperties[ soluteType ], model.outsideSoluteCountProperties[ soluteType ] ], ( insideCount, outsideCount ) => {
      return insideCount + outsideCount;
    } );

    // You can only add up to the maximum number of solutes on BOTH sides. But you can only remove however many solutes are on this side.
    const decrementEnabledProperty = new DerivedProperty( [ sideCountProperty ], sideCount => sideCount > 0 );
    const incrementEnabledProperty = new DerivedProperty( [ totalCountProperty ], totalCount => totalCount < MembraneTransportConstants.MAX_SOLUTE_COUNT );

    // The accessibleObjectResponse for the entire control, describing the current value. It describes the amount of solutes of
    // this type on this side of the membrane qualitatively. It is spoken every time the SoluteControl is used.
    const getObjectResponseContent = () => {
      return MembraneTransportFluent.a11y.soluteControl.accessibleObjectResponse.format( {

        // Qualitative descriptions for the amount of a solute, as described in
        // https://github.com/phetsims/membrane-transport/issues/242
        amount: MembraneTransportDescriber.getSoluteQualitativeAmountDescriptor( sideCountProperty.value ),

        soluteType: model.soluteProperty
      } );

    };

    // A ValueChangeUtterance helps ensure that only the most recent change is spoken. Useful if arrow keys are
    // pressed rapidly.
    const createAccessibleObjectResponse = () => new ValueChangeUtterance( {
      alert: getObjectResponseContent()
    } );

    // The accessibleContextResponse describes the overall change in the simulation. It describes how many of a solute was added or
    // removed, and the relative amounts on each side of the membrane. It is spoken every time the SoluteControl is used.
    const createContextResponseContent = ( newValue: number, previousValue: number ) => {
      // In this simulation, it is possible to have a keyup event that doesn't change the value. In that case,
      // we don't want to announce anything.
      if ( newValue === previousValue ) {
        return null;
      }

      const difference = newValue - previousValue;

      let addedOrRemoved: 'added' | 'removed' | 'addedToMax' | 'removedToMin';
      if ( difference > 0 ) {
        addedOrRemoved = ( newValue === MembraneTransportConstants.MAX_SOLUTE_COUNT ) ? 'addedToMax' : 'added';
      }
      else {
        addedOrRemoved = ( newValue === 0 ) ? 'removedToMin' : 'removed';
      }

      const insideCount = model.insideSoluteCountProperties[ soluteType ].value;
      const outsideCount = model.outsideSoluteCountProperties[ soluteType ].value;

      return MembraneTransportFluent.a11y.soluteControl.accessibleContextResponse.format( {
        delta: Math.abs( difference ),
        addedOrRemoved: addedOrRemoved,
        amount: MembraneTransportDescriber.getSoluteComparisonDescriptor( outsideCount, insideCount )
      } );
    };

    const createContextResponse = ( newValue: number, previousValue: number ) => {
      return new ValueChangeUtterance( {
        alert: createContextResponseContent( newValue, previousValue )
      } );
    };

    // Plays sounds when solutes are added or removed.
    const soundGenerator = new SoluteSpinnerSoundGenerator( coarseDelta, new Range( 0, MembraneTransportConstants.MAX_SOLUTE_COUNT ) );

    const arrowButtonHeight = 16;
    const buttonOptions: ArrowButtonOptions = {

      // Make smaller so there is enough space between the observation window and the solute radio buttons.
      arrowWidth: 8,
      arrowHeight: arrowButtonHeight,

      touchAreaXDilation: 3,
      touchAreaYDilation: 3,

      // custom sounds are implemented in the button listeners
      soundPlayer: nullSoundPlayer,

      // Individual buttons are not available, the entire control is one stop in the traversal order.
      accessibleVisible: false,

      phetioVisiblePropertyInstrumented: false
    };

    const coarseButtonOptions = {
      numberOfArrows: 2,
      arrowSpacing: -0.5 * arrowButtonHeight // arrows overlap
    };

    const arrowButtonCallback = ( addOrRemove: 'add' | 'remove', delta: number ) => {
      const valueBefore = totalCountProperty.value;

      if ( addOrRemove === 'add' ) {

        // You can only add up to the maximum number of solutes on BOTH sides.
        model.addSolutes( soluteType, side, Math.min( delta, MembraneTransportConstants.MAX_SOLUTE_COUNT - valueBefore ) );
      }
      else {

        // You can only remove up to the number of solutes on this side.
        model.removeSolutes( soluteType, side, Math.min( delta, sideCountProperty.value ) );
      }

      // sound
      soundGenerator.playSoundForValueChange( totalCountProperty.value, valueBefore );

      // pdom - the context response is queued after the object response so both are spoken
      this.addAccessibleObjectResponse( createAccessibleObjectResponse() );
      this.addAccessibleContextResponse( createContextResponse( totalCountProperty.value, valueBefore ), { alertBehavior: 'queue' } );

      this.voicingButtonsBox.voicingSpeakResponse( {
        nameResponse: accessibleName,
        objectResponse: getObjectResponseContent(),
        contextResponse: createContextResponseContent( totalCountProperty.value, valueBefore )
      } );
    };

    const decrementFineButton = new ArrowButton(
      'left',
      () => {
        arrowButtonCallback( 'remove', fineDelta );
      },
      combineOptions<ArrowButtonOptions>( {
        enabledProperty: decrementEnabledProperty
      }, buttonOptions, { tandem: tandem.createTandem( 'decrementFineButton' ) } )
    );

    const decrementCoarseButton = new ArrowButton(
      'left',
      () => {
        arrowButtonCallback( 'remove', coarseDelta );
      },
      combineOptions<ArrowButtonOptions>( {
        enabledProperty: decrementEnabledProperty
      }, buttonOptions, coarseButtonOptions, { tandem: tandem.createTandem( 'decrementCoarseButton' ) } )
    );

    const incrementFineButton = new ArrowButton(
      'right',
      () => {
        arrowButtonCallback( 'add', fineDelta );
      },
      combineOptions<ArrowButtonOptions>( {
        enabledProperty: incrementEnabledProperty
      }, buttonOptions, { tandem: tandem.createTandem( 'incrementFineButton' ) } )
    );

    const incrementCoarseButton = new ArrowButton(
      'right',
      () => {
        arrowButtonCallback( 'add', coarseDelta );
      },
      combineOptions<ArrowButtonOptions>( {
        enabledProperty: incrementEnabledProperty
      }, buttonOptions, coarseButtonOptions, { tandem: tandem.createTandem( 'incrementCoarseButton' ) } )
    );

    const TEXT_MAX_WIDTH = 80;

    // Extends AccessibleInteractiveOptions, which forces the screen reader to give all keyboard events for this custom
    // interaction.
    const voicingButtonsBox = new VoicingNode( combineOptions<VoicingNodeOptions>( {}, AccessibleInteractiveOptions, {
      children: [
        new HBox( {
          spacing: 10,
          children: [
            decrementFineButton,
            decrementCoarseButton,
            incrementCoarseButton,
            incrementFineButton
          ]
        } )
      ],

      // pdom - extends AccessibleInteractiveOptions
      accessibleRoleDescription: MembraneTransportFluent.a11y.soluteControl.accessibleRoleDescriptionStringProperty,
      accessibleName: accessibleName,

      // accessibleHelpText filled in by a Multilink below
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_AFTER_CONTENT,

      // voicing
      voicingNameResponse: accessibleName,

      // this control manages its own voicing on focus
      voicingFocusListener: null,

      // For this control, it was requested that the object response be spoken before the name response, see
      // https://github.com/phetsims/membrane-transport/issues/244#issuecomment-3189249913
      voicingResponsePatternCollection: ResponsePatternCollection.OBJECT_RESPONSE_FIRST_PATTERNS,

      // A custom shorter voicingHintResponse was requested for this control, see
      // https://github.com/phetsims/membrane-transport/issues/219
      voicingHintResponse: MembraneTransportFluent.a11y.soluteControl.voicingHintResponseStringProperty,

      // Pointer-based interaction works with the buttons, so we do not want to show a highlight around the entire control.
      interactiveHighlightEnabled: false
    } ) );

    const icon = createParticleIconNode( soluteType );

    const label = new HBox( {
      spacing: 10,
      children: [
        alignGroup.createBox( icon ),
        new Text( side === 'outside' ? MembraneTransportFluent.cellRegions.outsideStringProperty :
                  MembraneTransportFluent.cellRegions.insideStringProperty, {
          fontSize: MembraneTransportConstants.PANEL_TITLE_FONT_SIZE,
          maxWidth: TEXT_MAX_WIDTH
        } )
      ]
    } );
    const contents = new VBox( {
      spacing: 5,
      children: [
        label,
        voicingButtonsBox
      ]
    } );

    super( contents, options );

    this.voicingButtonsBox = voicingButtonsBox;

    // Speak the object response describing the "value" of the control when it is focused.
    voicingButtonsBox.focusedProperty.link( focused => {
      if ( focused ) {

        // pdom
        voicingButtonsBox.addAccessibleObjectResponse( createAccessibleObjectResponse() );

        // voicing
        voicingButtonsBox.voicingSpeakResponse( {
          nameResponse: accessibleName,
          objectResponse: getObjectResponseContent(),
          hintResponse: MembraneTransportFluent.a11y.soluteControl.voicingHintResponseStringProperty
        } );
      }
    } );

    /**
     * Handles the increment button actions for solute controls, for a coarse or fine increment.
     */
    const handleIncrement = ( button: ArrowButton ) => {

      // If the button is disabled (because we are already at the max), then we want to describe that
      // the max as already been reached so that the user knows why nothing happened.
      if ( !incrementEnabledProperty.value ) {

        // Interactive Description
        const atMaxUtterance = new ValueChangeUtterance( {
          alert: MembraneTransportFluent.a11y.soluteControl.accessibleObjectResponseAtMaxStringProperty
        } );
        this.voicingButtonsBox.addAccessibleObjectResponse( atMaxUtterance );

        // Voicing
        this.voicingButtonsBox.voicingSpeakObjectResponse( {
          objectResponse: MembraneTransportFluent.a11y.soluteControl.accessibleObjectResponseAtMaxStringProperty
        } );
      }
      else {

        // Otherwise, just press the button and doing so will trigger a object/context response.
        button.pdomClick();
      }
    };

    // KeyboardListener supports alt input. It directly clicks the buttons so that they look pressed and play sounds when the keyboard is used.
    const keyboardListener = new KeyboardListener( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [
        MembraneTransportHotkeyData.soluteControl.coarseIncrement,
        MembraneTransportHotkeyData.soluteControl.coarseDecrement,
        MembraneTransportHotkeyData.soluteControl.fineIncrement,
        MembraneTransportHotkeyData.soluteControl.fineDecrement
      ] ),
      fire: ( event, keysPressed, listener ) => {
        if ( MembraneTransportHotkeyData.soluteControl.coarseIncrement.hasKeyStroke( keysPressed ) ) {
          handleIncrement( incrementCoarseButton );
        }
        else if ( MembraneTransportHotkeyData.soluteControl.coarseDecrement.hasKeyStroke( keysPressed ) ) {
          decrementCoarseButton.pdomClick();
        }
        else if ( MembraneTransportHotkeyData.soluteControl.fineIncrement.hasKeyStroke( keysPressed ) ) {
          handleIncrement( incrementFineButton );
        }
        else if ( MembraneTransportHotkeyData.soluteControl.fineDecrement.hasKeyStroke( keysPressed ) ) {
          decrementFineButton.pdomClick();
        }
        else {
          affirm( false, `Unexpected key pressed: ${keysPressed}` );
        }
      },

      fireOnHold: true,
      fireOnHoldTiming: 'custom'
    } );
    this.addInputListener( keyboardListener );

    // Update accessibleHelpText based on button states
    Multilink.multilink( [
      decrementFineButton.enabledProperty,
      decrementCoarseButton.enabledProperty,
      incrementFineButton.enabledProperty,
      incrementCoarseButton.enabledProperty,
      MembraneTransportFluent.a11y.soluteControl.accessibleHelpTextAllDisabledStringProperty,
      side === 'inside' ? MembraneTransportFluent.a11y.soluteControl.inside.accessibleHelpTextStringProperty :
      MembraneTransportFluent.a11y.soluteControl.outside.accessibleHelpTextStringProperty
    ], ( decrementFineEnabled, decrementCoarseEnabled, incrementFineEnabled, incrementCoarseEnabled, allDisabledText, normalText ) => {
      const anyButtonEnabled = decrementFineEnabled || decrementCoarseEnabled || incrementFineEnabled || incrementCoarseEnabled;
      this.accessibleHelpText = anyButtonEnabled ? normalText : allDisabledText;

      // set aria-disabled = true on the parent container, see https://github.com/phetsims/membrane-transport/issues/366
      this.enabledProperty.value = anyButtonEnabled;
    } );
  }
}

membraneTransport.register( 'SoluteControl', SoluteControl );