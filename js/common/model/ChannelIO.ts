// Copyright 2025, University of Colorado Boulder

import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import Channel from './Channel.js';
import ChannelType from './ChannelType.js';
import getChannel from './getChannel.js';

type ChannelStateObject = {
  type: ChannelType;
  position: number;
};

/**
 * Ideally this would be declared in Channel.ts. However, since this creates subtypes like LigandGatedChannel, that
 * would create a circular dependency. So we declare it here.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
export const ChannelIO = new IOType( 'ChannelIO', {
  valueType: Channel,
  stateSchema: {
    type: StringIO,
    position: NumberIO
  },
  fromStateObject: ( stateObject: ChannelStateObject ) => {
    return getChannel( stateObject.type, stateObject.position );
  }
} );