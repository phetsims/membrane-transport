// Copyright 2025, University of Colorado Boulder

/**
 * Shows the panel and spinner that allows the user to add and remove a particular type of Solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import Range from '../../../../dot/js/Range.js';
import { combineOptions, EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import Voicing, { VoicingOptions } from '../../../../scenery/js/accessibility/voicing/Voicing.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ArrowButton, { ArrowButtonOptions } from '../../../../sun/js/buttons/ArrowButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import nullSoundPlayer from '../../../../tambo/js/nullSoundPlayer.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { SoluteControlSolutes } from '../model/SoluteType.js';
import SoluteSpinnerSoundGenerator from './SoluteSpinnerSoundGenerator.js';

type SelfOptions = EmptySelfOptions;
type ParentOptions = PanelOptions & VoicingOptions;
type SoluteControlOptions = SelfOptions & StrictOmit<ParentOptions, 'tandem'>;

const fineDelta = 10;
const coarseDelta = 50;

export default class SoluteControl extends Voicing( Panel ) {
  public constructor( model: MembraneTransportModel,
                      soluteType: SoluteControlSolutes,
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

    const options = optionize4<SoluteControlOptions, SelfOptions, ParentOptions>()( {}, AccessibleDraggableOptions, {
      align: 'center',
      visibleProperty: gatedVisibleProperty,
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS,

      // pdom - extends AccessibleDraggableOptions
      accessibleRoleDescription: MembraneTransportFluent.a11y.soluteControl.accessibleRoleDescriptionStringProperty,
      accessibleName: accessibleName,
      accessibleHelpText: side === 'inside' ? MembraneTransportFluent.a11y.soluteControl.inside.accessibleHelpTextStringProperty :
                          MembraneTransportFluent.a11y.soluteControl.outside.accessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_AFTER_CONTENT,

      // voicing
      voicingNameResponse: accessibleName,

      // A custom shorter voicingHintResponse was requested for this control, see
      // https://github.com/phetsims/membrane-transport/issues/219
      voicingHintResponse: MembraneTransportFluent.a11y.soluteControl.voicingHintResponseStringProperty,

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
    const createAccessibleObjectResponse = () => {
      return MembraneTransportFluent.a11y.soluteControl.accessibleObjectResponse.format( {

        // Qualitative descriptions for the amount of a solute, as described in
        // https://github.com/phetsims/membrane-transport/issues/242
        amount: new DerivedProperty( [ sideCountProperty ], count => {
          const countAsFraction = count / MembraneTransportConstants.MAX_SOLUTE_COUNT;
          return count === 0 ? 'none' :
                 count <= 3 ? 'few' :
                 countAsFraction <= 0.10 ? 'some' :
                 countAsFraction <= 0.25 ? 'smallAmount' :
                 countAsFraction <= 0.40 ? 'several' :
                 countAsFraction <= 0.60 ? 'many' :
                 countAsFraction <= 0.80 ? 'largeAmount' :
                 countAsFraction < 1 ? 'hugeAmount' :
                 'maxAmount';
        } ),
        soluteType: model.soluteProperty
      } );
    };

    // The accessibleContextResponse describes the overall change in the simulation. It describes how many of a solute was added or
    // removed, and the relative amounts on each side of the membrane. It is spoken every time the SoluteControl is used.
    const createContextResponse = ( newValue: number, previousValue: number ) => {

      // In this simulation, it is possible to have a keyup event that doesn't change the value. In that case,
      // we don't want to announce anything.
      if ( newValue === previousValue ) {
        return null;
      }

      // 1. Magnitude of this change
      const difference = newValue - previousValue;
      const amount = Math.abs( difference ) === coarseDelta ? 'aLot' : 'aLittle';
      const addedOrRemoved = ( difference > 0 ) ? 'added' : 'removed';

      // 2. Figure out how many are inside vs. outside now
      const insideCount = model.insideSoluteCountProperties[ soluteType ].value;
      const outsideCount = model.outsideSoluteCountProperties[ soluteType ].value;
      const differenceInsideMinusOutside = insideCount - outsideCount;

      // 3. Decide if it's more or less, and is it a large or small difference
      const differenceSize = Math.abs( differenceInsideMinusOutside ) < 5 ? 'aLittle' : 'aLot';
      const directionality = side === 'inside' ? 'insideThanOutside' : 'outsideThanInside';

      // Describe relative to the spinner that is being controlled
      const moreOrLessOrSameOrNone = ( insideCount === 0 && outsideCount === 0 ) ? 'none' :
                                     ( differenceInsideMinusOutside === 0 ) ? 'same' :
                                     side === 'inside' ?
                                     ( ( differenceInsideMinusOutside >= 0 ) ? 'more' : 'less' ) :
                                     ( ( differenceInsideMinusOutside >= 0 ) ? 'less' : 'more' );

      // 4. Supply these to the translation message
      return MembraneTransportFluent.a11y.soluteControl.accessibleContextResponse.format( {
        amount: amount,                // aLittle / aLot
        addedOrRemoved: addedOrRemoved, // added / removed
        differenceSize: differenceSize, // aLittle / aLot
        moreOrLessOrSameOrNone: moreOrLessOrSameOrNone, // more / less
        soluteType: soluteType,       // e.g. 'Na⁺'
        directionality: directionality  // insideThanOutside / outsideThanInside
      } );
    };

    // Plays sounds when solutes are added or removed.
    const soundGenerator = new SoluteSpinnerSoundGenerator( new Range( 0, 50 ) );

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

      // TODO: In the previous design, each button had a `firedEmitter` and `enabledProperty` in phet studio.
      //   This seems to hide the visibleProperty, but I do not see an enabledProperty. See https://github.com/phetsims/membrane-transport/issues/269.
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: true
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

    super( new Node( {
      children: [ buttonBox ]
    } ), options );

    // KeyboardListener supports alt input. It directly clicks the buttons so that they look pressed and play sounds when the keyboard is used.
    const coarseIncrementKeys: OneKeyStroke[] = [ 'arrowRight', 'arrowUp' ];
    const coarseDecrementKeys: OneKeyStroke[] = [ 'arrowLeft', 'arrowDown' ];
    const fineIncrementKeys: OneKeyStroke[] = [ 'shift+arrowRight', 'shift+arrowUp' ];
    const fineDecrementKeys: OneKeyStroke[] = [ 'shift+arrowLeft', 'shift+arrowDown' ];

    const keyboardListener = new KeyboardListener( {
      keys: [
        ...coarseIncrementKeys,
        ...coarseDecrementKeys,
        ...fineIncrementKeys,
        ...fineDecrementKeys
      ],
      fire: ( event, keysPressed, listener ) => {
        if ( coarseIncrementKeys.includes( keysPressed ) ) {
          incrementCoarseButton.pdomClick();
        }
        else if ( coarseDecrementKeys.includes( keysPressed ) ) {
          decrementCoarseButton.pdomClick();
        }
        else if ( fineIncrementKeys.includes( keysPressed ) ) {
          incrementFineButton.pdomClick();
        }
        else if ( fineDecrementKeys.includes( keysPressed ) ) {
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
  }
}

membraneTransport.register( 'SoluteControl', SoluteControl );