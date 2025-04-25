// Copyright 2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */
import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';
import localeProperty from '../../../joist/js/i18n/localeProperty.js';
import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import MembraneChannelStrings_en from './MembraneChannelStrings_en.js';
import MembraneChannelStrings_fr from './MembraneChannelStrings_fr.js';

/**
 * A mapped type that converts a type T into a corresponding localized version.
 * - For functions, we produce a TReadOnlyProperty wrapping the function.
 * - For objects (except functions), we recursively produce an object with localized properties.
 * - For primitives (e.g. string), we produce a TReadOnlyProperty.
 */
type LocalizedStrings<T> =
  T extends ( ...args: IntentionalAny[] ) => IntentionalAny ? TReadOnlyProperty<T> :
  T extends object ? { [K in keyof T]: LocalizedStrings<T[K]> } :
  TReadOnlyProperty<T>;

function localizeStrings<T>( enStrings: T, frStrings: T ): LocalizedStrings<T> {
  const localized: Partial<LocalizedStrings<T>> = {};

  // Iterate over each key in the English strings object.
  for ( const key in enStrings ) {
    const enValue = enStrings[ key ];
    const frValue = frStrings[ key ];

    if ( typeof enValue === 'string' ) {
      // Create a DerivedProperty that returns the correct string based on the locale.

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - TS doesn't know that key is a key of T
      localized[ key ] = new DerivedProperty( [ localeProperty ], locale => locale === 'en' ? enValue : frValue );
    }
    else if ( typeof enValue === 'function' ) {
      // Wrap the function in a DerivedProperty so that it returns a function which delegates to the correct localized version.

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - TS doesn't know that key is a key of T
      localized[ key ] = new DerivedProperty( [ localeProperty ], ( locale: string ) => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return ( ...args: IntentionalAny[] ) => locale === 'en' ? enValue( ...args ) : frValue( ...args );
      } );
    }
    else if ( typeof enValue === 'object' && enValue !== null ) {
      // Recursively process nested objects.

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - TS doesn't know that key is a key of T
      localized[ key ] = localizeStrings( enValue, frValue );
    }
    else {
      throw new Error( `Unsupported type for key ${key}` );
    }
  }
  return localized as LocalizedStrings<T>;
}

const MembraneChannelLocalizedStrings = localizeStrings( MembraneChannelStrings_en, MembraneChannelStrings_fr );
export default MembraneChannelLocalizedStrings;