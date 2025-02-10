// Copyright 2025, University of Colorado Boulder

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import FluentUtils from '../../../../chipper/js/browser/FluentUtils.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsMessages from '../../strings/MembraneChannelsMessages.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import SoluteType from '../model/SoluteType.js';
import getParticleNode from './solutes/getParticleNode.js';

type SelfOptions = EmptySelfOptions;
type SoluteControlOptions = SelfOptions & NodeOptions;

/**
 * Shows the panel and spinner that allows the user to add and remove a particular type of Solute.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class SoluteControl extends Panel {

  public constructor( model: MembraneChannelsModel, soluteType: SoluteType, side: 'outside' | 'inside', providedOptions: SoluteControlOptions ) {

    const visibleProperty = new DerivedProperty( [ model.selectedSoluteProperty ], selectedSolute => {
      return soluteType === selectedSolute;
    } );

    const options = optionize<SoluteControlOptions, SelfOptions, NodeOptions>()( {
      visibleProperty: visibleProperty
    }, providedOptions );

    // Create a proxy property for the FineCoarseSpinner
    // When the proxy Property changes, create new solutes based on that value
    const userControlledCountProperty = new NumberProperty( 0 );

    const actualCountProperty = side === 'inside' ? model.insideSoluteCountProperties[ soluteType ] :
                                model.outsideSoluteCountProperties[ soluteType ];

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

    const qualitativeCountProperty = new DerivedProperty( [ actualCountProperty ], actualCount => {
      return actualCount === 0 ? 'none' :
             actualCount === 1 ? 'one' :
             actualCount < 10 ? 'few' :
             actualCount < 20 ? 'some' :
             'many';
    } );

    const objectResponseMessageProperty = new PatternMessageProperty( MembraneChannelsMessages.soluteSpinnerObjectResponsePatternMessageProperty, {
      amount: qualitativeCountProperty,
      soluteType: model.selectedSoluteProperty
    } );

    const fineDelta = 2;
    const coarseDelta = 10;
    const spinner = new FineCoarseSpinner( userControlledCountProperty, {
      deltaFine: fineDelta,
      deltaCoarse: coarseDelta,
      numberDisplayOptions: {
        opacity: 0,
        scale: 0.65,
        tandem: Tandem.OPT_OUT
      },
      accessibleName: side === 'inside' ? MembraneChannelsMessages.insideMembraneSpinnerAccessibleNameMessageProperty :
                      MembraneChannelsMessages.outsideMembraneSpinnerAccessibleNameMessageProperty,

      helpText: side === 'inside' ? MembraneChannelsMessages.insideMembraneSpinnerHelpTextMessageProperty :
                MembraneChannelsMessages.outsideMembraneSpinnerHelpTextMessageProperty,

      accessibleRoleDescription: MembraneChannelsMessages.soluteSpinnerRoleDescriptionMessageProperty,

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
        const moreOrLess = side === 'inside' ?
                           ( ( differenceInsideMinusOutside >= 0 ) ? 'more' : 'less' ) :
                           ( ( differenceInsideMinusOutside >= 0 ) ? 'less' : 'more' );

        // 4. Supply these to the translation message
        return FluentUtils.formatMessage(
          MembraneChannelsMessages.soluteSpinnerContextResponsePatternMessageProperty,
          {
            amount: amount,                // aLittle / aLot
            addedOrRemoved: addedOrRemoved, // added / removed
            differenceSize: differenceSize, // aLittle / aLot
            moreOrLess: moreOrLess, // more / less
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

    const icon = getParticleNode( soluteType, {
      center: spinner.center
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

membraneChannels.register( 'SoluteControl', SoluteControl );