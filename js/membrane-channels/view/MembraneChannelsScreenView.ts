// Copyright 2024, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import MembraneChannelsConstants from '../../common/MembraneChannelsConstants.js';
import membraneChannels from '../../membraneChannels.js';
import MembraneChannelsModel from '../model/MembraneChannelsModel.js';

type SelfOptions = EmptySelfOptions;

type MembraneChannelsScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class MembraneChannelsScreenView extends ScreenView {

  public constructor( model: MembraneChannelsModel, providedOptions: MembraneChannelsScreenViewOptions ) {

    const options = optionize<MembraneChannelsScreenViewOptions, SelfOptions, ScreenViewOptions>()( {}, providedOptions );

    super( options );

    // TODO: We need an actual class for the window.
    const observationWindow = new Rectangle(
      0,
      0,
      MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH,
      MembraneChannelsConstants.OBSERVATION_WINDOW_WIDTH, {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1
      } );
    this.addChild( observationWindow );

    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      timeSpeedProperty: model.timeSpeedProperty,
      playPauseStepButtonOptions: {
        includeStepForwardButton: false
      },
      tandem: options.tandem.createTandem( 'timeControlNode' )
    } );
    this.addChild( timeControlNode );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // layout
    observationWindow.centerTop = this.layoutBounds.centerTop.plusXY( 0, MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN );
    resetAllButton.rightBottom = new Vector2( this.layoutBounds.maxX - MembraneChannelsConstants.SCREEN_VIEW_X_MARGIN, observationWindow.bottom );
    timeControlNode.bottom = resetAllButton.top - MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;
    timeControlNode.left = observationWindow.right + MembraneChannelsConstants.SCREEN_VIEW_Y_MARGIN;
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    // Implement reset...
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    // Implement step...
  }
}

membraneChannels.register( 'MembraneChannelsScreenView', MembraneChannelsScreenView );