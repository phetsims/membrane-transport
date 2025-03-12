// Copyright 2025, University of Colorado Boulder

/**
 * MoveGrabbedChannelProteinKeyboardHelpSection provides help content within the KeyboardHelpDialog. It instructs
 * users on how to move a grabbed ball and/or card using keyboard inputs in the Center and Variability simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import LetterKeyNode from '../../../../scenery-phet/js/keyboard/LetterKeyNode.js';
import NumberKeyNode from '../../../../scenery-phet/js/keyboard/NumberKeyNode.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import membraneChannels from '../../membraneChannels.js';

export const SECTION_LABEL_OPTIONS = { labelOptions: { lineWrap: 200 } };

export default class MoveGrabbedChannelProteinKeyboardHelpSection extends KeyboardHelpSection {
  public constructor(
    title: TReadOnlyProperty<string>,
    moveMessage: TReadOnlyProperty<string>,
    jumpStartMessage: TReadOnlyProperty<string>,
    jumpEndMessage: TReadOnlyProperty<string>
  ) {
    super( title, [
      KeyboardHelpSectionRow.labelWithIconList( moveMessage, [
        KeyboardHelpIconFactory.iconOrIcon(
          KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
          KeyboardHelpIconFactory.iconRow( [ LetterKeyNode.a(), LetterKeyNode.d() ], { spacing: 1.3 } ) ),
        KeyboardHelpIconFactory.iconOrIcon(
          KeyboardHelpIconFactory.upDownArrowKeysRowIcon(),
          KeyboardHelpIconFactory.iconRow( [ LetterKeyNode.w(), LetterKeyNode.s() ], { spacing: 1.3 } ) ) ] ),
      KeyboardHelpSectionRow.labelWithIcon( 'move in larger steps', KeyboardHelpIconFactory.pageUpPageDownRowIcon() ),
      KeyboardHelpSectionRow.labelWithIcon( jumpStartMessage, TextKeyNode.home(), SECTION_LABEL_OPTIONS ),
      KeyboardHelpSectionRow.labelWithIcon( jumpEndMessage, TextKeyNode.end(), SECTION_LABEL_OPTIONS ),
      KeyboardHelpSectionRow.labelWithIcon( 'CenterAndVariabilityStrings.keyboardHelpDialog.jumpBallToTickMarkStringProperty',
        KeyboardHelpIconFactory.iconToIcon( new NumberKeyNode( 0 ), new NumberKeyNode( 9 ) )
      ) ] );
  }
}

membraneChannels.register( 'MoveGrabbedChannelProteinKeyboardHelpSection', MoveGrabbedChannelProteinKeyboardHelpSection );