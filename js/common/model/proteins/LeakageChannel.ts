// Copyright 2025, University of Colorado Boulder

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import membraneTransport from '../../../membraneTransport.js';
import Channel from './Channel.js';

/**
 * The LeakageChannel, which is always open.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class LeakageChannel extends Channel {
  public override isOpenProperty: TReadOnlyProperty<boolean> = new BooleanProperty( true );
}

membraneTransport.register( 'LeakageChannel', LeakageChannel );