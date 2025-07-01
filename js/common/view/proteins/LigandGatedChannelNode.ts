// Copyright 2025, University of Colorado Boulder

/**
 * Render a channel, for a Node that can be dragged out of the toolbox and dropped into specific slots
 * in the membrane.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import potassiumLigandGatedClosed_svg from '../../../../images/potassiumLigandGatedClosed_svg.js';
import potassiumLigandGatedOpen_svg from '../../../../images/potassiumLigandGatedOpen_svg.js';
import potassiumLigandHighlight_svg from '../../../../images/potassiumLigandHighlight_svg.js';
import sodiumLigandGatedClosed_svg from '../../../../images/sodiumLigandGatedClosed_svg.js';
import sodiumLigandGatedOpen_svg from '../../../../images/sodiumLigandGatedOpen_svg.js';
import sodiumLigandHighlight_svg from '../../../../images/sodiumLigandHighlight_svg.js';
import membraneTransport from '../../../membraneTransport.js';
import MembraneTransportConstants from '../../MembraneTransportConstants.js';
import MembraneTransportSounds from '../../MembraneTransportSounds.js';
import LigandGatedChannel from '../../model/proteins/LigandGatedChannel.js';
import TransportProteinNode from './TransportProteinNode.js';

export default class LigandGatedChannelNode extends TransportProteinNode {

  // The highlight is shown when the user drags a ligand
  private readonly highlight?: Image;

  /**
   * @param type
   * @param channel - Use null for static icons. Provide a channel to update the view when the channel state changes.
   */
  public constructor(
    public readonly type: 'sodiumIonLigandGatedChannel' | 'potassiumIonLigandGatedChannel',
    public readonly channel: LigandGatedChannel | null
  ) {

    const image = new Image( type === 'sodiumIonLigandGatedChannel' ? sodiumLigandGatedClosed_svg : potassiumLigandGatedClosed_svg );
    super( image, channel );

    if ( channel ) {

      const highlightVisibleProperty = new DerivedProperty( [ channel.model.isUserDraggingLigandProperty, channel.openOrClosedProperty ], ( isUserDraggingLigand, openOrClosed ) => {
        return isUserDraggingLigand && openOrClosed === 'closed';
      } );
      this.highlight = new Image( type === 'sodiumIonLigandGatedChannel' ? sodiumLigandHighlight_svg : potassiumLigandHighlight_svg, {
        visibleProperty: highlightVisibleProperty
      } );

      this.addDisposable( highlightVisibleProperty );

      channel.stateProperty.link( state => {
        image.image = type === 'sodiumIonLigandGatedChannel' ? ( state === 'ligandBoundOpen' || state === 'ligandUnboundOpen' ) ? sodiumLigandGatedOpen_svg : sodiumLigandGatedClosed_svg :
                      type === 'potassiumIonLigandGatedChannel' ? ( state === 'ligandBoundOpen' || state === 'ligandUnboundOpen' ) ? potassiumLigandGatedOpen_svg : potassiumLigandGatedClosed_svg :
                      ( () => { throw new Error( `Unrecognized ligand-gated channel type: ${type}` ); } )();
      }, { disposer: this } );

      channel.openOrClosedProperty.link( openOrClosed => {

        // Re-center the highlight on state change, since the open vs closed has different coordinates
        this.highlight!.center = type === 'sodiumIonLigandGatedChannel' ?
                                 MembraneTransportConstants.IMAGE_METRICS.sodiumLigandGatedChannel[ openOrClosed ].ligandBindingSite :
                                 MembraneTransportConstants.IMAGE_METRICS.potassiumLigandGatedChannel[ openOrClosed ].ligandBindingSite;
      } );

      channel.stateProperty.lazyLink( state => {
        if ( state === 'closed' ) {
          MembraneTransportSounds.channelClosed( type );
        }
        else if ( state === 'ligandBoundClosed' ) {
          MembraneTransportSounds.ligandBound();
        }
        else if ( state === 'ligandBoundOpen' ) {
          MembraneTransportSounds.channelOpened( type );
        }
        else if ( state === 'ligandUnboundOpen' ) {
          MembraneTransportSounds.ligandUnbound();
        }
      }, { disposer: this } );
    }
  }

  /**
   * This must be done after the TransportProteinNode is centered, since for the potassium ligand gated channel, it goes
   * out of bounds.
   */
  public addHighlightAsChild(): void {
    this.highlight && this.addChild( this.highlight );
  }
}

membraneTransport.register( 'LigandGatedChannelNode', LigandGatedChannelNode );