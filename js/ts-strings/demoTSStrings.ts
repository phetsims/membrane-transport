// Copyright 2025, University of Colorado Boulder

/**
 * Demonstration for a prototype string system.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import localeProperty from '../../../joist/js/i18n/localeProperty.js';
import MembraneChannelLocalizedStrings from './MembraneChannelLocalizedStrings.js';

export default function demoTSStrings(): void {


  console.log( MembraneChannelLocalizedStrings.membraneProteins.value );

  MembraneChannelLocalizedStrings.membraneProteins.link( p => {
    console.log( p );
  } );

  localeProperty.value = 'en';

  MembraneChannelLocalizedStrings.getAmountMessage.link( getAmountMessage => {
    const result = getAmountMessage( 'aLittle', 'added', 'aLittle', 'more', 'Sodium!!!', 'insideThanOutside' );
    console.log( result );
  } );

  MembraneChannelLocalizedStrings.a11y.accordionBoxGroup.accessibleHelpText.value;

  localeProperty.value = 'fr';
  localeProperty.value = 'en';

  console.log( MembraneChannelLocalizedStrings.a11y.accordionBoxGroup.accessibleHelpText.value );

}