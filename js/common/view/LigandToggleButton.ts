// Copyright 2025, University of Colorado Boulder

/**
 * LigandToggleButton.ts shows an Add Ligands or Remove Ligands button for screens that support ligands.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Text from '../../../../scenery/js/nodes/Text.js';
import BooleanRectangularToggleButton from '../../../../sun/js/buttons/BooleanRectangularToggleButton.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import Tandem from '../../../../tandem/js/Tandem.js';

import addLigands_mp3 from '../../../sounds/addLigands_mp3.js';
import removeLigands_mp3 from '../../../sounds/removeLigands_mp3.js';
import membraneTransport from '../../membraneTransport.js';
import MembraneTransportFluent from '../../MembraneTransportFluent.js';
import MembraneTransportColors from '../MembraneTransportColors.js';
import MembraneTransportModel from '../model/MembraneTransportModel.js';

const addLigandSoundPlayer = new SoundClip( addLigands_mp3, {
  initialOutputLevel: 0.3
} );
soundManager.addSoundGenerator( addLigandSoundPlayer );

const removeLigandSoundPlayer = new SoundClip( removeLigands_mp3, {
  initialOutputLevel: 0.3
} );
soundManager.addSoundGenerator( removeLigandSoundPlayer );

const TEXT_OPTIONS = {
  fontSize: 12,
  maxWidth: 160
} as const;

export default class LigandToggleButton extends BooleanRectangularToggleButton {
  public constructor( model: Pick<MembraneTransportModel, 'areLigandsAddedProperty'>, tandem: Tandem ) {

    const trueNode = new Text( MembraneTransportFluent.removeLigandsStringProperty, TEXT_OPTIONS );
    const falseNode = new Text( MembraneTransportFluent.addLigandsStringProperty, TEXT_OPTIONS );

    super( model.areLigandsAddedProperty, trueNode, falseNode, {
      baseColor: MembraneTransportColors.ligandButtonColorProperty,
      tandem: tandem,

      // pdom
      accessibleHelpText: MembraneTransportFluent.a11y.ligandToggleButtonAccessibleHelpTextStringProperty,
      valueOnSoundPlayer: addLigandSoundPlayer,
      valueOffSoundPlayer: removeLigandSoundPlayer
    } );

    // TODO (JG): High level API for context responses? See https://github.com/phetsims/membrane-transport/issues/10
    // Add accessible responses when the button is pressed, in the same way we do for sound effects.
    this.buttonModel.fireCompleteEmitter.addListener( () => {
      if ( model.areLigandsAddedProperty.value ) {
        this.addAccessibleResponse( MembraneTransportFluent.a11y.ligandToggleButtonAddedContextResponseStringProperty );
      }
      else {
        this.addAccessibleResponse( MembraneTransportFluent.a11y.ligandToggleButtonRemovedContextResponseStringProperty );
      }
    } );
  }
}
membraneTransport.register( 'LigandToggleButton', LigandToggleButton );