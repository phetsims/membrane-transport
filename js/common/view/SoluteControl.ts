// Copyright 2025, University of Colorado Boulder

/**
 * Shows the panel and spinner that allows the user to add and remove a particular type of Solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import { GatedVisibleProperty } from '../../../../axon/js/GatedBooleanProperty.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import { SoluteControlSolutes } from '../model/SoluteType.js';
import SoluteSpinnerSoundGenerator from './SoluteSpinnerSoundGenerator.js';

type SelfOptions = EmptySelfOptions;
type SoluteControlOptions = SelfOptions & StrictOmit<PanelOptions, 'tandem'>;

const fineDelta = 2;
const coarseDelta = 10;

// Qualitative descriptions for the amount of a solute type on one side of the membrane.
// Max values are relative to the maximum number of solutes that can be added.
const DESCRIBED_THRESHOLDS = [
  { label: 'none', max: 0 },
  { label: 'some', max: 0.10 },
  { label: 'smallAmount', max: 0.25 },
  { label: 'several', max: 0.40 },
  { label: 'many', max: 0.60 },
  { label: 'largeAmount', max: 0.80 },
  { label: 'hugeAmount', max: 0.99 },
  { label: 'maxAmount', max: 1 }
] as const;

export default class SoluteControl extends Panel {

  public constructor( model: MembraneTransportModel, soluteType: SoluteControlSolutes, side: 'outside' | 'inside',
                      tandem: Tandem, providedOptions: SoluteControlOptions ) {

    // PhET-iO clients can hide individual solute controls.
    const simControlledVisibleProperty = new DerivedProperty( [ model.soluteProperty ], selectedSolute => {
      return soluteType === selectedSolute;
    } );
    const gatedVisibleProperty = new GatedVisibleProperty( simControlledVisibleProperty, tandem );

    const options = optionize<SoluteControlOptions, SelfOptions, PanelOptions>()( {
      align: 'center',
      visibleProperty: gatedVisibleProperty,
      cornerRadius: MembraneTransportConstants.PANEL_CORNER_RADIUS
    }, providedOptions );

    // Create a proxy property for the FineCoarseSpinner
    // When the proxy Property changes, create new solutes based on that value
    const allowedRangeProperty = new Property( new Range( 0, MembraneTransportConstants.MAX_SOLUTE_COUNT ) );

    // Amount the user has added or removed. Can go negative if solutes diffuse across to this side, then are removed.
    const userControlledCountProperty = new NumberProperty( 0, {
      range: allowedRangeProperty
    } );

    const actualCountPerSideProperty = side === 'inside' ?
                                       model.insideSoluteCountProperties[ soluteType ] :
                                       model.outsideSoluteCountProperties[ soluteType ];

    const totalCountProperty = new DerivedProperty( [ model.insideSoluteCountProperties[ soluteType ], model.outsideSoluteCountProperties[ soluteType ] ], ( insideCount, outsideCount ) => {
      return insideCount + outsideCount;
    } );

    // When the actual count changes, adjust the range to enable/disable the buttons.
    // The range should center on the current value, and allow the user to go to 0 or up to MAX_SOLUTE_COUNT.
    Multilink.multilink( [ userControlledCountProperty, actualCountPerSideProperty, totalCountProperty ],
      ( userValue, countOnThisSide, totalCount ) => {

        let amountTheUserCouldRemove = countOnThisSide;
        let amountTheUserCouldAdd = MembraneTransportConstants.MAX_SOLUTE_COUNT - totalCount;

        // It is possible for the totalCount to exceed the MAX_SOLUTE_COUNT since model.insideSoluteCountProperties[ soluteType ] and
        // model.outsideSoluteCountProperties[ soluteType ] are updated sequentially.
        if ( amountTheUserCouldAdd < 0 ) {
          amountTheUserCouldAdd = 0;
        }

        // For the enabled range only, don't disable just some of the buttons
        if ( amountTheUserCouldAdd > 0 ) {
          amountTheUserCouldAdd = coarseDelta;
        }
        if ( amountTheUserCouldRemove > 0 ) {
          amountTheUserCouldRemove = coarseDelta;
        }
        allowedRangeProperty.value = new Range(
          userValue - amountTheUserCouldRemove,
          userValue + amountTheUserCouldAdd
        );
      } );

    // Add solutes and play sounds based on the userControlledCountProperty rather than the actualCountPerSideProperty, so we don't create
    // a sound when a solute diffuses across the membrane.
    userControlledCountProperty.lazyLink( ( value, oldValue ) => {

      // Use the userControlledProperty just to know how many the user added or removed
      let difference = value - oldValue;
      assert && assert( difference !== 0, 'Difference is 0' );

      const originalCount = totalCountProperty.value;

      if ( difference > 0 ) {

        // don't exceed the max
        if ( totalCountProperty.value + difference > MembraneTransportConstants.MAX_SOLUTE_COUNT ) {
          difference = MembraneTransportConstants.MAX_SOLUTE_COUNT - totalCountProperty.value;
        }

        // We need to add solutes to the outside of the membrane
        model.addSolutes( soluteType, side, difference );
      }
      else if ( difference < 0 ) {

        const desiredNumberToRemove = Math.abs( difference );

        // If you tried to remove too many, then actually the most you can remove is just however many there were on that side.
        const maxNumberToRemove = side === 'inside' ? model.insideSoluteCountProperties[ soluteType ].value : model.outsideSoluteCountProperties[ soluteType ].value;

        const numberToRemove = Math.min( desiredNumberToRemove, maxNumberToRemove );

        // We need to remove solutes from the outside of the membrane
        model.removeSolutes( soluteType, side, numberToRemove );
      }

      const newCount = totalCountProperty.value;

      soundGenerator.playSoundForValueChange( newCount, originalCount );
    } );

    const objectResponseMessageProperty = MembraneTransportFluent.a11y.soluteSpinnerObjectResponsePattern.createProperty( {
      amount: DerivedProperty.fromThresholds( actualCountPerSideProperty, new Range( 0, MembraneTransportConstants.MAX_SOLUTE_COUNT ), DESCRIBED_THRESHOLDS ),
      soluteType: model.soluteProperty
    } );

    const soundGenerator = new SoluteSpinnerSoundGenerator( new Range( 0, 50 ) );

    const spinner = new FineCoarseSpinner( userControlledCountProperty, {
      deltaFine: fineDelta,
      deltaCoarse: coarseDelta,
      numberDisplayOptions: {

        // The design hides the number display entirely.
        visible: false,
        tandem: Tandem.OPT_OUT
      },

      // Sounds played above
      arrowsSoundPlayer: {
        play: () => {/*no-op*/},
        stop: () => {/*no-op*/}
      },
      accessibleName: side === 'inside' ? MembraneTransportFluent.a11y.insideMembraneSpinnerAccessibleNamePattern.format( { soluteType: soluteType } ) :
                      MembraneTransportFluent.a11y.outsideMembraneSpinnerAccessibleNamePattern.format( { soluteType: soluteType } ),

      accessibleHelpText: side === 'inside' ? MembraneTransportFluent.a11y.insideMembraneSpinnerHelpTextStringProperty :
                          MembraneTransportFluent.a11y.outsideMembraneSpinnerHelpTextStringProperty,

      // A custom shorter voicingHintResponse was requested for this control, see
      // https://github.com/phetsims/membrane-transport/issues/219
      voicingHintResponse: MembraneTransportFluent.a11y.soluteSpinnerVoicingHintResponseStringProperty,

      accessibleRoleDescription: MembraneTransportFluent.a11y.soluteSpinnerRoleDescriptionStringProperty,

      pdomCreateAriaValueText: ( value: number ) => {
        return objectResponseMessageProperty;
      },
      pdomCreateContextResponseAlert: ( pdomMappedValue, newValue, valueOnStart ) => {

        // In this simulation, it is possible to have a keyup event that doesn't change the value. In that case,
        // we don't want to announce anything.
        if ( newValue === valueOnStart ) {
          return null;
        }

        // 1. Magnitude of this change
        const difference = newValue - valueOnStart;
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
        const moreOrLessOrSame = ( differenceInsideMinusOutside === 0 ) ? 'same' :
                                 side === 'inside' ?
                                 ( ( differenceInsideMinusOutside >= 0 ) ? 'more' : 'less' ) :
                                 ( ( differenceInsideMinusOutside >= 0 ) ? 'less' : 'more' );

        // 4. Supply these to the translation message
        return MembraneTransportFluent.a11y.soluteSpinnerContextResponsePattern.format( {
          amount: amount,                // aLittle / aLot
          addedOrRemoved: addedOrRemoved, // added / removed
          differenceSize: differenceSize, // aLittle / aLot
          moreOrLessOrSame: moreOrLessOrSame, // more / less
          soluteType: soluteType,       // e.g. 'Na⁺'
          directionality: directionality  // insideThanOutside / outsideThanInside
        } );
      },
      pdomDependencies: [ objectResponseMessageProperty ],
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false,
      arrowButtonOptions: {

        // Make smaller so there is enough space between the observation window and the solute radio buttons.
        arrowWidth: 8,
        arrowHeight: 10,

        phetioVisiblePropertyInstrumented: false
      }
    } );

    super( new Node( {
      children: [ spinner ]
    } ), options );
  }
}

membraneTransport.register( 'SoluteControl', SoluteControl );