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
import { combineOptions, EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import AccessibleInteractiveOptions from '../../../../scenery-phet/js/accessibility/AccessibleInteractiveOptions.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import Voicing, { VoicingOptions } from '../../../../scenery/js/accessibility/voicing/Voicing.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import ArrowButton, { ArrowButtonOptions } from '../../../../sun/js/buttons/ArrowButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import nullSoundPlayer from '../../../../tambo/js/nullSoundPlayer.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ValueChangeUtterance from '../../../../utterance-queue/js/ValueChangeUtterance.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportHotkeyData from '../MembraneTransportHotkeyData.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { SoluteControlSolute } from '../model/SoluteType.js';
import MembraneTransportDescriber from './MembraneTransportDescriber.js';
import SoluteSpinnerSoundGenerator from './SoluteSpinnerSoundGenerator.js';

type SelfOptions = EmptySelfOptions;
type ParentOptions = PanelOptions & VoicingOptions;
type SoluteControlOptions = SelfOptions & StrictOmit<ParentOptions, 'tandem'>;

const fineDelta = 10;
const coarseDelta = 50;

export default class SoluteControl extends Voicing( Panel ) {
  public constructor( model: MembraneTransportModel,
                      soluteType: SoluteControlSolute,
                      side: 'outside' | 'inside',
                      tandem: Tandem,
                      providedOptions: SoluteControlOptions
  ) {

    // PhET-iO clients can hide individual solute controls.
    const simControlledVisibleProperty = new DerivedProperty( [ model.soluteProperty ], selectedSolute => {
      return soluteType === selectedSolute;
    } );
    const gatedVisibleProperty = new GatedVisibleProperty( simControlledVisibleProperty, tandem );

    const accessibleName = side === 'inside' ? MembraneTransportFluent.a11y.soluteControl.inside.accessibleName.format( { soluteType: soluteType } ) :
                           MembraneTransportFluent.a11y.soluteControl.outside.accessibleName.format( { soluteType: soluteType } );

    // Extends AccessibleInteractiveOptions, which forces the screen reader to give all keyboard events for this custom
    // interaction.
    const options = optionize4<SoluteControlOptions, SelfOptions, ParentOptions>()( {}, AccessibleInteractiveOptions, {
      yMargin: 10,
      align: 'center',
      visibleProperty: gatedVisibleProperty,
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS,

      // pdom - extends AccessibleInteractiveOptions
      accessibleRoleDescription: MembraneTransportFluent.a11y.soluteControl.accessibleRoleDescriptionStringProperty,
      accessibleName: accessibleName,

      // accessibleHelpText filled in by a Multilink below
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_AFTER_CONTENT,

      // voicing
      voicingNameResponse: accessibleName,

      // A custom shorter voicingHintResponse was requested for this control, see
      // https://github.com/phetsims/membrane-transport/issues/219
      voicingHintResponse: MembraneTransportFluent.a11y.soluteControl.voicingHintResponseStringProperty,

      // Pointer-based interaction works with the buttons, so we do not want to show a highlight around the entire control.
      interactiveHighlightEnabled: false,

      // phet-io
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false
    }, providedOptions );

    // The total count of solutes of this type on both sides of the membrane.
    const totalCountProperty = new DerivedProperty( [ model.insideSoluteCountProperties[ soluteType ], model.outsideSoluteCountProperties[ soluteType ] ], ( insideCount, outsideCount ) => {
      return insideCount + outsideCount;
    } );

    // You can only add up to the maximum number of solutes on BOTH sides. But you can only remove however many solutes are on this side.
    const sideCountProperty = side === 'inside' ? model.insideSoluteCountProperties[ soluteType ] : model.outsideSoluteCountProperties[ soluteType ];
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
      pdomVisible: false,

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
      this.addAccessibleContextResponse( createContextResponse( totalCountProperty.value, valueBefore ), 'queue' );

      this.voicingSpeakFullResponse( {
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

    const buttonBox = new HBox( {
      spacing: 10,
      children: [
        decrementFineButton,
        decrementCoarseButton,
        incrementCoarseButton,
        incrementFineButton
      ]
    } );

    super( buttonBox, options );

    // Speak the object response describing the "value" of the control when it is focused.
    this.focusedProperty.link( focused => {
      if ( focused ) {
        this.addAccessibleObjectResponse( createAccessibleObjectResponse() );
      }
    } );

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
          incrementCoarseButton.pdomClick();
        }
        else if ( MembraneTransportHotkeyData.soluteControl.coarseDecrement.hasKeyStroke( keysPressed ) ) {
          decrementCoarseButton.pdomClick();
        }
        else if ( MembraneTransportHotkeyData.soluteControl.fineIncrement.hasKeyStroke( keysPressed ) ) {
          incrementFineButton.pdomClick();
        }
        else if ( MembraneTransportHotkeyData.soluteControl.fineDecrement.hasKeyStroke( keysPressed ) ) {
          decrementFineButton.pdomClick();
        }
        else {
          assert && assert( false, `Unexpected key pressed: ${keysPressed}` );
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