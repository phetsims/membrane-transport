// Copyright 2025, University of Colorado Boulder

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import FluentUtils from '../../../../chipper/js/browser/FluentUtils.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportMessages from '../../strings/MembraneTransportMessages.js';
import MembraneTransportConstants from '../MembraneTransportConstants.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';
import SoluteType from '../model/SoluteType.js';
import createParticleNode from './particles/createParticleNode.js';

type SelfOptions = EmptySelfOptions;
type SoluteControlOptions = SelfOptions & PanelOptions;

const fineDelta = 2;
const coarseDelta = 10;

/**
 * Shows the panel and spinner that allows the user to add and remove a particular type of Solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SoluteControl extends Panel {

  public constructor( model: MembraneTransportModel, soluteType: SoluteType, side: 'outside' | 'inside', providedOptions: SoluteControlOptions ) {

    const visibleProperty = new DerivedProperty( [ model.selectedSoluteProperty ], selectedSolute => {
      return soluteType === selectedSolute;
    } );

    const options = optionize<SoluteControlOptions, SelfOptions, PanelOptions>()( {
      visibleProperty: visibleProperty
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

        // TODO (JG): Is the total exceeding the MAX indicative of an inconsistent transient value?
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

    userControlledCountProperty.lazyLink( ( value, oldValue ) => {
      const difference = value - oldValue;
      if ( difference > 0 ) {

        // We need to add solutes to the outside of the membrane
        model.addSolutes( soluteType, side, difference );
      }
      else {

        // We need to remove solutes from the outside of the membrane
        model.removeSolutes( soluteType, side, -difference );
      }
    } );

    const qualitativeCountProperty = new DerivedProperty( [ actualCountPerSideProperty ], actualCount => {
      return actualCount === 0 ? 'none' :
             actualCount === 1 ? 'one' :
             actualCount < 10 ? 'few' :
             actualCount < 20 ? 'some' :
             'many';
    } );

    const objectResponseMessageProperty = new PatternMessageProperty( MembraneTransportMessages.soluteSpinnerObjectResponsePatternMessageProperty, {
      amount: qualitativeCountProperty,
      soluteType: model.selectedSoluteProperty
    } );

    const spinner = new FineCoarseSpinner( userControlledCountProperty, {
      deltaFine: fineDelta,
      deltaCoarse: coarseDelta,
      numberDisplayOptions: {

        // Custom icon will be added later
        opacity: 0,
        tandem: Tandem.OPT_OUT
      },
      accessibleName: side === 'inside' ? MembraneTransportMessages.insideMembraneSpinnerAccessibleNameMessageProperty :
                      MembraneTransportMessages.outsideMembraneSpinnerAccessibleNameMessageProperty,

      accessibleHelpText: side === 'inside' ? MembraneTransportMessages.insideMembraneSpinnerHelpTextMessageProperty :
                          MembraneTransportMessages.outsideMembraneSpinnerHelpTextMessageProperty,

      accessibleRoleDescription: MembraneTransportMessages.soluteSpinnerRoleDescriptionMessageProperty,

      pdomCreateAriaValueText: ( value: number ) => {
        return objectResponseMessageProperty;
      },
      pdomCreateContextResponseAlert: ( pdomMappedValue, newValue, valueOnStart ) => {

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
        return FluentUtils.formatMessage(
          MembraneTransportMessages.soluteSpinnerContextResponsePatternMessageProperty,
          {
            amount: amount,                // aLittle / aLot
            addedOrRemoved: addedOrRemoved, // added / removed
            differenceSize: differenceSize, // aLittle / aLot
            moreOrLessOrSame: moreOrLessOrSame, // more / less
            soluteType: soluteType,       // e.g. 'Na⁺'
            directionality: directionality  // insideThanOutside / outsideThanInside
          }
        );
      },
      pdomDependencies: [ objectResponseMessageProperty ],
      tandem: options.tandem,
      phetioVisiblePropertyInstrumented: false,
      phetioEnabledPropertyInstrumented: false,
      arrowButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      }
    } );

    const icon = createParticleNode( soluteType, {
      center: spinner.center,

      // Chosen by inspection to make the icons small enough for the largest icon fit between spinner buttons.
      maxWidth: 40,
      maxHeight: 20
    } );

    // TODO (phet-io) Take tandem out of options and make it a required parameter. Pass it through for the buttons.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete options.tandem;

    super( new Node( {
      children: [ spinner, icon ]
    } ), options );
  }
}

membraneTransport.register( 'SoluteControl', SoluteControl );