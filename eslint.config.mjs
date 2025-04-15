// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for membrane-transport.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import simEslintConfig from '../perennial-alias/js/eslint/config/sim.eslint.config.mjs';
import banTSCommentConfig from '../perennial-alias/js/eslint/config/util/banTSCommentConfig.mjs';

export default [
  ...simEslintConfig,
  ...banTSCommentConfig, {
    rules: {
      'phet/todo-should-have-issue': 'off',

      // Not compatible with aider
      'eol-last': 'off',

      // Documentation should come before imports.
      'phet/documentation-before-imports': 'error'
    }
  }
];