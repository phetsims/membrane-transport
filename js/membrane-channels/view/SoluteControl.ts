// Copyright 2025, University of Colorado Boulder

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';
import SoluteType from '../model/SoluteType.js';
import getSoluteNode from './solutes/getSoluteNode.js';

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
    // TODO: We will need to update this Property to reflect the number of solutes in the cellular area.
    const userControlledConcentrationProperty = new NumberProperty( 0 );

    userControlledConcentrationProperty.lazyLink( ( value, oldValue ) => {
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

    const spinner = new FineCoarseSpinner( userControlledConcentrationProperty, {
      deltaFine: 2,
      deltaCoarse: 10,
      numberDisplayOptions: {
        opacity: 0,
        scale: 0.65
      },
      tandem: options.tandem
    } );

    const icon = getSoluteNode( soluteType, {
      center: spinner.center
    } );

    // TODO: Is this level of instrumentation correct? Should the outer panel be instrumented? How should it be implemented?
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete options.tandem;

    super( new Node( {
      children: [ spinner, icon ]
    } ), options );
  }
}

membraneChannels.register( 'SoluteControl', SoluteControl );